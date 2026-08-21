# Open questions

Two categories: things only EPRI can answer, and things the sector has to decide. Both are useful
in an interview — asking a good one demonstrates more than answering one.

---

## The two that would change conclusions

### 1. Over what period are the 80 hours expected?

**No reachable source states it.** The brief's "~3 hours per person per week" is derived by dividing
80 hours across the ~26-week MVP cycle — which is circular, because the cadence assumes the hours.

| Reading | Rate | What the MVP actually gets |
|---|---|---|
| Across the 26-week MVP cycle | 3.1 hrs/wk | 2,000 hrs — the plan as written |
| Per year | 1.5 hrs/wk | ~1,000 hrs for a 26-week MVP |
| Across the multi-year roadmap | <0.6 hrs/wk | ~500 hrs or less |

Under the middle reading each member has ~40 hours for the MVP and the allocation table halves.
Under the last, the MVP as specified is not fundable in member time and the agent fleet stops being
a multiplier and becomes a precondition.

Weak inference: 80 hours across a multi-year programme is implausibly small for a founding member —
under an hour a week for three years — which argues the figure is per-phase or per-year. That is
reasoning from plausibility, not from a source.

### 2. Who actually contributes them?

Of 28 members, **~19 are operating utilities**. The rest are five technology vendors (evidence
*producers*), three market/reliability bodies, and NERC (observer). If the 80-hour commitment means
utility SME time of the kind the framework needs, the real budget is **~1,520–1,600 hours, not
2,000** — a 20–25% haircut on the number every strategic conclusion rests on.

It does not break the argument. It sharpens it: harvest-and-ratify becomes more necessary, and the
agent fleet moves from valuable to load-bearing.

**Ask both as one question:** *"When you say eighty hours — is that per member across the board
including the technology members, and over what period?"*

---

## For EPRI

3. **Roadmap dates.** Actual phase boundaries. The 26-week plan assumes the MVP fits inside roughly
   the first phase — confirm or re-baseline.
4. **Governance.** Is the pod/steering structure already defined? Is there a utility-only decision
   forum, and is NERC's role documented?
5. **Data-sharing protections.** Has legal work begun on non-punitive incident sharing? *Longest
   lead item; most likely to be underestimated.*
6. **Membership.** Is the founding cohort closed? Cost beyond SME time, and what exactly does SDF
   cover?
7. **IP and licensing.** Which open-source license for the toolkit? Who owns contributed risk files,
   and how are they anonymized?
8. **OPAI interface.** Do SAFERai deliverables gate OPAI use-case development and the AI for Power
   demonstrations? Is passing a risk file a precondition for sandbox promotion?
9. **Scope on agentic systems.** In scope for v1.0 or deferred? Given SR 26-2 explicitly deferred
   them, **the most consequential scope decision the group will make — and the biggest opportunity.**
10. **Regulatory intent.** Explicitly to inform future NERC standards, or to remain voluntary? This
    changes how carefully language must be drafted from day one.
11. **International.** How does the Eurelectric/EPRI collaboration interact, particularly for EU AI
    Act Annex III alignment?
12. **Agent fleet.** Is EPRI already building tooling? Does fleet development qualify for SDF? Can
    compute be accepted in-kind from technology members without creating a governance claim?
13. **Deployment model.** Can the fleet run **in-tenant** at each member? Gates whether members can
    use it on real OT documentation at all.

---

## For the sector to decide

These cannot be harvested. They are the entire value of the consortium.

- Where the line sits between an "AI system" and ordinary software in a utility context.
- Which consequence class, at which exposure, forces which tier.
- Which claims are required at each tier, and what counts as acceptable evidence for each.
- What a declared operating envelope must contain to be useful, and what happens to out-of-envelope
  cases.
- Who authorizes a change envelope in a voluntary setting, and what performance drop inside the
  envelope is tolerable.
- How much credit each guardrail layer earns, and how many independent layers each tier requires.
- Acceptance criteria per tier for TEVV — **where sector judgment is least substitutable.**
- Registry federation model, anonymization rules, what aggregates are shared.
- The legal protections for incident sharing.
