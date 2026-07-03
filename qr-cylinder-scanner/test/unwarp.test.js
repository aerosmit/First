/*
 * End-to-end test of the cylindrical unwarp pipeline (no browser needed):
 *
 *   1. Rasterize a known QR code (bit matrix embedded below; encodes
 *      "https://example.com/vial/1234").
 *   2. Forward-warp it as if the label were wrapped around a 1.6 cm diameter
 *      cylinder and photographed head-on (orthographic projection:
 *      x = W·sin(theta)).
 *   3. Confirm jsQR CANNOT read the warped image as-is.
 *   4. Run the app's actual unwarp code (unwarp.js) over the same curvature
 *      sweep the app uses, and confirm jsQR decodes the flattened image back
 *      to the original text.
 *
 * Run:  node test/unwarp.test.js
 */
'use strict';

const path = require('path');
const jsQR = require(path.join(__dirname, '..', 'vendor', 'jsQR.js'));
const { computeColumnMap, unwarpColumns } = require(path.join(__dirname, '..', 'unwarp.js'));

const EXPECTED = 'https://example.com/vial/1234';

// 29x29 version-3 QR bit matrix for EXPECTED (1 = dark module).
const QR_ROWS = [
  '11111110010010100011001111111',
  '10000010101101000101101000001',
  '10111010010000010000101011101',
  '10111010010111001010001011101',
  '10111010111101001111001011101',
  '10000010011100111111001000001',
  '11111110101010101010101111111',
  '00000000000100010100100000000',
  '10101010001100001110000010010',
  '10011100011011011000101001001',
  '00100111110110111100001110111',
  '10010101101111101110110010010',
  '11100010100000110011111001011',
  '10100001101010110110011001001',
  '10101010000011000010010111011',
  '10010100101010010101110101010',
  '00001111111010001011111001011',
  '00001001011011011110111001101',
  '10111010001110111010011010011',
  '01010101101001101100100111010',
  '10001111001100110101111110000',
  '00000000100000110011100010111',
  '11111110010101000111101011011',
  '10000010001000010110100011000',
  '10111010110100001000111110000',
  '10111010001100011100110010100',
  '10111010101000011010100111001',
  '10000010011000101101101000010',
  '11111110111010111011100110011',
];

// ---------- helpers ----------

// Rasterize the QR matrix to a grayscale image (quiet zone included).
function rasterizeQR(scale, quietModules) {
  const n = QR_ROWS.length;
  const size = (n + 2 * quietModules) * scale;
  const img = new Uint8ClampedArray(size * size).fill(255);
  for (let my = 0; my < n; my++) {
    for (let mx = 0; mx < n; mx++) {
      if (QR_ROWS[my][mx] !== '1') continue;
      const x0 = (mx + quietModules) * scale;
      const y0 = (my + quietModules) * scale;
      for (let y = y0; y < y0 + scale; y++) {
        img.fill(0, y * size + x0, y * size + x0 + scale);
      }
    }
  }
  return { img, size };
}

// Bilinear-free horizontal sample (linear interp) from a grayscale image.
function sampleRow(img, w, y, x) {
  const x0 = Math.max(0, Math.min(w - 1, Math.floor(x)));
  const x1 = Math.min(w - 1, x0 + 1);
  const f = x - x0;
  return img[y * w + x0] * (1 - f) + img[y * w + x1] * f;
}

/*
 * Forward cylindrical warp: the flat label (width flatW px) wraps the arc
 * [-thetaHalf, +thetaHalf] on the cylinder. Orthographic projection makes the
 * silhouette half-width Wp = (flatW/2)·sin(thetaHalf)/thetaHalf (center scale
 * preserved). Warped column at offset xw from center samples the flat image at
 * arc position s = asin(xw/Wp)/thetaHalf · flatW/2.
 *
 * The label is composited onto an ROI as wide as the full silhouette (2·Wp'
 * where Wp' >= label edge), mimicking a user who aligned the guide lines with
 * the cylinder edges. Bare cylinder surface is white.
 */
function warpOntoCylinder(flat, flatW, flatH, thetaHalfDeg) {
  const thetaHalf = thetaHalfDeg * Math.PI / 180;
  const Wp = (flatW / 2) * Math.sin(thetaHalf) / thetaHalf; // silhouette half-width, px
  const roiW = Math.round(2 * Wp);
  const cx = (roiW - 1) / 2;
  const out = new Uint8ClampedArray(roiW * flatH).fill(255);
  const labelHalf = Wp * Math.sin(thetaHalf); // label edge in warped px
  for (let y = 0; y < flatH; y++) {
    for (let x = 0; x < roiW; x++) {
      const xw = x - cx;
      if (Math.abs(xw) > labelHalf) continue; // bare cylinder
      const theta = Math.asin(Math.max(-1, Math.min(1, xw / Wp)));
      const s = (theta / thetaHalf) * (flatW / 2) + flatW / 2;
      out[y * roiW + x] = sampleRow(flat, flatW, y, s);
    }
  }
  return { img: out, w: roiW, h: flatH };
}

function grayToRGBA(gray) {
  const rgba = new Uint8ClampedArray(gray.length * 4);
  for (let i = 0; i < gray.length; i++) {
    const v = gray[i];
    rgba[i * 4] = v; rgba[i * 4 + 1] = v; rgba[i * 4 + 2] = v; rgba[i * 4 + 3] = 255;
  }
  return rgba;
}

// Same sweep the app uses (app.js PROFILES).
function buildProfiles() {
  const profiles = [{ thetaMax: 0, widthFactor: 1 }];
  for (const deg of [40, 55, 66, 75, 82]) {
    for (const wf of [1.0, 0.93, 1.08]) {
      profiles.push({ thetaMax: deg * Math.PI / 180, widthFactor: wf });
    }
  }
  return profiles;
}

/*
 * Dense QR matched to a real 2 ml vial label (measured from user photos):
 * 45x45 modules (version 7), QR edges at ~±43° around the cylinder.
 * Encodes a pharma-style serial payload.
 */
const EXPECTED_DENSE = 'https://verify.example.com/v?lot=10825&sn=BPC157-0341-99.81&exp=2027-05';
const QR_ROWS_DENSE = [
  '111111101011110011000000011100101000101111111',
  '100000100010010011010001101000010101001000001',
  '101110100011010111101110111001100101001011101',
  '101110101011100000111101001101011101101011101',
  '101110101111111010111111100001110011101011101',
  '100000101110000110111000111010100100001000001',
  '111111101010101010101010101010101010101111111',
  '000000001111011100001000100000110011000000000',
  '100010111101100100101111111100011010111111001',
  '100100011101011001101110101101001101011111100',
  '111001111101101110100100101001000101111111010',
  '100011000101110100111001100011000110101011000',
  '010010100101010011110001011001111111011001010',
  '011101010001100110000001110100110101111100101',
  '111011111010001101010011001110001101111111000',
  '000110011110001101000110011110111110001000010',
  '101000100110001001001100110110001101001101011',
  '011110010111110100011111100011110001110001011',
  '001110100110101001000000000001110010101101110',
  '000000010111110000011010100111010000111000101',
  '100111111010101110111111101011011010111110110',
  '110110001000100011111000111010001110100011100',
  '101010101010001000111010110101100110101011010',
  '011010001111011011111000111101000010100010011',
  '101011111001111011001111111101100100111111000',
  '100110000011010110100010001100110101010001010',
  '010110110111011001101101101110011000011110010',
  '011100001011111110111110011110100001000111001',
  '111110101001001010100000011110010010110111010',
  '110100010111000001111001001011011000110100111',
  '000011110000100111101110001001000001000111011',
  '110100001010001011100011000010001000001111101',
  '101111101000000011011001101001101010011001000',
  '010010001111001101110100111101101110010110100',
  '000010100110100010110001010110101111000100010',
  '011110011001001110111100111011000110011001000',
  '100110101100100001101111110011000100111111111',
  '000000001010011110011000100110010001100011110',
  '111111101110111111001010100111111010101011010',
  '100000100110000111011000110100110110100010000',
  '101110101011000100011111101100011011111111000',
  '101110100011001101010110011001001101110100110',
  '101110100111011010001110101101000101000110000',
  '100000100010100100001000110011001000001111000',
  '111111101100011010011100000001111100110101001',
];

// Rasterize an arbitrary bit-matrix (shared shape with rasterizeQR).
function rasterizeMatrix(rows, scale, quietModules) {
  const n = rows.length;
  const size = (n + 2 * quietModules) * scale;
  const img = new Uint8ClampedArray(size * size).fill(255);
  for (let my = 0; my < n; my++) {
    for (let mx = 0; mx < n; mx++) {
      if (rows[my][mx] !== '1') continue;
      const x0 = (mx + quietModules) * scale;
      const y0 = (my + quietModules) * scale;
      for (let y = y0; y < y0 + scale; y++) {
        img.fill(0, y * size + x0, y * size + x0 + scale);
      }
    }
  }
  return { img, size };
}

// Separable box blur (approximates camera defocus at close range).
function boxBlur(img, w, h, r) {
  if (!r) return img;
  const tmp = new Float32Array(w * h);
  const out = new Uint8ClampedArray(w * h);
  const win = 2 * r + 1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let s = 0;
      for (let k = -r; k <= r; k++) s += img[y * w + Math.max(0, Math.min(w - 1, x + k))];
      tmp[y * w + x] = s / win;
    }
  }
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let s = 0;
      for (let k = -r; k <= r; k++) s += tmp[Math.max(0, Math.min(h - 1, y + k)) * w + x];
      out[y * w + x] = s / win;
    }
  }
  return out;
}

// ---------- test ----------

let failures = 0;
function check(name, cond, detail) {
  console.log((cond ? '  PASS  ' : '  FAIL  ') + name + (detail ? '  (' + detail + ')' : ''));
  if (!cond) failures++;
}

// Label geometry: 1.6 cm diameter => R = 8 mm. Test wrap angles from mild to
// aggressive. e.g. ±65° ≈ an 18 mm-wide label on this cylinder.
for (const wrapDeg of [45, 65, 78]) {
  console.log(`\nWrap half-angle ±${wrapDeg}° (label ${(2 * 8 * wrapDeg * Math.PI / 180).toFixed(1)} mm wide on a 16 mm cylinder):`);

  const { img: flat, size } = rasterizeQR(10, 3);
  const warped = warpOntoCylinder(flat, size, size, wrapDeg);
  const warpedRGBA = grayToRGBA(warped.img);

  // 1) The warped image should NOT decode directly (this is the whole reason
  //    the app exists). Mild wraps may still decode — only assert for steep ones.
  const direct = jsQR(warpedRGBA, warped.w, warped.h, { inversionAttempts: 'dontInvert' });
  if (wrapDeg >= 65) {
    check('warped image is unreadable without correction', !direct,
          direct ? 'unexpectedly decoded: ' + direct.data : 'as expected');
  } else {
    console.log('  info  direct decode of mild warp: ' + (direct ? 'readable' : 'unreadable'));
  }

  // 2) The app's sweep should recover it.
  let decoded = null, hitProfile = null;
  for (const prof of buildProfiles()) {
    const { map, outW } = computeColumnMap(prof.thetaMax, prof.widthFactor, warped.w);
    const rgba = unwarpColumns(warped.img, warped.w, warped.h, map, outW);
    const code = jsQR(rgba, outW, warped.h, { inversionAttempts: 'dontInvert' });
    if (code && code.data === EXPECTED) { decoded = code.data; hitProfile = prof; break; }
  }
  check('sweep recovers the QR content', decoded === EXPECTED,
        hitProfile
          ? `decoded with thetaMax=${Math.round(hitProfile.thetaMax * 180 / Math.PI)}°, wf=${hitProfile.widthFactor}`
          : 'no profile decoded');
}

// ---- Dense-label scenario matched to the user's real vial photos ----
// 45-module QR, edges at ~±43°, ~10 px/module at the label center (roughly
// what the app's 560 px ROI yields from a 1080p portrait frame), with and
// without defocus blur.
for (const wrapDeg of [43, 60]) {
  for (const blur of [0, 2]) {
    console.log(`\nDense v7 label, wrap ±${wrapDeg}°, defocus blur r=${blur}:`);
    const { img: flat, size } = rasterizeMatrix(QR_ROWS_DENSE, 10, 4);
    const warped = warpOntoCylinder(flat, size, size, wrapDeg);
    const blurred = boxBlur(warped.img, warped.w, warped.h, blur);

    let decoded = null, hitProfile = null;
    for (const prof of buildProfiles()) {
      const { map, outW } = computeColumnMap(prof.thetaMax, prof.widthFactor, warped.w);
      const rgba = unwarpColumns(blurred, warped.w, warped.h, map, outW);
      const code = jsQR(rgba, outW, warped.h, { inversionAttempts: 'dontInvert' });
      if (code && code.data === EXPECTED_DENSE) { decoded = code.data; hitProfile = prof; break; }
    }
    check('sweep recovers dense QR content', decoded === EXPECTED_DENSE,
          hitProfile
            ? `decoded with thetaMax=${Math.round(hitProfile.thetaMax * 180 / Math.PI)}°, wf=${hitProfile.widthFactor}`
            : 'no profile decoded');
  }
}

console.log(failures ? `\n${failures} check(s) FAILED` : '\nAll checks passed');
process.exit(failures ? 1 : 0);
