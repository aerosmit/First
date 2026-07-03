/*
 * Cylinder QR Scanner
 * -------------------
 * Decodes QR codes wrapped around a small cylinder (e.g. a 1.6 cm vial) from a
 * live iPhone camera feed.
 *
 * Geometry: a label wrapped on a cylinder of radius R, viewed roughly head-on,
 * appears horizontally compressed toward the silhouette edges. A point at
 * angle θ around the axis projects to image x ≈ W·sin(θ), where W is the
 * apparent (half) silhouette width in pixels. The flat label coordinate is the
 * arc length s = R·θ. So to flatten the image we resample columns:
 *
 *     output column at angle θ  ←  source column  cx + W·sin(θ)
 *
 * with output columns spaced evenly in θ (i.e. evenly in arc length).
 *
 * θmax — how far around the cylinder we attempt to recover — is unknown (it
 * depends on how much of the cylinder the label wraps and camera distance),
 * so in Auto mode we sweep a small set of θmax / width-calibration values,
 * one attempt per frame, plus a flat (no correction) profile as fallback.
 * Once a profile decodes, we stick to it while it keeps working.
 */
'use strict';

(() => {
  // ---------- DOM ----------
  const video      = document.getElementById('video');
  const overlay    = document.getElementById('overlay');
  const octx       = overlay.getContext('2d');
  const preview    = document.getElementById('preview');
  const pctx       = preview.getContext('2d');
  const statusEl   = document.getElementById('status');
  const startBtn   = document.getElementById('startBtn');
  const startScr   = document.getElementById('startScreen');
  const curveSlider= document.getElementById('curveSlider');
  const curveOut   = document.getElementById('curveOut');
  const autoBtn    = document.getElementById('autoBtn');
  const zoomRow    = document.getElementById('zoomRow');
  const zoomSlider = document.getElementById('zoomSlider');
  const zoomOut    = document.getElementById('zoomOut');
  const torchBtn   = document.getElementById('torchBtn');
  const resultEl   = document.getElementById('result');
  const resultText = document.getElementById('resultText');
  const copyBtn    = document.getElementById('copyBtn');
  const againBtn   = document.getElementById('againBtn');

  // ---------- Config ----------
  const ROI_W = 560;           // px width of the region-of-interest we sample from the video
  const SCAN_INTERVAL_MS = 70; // throttle decode attempts (~14 fps)
  const STICKY_FAIL_LIMIT = 14;// failed frames on a previously-good profile before re-sweeping

  // Guide box as a fraction of the *visible* video area (object-fit: cover).
  const BOX_W_FRAC = 0.64;     // cylinder silhouette should fill this width
  const BOX_H_FRAC = 0.34;

  // Auto-sweep profiles. thetaMax in radians; widthFactor calibrates the
  // assumed silhouette half-width vs. the guide lines (users never align
  // perfectly, and perspective makes the true silhouette slightly wider
  // than the orthographic model predicts).
  const PROFILES = [{ thetaMax: 0, widthFactor: 1 }]; // flat fallback first
  for (const deg of [40, 55, 66, 75, 82]) {
    for (const wf of [1.0, 0.93, 1.08]) {
      PROFILES.push({ thetaMax: deg * Math.PI / 180, widthFactor: wf });
    }
  }

  // ---------- State ----------
  let stream = null, track = null;
  let scanning = false;
  let lastScanTime = 0;
  let decodeBusy = false;
  let profileIdx = 0;          // sweep cursor
  let stickyProfile = null;    // last profile that decoded successfully
  let stickyFails = 0;
  let manualMode = false;
  let torchOn = false;
  let audioCtx = null;
  let attempts = 0, lastResult = '';

  const roiCanvas = document.createElement('canvas'); // hidden source ROI
  const rctx = roiCanvas.getContext('2d', { willReadFrequently: true });
  const flatCanvas = document.createElement('canvas'); // flattened strip (native detect + debug export)
  const fctx = flatCanvas.getContext('2d');

  // Native decoder (hardware-grade; far more tolerant of blur/density than
  // jsQR). Not exposed by all iOS Safari versions — feature-detected.
  let nativeDetector = null;
  if ('BarcodeDetector' in window) {
    try { nativeDetector = new BarcodeDetector({ formats: ['qr_code'] }); } catch (_) {}
  }

  // Cache of column maps keyed by profile+dimensions
  const mapCache = new Map();

  // ---------- Startup ----------
  if (!window.isSecureContext) {
    document.getElementById('httpsWarn').style.display = 'block';
  }

  startBtn.addEventListener('click', async () => {
    startBtn.disabled = true;
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: { ideal: 'environment' },
          width:  { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });
      video.srcObject = stream;
      await video.play();
      track = stream.getVideoTracks()[0];
      setupTrackControls();
      startScr.style.display = 'none';
      scanning = true;
      requestAnimationFrame(tick);
    } catch (err) {
      startBtn.disabled = false;
      alert('Camera failed to start: ' + err.message +
            (window.isSecureContext ? '' : '\n\nThis page must be served over HTTPS.'));
    }
  });

  function setupTrackControls() {
    const caps = track.getCapabilities ? track.getCapabilities() : {};
    if (caps.zoom) {
      zoomRow.hidden = false;
      zoomSlider.min = caps.zoom.min || 1;
      zoomSlider.max = Math.min(caps.zoom.max || 4, 6);
      zoomSlider.step = caps.zoom.step || 0.1;
      const settings = track.getSettings();
      zoomSlider.value = settings.zoom || zoomSlider.min;
      zoomOut.textContent = (+zoomSlider.value).toFixed(1) + '×';
      zoomSlider.addEventListener('input', () => {
        zoomOut.textContent = (+zoomSlider.value).toFixed(1) + '×';
        track.applyConstraints({ advanced: [{ zoom: +zoomSlider.value }] }).catch(() => {});
      });
    }
    if (caps.torch) {
      torchBtn.hidden = false;
      torchBtn.addEventListener('click', () => {
        torchOn = !torchOn;
        torchBtn.classList.toggle('active', torchOn);
        track.applyConstraints({ advanced: [{ torch: torchOn }] }).catch(() => {});
      });
    }
  }

  // ---------- Manual / auto curvature ----------
  autoBtn.addEventListener('click', () => {
    manualMode = !manualMode;
    autoBtn.classList.toggle('active', !manualMode);
    curveSlider.disabled = !manualMode;
    curveOut.textContent = manualMode ? curveSlider.value + '°' : 'auto';
    stickyProfile = null;
  });
  curveSlider.addEventListener('input', () => {
    curveOut.textContent = curveSlider.value + '°';
  });

  // ---------- Result sheet ----------
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(lastResult).then(() => {
      copyBtn.textContent = 'Copied!';
      setTimeout(() => (copyBtn.textContent = 'Copy'), 1200);
    }).catch(() => {});
  });
  againBtn.addEventListener('click', () => {
    resultEl.classList.remove('show');
    scanning = true;
    requestAnimationFrame(tick);
  });

  function showResult(text) {
    lastResult = text;
    scanning = false;
    // Render as link if it looks like a URL.
    if (/^https?:\/\/\S+$/i.test(text.trim())) {
      const a = document.createElement('a');
      a.href = text.trim();
      a.textContent = text;
      a.target = '_blank';
      a.rel = 'noopener';
      resultText.replaceChildren(a);
    } else {
      resultText.textContent = text;
    }
    resultEl.classList.add('show');
    beep();
    if (navigator.vibrate) navigator.vibrate(80);
  }

  function beep() {
    if (!audioCtx) return;
    try {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.frequency.value = 1318; // E6
      g.gain.setValueAtTime(0.15, audioCtx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.18);
      o.connect(g).connect(audioCtx.destination);
      o.start();
      o.stop(audioCtx.currentTime + 0.2);
    } catch (_) { /* audio is best-effort */ }
  }

  // ---------- Geometry helpers ----------

  // Where the video is drawn on screen (object-fit: cover) and which part of
  // the video is visible. Returns everything needed to convert between
  // display coords and video-pixel coords.
  function coverMapping() {
    const dw = overlay.clientWidth, dh = overlay.clientHeight;
    const vw = video.videoWidth, vh = video.videoHeight;
    const scale = Math.max(dw / vw, dh / vh);
    const visW = dw / scale, visH = dh / scale;          // visible video area (video px)
    const visX = (vw - visW) / 2, visY = (vh - visH) / 2;
    return { dw, dh, scale, visW, visH, visX, visY };
  }

  // Guide box in both video px and display px.
  function guideBox(m) {
    const bwV = m.visW * BOX_W_FRAC, bhV = m.visH * BOX_H_FRAC;
    const bxV = m.visX + (m.visW - bwV) / 2;
    const byV = m.visY + (m.visH - bhV) / 2;
    return {
      video:   { x: bxV, y: byV, w: bwV, h: bhV },
      display: {
        x: (bxV - m.visX) * m.scale, y: (byV - m.visY) * m.scale,
        w: bwV * m.scale, h: bhV * m.scale,
      },
    };
  }

  // Cached wrapper over the pure map builder in unwarp.js.
  function getColumnMap(thetaMax, widthFactor, roiW) {
    const key = thetaMax.toFixed(4) + '|' + widthFactor + '|' + roiW;
    let entry = mapCache.get(key);
    if (!entry) {
      entry = CylUnwarp.computeColumnMap(thetaMax, widthFactor, roiW);
      mapCache.set(key, entry);
    }
    return entry;
  }

  // ---------- Main loop ----------
  function currentProfile() {
    if (manualMode) {
      return { thetaMax: (+curveSlider.value) * Math.PI / 180, widthFactor: 1 };
    }
    if (stickyProfile && stickyFails < STICKY_FAIL_LIMIT) return stickyProfile;
    stickyProfile = null;
    const p = PROFILES[profileIdx];
    profileIdx = (profileIdx + 1) % PROFILES.length;
    return p;
  }

  function tick(now) {
    if (!scanning) return;
    requestAnimationFrame(tick);
    if (video.readyState < 2 || !video.videoWidth) return;

    // Overlay is redrawn every frame so it tracks rotation/resize.
    if (overlay.width !== overlay.clientWidth * devicePixelRatio) {
      overlay.width = overlay.clientWidth * devicePixelRatio;
      overlay.height = overlay.clientHeight * devicePixelRatio;
    }
    const m = coverMapping();
    const box = guideBox(m);
    drawOverlay(box.display);

    if (decodeBusy || now - lastScanTime < SCAN_INTERVAL_MS) return;
    lastScanTime = now;

    // 1. Grab the guide-box region of the frame.
    const bv = box.video;
    const roiW = ROI_W;
    const roiH = Math.max(2, Math.round(ROI_W * bv.h / bv.w));
    if (roiCanvas.width !== roiW || roiCanvas.height !== roiH) {
      roiCanvas.width = roiW; roiCanvas.height = roiH;
    }
    rctx.drawImage(video, bv.x, bv.y, bv.w, bv.h, 0, 0, roiW, roiH);
    let img;
    try {
      img = rctx.getImageData(0, 0, roiW, roiH);
    } catch (_) {
      return; // canvas not ready yet
    }

    // 2-4. Flatten with the current curvature hypothesis and decode.
    // Async because the native BarcodeDetector is; the busy flag stops
    // overlapping attempts.
    decodeBusy = true;
    decodeFrame(img, roiW, roiH, currentProfile())
      .catch(() => {})
      .finally(() => { decodeBusy = false; });
  }

  async function decodeFrame(img, roiW, roiH, prof) {
    const { map, outW } = getColumnMap(prof.thetaMax, prof.widthFactor, roiW);
    const gray = CylUnwarp.toGray(img.data, roiW, roiH);
    let rgba = CylUnwarp.unwarpColumns(gray, roiW, roiH, map, outW);
    attempts++;

    let text = null, loc = null;

    // Draw the flattened strip to a canvas: the native detector consumes it,
    // and the debug-frame export reuses it.
    if (flatCanvas.width !== outW || flatCanvas.height !== roiH) {
      flatCanvas.width = outW; flatCanvas.height = roiH;
    }
    fctx.putImageData(new ImageData(rgba, outW, roiH), 0, 0);

    // Native decoder first — hardware-grade, handles dense/soft codes that
    // jsQR cannot.
    if (nativeDetector) {
      try {
        const found = await nativeDetector.detect(flatCanvas);
        if (found && found.length && found[0].rawValue) text = found[0].rawValue;
      } catch (_) {
        nativeDetector = null; // exposed but non-functional; fall back for good
      }
    }

    if (!text) {
      let code = jsQR(rgba, outW, roiH, { inversionAttempts: 'attemptBoth' });
      if (!code) {
        // Retry sharpened — recovers mildly defocused frames.
        const sharp = CylUnwarp.unwarpColumns(
          CylUnwarp.sharpenGray(gray, roiW, roiH), roiW, roiH, map, outW);
        code = jsQR(sharp, outW, roiH, { inversionAttempts: 'attemptBoth' });
        if (code) rgba = sharp;
      }
      if (code && code.data) { text = code.data; loc = code.location; }
    }

    drawPreview(rgba, outW, roiH, loc);
    const deg = Math.round(prof.thetaMax * 180 / Math.PI);
    statusEl.textContent =
      (manualMode ? `manual ${deg}°` : stickyProfile ? `locked ${deg}°` : `sweeping… ${deg}°`) +
      ` · attempt ${attempts}` +
      (nativeDetector ? ' · native+jsQR' : ' · jsQR only');

    if (text) {
      if (!manualMode) { stickyProfile = prof; stickyFails = 0; }
      showResult(text);
    } else if (stickyProfile) {
      stickyFails++;
    }
  }

  // Export the current raw ROI and flattened strip — for diagnosing why
  // frames fail to decode. Uses the share sheet where available (iOS), plain
  // downloads elsewhere.
  async function saveDebugFrame() {
    if (!flatCanvas.width || !roiCanvas.width) return;
    const toFile = (canvas, name) => new Promise((res) =>
      canvas.toBlob((b) => res(b && new File([b], name, { type: 'image/png' })), 'image/png'));
    const files = (await Promise.all([
      toFile(roiCanvas, 'roi-raw.png'),
      toFile(flatCanvas, 'roi-flattened.png'),
    ])).filter(Boolean);
    if (!files.length) return;
    if (navigator.canShare && navigator.canShare({ files })) {
      try { await navigator.share({ files, title: 'QR scanner debug frames' }); return; } catch (_) {}
    }
    for (const f of files) {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(f);
      a.download = f.name;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 10000);
    }
  }
  document.getElementById('saveBtn').addEventListener('click', saveDebugFrame);

  function drawOverlay(b) {
    const dpr = devicePixelRatio;
    octx.setTransform(dpr, 0, 0, dpr, 0, 0);
    octx.clearRect(0, 0, overlay.clientWidth, overlay.clientHeight);

    // Dim everything outside the guide box.
    octx.fillStyle = 'rgba(0,0,0,0.45)';
    octx.beginPath();
    octx.rect(0, 0, overlay.clientWidth, overlay.clientHeight);
    octx.rect(b.x, b.y, b.w, b.h);
    octx.fill('evenodd');

    // Cylinder edge guides (align the silhouette to these).
    octx.strokeStyle = '#30d158';
    octx.lineWidth = 3;
    octx.beginPath();
    octx.moveTo(b.x, b.y - 14);         octx.lineTo(b.x, b.y + b.h + 14);
    octx.moveTo(b.x + b.w, b.y - 14);   octx.lineTo(b.x + b.w, b.y + b.h + 14);
    octx.stroke();

    // Box top/bottom.
    octx.strokeStyle = 'rgba(255,255,255,0.85)';
    octx.lineWidth = 1.5;
    octx.strokeRect(b.x, b.y, b.w, b.h);

    // Center axis hint.
    octx.strokeStyle = 'rgba(255,255,255,0.35)';
    octx.setLineDash([6, 6]);
    octx.beginPath();
    octx.moveTo(b.x + b.w / 2, b.y);
    octx.lineTo(b.x + b.w / 2, b.y + b.h);
    octx.stroke();
    octx.setLineDash([]);

    octx.fillStyle = 'rgba(255,255,255,0.9)';
    octx.font = '12px -apple-system, sans-serif';
    octx.textAlign = 'center';
    octx.fillText('Align cylinder edges with green lines', b.x + b.w / 2, b.y - 22);
  }

  function drawPreview(rgba, w, h, loc) {
    if (preview.width !== w || preview.height !== h) {
      preview.width = w; preview.height = h;
    }
    pctx.putImageData(new ImageData(rgba, w, h), 0, 0);
    if (loc) {
      const L = loc;
      pctx.strokeStyle = '#30d158';
      pctx.lineWidth = Math.max(2, w / 150);
      pctx.beginPath();
      pctx.moveTo(L.topLeftCorner.x, L.topLeftCorner.y);
      pctx.lineTo(L.topRightCorner.x, L.topRightCorner.y);
      pctx.lineTo(L.bottomRightCorner.x, L.bottomRightCorner.y);
      pctx.lineTo(L.bottomLeftCorner.x, L.bottomLeftCorner.y);
      pctx.closePath();
      pctx.stroke();
    }
  }
})();
