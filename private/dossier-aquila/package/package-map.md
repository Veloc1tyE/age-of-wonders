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

Start with `package/evaluator-guide.md`. It states the decision, the US$30M closing conditions, the verified engineering/economic picture and the shortest evidence route for each investment-committee question. It is a navigation layer, not a new authority: every material claim points to the governing thesis, blueprint, review, model or source register.

The site home page carries the same decision surface. The document hierarchy is deliberate:

1. **Decide whether to proceed:** Evaluator Guide → Executive Memo.
2. **Test the governing case:** Investment Thesis §§I–XIII.
3. **Reproduce and falsify:** Thesis Appendices + executable model.
4. **Inspect subsystem evidence:** Engineering Blueprint + four design reviews.

An evaluator should not read the verification volumes linearly. Start with the decision question, follow the direct route to its authority, then stop when confidence is sufficient.

The documents check each other in one direction.

The design reviews test the blueprint's subsystem allocations. The blueprint carries the thesis's engineering claims. The thesis prices what the blueprint specifies. The memo distils the thesis. The booklet excerpts the public-facing case.

**When a subsystem number is questioned, start with the matching design-review verdict register, then follow any explicit correction or executable-model pointer to the current authority.** The corridor economics rebuild from `sim/corridor_model.py`; the programme valuation rebuilds from `sim/econ_model.py`.

No downstream engineering claim in the memo or booklet is stronger than the governing design-review verdict or the correction/model authority that verdict points to.

# Claim Grades

The investment thesis uses three long-form grades for material claims:

- **[Measured]**: demonstrated on operational hardware, published data, or executed transactions.
- **[Validated precedent]**: established by a third party in a comparable regime.
- **[Projection—gated]**: contingent on a named risk-retirement gate, tied to the tranche that gate releases.

The design reviews use the compact equivalents **[meas]**, **[pub]**, and **[alloc]**; the network review additionally uses **[model]** for simulation output. The memo and booklet inherit the grade of the governing thesis or design-review claim even when the shorter surface does not print the tag. A projection is not evidence that its gate has been passed.

The falsifier register (F1–F31) dates the observation that would break each material claim. Appendix K holds the register of adversarial findings and the engineering response to each.

The valuation model ships runnable: `sim/econ_model.py` reproduces the printed Section IX table, and an advisor is invited to overturn it on their own priors rather than take ours.

# Canonical Programme Sequence

T0 is complete. T1 is one licensing-backed $30M tranche funded at close; its internal checkpoints are programme controls, not investor draws. It does **not** headline the kilometre-scale perpetual-flight article; that is G1a, an internal sub-gate. T1 releases T2 only after G1: a binding HAPS slot, qualified relay payload, commercial 10–30 kW fibre transmitter, repeatable full-diurnal ground→stratosphere→ground operation at 18–22 km, accepted safety case and independent evidence pack. T2 then buys the first operating fibre corridor. PCSEL P0/P1 runs beside T2 as a migration option and cannot hold the fibre corridor hostage.

The governed first-install equipment margin is priced by default in `sim/econ_model.py`. `--core-only` is the disclosed energy-and-service comparator. The default hostile 20,000-path, seed-7 table is 18.5% P(NPV>0), −$0.23B / −$0.03B / +$3.82B P10/P50/P90, $31M median loss-given-failure, 4.99× mean multiple on capital drawn and 35.4% / 38.6% / 41.7% success-branch IRR.

# The Pre-NDA Booklet

The booklet is the pre-NDA surface. It omits, by design: the valuation outputs, the unit-economics tariffs, the gate probabilities, the sponsor capital mechanics, and all counterparty matter.

A reader moving from the booklet to these volumes will find no claim revised, only claims deepened, priced, and given their falsifiers.

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
- [[SWF-EVALUATOR-BRIEF|SWF Evaluator Brief — context map for sovereign wealth fund evaluators]]

## Document state — 16 July 2026

The current Era II corridor basis is **22 fixed articles across 16 sites**. Per article: **788.055 kW hardware ceiling, 541.465 kW planning output, and 487.318 kW contracted output**. Corridor totals are **17.337 MW / 11.912 MW / 10.721 MW** on those three bases, against **8.549 MW day-one load**. The N-1 ingress estate is **3 stations × 9 panels = 27 panels / 51.3 MW nominal optical installed**; the surviving pair is dispatch-capped at **31.8 MW optical / 3.509 = 9.0624 MW delivered**. Initial corridor capital is **$76.0286M**, of which **$62.5286M** is operator capital. Never use the word *nameplate* without naming which of the hardware, planning, contracted, installed-ingress or N-1-dispatch bases is intended.

The SWF Evaluator Brief is a non-authoritative context map. It should be treated as an evaluation aide, not a source document; every factual statement in it inherits its authority from the dossier or named brain record it points to.

The Architecture Sweep, Coherence Sweep, and Citation Audit are finding registers, not live authorities. Their dated `Current` and `Replace with` blocks preserve the state reviewed at the time. Use their latest verification addenda to determine what remains open.
