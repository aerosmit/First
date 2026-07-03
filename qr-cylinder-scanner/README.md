# Cylinder QR Scanner

A dependency-free web app (plain HTML/JS + a vendored copy of [jsQR](https://github.com/cozmo/jsQR))
that scans QR codes wrapped around **small cylinders** — e.g. a label on a
**1.6 cm diameter** vial or tube — live from an iPhone's camera in Safari.

Standard QR scanners fail on curved labels because the horizontal axis of the
code is compressed toward the edges of the cylinder. This app digitally
"un-curves" each camera frame before decoding.

## How it works

1. **Capture** — `getUserMedia` opens the rear camera; each frame's guide-box
   region is drawn to an offscreen canvas.
2. **Unwarp** — A label wrapped on a cylinder of radius *R*, viewed head-on,
   projects a point at angle *θ* (around the cylinder axis) to image position
   `x ≈ W·sin(θ)`, where *W* is the apparent half-width of the cylinder
   silhouette. The flat label coordinate is the arc length `s = R·θ`.
   The app inverts this by resampling image columns: output columns are spaced
   evenly in *θ*, sampled from source column `cx + W·sin(θ)` with linear
   interpolation. This stretches the compressed edges back to their true
   spacing, producing a flat, decodable QR image.
3. **Sweep** — The visible wrap angle *θmax* is unknown (it depends on label
   size and camera distance), so in **Auto** mode the app cycles through a set
   of curvature hypotheses (flat, 40°–82°, three width calibrations each), one
   per frame at ~14 attempts/second, and locks onto whichever profile decodes.
   A **manual slider** lets you dial the curvature directly.
4. **Decode** — Each flattened frame goes to jsQR (with inversion attempts, so
   white-on-black codes work too).

The small preview strip at the bottom of the screen shows exactly what the
decoder sees, so you can watch the label straighten out as the sweep runs.

## Running it

Camera access requires a **secure context** — HTTPS, or `localhost`.
On an iPhone that means you must serve the page over HTTPS. Options:

**GitHub Pages (easiest):** push this folder to a repo, enable Pages, open
`https://<user>.github.io/<repo>/qr-cylinder-scanner/` in Safari.

**Local HTTPS on your LAN:**

```bash
# one-time: make a locally-trusted cert (https://github.com/FiloSottile/mkcert)
mkcert -install && mkcert <your-mac-ip>
npx serve qr-cylinder-scanner --ssl-cert <ip>.pem --ssl-key <ip>-key.pem
# then open https://<your-mac-ip>:3000 on the iPhone
```

**Tunnel:** `npx serve qr-cylinder-scanner` plus any HTTPS tunnel
(ngrok, cloudflared, localtunnel) pointed at the port.

## Scanning tips for a 1.6 cm cylinder

- Hold the cylinder **vertical** (axis up/down) and align its left/right
  silhouette edges with the two green guide lines.
- Keep it **7–10 cm** from the lens and use the **zoom slider** to fill the
  guide box — iPhones can't focus much closer than ~7 cm, and optical/digital
  zoom beats moving closer and losing focus.
- Even, diffuse light helps; use the **torch** button in the dark, but avoid a
  direct specular glare stripe down the middle of the cylinder (tilt slightly).
- A QR wrapped on a 1.6 cm cylinder subtends large angles quickly: a 12 mm-wide
  label spans ±43°, and decode reliability drops sharply past ~75° because the
  outermost modules compress below one pixel. If the label wraps more than
  ~60 % of the circumference, rotate the vial so the QR is centered, scan, and
  the sweep will pick the widest recoverable angle.
- If Auto struggles, tap **Auto** to switch to manual and slide the curvature
  until the preview strip looks square and undistorted.

## Files

| File | Purpose |
|------|---------|
| `index.html` | UI: camera view, guide overlay, controls, result sheet |
| `app.js` | Capture loop, cylindrical unwarp, curvature sweep, decode |
| `vendor/jsQR.js` | Vendored QR decoder (jsQR 1.4.0, self-contained) |
| `test/unwarp.test.js` | Node test: warps a synthetic QR onto a virtual 1.6 cm cylinder and verifies the unwarp recovers it |
