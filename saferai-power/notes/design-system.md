# Design system and production workflow

The seven documents share one visual language. A new document that does not match is immediately
obvious. This file exists so nobody has to re-derive it.

---

## Tokens

Defined on `:root`, redefined in **both** `@media (prefers-color-scheme: dark)` — guarded as
`:root:not([data-theme="light"])` — **and** `:root[data-theme="dark"]`. Never define a colour only
inside a media or `[data-theme]` block; a colour whose only definition sits there never applies in
the un-stamped "system" state, and the page renders one theme's text on the other theme's ground.

```
             LIGHT       DARK
--ground     #F1F4F3     #0D1312     page background (body must set this explicitly)
--surface    #FFFFFF     #151D1C
--sunken     #E5EAE8     #0A100F
--ink        #131E1C     #E3EAE8
--ink-mid    #3D4E4A     #B0BFBB     body prose
--ink-soft   #5F706C     #8B9C97     labels, captions
--rule       #CED8D5     #2A3634
--rule-soft  #DFE6E4     #1E2827     1px grid gaps show this through
--accent     #0E6F63     #4FC8B4
--accent-deep #0A544B    #7FDCCB
--accent-soft #D5E7E3    #10322D
--amber      #97590F     #D9A05B     marks, strokes
--amber-soft #F2E4D0     #2E2216
--amber-strong #7E4A0C   #D9A05B     TEXT on amber-soft — see below
```

**`--amber-strong` exists for a measured reason.** `--amber` on `--amber-soft` is **4.47:1** — below
AA for small text. The darker step measures 5.84:1. Dark mode needs no equivalent (6.73:1), so the
token aliases back to `--amber` there. Use `--amber-strong` for any text on an amber ground.

### Ordinal tier ramp

Tier is **ordinal, not categorical** — one hue with monotone lightness, never four unrelated colours.

```
--lvl1 #E3A45F  --lvl2 #C97C2C  --lvl3 #A55516  --lvl4 #78320D   (light)
--lvl1 #7A5227  --lvl2 #A87434  --lvl3 #D29A4F  --lvl4 #F0BC80   (dark — anchor flips)
--on1..--on4    per-step foregrounds, each computed ≥4.5:1 on its own step
```

Level must read **three ways** so it never depends on colour alone: fill count in the meter, ramp
step, and the written label ("3 · Elevated").

## Type

```
--sans  ui-sans-serif, "Helvetica Neue", "Segoe UI Variable Display", "Segoe UI", Roboto, system-ui
--serif "Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", "Hoefler Text", Georgia
--mono  ui-monospace, "SF Mono", SFMono-Regular, "Cascadia Mono", Menlo, Consolas
```

Serif for body prose · sans for headings and UI · mono for labels, eyebrows, data and captions.
No webfonts — the Artifact CSP blocks font CDNs and a silent fallback is worse than a system stack.

Headings: `font-weight` 660–770, `letter-spacing` −.013 to −.034em, `text-wrap: balance`,
`max-width` in `ch`. Body ~17px / 1.6, capped ~66ch.

## Component vocabulary

`.wrap` · `.masthead`/`.eyebrow`/`.deck`/`.meta` · `.note` (+ `.warn`, `.plain`) · `.scroller`
wrapping every wide `table` · `.cards` grids (1px gap over `--rule-soft` to draw hairlines) ·
`.chip` · `.meter[data-lvl]` · `figure`/`.figbox`/`figcaption`.

Per-document additions: `.clause`+`.rail` (primer, sticky numbered margin) · `.script`+`.beat`/`.line`
(narrative speaking cards) · `.entry` (standards reference) · `.slide`+`.dense` (deck).

## Diagrams

Hand-authored inline SVG. No libraries, no external images.

- Size by `viewBox`; CSS scales it. Strokes and text in `currentColor` so they theme automatically;
  reserve a literal hue for the one element carrying the claim.
- **Define arrowhead markers once, outside any hidden container.** Markers inside a `display:none`
  subtree do not resolve — this bit the deck, where per-slide `<defs>` broke on every hidden slide.
- Label the arrows. `writes`, `invalidates`, `polls every 30s` — an unlabelled arrow means "related
  somehow".
- `role="img"` + `aria-label` carrying the same claim as the `figcaption`.

---

## Verification workflow — do not skip this

Rendering checks caught real defects in **every single document**. Reading the source would have
caught none of them.

```js
// headless Chromium via /opt/node22/lib/node_modules/playwright
// for each theme × width: light/dark × 1440/820/390
//   - document horizontal scroll?           d.scrollWidth > d.clientWidth
//   - JS errors?                            page.on('pageerror')
//   - deck only: per-slide overflow         s.scrollHeight - s.clientHeight
//   - .scroller children may overflow their container; the BODY may not
```

Then screenshot representative sections in both themes and actually look at them.

**Defects this caught:**

| Document | Defect |
|---|---|
| Deck | Six slides overflowing 16:9; arrowhead markers dead inside hidden slides |
| Deck | "one overlap" label sitting on top of its own curve; branch labels overlapping arrowheads |
| Deck | PCCP diagram drew the *exceeding* update **inside** the pre-authorised envelope — contradicting the diagram's point |
| Primer | 5-card grid left an empty grey cell in a 3-column layout |
| Interview prep | **`.q` card class collided with inline `<em class="q">`** — every quoted phrase rendered inside a card border |
| Narrative | Beat labels stacked as a legend instead of aligning to the lines they marked |
| Narrative | Stated word counts were hand-counted and wrong by 4–9 words on every version |

**Compute, don't eyeball.** Contrast ratios and speaking timings were both calculated — the amber
finding and the four wrong timings would not have surfaced any other way.

## Publishing

Self-contained HTML, no `<!DOCTYPE>`/`<html>`/`<head>`/`<body>` — the Artifact wrapper supplies them.
Write the `<title>` as a short distinctive **name**, not a summary.

**Files have moved since first publication.** To update an existing artifact you must pass its
`url`; omitting it creates a duplicate. The URL map is in `../README.md`.
