# Prompt — critical review of the SAFERai.power work

Paste this into a fresh session with this folder available. It is written to produce a **hard**
review, not a reassuring one. Do not soften it before using it.

---

## The prompt

> You are reviewing a body of work I produced over several sessions and am now too close to. I want
> an adversarial, specific critique — not a summary and not encouragement. Assume I can take it.
>
> **Context to load first, in this order:**
>
> 1. `saferai-power/CONTEXT.md` — what this is and what is settled
> 2. `saferai-power/notes/facts.md` — verified figures and their confidence
> 3. `saferai-power/notes/open-questions.md` — what is unresolved
> 4. `saferai-power/notes/corrections.md` — what has already been found wrong
> 5. `saferai-power/notes/use-cases.md` — the two worked examples
> 6. Then the deliverables themselves in `saferai-power/docs/` — brief and primer first, then the
>    two worked examples, then the deck, standards reference and narrative
>
> Read the actual documents. Do not review from the notes alone — the notes are my summary of my own
> work and inherit my blind spots.
>
> **The situation:** these were built outside-in from public sources to support a candidacy for
> leading EPRI's SAFERai.power programme. EPRI's own sites were unreachable, so all
> EPRI-specific detail is search-extracted. The audience is a Chief AI Officer with a PhD in computer
> science and a risk-management background, and an SVP who ran grid operations research for eight
> years. Both will read this the way a reviewer reads a paper.
>
> **Review it on these axes, hardest first:**
>
> **1. Where is the argument actually weak?** Not "could be clearer" — where would a well-prepared
> sceptic land a real blow? Name the specific claim, the specific counter, and whether the work
> survives it. I am most worried about:
> - the harvest-don't-author thesis: is one person-year genuinely enough, or is that a rhetorical
>   trick that collapses on contact with 25 organisations' schedules?
> - the claim that the disagreements are the deliverable — is that insight, or is it an excuse for
>   not converging?
> - the agent-fleet argument: does it hold up to someone who has actually deployed agents at scale
>   and watched them fail?
>
> **2. What is asserted more confidently than the evidence supports?** Find hedges that quietly
> firmed up between the brief and the later documents. Find numbers used as though measured when they
> were assumed. Find anything that reads as fact about EPRI's programme that is really inference from
> a press release.
>
> **3. What is missing that a domain expert would immediately notice?** Utility operations, OT,
> regulatory, standards practice, consortium mechanics. What would make someone say "they clearly
> haven't run one of these"?
>
> **4. Are the two worked examples honest?** They are composites. Do they smuggle in convenient
> findings? Would a practitioner recognise them, or do they read as constructed to prove the point
> the framework wants proved? Is the ASK-1 corpus-currency finding realistic at the stated scale?
>
> **5. Where is it derivative?** Which parts are genuinely a contribution versus a well-organised
> restatement of NIST, ISO and UL? Be specific about which paragraphs would survive if a reader
> already knew the source standards.
>
> **6. Internal consistency.** Figures, dates, names, terminology across seven documents. The deck
> and primer run on one worked example and the narrative on another — is that defensible or does it
> read as drift?
>
> **7. Tone and positioning.** Does it read as a serious practitioner or as someone performing
> expertise? Flag any sentence that is trying too hard. Flag where confidence tips into
> presumption — this is work about someone else's programme, produced by an outsider.
>
> **Deliverables from you:**
>
> - **The three most serious problems**, in priority order, each with what specifically to change.
>   If a problem is structural rather than fixable by editing, say so plainly.
> - **A list of every claim you think is over-stated**, with the sentence and a suggested weaker
>   phrasing.
> - **The single best question a hostile reviewer would ask**, and an honest assessment of whether
>   there is a good answer.
> - **What you would cut.** Length is not a virtue. Name the sections that are padding.
> - **What is genuinely good**, briefly, and only if true — I need to know what to protect while
>   fixing the rest.
>
> Do not produce a new document unless I ask. Prose in your reply is fine. Be concrete: quote the
> text you are criticising.

---

## Notes on using this

**Run it in a fresh session.** A model that produced the work will defend it. That is the entire
point of the prompt.

**Consider running it twice with different framings.** Once as above, and once as: *"You are the
EPRI hiring panel and you have three other candidates. Read this and tell me why you would not hire
this person."* The second framing surfaces different failures — it attacks the positioning rather
than the analysis.

**Feed it the honest constraints.** The unreachable-EPRI problem and the composite worked examples
are the two facts most likely to be treated as flaws if discovered rather than disclosed. Disclose
them in the prompt, as above, so the review engages with them as decisions rather than as gotchas.

**Expect the review to be wrong about some things.** It will not have the search access that
produced `facts.md`, and it may flag verified items as unsupported. Check its criticisms against
`corrections.md` before acting — but do not use that as a reason to dismiss the ones that land.
