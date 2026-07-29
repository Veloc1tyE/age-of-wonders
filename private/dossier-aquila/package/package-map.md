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
revision: "29 July 2026"
---

# Verification Chain

The documents check each other in one direction.

Design reviews test the blueprint's subsystem allocations. The blueprint carries the thesis's engineering claims. The thesis prices what the blueprint specifies. The memo distils the thesis. The booklet excerpts the public-facing case. The Evaluator Guide routes the questions.

When a subsystem number is questioned, start with its design-review verdict register. Follow the evidence or model pointer to the governing source. Era II operating screens reproduce from `sim/corridor_model.py`; the Era III operator hurdle reproduces from `sim/cost_curve_scenarios.py`; valuation reproduces from `sim/econ_model.py`.

No claim in the memo or booklet is stronger than the design-review verdict or model authority behind it.

## The framing spine

These statements hold across every current document.

**Aquila's mission is to deliver energy abundance to billions of people by making industrial power available everywhere.**

**Lightway moves electricity without a power line.** A ground station turns electricity into light, aircraft pass it across the sky, and a receiver turns it back into electricity.

**The customer buys reliable, metered power.** Aquila earns $50 for each megawatt-hour delivered through the network.

**A link is one complete path to one customer.** One aircraft serves the short proof route. The 100–300 kilometre Era II demonstration uses two active aircraft. Era III uses the same two-aircraft geometry across roughly 100–500 kilometres, with 300–500 kilometres as the reference case. Longer routes add aircraft.

**Era II proves; Era III pays.** Era II is an evidence tier, not the commercial unit. The Era III reference link delivers 4.682 MW, earns $2.051M a year and uses two active aircraft plus one relief. Its assigned fleet repays in 76.1 weeks gross and returns 26.0% after modelled fleet costs, before the regional spare pool.

**Distance adds aircraft, not another fee.** Aquila is paid once for the complete delivered link. Longer routes remain viable only while the same fee covers the larger fleet and added optical loss.

**Era II ground projects are demonstrations.** Commercial project companies begin with Era III and clear their route-specific target return before sanction. The commercial aircraft economics also begin with Era III.

**T1 buys one measurement.** The $30M tranche proves the complete path at full altitude. Aquila fundraises for later tranches only after the preceding gate is discharged.

**The commercial buildout requires debt after G4.** T1–T4 fund the $1.11B proof programme. With programme expenditure funded separately and operating cash retained, the success path needs a warehouse draw of approximately $7.73B at the 10 per cent screen, peaking in 2041 at 35.2% of in-service fleet cost and repaid in 2044. Fees, advance rates, reserves and covenants remain G4 underwriting outputs.

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

T0 is complete. The $30M T1 close is expected in 2027. T1 is one tranche intended to be licensing-backed and funded at close. Its internal checkpoints carry no investor draws, and the kilometre-scale perpetual-flight article is G1a, an internal sub-gate. T1 releases T2 only after G1: a binding HAPS slot, qualified relay payload, commercial 10–30 kW fibre transmitter, and the Blueprint's efficiency and safety floors cleared at full altitude. Corridor hardening—the 24-hour continuous lock, the repeat campaign, the independent witness pack—discharges at G2. T2 buys the first continuously operated fibre link while PCSEL P0/P1 runs as a first-class programme. T3 buys one complete 1.9 MW Era II link and full link qualification. T4 buys one complete 13.3 MW Era III reference link, certification and a contract to deploy at scale.

Pre-G4 volume remains evidence-scale: 0.005 / 0.025 / 0.100 / 1.0 TWh in 2031 / 2033 / 2035 / 2037. Commercial replication begins only after G4, reaching 25 TWh in 2039, 300 TWh in 2041, the one-billion-person waypoint of 366.26 TWh in 2042, and 1,391.79 TWh in 2050, equivalent to Lightway's modelled contribution across 3.8 billion people. The financial outputs below are recomputed on that schedule.

The hull curve moves from $2M at ten-unit proof orders to a $0.5M floor at 30,000-unit production. Every commercial forecast applies fleet learning. Era III separately carries a $1M high-power-aircraft floor. The default hostile run of `sim/econ_model.py` (20,000 paths, seed 7) reproduces:

The governed success path returns 38.1% through 2055 with no terminal value and a 19.80× PV multiple at 15%. Mature delivered-energy cash ROIC is 26.0%, 28.7% including the equipment stream and 28.4% with net programme capital in the denominator. The equipment stream is included by default. The hostile run below tests the probability and quality of reaching that commercial state; it is not the mature-link return.

| Output | Value |
|---|---|
| P(NPV>0) | 14.4% |
| NPV P10 / P50 / P90 | −$0.14B / −$0.02B / +$0.02B |
| Median loss-given-failure | $25M |
| Expected NPV / expected programme spend | +$0.1064B / $0.307B |
| Expected NPV per dollar of programme spend | +0.3464 |
| Mean net-cash multiple on programme spend, undiscounted | 7.78× |
| Discounted path multiple at 15% | 0.96× mean / 0.48× median |

Expected NPV is capital-weighted across the simulation; the path multiple is the simple mean of each path's own ratio. Early failures draw much less capital, so positive expected NPV can coexist with a mean path multiple below 1×.

`--interim-cash` prints the alternative wind-down convention; the conservative default treats recovery multiples as total realised value.

Appendix B-2.2 states T1's explicit terms: **$80M minimum acceptable pre-money, $30M funded at close, $110M post-money and 27.3% issued ownership**. Hostile gate weighting produces **$822M** of programme value. The intended T1–T4 pre-money ladder is **$80M / $526M / $2.236B / $10.138B**, producing expected investor IRRs of **35.3% / 25.0% / 22.5% / 20.0%**. Without following on, the T1 investor dilutes to **19.8%** and its expected stake value is **$192M at the 15% valuation hurdle**.

# The Pre-NDA Booklet

The booklet is the pre-NDA surface. It states Aquila's fixed fee and the reference link's annual revenue, while omitting valuation outputs, operator underwriting, gate probabilities, sponsor capital mechanics and all counterparty matter. Every booklet claim survives intact in these volumes: deepened, priced and given its falsifier.

- [[booklet-pre-nda|Lightway: Pre-NDA Briefing]]
- [[evaluator-guide|Evaluator Guide]]
- [[revision-history|Revision History]]
- [[executive-memo|Executive Memo]]
- [[investment-thesis|The Aquila Energy Thesis]]
- [[engineering-blueprint|Lightway Engineering Blueprint]]
- [[design-pcsel-array|Design Review—PCSEL Array]]
- [[design-haps-relay|Design Review—HAPS Relay]]
- [[design-receiver-thermal|Design Review—Receiver Thermal]]
- [[design-network-operations|Design Review—Network Operations]]

## Document state—29 July 2026

| Basis | Value |
|---|---|
| Era II status | Demonstration tier; no aggregate corridor fleet underwriting |
| Per two-aircraft Era II article—hardware ceiling / planning / contracted | 536.039 kW / 445.266 kW / 400.739 kW |
| Corridor total on those three bases | 16.081 MW / 13.358 MW / 12.022 MW |
| Day-one load | 12.548 MW |
| LW-1.6 relay availability, Era II | ≥97% per relay |
| Era II propulsion-inclusive planning chain | 4.267 optical watts per delivered planning watt |
| N-1 ingress estate | 3 stations × 12 panels = 36 panels / 68.4 MW nominal optical installed |
| Surviving pair, dispatch-capped | 42.400 MW optical / 4.267 = 9.94 MW delivered |
| Mean-basis envelope utilisation | 90.7%, inside LW-1.10's ≤95% requirement |
| Aquila network fee | $50/MWh delivered at the customer bus; revenue counted once per end-to-end link |
| Chain amplification to the bus | 7.23× at Era II, 4.43× at Era III, on 13.827% and 22.575% end to end |
| Era III reference link | 4.682 MW contracted; two active / three assigned $1M aircraft across 300–500 km; $2.051M/yr; 50.7-week active-pair / 76.1-week assigned-fleet gross payback; 26.0% complete fleet ROIC |
| Longer Era III routes | Three active / four assigned: 600–1,000 km, 12.5% ROIC; four / five: 900–1,500 km, 4.5%; five / six: 1,200–2,000 km, −0.9%; six / seven: 1,500–2,500 km, −4.7% |
| Mission ramp / fleet | 300 TWh in 2041; 366.26 TWh / 1B people in 2042; 1,391.79 TWh / 3.8B in 2050; ~33,900 links / 67,900 active / 101,800 assigned aircraft before regional pool |
| Mature Era III ground-stack economics | $9.18–12.13M capital per 4.682 MW contracted link; aircraft separate |
| Mature Era III operator reference screen | At a $0.21/kWh customer bid, the project company is priced to an 8% 15-year return; actual routes clear case by case |
| Mature Era III maximum net source book | $26.32–28.70/MWh at the reference bid and current ground-capital band; varies with tariff, hardware learning and route costs |

The Era III link and operator screen reproduce from the thesis models. Era II operating models remain demonstration and safety evidence.

Chronological source closure, operator solvency and operator capital return are tested separately. Commercial operator economics use the Era III link.
