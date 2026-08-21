# SAFERai.power — working folder

Everything produced for the EPRI **SAFERai.power** work lives here. Start with
[`CONTEXT.md`](CONTEXT.md) if you are picking this up cold — it is written to be the first thing a
person or an agent reads.

```
saferai-power/
├── README.md          you are here — index and artifact map
├── CONTEXT.md         resumption brief: what this is, what exists, what is decided
├── docs/              the seven published deliverables (self-contained HTML)
├── source/            markdown source of the research brief
├── notes/             durable context for future work
├── prompts/           reusable prompts (start with critical-review.md)
└── private/           NOT COMMITTED — see below
```

---

## The deliverables

All seven are self-contained HTML — no build step, no dependencies. Open directly in a browser.
Each is also published as a **private** Artifact on claude.ai.

| # | File | What it is | Artifact |
|---|---|---|---|
| 1 | `docs/saferai_brief.html` | Research brief and proposed working strategy. The foundation document — everything else derives from it. | [b6813160](https://claude.ai/code/artifact/b6813160-01e6-43b8-a551-caa74555e398) |
| 2 | `docs/worked_example.html` | **VMS-1** — vegetation-management vision model, end to end through the framework. | [c7a91313](https://claude.ai/code/artifact/c7a91313-cad5-4e80-85c8-f3a4db713989) |
| 3 | `docs/worked_example_genai.html` | **ASK-1** — LLM assistant over engineering standards, end to end. The generative-AI case. | [9b95307a](https://claude.ai/code/artifact/9b95307a-f985-4b8f-9e2c-e59e9c8fc84e) |
| 4 | `docs/deck.html` | 50-slide strategy deck. 9-slide executive summary, then framework detail, then VMS-1 stage by stage. | [bb23a618](https://claude.ai/code/artifact/bb23a618-d4b5-4327-bf19-6cf9a89faa16) |
| 5 | `docs/background_and_primer.html` | Why the programme is needed (five gaps) + a nine-layer primer on the standards. | [5c82a089](https://claude.ai/code/artifact/5c82a089-0f07-46ae-8505-c1e774bf3210) |
| 6 | `docs/standards_reference.html` | 33 standards with summaries, access cost and links. Lookup companion to the primer. | [192e3238](https://claude.ai/code/artifact/192e3238-a4ec-49d9-8c64-b30666bd1844) |
| 7 | `docs/elevator_narrative.html` | The ASK-1 story as a spoken narrative at four lengths, with delivery notes. | [5cbfb482](https://claude.ai/code/artifact/5cbfb482-08d4-4eb4-8af7-34db5a0cb995) |

`source/SAFERai_power_research_and_strategy.md` is the markdown original the brief was set from.
It duplicates the brief's content; edit the HTML for anything published.

### Updating an artifact

Files have moved since these were first published. Republishing from a new path **creates a new
artifact** unless you pass the existing URL:

```
Artifact(file_path="saferai-power/docs/deck.html",
         url="https://claude.ai/code/artifact/bb23a618-d4b5-4327-bf19-6cf9a89faa16")
```

Omit `url` and you will end up with two copies and a stale link in circulation.

---

## `private/` — not committed

**This repository is public.** `private/` is gitignored and holds interview preparation containing
personal career material — an employment-gap analysis, résumé critique, and notes on named
individuals. It must not be committed here.

It currently holds `interview_prep.html`, also published privately as artifact
[14eac203](https://claude.ai/code/artifact/14eac203-efc1-4af7-9f2c-705c43a6a2f6).

> **The container this was built in is ephemeral.** Anything in `private/` exists only on that
> container, in the artifact, and in whatever copy was downloaded. If you need it under version
> control, use a private repo.

---

## Notes

| File | Use it when |
|---|---|
| `notes/facts.md` | You need a number, date or name — with its confidence level and source. Check here before re-searching. |
| `notes/open-questions.md` | Deciding what to ask EPRI, or wondering why something is hedged. |
| `notes/corrections.md` | Something here disagrees with the brief. This is the log of what moved and why. |
| `notes/use-cases.md` | Reusing or extending VMS-1 or ASK-1. |
| `notes/design-system.md` | Producing another document that has to match the set. |
| `notes/sources.md` | You need the link library, with what was verified and what was not. |

## Prompts

| File | Use it when |
|---|---|
| `prompts/critical-review.md` | You want a hard, adversarial review of everything here. Paste it into a fresh session. |

---

## Two constraints that shaped everything

**EPRI's own sites are unreachable** from the environment used to build this — `epri.com` and
`msites.epri.com` are blocked by the network egress proxy. All EPRI-specific detail is
search-extracted from press coverage, not retrieved from source. Governance, phase dates and any fee
schedule are medium confidence at best. Every document says so; keep saying so.

**Both worked examples are illustrative composites**, not real utilities' systems. Say this
unprompted if you present them.
