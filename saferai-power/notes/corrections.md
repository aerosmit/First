# Corrections log

Things that turned out to be wrong or have since moved. **Where any document disagrees with this
file, this file is right.**

---

## Corrections to the original research brief

| Item | Brief said | Verified | Consequence |
|---|---|---|---|
| **FDA PCCP final guidance** | August 2025 | **3 December 2024** | Date only. Mechanism, statutory basis and three required sections are as described. |
| **MITRE ATLAS scale and cadence** | v5.1.0, Nov 2025 — 16 tactics, 84 techniques, 32 mitigations, 42 case studies | **Release 2026.07 — 16 tactics, 101 techniques, 77 sub-techniques, 37 mitigations, 68 case studies. Monthly `YYYY.MM` releases** | Strengthens the argument for an agent-maintained catalog. A hand-maintained crosswalk cannot track a monthly upstream. |
| **EASA autonomy ladder** | Issue 2 (Mar 2024), Levels 1 & 2 only | **Proposed Issue 3 (June 2026) defines Level 3A and 3B** | **Substantive.** The autonomy ladder scheduled for Release 2 now has a published aviation definition of full authority — 3A under remote monitoring, 3B without end-user involvement — to adapt rather than invent. |
| **OWASP LLM numbering** | "LLM07 insecure plugin design", "LLM08 excessive autonomy" | **2023 numbering. In the 2025 edition LLM06 is excessive agency, LLM07 is system prompt leakage, LLM08 is vector and embedding weaknesses** | Matters beyond pedantry: LLM08 (vector and embedding weaknesses) is exactly the retrieval failure the ASK-1 example turns on. |
| **ARP6983 / ED-324** | Described as though published | **Still in development.** First version scoped to frozen supervised-learning models | Track the release date rather than assuming availability. |

## Refinements, not errors

| Item | Refinement |
|---|---|
| **Member count** | Brief says "~28 named" and computes on 25. Both defensible — 28 named, EPRI says "more than 25". But **~19 are operating utilities**; see `open-questions.md` §2. |
| **SR 26-2** | Also supersedes **SR 21-8**, and is issued **jointly by Fed, OCC and FDIC** — not the Fed alone. Most relevant to banks >$30B in assets. |
| **The 3 hrs/week figure** | Derived, not sourced. Presented in the deck's constraint slide in the same monospace block as the actual arithmetic, which reads as though it were equally solid. Known cosmetic issue; not yet fixed. |

## Confirmed as originally stated

- ISO/IEC 42001:2023 — clauses 4–10 plus Annex A with 38 controls across 9 objectives.
- NIST AI RMF 1.0 — four functions, ~72 subcategories; GOVERN 6 categories/19 subcategories, MAP 5/18.
- UL 4600 — published April 2020, goal-based, safety case of goals + argumentation + evidence, now Ed. 3.
- SR 26-2 — issued 17 April 2026; out-of-scope language for generative and agentic AI is verbatim.
- The 28-name member roster — verbatim agreement across four independent outlets.

## Known internal inconsistency, not yet resolved

**The deck and the primer still run on VMS-1 (vegetation); the narrative runs on ASK-1 (generative
AI).** Two worked examples is defensible and the MVP calls for two. But presenting from the deck
while telling the ASK-1 story exposes the mismatch. Re-cutting deck Part III is the outstanding fix.
