---
uid: note_c3174d924a7a
title: "Aquila Dossier"
subtitle: "How the Documents Check Each Other"
classification: "Confidential: Institutional Investment Reference"
company: "Aquila Global Infrastructure"
date: "July 2026"
from: "Aquila Global Infrastructure"
prepared_for: "Counterparties under NDA."
status: verified
---

# Verification Chain

## Evaluator route

Start with `package/evaluator-guide.md`. It states the decision, the US$30M closing conditions and the shortest evidence route for each investment-committee question. Every material claim in it points to the governing thesis, blueprint, review, model or source register.

The site home page is the document index. Read the package in four steps:

1. **Decide whether to proceed:** Evaluator Guide, then Executive Memo.
2. **Test the governing case:** Investment Thesis §§I–XIII.
3. **Reproduce and falsify:** Thesis Appendices + executable model.
4. **Inspect subsystem evidence:** Engineering Blueprint + four design reviews.

Enter by question, follow the direct route to its authority, and stop when confidence is sufficient.

The documents check each other in one direction.

Design reviews test the blueprint's subsystem allocations. The blueprint carries the thesis's engineering claims. The thesis prices what the blueprint specifies. The memo distils the thesis. The booklet excerpts the public-facing case.

When a subsystem number is questioned, start with the matching design-review verdict register, then follow any explicit correction or executable-model pointer to the current authority. Corridor economics rebuild from `sim/corridor_model.py`; the programme valuation rebuilds from `sim/econ_model.py`.

No downstream engineering claim in the memo or booklet is stronger than the governing design-review verdict or the correction/model authority that verdict points to.

# Claim Grades

The grade key lives here, and nowhere else in full. The investment thesis uses three long-form grades for material claims:

- **[Measured]**: demonstrated on operational hardware, published data, or executed transactions.
- **[Validated precedent]**: established by a third party in a comparable regime.
- **[Projection—gated]**: contingent on a named risk-retirement gate, tied to the tranche that gate releases.

The design reviews use the compact equivalents **[meas]**, **[pub]**, and **[alloc]**; the network review additionally uses **[model]** for simulation output. **Proposed** marks a target structure, relationship or instrument rather than evidence that it exists. The memo and booklet inherit the grade of the governing thesis or design-review claim even when the shorter surface does not print the tag. A projection is not evidence that its gate has been passed.

Auxiliary tags follow the same logic:

- **[Strategic framing]**: a mission-level framing claim rather than an evidence claim.
- **[Estimated—…]**: an analyst estimate whose basis is named in the tag.
- **[Modelled—…]**: a computed result on declared assumptions, named in the tag.
- **[Derived—…]**: arithmetic recomputable from the named appendix.
- **[Open]**: not yet established in either direction.
- **[order-of-magnitude]**: a scale claim rather than a point estimate.
- **[model-approx]**: a simplified model calculation, flagged where used.

The falsifier register (F1–F31) dates the observation that would break each material claim. Appendix K holds the register of adversarial findings and the engineering response to each.

The valuation model ships runnable: `sim/econ_model.py` reproduces the printed Section IX table, and an advisor is invited to overturn it on their own priors.

# Canonical Programme Sequence

T0 is complete. T1 is one licensing-backed $30M tranche funded at close; its internal checkpoints are programme controls and carry no investor draws. The kilometre-scale perpetual-flight article is G1a, an internal sub-gate. T1 releases T2 only after G1: a binding HAPS slot, qualified relay payload, commercial 10–30 kW fibre transmitter, and the quantified efficiency and safety floors in the Blueprint's gate register cleared at full altitude. Corridor hardening — the 24-hour continuous lock, the repeat campaign and the independent witness pack — discharges at G2. T2 then buys the first operating fibre corridor. PCSEL P0/P1 runs beside T2 as a migration option; the fibre corridor proceeds without it.

The governed first-install equipment margin and fleet replacement/expansion capex are priced by default in `sim/econ_model.py`. The central hull curve moves from $2M at ten-unit orders to a $0.5M floor at 30,000-unit fleet-class production; `--stress flat-hull-cost` holds $2M through the horizon. `--core-only` removes the equipment-margin stream and leaves fleet capex priced. The default hostile run (20,000 paths, seed 7) reproduces:

| Output | Value |
|---|---|
| P(NPV>0) | 18.5% |
| NPV P10 / P50 / P90 | −$0.23B / −$0.03B / +$1.59B |
| Median loss-given-failure | $31M |
| Mean net-cash multiple on capital drawn, undiscounted | 3.09× |
| Discounted path multiple at 15% | 0.89× mean / 0.58× median |
| All-pass IRR P10 / P50 / P90 | ~27% / 31% / 35% |

# The Pre-NDA Booklet

The booklet is the pre-NDA surface. It omits the valuation outputs, the unit-economics tariffs, the gate probabilities, the sponsor capital mechanics, and all counterparty matter.

Every booklet claim survives intact in these volumes: deepened, priced and given its falsifier.

- [[booklet-pre-nda|Lightway: Pre-NDA Briefing]]
- [[evaluator-guide|Evaluator Guide]]
- [[executive-memo|Executive Memo]]
- [[investment-thesis|The Aquila Energy Thesis]]
- [[engineering-blueprint|Lightway Engineering Blueprint]]
- [[design-pcsel-array|Design Review — PCSEL Array]]
- [[design-haps-relay|Design Review — HAPS Relay]]
- [[design-receiver-thermal|Design Review — Receiver Thermal]]
- [[design-network-operations|Design Review — Network Operations]]
- [[reference-v1.0-architecture|Reference — v1.0 Architecture (superseded)]]

## Document state — 16 July 2026

The current Era II corridor basis is 22 fixed articles across 16 sites. Per article: 788.055 kW hardware ceiling, 541.465 kW planning output, 487.318 kW contracted output. Corridor totals are 17.337 MW / 11.912 MW / 10.721 MW on those three bases, against 8.549 MW day-one load. The N-1 ingress estate is 3 stations × 9 panels = 27 panels / 51.3 MW nominal optical installed; the surviving pair is dispatch-capped at 31.8 MW optical / 3.509 = 9.0624 MW delivered. Initial corridor capital is $76.0286M, of which $62.5286M is operator capital. The five capacity bases, the rule for naming each, and the corridor worked end to end live in the Engineering Blueprint's sanction basis.

The documents listed above are the package. Working finding registers from earlier review cycles are retired; their adopted corrections live in the canonical sources.
