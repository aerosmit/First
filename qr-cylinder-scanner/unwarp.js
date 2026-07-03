/*
 * Pure image-geometry helpers for the cylinder QR scanner.
 * Loaded by app.js in the browser (as window.CylUnwarp) and required
 * directly by the Node test suite.
 */
(function (global) {
  'use strict';

  /*
   * Column map for the cylindrical unwarp.
   *
   * A label wrapped on a cylinder, viewed head-on, projects a point at angle
   * theta (around the axis) to image x ≈ W·sin(theta), where W is the apparent
   * silhouette half-width. The flat label coordinate is arc length R·theta.
   * To flatten, output columns are spaced evenly in theta and sampled from
   * source column cx + W·sin(theta).
   *
   * Output width outW = roiW · thetaMax/sin(thetaMax) keeps the scale at the
   * center of the label unchanged while stretching the edges back out.
   * Returns { map, outW } where map[i] is the fractional source x for output
   * column i.
   */
  // offsetFrac shifts the assumed cylinder centerline laterally (fraction of
  // ROI width) for codes that sit off-center on the vial.
  function computeColumnMap(thetaMax, widthFactor, roiW, offsetFrac) {
    if (thetaMax === 0) {
      const map = new Float32Array(roiW);
      for (let i = 0; i < roiW; i++) map[i] = i;
      return { map, outW: roiW };
    }
    const outW = Math.round(roiW * thetaMax / Math.sin(thetaMax));
    const map = new Float32Array(outW);
    const cx = (roiW - 1) / 2 + (offsetFrac || 0) * roiW;
    const halfW = ((roiW - 1) / 2) * widthFactor;
    for (let i = 0; i < outW; i++) {
      const u = (i / (outW - 1)) * 2 - 1;       // -1..1 across the flattened label
      const theta = u * thetaMax;
      let sx = cx + halfW * Math.sin(theta);
      if (sx < 0) sx = 0;
      if (sx > roiW - 1.001) sx = roiW - 1.001;
      map[i] = sx;
    }
    return { map, outW };
  }

  // Luma from RGBA pixel data.
  function toGray(data, width, height) {
    const g = new Uint8ClampedArray(width * height);
    for (let i = 0, j = 0; j < g.length; i += 4, j++) {
      g[j] = (data[i] * 77 + data[i + 1] * 150 + data[i + 2] * 29) >> 8;
    }
    return g;
  }

  // Horizontally resample a grayscale ROI through the column map into an
  // RGBA buffer (jsQR consumes RGBA; R=G=B=luma), with linear interpolation.
  function unwarpColumns(gray, roiW, roiH, map, outW) {
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

  // Unsharp mask on a grayscale buffer — recovers mildly defocused frames
  // (the iPhone main camera can't focus closer than ~10-12 cm, so close-up
  // frames are often slightly soft). Borders are copied unmodified.
  function sharpenGray(gray, w, h, amount) {
    const k = amount === undefined ? 0.6 : amount;
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

  // Focus/sharpness score: 98th percentile of |horizontal gradient| via
  // histogram (content-tolerant — ignores how much of the frame is blank
  // label/background). Calibrated against decodability of a dense 45-module
  // QR at app framing: frames decode down to ~scores in the low 20s, fail
  // below ~19; badly defocused real captures score under 10.
  function sharpnessP98(gray, w, h) {
    const hist = new Uint32Array(256);
    let n = 0;
    for (let y = 0; y < h; y++) {
      const base = y * w;
      for (let x = 1; x < w; x++) {
        hist[Math.abs(gray[base + x] - gray[base + x - 1])]++;
        n++;
      }
    }
    let acc = 0;
    const target = n * 0.98;
    for (let v = 0; v < 256; v++) {
      acc += hist[v];
      if (acc >= target) return v;
    }
    return 255;
  }

  const api = { computeColumnMap, toGray, unwarpColumns, sharpenGray, sharpnessP98 };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else global.CylUnwarp = api;
})(typeof self !== 'undefined' ? self : this);
