# Prompt — critical deep research review

Companion to `critical-review.md`. That one is a **desk review**: read what exists and attack it.
This one is a **research review**: go out, verify the claims against primary sources, and stress-test
the strategy against external evidence and base rates.

Run this in an environment with web access. Run it in a **fresh session** — a model that produced the
work will defend it.

---

## The prompt

> I need a critical deep-research review of a body of work. Verify it, then try to break it. I am
> not looking for a summary or for encouragement, and I would rather find the problems now than in
> front of the people this was written for.
>
> ### What this is
>
> A research brief, strategy and supporting documents for **SAFERai.power** — an EPRI-led
> collaborative announced 6 August 2026 to build an AI risk framework, evidence templates and
> assessment tooling for the electric power sector. The work was produced outside-in from public
> sources to support a candidacy for leading the programme. **It is a hypothesis about how the
> programme should run, not a description of how EPRI has decided to run it.**
>
> ### Load these, in this order
>
> **Context first — these are my own summaries and inherit my blind spots, so read them for
> orientation, not as evidence:**
>
> ```
> saferai-power/CONTEXT.md              what this is, what is settled, what is open
> saferai-power/notes/facts.md          every figure/date/name with a confidence level
> saferai-power/notes/open-questions.md what is unresolved
> saferai-power/notes/corrections.md    five things already found wrong
> saferai-power/notes/use-cases.md      the two worked examples
> saferai-power/notes/sources.md        link library + which domains were unreachable
> saferai-power/notes/design-system.md  production and verification workflow
> ```
>
> **Then the actual deliverables — review these, not my summaries of them:**
>
> ```
> saferai-power/docs/saferai_brief.html          the foundation document; everything derives from it
> saferai-power/source/SAFERai_power_research_and_strategy.md   markdown original of the same
> saferai-power/docs/background_and_primer.html  why the programme is needed + 9-layer standards primer
> saferai-power/docs/standards_reference.html    33 standards with summaries and links
> saferai-power/docs/worked_example.html         VMS-1, vegetation CV model, end to end
> saferai-power/docs/worked_example_genai.html   ASK-1, LLM assistant, end to end
> saferai-power/docs/deck.html                   50-slide strategy deck
> saferai-power/docs/elevator_narrative.html     the ASK-1 story as spoken narrative
> ```
>
> HTML files are self-contained; open or parse them directly.
>
> ### Constraints you should know before you start
>
> - **EPRI's own sites were unreachable** from the environment that produced this — `epri.com` and
>   `msites.epri.com` are blocked there, as are `iso.org`, `nerc.com` and `atlas.mitre.org`. All
>   EPRI-specific detail is search-extracted from press coverage. **If you can reach those domains,
>   that alone is the highest-value thing you can do.**
> - **Both worked examples are illustrative composites**, not real systems. That is disclosed
>   throughout. Judge whether they are *honest* composites, not whether they are real.
> - **This is AI-assisted work, human-directed and reviewed.** Treat that as a reason for scrutiny,
>   not as a disqualifier.
>
> ---
>
> ## Part 1 — Verify the facts
>
> Work through `notes/facts.md` and the claims in the documents. For each, return
> **confirmed / corrected / unverifiable**, with a source.
>
> **Priority 1 — the things nobody could reach:**
> - The SAFERai microsite and EPRI's own pages. Roadmap and phase dates. Governance model. Whether
>   membership is still open. Fee schedule beyond SME time. What SDF actually covers.
> - **Does any source state the period over which the ~80 SME hours are expected?** This is the
>   single most load-bearing unknown in the whole strategy — MVP-cycle vs per-year vs
>   whole-roadmap differ by a factor of four in the available budget.
> - Current member roster and count. The work has 28 named as of 20 Aug 2026. Has it moved?
> - Is the OPAI 250+ use-case corpus actually obtainable by a member, and on what terms?
>
> **Priority 2 — standards currency.** Every version claim, but especially: MITRE ATLAS release and
> counts; EASA Concept Paper Issue 3 status (proposed or adopted); ARP6983/ED-324 publication status;
> SR 26-2 text and scope language; ISO/IEC catalogue entries; the EU AI Act Annex III date after the
> 7 May 2026 provisional agreement. Flag anything that has moved.
>
> **Priority 3 — audit for the failure mode this work warns about.** The framework itself names
> **citation laundering** — plausible-sounding references to clauses that do not exist — as a risk of
> AI-assisted standards work. Audit these documents for exactly that. Check that every named clause,
> section number, date and figure resolves to something real. **A single fabricated citation in a
> document about evidence provenance would be fatal**, so look hard.
>
> ---
>
> ## Part 2 — Research the strategy, don't just read it
>
> This is the part that matters most. The desk review can critique the argument; only research can
> tell me whether the argument is *true*.
>
> **Base rates.** The proposal assumes a multi-party industry consortium can produce a ratified,
> adopted framework in 16–26 weeks on roughly one person-year of expert time. **What actually happens
> to efforts like this?** Find named comparables in both directions — consortia that produced adopted
> standards and consortia that produced shelfware. What distinguishes them? Consider INPO, ASIAS,
> NERC standards development, IEEE working groups, UCA International Users Group, CIGRE, Cloud
> Security Alliance, MITRE-hosted efforts, and any prior EPRI collaboratives. **Is the timeline
> credible against the base rate, or is it optimistic by a factor I should know about?**
>
> **Prior art.** Does what this proposes already exist?
> - Has anyone published a utility-specific AI tiering rubric or an "AI system risk file"?
> - Has any utility published an operating envelope for a deployed AI system?
> - Check DOE, national labs (INL, NREL, PNNL, ORNL, Sandia), IEEE, UCA, CIGRE, NARUC, Eurelectric,
>   ENTSO-E, and vendor/consultancy frameworks.
> - **If this already exists, the whole proposition changes.** Say so plainly.
>
> **Competitive and overlap map.** Who else is building AI assurance for critical infrastructure or
> for the power sector specifically? Is SAFERai duplicating, complementing, or competing? Does the
> NIST COSAIS overlay work overtake part of it?
>
> **Test the borrowed mechanisms.** The spine is assembled from other sectors. For each, find
> evidence about whether it actually transfers:
> - **UL 4600** — any documented use outside automotive/AV? Any published critiques of the
>   goal-based safety-case approach? Does the argument survive people who have tried to apply it?
> - **FDA PCCP** — has it worked in practice since Dec 2024? Evidence of adoption, of abuse, of
>   regulators tightening it? The proposal leans hard on it.
> - **SOTIF / ISO 21448** — is applying it to LLM and retrieval systems defensible, or is the work
>   stretching a perception-system concept past its domain? This matters because the ASK-1 example
>   depends on it.
> - **SR 26-2's "vacated ground"** — the work claims banking regulators declined to govern
>   generative and agentic AI, leaving space. **Is that ground still vacant?** Has anything been
>   issued since April 2026 by the Fed, OCC, FDIC, or internationally?
>
> **Chase the soft numbers.** Find any quantitative claim that is asserted without a traceable
> source and try to source it. I specifically doubt the claim that bounded agents with validation and
> optional human approval run **13–18× faster than manual operation** — find its provenance or tell me
> it has none. Also test: whether agent pre-fill genuinely reduces evidence-drafting time in
> practice, and whether "convergence collapse" (correlated outputs when many parties draft with the
> same model) is a documented phenomenon or a plausible invention.
>
> ---
>
> ## Part 3 — Stress the proposal
>
> Argue against it with evidence, not vibes.
>
> 1. **Is one person-year enough?** The harvest-don't-author thesis is the load-bearing claim. Is it
>    genuine insight or a rhetorical move that collapses against 25 organisations' calendars?
> 2. **Is "the disagreements are the deliverable" a real method?** Find precedent. Or is it an
>    elegant excuse for failing to converge, which a sponsor will eventually read as no product?
> 3. **Does the agent-fleet argument survive someone who has deployed agents at scale?** What is the
>    realistic failure rate on evidence pre-fill from heterogeneous utility documentation?
> 4. **Is the MVP scope right?** Tiering rubric + evidence package, deferring registry and tooling.
>    Would a practitioner say this is the thinnest useful artifact, or that it is unusable without the
>    registry?
> 5. **Is the two-worked-example approach sound**, and are the composites honest — or do they smuggle
>    in convenient findings? Is ASK-1's one-in-eleven superseded-revision rate plausible at 40,000
>    documents, or is it tuned to be alarming?
> 6. **Where is this derivative?** Which parts are a genuine contribution versus a well-organised
>    restatement of NIST, ISO and UL that anyone who read the sources could produce?
>
> ---
>
> ## What to give me back
>
> 1. **Verification table** — every material factual claim, marked confirmed / corrected /
>    unverifiable, with sources. Corrections first.
> 2. **Any fabricated or unresolvable citation**, called out separately and prominently. If there are
>    none, say so explicitly — that is a finding too.
> 3. **Base-rate finding** — with named comparables — and a verdict on whether the timeline and hours
>    are credible.
> 4. **Prior art and competition map**, and what it means for the proposition.
> 5. **The three most serious problems**, in priority order, each with the specific change required.
>    Say plainly when a problem is structural rather than editable.
> 6. **What would have to be true for the central thesis to be wrong**, and whether you found any
>    evidence that it is.
> 7. **What to cut.** Length is not a virtue.
> 8. **What is genuinely good** — briefly, and only if true. I need to know what to protect.
>
> Quote the text you are criticising. Cite sources for every external claim. Where you could not
> verify something, say "unverifiable" rather than guessing — the entire subject of this work is the
> difference between evidence and assertion, and a review that blurs it is worse than no review.

---

## Notes on using this

**Sequence matters.** Run `critical-review.md` first if you only have appetite for one — it is
cheaper and catches internal problems. Run this one when you want to know whether the *strategy* is
right, not just whether it is well-argued.

**The highest-value single result** is anything retrieved directly from `msites.epri.com/saferai`.
Roadmap dates, governance, and the 80-hour period would resolve several hedges at once and are the
difference between "medium confidence" and "confirmed" across the whole set.

**Expect the reviewer to be wrong sometimes.** It may flag verified items as unsupported because it
lacks the search results that produced `notes/facts.md`. Check criticisms against `corrections.md`
before acting — but do not use that as a reason to dismiss the ones that land.

**The prior-art question is the one that could change everything.** If a utility-specific AI tiering
rubric already exists and is adopted, the proposition is not "build this" but "adopt and extend
that." Do not let a reviewer skip past it politely.
