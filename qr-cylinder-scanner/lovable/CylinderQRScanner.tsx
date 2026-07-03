/**
 * CylinderQRScanner — single-file React component for lovable.dev
 * ================================================================
 * Scans QR codes wrapped around small cylinders (e.g. a 1.6 cm vial) live
 * from the phone's camera, by digitally "un-curving" each frame before
 * decoding.
 *
 * LOVABLE SETUP (tell Lovable, or it will infer from this header):
 *   1. Add the npm dependencies "jsqr" (^1.4.0) and "zxing-wasm" (^2).
 *   2. Use this component as the main (index) page, full screen.
 *   3. No other dependencies needed — styling is Tailwind, all logic is here.
 *   4. Camera requires HTTPS — Lovable previews/deploys are HTTPS, so it
 *      works out of the box; open the deployed URL in iPhone Safari.
 *
 * HOW IT WORKS
 * A label wrapped on a cylinder of radius R, viewed head-on, projects a point
 * at angle θ (around the axis) to image x ≈ W·sin(θ), where W is the apparent
 * half-width of the cylinder silhouette; the flat label coordinate is the arc
 * length R·θ. Each frame we resample columns of the guide-box region so output
 * columns are evenly spaced in θ (sampled from source column cx + W·sin(θ)),
 * which stretches the compressed edges back out flat. The wrap angle is
 * unknown, so Auto mode sweeps a set of curvature hypotheses (flat, 40–82°,
 * three width calibrations), one per frame, and locks onto whichever decodes.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import { readBarcodes } from "zxing-wasm/reader";

// Decode order per frame: native BarcodeDetector (hardware, where Safari
// exposes it) → ZXing wasm (strongest software decoder; handles rotation,
// low contrast, dense codes) → jsQR (+ sharpened retry) as a last resort.
const ZXING_OPTS = { formats: ["QRCode"], tryHarder: true, tryRotate: true, tryInvert: true } as const;
let zxingBroken = false; // set if the wasm fails to load; degrade gracefully

// ---------------- pure geometry helpers ----------------

type Profile = { thetaMax: number; widthFactor: number; offset: number };
type ColumnMap = { map: Float32Array; outW: number };

// The raw frame goes to native + ZXing every attempt, so the flatten sweep
// focuses on strong-curvature hypotheses, including off-center codes (offset
// = lateral shift of the assumed cylinder centerline, as a fraction of ROI
// width) and vials wider than the guide box (widthFactor > 1).
const PROFILES: Profile[] = [{ thetaMax: 0, widthFactor: 1, offset: 0 }];
for (const deg of [45, 60, 72]) {
  for (const wf of [1.0, 1.15, 1.3]) {
    for (const off of [0, 0.12, -0.12]) {
      PROFILES.push({ thetaMax: (deg * Math.PI) / 180, widthFactor: wf, offset: off });
    }
  }
}

const ROI_MIN_W = 560; // floor for the sampled region-of-interest width
const ROI_MAX_W = 1120; // cap; above this decode cost outweighs detail
const SCAN_INTERVAL_MS = 70; // ~14 decode attempts/sec
const STICKY_FAIL_LIMIT = 14; // failures before re-sweeping a locked profile
const BOX_W_FRAC = 0.64; // guide box fraction of visible frame width
const BOX_H_FRAC = 0.34;

/** Column resample map for the cylindrical unwarp. map[i] = fractional source x. */
function computeColumnMap(thetaMax: number, widthFactor: number, roiW: number, offsetFrac = 0): ColumnMap {
  if (thetaMax === 0) {
    const map = new Float32Array(roiW);
    for (let i = 0; i < roiW; i++) map[i] = i;
    return { map, outW: roiW };
  }
  const outW = Math.round((roiW * thetaMax) / Math.sin(thetaMax));
  const map = new Float32Array(outW);
  const cx = (roiW - 1) / 2 + offsetFrac * roiW;
  const halfW = ((roiW - 1) / 2) * widthFactor;
  for (let i = 0; i < outW; i++) {
    const u = (i / (outW - 1)) * 2 - 1; // -1..1 across the flattened label
    const theta = u * thetaMax;
    let sx = cx + halfW * Math.sin(theta);
    if (sx < 0) sx = 0;
    if (sx > roiW - 1.001) sx = roiW - 1.001;
    map[i] = sx;
  }
  return { map, outW };
}

/** Unsharp mask on a grayscale buffer — recovers mildly defocused frames
 * (the iPhone main camera can't focus closer than ~10-12 cm). */
function sharpenGray(gray: Uint8ClampedArray, w: number, h: number, k = 0.6): Uint8ClampedArray {
  const out = new Uint8ClampedArray(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      if (x === 0 || y === 0 || x === w - 1 || y === h - 1) { out[i] = gray[i]; continue; }
      out[i] = (1 + 4 * k) * gray[i] -
               k * (gray[i - 1] + gray[i + 1] + gray[i - w] + gray[i + w]);
    }
  }
  return out;
}

/** Focus score: 98th percentile of |horizontal gradient| via histogram.
 * Calibrated against decodability of a dense 45-module QR at app framing:
 * frames decode at scores in the low 20s+, fail below ~19. */
function sharpnessP98(gray: Uint8ClampedArray, w: number, h: number): number {
  const hist = new Uint32Array(256);
  let n = 0;
  for (let y = 0; y < h; y++) {
    const base = y * w;
    for (let x = 1; x < w; x++) { hist[Math.abs(gray[base + x] - gray[base + x - 1])]++; n++; }
  }
  let acc = 0;
  const target = n * 0.98;
  for (let v = 0; v < 256; v++) { acc += hist[v]; if (acc >= target) return v; }
  return 255;
}

/** Luma from RGBA pixel data. */
function toGray(data: Uint8ClampedArray, width: number, height: number): Uint8ClampedArray {
  const g = new Uint8ClampedArray(width * height);
  for (let i = 0, j = 0; j < g.length; i += 4, j++) {
    g[j] = (data[i] * 77 + data[i + 1] * 150 + data[i + 2] * 29) >> 8;
  }
  return g;
}

/** Resample gray ROI through the column map into RGBA (R=G=B=luma) for jsQR. */
function unwarpColumns(
  gray: Uint8ClampedArray, roiW: number, roiH: number, map: Float32Array, outW: number,
): Uint8ClampedArray {
  const out = new Uint8ClampedArray(outW * roiH * 4);
  for (let y = 0; y < roiH; y++) {
    const srcBase = y * roiW;
    let dst = y * outW * 4;
    for (let i = 0; i < outW; i++) {
      const sx = map[i];
      const x0 = sx | 0;
      const f = sx - x0;
      const x1 = x0 + 1 < roiW ? x0 + 1 : x0;
      const v = (gray[srcBase + x0] * (1 - f) + gray[srcBase + x1] * f) | 0;
      out[dst] = v; out[dst + 1] = v; out[dst + 2] = v; out[dst + 3] = 255;
      dst += 4;
    }
  }
  return out;
}

// ---------------- component ----------------

type Phase = "start" | "scanning" | "result";

export default function CylinderQRScanner() {
  const [phase, setPhase] = useState<Phase>("start");
  const [starting, setStarting] = useState(false);
  const [result, setResult] = useState("");
  const [manualMode, setManualMode] = useState(false);
  const [curveDeg, setCurveDeg] = useState(60);
  const [zoomCaps, setZoomCaps] = useState<{ min: number; max: number; step: number } | null>(null);
  const [zoom, setZoom] = useState(1);
  const [hasTorch, setHasTorch] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const [copied, setCopied] = useState(false);
  const [debugShots, setDebugShots] = useState<{ raw: string; flat: string } | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const previewRef = useRef<HTMLCanvasElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const streamRef = useRef<MediaStream | null>(null);
  const trackRef = useRef<MediaStreamTrack | null>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const rafRef = useRef(0);
  const roiCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const flatCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const decodeBusyRef = useRef(false);
  const lastFocusRef = useRef(-1); // sharpness of latest ROI (sharpnessP98)
  // Native decoder (hardware-grade; far more tolerant of blur/density than
  // jsQR). Not exposed by all iOS Safari versions — feature-detected.
  const nativeDetectorRef = useRef<any>(undefined);
  if (nativeDetectorRef.current === undefined) {
    nativeDetectorRef.current = null;
    if ("BarcodeDetector" in window) {
      try { nativeDetectorRef.current = new (window as any).BarcodeDetector({ formats: ["qr_code"] }); } catch { /* unsupported */ }
    }
  }

  // Mutable scan-loop state kept in refs so the rAF loop never goes stale.
  const scan = useRef({
    running: false,
    lastScanTime: 0,
    profileIdx: 0,
    sticky: null as Profile | null,
    stickyFails: 0,
    attempts: 0,
    manual: false,
    manualDeg: 60,
  });
  scan.current.manual = manualMode;
  scan.current.manualDeg = curveDeg;

  const mapCache = useRef(new Map<string, ColumnMap>());
  const getColumnMap = (thetaMax: number, widthFactor: number, roiW: number, offsetFrac = 0): ColumnMap => {
    const key = `${thetaMax.toFixed(4)}|${widthFactor}|${roiW}|${offsetFrac}`;
    let e = mapCache.current.get(key);
    if (!e) { e = computeColumnMap(thetaMax, widthFactor, roiW, offsetFrac); mapCache.current.set(key, e); }
    return e;
  };

  const beep = () => {
    const ctx = audioRef.current;
    if (!ctx) return;
    try {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.frequency.value = 1318;
      g.gain.setValueAtTime(0.15, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      o.connect(g).connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 0.2);
    } catch { /* best-effort */ }
  };

  const onDecoded = useCallback((text: string) => {
    scan.current.running = false;
    cancelAnimationFrame(rafRef.current);
    setResult(text);
    setCopied(false);
    setPhase("result");
    beep();
    if (navigator.vibrate) navigator.vibrate(80);
  }, []);

  // ---------- main scan loop ----------
  const tick = useCallback((now: number) => {
    const s = scan.current;
    if (!s.running) return;
    rafRef.current = requestAnimationFrame(tick);

    const video = videoRef.current, overlay = overlayRef.current;
    if (!video || !overlay || video.readyState < 2 || !video.videoWidth) return;

    // object-fit: cover mapping between display px and video px
    const dw = overlay.clientWidth, dh = overlay.clientHeight;
    const vw = video.videoWidth, vh = video.videoHeight;
    const scale = Math.max(dw / vw, dh / vh);
    const visW = dw / scale, visH = dh / scale;
    const visX = (vw - visW) / 2, visY = (vh - visH) / 2;
    const bwV = visW * BOX_W_FRAC, bhV = visH * BOX_H_FRAC;
    const bxV = visX + (visW - bwV) / 2, byV = visY + (visH - bhV) / 2;
    const bD = { x: (bxV - visX) * scale, y: (byV - visY) * scale, w: bwV * scale, h: bhV * scale };

    // overlay
    const dpr = window.devicePixelRatio || 1;
    if (overlay.width !== Math.round(dw * dpr)) { overlay.width = Math.round(dw * dpr); overlay.height = Math.round(dh * dpr); }
    const octx = overlay.getContext("2d")!;
    octx.setTransform(dpr, 0, 0, dpr, 0, 0);
    octx.clearRect(0, 0, dw, dh);
    octx.fillStyle = "rgba(0,0,0,0.45)";
    octx.beginPath();
    octx.rect(0, 0, dw, dh);
    octx.rect(bD.x, bD.y, bD.w, bD.h);
    octx.fill("evenodd");
    octx.strokeStyle = "#30d158";
    octx.lineWidth = 3;
    octx.beginPath();
    octx.moveTo(bD.x, bD.y - 14); octx.lineTo(bD.x, bD.y + bD.h + 14);
    octx.moveTo(bD.x + bD.w, bD.y - 14); octx.lineTo(bD.x + bD.w, bD.y + bD.h + 14);
    octx.stroke();
    octx.strokeStyle = "rgba(255,255,255,0.85)";
    octx.lineWidth = 1.5;
    octx.strokeRect(bD.x, bD.y, bD.w, bD.h);
    octx.setLineDash([6, 6]);
    octx.strokeStyle = "rgba(255,255,255,0.35)";
    octx.beginPath();
    octx.moveTo(bD.x + bD.w / 2, bD.y); octx.lineTo(bD.x + bD.w / 2, bD.y + bD.h);
    octx.stroke();
    octx.setLineDash([]);
    octx.fillStyle = "rgba(255,255,255,0.9)";
    octx.font = "12px -apple-system, sans-serif";
    octx.textAlign = "center";
    octx.fillText("Align cylinder edges with green lines", bD.x + bD.w / 2, bD.y - 22);

    // Live focus meter — a frame only decodes when this reads GOOD.
    const focus = lastFocusRef.current;
    if (focus >= 0) {
      const good = focus >= 22, ok = focus >= 12;
      octx.fillStyle = good ? "#30d158" : ok ? "#ffd60a" : "#ff453a";
      octx.font = "bold 15px -apple-system, sans-serif";
      octx.fillText(
        good ? `Focus: GOOD (${focus})`
          : ok ? `Focus: almost (${focus}) — hold steady`
          : `TOO BLURRY (${focus}) — back up to 12–15 cm, add light`,
        bD.x + bD.w / 2, bD.y + bD.h + 32);
    }

    if (decodeBusyRef.current || now - s.lastScanTime < SCAN_INTERVAL_MS) return;
    s.lastScanTime = now;

    // 1) grab guide-box region at native capture resolution — dense codes
    // need every pixel the sensor delivered
    const roiW = Math.min(ROI_MAX_W, Math.max(ROI_MIN_W, Math.round(bwV)));
    const roiH = Math.max(2, Math.round((roiW * bhV) / bwV));
    if (!roiCanvasRef.current) roiCanvasRef.current = document.createElement("canvas");
    const roiCanvas = roiCanvasRef.current;
    if (roiCanvas.width !== roiW || roiCanvas.height !== roiH) { roiCanvas.width = roiW; roiCanvas.height = roiH; }
    const rctx = roiCanvas.getContext("2d", { willReadFrequently: true })!;
    rctx.drawImage(video, bxV, byV, bwV, bhV, 0, 0, roiW, roiH);
    let img: ImageData;
    try { img = rctx.getImageData(0, 0, roiW, roiH); } catch { return; }

    // 2) pick curvature hypothesis
    let prof: Profile;
    if (s.manual) {
      prof = { thetaMax: (s.manualDeg * Math.PI) / 180, widthFactor: 1, offset: 0 };
    } else if (s.sticky && s.stickyFails < STICKY_FAIL_LIMIT) {
      prof = s.sticky;
    } else {
      s.sticky = null;
      prof = PROFILES[s.profileIdx];
      s.profileIdx = (s.profileIdx + 1) % PROFILES.length;
    }

    // 3-4) flatten + decode + feedback. Async because the native
    // BarcodeDetector is; the busy flag stops overlapping attempts.
    decodeBusyRef.current = true;
    decodeFrame(img, roiW, roiH, prof)
      .catch(() => {})
      .finally(() => { decodeBusyRef.current = false; });
  }, [onDecoded]); // eslint-disable-line react-hooks/exhaustive-deps

  async function decodeFrame(img: ImageData, roiW: number, roiH: number, prof: Profile) {
    const s = scan.current;
    const gray = toGray(img.data, roiW, roiH);
    lastFocusRef.current = sharpnessP98(gray, roiW, roiH);
    if (lastFocusRef.current < 10) return; // hopelessly blurred; save the CPU

    const { map, outW } = getColumnMap(prof.thetaMax, prof.widthFactor, roiW, prof.offset);
    let rgba = unwarpColumns(gray, roiW, roiH, map, outW);
    s.attempts++;

    let text: string | null = null;
    let loc: any = null;

    // Native + ZXing on the raw (un-flattened) frame every attempt — both
    // have their own perspective handling and often read mildly curved codes.
    if (nativeDetectorRef.current && roiCanvasRef.current) {
      try {
        const found = await nativeDetectorRef.current.detect(roiCanvasRef.current);
        if (found?.length && found[0].rawValue) text = found[0].rawValue;
      } catch { nativeDetectorRef.current = null; }
    }
    if (!text && !zxingBroken) {
      try {
        const found = await readBarcodes(img, ZXING_OPTS as any);
        if (found.length && found[0].text) text = found[0].text;
      } catch { zxingBroken = true; }
    }

    // Draw the flattened strip to a canvas: the native detector consumes it,
    // and the debug-frame export reuses it.
    if (!flatCanvasRef.current) flatCanvasRef.current = document.createElement("canvas");
    const flatCanvas = flatCanvasRef.current;
    if (flatCanvas.width !== outW || flatCanvas.height !== roiH) { flatCanvas.width = outW; flatCanvas.height = roiH; }
    const fctx = flatCanvas.getContext("2d")!;
    // Cast: some TS DOM libs type ImageData's param as Uint8ClampedArray<ArrayBuffer>
    fctx.putImageData(new ImageData(rgba as never, outW, roiH), 0, 0);

    // Native decoder on the flattened strip.
    if (!text && nativeDetectorRef.current) {
      try {
        const found = await nativeDetectorRef.current.detect(flatCanvas);
        if (found?.length && found[0].rawValue) text = found[0].rawValue;
      } catch {
        nativeDetectorRef.current = null; // exposed but non-functional
      }
    }

    // ZXing wasm — much stronger than jsQR on rotated/low-contrast/dense codes.
    if (!text && !zxingBroken) {
      try {
        const found = await readBarcodes(
          new ImageData(rgba as never, outW, roiH), ZXING_OPTS as any);
        if (found.length && found[0].text) text = found[0].text;
      } catch {
        zxingBroken = true;
      }
    }

    if (!text) {
      let code = jsQR(rgba, outW, roiH, { inversionAttempts: "attemptBoth" });
      if (!code) {
        // Retry sharpened — recovers mildly defocused frames.
        const sharp = unwarpColumns(sharpenGray(gray, roiW, roiH), roiW, roiH, map, outW);
        code = jsQR(sharp, outW, roiH, { inversionAttempts: "attemptBoth" });
        if (code) rgba = sharp;
      }
      if (code?.data) { text = code.data; loc = code.location; }
    }

    const preview = previewRef.current;
    if (preview) {
      if (preview.width !== outW || preview.height !== roiH) { preview.width = outW; preview.height = roiH; }
      const pctx = preview.getContext("2d")!;
      pctx.putImageData(new ImageData(rgba as never, outW, roiH), 0, 0);
      if (loc) {
        pctx.strokeStyle = "#30d158";
        pctx.lineWidth = Math.max(2, outW / 150);
        pctx.beginPath();
        pctx.moveTo(loc.topLeftCorner.x, loc.topLeftCorner.y);
        pctx.lineTo(loc.topRightCorner.x, loc.topRightCorner.y);
        pctx.lineTo(loc.bottomRightCorner.x, loc.bottomRightCorner.y);
        pctx.lineTo(loc.bottomLeftCorner.x, loc.bottomLeftCorner.y);
        pctx.closePath();
        pctx.stroke();
      }
    }
    const deg = Math.round((prof.thetaMax * 180) / Math.PI);
    if (statusRef.current) {
      statusRef.current.textContent =
        (s.manual ? `manual ${deg}°` : s.sticky ? `locked ${deg}°` : `sweeping… ${deg}°`) +
        ` · attempt ${s.attempts}` +
        ` · ${[nativeDetectorRef.current && "native", !zxingBroken && "zxing", "jsQR"].filter(Boolean).join("+")}`;
    }

    if (text) {
      if (!s.manual) { s.sticky = prof; s.stickyFails = 0; }
      onDecoded(text);
    } else if (s.sticky) {
      s.stickyFails++;
    }
  }

  /** Export the current raw ROI + flattened strip — for diagnosing why
   * frames fail to decode.
   *
   * Everything up to the share() call must run synchronously in the tap
   * handler: iOS Safari drops the user-activation grant across async waits
   * (canvas.toBlob), which made the share sheet silently never open. Capture
   * via toDataURL (synchronous) instead, and if the share sheet still isn't
   * available, show the images in an overlay the user can long-press to save. */
  const saveDebugFrame = () => {
    const roiCanvas = roiCanvasRef.current, flatCanvas = flatCanvasRef.current;
    if (!roiCanvas?.width || !flatCanvas?.width) return;
    const rawURL = roiCanvas.toDataURL("image/png");
    const flatURL = flatCanvas.toDataURL("image/png");
    const fileFromDataURL = (dataURL: string, name: string) => {
      const bin = atob(dataURL.split(",")[1]);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      return new File([bytes], name, { type: "image/png" });
    };
    const files = [fileFromDataURL(rawURL, "roi-raw.png"), fileFromDataURL(flatURL, "roi-flattened.png")];
    if (navigator.canShare?.({ files }) && navigator.share) {
      navigator.share({ files, title: "QR scanner debug frames" })
        .catch((e) => { if (e?.name !== "AbortError") setDebugShots({ raw: rawURL, flat: flatURL }); });
      return;
    }
    setDebugShots({ raw: rawURL, flat: flatURL });
  };

  const startScanning = () => {
    scan.current.running = true;
    scan.current.lastScanTime = 0;
    rafRef.current = requestAnimationFrame(tick);
    setPhase("scanning");
  };

  const startCamera = async () => {
    setStarting(true);
    try {
      audioRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        // 4K if available: a dense code on a 1.6 cm vial needs every pixel.
        video: { facingMode: { ideal: "environment" }, width: { ideal: 3840 }, height: { ideal: 2160 } },
      });
      streamRef.current = stream;
      const video = videoRef.current!;
      video.srcObject = stream;
      await video.play();
      const track = stream.getVideoTracks()[0];
      trackRef.current = track;
      const caps: any = track.getCapabilities ? track.getCapabilities() : {};
      if (caps.zoom) {
        setZoomCaps({ min: caps.zoom.min ?? 1, max: Math.min(caps.zoom.max ?? 4, 6), step: caps.zoom.step ?? 0.1 });
        setZoom((track.getSettings() as any).zoom ?? caps.zoom.min ?? 1);
      }
      if (caps.torch) setHasTorch(true);
      startScanning();
    } catch (err: any) {
      alert(
        "Camera failed to start: " + (err?.message ?? err) +
        (window.isSecureContext ? "" : "\n\nThis page must be served over HTTPS."),
      );
    } finally {
      setStarting(false);
    }
  };

  const applyZoom = (z: number) => {
    setZoom(z);
    trackRef.current?.applyConstraints({ advanced: [{ zoom: z } as any] }).catch(() => {});
  };
  const toggleTorch = () => {
    const next = !torchOn;
    setTorchOn(next);
    trackRef.current?.applyConstraints({ advanced: [{ torch: next } as any] }).catch(() => {});
  };

  // cleanup on unmount
  useEffect(() => () => {
    scan.current.running = false;
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    audioRef.current?.close().catch(() => {});
  }, []);

  const isUrl = /^https?:\/\/\S+$/i.test(result.trim());

  return (
    <div className="fixed inset-0 bg-black text-white font-sans overflow-hidden select-none">
      {/* camera + overlay */}
      <video ref={videoRef} playsInline muted autoPlay className="absolute inset-0 w-full h-full object-cover" />
      <canvas ref={overlayRef} className="absolute inset-0 w-full h-full" />

      {/* start screen */}
      {phase === "start" && (
        <div className="absolute inset-0 z-20 bg-black flex flex-col items-center justify-center gap-4 p-6 text-center">
          <h1 className="text-2xl font-bold">Cylinder QR Scanner</h1>
          <p className="text-sm text-neutral-400 max-w-xs leading-relaxed">
            Reads QR codes wrapped around small cylinders (≈1.6&nbsp;cm vials) by digitally
            un-curving the label in real time.
          </p>
          <p className="text-sm text-neutral-400 max-w-xs leading-relaxed">
            Hold the cylinder <b className="text-white">upright</b>, align its left/right edges with
            the two green guide lines. Keep it <b className="text-white">12–15&nbsp;cm</b> away —
            closer than ~10&nbsp;cm the camera cannot focus — and use <b className="text-white">zoom
            (2–3×)</b> to fill the frame. The preview strip must show crisp, separated squares.
          </p>
          {!window.isSecureContext && (
            <p className="text-sm text-amber-400">⚠️ Camera access requires HTTPS.</p>
          )}
          <button
            onClick={startCamera}
            disabled={starting}
            className="mt-2 rounded-2xl bg-green-500 px-10 py-3.5 text-lg font-semibold text-black disabled:opacity-50"
          >
            {starting ? "Starting…" : "Start camera"}
          </button>
        </div>
      )}

      {/* un-curved preview strip */}
      {phase !== "start" && (
        <div
          className="absolute left-1/2 -translate-x-1/2 z-10 w-[86vw] max-w-[460px] rounded-xl bg-black/55 p-1.5 backdrop-blur"
          style={{ bottom: "calc(150px + env(safe-area-inset-bottom))" }}
        >
          <div className="mb-1 text-[10px] uppercase tracking-wider text-neutral-400">
            Un-curved view (what the decoder sees)
          </div>
          <canvas ref={previewRef} className="block w-full rounded-md bg-neutral-900" />
        </div>
      )}

      {/* controls */}
      {phase !== "start" && (
        <div
          className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-2.5 px-4 pt-3 bg-gradient-to-t from-black/75 to-transparent"
          style={{ paddingBottom: "calc(12px + env(safe-area-inset-bottom))" }}
        >
          <div ref={statusRef} className="min-h-[15px] text-center text-xs text-neutral-400 tabular-nums" />
          <div className="flex items-center gap-2.5">
            <label className="w-[76px] flex-none text-xs text-neutral-300">Curvature</label>
            <input
              type="range" min={0} max={85} step={1} value={curveDeg}
              disabled={!manualMode}
              onChange={(e) => setCurveDeg(+e.target.value)}
              className="h-7 flex-1 accent-green-500"
            />
            <output className="w-11 flex-none text-right text-xs text-neutral-300 tabular-nums">
              {manualMode ? `${curveDeg}°` : "auto"}
            </output>
            <button
              onClick={() => { setManualMode(!manualMode); scan.current.sticky = null; }}
              className={`rounded-full px-3.5 py-2 text-[13px] font-semibold ${
                manualMode ? "bg-white/15 text-white" : "bg-green-500 text-black"
              }`}
            >
              Auto
            </button>
          </div>
          <div className="flex justify-center">
            <button
              onClick={saveDebugFrame}
              className="rounded-full bg-white/15 px-3.5 py-2 text-[13px] font-semibold text-white"
            >
              Save debug frame
            </button>
          </div>
          {(zoomCaps || hasTorch) && (
            <div className="flex items-center gap-2.5">
              <label className="w-[76px] flex-none text-xs text-neutral-300">Zoom</label>
              {zoomCaps ? (
                <>
                  <input
                    type="range" min={zoomCaps.min} max={zoomCaps.max} step={zoomCaps.step} value={zoom}
                    onChange={(e) => applyZoom(+e.target.value)}
                    className="h-7 flex-1 accent-green-500"
                  />
                  <output className="w-11 flex-none text-right text-xs text-neutral-300 tabular-nums">
                    {zoom.toFixed(1)}×
                  </output>
                </>
              ) : (
                <div className="flex-1" />
              )}
              {hasTorch && (
                <button
                  onClick={toggleTorch}
                  className={`rounded-full px-3.5 py-2 text-[13px] font-semibold ${
                    torchOn ? "bg-green-500 text-black" : "bg-white/15 text-white"
                  }`}
                >
                  Torch
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* debug frames overlay (long-press images to save on iOS) */}
      {debugShots && (
        <div
          className="fixed inset-0 z-40 flex flex-col gap-3.5 overflow-y-auto bg-black/95 px-4 pt-5"
          style={{ paddingBottom: "calc(20px + env(safe-area-inset-bottom))" }}
        >
          <div className="flex items-center justify-between">
            <b className="text-[15px]">Debug frames</b>
            <button
              onClick={() => setDebugShots(null)}
              className="rounded-full bg-white/15 px-3.5 py-2 text-[13px] font-semibold"
            >
              Close
            </button>
          </div>
          <p className="text-[13px] leading-relaxed text-neutral-400">
            Long-press an image → <b className="text-white">Save to Photos</b> (or take a
            screenshot). The flattened strip is exactly what the decoder saw.
          </p>
          <div>
            <div className="mb-1 text-[11px] uppercase tracking-wider text-neutral-400">Raw camera crop</div>
            <img src={debugShots.raw} alt="raw ROI" className="w-full rounded-lg bg-neutral-900" />
          </div>
          <div>
            <div className="mb-1 text-[11px] uppercase tracking-wider text-neutral-400">Flattened (what the decoder sees)</div>
            <img src={debugShots.flat} alt="flattened strip" className="w-full rounded-lg bg-neutral-900" />
          </div>
        </div>
      )}

      {/* result sheet */}
      <div
        className={`fixed inset-x-0 bottom-0 z-30 rounded-t-3xl bg-neutral-900 p-5 shadow-[0_-8px_40px_rgba(0,0,0,0.6)] transition-transform duration-300 ${
          phase === "result" ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ paddingBottom: "calc(24px + env(safe-area-inset-bottom))" }}
      >
        <h2 className="mb-2 text-[13px] font-semibold uppercase tracking-wider text-neutral-500">
          QR code detected
        </h2>
        <div className="max-h-[30vh] overflow-y-auto break-all text-base leading-relaxed">
          {isUrl ? (
            <a href={result.trim()} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
              {result}
            </a>
          ) : (
            result
          )}
        </div>
        <div className="mt-4 flex gap-2.5">
          <button
            onClick={() => {
              navigator.clipboard.writeText(result).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1200);
              }).catch(() => {});
            }}
            className="flex-1 rounded-xl bg-white/15 py-3 text-[15px] font-semibold"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={startScanning}
            className="flex-1 rounded-xl bg-green-500 py-3 text-[15px] font-semibold text-black"
          >
            Scan again
          </button>
        </div>
      </div>
    </div>
  );
}
