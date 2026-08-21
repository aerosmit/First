# Facts, figures and names

Check here before re-searching. Confidence is marked on everything. Where the original research
brief disagrees with this file, **this file is right** — see `corrections.md`.

---

## The initiative

| Fact | Value | Confidence |
|---|---|---|
| Announced | 6 August 2026 | High — press release, four independent outlets |
| SAFER | Safety, Accountability, Fairness, Explainability, Reliability | High |
| Named founding members | **28** | High — verbatim agreement across four sources |
| EPRI's own phrasing | "more than 25 founding members" | High |
| SME contribution | ~80 hours per organization | High |
| Funding route | Qualifies for Self Direct Funds (SDF) | High |
| Roadmap | "phased across multiple years", ends in open-source toolkit + enduring stewardship | Medium |
| Phase dates, governance model, fee schedule | **Unknown** | — verify with EPRI |

**Deliverable clusters:** risk framework · evidence packages (AI System Risk File) · assessment
tooling + AI System Registry · operational protocols (TEVV, monitoring, runbooks).

## The 28 members

Verified 20 Aug 2026 — unchanged since launch. EPRI says "initial founding members" and the
microsite carries a join path, so **re-check before external use**.

- **Investor-owned / large (12):** Alliant · Ameren · Arizona Public Service · CenterPoint Energy ·
  Con Edison · Constellation · Duke Energy · Exelon · Pacific Gas & Electric · Southern California
  Edison · Southern Company · WEC Energy Group
- **Public power / co-op / federal (7):** Cooperative Energy · CPS Energy · Nebraska Public Power
  District · NYPA · Omaha Public Power District · Salt River Project · TVA
- **Transmission / markets / reliability (4):** ATC · MISO · PJM Interconnection · **NERC**
- **Technology (5):** Microsoft · NVIDIA · HData · SHI International · World Wide Technology

**The composition matters more than the count.** ~19 are operating utilities (20 counting ATC).
The rest are evidence *producers* (vendors), market operators, and a reliability organization.
The arithmetic consequence is in `open-questions.md`.

## People

| Person | Role | Note |
|---|---|---|
| **Rémi Raphael, PhD** | VP AI Transformation & Chief AI Officer, EPRI | PhD CS (INSA Lyon), MBA (UCSD). Published on data integration, ontologies, workflow systems. Prior: Duke Energy (Dir. Business Transformation), EDF Renewables (VP Digital Technology), Origis Energy (Head of Digital Technology, built GenAI strategy). Oversees EPRI.AI and Emerging Tech Connect. |
| **Jeremy Renshaw** | Executive Director, AI and Quantum, EPRI | At EPRI since 2012; runs AI.EPRI. PhD Iowa State. |
| **Daniel Brooks** | SVP, Energy Delivery & Customer Solutions, EPRI | At EPRI since 2004. Previously VP Integrated Grid & Energy Systems; ran Grid Operations and Planning research 2011–2019. Note spelling — **Brooks**, with an s. |
| **Arshad Mansoor** | President & CEO, EPRI | Launch quote: AI is ready to transform how the power system operates *"but only if we make it trustworthy in the real world"* — the initiative as *"the bridge between innovation and trust."* |

## The arithmetic

```
25 organizations × 80 hours = 2,000 SME hours ≈ 0.96 FTE-years ≈ 3 hrs/person/week
```

The 3 hrs/week figure is **derived**, not sourced — it assumes the 80 hours span the ~26-week MVP
cycle. Present it as an assumption, not as arithmetic. See `open-questions.md`.

Agent-accelerated 80-hour allocation: draft files 16→6 · pod sessions 20→12 · red-team 16→**20** ·
socialization 12→12 · steering 8→6 · **judgment reserve 8→24**. Same total, ~3× the judgment.

Timeline: 26 weeks manual → **16–18 weeks** with the fleet, corpus target 50 files → ~150.

## Standards — current versions

| Item | Current state | Confidence |
|---|---|---|
| NIST AI RMF 1.0 | 4 functions, ~72 subcategories; GOVERN 6 cat/19 sub, MAP 5 cat/18 sub | High |
| NIST AI 600-1 | GenAI Profile, Jul 2024, 12 risk categories | High |
| NIST COSAIS | SP 800-53 AI control overlays — concept paper Aug 2025, **in progress** | High |
| ISO/IEC 42001:2023 | Clauses 4–10 + **Annex A: 38 controls, 9 objectives**. Certifiable | High |
| ISO/IEC 23894:2023 | AI risk management guidance, ~CHF 155 | High |
| ISO/IEC 42005:2025 | AI system impact assessment, ~CHF 181 | High |
| ISO/IEC 38507:2022 · 5338:2023 | Board governance · lifecycle processes | High |
| UL 4600 | Published Apr 2020, now **Edition 3**. Goals + argumentation + evidence | High |
| ISO 21448 (SOTIF) | 2022 | High |
| SR 26-2 | **17 Apr 2026**, joint Fed/OCC/FDIC, supersedes SR 11-7 **and SR 21-8**. Most relevant to banks >$30B | High |
| SR 26-2 scope | GenAI and agentic AI **explicitly out of scope** — "novel and rapidly evolving" | High — verbatim |
| MITRE ATLAS | Release **2026.07**; monthly `YYYY.MM`. 16 tactics, 101 techniques, 77 sub-techniques, 37 mitigations, 68 case studies | High |
| OWASP LLM Top 10 | **2025 edition** — see `corrections.md`, the numbering changed | High |
| EASA | Issue 2 (2024) Levels 1–2 incl. 2A/2B; **proposed Issue 3 (Jun 2026)** adds Level 3A/3B | High |
| ARP6983 / ED-324 | SAE G-34 / EUROCAE WG-114, **still in development**; first version scoped to frozen supervised models | Medium |
| FDA PCCP | **Final guidance 3 Dec 2024**. FDORA 2022, FD&C §515C. Three required sections | High |
| GMLP | FDA/Health Canada/MHRA, 27 Oct 2021, 10 principles | High |

## Regulatory clock

| Date | Event |
|---|---|
| 4 May 2026 | NERC Level 3 Alert — AI campuses as dynamic grid actors, 7 Essential Actions |
| 16 Jul 2026 | FERC order directing NERC on computational loads |
| 2 Aug 2026 | EU AI Act Annex III deployer obligations — **date on paper** |
| 6 Aug 2026 | SAFERai.power launch |
| 31 Dec 2026 | NERC to file mandatory standards (Project 2026-02) |
| 1 Mar 2027 | Phase II work plan due |
| 2 Dec 2027 | Annex III per the 7 May 2026 provisional agreement — **not formally published** |

EU AI Act Annex III §2 covers AI as a safety component in management/operation of critical
infrastructure including electricity. Penalties to €15M or 3% global turnover. Article 6(3) provides
a documented-assessment exception.

## OPAI (inherited assets — do not rebuild)

250+ prioritized AI use cases · AI Sandbox for member testing · domain-specific generative models
(Articul8/NVIDIA) · workstreams on asset image analytics/vegetation management and AMI outage
detection · AI for Power 2026 Challenge · 175+ confirmed members, 125+ in process.

## Naming collision

**SaferAI** (safer-ai.org) is an unrelated French non-profit publishing AI risk-management maturity
ratings of frontier developers. Not EPRI. Their methodology is a useful reference for grading vendor
maturity, so the collision is mildly useful rather than purely annoying.
