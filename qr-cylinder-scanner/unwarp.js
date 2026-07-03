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
  function computeColumnMap(thetaMax, widthFactor, roiW) {
    if (thetaMax === 0) {
      const map = new Float32Array(roiW);
      for (let i = 0; i < roiW; i++) map[i] = i;
      return { map, outW: roiW };
    }
    const outW = Math.round(roiW * thetaMax / Math.sin(thetaMax));
    const map = new Float32Array(outW);
    const cx = (roiW - 1) / 2;
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

  const api = { computeColumnMap, toGray, unwarpColumns };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else global.CylUnwarp = api;
})(typeof self !== 'undefined' ? self : this);
