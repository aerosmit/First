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

console.log(failures ? `\n${failures} check(s) FAILED` : '\nAll checks passed');
process.exit(failures ? 1 : 0);
