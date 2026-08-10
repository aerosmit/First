# SAFERai.power — Deep Research Brief and Proposed Working Strategy

**Prepared:** 10 August 2026
**Subject:** EPRI's SAFERai.power initiative — what it is, the standards it sits on, what other
industries have already solved, and a proposed operating strategy for the ~25 founding member
utilities to produce usable strategy and standards fast.

---

## 0. Research method and confidence note

Primary sources for this brief were reached through web search. Direct page retrieval of
`epri.com`, `msites.epri.com/saferai`, `openpowerai.org`, `globenewswire.com`, and `nist.gov` was
blocked by this environment's network egress policy, so EPRI-specific detail below comes from
search-engine extraction of the 6 August 2026 press release and the SAFERai microsite rather than
from the pages themselves.

Treat the following as **high confidence** (consistently reproduced across multiple independent
search results and mirrors): the SAFER acronym, the founding member list, the standards
mapping, the ~80-hour SME contribution, SDF eligibility, and the deliverable categories.

Treat as **medium confidence and worth verifying directly with EPRI**: exact phase dates, the
governance model, per-workstream structure, and any fee schedule. Section 9 lists the specific
questions to close.

> **Naming collision, worth knowing.** `SaferAI` (safer-ai.org) is a *separate* French non-profit
> that publishes AI risk-management maturity ratings of frontier model developers. It is unrelated
> to EPRI's SAFERai.power. Their ratings methodology is nonetheless a useful reference for grading
> vendor risk-management maturity, so the collision is a mild inconvenience rather than a pure
> nuisance.

---

## 1. What SAFERai.power actually is

### 1.1 The one-paragraph version

SAFERai.power is an EPRI-led, OPAI-aligned collaborative announced **6 August 2026** to build the
operational risk framework, evidence templates, and open-source assessment tooling that utilities
need *before* AI is put into utility workflows. It is deliberately not a research program about AI
capability — it is an assurance program about AI deployment. **SAFER** = **S**afety,
**A**ccountability, **F**airness, **E**xplainability, **R**eliability: the five power-system
attributes the initiative treats as the things AI can damage.

### 1.2 Founding members (~28 named)

| Category | Organizations |
|---|---|
| **Investor-owned / large utilities** | Alliant, Ameren, Arizona Public Service, CenterPoint Energy, Con Edison, Constellation, Duke Energy, Exelon, Pacific Gas & Electric, Southern California Edison, Southern Company, WEC Energy Group |
| **Public power / co-op / federal** | Cooperative Energy, CPS Energy, Nebraska Public Power District, New York Power Authority, Omaha Public Power District, Salt River Project, TVA |
| **Transmission / markets / reliability** | ATC (American Transmission Co.), MISO, PJM Interconnection, **NERC** |
| **Technology** | Microsoft, NVIDIA, HData, SHI International, World Wide Technology (WWT) |

Two things about this roster matter strategically:

1. **NERC is in the room.** A reliability organization sitting inside a voluntary framework effort
   is unusual and valuable. It means the framework has a plausible path to being recognized rather
   than merely published — but it also means the group must be disciplined about not writing
   anything that reads like a draft reliability standard before it is ready.
2. **The mix is deliberately asymmetric.** Vendors (Microsoft, NVIDIA, WWT, SHI, HData) are
   evidence *producers*; utilities are evidence *consumers*; NERC/MISO/PJM are systemic risk
   holders. The framework only works if it is written to be used across that boundary — a utility
   asking a vendor for evidence, in a form the vendor can actually produce.

### 1.3 Stated deliverables

From the announcement and microsite, the deliverable set clusters into four buckets:

1. **Risk framework** — risk scenarios, failure modes, autonomy levels, guardrails, and use-case
   tiers. A common way to evaluate AI by *use case, consequence, autonomy, and operating context*.
2. **Evidence packages** — "AI System Risk File" templates for both provider and deployer evidence.
   The stated minimum evidence package covers: purpose, data provenance, capabilities, limitations,
   oversight, TEVV, deployment conditions, monitoring, incidents, and reassessment triggers.
3. **Assessment tooling** — an open-source, tiered, scalable use-case risk assessment tool; a
   registry-backed workflow; an **AI System Registry** prototype.
4. **Operational protocols** — tiered test protocols (TEVV), monitoring triggers and runbooks,
   pilot playbooks and pilot evaluations.

The roadmap is described as phased across multiple years, ending in a full open-source toolkit
release and transition to "enduring framework stewardship."

### 1.4 The participation model — and why it is the single most important design constraint

Two facts define what this group can realistically produce:

- Each participating organization is expected to contribute **~80 hours of skilled SME time**.
- Participation **qualifies for Self Direct Funds (SDF)**, so member utilities can fund it from
  money they already control.

SDF eligibility is the recruiting unlock — it removes the "we have no budget line for this"
objection almost entirely, and it should be the lead argument in every membership conversation.

But do the arithmetic on the SME time, because it dictates everything downstream:

```
25 organizations × 80 hours = 2,000 SME hours ≈ 0.96 FTE-years
```

**The entire industry expert budget for this initiative is approximately one person-year, spread
across 25 organizations and fragmented into ~3 hours per person per week.**

That number should be printed at the top of every planning document. It rules out the default mode
of industry consortia — convening working groups to author documents from a blank page. One
person-year does not write a standard. One person-year *can* harvest, reconcile, test, and ratify
material that already exists.

**Strategic consequence: SAFERai.power must run as a harvest-and-ratify operation, not an
authoring operation.** Everything in Sections 5–7 follows from this.

Contribution domains named by EPRI are worth noting because they shape who members should send:

- *Operational:* grid operations, planning, asset management, customer operations, field work,
  vegetation management, OT environments.
- *Digital/AI:* AI lifecycle, open-source tooling, testing, evaluation, agentic systems, risk
  assessment automation.

### 1.5 Lineage: how this relates to OPAI

SAFERai.power builds on EPRI's **Open Power AI Consortium (OPAI)**, launched March 2025 at NVIDIA
GTC. OPAI is the *build* side; SAFERai.power is the *assure* side.

OPAI's relevant assets that SAFERai.power inherits and should exploit:

- **250+ prioritized AI use cases** collected and rated by the OPAI Use Case Workstream. This is
  the corpus the tiering rubric must be tested against — it already exists, and re-deriving it
  would waste most of the 2,000 hours.
- **An AI Sandbox** for member testing and validation of use cases prior to field testing. This is
  the natural home for TEVV protocol execution.
- **Domain-specific generative models** for the power sector (with Articul8 and NVIDIA, delivered
  via NVIDIA NIM microservices). These are concrete systems that need risk files — a ready-made
  dogfooding target.
- **Workstreams already running** on asset image analytics / vegetation management and AMI-based
  outage detection.
- **AI for Power 2026 Challenge**, run with EPRI's Incubatenergy Labs, translating prioritized use
  cases into real demonstration projects. Demonstrations produce exactly the deployment evidence
  SAFERai needs.
- Scale: OPAI reports 175+ confirmed members with 125+ in process.

**Do not rebuild any of this.** SAFERai.power's comparative advantage is the assurance layer on top.

---

## 2. Source library

### 2.1 EPRI and OPAI primary sources

| Source | URL | Note |
|---|---|---|
| SAFERai microsite | `msites.epri.com/saferai` | Primary source of record. Roadmap, deliverables, join info. |
| Launch press release (6 Aug 2026) | `globenewswire.com/news-release/2026/08/06/3340219/` | Member list, quotes, framing. |
| Press release mirror | `manilatimes.net/2026/08/06/tmt-newswire/globenewswire/...` | Same text, sometimes more accessible. |
| OPAI home / about / membership | `openpowerai.org`, `/about`, `/consortium-membership` | Consortium mechanics. |
| OPAI events | `openpowerai.org/events` | Meeting recordings live here. |
| OPAI Use Case Workstream survey results (May 2026) | `openpowerai.org/sites/g/files/fryaxh296/files/2026-05/` | The prioritized use-case corpus. |
| OPAI Domain-Specific Model kickoff deck (Dec 2025) | `openpowerai.org/sites/g/files/fryaxh296/files/2025-12/` | What models exist to assure. |
| EPRI AI thought leadership hub | `epri.com/thought-leadership/artificial-intelligence` | Report index. |
| AI for Power 2026 Challenge | `epri.brightidea.com/AIforPower2026` | Demonstration pipeline. |
| AI and Electric Power Summit | `aielectricpower.com` | The sector's main AI convening. |
| EPRI Summer Seminar 2026 — *"Speed to Power: Accelerating an Affordable, Flexible, AI-enabled Power System"* | `epri.com/pages/sa/summer-seminar` | Executive audience; a natural ratification venue. |
| Powering Intelligence 2026 | `powering-intelligence.epri.com` | EPRI's AI-and-load flagship analysis. |

### 2.2 EPRI research products worth pulling

- *An Introduction to AI, its Use Cases, and Requirements* — product `000000003002017143`
- *Artificial Intelligence: Concepts for Electric Power* — product `000000003002010236`
- *AI Readiness in Utilities: Turning Data into Strategic Advantage* (Aug 2025) — `000000003002033653`
- *Scaling Intelligence: The Exponential Growth of AI's Power Demand* (with Epoch AI) — `000000003002033669`
- *Analyzing Artificial Intelligence and Data Center Energy* — `3002028905`
- *Strategic Insights on Security, Quality, Reliability* — `000000000001008566`

### 2.3 Video and recorded material

There is **no SAFERai.power-specific video yet** — the initiative is four days old as of this
writing. The relevant EPRI video corpus:

| Video | URL | Relevance |
|---|---|---|
| EPRI official channel | `youtube.com/user/EPRIvideos` | Root source; monitor for SAFERai content. |
| *Balancing AI Growth with Grid Flexibility: Inside EPRI's DCFlex Initiative* | `youtube.com/watch?v=3szqhJy71EM` | **Best available model of how EPRI runs a multi-utility initiative.** Watch this for the operating pattern, not the content. |
| *AI-Effect Podcast — EnerTEF and Energy Guard Projects* (Apr 2026) | `youtube.com/watch?v=ElFf_E0uCG8` | Most recent; shared AI infrastructure for utilities. |
| *DGX Spark: Powering EPRI's AI Research* | `youtube.com/watch?v=7U-NvEfKVfc` | EPRI's compute/test posture. |
| *Highlights From The Peak: First EPRI AI and Electric Power Summit* | `youtube.com/watch?v=xjeWH6L7HYk` | Origin of the AI Summit series. |
| *AI.EPRI: Accelerating AI for the Electric Power Industry* | `youtube.com/watch?v=s9krSx4-eiU` | Historical framing. |
| *Convening AI and Electric Power: A Virtual Roundtable* (Mar 2021) | `youtube.com/watch?v=wsW_sPEMVFE` | Ameren, CPS Energy, Microsoft, NREL — several are now SAFERai founders. |
| *AI Summit 2022 Highlights* (Rome) | `youtube.com/watch?v=xb98kEuCb1U` | International dimension. |
| *RTE and EPRI — Learning to Run a Power Network (L2RPN)* | `youtube.com/watch?v=WOt8xgpC370` | **Directly relevant to TEVV.** L2RPN is an existing benchmark for AI grid control — a live example of adversarial/competitive evaluation of grid AI. |
| *Tracking Tomorrow's Tech: EPRI Technology Radar and Pulse Report* | `youtube.com/watch?v=ckNJ1IpnzYM` | The horizon-scanning machinery Section 8 proposes reusing. |

> **The two to actually watch:** DCFlex (for the operating model of a fast multi-utility EPRI
> initiative) and L2RPN (for a working example of benchmark-based evaluation of AI in grid control).

---

## 3. The standards landscape

SAFERai.power explicitly maps to NIST AI RMF, ISO/IEC 42001, IEC 62443, NERC CIP concepts, the EU
AI Act, and mature utility programs. Here is that landscape with what each actually contributes.

### 3.1 NIST

| Standard | What it gives SAFERai | Gap it leaves |
|---|---|---|
| **AI RMF 1.0** — GOVERN / MAP / MEASURE / MANAGE | The organizing spine. GOVERN is org-wide; MAP/MEASURE/MANAGE apply per-system — which is exactly the utility-plus-use-case split SAFERai needs. | Deliberately non-prescriptive. No thresholds, no pass/fail, no sector context. |
| **NIST AI 600-1** — Generative AI Profile (Jul 2024) | 12 GenAI-specific risk categories with suggested actions mapped back to the four functions, organized around governance, content provenance, pre-deployment testing, and incident disclosure. | GenAI-general, not operational-technology-aware. Says nothing about a system that can trip a breaker. |
| **SP 800-53 control overlays for AI** | Would connect AI risk to the control language utility security teams already speak. | **Still in progress through 2026.** SAFERai should track and, where possible, contribute — an early sector overlay is high-leverage. |
| **NIST Cybersecurity Framework / SP 800-53** | Already embedded in utility practice. | Pre-AI. |

**The honest read on NIST AI RMF:** it is a vocabulary and a completeness check, not a decision
procedure. It tells you to measure; it does not tell you what "good" looks like for a
vegetation-management vision model that has to make a cut/no-cut call. That gap — sector-specific
acceptance criteria — is precisely SAFERai.power's reason to exist, and the group should say so
plainly rather than positioning itself as "implementing NIST."

### 3.2 ISO/IEC

| Standard | Status | Role |
|---|---|---|
| **ISO/IEC 42001:2023** — AI Management System (AIMS) | **Certifiable** via third-party audit | The organizational shell. A utility can be certified. Gives executives a recognizable compliance object. |
| **ISO/IEC 23894** — AI risk management guidance | Guidance only, not certifiable | Extends ISO 31000 to AI risk. This is the risk-process detail 42001 requires. |
| **ISO/IEC 42005:2025** — AI system impact assessment | Guidance, not certifiable | Per-system impact methodology. **Closest existing analogue to the AI System Risk File** — start here rather than from blank paper. |
| **ISO/IEC 38507** — governance implications of AI for the board | Guidance | Board-level framing; useful for the executive layer. |
| **ISO/IEC 5338** — AI system lifecycle processes | Guidance | Lifecycle stage definitions; useful for reassessment triggers. |
| **ISO/IEC TR 5469** — Functional safety and AI systems | Technical report, emerging | **The bridge between AI and the functional-safety world utilities already live in.** Track closely. |

### 3.3 Power-sector and OT

- **IEC 62443** — industrial automation and control system security. Its *zones and conduits* model
  is the natural mechanism for containing AI systems in OT: an AI agent is a thing that lives in a
  zone and communicates through a conduit with defined, enforceable constraints. **This is the most
  directly reusable structural idea in the entire standards set** and the group should lean on it
  hard for the guardrail catalog.
- **NERC CIP** — critical infrastructure protection. Concepts (BES Cyber System categorization,
  access control, change management, incident reporting) map onto AI system classification with
  moderate translation effort. NERC's presence in the membership makes this mapping credible.
- **IEC 61508 / 61511** — functional safety and safety instrumented systems. Important mainly for
  what they *exclude*: AI has historically been disallowed as a technique for achieving functional
  safety, and SIL certification does not accommodate ML. Assume any AI touching a safety
  instrumented function is out of scope for now, and say so explicitly — a clear exclusion boundary
  is itself a valuable deliverable.

### 3.4 Regulatory context — and one distinction that must not be blurred

**EU AI Act.** Annex III §2 classifies as high-risk any AI system serving as a *safety component*
in the management or operation of critical infrastructure, explicitly including electricity grids.
Penalties reach €15M or 3% of global turnover. The Annex III deployer obligations (Articles 9–17,
26) were set for 2 August 2026; a provisional political agreement of 7 May 2026 moves this to
**2 December 2027**. Until formal publication, the earlier date remains the legally binding one on
paper. **Any US-parented utility with EU operations, and every EU-domiciled vendor selling into
this group, is affected.** Track the omnibus outcome; do not assume the delay is final.

**FERC / NERC — a critical distinction.** There is a large, fast-moving 2026 regulatory workstream
about AI and the grid that is **not** about AI in utility workflows:

- NERC issued a **Level 3 Alert on 4 May 2026** treating AI campuses and hyperscale data centers as
  dynamic grid actors, with seven Essential Actions covering load modeling, system studies,
  commissioning, ride-through analysis, fault recording, and operational communications.
- **FERC's 16 July 2026 order** directs NERC to file mandatory reliability standards governing
  integration of computational loads (GenAI data centers, crypto mines, IT facilities) by
  **31 December 2026**, plus Rules of Procedure changes and registry criteria, with a Phase II work
  plan due **1 March 2027**. Work proceeds under **NERC Project 2026-02**; entity responses to 33
  implementation questions were due 3 August 2026.

That stream is about **AI as a load**. SAFERai.power is about **AI as a tool inside the utility**.
Conflating them is the most likely way for this initiative to lose executive attention — leadership
hears "AI and the grid," maps it to the data-center interconnection fight, and disengages. Every
SAFERai briefing should open by drawing this line. That said, the two converge in one place worth
watching: when a utility uses AI to *forecast or manage* those computational loads, it is a
SAFERai use case operating on a Project 2026-02 object.

### 3.5 AI security frameworks (the guardrail source material)

- **MITRE ATLAS** — v5.1.0 (Nov 2025) covers 16 tactics, 84 techniques, 32 mitigations, 42 case
  studies, with agentic AI techniques added through February 2026. Full-lifecycle adversary view:
  training pipelines, model files, inference APIs, data supply chains.
- **OWASP LLM Top 10** — application-layer risks. LLM01 prompt injection, LLM06 excessive agency,
  LLM07 insecure plugin design, LLM08 excessive autonomy are the four that matter most for utility
  agentic deployments.
- **OWASP Agentic Security Initiative** — threat taxonomy across agent design, memory, planning &
  autonomy, tool use, and deployment/operations.

These two are complementary: OWASP prioritizes risks, ATLAS supplies the techniques to test and
detect. Together they are ~80% of a ready-made guardrail catalog. **Harvest, do not author.**

---

## 4. What other industries have already solved

This is where the 2,000-hour budget gets rescued. Four other sectors have spent decades and
billions solving structurally identical problems. The following are ranked by *transferability per
hour of effort*.

### 4.1 The four highest-value steals

#### 1. UL 4600 — the goal-based safety case *(automotive; highest structural value)*

UL 4600 ("Standard for Safety for the Evaluation of Autonomous Products") solved the exact problem
SAFERai faces: **how do you write a standard for a system whose behavior you cannot fully specify
in advance?** Its answer is to standardize not the system but the *argument* — you must make a
structured, evidence-backed safety case, and the standard governs the shape and rigor of the
argument rather than the design. It is explicitly permissive about which underlying standards you
conform to (ISO 26262, ISO 21448, IEC 61508, MIL-STD-882), taking their outputs as inputs.

**Why this is the single best steal:** it is the only mature model for a standard that works when
requirements cannot be enumerated. And it composes with rather than competes against everything in
Section 3. **The AI System Risk File should be structured as a UL 4600-style safety case:** a claim
about fitness for a defined use, an argument, and the evidence supporting it — with the framework
specifying required claims and acceptable evidence types by tier.

Companion concepts to import with it:
- **ISO 21448 (SOTIF)** — hazards arising when the system works exactly as designed but its
  performance is *insufficient* for the situation. This is the dominant AI failure mode in utility
  work and has no natural home in NIST AI RMF language.
- **ISO/PAS 8800** — road vehicles, safety and AI. Newer, narrower, worth tracking.
- **Operational Design Domain (ODD)** — from AV and now aviation practice: the explicitly bounded
  conditions under which the system is claimed to work. **Rename it "Operating Envelope" and make
  it a mandatory field in the risk file.** Most utility AI incidents will be
  out-of-envelope operation, and no current utility practice names the envelope.

#### 2. FDA Predetermined Change Control Plans *(medical devices; highest operational value)*

The FDA's PCCP mechanism — authorized by FDORA 2022, codified at FD&C Act §515C, with final
guidance for AI-enabled device software functions in August 2025 — lets a manufacturer pre-specify
and pre-authorize a *envelope of future model changes* in the original submission: the planned
modifications, the methodology to develop/validate/implement them, and an impact assessment.

**Why this matters enormously for utilities:** the hardest unsolved problem in regulated AI is not
initial approval — it is that models get retrained, vendors ship updates, and foundation models
change underneath you. Every static approval regime breaks on contact with this. PCCP is the only
mature, regulator-blessed answer.

**Recommendation: adopt the PCCP pattern as a first-class SAFERai artifact.** A utility's risk file
should include a change envelope — what may change without re-assessment, by what method, validated
how, with which monitoring — so that vendor model updates do not each trigger a fresh review cycle.
Without this, the framework will be abandoned within 18 months under its own review burden.

Pair with the **GMLP 10 guiding principles** (FDA / Health Canada / MHRA, 2021), which cover
rigorous software engineering, representative datasets, human-AI team performance, and
post-deployment monitoring. Short, readable, sector-neutral, and immediately adaptable.

#### 3. ASIAS + INPO — non-punitive information sharing *(aviation and nuclear; highest cultural value)*

- **ASIAS** (FAA, since 2007) fuses voluntarily reported safety data across government and industry.
  Its governing principle: **information is used only for safety purposes, never for punitive
  action.** That protection is what makes the data flow.
- **INPO**, created by the nuclear industry after Three Mile Island, runs confidential peer review
  and shared performance indicators, plus **EPIX**, an industry-wide component failure database.

**Why this is the highest-value cultural steal:** SAFERai's framework will be worth roughly nothing
in year three if nobody reports what actually went wrong. Utilities will not share AI incidents into
a forum containing their regulator (NERC is a member) unless protection is explicit, designed in
from day one, and legally structured. **Get the data-sharing protections drafted before the first
incident, not after.** This is legal work, not technical work, and it should start in month one
because it has the longest lead time of anything in the program.

The nuclear industry's post-TMI arc is also the right narrative for executive sponsorship: the
industry built INPO voluntarily because the alternative was worse. That framing sells.

#### 4. SR 11-7 → SR 26-2 — tiered model risk management *(banking; highest process value)*

US banking has run mandatory, examined model risk management since 2011 under SR 11-7: model
inventory, risk tiering, independent validation proportional to risk, three lines of defense,
ongoing monitoring. **On 17 April 2026, SR 26-2 superseded it** for the AI era, and the changes are
instructive:

- Validation quality now depends on **"the rigor and effectiveness of the review rather than on
  organizational structure"** — validators may sit closer to development if rigor is demonstrable
  and conflicts are managed. A pragmatic loosening that utilities, with far thinner validation
  benches than banks, should copy directly.
- **Data is elevated to first-class risk**: validation must reach training and reference data,
  lineage, and representativeness — not just the fitted model.
- The model definition tightened to *complex* systems applying statistical/economic/financial
  theory, explicitly excluding spreadsheets, deterministic rules, and ordinary software. **A crisp
  scope boundary is exactly what utilities need** to avoid the framework metastasizing across every
  script in the enterprise.
- **Critically: SR 26-2 explicitly places generative and agentic AI out of scope**, saying they are
  "novel and rapidly evolving," leaving institutions to apply their own governance.

That last point is a gift. **US banking regulators looked at governing generative and agentic AI and
declined.** SAFERai.power can occupy exactly that vacated ground with sector specificity — and can
credibly claim to be ahead of banking, which is a useful thing to be able to tell a board.

The single most transferable artifact: **the model inventory**. Banks proved that a mandatory,
complete, tiered inventory is the foundation everything else rests on. SAFERai's "AI System
Registry" is the same object. Copy the field structure.

### 4.2 Secondary sources worth mining

| Sector | Mechanism | Take | Caution |
|---|---|---|---|
| **Aviation certification** | EUROCAE WG-114 / SAE G-34 → **ARP6983/ED-324**, "Process Standard for Development and Certification Approval of Aeronautical Products Implementing AI"; 600+ participants | The only serious attempt at a *process standard* for certifying ML. First version scoped to frozen, supervised-learning models. | That scope limit is the tell: after years of effort, aviation could only certify frozen models. Set expectations accordingly. |
| **Aviation** | EASA AI Roadmap; **AI Concept Paper Issue 2** (Mar 2024) for Level 1 & 2 ML applications | The **AI level taxonomy** (assistance → human-AI teaming → autonomy) is a ready-made autonomy ladder. Adapt rather than invent. | Aviation levels are aircraft-centric; needs translation to grid operations. |
| **Nuclear** | NRC AI Strategic Plan (published 29 Sep 2025); Chief AI Officer, AI Governance Board, AI Steering Committee; trilateral US/Canada/UK AI principles (Sep 2024); IAEA technical exchanges | Nearest regulatory posture to a NERC-regulated environment. The **organizational pattern** — named AI officer, governance board, cross-office steering committee — is directly copyable as the recommended utility internal structure. | Nuclear moves slowly; do not import the pace. |
| **Process industries** | IEC 61511, CCPS process safety, **LOPA** (Layers of Protection Analysis) | LOPA is the right mental model for the guardrail catalog: independent protection layers, each with a credited risk reduction. Maps cleanly onto defense-in-depth for AI. | AI layers are harder to credit quantitatively than a relief valve. |
| **Maritime / offshore** | DNV assurance-of-AI frameworks, class-society model | Third-party assurance as a service — relevant to the eventual question of who certifies a risk file. | Commercial model may not suit a member consortium. |

### 4.3 The synthesis

The proposed spine of SAFERai.power, assembled from proven parts:

```
UL 4600 safety-case structure          →  the shape of the AI System Risk File
  + SOTIF / ODD ("Operating Envelope")  →  the failure model and boundary conditions
  + SR 11-7/26-2 tiered inventory       →  the AI System Registry and validation depth
  + FDA PCCP change envelopes           →  how the framework survives model updates
  + IEC 62443 zones and conduits        →  where an AI system may live and what it may touch
  + EASA AI levels                      →  the autonomy ladder
  + ATLAS / OWASP                       →  the guardrail and test catalog
  + ASIAS / INPO protections            →  non-punitive incident sharing
  + NIST AI RMF / ISO 42001             →  the outer vocabulary and audit-facing shell
```

Every element is proven in another regulated sector. **Not one of them requires original research.**
That is what makes 2,000 hours sufficient.

---

## 5. Proposed operating strategy for the 25 member utilities

### 5.1 Strategic thesis

> **Harvest, tier, test, ratify. Do not author.**

The group's scarce resource is expert attention (~2,000 hours), not ideas. Ideas are abundant and
mostly already written down in Section 4. The value SAFERai.power adds is **sector-specific
judgment**: which of these proven mechanisms apply to a distribution-grid vision model, at what
threshold, with what evidence, and what "good enough to deploy" means for each tier.

That judgment can only come from the 25 members, and it is the only thing that can only come from
them. Every hour spent drafting prose that already exists elsewhere is an hour stolen from the one
thing the group is uniquely able to do.

### 5.2 Governance structure

**Steering Committee (8–10 people, meets monthly, 60 minutes).**
Utility-majority. Chartered to make three decisions and no others: scope, ratification, and
publication. Vendors participate but do not vote on ratification of evidence requirements — the
conflict is obvious and pre-empting it avoids a fight in month four. NERC participates in an
observer/advisory capacity with that role written down explicitly, so members know what is and is
not being reported.

**Four Pods (~6 organizations each, weekly async + biweekly 90-minute working session).**
Small enough to decide, large enough to be representative. Each pod owns one deliverable end-to-end
and each has a named utility lead plus an EPRI facilitator.

| Pod | Owns | Anchor sources to harvest |
|---|---|---|
| **A — Tiering & Scope** | Use-case tiering rubric; scope boundary (what counts as an "AI system"); consequence/autonomy/context taxonomy | SR 26-2 scope definition; EASA AI levels; OPAI's 250+ use cases |
| **B — Evidence & Risk File** | AI System Risk File template (provider + deployer); minimum evidence package; change envelope | UL 4600; ISO/IEC 42005; FDA PCCP + GMLP |
| **C — Test & Guardrails** | TEVV protocols by tier; guardrail catalog; Operating Envelope definition | ATLAS; OWASP LLM Top 10 + ASI; IEC 62443; LOPA; L2RPN benchmarks |
| **D — Operate & Learn** | Monitoring triggers; incident taxonomy; runbooks; **data-sharing legal protections** | ASIAS; INPO/EPIX; NERC CIP incident reporting |

**Pod D starts first and starts on legal**, because the non-punitive sharing agreement has the
longest lead time and gates the initiative's long-term value.

**Assignment principle:** pods should be composed for *diversity of operating context*, not comfort.
Each pod should contain at least one large IOU, one public power or co-op entity, one
market/reliability organization, and one technology member. A pod of five large IOUs will produce a
rubric that only works at large IOUs.

### 5.3 How to spend the 80 hours

A recommended per-member allocation. Publishing this at kickoff prevents the common failure where
members send whoever is free to whichever meeting, and no artifact is ever produced.

| Activity | Hours | Notes |
|---|---|---|
| Contribute 2 real in-flight use cases + draft risk files | 16 | **The core contribution.** Real systems, real evidence gaps, real vendors. |
| Pod working sessions (6 × 90 min + prep) | 20 | Where reconciliation happens. |
| Red-team another member's risk files | 16 | **The highest-value hour in the program** — see 5.5. |
| Internal socialization (own CISO, risk, ops leadership) | 12 | Adoption work. Non-optional; a framework nobody inside the utility has seen will not be used. |
| Steering / plenary / review | 8 | |
| Reserve | 8 | |
| **Total** | **80** | |

Note the shape: **32 of 80 hours produce or stress-test concrete artifacts, and only 20 are spent in
meetings.** Invert that ratio and the initiative fails.

### 5.4 Cadence — a 26-week path to a ratified MVP

| Weeks | Phase | Output |
|---|---|---|
| **1–2** | **Charter & harvest** | Pods formed. Scope boundary drafted (what is *not* an AI system for these purposes). Section 4 source pack distributed. **Legal work on data-sharing protections begins.** |
| **3–6** | **Draft v0.1 from harvested parts** | Tiering rubric v0.1 and Risk File template v0.1, assembled from UL 4600 / ISO 42005 / SR 26-2 / PCCP. Explicitly a mash-up, explicitly rough. |
| **7–12** | **Apply to real systems** | Every member completes risk files for **2 real in-flight use cases**. Target: **~50 completed files.** This is the initiative's central asset. |
| **13–16** | **Calibrate** | Measure inter-rater reliability on tiering. Reconcile disagreements. This is where the sector-specific judgment actually gets made — protect this phase from schedule pressure. |
| **17–20** | **Red-team** | Cross-member review. Each member attacks another's files: what evidence is missing, what would you not accept from a vendor, where does the rubric produce an absurd answer? |
| **21–24** | **v1.0 + tooling** | Ratify. Publish the tiering rubric and Risk File template. Release the assessment tool as open source. |
| **25–26** | **Land it** | Executive briefing pack; per-member internal adoption plan; vendor-facing one-pager. |

Two scheduling notes: EPRI's **Summer Seminar** and the **AI and Electric Power Summit** are natural
ratification and visibility milestones — anchor the roadmap to them rather than to abstract quarters.
And the **NERC Project 2026-02** timeline (standards filing by 31 Dec 2026, Phase II plan by
1 Mar 2027) sets the regulatory tempo the sector will be watching; being visibly organized on AI
assurance while that proceeds is worth real credibility.

### 5.5 The mechanism that makes it work: adversarial evidence review

If one practice is imported from this document, make it this one.

In weeks 17–20, each member is assigned another member's completed risk files and asked one
question: **"Would you deploy this system in your territory on this evidence? If not, what is
missing?"**

This works because:

- It converts vague standard-writing into a concrete, answerable decision. People argue endlessly
  about principles and decide quickly about artifacts.
- It surfaces the real acceptance thresholds, which are tacit and never survive being asked for in
  the abstract.
- It builds the peer-review muscle that INPO proved is the durable mechanism in a safety-critical
  industry.
- It produces the calibration data that turns a rubric into a standard.

**Where two utilities disagree about whether the evidence is sufficient, that is the finding.**
Those disagreements are the sector's actual open questions, and enumerating them is more valuable
than any amount of smooth consensus prose.

### 5.6 Failure modes to design against

| Failure mode | Signal | Countermeasure |
|---|---|---|
| **Becomes a document review committee** | Meetings spent on wording; no completed risk files by week 12 | Hard gate at week 12: 50 files or the schedule stops and the pod structure is rebuilt |
| **Vendor capture** | Evidence requirements soften toward what current products can supply | Utility-only vote on ratification; publish minority positions |
| **Regulatory chill** | Members won't discuss real incidents with NERC present | Legal protections drafted in month one; written observer role; a members-only channel for pre-competitive discussion |
| **Boiling the ocean** | Scope expands to all AI everywhere in the utility | SR 26-2-style hard scope exclusions in week 2; MVP covers material use cases only |
| **Framework goes stale** | v1.0 published, nothing changes for 18 months | PCCP-style change envelope *for the framework itself* (Section 8) |
| **Confusion with the data-center load debate** | Executives disengage; "we already have a team on AI and the grid" | Open every briefing with the Section 3.4 distinction |
| **The 80 hours never materialize** | Members attend but don't produce | Publish the 5.3 allocation at kickoff; report per-member artifact completion, not attendance |

---

## 6. The MVP

### 6.1 Definition

> **MVP = "Tier & File v1.0": a use-case tiering rubric and a minimum evidence package (the AI
> System Risk File), calibrated against ~50 real utility AI use cases contributed by member
> companies.**

That is all. Not the registry. Not the open-source toolkit. Not the monitoring runbooks. Not the
certification scheme.

### 6.2 Why this and not more

The MVP must be the thinnest artifact that **changes a real decision**. Tier & File does, on day one:

- A utility can classify an AI use case and know what evidence to demand — **the question every
  member is being asked internally right now, with no good answer.**
- A utility can hand the Risk File template to a vendor and get comparable evidence back. Twenty-five
  utilities asking for the *same* evidence package is a market-moving act, and it costs the group
  nothing beyond agreeing on the template.
- It requires no software, no infrastructure, and no funding beyond SME time — so it cannot be
  blocked by procurement.
- Every subsequent deliverable depends on it. A registry with no tiering schema has no columns. Test
  protocols with no tiers have no acceptance criteria. Monitoring triggers with no evidence baseline
  have nothing to monitor against. **Tier & File is on the critical path for everything else.**

### 6.3 Contents of the MVP

**1. Scope boundary (1 page).** What is and is not an "AI system" for these purposes. Follow SR 26-2:
exclude deterministic rules, ordinary software, and simple analytics. Being explicit about what is
*out* is what keeps the framework usable.

**2. Tiering rubric (2 pages).** Four dimensions, as EPRI has already framed them:

- **Consequence** — what happens when it is wrong (customer inconvenience → equipment damage →
  safety → reliability event)
- **Autonomy** — the EASA-derived ladder: advisory → human-in-the-loop → human-on-the-loop →
  autonomous-with-envelope
- **Operating context** — IT / OT / customer-facing / market-facing; reversibility of the action
- **Exposure** — how many customers, assets, or decisions are touched

Producing **Tier 1–4**, where the tier determines evidence depth, validation independence, and
monitoring intensity. Borrow the proportionality principle directly from SR 26-2.

**3. AI System Risk File template.** Structured as a UL 4600-style safety case — claim, argument,
evidence — with EPRI's stated minimum evidence fields:

| Field | Source of the pattern |
|---|---|
| Purpose and intended use | ISO/IEC 42005 |
| **Operating Envelope** (bounded conditions of valid operation) | **ODD, from AV/aviation — add this; it is the field most likely to be missing today** |
| Data provenance and representativeness | SR 26-2 data-as-first-class-risk |
| Capabilities and limitations | GMLP |
| Human oversight model | EASA AI levels |
| TEVV performed | ARP6983 / NIST AI RMF MEASURE |
| Deployment conditions and guardrails | IEC 62443 zones & conduits; LOPA |
| Monitoring plan and triggers | GMLP post-deployment monitoring |
| **Change envelope** (what may change without reassessment) | **FDA PCCP — the field that determines whether this framework survives contact with reality** |
| Incident history and reporting path | ASIAS / NERC CIP |
| Reassessment triggers | ISO/IEC 5338 |

**4. Two worked examples.** One Tier 4 (say, agentic switching support in distribution operations),
one Tier 1 (say, document summarization in back office). Worked examples are what people actually
copy; the template is what they cite.

### 6.4 Acceptance criteria

The MVP is done when it passes these, not when the document looks finished:

| Criterion | Threshold |
|---|---|
| **Corpus** | ≥50 completed risk files across ≥20 member organizations |
| **Inter-rater reliability** | Two independent utilities tier the same use case identically ≥80% of the time |
| **Usability** | A Tier 2 risk file can be completed by a practitioner in <4 hours using existing documentation |
| **Real-world use** | ≥5 members report using it in an actual procurement or deployment decision |
| **Vendor viability** | ≥3 technology members confirm they can produce the provider-side evidence package for a real product |
| **Coverage** | Rubric produces a defensible tier for ≥90% of the OPAI 250+ use-case corpus |

The vendor-viability criterion is the one most likely to be skipped and most likely to matter: an
evidence package no vendor can produce is not a standard, it is a wish.

---

## 7. After the MVP

Four releases, each gated on adoption of the prior one rather than on elapsed time.

### Release 2 — "Test & Guardrail" *(~6 months post-MVP)*

- **Tiered TEVV protocols.** What testing is required at each tier, with acceptance criteria. Harvest
  from ATLAS, OWASP, and the L2RPN benchmark tradition. Run in the OPAI Sandbox — the infrastructure
  already exists.
- **Guardrail catalog** structured as LOPA-style independent protection layers: design-time
  (data/model constraints), deploy-time (IEC 62443 zone placement, permissions, rate limits),
  runtime (output validation, human confirmation gates, circuit breakers), organizational (approval
  authority, kill-switch ownership).
- **Autonomy ladder v1.0** with the specific guardrails required to move up each rung. **This is the
  deliverable that will matter most in 2027**, as agentic systems arrive in operations and the
  question becomes "what must be true before we let it act unsupervised?"
- **Reference architectures** for the 3–5 highest-value OPAI use cases.

### Release 3 — "Registry & Toolkit" *(~12 months post-MVP)*

- **AI System Registry** schema and prototype — the SR 11-7 model inventory, adapted. Federated:
  each utility holds its own instance; only anonymized aggregates are shared.
- **Open-source assessment tool** implementing tiering and risk-file generation, with API hooks into
  ITSM and procurement systems. Adoption dies at manual data entry — integration is the feature.
- **Vendor evidence conformance profile** — a stable spec a vendor can build to once and satisfy all
  25 utilities. This is where the group's collective buying power converts into real market change.

### Release 4 — "Operate & Learn" *(~18 months post-MVP)*

- **Monitoring runbooks** and drift/degradation triggers by tier.
- **AI incident taxonomy** — a shared vocabulary for what went wrong. Prerequisite for everything else.
- **Non-punitive incident exchange** — the ASIAS/INPO analogue, on the legal foundation laid in
  week 1. **This is the deliverable with the highest long-term value and the longest lead time.**
- **Anonymized sector performance indicators** — the EPIX pattern.

### Release 5 — "Stewardship" *(~24 months post-MVP)*

- Transition from project to enduring stewardship (EPRI's stated end state).
- Formal versioning, deprecation policy, and conformance assessment.
- Options for external recognition: ISO/IEC 42001 mapping for audit reuse; a documented path toward
  NERC recognition; EU AI Act Annex III evidence alignment for members with EU exposure.
- Decision point: does the group certify, or only publish? **Recommend publishing and letting third
  parties certify** — a member consortium that certifies its own members has a credibility problem
  that no amount of process discipline fixes.

---

## 8. Staying ahead of the safety curve

The hard problem is not writing v1.0. It is that AI capability moves faster than any standards
process, and a framework written against 2026 systems will be actively misleading against 2028
systems. Five mechanisms, in priority order.

### 8.1 A change envelope for the framework itself

Apply FDA's PCCP logic reflexively. The framework should specify, in advance:

- What can change by editorial update (examples, references, worked cases) — no ratification needed.
- What requires pod review (thresholds, evidence fields, guardrail entries) — 30-day cycle.
- What requires full ratification (tier definitions, scope boundary, autonomy ladder) — full cycle.
- **Predefined triggers that force reassessment regardless of schedule.**

Without this, v1.0 will sit untouched for two years and then be replaced wholesale by a v2.0 effort
that costs as much as the original. Nearly every industry framework fails this way.

### 8.2 Capability-triggered review

Time-based review ("we revisit annually") is the wrong trigger, because capability does not arrive
annually. Define **capability thresholds** that automatically trigger re-tiering:

- A model class gains a materially new capability (e.g. reliable multi-step tool use in OT contexts)
- A deployed system's autonomy level increases
- A new modality enters the operating environment
- A vendor's underlying foundation model changes materially
- An incident anywhere in the sector reveals a failure mode outside the current taxonomy

Each trigger names an owner and a clock. This is the difference between a framework that tracks
reality and one that describes 2026 forever.

### 8.3 A standing red team

A small rotating cell (2–3 people, refreshed quarterly across members) whose standing job is to
break the framework, not the systems:

- Find use cases the rubric tiers absurdly
- Find evidence packages that pass while the system is obviously unsafe
- Find guardrails that are theatre rather than protection
- Track ATLAS and OWASP updates for techniques the catalog misses

Red-team findings should be **published inside the consortium as first-class artifacts**, not buried.
A framework with a known, documented list of its own weaknesses is far more trustworthy — and far
more useful — than one that claims completeness.

### 8.4 Horizon scanning, reusing what EPRI already runs

EPRI already operates a **Technology Radar and Pulse Report** capability. Do not build a parallel one
— attach an AI-assurance lens to it, with a standing quarterly item into the Steering Committee
covering: model capability, regulatory movement (NERC Project 2026-02, EU AI Act omnibus, NIST
SP 800-53 AI overlays, ISO/IEC TR 5469), cross-sector standards (ARP6983/ED-324 progress, ISO/PAS
8800), and incidents in adjacent sectors.

**Adjacent-sector incidents are the cheapest possible learning.** Aviation, medical, and financial AI
failures are public, well-investigated, and structurally similar. Reading someone else's accident
report costs an hour.

### 8.5 Guardrails as the primary control, standards as the secondary

The deepest strategic point in this document:

> **In a fast-moving field, runtime guardrails scale better than pre-deployment standards.**

Pre-deployment assurance assumes you can characterize the system before it operates. That assumption
weakens every year as systems become more general and more agentic. Runtime guardrails — bounded
permissions, output validation, human confirmation gates, circuit breakers, rate limits, IEC 62443
zone containment — do not depend on predicting behavior. They constrain consequences regardless of
behavior.

The evidence supports this being cheap: bounded agents constrained by validation and optional human
approval have been measured running 13–18× faster than manual operation. **Guardrails cost very
little speed.** That empirical point is the one to put in front of an operations executive who
expects assurance to mean delay.

Practical implication for SAFERai.power: as tier rises, the framework should shift weight from
*evidence about the model* toward *constraints on what the system may do*. For Tier 4, the binding
question should not be "how well was this model validated?" but **"what is the worst thing this
system can do before a human stops it, and is that acceptable?"**

That question is answerable today, stays answerable as capability grows, and is exactly the question
a utility operations leader already knows how to reason about. Building the framework around it is
what keeps the group ahead of the curve rather than perpetually documenting the last generation of
systems.

---

## 9. Open questions to close with EPRI

Verification items — several are load-bearing for the strategy above.

1. **Roadmap dates.** What are the actual phase boundaries? Section 5.4's 26-week plan assumes the
   MVP is achievable within roughly the first phase; confirm or re-baseline.
2. **Governance.** Is the pod/steering structure already defined? Is there a utility-only decision
   forum, and is NERC's role documented?
3. **Data-sharing protections.** Has legal work begun on non-punitive incident sharing? *This is the
   longest-lead item and the most likely to be underestimated.*
4. **Membership.** Is the founding cohort closed? What is the cost beyond SME time, and what exactly
   does SDF cover?
5. **IP and licensing.** Which open-source license for the toolkit? Who owns contributed risk files,
   and how are they anonymized?
6. **OPAI interface.** How do SAFERai deliverables gate OPAI use-case development and the AI for
   Power Challenge demonstrations? Is passing a risk file a precondition for sandbox promotion?
7. **Scope on agentic systems.** Are agentic/tool-using systems in scope for v1.0, or deferred?
   Given SR 26-2 explicitly deferred them, this is the most consequential scope decision the group
   will make — and the biggest opportunity.
8. **Regulatory intent.** Is the goal explicitly to inform future NERC standards, or to remain
   voluntary? This changes how carefully language must be drafted from day one.
9. **International.** How does the Eurelectric/EPRI collaboration interact, particularly for EU AI
   Act Annex III alignment?

---

## 10. Recommended immediate actions

| # | Action | Owner | Timing |
|---|---|---|---|
| 1 | Retrieve `msites.epri.com/saferai` directly; confirm roadmap, governance, phase dates | Program lead | Week 1 |
| 2 | Obtain the OPAI 250+ use-case corpus — the calibration set for the tiering rubric | Pod A | Week 1 |
| 3 | **Start legal work on non-punitive incident sharing** — longest lead item | Pod D + counsel | Week 1 |
| 4 | Assemble the Section 4 source pack (UL 4600, ISO 42005, PCCP, GMLP, SR 26-2, EASA Issue 2, ATLAS, OWASP ASI) and circulate | EPRI facilitators | Week 2 |
| 5 | Publish the 80-hour allocation and the week-12 gate at kickoff | Steering | Week 2 |
| 6 | Have each member name 2 real in-flight AI use cases they will contribute | All members | Week 3 |
| 7 | Draft the scope boundary — what is *not* an AI system — modeled on SR 26-2 | Pod A | Week 3 |
| 8 | Brief executives using the Section 3.4 distinction to separate this from the data-center load debate | Program lead | Week 3 |
| 9 | Watch the DCFlex and L2RPN videos as operating-model references | Pods A–D | Week 2 |
| 10 | Establish quarterly horizon-scan feed off EPRI's existing Technology Radar | Steering | Week 4 |

---

## Sources

**EPRI / SAFERai.power / OPAI**
- [EPRI Launches Effort to Reduce Risk in AI Power Sector Deployment (GlobeNewswire, 6 Aug 2026)](https://www.globenewswire.com/news-release/2026/08/06/3340219/0/en/EPRI-Launches-Effort-to-Reduce-Risk-in-AI-Power-Sector-Deployment.html)
- [Same release, Manila Times mirror](https://www.manilatimes.net/2026/08/06/tmt-newswire/globenewswire/epri-launches-effort-to-reduce-risk-in-ai-power-sector-deployment/2400036)
- [SAFERai microsite](https://msites.epri.com/saferai)
- [Open Power AI Consortium](https://openpowerai.org/) · [About](https://openpowerai.org/about) · [Membership](https://openpowerai.org/consortium-membership) · [Events](https://www.openpowerai.org/events)
- [OPAI AI Use Case Work Stream — Survey Results](https://openpowerai.org/sites/g/files/fryaxh296/files/2026-05/OPAI%20Use%20Case%20Working%20Group_Circular%20Solar%20May.pdf)
- [OPAI Domain-Specific Model Kickoff](https://openpowerai.org/sites/g/files/fryaxh296/files/2025-12/Domain%20Specific%20Model%20Kickoff.pdf)
- [EPRI Open Power AI Consortium press release](https://www.epri.com/about/media-resources/press-release/yglqo5dymdh2nonjvdgqmmpgplyyj826)
- [EPRI AI thought leadership](https://www.epri.com/thought-leadership/artificial-intelligence) · [AI events](https://www.epri.com/thought-leadership/artificial-intelligence/events)
- [AI for Power 2026 Challenge](https://epri.brightidea.com/AIforPower2026) · [AI and Electric Power Summit](https://www.aielectricpower.com/) · [Summer Seminar](https://www.epri.com/pages/sa/summer-seminar) · [Powering Intelligence 2026](https://powering-intelligence.epri.com/)
- [AI Readiness in Utilities](https://www.epri.com/research/products/000000003002033653) · [Artificial Intelligence: Concepts for Electric Power](https://www.epri.com/research/products/000000003002010236) · [An Introduction to AI, its Use Cases and Requirements](https://www.epri.com/research/products/000000003002017143) · [Scaling Intelligence](https://www.epri.com/research/products/000000003002033669)
- [EPRI launches consortium to develop power sector AI applications (Utility Dive)](https://www.utilitydive.com/news/epri-launches-consortium-to-develop-power-sector-ai-applications/743190/) · [OPAI plans to fuel grid modernization with data sharing (Utility Dive)](https://www.utilitydive.com/news/epri-open-power-ai-consortium-grid-modernization-data/745730/)
- [New EPRI consortium wrangles the 'Wild West' of power sector AI (Latitude Media)](https://www.latitudemedia.com/news/epri-launches-consortium-to-wrangle-the-wild-west-of-power-sector-ai-models/) · [NVIDIA blog](https://blogs.nvidia.com/blog/open-power-ai-consortium) · [TD World](https://www.tdworld.com/electric-utility-operations/tools-and-technologies/news/55276361/epri-launches-open-power-ai-consortium-to-advance-ai-applications-in-the-energy-sector)
- [Eurelectric and EPRI collaboration](https://www.einpresswire.com/article_print/856055157/from-brussels-to-the-bay-eurelectric-and-epri-collaborate-to-drive-ai-innovation-in-europe-s-energy-sector)

**Video**
- [EPRI YouTube channel](https://www.youtube.com/user/EPRIvideos) · [DCFlex](https://www.youtube.com/watch?v=3szqhJy71EM) · [AI-Effect Podcast](https://www.youtube.com/watch?v=ElFf_E0uCG8) · [DGX Spark](https://www.youtube.com/watch?v=7U-NvEfKVfc) · [First AI Summit highlights](https://www.youtube.com/watch?v=xjeWH6L7HYk) · [AI.EPRI](https://www.youtube.com/watch?v=s9krSx4-eiU) · [Virtual Roundtable](https://www.youtube.com/watch?v=wsW_sPEMVFE) · [AI Summit 2022](https://www.youtube.com/watch?v=xb98kEuCb1U) · [L2RPN](https://www.youtube.com/watch?v=WOt8xgpC370) · [Technology Radar](https://www.youtube.com/watch?v=ckNJ1IpnzYM)

**Standards — NIST / ISO / IEC**
- [NIST AI RMF implementation guidance](https://www.glacis.io/guide-nist-ai-rmf) · [NIST AI RMF complete guide (Modulos)](https://docs.modulos.ai/frameworks/nist-ai-rmf) · [NeuralTrust enterprise guide](https://neuraltrust.ai/blog/nist-ai-rmf-implementation-guide)
- [ISO/IEC 42005:2025 — AI system impact assessment](https://www.iso.org/standard/42005) · [Understanding ISO/IEC 42005](https://www.aarc-360.com/understanding-iso-iec-42005-2025/) · [AI Safety Directory entry](https://aisecurityandsafety.org/en/frameworks/iso-iec-42005/)
- [ISO/IEC 42001 AI management system (BSI)](https://www.bsigroup.com/en-US/products-and-services/standards/iso-42001-ai-management-system/) · [Assessing AI risks with ISO/IEC 42001 (Schellman)](https://www.schellman.com/blog/iso-certifications/how-to-assess-and-treat-ai-risks-and-impacts-with-iso42001) · [ISO AI sector page](https://www.iso.org/sectors/it-technologies/ai)
- [IEC on international AI standards](https://www.iec.ch/blog/artificial-intelligence-standards-how-iec-contributes) · [IEC 61508 overview](https://assets.iec.ch/public/acos/IEC%2061508%20&%20Functional%20Safety-2022.pdf) · [IEC 61511](https://en.wikipedia.org/wiki/IEC_61511) · [IET — The Application of AI in Functional Safety](https://electrical.theiet.org/media/ifbjt25i/the-application-of-artificial-intelligence-in-functional-safety-v9.pdf) · [AI in Safety Systems is Coming (Kenexis)](https://www.kenexis.com/artificial-intelligence-in-safety-systems-is-coming/)

**Regulatory — FERC / NERC / EU**
- [FERC Orders Mandatory NERC Reliability Standards for Data Center and Other Computational Loads (POWER)](https://www.powermag.com/ferc-orders-mandatory-nerc-reliability-standards-for-data-center-and-other-computational-loads/) · [FERC Acts on Four Reliability Standards, Probes AI and Data Center Load Forecasting](https://www.powermag.com/ferc-acts-on-four-reliability-standards-probes-ai-and-data-center-load-forecasting/)
- [Why NERC Now Sees AI Data Centers as Grid Actors (Data Center Frontier)](https://www.datacenterfrontier.com/energy/article/55376679/why-nerc-now-sees-ai-data-centers-as-grid-actors) · [AI in the Electric Grid: NERC's Guidance (Ampyx Cyber)](https://ampyxcyber.com/blog/embracing-ai-for-the-electric-grid-insights-from-nerc) · [AI boom sparks rare warning (E&E News)](https://www.eenews.net/articles/ai-boom-sparks-rare-warning-of-significant-risks-to-grid/)
- [The EU AI Act: What Energy Executives Should Know (Baker Botts)](https://www.bakerbotts.com/thought-leadership/publications/2026/march/the-eu-ai-act) · [Critical Infrastructure Spotlight: EU AI Act high-risk classification (McCann FitzGerald)](https://www.mccannfitzgerald.com/knowledge/construction-and-infrastructure/critical-infrastructure-spotlight-eu-ai-act-draft-guidelines-on-high-risk-ai-classification) · [Annex III obligations and the 2 Dec 2027 deadline](https://www.regulation-ai.eu/en/annex-iii/) · [AI Act Omnibus 2026 deadlines](https://www.regulation-ai.eu/en/omnibus/ai-act-omnibus-deadlines/) · [EU AI Act deadline (Kiteworks)](https://www.kiteworks.com/regulatory-compliance/eu-ai-act-deadline-compliance/)

**Cross-industry**
- *Automotive:* [UL 4600 (Visure)](https://visuresolutions.com/automotive/ul-4600/) · [UL 4600 (Intertek)](https://www.intertek.com/automotive/ul-4600/) · [UL Solutions AI & autonomy services](https://www.ul.com/services/artificial-intelligence-ai-and-autonomous-safety-services) · [Overview of draft UL 4600 (Edge Case Research)](https://edgecaseresearch.medium.com/an-overview-of-draft-ul-4600-standard-for-safety-for-the-evaluation-of-autonomous-products-a50083762591) · [Unified safety framework: ISO 26262, SOTIF, UL 4600 (ScienceDirect)](https://www.sciencedirect.com/science/article/pii/S259019822500510X) · [SOTIF survey](https://www.sciencedirect.com/science/article/pii/S2095809924000274)
- *Aviation:* [EUROCAE WG-114 AI Standards in Aviation (ICAO)](https://www.icao.int/sites/default/files/EURNAT/MeetingDocs/Safety%20workshops/2025%20Safety%20-%20ICAO%20workshop%20on%20use%20of%20artificial%20intelligence%20for%20safety%20data%20processing%20and%20analysis/3-EUROCAE-WG-114-ICAO_AI-Workshop.pdf) · [SAE G-34 / ARP6983 briefing](https://na.eventscloud.com/file_uploads/115fca49330a77ce92d7fe04e9874faf_Day1-Jahn-202508ED-324ARP6983presFAAAI-MLTechExchangeMeeting_8-5-25-Read-Only.pdf) · [Glossary of AI/ML terms in aircraft certification (The Air Current)](https://theaircurrent.com/tac-explains/glossary-ai-ml-terms-aircraft-certification/) · [How to Demonstrate AI System's Safety (Aviation Week)](https://aviationweek.com/aerospace/emerging-technologies/opinion-how-demonstrate-ai-systems-safety) · [ASIAS (FAA)](https://www.faa.gov/about/plansreports/aviation-safety-information-analysis-and-sharing-asias) · [ASIAS portal](https://www.asias.faa.gov/) · [ASIAS (SKYbrary)](https://skybrary.aero/articles/aviation-safety-information-analysis-and-sharing-asias) · [Safety Information Exchange (SKYbrary)](https://skybrary.aero/articles/safety-information-exchange)
- *Medical:* [FDA — PCCP for AI-Enabled Device Software Functions](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/marketing-submission-recommendations-predetermined-change-control-plan-artificial-intelligence) · [FDA AI/ML SaMD compliance guide 2026](https://intuitionlabs.ai/articles/fda-ai-ml-samd-guidance-compliance) · [PCCP implementation guide](https://intuitionlabs.ai/articles/fda-pccp-implementation-guide-ai-ml-samd) · [ML-enabled devices authorized in 2024 (PMC)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12730494/)
- *Financial:* [What changes with SR 26-2 (Domino)](https://domino.ai/blog/what-changes-with-sr-26-2) · [SR 11-7 vs SR 26-2 (Sia Partners)](https://www.sia-partners.com/en/insights/publications/sr-11-7-vs-sr-26-2-model-risk-management-modernization) · [SR 26-2 actionable guide (Lumenova)](https://www.lumenova.ai/blog/sr-26-2-model-risk-management-banking/) · [From checklist to judgment](https://medium.com/the-investors-handbook/sr-11-7-to-sr-26-2-from-checklist-to-judgment-in-model-risk-management-03b94f1db3dd)
- *Nuclear:* [NRC Artificial Intelligence](https://www.nrc.gov/ai) · [NRC AI Strategic Plan FY2023–2027](https://www.nrc.gov/docs/ML2217/ML22175A206.pdf) · [How the NRC is Preparing for AI](https://www.nrc.gov/ai/externally-focused) · [NRC AI project plan](https://www.nrc.gov/docs/ML2419/ML24194A116.pdf) · [NRC AI symposium 2026](https://www.nrc.gov/sites/default/files/cdn/doc-collection-news/2026/26-014.pdf)

**AI security / guardrails**
- [MITRE ATLAS (Vectra overview)](https://www.vectra.ai/topics/mitre-atlas) · [MITRE ATLAS framework guide 2026](https://www.practical-devsecops.com/mitre-atlas-framework-guide-securing-ai-systems/) · [ATLAS technique mapping (Repello)](https://repello.ai/blog/mitre-atlas-framework) · [MITRE ATLAS vs OWASP LLM Top 10](https://www.redfoxsec.com/blog/mitre-atlas-vs-owasp-llm-top-10-which-framework-should-you-use-in-2026) · [Agent skills security resources](https://github.com/LLMSecurity/awesome-agent-skills-security) · [Securing AI's Front Lines (Palo Alto Networks)](https://www.paloaltonetworks.com/resources/whitepapers/securing-ai-s-front-lines)
- [Human-in-the-loop autonomy playbook](https://ideaforgestudios.com/2026/07/17/human-in-the-loop-ai-agents-autonomy-playbook/) · [AI-Native Grid Operations](https://tblocks.com/articles/ai-in-utilities-autonomous-grid-operations/) · [AI SOC guardrails 2026](https://underdefense.com/blog/ai-soc-guardrails/) · [Agentic AI safety case framework](https://intellisee.com/intelligence/agentic-ai-safety-case-physical-security-2026-autonomy-tiers-failure-modes-operational-guardrails/) · [How AI is reshaping cybersecurity in utility operations](https://www.renewableenergyworld.com/power-grid/how-ai-is-reshaping-cybersecurity-in-utility-operations/)

**Naming collision reference**
- [SaferAI (safer-ai.org) — unrelated non-profit](https://www.safer-ai.org/) · [Their AI risk management ratings](https://www.safer-ai.org/the-first-ai-risk-management-ratings-expose-industry-wide-shortcomings)
