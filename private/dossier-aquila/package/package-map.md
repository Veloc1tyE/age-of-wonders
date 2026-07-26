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

The documents check each other in one direction.

Design reviews test the blueprint's subsystem allocations. The blueprint carries the thesis's engineering claims. The thesis prices what the blueprint specifies. The memo distils the thesis. The booklet excerpts the public-facing case. The Evaluator Guide routes the questions.

When a subsystem number is questioned, start with the matching design-review verdict register, then follow its correction or model pointer to the current authority. Corridor economics rebuild from `sim/corridor_model.py`, the valuation from `sim/econ_model.py`.

No claim in the memo or booklet is stronger than the design-review verdict or model authority behind it.

## The framing spine

Seven statements hold across every document. Where a document disagrees, the document is wrong.

**The product is reliable, productive-use power.** Three-phase, surge-tolerant and available, on a two-part tariff: capacity carries the fixed capital and the availability obligation, energy carries source energy and variable cost. Delivered volume is revenue.

**The architecture is graduated.** On-site solar and batteries carry bulk household energy and smooth load. Lightway carries productive-use power beneath them. Diesel remains as emergency backup, demoted from primary supply.

**The mission targets the productive segment.** The Modern Energy Minimum is 1,000 kWh per person per year for a billion people — 250 household, 750 in the economy around it. That 750 is the segment Lightway sells into, and the share it reaches is a band, not a point. No document describes the combination as meeting the full standard.

**Source energy is a declared price curve.** Chain efficiency is the amplifier converting input price into delivered cost. Surplus at the generator is rising in every major market measured, held there by grid congestion and connection-queue backlog. The firm half of the blend is the contested half.

**The honesty spine reads the same everywhere.** F18's joint-blockage cap is breached at the real 55-minute buffer limit, at 8.78 to 10.75 off-station events a corridor-year against a cap of two, or 7.13 with the wing-solar hold. The corridor P&L carries the response at $1.91M a year, 20.9% of EBITDA, with the $3.92M simulated reading held as a stress. The seven-hour figure is the unpowered glide window, a different quantity. The Era III 0.55 conversion cell is undemonstrated, and so is the ≥99.95% per-surface coating class, published to 34 cm against a metre-class aperture. Recovery multiples read as total realised value, with interim operating cash disclosed beside them. The relay station-keeping tap is metered as a corridor line and carries no charge against gate throughput.

**The operator does not return its capital.** Its flat-flow IRR is −0.77% over fifteen years with no terminal value, and 3.80% over twenty-five. The 8.09% concessional blend is a first-year yield, and it does not stand in for a return across the horizon. Concession value, growth and the sovereign rationale carry the case for holding that vehicle.

**T1 buys measurement, not a return.** It funds at close against a licence into a ring-fenced sovereign entity, and what it buys is the evidence the later tranches are underwritten against.

# Claim Grades

The thesis uses three long-form grades:

- **[Measured]**: demonstrated on operational hardware, published data, or executed transactions.
- **[Validated precedent]**: established by a third party in a comparable regime.
- **[Projection—gated]**: contingent on a named risk-retirement gate, tied to the tranche that gate releases.

The design reviews use the compact equivalents **[meas]**, **[pub]** and **[alloc]**; the network review adds **[model]** for simulation output. **Proposed** marks a target structure rather than evidence that it exists. The memo and booklet inherit the grade of the governing claim even where the tag is not printed. A projection is not evidence that its gate has been passed.

Auxiliary tags:

- **[Strategic framing]**: a mission-level claim rather than an evidence claim.
- **[Estimated—…]**: an analyst estimate, basis named in the tag.
- **[Modelled—…]**: a computed result on declared assumptions.
- **[Derived—…]**: arithmetic recomputable from the named appendix.
- **[Open]**: not yet established in either direction.
- **[order-of-magnitude]**: a scale claim rather than a point estimate.
- **[model-approx]**: a simplified model calculation.

The falsifier register dates the observation that would break each material claim. Appendix K holds the adversarial findings with the engineering response.

# Canonical Programme Sequence

T0 is complete. T1 is one licensing-backed $30M tranche funded at close. Its internal checkpoints carry no investor draws, and the kilometre-scale perpetual-flight article is G1a, an internal sub-gate. T1 releases T2 only after G1: a binding HAPS slot, qualified relay payload, commercial 10–30 kW fibre transmitter, and the Blueprint's efficiency and safety floors cleared at full altitude. Corridor hardening — the 24-hour continuous lock, the repeat campaign, the independent witness pack — discharges at G2. T2 buys the first operating fibre corridor. PCSEL P0/P1 runs beside T2 as a migration option.

The hull curve moves from $2M at ten-unit orders to a $0.5M floor at 30,000-unit production, and `--stress flat-hull-cost` holds $2M through the horizon. The default hostile run of `sim/econ_model.py` (20,000 paths, seed 7) reproduces:

| Output | Value |
|---|---|
| P(NPV>0) | 18.3% |
| NPV P10 / P50 / P90 | −$0.20B / −$0.02B / +$1.28B |
| Median loss-given-failure | $27M |
| Mean net-cash multiple on capital drawn, undiscounted | 2.95× |
| Discounted path multiple at 15% | 0.87× mean / 0.53× median |

`--interim-cash` prints the delta block: mean multiple 2.95× to 3.25×, discounted mean 0.87× to 1.11×.

The IRR of record is the entry-point column in Appendix B-2.2 and C.4: 39.3%, 41.6%, 48.1% and 66.9% at T1 to T4, rebuilt by `sim/irr_update.py`. No success-path IRR is published: the back-loaded final tranche gives every all-pass path more than one sign change.

# The Pre-NDA Booklet

The booklet is the pre-NDA surface. It omits the valuation outputs, the unit-economics tariffs, the gate probabilities, the sponsor capital mechanics, and all counterparty matter. Every booklet claim survives intact in these volumes: deepened, priced and given its falsifier.

- [[booklet-pre-nda|Lightway: Pre-NDA Briefing]]
- [[evaluator-guide|Evaluator Guide]]
- [[revision-history|Revision History]]
- [[executive-memo|Executive Memo]]
- [[investment-thesis|The Aquila Energy Thesis]]
- [[engineering-blueprint|Lightway Engineering Blueprint]]
- [[design-pcsel-array|Design Review — PCSEL Array]]
- [[design-haps-relay|Design Review — HAPS Relay]]
- [[design-receiver-thermal|Design Review — Receiver Thermal]]
- [[design-network-operations|Design Review — Network Operations]]
- [[reference-v1.0-architecture|Reference — v1.0 Architecture (superseded)]]

## Document state — 26 July 2026

| Basis | Value |
|---|---|
| Era II corridor | 30 fixed articles across 20 sites |
| Per article — hardware ceiling / planning / contracted | 632.072 kW / 530.628 kW / 477.565 kW |
| Corridor total on those three bases | 18.962 MW / 15.919 MW / 14.327 MW |
| Day-one load | 12.548 MW |
| LW-1.6 relay availability, Era II | ≥97% per relay |
| Era II chain, at 0.97 rather than 0.98 | 3.581 optical watts per delivered watt |
| N-1 ingress estate | 3 stations × 10 panels = 30 panels / 57.0 MW nominal optical installed |
| Surviving pair, dispatch-capped | 35.333 MW optical / 3.581 = 9.87 MW delivered |
| Mean-basis envelope utilisation | 91.4%, inside LW-1.10's ≤95% requirement |
| Initial corridor capital | $86.386M, of which $72.886M operator capital |
| Reference corridor input | $10.00/MWh blended, half purchased firm |
| Chain amplification to the bus | 6.07× at Era II, 4.30× at Era III, on 16.477% and 23.256% end to end |
| Corridor revenue / EBITDA, with the F18 response booked | $19.398M / $9.133M a year |
| Operator yield, unlevered / 30% concessional | 6.27% / 8.09% |
| Operator flat-flow IRR, 15 / 25 years, no terminal value | −0.77% / 3.80% |
| Community tariffs, restated | $0.32 feeder head, $0.28 greenfield |
| ≥8% concessional-blend hurdle fails at | $10.22/MWh corridor, $14.65/MWh isolated utility, $30.09/MWh 2050 mission line |

The five capacity bases and the corridor worked end to end live in the Blueprint's sanction basis. Working finding registers from earlier review cycles are retired. Their adopted corrections live in the canonical sources.

The corridor threshold binds first, at 1.02× headroom. It is the falsifier of record.
