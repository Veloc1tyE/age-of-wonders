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

Eight statements hold across every document. Where a document disagrees, the document is wrong.

**Our mission is to deliver energy abundance to billions of people by providing reliable, industrial power to remote communities.**

**Lightway delivers productive power where conventional grids cannot economically reach.** It transmits power through the sky with stratospheric relays. Household solar creates the first electrical infrastructure and demand for firm, round-the-clock power. Lightway is the industrial complement that connects that emerging local system to firm industrial supply.

**The customer buys firm metered energy. The grid authority dispatches. Aquila earns $50/MWh delivered at the customer bus.** At fleet scale, each stratospheric relay pays itself back in under one year and returns $3.09 million after replacement cost over its seven-year life.

**The architecture is graduated.** On-site solar and batteries carry bulk household energy and smooth load. Local industrial power systems or diesel supply remote productive loads today. Lightway carries centrally dispatched productive-use power, with diesel retained as emergency backup.

**Lightway completes the system.** Generation is getting cheaper while transmission is not. The energy transition is manufacturing generation and electrifying the edge faster than civil-engineered networks can connect them.

**The headline is: Delivering energy abundance to billions of people.** Reaching the Modern Energy Minimum is the first objective. Demand is contracted corridor by corridor.

**The unit is one stratospheric vehicle.** At a fixed $50/MWh delivered fee, the conservative $2 million hull repays in 3.9 years, the approximately 100-unit cost case in 2.6 years, and the fleet-scale floor in under one year.

**The customer buys firm service; the authority runs the merit order.** The authority dispatches and Aquila routes. Contract-allocated surplus runs first, firm grid energy runs while cheaper than destination diesel, receiver storage bridges transitions and local diesel carries the refusal tail. The first corridor is screened at a $15/MWh net annual source book and paid firm ingress near $50/MWh; it does not prescribe a source mix. Four-quarter nodal replay and separate operator-solvency and project-return tests decide whether replication closes.

**The honesty spine reads the same everywhere.** F18's joint-blockage cap is breached at the real 55-minute buffer limit, at 8.78 to 10.75 off-station events a corridor-year against a cap of two, or 7.13 with the wing-solar hold. The corridor P&L carries the response at $1.91M a year, 20.9% of EBITDA, with the $3.92M simulated reading held as a stress. The seven-hour figure is the unpowered glide window, a different quantity. The Era III 0.55 conversion cell is undemonstrated, and so is the ≥99.95% per-surface coating class, published to 34 cm against a metre-class aperture. Recovery multiples read as total realised value, with interim operating cash disclosed beside them. The relay station-keeping tap is metered as a corridor line and carries no charge against gate throughput.

**The reference operator does not return its capital on flat flows.** Its IRR is −0.91% over fifteen years with no terminal value, and 3.69% over twenty-five. The 7.99% concessional blend is a first-year yield, and it does not stand in for a return across the horizon. Growth, greater concession, tariff headroom or explicit avoided-network and public-service value must carry the gap.

**T1 buys measurement, not a return.** It funds at close against a licence into a ring-fenced sovereign entity, and what it buys is the evidence the later tranches are underwritten against. Early corridors may carry a disclosed capped loss; the late-2030s replication network owns the commercial claim.

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

T0 is complete. The $30M T1 close is expected in 2027. T1 is one licensing-backed tranche funded at close. Its internal checkpoints carry no investor draws, and the kilometre-scale perpetual-flight article is G1a, an internal sub-gate. T1 releases T2 only after G1: a binding HAPS slot, qualified relay payload, commercial 10–30 kW fibre transmitter, and the Blueprint's efficiency and safety floors cleared at full altitude. Corridor hardening — the 24-hour continuous lock, the repeat campaign, the independent witness pack — discharges at G2. T2 buys the first operating fibre corridor. PCSEL P0/P1 runs beside T2 as a migration option.

The programme waypoint is 150 TWh/year delivered in 2041. The mission endpoint remains 2050. The schedule rebase delays the first close and intermediate gates by about one year, then requires faster replication between 2041 and 2050; the financial outputs below are recomputed on that schedule.

The hull curve moves from $2M at ten-unit orders to a $0.5M floor at 30,000-unit production, and `--stress flat-hull-cost` holds $2M through the horizon. The default hostile run of `sim/econ_model.py` (20,000 paths, seed 7) reproduces:

| Output | Value |
|---|---|
| P(NPV>0) | 18.3% |
| NPV P10 / P50 / P90 | −$0.20B / −$0.02B / +$1.97B |
| Median loss-given-failure | $27M |
| Expected NPV / expected capital | +$0.261B / $0.573B |
| Mean net-cash multiple on capital drawn, undiscounted | 3.43× |
| Discounted path multiple at 15% | 1.01× mean / 0.53× median |

`--interim-cash` prints the alternative wind-down convention; the conservative default treats recovery multiples as total realised value.

The IRR of record is the core entry-point column in Appendix B-2.2 and C.4: 45.0%, 48.0%, 56.2% and 80.8% at T1 to T4, rebuilt by `sim/irr_update.py`. Including the governed equipment stream gives 49.5%, 53.9%, 67.5% and 115.3%. No success-path IRR is published: the back-loaded final tranche gives every all-pass path more than one sign change.

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

## Document state — 27 July 2026

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
| Initial corridor capital | $76.998M, of which $63.498M operator capital |
| Reference underwriting input | $15.00/MWh net annual source book; paid firm intervals capped near $50/MWh or the diesel crossover |
| Aquila network fee | $50/MWh delivered at the customer bus; authority-directed economic curtailment against annual quantity is deemed delivered; $3.079M/yr at reference billed volume |
| Firm-service closure | The $15/MWh source book produces $7.012M network EBITDA; the authority contract and four-quarter nodal replay must reproduce it |
| Merit-order crossover | $50/MWh firm ingress delivers an energy component of $0.319/kWh; $0.55/kWh diesel becomes cheaper above $86.09/MWh ingress |
| Reference dispatch evidence | 422.8 GWh/yr ingress replayed chronologically; realised surplus, firm and diesel shares are outputs |
| Chain amplification to the bus | 6.07× at Era II, 4.30× at Era III, on 16.477% and 23.256% end to end |
| Corridor revenue / network EBITDA, with the F18 response booked | $19.398M / $7.012M a year |
| Aquila / operator annual allocation | $3.079M fixed fee / $3.933M residual |
| Aquila yield / operator yield, unlevered / operator 30% concessional | 22.81% / 6.19% / 7.99% |
| Operator flat-flow IRR, 15 / 25 years, no terminal value | −0.91% / 3.69% |
| Community tariffs | $0.32 feeder head, $0.28 greenfield |
| ≥8% concessional-blend hurdle fails at | $14.99/MWh corridor; $17.47/MWh isolated utility |
| Mature delivered-cost boundary | ~$0.235/kWh delivered firm-service cost at the customer bus through a $30/MWh net source book, including the $50/MWh Aquila fee but before operator capital return |

The five capacity bases and the corridor worked end to end live in the Blueprint's sanction basis.

The first-corridor source book is effectively on its 8% operator-hurdle boundary. Chronological source closure, operator solvency and operator capital return are separate gates.
