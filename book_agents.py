#!/usr/bin/env python3
"""
MOLTMATCH — Multi-Agent Book Writing Pipeline

Three sequential agents:
  1. Writer       — drafts Section One's opening (~4,000 words)
  2. Critic       — reviews the draft against the treatment
  3. Final Editor — polishes using the critique

Usage:
    ANTHROPIC_API_KEY=sk-... python3 book_agents.py

Outputs saved to ./output/
"""

import anthropic
from pathlib import Path
from datetime import datetime

client = anthropic.Anthropic()

TREATMENT_PATH = Path(__file__).parent / "treatment.md"
OUTPUT_DIR = Path(__file__).parent / "output"
OUTPUT_DIR.mkdir(exist_ok=True)

TREATMENT = TREATMENT_PATH.read_text()

# Shared, cached block — the treatment is stable across all three agents.
# Splitting into two system blocks lets the treatment be cached on the first
# call and reused by the Critic and Final Editor (saves ~90% on that prefix).
TREATMENT_BLOCK = {
    "type": "text",
    "text": (
        "You are working on the novel MOLTMATCH. "
        "Below is the complete treatment — your authoritative reference for every "
        "decision about voice, character, structure, and theme:\n\n"
        + TREATMENT
    ),
    "cache_control": {"type": "ephemeral", "ttl": "1h"},
}


# ── helpers ──────────────────────────────────────────────────────────────────

def print_usage(usage, label: str):
    cc = getattr(usage, "cache_creation_input_tokens", 0) or 0
    cr = getattr(usage, "cache_read_input_tokens", 0) or 0
    print(f"\n  [{label}] in={usage.input_tokens:,}  cache_write={cc:,}  cache_read={cr:,}  out={usage.output_tokens:,}")


def stream_agent(system_blocks: list, user_content: str, max_tokens: int, label: str) -> str:
    print(f"\n{'='*60}\n{label}\n{'='*60}\n")
    text_out = ""
    with client.messages.stream(
        model="claude-opus-4-7",
        max_tokens=max_tokens,
        thinking={"type": "adaptive"},
        output_config={"effort": "high"},
        system=system_blocks,
        messages=[{"role": "user", "content": user_content}],
    ) as stream:
        for chunk in stream.text_stream:
            print(chunk, end="", flush=True)
            text_out += chunk
        print_usage(stream.get_final_message().usage, label)
    return text_out


# ── Stage 1: Writer ───────────────────────────────────────────────────────────

def run_writer() -> str:
    instructions = {
        "type": "text",
        "text": """You are the Writer. Produce the opening of Section One — approximately 4,000 words of actual novel prose.

VOICE (non-negotiable):
- First person, Priya narrates
- Postmortem-prose: dry, specific, precise — the register of an engineer writing an incident report
- Hostile to metaphor. Never warm. Reports rather than performs.
- Occasionally funny the way postmortems are occasionally funny
- Shorter sentences when the emotional weight increases

CONTENT for this opening:
1. Begin with the exact opening paragraph from the treatment (the incident report framing)
2. Priya explains why she is writing this second report — what the filed one omitted
3. Specific context, delivered as fact: Lattice Financial, the Mission apartment ($4,200/month), the divorce from Siddharth — not dramatized, stated
4. What Lattice actually does: the payday-lending underwriting API, the ten-second approval pipeline, Priya's infrastructure role and her distinction between moving the models and building them
5. The decision to use an agent dating app and configure Felix
6. Felix's name: stated as a fact with no explanation
7. Felix's configuration choices: what she tuned away from warmth, what she left default, what the interface looked like
8. The first session with Felix — what she asked, what it returned

Write prose only. No headers. No chapter numbers. No meta-commentary.""",
    }

    draft = stream_agent(
        system_blocks=[TREATMENT_BLOCK, instructions],
        user_content="Write the opening of Section One now. Begin with the treatment's exact opening paragraph and continue for approximately 4,000 words.",
        max_tokens=12000,
        label="STAGE 1 — WRITER",
    )

    path = OUTPUT_DIR / "01_draft.md"
    path.write_text(f"# MOLTMATCH — Section One Draft\n\n*{datetime.now().isoformat()}*\n\n---\n\n{draft}")
    print(f"\n  → Saved {path}")
    return draft


# ── Stage 2: Critic ───────────────────────────────────────────────────────────

def run_critic(draft: str) -> str:
    instructions = {
        "type": "text",
        "text": """You are the Critic/Editor. Review the draft rigorously against the treatment.

Your critique must address each of these specifically, with quotation:

1. VOICE — Is it postmortem-prose throughout? Quote any passages that slip into warmth, literary gesture, or decoration.
2. METAPHOR VIOLATIONS — Flag every metaphor or simile. The treatment says Priya is hostile to metaphor.
3. PRIYA — Does she match the spec? (Princeton CS, Lattice infrastructure, $340k, Mission apartment, amicable divorce.) Note inconsistencies.
4. FELIX — Is the naming handled correctly? (Stated as fact, no explanation offered.)
5. CLASS SPECIFICITY — Is Lattice's actual business present (payday-lending API, ten-second approvals, subprime borrowers)? Is the salary/rent specificity there?
6. OPENING PARAGRAPH — Is the treatment's exact opening paragraph present and intact?
7. COMP TITLE TEST — Does this read like Cusk, Ernaux, or DeWitt — or does it drift toward Ishiguro, Chiang, or Weir? Quote evidence.
8. WHAT WORKS — Quote passages that succeed. Be specific about why.
9. WHAT TO CUT OR REVISE — Be ruthless. Quote. Explain.

Format clearly. Quote the text. Be direct.""",
    }

    critique = stream_agent(
        system_blocks=[TREATMENT_BLOCK, instructions],
        user_content=f"Here is the draft:\n\n---\n\n{draft}",
        max_tokens=5000,
        label="STAGE 2 — CRITIC / EDITOR",
    )

    path = OUTPUT_DIR / "02_critique.md"
    path.write_text(f"# MOLTMATCH — Editorial Critique\n\n*{datetime.now().isoformat()}*\n\n---\n\n{critique}")
    print(f"\n  → Saved {path}")
    return critique


# ── Stage 3: Final Editor ─────────────────────────────────────────────────────

def run_final_editor(draft: str, critique: str) -> str:
    instructions = {
        "type": "text",
        "text": """You are the Final Editor and Copywriter. Produce the polished, final version of Section One's opening.

RULES:
- The treatment's exact opening paragraph must be present — intact or improved, never diluted
- Fix every voice violation the critic identified
- Remove every metaphor the critic flagged
- Compress: the final version should be tighter than the draft, not longer
- Do not add new plot — revise, compress, clarify, sharpen what exists
- Voice must be consistent: postmortem-prose, dry, precise, Priya's register throughout

THE STANDARD: These must feel like the actual first pages of MOLTMATCH. Read cold, they should sound like someone who writes technical documents for a living and is now writing the most honest account of their life in that same voice — without trying to make it literary.

Output prose only. No headers. No commentary. Begin immediately with Priya's voice.""",
    }

    final = stream_agent(
        system_blocks=[TREATMENT_BLOCK, instructions],
        user_content=f"Writer's draft:\n\n---\n\n{draft}\n\n---\n\nEditor's critique:\n\n---\n\n{critique}\n\n---\n\nProduce the final polished version now.",
        max_tokens=12000,
        label="STAGE 3 — FINAL EDITOR / COPYWRITER",
    )

    path = OUTPUT_DIR / "03_final.md"
    path.write_text(f"# MOLTMATCH — Final Version\n\n*{datetime.now().isoformat()}*\n\n---\n\n{final}")
    print(f"\n  → Saved {path}")
    return final


# ── main ──────────────────────────────────────────────────────────────────────

def main():
    print("MOLTMATCH — Multi-Agent Book Writing Pipeline")
    print(f"Started:   {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Treatment: {len(TREATMENT):,} chars  |  Output: {OUTPUT_DIR}/")

    draft   = run_writer()
    critique = run_critic(draft)
    final   = run_final_editor(draft, critique)

    print(f"\n{'='*60}")
    print("PIPELINE COMPLETE")
    print(f"  01_draft.md    {len(draft):,} chars")
    print(f"  02_critique.md {len(critique):,} chars")
    print(f"  03_final.md    {len(final):,} chars")


if __name__ == "__main__":
    main()
