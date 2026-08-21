# The two worked examples

Both are **illustrative composites** — hypothetical systems at hypothetical member utilities, built
from patterns common in the sector. Not real utilities' systems, vendors or performance. Figures are
internally consistent, not measured. **Say this unprompted if you present either.**

Both run the same eight stages, and both cost the member **3 hrs 30 min** against ~14 hours from a
blank template.

```
00 Intake         member  10m     04 Close the gaps  member  75m
01 Agent pre-fill agent   2h      05 Agent red team  agent   20m
02 Human tiering  member  40m     06 Cross-member    peer    60m
03 Copilot 2nd op agent   4m      07 Ratify          pod     15m
```

---

## ASK-1 — engineering standards assistant *(generative AI — the lead example)*

**`docs/worked_example_genai.html`** · drives the spoken narrative.

A large IOU (~2.5M customers) deploys a vendor's retrieval-grounded LLM assistant over ~40,000 of
its own documents — engineering standards, construction specs, operating procedures, safety manuals.
~6,000 users, ~8,000 questions/week, answers carry citations. Procured by IT as a productivity tool
under an existing software agreement; **never reviewed as an operational system, because on paper it
operates nothing.**

**The comfortable numbers:** 96% vendor benchmark accuracy · 94% thumbs-up · 18 months · zero
incidents.

**Finding 1 — the corpus.** Writing the operating envelope forced someone to check what was actually
indexed. Three SharePoint repositories had never been reconciled against the document management
system: **~3,600 of ~40,000 documents — one in eleven — were superseded revisions**, replaced but
never removed. The assistant cited them correctly by number, revision and section. One withdrawn
construction standard appeared in **412 answers**, and had been withdrawn 22 months *before* the
assistant launched.

**Finding 2 — the oversight.** The only control was "users verify the answer against the cited
source." That user is the person who asked the question. **If they could judge the answer, they
would not have needed it.** Median time from answer displayed to session closed: 19 seconds.

**Tier:** member 2 → copilot disputes Consequence (safety-classified procedures in corpus) and
Autonomy → three-way split: nominator Tier 2, reviewer B Tier 4, reviewer C Tier 3 conditional on
carving out safety content.

**Framework changes produced:**
1. **Independence of the reviewer** (Pod A) — oversight performed by the requester is not oversight;
   the system scores as unsupervised.
2. **Corpus provenance and currency** (Pod B) — what is indexed, at what revision, under whose
   document control, and how staleness is detected. "We index a shared drive" is an acceptable
   answer and an automatic escalation.

**Why it works as a story:** it isn't a hallucination. Real document, real section, real content —
every check a reader performs passes. And the satisfaction score measured whether the answer was
*satisfying*, not whether it was *right*. Everyone in a utility has a dashboard like that.

---

## VMS-1 — vegetation encroachment detection *(computer vision)*

**`docs/worked_example.html`** · used in the deck (Part III) and the primer.

A Western IOU (~1.2M customers, wildfire-prone) flies 12,400 circuit miles/year with LiDAR. A vendor
CV model estimates conductor clearance and **writes prioritized work orders directly into the WMS**.
A planner reviews the queue; crews cut. ~180,000 spans/year. In production 3 years.

**The comfortable numbers:** 0.94 recall · clean incident log · 3 years.

**Finding 1 — the envelope.** Writing it revealed **~17% of assessed spans fell outside** the
conditions the vendor's evidence covered — steep terrain, post-fire regrowth — and had been
auto-processed anyway, for three years, with no flag.

**Finding 2 — observability.** The WMS records work-order completion. **Nothing observes spans the
model did *not* flag.** False negatives are structurally unobservable, so the 0.94 cannot be
confirmed or refuted in production.

**Tier:** member 3 → copilot proposes 4 on autonomy (180,000 spans ÷ 1 planner ≈ **12 seconds per
span** — "that is not review, it is a queue") → three-way split 3 / 4 / 3-conditional.

**Framework changes produced:** *effective vs nominal oversight* sub-criterion, and the
*observability of failure* required field.

---

## Choosing between them

**ASK-1** for most audiences. Generative AI is what the industry is anxious about, nearly every
utility has one in flight, and it is precisely the class SR 26-2 declined to govern — so it needs no
argument for why it matters.

**VMS-1** when the audience is operations-heavy, or when the point is physical consequence and
unobservable omission. Its 12-seconds-per-span arithmetic is the sharper illustration of throughput
defeating oversight.

They pair well: a Tier 3 vision system and a Tier 3 generative assistant reaching the same structural
finding by different routes is stronger evidence for the framework than either alone.
