# CONTEXT — read this first

Resumption brief for the SAFERai.power work. Written so that a person or an agent picking this up
cold can be useful within ten minutes without re-deriving anything.

**Last updated:** 20 August 2026

---

## 1. What this is

**SAFERai.power** is an EPRI-led collaborative announced **6 August 2026** to build the operational
risk framework, evidence templates and open-source tooling utilities need *before* AI goes into
utility workflows. **SAFER** = Safety, Accountability, Fairness, Explainability, Reliability — the
five power-system attributes the initiative treats as the things AI can damage.

It is an **assurance** programme, not a research programme. Its sibling, the Open Power AI
Consortium (OPAI), is the *build* side; this is the *assure* side.

**Why the work in this folder exists:** Mark A. Smith is interviewing to lead the programme. The
documents were built outside-in from public sources — partly as genuine strategy, partly to
demonstrate a point of view. They are a **hypothesis about how the programme should run**, not a
description of how EPRI has decided to run it. That distinction is load-bearing and appears in
every document. Do not let it erode.

---

## 2. The three ideas everything rests on

Understand these and the rest follows.

### The binding constraint

```
25 organizations × 80 hours = 2,000 SME hours ≈ 0.96 FTE-years
```

That is the entire expert budget. **One person-year cannot author a standard. It can harvest,
reconcile, test and ratify one.** Every design recommendation in the brief follows from this
arithmetic. Two caveats now attach to it — see `notes/open-questions.md`.

### Harvest, don't author

Five sectors have already solved structurally identical problems: automotive (UL 4600, SOTIF),
medical devices (FDA PCCP), aviation and nuclear (ASIAS, INPO), banking (SR 11-7 → SR 26-2), and OT
security (IEC 62443). Not one element of the proposed spine requires original research. The only
thing that *must* come from the 25 members is **sector-specific judgment** — which mechanisms apply
to a utility system, at what threshold, with what evidence.

### The disagreements are the deliverable

Where two utilities differ on whether evidence is sufficient, that difference is the finding — it is
the sector's real open question. Consensus prose destroys it. Both worked examples are built to end
in a preserved three-way disagreement rather than a resolution.

---

## 3. What is decided, and what is still open

**Settled positions** (argued in the documents, defend them or change them deliberately):

- MVP scoped to **"Tier & File"** — a tiering rubric plus a minimum evidence package. Not the
  registry, not the toolkit, not certification.
- The risk file is structured as a **UL 4600-style safety case** — claim, argument, evidence.
- **Operating Envelope** (renamed ODD) and **Change Envelope** (from FDA PCCP) are mandatory fields.
- Agents draft; **members decide**. Nothing enters v1.0 on agent authority.
- Vendors participate fully but **do not vote** on ratification of evidence requirements.
- Legal work on non-punitive incident sharing starts in **month one** — longest lead time in the
  programme.

**Open** — see `notes/open-questions.md` for the full list. The two that would change conclusions:

1. **Over what period are the 80 hours expected?** No source states it. MVP-cycle vs per-year vs
   whole-roadmap differ by a factor of four.
2. **Who actually contributes them?** Of 28 members, only ~19 are operating utilities. If vendors,
   market operators and NERC do not contribute SME hours the same way, the real budget is nearer
   1,500 than 2,000.

---

## 4. State of the deliverables

Seven documents, all current, all consistent **except one known gap**:

> **The deck (`docs/deck.html`) and the primer (`docs/background_and_primer.html`) still run on the
> VMS-1 vegetation case.** The newer ASK-1 generative-AI case exists standalone and drives the spoken
> narrative. Two worked examples side by side is defensible — the MVP calls for two — but if you
> present from the deck while telling the ASK-1 story, the mismatch shows. Re-cutting deck Part III
> onto ASK-1 is the outstanding piece of work.

Everything else is internally consistent. Figures, dates and names have been cross-checked; see
`notes/facts.md` for what is verified and at what confidence.

---

## 5. How to work on this

**Before adding a number, date or name:** check `notes/facts.md`. Much of it was verified by search
and several items in the original brief turned out to be wrong — `notes/corrections.md` records
them.

**Before producing another document:** read `notes/design-system.md`. The seven share one token set,
one component vocabulary and one verification workflow. A new document that does not match is
immediately obvious.

**Verify by rendering, not by reading.** Every document in `docs/` was checked with headless
Chromium for overflow, horizontal scroll, contrast and JS errors — that process caught real defects
in every single document, including a CSS class collision and three diagram label overlaps. The
recipe is in `notes/design-system.md`. Do not skip it.

**Network reality:** `epri.com`, `msites.epri.com`, `iso.org`, `nerc.com` and `atlas.mitre.org` are
blocked by the egress proxy. Web *search* works and returns indexed URLs; direct page *fetching*
mostly does not. Plan verification around search.

---

## 6. Provenance and honesty rules

These are not stylistic preferences. They are the credibility of the work, in a domain that is
literally about evidence provenance.

- **EPRI-specific detail is search-extracted**, not retrieved. Say so.
- **VMS-1 and ASK-1 are composites.** Not real systems. Say so unprompted.
- **This is AI-assisted work, directed and reviewed by a human.** If any of it is shared externally,
  say so plainly and first. Being caught not having mentioned it would be fatal in this domain
  specifically.
- Where confidence is low, the documents hedge explicitly. **Do not quietly firm up a hedge** to
  make a sentence read better.

---

## 7. Immediate next steps, in priority order

1. **Re-cut deck Part III onto ASK-1** — the only known inconsistency in the set.
2. **Close the two hours questions with EPRI** (§3 above). Both are interview questions as much as
   research questions.
3. **Decide whether the standards reference folds into the primer** as an appendix, or stays
   standalone. Current view: standalone — a lookup table and a narrative want different reading modes.
4. **Re-check the member roster before any external use.** 28 named at launch, unchanged as of
   20 Aug 2026, but EPRI's wording is "initial founding members" and the microsite carries a join
   path.
