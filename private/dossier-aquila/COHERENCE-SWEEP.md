---
uid: note_178dfa0b3ba5
---

# Package coherence sweep — 15 July 2026 (finding register; basis updated 16 July 2026)

**206 findings in the 15 July pass.** Every BLOCKER was adversarially re-verified before it entered this register. The detailed `Current` and `Replace with` blocks preserve the source state reviewed on that date; they are not live assertions. The latest basis and closure state are in the addendum at the end.


## BLOCKER

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-network-operations.md:426  ·  stale-architecture
**Current:** Anchor-weighted, 91% contract-grade revenue, 13.0 MW installed nameplate, ~9.6 MW day-one load [alloc: blueprint §10A].
**Why:** Every number in this line is the superseded corridor, and it is sourced to "[alloc: blueprint §10A]", which now says 11.9 MW and 8.55 MW. The model gives 71 per cent contract-grade, 11.9 MW nameplate, 8.55 MW day-one load. The design reviews exist to *verify* the thesis, so a mismatch here is not a typo — it reads as an unreconciled model, and it is the exact place a diligence team looks to confirm the corridor is real.
**Replace with:** Anchor-weighted, 71% contract-grade revenue, 11.9 MW installed nameplate, ~8.55 MW day-one load [alloc: blueprint §10A].

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:470  ·  model-mismatch
**Current:** - a telecom tower-cluster portfolio of 2.0 MW aggregate across ~6 cluster sites, contracted energy-service-company grade at $0.35/kWh;
**Why:** CONFIRMED. The quoted text is present verbatim at line 470 (§10A.1 corridor definition). Sixty lines later, the §10A.4 corridor P&L prices the identical stream at $0.30/kWh (14.0 GWh × $0.30 = $4.2M), and sim/corridor_model.py carries tariff_tower=0.30 as the default in reference_corridor(). Running `python3 corridor_model.py --show` reproduces every published figure at that value: 17/17 PASS, including corridor revenue $13.358M, EBITDA $7.706M, operator 7.6% unlevered / 10.2% blended, Aquila 28.5%. At $0.35 the tower stream is $4.90M, revenue becomes ~$14.06M and EBITDA ~$8.41M — breaking the
**Replace with:** - a telecom tower-cluster portfolio of 2.0 MW aggregate across ~6 cluster sites, contracted energy-service-company grade at $0.30/kWh;

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:503  ·  number-inconsistency
**Current:** The corridor's 13.0 MW installed receiver nameplate (24 articles of 541 kW) is therefore served firm at ~7.3 MW on the planning basis
**Why:** §10A.1 line 477 of the same document states "Installed receiver nameplate: 11.9 MW across 22 articles of 541 kW" and enumerates them (6+6+6+4 = 22). corridor_model.py agrees: 22 articles, 11.9 MW. 13.0 MW / 24 articles is the pre-repricing corridor and survives here, inside the link budget that the whole Era II sizing case rests on. Two different nameplates in one section.
**Replace with:** The corridor's 11.9 MW installed receiver nameplate (22 articles of 541 kW) is therefore served firm at ~7.3 MW on the planning basis

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:503  ·  stale-architecture
**Current:** The corridor's 13.0 MW installed receiver nameplate (24 articles of 541 kW) is therefore served firm at ~7.3 MW on the planning basis
**Why:** CONFIRMED. The quoted text is present verbatim at line 503. `corridor_model.py --show` builds the reference corridor as 6 tower clusters × 1 article + 3 mining anchors × 2 + 3 feeder-heads × 2 + 4 greenfield × 1 = 22 articles, nameplate 3.25 + 3.25 + 3.25 + 2.17 = 11.92 MW; all 17 printed figures PASS against the document. §10A.1 (line 477) states the same: '**Installed receiver nameplate: 11.9 MW** across **22 articles** of 541 kW'. Line 503 is the superseded 24-article / 13.0 MW corridor surviving into the repriced appendix — two paragraphs after the correct figure, in the same appendix a so
**Replace with:** The corridor's 11.9 MW installed receiver nameplate (22 articles of 541 kW) is therefore served firm at ~7.3 MW on the planning basis

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:515  ·  number-inconsistency
**Current:** | Receiver articles (24 × 541 kW, all fully populated at commissioning) | 17 sites |—| $9.1M |
| Conversion stacks: modular community (8 × 200 kW) + anchor | initial build |—| $6.5M initial |
| Corridor ground infrastructure, NOC share, deployment |—|—| $5M |
| **Total corridor capital, initial** | | | **~$64.5M** |
**Why:** CONFIRMED BLOCKER. The §10A.3 capital table does not sum to its own total: $25.5M + $12M + $9.1M + $6.5M + $5M = $58.1M against a printed ~$64.5M — a $6.4M hole in the denominator of every IRR in the package. corridor_model.py (--show PASSes at $64.482M) builds the number from lumpy GS BOS $12.7M + panels $12.8M (together the $25.5M ground-station line) + fleet $12.0M + infra $5.0M + site capex $21.98M, where site capex = aperture $8.40M + conversion/BOS $8.06M + site fixed layer F ($0.30M × 16 sites = $4.80M) + prepaid metering ($0.24M × 3 brownfield sites = $0.72M). The table lists neither t
**Replace with:** | Receiver articles — aperture layer (22 × 541 kW, all fully populated at commissioning; $0.70/W of aperture, $0.71/W at anchor sites) | 16 sites |—| $8.4M |
| Conversion stacks — battery, inverters, switchgear, EPC, sized to metered demand ($1.20/W; $0.40/W where the mine owns its own distribution) | 16 sites |—| $8.1M |
| Site fixed layer (F = $0.30M per site: interlock, surveillance, safety PLC, SCADA, plinth, aperture housing, tracking mount, grid tie, consent, mobilisation) | 16 | $0.30M | $4.8M |
| Prepaid metering (brownfield feeder-head sites, ~4,000 connections each) | 3 | $0.24M | $0

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:518  ·  number-inconsistency
**Current:** | Receiver articles (24 × 541 kW, all fully populated at commissioning) | 17 sites |—| $9.1M |
| Conversion stacks: modular community (8 × 200 kW) + anchor | initial build |—| $6.5M initial |
| Corridor ground infrastructure, NOC share, deployment |—|—| $5M |
| **Total corridor capital, initial** | | | **~$64.5M** |
**Why:** The capital stack does not add up to its own total: $25.5M + $12M + $9.1M + $6.5M + $5M = $58.1M, not $64.5M. The $6.4M gap is the site fixed layer (F = $0.30M × 16 sites = $4.8M) and prepaid metering ($0.24M × 3 feeder heads = $0.72M) — the very layer §VIII builds its whole site-pricing model on ("F is about $300,000 and does not shrink with anything"), omitted from the one table that prices a site. Also: 22 articles not 24, 16 sites not 17 (6+3+3+4), and the model's receiver line is $8.4M, conversion $8.1M. A reader adding this column gets a different corridor.
**Replace with:** | Receiver articles (22 × 541 kW, all fully populated at commissioning) | 16 sites |—| $8.4M |
| Conversion stacks: battery, inverters, switchgear, interconnect — sized to metered demand, not to nameplate | 16 sites |—| $8.1M |
| Site fixed layer (F = $0.30M × 16 sites) plus prepaid metering at the 3 feeder heads |—|—| $5.5M |
| Corridor ground infrastructure, NOC share, deployment |—|—| $5M |
| **Total corridor capital, initial** | | | **~$64.5M** |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:545  ·  number-inconsistency
**Current:** | Field O&M + NOC share (bottom-up staffing, ground partner) | $1.8M |
| Insurance (Appendix I Era II band, upper end: first-corridor loading) | $0.9M |
| Source energy (50% purchased at ~$0.02/kWh, priced through chain) | $1.9M |
**Why:** The printed cost lines do not reproduce the printed EBITDA: $13.36M − $1.8M − $0.9M − $1.9M − $0.3M = $8.46M, not the ~$7.7M the next row states. corridor_model.py scales O&M and source energy off a 38.8 GWh baseline to the corridor's actual 46.7 GWh: O&M $2.17M and source $2.29M, which is what produces the validated $7.71M EBITDA. The $1.8M/$1.9M pair is the un-scaled baseline. The corridor P&L — the single most-read table in the package — does not add up.
**Replace with:** | Field O&M + NOC share (bottom-up staffing, ground partner; scaled to 46.7 GWh) | $2.2M |
| Insurance (Appendix I Era II band, upper end: first-corridor loading) | $0.9M |
| Source energy (50% purchased at ~$0.02/kWh, priced through chain, at 46.7 GWh) | $2.3M |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:549  ·  contradiction
**Current:** That clears the ≥8–9 per cent target the blend is sized against, and it clears it for the first time — the demand-matched build did not. Two things did it, and neither is the receiver: the community layer is sold at the price these populations already pay ($0.26–0.30, against an incumbent bill of $0.28–1.10), and the corridor is sited to fill its transmit envelope on day one (94 per cent, against 61 for a demand-matched build), which cuts fleet capital per delivered watt from **$1.89 to $1.40**.
**Why:** CONFIRMED, with a corrected replacement. The quoted text is at line 549 verbatim. corridor_model.py (all 17 printed figures PASS) contradicts the causal claim: the community layer is billed at $0.28 (feeder-head) and $0.25 (greenfield) against modelled delivered costs of $0.363 and $0.434, i.e. below cost on every kWh, for −$1.51M/yr of margin over delivered cost (feeder-head −$0.92M, greenfield −$0.59M) against the anchors' +$1.21M and a $1.20M sovereign line. Deleting the four greenfield villages RAISES the operator's yield (7.557% → 7.621%). So community pricing did not lift the return, and
**Replace with:** That clears the ≥8–9 per cent target the blend is sized against, and it clears it for the first time — the demand-matched build did not. One thing did it, and it is not the receiver: the corridor is sited to fill its transmit envelope on day one (94 per cent, against 61 for a demand-matched build), which cuts fleet capital per delivered watt from **$1.89 to $1.40** across the same six airframes. The anchor layer covers its delivered cost (+$1.2M/yr over it). The community layer does not: billed at $0.28 at the feeder heads and $0.25 in the villages, against modelled delivered costs of $0.363 a

### /Users/billy_j/age-of-wonders/private/dossier-aquila/executive-memo.md:14  ·  number-inconsistency
**Current:** What serves them instead is diesel: **$30–50 billion** a year of fuel, burned at **$0.30-plus** per kilowatt-hour, by towers and mines and households the wire will never reach.
**Why:** CONFIRMED. The quoted text is present verbatim at executive-memo.md:14. The investment thesis — the document of record — prints $28–50 billion in every live occurrence: §I (L56, carrying the [Measured] tag, adjacent to the IFC 'Dirty Footprint of the Broken Grid' citation [2] at L108), §VIII (L1895, 'Section II's $28–50 billion a year of diesel spend beyond the wire'), and Appendix F (L2021, which anchors the bottom-up reconciliation: '$4.5–6 billion a year is 10–15 per cent of the $28–50 billion global diesel figure in Section II'). Nothing in the memo's context licenses a rounded or differen
**Replace with:** What serves them instead is diesel: **$28–50 billion** a year of fuel, burned at **$0.30-plus** per kilowatt-hour, by towers and mines and households the wire will never reach.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/executive-memo.md:20  ·  model-mismatch
**Current:** The full conversion surface for one receiver — **541 kilowatts** delivered, enough for a town of five thousand — is one to two square metres of semiconductor. A dinner table, under a beam of light.
**Why:** Same error as booklet-pre-nda.md line 35: 1–2 m² and "a town of five thousand" are Appendix A.3's figures for a *megawatt* receiver. The 541 kW article converts through 0.54–1.08 m² and serves roughly 2,000 people at the Modern Energy Minimum. The memo opens the bound Dossier and it travels; a head of state can check this against A.3 in ten seconds.
**Replace with:** The full conversion surface for one receiver — **541 kilowatts** delivered, enough for a village of two thousand at the Modern Energy Minimum — is half a square metre to one square metre of semiconductor. A dinner table, under a beam of light.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:49  ·  stale-architecture
**Current:** So: *a 1 MW receiver at a community site, fed by an Era II relay.*
**Why:** Confirmed, verbatim, at line 49. The Nomenclature callout at lines 47-48 states the receiver 'is fixed and always ships fully populated. Era II is 541 kW delivered — one PCSEL panel... Sites scale by receiver count, not by reconfiguring a receiver.' The worked example of correct usage that follows four lines later invokes a '1 MW receiver', which is not an article the architecture builds: 1 MW is a feeder-head SITE load, served by two 541 kW articles. This is the definitional callout in §I — the first thing a sovereign reader is told about the article — and it demonstrates the one construction
**Replace with:** So: *two receivers at a feeder-head site, fed by an Era II relay.*

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:72  ·  number-inconsistency
**Current:** Era II (PCSEL arrays, a fixed 541 kW receiver with demand-sized electrical around it, gated on the panel milestone) delivers at $0.20–0.24 per kilowatt-hour to anchor sites, below diesel everywhere and below the upper half of what the companies that power telecom towers charge today ($0.20–0.35), at $0.359 at a feeder-head community site and $0.434 at a greenfield village ramping into its article, reaching retail as the demand ramp and the concessional layer do their work.
**Why:** CONFIRMED. The quote is verbatim at line 72. Every delivered figure in it comes from corridor_model.py, whose LCOE charges each site CHAIN_CAPEX = $4.00/W delivered (line 63) — sourced from the Appendix B.1 era table (transmitter $2.00 + relay/corridor ground share $2.00). But the same script's reference corridor spends $42.5M of non-site capital (relay $12.0M + GS balance-of-plant $12.7M + panel layer $12.8M + corridor infrastructure/NOC/deployment $5.0M) against 8.55 MW of day-one load: $4.97/W. Even on the most charitable convention — transmit and relay only ($37.5M), spread over the full 9
**Replace with:** Era II (PCSEL arrays, a fixed 541 kW receiver with demand-sized electrical around it, gated on the panel milestone) delivers at $0.23–0.26 per kilowatt-hour to anchor sites, below diesel everywhere and inside what the companies that power telecom towers charge today ($0.20–0.35), at $0.41 at a feeder-head community site and $0.48 at a greenfield village ramping into its article. Every one of those figures carries the reference corridor's own non-site capital — transmit, relay, and corridor infrastructure — at $4.97 per delivered watt, not a mature-fleet allocation. Retail parity arrives with t

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:682  ·  number-inconsistency
**Current:** At a feeder-head site with a real megawatt of load, two fully-populated articles deliver at **$0.359 against $0.348**: one cent. Site where the demand already is, and the premium is three per cent, not fourteen.
**Why:** The counterfactual does not reproduce. corridor_model.py prices a demand-matched feeder-head receiver at $0.3599/kWh and the two fixed articles at $0.3627 — a premium of three tenths of a cent, under one per cent. $0.348 is unvalidated (it is not in the model's PRINTED list) and appears to be pre-repricing. Note the direction: the model makes the standardisation case *stronger* than the document claims. But the printed $0.359 is then the counterfactual's number, not the article's, and the same $0.359 is carried at §I:72, §VIII:636/715/723, B.2 and J.3 — so the article's delivered cost must mov
**Replace with:** At a feeder-head site with a real megawatt of load, two fully-populated articles deliver at **$0.363 against $0.360**: three tenths of a cent. Site where the demand already is, and the premium is under one per cent, not fourteen.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:682  ·  model-mismatch
**Current:** At a greenfield village the fixed 541 kW receiver delivers at **$0.434 per kilowatt-hour against $0.381** for a perfectly demand-matched one: five cents, or fourteen per cent. At a feeder-head site with a real megawatt of load, two fully-populated articles deliver at **$0.359 against $0.348**: one cent. Site where the demand already is, and the premium is three per cent, not fourteen.
**Why:** CONFIRMED. The quoted text is at line 682 exactly as quoted, and the feeder-head pair does not reconcile with the artefact of record. corridor_model.py computes the feeder-head site as 2 articles (1.083 MW nameplate) against a 1.000 MW load, i.e. only 83 kW of idle aperture at $0.70/W — a standardisation premium of $0.003/kWh, which is what `--show` prints in the 'vs matched' column (+0.003) for the Feeder-head row. The thesis claims a $0.348 counterfactual, a one-cent gap, and a 'three per cent' premium: the counterfactual figure appears nowhere in the model, and the true premium is 0.8%, not
**Replace with:** At a greenfield village the fixed 541 kW receiver delivers at **$0.434 per kilowatt-hour against $0.381** for a perfectly demand-matched one: five cents, or fourteen per cent. At a feeder-head site with a real megawatt of load, two fully-populated articles deliver at **$0.359 against $0.356**: three-tenths of a cent. Site where the demand already is, and the premium is one per cent, not fourteen.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:686  ·  model-mismatch
**Current:** Across the reference corridor the fixed article carries about **$2.45 million** of idle aperture and releases about **$11 million** of transmit capacity that a demand-matched set would have stranded. The standardisation is not a tax paid for simplicity. It is the cheaper side of a trade.
**Why:** CONFIRMED. The quoted text is at line 686 as quoted, and neither headline number reproduces from the artefact of record. Idle aperture across the reference corridor in corridor_model.py is 1.2508 + 0.4978 + 0.2488 + 1.3659 = 3.363 MW; priced at each class's own v_rx (0.71 anchor, 0.70 otherwise) that is $2.372M. The document's $2.45M is 3.5 MW (the blueprint's rounded-up idle) x $0.70 (the non-anchor rate) — a rounded figure priced at the wrong rate. The $11M is computed nowhere in the model at all: nothing in corridor_model.py derives released or stranded transmit capacity. The closest recons
**Replace with:** Across the reference corridor the fixed article carries about **$2.37 million** of idle aperture and releases about **$6.7 million** of transmit capacity that a demand-matched set would have stranded. The standardisation is not a tax paid for simplicity. It is the cheaper side of a trade.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:705  ·  number-inconsistency
**Current:** The relay fleet and the ground-station balance of plant are truly lumpy: $24.7 million, forty-six per cent of the corridor, committed on day one and indivisible. There is no fraction of an airframe and no half of a beam director. The laser panel layer is coarsely stageable, in 1.9 MW optical steps of roughly 541 kilowatts delivered. Only the receiver and conversion layer, twenty-one per cent, stages finely.
**Why:** $24.7M of $64.5M is 38 per cent, not 46. (46.1 per cent is what you get by adding the $5M of semi-fixed corridor infrastructure — a different quantity, and the sentence does not include it.) The "twenty-one per cent" also fails: the model's receiver plus conversion layer is $16.5M = 25.5 per cent, and of that only the conversion stack ($8.1M, 12.5 per cent) truly stages finely, because the receiver is a fixed article. This is the paragraph that establishes the lumpiness argument, and every share in it is wrong.
**Replace with:** The relay fleet and the ground-station balance of plant are truly lumpy: $24.7 million, thirty-eight per cent of the corridor, committed on day one and indivisible. There is no fraction of an airframe and no half of a beam director. The laser panel layer is coarsely stageable, in 1.9 MW optical steps of roughly 541 kilowatts delivered. The receiver stages by article. Only the conversion layer, thirteen per cent, stages finely.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:705  ·  stale-architecture
**Current:** The relay fleet and the ground-station balance of plant are truly lumpy: $24.7 million, forty-six per cent of the corridor, committed on day one and indivisible. There is no fraction of an airframe and no half of a beam director. The laser panel layer is coarsely stageable, in 1.9 MW optical steps of roughly 541 kilowatts delivered. Only the receiver and conversion layer, twenty-one per cent, stages finely.
**Why:** CONFIRMED against sim/corridor_model.py. Lumpy capital = LUMPY_RELAY $12.0M + LUMPY_GS_BOS $12.7M = $24.7M; corridor capital = $64.482M (model PASSes at $64.5M printed). $24.7M/$64.482M = 38.3%, not 46%. Forty-six per cent back-solves to a $53.7M denominator ($24.7/0.46 = $53.70M) — the superseded pre-repricing corridor, a direct fingerprint of the old model surviving into shipped text. The finely-staged receiver-and-conversion layer is the variable site capex (v_r·P_aperture + v_e·P_demand): total site capex $21.98M less 16 fixed layers at $300k ($4.80M) and 3 brownfield metering packages at 
**Replace with:** The relay fleet and the ground-station balance of plant are truly lumpy: $24.7 million, thirty-eight per cent of the corridor, committed on day one and indivisible. There is no fraction of an airframe and no half of a beam director. The laser panel layer is coarsely stageable, in 1.9 MW optical steps of roughly 541 kilowatts delivered. Only the receiver and conversion layer, twenty-six per cent, stages finely.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:727  ·  stale-architecture
**Current:** Gate D measures capacity factor against *populated* capacity, not against the certified envelope, because a gate measured against a nameplate a site is not yet meant to fill tests arithmetic rather than demand.
**Why:** CONFIRMED BLOCKER. The quoted sentence is present verbatim at line 727. Two independent defects. (1) Stale architecture: 'populated capacity' vs 'certified envelope' is the vocabulary of the rejected cassette design, in which an envelope could be partially populated. The finalised article is fixed and 'always ships fully populated' (line 47; restated at 676, 682, 715, 2518), so populated capacity IS installed nameplate and the distinction the sentence turns on does not exist. (2) Direct contradiction of the document's own gate: Section IX defines D-1 as 'capacity factor >=40 per cent against i
**Replace with:** Gate D measures the two site classes on two different instruments, because they are deliberately different animals. A brownfield site is measured against its installed nameplate, which its day-one load is meant to fill. A greenfield site is measured against the demand-matched receiver it would otherwise have been built with, because measuring a designed-in over-build against nameplate tests the design decision rather than the demand.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:751  ·  number-inconsistency
**Current:** The worked reference corridor is **anchor-weighted**: ~91 per cent of corridor revenue from telecom clusters ($0.35/kWh, at the rate their power contractors already charge), mining and industrial off-take ($0.22/kWh, at long-term contract rates), and a sovereign service overlay, with community retail a growing minority. 
**Why:** Neither number reproduces. corridor_model.py prices the tower clusters at $0.30/kWh (Blueprint §10A.4 also prints $0.30), not $0.35. And anchor-grade revenue is tower $4.20M + mining $4.03M + sovereign $1.20M = $9.43M of $13.36M = 71 per cent, not 91. Community retail is $3.93M — 29 per cent, not "a growing minority." The 91 per cent is the pre-feeder-head corridor: adding three feeder heads at $3.13M of community retail is exactly what moved it. The same stale 91/nine-tenths figure is repeated at §XI line 1037 and RR9 line 2707, and the Blueprint prints a third value (78 per cent) at line 537
**Replace with:** The worked reference corridor is **anchor-weighted**: ~71 per cent of corridor revenue from telecom clusters ($0.30/kWh, inside the rate their power contractors already charge), mining and industrial off-take ($0.22/kWh, at long-term contract rates), and a sovereign service overlay, with community retail the remaining 29 per cent and growing. 

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:751  ·  model-mismatch
**Current:** **Era II: anchor-weighted corridors, revenue share.** The operating structure is the network operator funding transmitter, receiver, and ground stack; Aquila funding and operating the relay fleet; delivered energy shared 50/50. The worked reference corridor is **anchor-weighted**: ~91 per cent of corridor revenue from telecom clusters ($0.35/kWh, at the rate their power contractors already charge), mining and industrial off-take ($0.22/kWh, at long-term contract rates), and a sovereign service overlay, with community retail a growing minority.
**Why:** CONFIRMED. The quoted text is present at line 751 verbatim. Both numbers in it are contradicted by the artefact of record. corridor_model.py reference_corridor() prices towers at tariff_tower=0.30 (not $0.35 — that value survives only in a legacy validation lambda at line 231 and in blueprint §10A line 470). Revenue decomposition from the model: towers $4.201M + mining $4.029M + sovereign overlay $1.200M = $9.430M anchor, against total revenue $13.358M, i.e. 70.6 per cent, not 91. Community retail is feeder-head $3.127M + greenfield $0.801M = $3.928M = 29.4 per cent, not 9. The auditor's arith
**Replace with:** **Era II: anchor-weighted corridors, revenue share.** The operating structure is the network operator funding transmitter, receiver, and ground stack; Aquila funding and operating the relay fleet; delivered energy shared 50/50. The worked reference corridor is **anchor-weighted**: ~71 per cent of corridor revenue from telecom clusters ($0.30/kWh, at the rate their power contractors already charge), mining and industrial off-take ($0.22/kWh, at long-term contract rates), and a sovereign service overlay, with community retail a growing minority.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:1037  ·  contradiction
**Current:** The fallback is built into the revenue: roughly nine-tenths of a corridor's income comes from telecom towers, mines, and sovereign contracts, all of them counterparties with a chief financial officer. Nodes are added in increments as metered demand crosses thresholds. And the community-scale tranche does not draw at all until real sites clear 25 per cent utilisation and 85 per cent payment collection.
**Why:** Two errors in one paragraph, in the body section a principal actually reads. "Nine-tenths" is the stale 91 per cent — the model gives 71 per cent (see line 751). And "25 per cent utilisation" is a fourth restatement of Gate D that omits D-1's ≥40 per cent limb entirely and drops the denominator, so the risk register understates the gate the thesis says protects the $2.2B tranche.
**Replace with:** The fallback is built into the revenue: roughly seven-tenths of a corridor's income comes from telecom towers, mines, and sovereign contracts, all of them counterparties with a chief financial officer. Nodes are added in increments as metered demand crosses thresholds. And the community-scale tranche does not draw at all until real sites clear gate D on both limbs: 40 per cent capacity factor against nameplate at a feeder head, 25 per cent against demand-matched reference at a greenfield village, and 85 per cent payment collection at both.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:1446  ·  model-mismatch
**Current:** | **Project / ground (SPV)** | ~$51.0M ground stack incl. corridor infrastructure and the third ingress station, ~$4.2M/yr at year 5 | ~7.6% IRR |
**Why:** CONFIRMED BLOCKER — the model is the witness against the document. `sim/corridor_model.py:177` computes `op_irr = (ebitda / 2) / operator_capital` = 3.853/51.0 = 7.56%. That is a steady-state cash-on-cash yield, i.e. the IRR of a *perpetuity*. It is not an IRR of any finite corridor life, and the validation harness PASSes it only because it checks the printed figure against the same arithmetic that produced it (circular, not confirmatory). Discounting the actual cash flows: -$51.0M then $3.853M/yr gives 1.6% over 15 years, 4.3% over 20, 5.6% over 25. Even at the row's own more generous ~$4.2M/
**Replace with:** | **Project / ground (SPV)** | ~$51.0M ground stack incl. corridor infrastructure and the third ingress station, ~$4.2M/yr at year 5 | **~7.6% steady-state cash yield (½ EBITDA ÷ capital); unlevered IRR ~1.6% on a 15-yr corridor life, ~5.6% on 25 yrs** |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:1602  ·  stale-architecture
**Current:** | Success-branch IRR (P10 / P50 / P90) | ~25% / **~33%** / ~41% |
**Why:** CONFIRMED BLOCKER, with the auditor's replacement corrected on two counts. Verified: sim/econ_model.py (245 lines) drives the entire Section IX / Appendix C valuation from a top-down ANCHORS dict of programme EBITDA plus relative volume and tariff MULTIPLIERS. It carries no article count, no 3.509 chain factor, no absolute anchor band, no corridor P&L, and no import of or reference to corridor_model.py. The aggregation the document claims — Section IX valuing the corridor economics of Section VIII — does not exist as code. The anchors were set against the superseded corridor (demand-matched re
**Replace with:** | Success-branch IRR (P10 / P50 / P90) | ~25% / **~33%** / ~41% **[stale — pending the coupled re-run]** |

**The re-run notice, stated rather than buried.** The programme Monte Carlo behind this table (`sim/econ_model.py`) is not coupled to the site-and-corridor model (`sim/corridor_model.py`). It runs off top-down programme EBITDA anchors and the Appendix B mission ramp: it carries no article count, no chain factor, no anchor band, and no corridor P&L. Those anchors were parameterised against the superseded corridor — the demand-matched receiver, the $0.17–0.19 anchor band, and a chain-capex

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:2518  ·  contradiction
**Current:** At the corridor, modularity is not the answer at all: even staging every laser panel, about eighty-five per cent of corridor capital commits before community demand is proven.
**Why:** §VIII line 707 makes the same claim at "about sixty-four per cent", and corridor_model.py computes 62.8 per cent (lumpy $24.7M + semi-fixed $5M + anchor site capex $10.8M, over $64.5M). 85 per cent is a third figure with no derivation behind it, sitting in the challenge register — the appendix whose job is to survive an adversary. An analyst who checks it finds the two halves of the package disagreeing by twenty points on the central demand-risk number.
**Replace with:** At the corridor, modularity is not the answer at all: even staging every laser panel, about sixty-three per cent of corridor capital commits before community demand is proven.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:2520  ·  contradiction
**Current:** Gate D makes capacity factor ≥25 per cent against installed nameplate, delivered energy ≥700 MWh per site in year two, and collection ≥85 per cent a precondition of community-scale T4 drawdown.
**Why:** This is the third definition of Gate D in the package, and it fuses the two limbs into an incoherent one. §IX (lines 840–842) defines D-1 as ≥40 per cent against installed nameplate (brownfield/feeder-head) and D-2 as ≥25 per cent against demand-matched reference capacity (greenfield) — and D-2 exists precisely because "capacity factor [against nameplate] is the wrong instrument here." K.6 states the D-2 threshold against the D-1 denominator, which is the one measurement §IX says tests the design decision rather than demand. K is the adversarial register: an unreconciled gate definition here r
**Replace with:** Gate D makes the demand test a precondition of community-scale T4 drawdown, in two limbs: at brownfield and feeder-head sites, capacity factor ≥40 per cent against installed nameplate within twelve months of energisation (D-1); at greenfield sites, capacity factor ≥25 per cent against demand-matched reference capacity, delivered energy ≥700 MWh in year two, and year-on-year energy growth ≥10 per cent (D-2). Collection ≥85 per cent on both limbs.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/package/booklet-pre-nda.md:35  ·  model-mismatch
**Current:** The full conversion surface for one receiver — **541 kilowatts** delivered, enough for a town of five thousand — is one to two square metres of semiconductor. A small table, under a beam of light.
**Why:** Both figures belong to the megawatt receiver, not the 541 kW article. Appendix A.3 gives 1.0–2.0 m² of cell for 1 MW at the 50–100 W/cm² design flux; 541 kW is 0.54–1.08 m². §III attaches "a town of five thousand" to a megawatt, and even that is generous: 541 kW at a 50 per cent capacity factor is 2.4 GWh/yr, which is ~2,400 people at the Modern Energy Minimum. The 541 kW article was swapped into a sentence written for the megawatt and the megawatt's numbers were left behind. This is the most-shared document in the package, and the error is in its single most quotable line. The identical sente
**Replace with:** The full conversion surface for one receiver — **541 kilowatts** delivered, enough for a village of two thousand at the Modern Energy Minimum — is half a square metre to one square metre of semiconductor. A small table, under a beam of light.

### private/dossier-aquila/design-network-operations.md:426  ·  stale-architecture
**Current:** Anchor-weighted, 91% contract-grade revenue, 13.0 MW installed nameplate, ~9.6 MW day-one load [alloc: blueprint §10A].
**Why:** Three stale figures in one line, in the document whose job is to VERIFY §10A. The model gives: anchor + service revenue = $9.43M of $13.36M = 71%; nameplate 11.91 MW; day-one load 8.55 MW. A reader who opens the design review to check the thesis finds a third, different corridor.
**Replace with:** Anchor-weighted, 71% contract-grade revenue, 11.9 MW installed nameplate, ~8.55 MW day-one load [alloc: blueprint §10A].

### private/dossier-aquila/design-receiver-thermal.md:38  ·  stale-architecture
**Current:** Corrected: cost = F + v·P, F = $0.30M, v = $1.90/W community / $0.71/W anchor; crossover P* = 158 kW.
**Why:** The design review verifies a correction the thesis has since superseded. It caught the right error (a site does not price linearly in $/W) and stopped one step short: the live model is F + v_r·P_aperture + v_e·P_demand, because the receiver is a fixed 541 kW article and the electrical is sized to demand. As written, the verification layer certifies a formula that no longer reproduces §VIII's $0.434 greenfield figure.
**Replace with:** Corrected: cost = F + v_r·P_aperture + v_e·P_demand, F = $0.30M, v_r = $0.70/W of installed aperture ($0.71/W anchor), v_e = $1.20/W of metered demand ($0.40/W where the anchor owns its electrical); crossover P* = F/(v_r + v_e) = 158 kW. The split matters because the article is fixed at 541 kW while the electrical follows the load: at a 200 kW village the two P's differ by 341 kW.

### private/dossier-aquila/engineering-blueprint.md:309  ·  stale-architecture
**Current:** Site capital: F + v·P (F = $0.30M/site; v = $1.90/W community, $0.71/W anchor in Era II, $1.05/W in Era III) [alloc—component-level build-up in sovereign dossier App G §VII].
**Why:** This is the superseded single-P site model. The finalised architecture prices a site as F + v_r·P_aperture + v_e·P_demand precisely because aperture and demand are no longer the same number: the article is fixed at 541 kW while the electrical is sized to metered load. Rebuilt from this line, the 200 kW greenfield village costs $0.30M + $1.90 × 0.200 = $0.68M; the true figure is $0.30M + $0.70 × 0.541 + $1.20 × 0.200 = $0.92M, a 26% understatement. The blueprint's own §6.2, three paragraphs above, describes the fixed article that breaks this formula.
**Replace with:** Site capital: F + v_r·P_aperture + v_e·P_demand (F = $0.30M/site; v_r = $0.70/W of installed aperture in Era II, $0.71/W at an anchor, $0.30/W in Era III; v_e = $1.20/W of metered demand, $0.40/W where the anchor owns its own storage and distribution). Crossover P* = F/(v_r + v_e) = 158 kW [alloc—component-level build-up in sovereign dossier App G §VII; artefact of record: sim/corridor_model.py].

### private/dossier-aquila/engineering-blueprint.md:429  ·  stale-architecture
**Current:** site stack **F + v·P**, with F = **$0.30M fixed per site** (interlock, surveillance, safety PLC, SCADA, plinth, aperture housing, tracking mount, grid tie, consent/ESIA, mobilisation) and v = **$1.90/W community / $0.71/W anchor** in Era II, falling to **$1.05/W** in Era III. Crossover P* = F/v = **158 kW**
**Why:** Same superseded single-P formula, here in the design-to-cost governance section that quarterly procurement reviews are run against. A cost review conducted on $/W of a single P cannot detect the one cost the fixed article actually creates — idle aperture — because that cost only exists when P_aperture ≠ P_demand. The $1.05/W Era III figure is not an input to any model in sim/ and does not appear anywhere else in the package.
**Replace with:** site stack **F + v_r·P_aperture + v_e·P_demand**, with F = **$0.30M fixed per site** (interlock, surveillance, safety PLC, SCADA, plinth, aperture housing, tracking mount, grid tie, consent/ESIA, mobilisation), v_r = **$0.70/W of installed aperture** in Era II ($0.71/W at an anchor) falling to **$0.30/W** in Era III, and v_e = **$1.20/W of metered demand** ($0.40/W where the anchor owns its own electrical). Crossover P* = F/(v_r + v_e) = **158 kW**

### private/dossier-aquila/engineering-blueprint.md:470  ·  model-mismatch
**Current:** - a telecom tower-cluster portfolio of 2.0 MW aggregate across ~6 cluster sites, contracted energy-service-company grade at $0.35/kWh;
**Why:** §10A.1 prices tower clusters at $0.35/kWh; §10A.4's revenue table (line 532) prices them at $0.30 and computes $4.2M from it. The model's reference_corridor() uses tariff_tower=0.30. The corridor's $13.36M revenue is only reproducible at $0.30. Worse, thesis §VIII says the tower ESCO band is $0.20–0.35 and that Lightway 'wins the sites where the incumbent sits at the expensive end' — selling AT $0.35 is no price cut at all. $0.30 is the operative and defensible number.
**Replace with:** - a telecom tower-cluster portfolio of 2.0 MW aggregate across ~6 cluster sites, contracted energy-service-company grade at $0.30/kWh;

### private/dossier-aquila/engineering-blueprint.md:503  ·  number-inconsistency
**Current:** The corridor's 13.0 MW installed receiver nameplate (24 articles of 541 kW) is therefore served firm at ~7.3 MW on the planning basis
**Why:** §10A.1 (line 477) states the corridor is 22 articles / 11.9 MW. Twenty-six lines later §10A.2 states 24 articles / 13.0 MW. The model (corridor_model.py: 6+6+6+4) returns 22 articles and 11.91 MW. The 24/13.0 pair is the stale pre-deferral corridor (it includes the 4th feeder head that §10A.1 explicitly defers). Two different values for the same quantity, one page apart — an analyst finds this in ten minutes.
**Replace with:** The corridor's 11.9 MW installed receiver nameplate (22 articles of 541 kW) is therefore served firm at ~7.3 MW on the planning basis

### private/dossier-aquila/engineering-blueprint.md:503  ·  stale-architecture
**Current:** The corridor's 13.0 MW installed receiver nameplate (24 articles of 541 kW) is therefore served firm at ~7.3 MW on the planning basis
**Why:** §10A.1 (line 477) and `corridor_model.py` both give 22 articles and 11.9 MW nameplate (6 towers×1 + 3 mines×2 + 3 feeder-heads×2 + 4 greenfield×1 = 22 × 541 kW = 11.91 MW). §10A.2 carries the superseded 24-article / 13.0 MW corridor. Two paragraphs apart, the same appendix states two different corridors.
**Replace with:** The corridor's 11.9 MW installed receiver nameplate (22 articles of 541 kW) is therefore served firm at ~7.3 MW on the planning basis

### private/dossier-aquila/engineering-blueprint.md:515  ·  number-inconsistency
**Current:** | Receiver articles (24 × 541 kW, all fully populated at commissioning) | 17 sites |—| $9.1M |
| Conversion stacks: modular community (8 × 200 kW) + anchor | initial build |—| $6.5M initial |
**Why:** BLOCKER. The reference-corridor capital stack does not sum to its own total and does not carry the finalised site cost model. As printed: $25.5M + $12M + $9.1M + $6.5M + $5M = $58.1M, against the stated total of ~$64.5M — a $6.4M hole in the one table a sovereign's analyst will add up. It also uses 24 articles / 17 sites (the corridor has 22 articles across 16 sites: 6×1 + 3×2 + 3×2 + 4×1), and it has no line at all for F, the $0.30M/site fixed layer that §9.4 and thesis §VIII declare to be the whole point of the pricing model, nor for the $0.24M/site prepaid metering. 'Conversion stacks: modu
**Replace with:** | Receiver articles (22 × 541 kW, all fully populated at commissioning; $0.70/W of aperture, $0.71/W at anchor sites) | 16 sites |—| $8.4M |
| Site electrical, sized to metered demand (battery, inverters, switchgear, EPC at $1.20/W of demand; $0.40/W at the mine fence) | 16 sites |—| $8.1M |
| Site fixed layer (F: interlock, surveillance, safety PLC, SCADA, plinth, aperture housing, tracking mount, grid tie, consent and ESIA, mobilisation) | 16 sites | $0.30M | $4.8M |
| Prepaid metering (feeder-head sites, ~4,000 connections each) | 3 sites | $0.24M | $0.7M |

### private/dossier-aquila/engineering-blueprint.md:518  ·  number-inconsistency
**Current:** | **Total corridor capital, initial** | | | **~$64.5M** |
**Why:** The capital table does not sum to its own total. $25.5M (ground stations) + $12M (fleet) + $9.1M (receiver articles) + $6.5M (conversion stacks) + $5M (infrastructure) = **$58.1M**. The printed total is $64.5M — a $6.4M hole. corridor_model.py builds $64.48M from a different decomposition entirely (lumpy $24.7M + panels $12.8M + infra $5.0M + site capex $21.98M), in which the site layer carries a $4.8M fixed cost (F = $300k × 16 sites) and $0.72M of prepaid metering that this table never lists. $64.5M is the denominator of every IRR in the package. It cannot be a number the reader's calculator
**Replace with:** | Site fixed layer (F = $0.30M × 16 sites: interlock, surveillance, safety PLC, SCADA, plinth, aperture housing, tracking mount, grid tie, consent, mobilisation) | 16 | $0.30M | $4.8M |
| Prepaid metering (3 brownfield feeder-head sites, ~4,000 connections each) | 3 | $0.24M | $0.7M |
| **Total corridor capital, initial** | | | **~$64.5M** |

### private/dossier-aquila/engineering-blueprint.md:537  ·  number-inconsistency
**Current:** | **Corridor total** | **46.7 GWh billed** | | **~$13.36M/yr: 78% anchor-grade** |
**Why:** 78% does not reproduce and does not match the thesis's 91%. The model returns 70.6% anchor-and-sovereign against 29.4% community retail. GWh and revenue are correct.
**Replace with:** | **Corridor total** | **46.7 GWh billed** | | **~$13.36M/yr: 71% anchor-grade** |

### private/dossier-aquila/engineering-blueprint.md:541  ·  number-inconsistency
**Current:** | Field O&M + NOC share (bottom-up staffing, ground partner) | $1.8M |
**Why:** BLOCKER. The printed cost lines do not produce the printed EBITDA. $13.36M revenue less the four printed costs ($1.8M + $0.9M + $1.9M + $0.3M = $4.9M) gives $8.46M, not the ~$7.7M stated two rows below — and the $7.7M is what every IRR in the package (operator 7.6%, Aquila 28.5%) is computed from. corridor_model.py scales O&M and source energy with delivered energy off the 38.8 GWh baseline: at this corridor's 46.7 GWh they are $2.17M and $2.29M, which is exactly what closes EBITDA at $7.71M. The table prints the unscaled baseline figures.
**Replace with:** | Field O&M + NOC share (bottom-up staffing, ground partner; scaled with delivered energy off the 38.8 GWh baseline) | $2.17M |

### private/dossier-aquila/engineering-blueprint.md:543  ·  number-inconsistency
**Current:** | Source energy (50% purchased at ~$0.02/kWh, priced through chain) | $1.9M |
**Why:** BLOCKER — the second half of the EBITDA break above. corridor_model.py carries source energy at 1.9 × (46.69/38.8) = $2.29M at this corridor's delivered energy. With $2.17M O&M and $2.29M source the table closes at EBITDA $7.71M and reproduces the model; as printed it closes at $8.46M and the operator IRR would be ~8.4%, not 7.6%.
**Replace with:** | Source energy (50% purchased at ~$0.02/kWh, priced through chain; scaled with delivered energy) | $2.29M |

### private/dossier-aquila/engineering-blueprint.md:545  ·  number-inconsistency
**Current:** | **Corridor EBITDA** | **~$7.7M/yr** |
**Why:** The P&L table directly above does not subtract to this number. Printed revenue $13.36M minus the four printed cost lines ($1.8M O&M + $0.9M insurance + $1.9M source energy + $0.3M attrition = $4.9M) gives **$8.46M**, not $7.7M. The model reaches $7.71M only by silently scaling the O&M and source-energy lines with delivered energy off a hard-coded 38.8 GWh baseline (corridor_model.py:171-173): at the corridor's 46.7 GWh billed, O&M becomes $2.17M and source energy $2.29M. The 38.8 GWh baseline appears nowhere in this corridor or anywhere in the package. So the single table an advisor will rebui
**Replace with:** | Field O&M + NOC share (bottom-up staffing, ground partner; scales with delivered energy) | $2.17M |
| Insurance (Appendix I Era II band, upper end: first-corridor loading) | $0.9M |
| Source energy (50% purchased at ~$0.02/kWh, priced through chain; scales with delivered energy) | $2.29M |
| **Airframe attrition** (Era II planning: $2M hulls, 180-day+ cycles, ~2%/transit → ~$0.3M; **sensitivity: at today's $5.5M hulls and record-derived 5%/transit the line is $1.5–3.0M/yr: larger than an Era I corridor's entire energy margin, which is why Era I corridors are service-carried and this is an Er

### private/dossier-aquila/engineering-blueprint.md:547  ·  model-mismatch
**Current:** 50/50 split at year five: ~$4.2M/yr each side, rising with the greenfield ramp toward envelope. Both internal rates of return (IRR) below are corridor-life discounted cash flows over 20 years. Each carries the demand ramp from the year-5 mix toward envelope, expansion capex drawn as metered demand crosses thresholds, and a year-7 refleet at the $2M hull [alloc—corridor model, thesis Appendix B].
**Why:** THIS IS THE OBJECTION THE PACKAGE HAS NO ANSWER FOR. The sentence asserts a methodology the artefact of record does not implement. corridor_model.py:177-179 computes `op_irr = (ebitda / 2) / operator_capital` — a first-year cash yield on undiscounted flat cash flow. There is no DCF, no 20-year horizon, no demand ramp, no expansion capex, no year-7 refleet anywhere in the file. The citation '[alloc—corridor model]' points at a model that contains none of it. Rebuild it honestly on the model's own flat flows ($3.85M/yr to the operator on $51.0M) and the operator's TRUE unlevered IRR is 1.61% ove
**Replace with:** 50/50 split at year five: ~$4.2M/yr each side, rising with the greenfield ramp toward envelope. **The two figures below are first-year cash yields on capital, not internal rates of return** (`corridor_model.py`: EBITDA share ÷ capital). Stated as a corridor-life discounted cash flow on flat year-5 flows, the operator's unlevered IRR is **~1.6% over a 15-year life and ~4.3% over 20 years**. The gap between the cash yield and the IRR is the whole financeability problem, and it is stated here rather than buried: the corridor as presently priced does not return its capital at any commercial hurdle

### private/dossier-aquila/engineering-blueprint.md:549  ·  contradiction
**Current:** That clears the ≥8–9 per cent target the blend is sized against, and it clears it for the first time — the demand-matched build did not. Two things did it, and neither is the receiver: the community layer is sold at the price these populations already pay ($0.26–0.30, against an incumbent bill of $0.28–1.10), and the corridor is sited to fill its transmit envelope on day one (94 per cent, against 61 for a demand-matched build), which cuts fleet capital per delivered watt from **$1.89 to $1.40**.
**Why:** The causal claim is exactly backwards, and the model says so. The community layer is sold at $0.28 (feeder-head) and $0.25 (greenfield) against delivered costs of $0.363 and $0.434. It sells **below its own cost on every kilowatt-hour**, and contributes **−$1.51M/yr of margin over delivered cost** — a drag, funded by the anchors (+$1.21M/yr) and by a $1.20M/yr sovereign service line with no named counterparty. Community pricing did not lift the return; it suppressed it. Note also that the greenfield tariff of $0.25 sits BELOW the '$0.26–0.30' band this sentence claims, and that removing the fo
**Replace with:** That target is not cleared on a discounted basis (see the IRR note above). What the fully-populated, envelope-filling build does deliver is a lower fleet capital per delivered watt — **$1.40 against $1.89** for a demand-matched build, from the same six airframes — and an anchor layer that covers its cost. The community layer does not: sold at $0.25–0.28 against delivered costs of $0.36–0.43, it runs at roughly **−$1.5M/yr against its own cost of capital**, carried by the anchors and by the sovereign service overlay. That gap is the precise thing the concessional layer is for, and it is stated 

### private/dossier-aquila/executive-memo.md:14  ·  number-inconsistency
**Current:** What serves them instead is diesel: **$30–50 billion** a year of fuel, burned at **$0.30-plus** per kilowatt-hour, by towers and mines and households the wire will never reach.
**Why:** The thesis states $28–50 billion in seven places (§I, §II sourced to IFC [2], §VIII, the market-ladder table, Appendix E, Appendix F.6, RR5). The memo and the pre-NDA booklet both print $30–50 billion. These are the two documents that travel — the memo opens the bound dossier and the booklet goes out pre-NDA — so the mismatch is with the cited source and with every other document in the package.
**Replace with:** What serves them instead is diesel: **$28–50 billion** a year of fuel, burned at **$0.30-plus** per kilowatt-hour, by towers and mines and households the wire will never reach.

### private/dossier-aquila/executive-memo.md:20  ·  number-inconsistency
**Current:** The full conversion surface for one receiver — **541 kilowatts** delivered, enough for a town of five thousand — is one to two square metres of semiconductor.
**Why:** Transplanted arithmetic. investment-thesis.md:196 says "The full conversion surface for **a megawatt**, enough for a town of five thousand **at developed-economy household consumption**, is one to two square metres." The memo has swapped the article down to 541 kW but kept the megawatt's people-count and dropped the load-basis qualifier. On the thesis's own basis (200 W/person continuous) 541 kW serves ~2,700, not 5,000 — a 1.85x overstatement of people served per article, in the document that opens the bound Dossier. (The area survives: at Era II planning flux of 50–80 W/cm² and 50% module ef
**Replace with:** The full conversion surface for one receiver — **541 kilowatts** delivered, enough for a town of five thousand at the household loads these communities carry today — is one to two square metres of semiconductor.

### private/dossier-aquila/executive-memo.md:24  ·  contradiction
**Current:** Neither is solved. Both are cheap to attempt, which is why the first gate costs **$37 million** and the mission costs **$2.9 billion**, and why the **$37 million** comes first.
**Why:** "The first gate costs $37 million" is false and it contradicts the memo's own ask ten lines later ("The ask is **$30 million**"). $37M is not a gate cost: it is *cumulative exposure* before G1 — T1 at $30M (econ_model.py:67, DRAWS 2026–27 = $30M; CUM_DRAWN[0] = 0.030) plus the ~$7M already spent (booklet-pre-nda.md:64). The thesis never says a gate costs $37M; it says "Exposure is capped at $37 million before beam-powered flight is proven" (investment-thesis.md:82). A sovereign reader hits "first gate costs $37M / ask is $30M" and cannot reconcile them without the dossier.
**Replace with:** Neither is solved. Both are cheap to attempt, which is why total exposure stands at **$37 million** before beam-powered flight is proven and **$2.9 billion** across the mission, and why the **$37 million** comes first.

### private/dossier-aquila/executive-memo.md:32  ·  model-mismatch
**Current:** Then price it at its floor: no service contract ever signs, every salvage estimate halves. The median loss is **$116 million** against a programme capped at **$37 million** before the first gate, while the probability of a positive outcome stops falling at **12 per cent**, because that is simply the probability all four gates pass.
**Why:** Neither figure reproduces from sim/hostile_stacked.py, and the model is broken in a way that inverts its own logic. Running it: the STACKED HOSTILE case gives P(NPV>0) = **26.6%** and median loss-given-failure = **$204M**. The memo says 12% and $116M. Worse — 26.6% is HIGHER than the plain hostile prior's 18.5% (econ_model.py). Stacking three adverse assumptions IMPROVES the probability of a positive outcome. The component runs expose why: 'half-salvage only' returns P(NPV>0) = 37.0% and 'correlated gates only' 44.6%, both above the 18.5% base, and the branch table books a **failed G4 gate as 
**Replace with:** Then price it at its floor: no service contract ever signs, every salvage estimate halves. The median loss deepens to the low hundreds of millions on the branches that draw past the second gate, against a programme capped at **$37 million** before the first gate, while the probability of a positive outcome floors at roughly the probability all four gates pass. The stacked-hostile model is being re-run against the repriced corridor and its salvage treatment audited before these figures are restated; the figures previously printed here did not reproduce.

### private/dossier-aquila/investment-thesis.md:49  ·  stale-architecture
**Current:** So: *a 1 MW receiver at a community site, fed by an Era II relay.*
**Why:** BLOCKER. This is the nomenclature Callout — the definitional box for the whole document — and it names an object the architecture abolished four lines above it. The Callout has just said the receiver 'is fixed and always ships fully populated. Era II is 541 kW delivered — one PCSEL panel.' There is no 1 MW receiver anywhere in the finalised design: a 1 MW feeder-head site takes TWO 541 kW articles. The worked example contradicts the definition it is illustrating.
**Replace with:** So: *two 541 kW receivers at a feeder-head site, fed by an Era II relay.*

### private/dossier-aquila/investment-thesis.md:72  ·  number-inconsistency
**Current:** at $0.359 at a feeder-head community site and $0.434 at a greenfield village ramping into its article
**Why:** The feeder-head number is printed three different ways in the same document and matches the model in none of them: $0.359 here and at lines 636, 682, 723, 1354, 1347, 2399; 'roughly $0.36' at line 715; and **$0.365** at line 725. corridor_model.py — the declared artefact of record, whose own docstring says 'if it disagrees with the thesis, the thesis is wrong' — computes $0.3626. The validation harness only PASSes because its tolerance on this row is ±0.006, wide enough to swallow the discrepancy. Fix the document to $0.363 everywhere, and tighten the tolerance to ±0.002 so the harness cannot 
**Replace with:** at $0.363 at a feeder-head community site and $0.434 at a greenfield village ramping into its article

### private/dossier-aquila/investment-thesis.md:156  ·  unsupported-claim
**Current:** The energy is not scarce. Sub-Saharan Africa receives more solar irradiance than any other region on Earth.
**Why:** False, graded [Measured] (the tag closes the sentence's paragraph), and falsifiable by one search. The highest measured surface irradiance on Earth is in the Atacama Desert — which is this document's own number-one ranked corridor (line 1937). The Arabian Peninsula and the central Sahara also exceed Sub-Saharan means. The defensible published claim (IEA, Africa Energy Outlook) is about resource richness relative to installed capacity, not a global maximum. A diligence team that catches the package overstating a fact it did not need to overstate will re-price every other [Measured] tag.
**Replace with:** The energy is not scarce. Sub-Saharan Africa holds some of the richest solar resources on Earth and almost none of the world's installed photovoltaic capacity.

### private/dossier-aquila/investment-thesis.md:423  ·  unsupported-claim
**Current:** The Era II transition to ~$0.70 rides concentration amortisation plus the same faster-epitaxy and substrate-reuse learning the space photovoltaic industry is already funding for its own reasons **[Validated precedent]**.
**Why:** [Validated precedent] means 'established by a third party in a comparable regime'. No third party has demonstrated a III-V receiver at $0.70/W. This is a 21× cost reduction from the stated Era I hand-build price ($15/W), and it is the v_r input on which every delivered-cost figure in Section VIII rests. The package's own verification layer contradicts the grade: engineering-blueprint.md line 100 (TRL table) says of the HCPV receiver 'nearest published bottom-up is NREL's ~$0.65/Wp for an on-sun Fresnel CPV module at *2015* capability: transfer to a liquid-cooled monochromatic receiver is a gat
**Replace with:** The Era II transition to ~$0.70 rides concentration amortisation plus the same faster-epitaxy and substrate-reuse learning the space photovoltaic industry is already funding for its own reasons. The learning mechanism is third-party and running; the $0.70 point itself is not a solved cost, and it is gated on Era I anchor volumes **[Projection—gated]**.

### private/dossier-aquila/investment-thesis.md:682  ·  model-mismatch
**Current:** At a greenfield village the fixed 541 kW receiver delivers at **$0.434 per kilowatt-hour against $0.381** for a perfectly demand-matched one: five cents, or fourteen per cent. At a feeder-head site with a real megawatt of load, two fully-populated articles deliver at **$0.359 against $0.348**: one cent. Site where the demand already is, and the premium is three per cent, not fourteen.
**Why:** The greenfield half reproduces ($0.434 / $0.381, 13.9%). The feeder-head half does not. corridor_model.py gives the fixed article at $0.3626 and the demand-matched counterfactual at $0.3599 — a premium of 0.28 cents, or 0.8 per cent. Neither $0.359, nor $0.348, nor 'one cent', nor 'three per cent' is what the model prints. This is the paragraph that justifies the entire brownfield-first siting doctrine, and every figure in its second half is wrong (in the argument's favour, which is worse — a reader who rebuilds it will assume the error was deliberate).
**Replace with:** At a greenfield village the fixed 541 kW receiver delivers at **$0.434 per kilowatt-hour against $0.381** for a perfectly demand-matched one: five cents, or fourteen per cent. At a feeder-head site with a real megawatt of load, two fully-populated articles deliver at **$0.363 against $0.360**: a third of a cent. Site where the demand already is, and the premium is under one per cent, not fourteen.

### private/dossier-aquila/investment-thesis.md:682  ·  number-inconsistency
**Current:** At a feeder-head site with a real megawatt of load, two fully-populated articles deliver at **$0.359 against $0.348**: one cent. Site where the demand already is, and the premium is three per cent, not fourteen.
**Why:** The model does not produce these numbers. `corridor_model.py` gives the feeder-head site lcoe=$0.3626 and lcoe_counterfactual=$0.3599. The document has printed the COUNTERFACTUAL ($0.360) as the delivered cost ($0.359) and invented a counterfactual ($0.348) that appears nowhere. The premium is 0.74%, not 3%. The model's own VALIDATION entry (line 226) carries a 0.006 tolerance, which is exactly wide enough to let the wrong number PASS — so the self-validating artefact is currently endorsing an error. A reader who reruns it and prints `s.lcoe()` finds this in one line. This is the argument's sh
**Replace with:** At a feeder-head site with a real megawatt of load, two fully-populated articles deliver at **$0.363 against $0.360**: a third of a cent. Site where the demand already is, and the premium is under one per cent, not fourteen.

### private/dossier-aquila/investment-thesis.md:686  ·  model-mismatch
**Current:** Across the reference corridor the fixed article carries about **$2.45 million** of idle aperture and releases about **$11 million** of transmit capacity that a demand-matched set would have stranded. The standardisation is not a tax paid for simplicity. It is the cheaper side of a trade.
**Why:** Neither number reproduces. Summing idle aperture across the reference corridor in corridor_model.py gives 3.363 MW at a class-weighted v_rx of $2.372M — not $2.45M. The $11M 'released transmit capacity' is computed nowhere in the model at all; the only defensible reconstruction (3.363 MW idle × the stated $2.00/W transmit cost) gives $6.73M. This pair of figures is the whole economic justification for the fixed-article architecture, and it is the one claim in Section VIII that the artefact of record cannot rebuild. Either add the derivation to corridor_model.py or restate to what the model giv
**Replace with:** Across the reference corridor the fixed article carries about **$2.37 million** of idle aperture and releases about **$6.7 million** of transmit capacity that a demand-matched set would have stranded. The standardisation is not a tax paid for simplicity. It is the cheaper side of a trade.

### private/dossier-aquila/investment-thesis.md:705  ·  stale-architecture
**Current:** The relay fleet and the ground-station balance of plant are truly lumpy: $24.7 million, forty-six per cent of the corridor, committed on day one and indivisible. There is no fraction of an airframe and no half of a beam director. The laser panel layer is coarsely stageable, in 1.9 MW optical steps of roughly 541 kilowatts delivered. Only the receiver and conversion layer, twenty-one per cent, stages finely.
**Why:** $24.7M / $64.48M = 38.3%, not 46%. Forty-six per cent is $24.7M / $53.7M — the SUPERSEDED corridor capital. This is a direct fingerprint of the pre-repricing model surviving into the shipped text. The finely-staged receiver-and-conversion layer is $16.46M / $64.48M = 25.5%, not 21%.
**Replace with:** The relay fleet and the ground-station balance of plant are truly lumpy: $24.7 million, thirty-eight per cent of the corridor, committed on day one and indivisible. There is no fraction of an airframe and no half of a beam director. The laser panel layer is coarsely stageable, in 1.9 MW optical steps of roughly 541 kilowatts delivered. Only the receiver and conversion layer, twenty-six per cent, stages finely.

### private/dossier-aquila/investment-thesis.md:717  ·  stale-architecture
**Current:** against the $0.15 this model assumes **[Measured—incumbent tariffs; Appendix F.6]**. That is revealed willingness to pay at two to seven times the modelled tariff.
**Why:** BLOCKER. This is the superseded revenue instrument, still printed. The finalised architecture sells the community layer at measured willingness-to-pay ($0.26–0.30), not at Nigeria's Band A ($0.15) — and the very next page (line 723) says so explicitly: 'Band A is not the instrument this business runs on… a corridor sold into Band A loses money on every unit.' corridor_model.py prices the feeder head at $0.28 and the greenfield at $0.25. A chief of staff reading §VIII in order is told, six lines apart, that the model assumes $0.15 and that $0.15 loses money on every unit. It reads as an unrecon
**Replace with:** against the $0.26–0.30 this corridor charges **[Measured—incumbent tariffs; Appendix F.6]**. That is revealed willingness to pay at one to four times the tariff the corridor bills.

### private/dossier-aquila/investment-thesis.md:725  ·  number-inconsistency
**Current:** At a fifteen per cent non-technical loss the feeder-head site delivers at **$0.365 per kilowatt-hour on billed energy**, against an incumbent between $0.28 and $1.10.
**Why:** The same quantity — feeder-head delivered cost on billed energy after the 15% NTL haircut — is printed as $0.359 (§I line 72, §VIII lines 636/682/723, Appendix B.2 table, Appendix J) and as $0.365 here, ten lines apart in the same section. The model returns $0.363. Two different numbers for one figure is the worst class of defect in this package; three is fatal. Standardise on the model's $0.363 everywhere ($0.359 currently only survives corridor_model.py's ±0.006 tolerance).
**Replace with:** At a fifteen per cent non-technical loss the feeder-head site delivers at **$0.363 per kilowatt-hour on billed energy**, against an incumbent between $0.28 and $1.10.

### private/dossier-aquila/investment-thesis.md:727  ·  stale-architecture
**Current:** Gate D measures capacity factor against *populated* capacity, not against the certified envelope, because a gate measured against a nameplate a site is not yet meant to fill tests arithmetic rather than demand.
**Why:** BLOCKER. 'Populated capacity vs certified envelope' is the vocabulary of the rejected cassette architecture, where a receiver could be partially populated. Under the finalised article there is no such distinction — every article ships fully populated, so populated capacity IS installed nameplate. Worse, it contradicts the actual gate three paragraphs later: D-1 measures 'capacity factor ≥40 per cent against installed nameplate'. The paragraph that introduces Gate D describes a gate the document does not have.
**Replace with:** Gate D measures the two site classes on two different instruments, because they are deliberately different animals: a brownfield site against its installed nameplate, which its day-one load is meant to fill, and a greenfield site against the demand-matched receiver it would otherwise have been built with, because measuring a designed-in over-build against nameplate tests the design decision rather than the demand.

### private/dossier-aquila/investment-thesis.md:751  ·  number-inconsistency
**Current:** The worked reference corridor is **anchor-weighted**: ~91 per cent of corridor revenue from telecom clusters ($0.35/kWh, at the rate their power contractors already charge), mining and industrial off-take ($0.22/kWh, at long-term contract rates), and a sovereign service overlay, with community retail a growing minority.
**Why:** BLOCKER — two independent numbers fail to rebuild. (1) The 91% does not reproduce: corridor_model.py gives towers $4.20M + mining $4.03M + sovereign $1.20M = $9.43M of $13.36M = 71%, with community retail at 29% (feeder-head $3.13M + greenfield $0.80M). The 91% is the pre-feeder-head corridor. This is load-bearing: §XI and RR9 both rest 'roughly nine-tenths of a corridor's income' on it as the answer to demand risk. (2) The tower tariff is $0.30 in the model and in the Blueprint P&L (2.0 MW × 80% CF × 8,760 = 14.0 GWh × $0.30 = $4.2M); at $0.35 corridor revenue would be $14.06M, not $13.36M. S
**Replace with:** The worked reference corridor is **anchor-weighted**: ~71 per cent of corridor revenue from telecom clusters ($0.30/kWh, inside the $0.20–0.35 band their power contractors already charge), mining and industrial off-take ($0.22/kWh, at long-term contract rates), and a sovereign service overlay, with community retail the remaining 29 per cent.

### private/dossier-aquila/investment-thesis.md:751  ·  model-mismatch
**Current:** The worked reference corridor is **anchor-weighted**: ~91 per cent of corridor revenue from telecom clusters ($0.35/kWh, at the rate their power contractors already charge), mining and industrial off-take ($0.22/kWh, at long-term contract rates), and a sovereign service overlay, with community retail a growing minority.
**Why:** The anchor share is stated three ways: 91% (thesis §VIII), 78% (blueprint §10A.4 line 537), and the model returns 70.6% (towers $4.20M + mining $4.03M + sovereign $1.20M = $9.43M of $13.36M). Community retail (feeder-head $3.13M + greenfield $0.80M) is 29.4%, not 9%. Same paragraph also carries the stale $0.35 tower tariff. This number is quoted in the risk register and Appendix K as well, so it is load-bearing for the demand-risk defence.
**Replace with:** The worked reference corridor is **anchor-weighted**: ~71 per cent of corridor revenue from telecom clusters ($0.30/kWh, at the rate their power contractors already charge), mining and industrial off-take ($0.22/kWh, at long-term contract rates), and a sovereign service overlay, with community retail a growing minority.

### private/dossier-aquila/investment-thesis.md:753  ·  number-inconsistency
**Current:** On that basis a 400-kilometre corridor earns **~$13.4M/yr of revenue** and **~$7.7M/yr of operating profit** *after* the source-energy, insurance, and airframe-attrition provisions. Split evenly, the operator earns **~7.6 per cent unlevered** on its ~$53M and Aquila **~28.5 per cent** on its $13.5M **[Derived—Appendix B-2]**.
**Why:** Two defects in one sentence. (1) '~$53M' does not reconcile: corridor_model.py gives operator_capital = $50.98M, and the thesis's own returns table (line 1446) and the blueprint (line 549) both say ~$51.0M. (2) '~7.6 per cent unlevered' is a cash yield presented as a return; the true unlevered IRR over the model's 15-year asset life is 1.6%. The [Derived] grade certifies arithmetic that the artefact of record does not produce.
**Replace with:** On that basis a 400-kilometre corridor earns **~$13.4M/yr of revenue** and **~$7.7M/yr of operating profit** *after* the source-energy, insurance, and airframe-attrition provisions. Split evenly, the operator earns a **~7.6 per cent unlevered cash yield** on its ~$51.0M (a ~5.6 per cent IRR on a 25-year book life) and Aquila **~28.5 per cent** on its $13.5M **[Derived—Appendix B-2]**.

### private/dossier-aquila/investment-thesis.md:859  ·  unsupported-claim
**Current:** The revenue path underneath is the mission ramp of Appendix B, reaching 150 TWh/yr by 2040 and the billion-person envelope by ~2050, at tariffs declining from $0.40 to $0.04 per kilowatt-hour as the eras mature.
**Why:** This is the largest unreconciled claim in the package, and it sits in one subordinate clause of a method paragraph. The entire §IX valuation (6.1×, +$2.4B, hostile P90 +$2.17B) rests on the B.4 ramp, whose 2045 and 2050 tariffs are $0.05 and $0.04/kWh. The lowest delivered cost this document computes anywhere is the Era III+ backbone at $0.10–0.12/kWh (§VIII, Appendix B.2). So the valuation's terminal decade assumes the network operator sells at a third of the cheapest cost the document derives, and no cost figure below $0.10 exists anywhere in it. Separately, `econ_model.py`'s ANCHORS are har
**Replace with:** The revenue path underneath is the mission ramp of Appendix B, reaching 150 TWh/yr by 2040 and the billion-person envelope by ~2050, at blended tariffs declining from $0.40 to $0.04 per kilowatt-hour as the eras mature. State the boundary of that path plainly. Its late-period tariffs sit below every delivered-cost figure this document computes: the lowest is the Era III+ backbone at $0.10–0.12/kWh (Section VIII). The 2045 and 2050 rows of B.4 therefore assume the cost curve runs on past the end of the modelled one, and they are graded **[Projection—no gate]**. A reader who strikes them is read

### private/dossier-aquila/investment-thesis.md:869  ·  unsupported-claim
**Current:** The reference-class-forecasting literature says founder gate estimates for first-of-a-kind hardware run optimistic, so the bet is priced a second time under an adversary's assumptions: 20,000 simulated paths with every gate prior haircut to reference-class levels (~0.78/0.58/0.48/0.55, a full-mission product of ~12 per cent, versus the programme's ~29), volume at a half-speed median ramp, tariffs sampled at 0.7–1.1× plan, and cash conversion sampled at 50–70 per cent of operating profit. Method and code in Appendix C.
**Why:** THE STRUCTURAL GAP, AND IT MUST BE DISCLOSED RATHER THAN PAPERED OVER. econ_model.py reproduces §IX exactly (P(NPV>0) 18.5%, P90 +$2.17B), but it NEVER imports or reads corridor_model.py. Its EBITDA anchors are top-down (B.4: TWh × tariff × margin), with no traceable derivation from the corridor unit that now sits underneath the programme. I tested the flow-through directly: P90 is near-linear in the anchor scale k (k=1.0→+$2.17B; k=1.254→+$2.92B), so ANY restated P90 is merely a restatement of an assumed k — and the package documents no k. Meanwhile P(NPV>0) is gate-driven and does not move a
**Replace with:** The reference-class-forecasting literature says founder gate estimates for first-of-a-kind hardware run optimistic, so the bet is priced a second time under an adversary's assumptions: 20,000 simulated paths with every gate prior haircut to reference-class levels (~0.78/0.58/0.48/0.55, a full-mission product of ~12 per cent, versus the programme's ~29), volume at a half-speed median ramp, tariffs sampled at 0.7–1.1× plan, and cash conversion sampled at 50–70 per cent of operating profit. Method and code in Appendix C.

One disclosure, stated once and stated plainly. This simulation runs on the

### private/dossier-aquila/investment-thesis.md:889  ·  model-mismatch
**Current:** A reader is entitled to ask what happens when the adversary's assumptions are not run one at a time but **all at once**: the service contract never signs, every salvage estimate is halved, and the gates are allowed to correlate.
**Why:** The printed Prior 3 numbers (12.0% / $116M / −$0.12B) are `econ_model.py --stress zero-service,half-salvage` — TWO stresses. Running all three (adding `correlated`) gives P(NPV>0) = 23.8%, median LGF $115M, median NPV −$0.11B. Correlation RAISES P(NPV>0) — the thesis itself says so at line 901 — so it cannot be part of a 'floor'. The paragraph also destroys its own argument at line 895 ('it floors at 12.0 per cent, and 12.0 per cent is exactly the gate product'), which only holds under independence. Appendix C.6 (line 1614) and booklet-pre-nda.md (line 108) both correctly describe two stresses
**Replace with:** A reader is entitled to ask what happens when the adversary's assumptions are not run one at a time but **all at once**: the service contract never signs, and every salvage estimate is halved.

### private/dossier-aquila/investment-thesis.md:997  ·  contradiction
**Current:** And the beam itself, at the powers this architecture already delivers, is a soft-kill instrument: it does not need to destroy a drone, only to disrupt the guidance holding it stable **[Projection—gated; the weapon question is answered in full at Section VII and Appendix H]**.
**Why:** This contradicts Section VII outright. Line 539 states: 'The beam cannot engage a target that is not asking for power... There is no fire-control path to an uncooperative object because there is no path to any object that has not consented.' A hostile drone is by definition an object that has not consented. Both claims cannot be true of the same article. The document's own resolution — the ring-fenced defence licensee with a different optical front end and different signed firmware (line 1003) — arrives six paragraphs later, and never says that the directed-energy payload is a DIFFERENT ARTICL
**Replace with:** And a directed-energy payload is a separate article, built and licensed inside the ring-fenced defence entity described below: a different optical front end, different signed firmware, and no path back into the corridor programme. The Lightway corridor beam is not that article and cannot become it. The corridor transmitter arms only on a cryptographically signed cooperative beacon and has no fire-control path to an object that has not consented (Section VII). What the two share is the platform and the power, never the beam **[Projection—gated; the weapon question is answered in full at Section

### private/dossier-aquila/investment-thesis.md:1446  ·  model-mismatch
**Current:** | **Project / ground (SPV)** | ~$51.0M ground stack incl. corridor infrastructure and the third ingress station, ~$4.2M/yr at year 5 | ~7.6% IRR |
**Why:** This is not an IRR. corridor_model.py computes `op_irr = (ebitda/2)/operator_capital` — a first-year cash-on-cash yield with no cash-flow schedule, no ramp, and no terminal value. A yield equals an IRR only in perpetuity. Discounting the same level annuity (EBITDA/2 = $3.85M/yr) against $50.98M over the model's OWN declared asset life (CRF = 12% real over 15 years) gives a true unlevered IRR of 1.61%. Even at 25 years it is 5.64%; at 30 years, 6.37%. It never reaches 7.6%. The Aquila line survives (true 15y IRR 27.8% vs 28.5% printed) because high yields converge, but the operator line — the n
**Replace with:** | **Project / ground (SPV)** | ~$51.0M ground stack incl. corridor infrastructure and the third ingress station, ~$4.2M/yr at year 5 | ~7.6% unlevered cash yield (steady-state EBITDA share / capital); ~5.6% IRR on a 25-year book life |

### private/dossier-aquila/investment-thesis.md:1447  ·  model-mismatch
**Current:** |—with 30% concessional layer (2%, 20-yr) | commercial tranche ~$37M | **~10.2% IRR** |
**Why:** corridor_model.py:178 computes this as `(ebitda/2)/(operator_capital*0.7) - 0.006` — the cash yield divided by the equity fraction, minus a hand-placed 60-basis-point constant with no derivation. The actual interest drag of a 30% tranche at 2% against the equity base is 0.86%, not 0.60%. More decisively: rebuilt as a real equity IRR with the concessional tranche amortising over 15 years at 2%, the operator's return is **1.44%**, not 10.2%. Leverage does not rescue an asset whose unlevered IRR is below the cost of the debt. The claim on blueprint:549 that this 'clears the ≥8–9 per cent target t
**Replace with:** |—with 30% concessional layer (2%, 20-yr) | commercial tranche ~$37M | **~10.2% year-1 levered cash yield; ~1.4% equity IRR (15-yr amortising)** |

### private/dossier-aquila/investment-thesis.md:1602  ·  stale-architecture
**Current:** | Success-branch IRR (P10 / P50 / P90) | ~25% / **~33%** / ~41% |
**Why:** The programme Monte Carlo (sim/econ_model.py) is fully decoupled from the corridor economics it is supposed to aggregate: it carries no tariff, no LCOE, no corridor P&L, no link to corridor_model.py. Its hostile P90 of +$2.17B and its success-branch IRR distribution were built against the superseded corridor — before the receiver became a fixed article, before the anchor band moved from $0.17–0.19 to $0.20–0.24, and before the chain-capex and firm-capacity errors above are corrected. Every number in Section IX and Appendix C is therefore a valuation of a corridor that no longer exists. This is
**Replace with:** | Success-branch IRR (P10 / P50 / P90) | ~25% / **~33%** / ~41% **[STALE — pending re-run]** |

**Re-run notice, stated rather than buried.** The programme Monte Carlo behind this table (`sim/econ_model.py`) is not yet coupled to the site-and-corridor model (`sim/corridor_model.py`). It was parameterised against the superseded corridor — the demand-matched receiver, the $0.17–0.19 anchor band, and a chain-capex allocation the repriced corridor no longer supports. Every figure in this section, including the hostile P90 of +$2.17B, is therefore a valuation of an architecture this document has al

### private/dossier-aquila/investment-thesis.md:2518  ·  contradiction
**Current:** At the corridor, modularity is not the answer at all: even staging every laser panel, about eighty-five per cent of corridor capital commits before community demand is proven.
**Why:** §VIII line 707 says 'about sixty-four per cent' for the identical quantity; the model returns 62.8%. 85% is the *no-staging* figure (capital less community site capex = $53.3M/$64.5M). Appendix K exists to answer the sceptic; a number that contradicts the body's own answer by 21 points is the first thing an adversarial reader will quote back.
**Replace with:** At the corridor, modularity is not the answer at all: even staging every laser panel, about sixty-three per cent of corridor capital commits before community demand is proven.

### private/dossier-aquila/investment-thesis.md:2520  ·  contradiction
**Current:** Gate D makes capacity factor ≥25 per cent against installed nameplate, delivered energy ≥700 MWh per site in year two, and collection ≥85 per cent a precondition of community-scale T4 drawdown.
**Why:** This is the superseded single-limb Gate D and it directly contradicts §IX (lines 838–844), which defines two limbs: D-1 brownfield at ≥40% against installed nameplate within twelve months, and D-2 greenfield at ≥25% against *demand-matched reference capacity* (not nameplate), plus ≥700 MWh in year two and ≥10% YoY growth. §IX explicitly argues that measuring a greenfield article against nameplate "tests the design decision, not the demand" — which is exactly what this sentence does. The gate is what the T4 money hinges on; it cannot be stated two ways.
**Replace with:** Gate D has two limbs. D-1 holds brownfield and feeder-head sites to capacity factor ≥40 per cent against installed nameplate within twelve months of energisation. D-2 holds greenfield sites to ≥25 per cent against demand-matched reference capacity, delivered energy ≥700 MWh in the second year, and year-on-year energy growth ≥10 per cent. Both carry collection ≥85 per cent, and both are a precondition of community-scale T4 drawdown.

### private/dossier-aquila/package/booklet-pre-nda.md:20  ·  number-inconsistency
**Current:** What serves them is diesel: **$30–50 billion** a year of fuel, burned at **$0.30**-plus per kilowatt-hour, by towers and mines and households the wire will never reach.
**Why:** Same defect as the memo, in the document that travels furthest. The thesis and its IFC citation carry $28–50 billion.
**Replace with:** What serves them is diesel: **$28–50 billion** a year of fuel, burned at **$0.30**-plus per kilowatt-hour, by towers and mines and households the wire will never reach.

### private/dossier-aquila/package/booklet-pre-nda.md:35  ·  number-inconsistency
**Current:** The full conversion surface for one receiver — **541 kilowatts** delivered, enough for a town of five thousand — is one to two square metres of semiconductor. A small table, under a beam of light.
**Why:** Same defect as executive-memo.md:20, in the document that travels furthest. The "town of five thousand" is the thesis's figure for **a megawatt at developed-economy household consumption** (investment-thesis.md:196), not for the 541 kW article. Unqualified, it overstates people-per-article by 1.85x on the thesis's own stated basis.
**Replace with:** The full conversion surface for one receiver — **541 kilowatts** delivered, enough for a town of five thousand at the household loads these communities carry today — is one to two square metres of semiconductor. A small table, under a beam of light.

### private/dossier-aquila/package/booklet-pre-nda.md:35  ·  model-mismatch
**Current:** The full conversion surface for one receiver — **541 kilowatts** delivered, enough for a town of five thousand — is one to two square metres of semiconductor. A small table, under a beam of light.
**Why:** CONFIRMED. Both figures belong to the megawatt receiver, not the 541 kW article. Appendix A.3 (investment-thesis.md:1236) gives 1.0–2.0 m² of cell for 1 MW delivered at the 50–100 W/cm² design flux; 541 kW is 0.54–1.08 m². investment-thesis.md:196 attaches 'a town of five thousand' to a megawatt AND qualifies it 'at developed-economy household consumption' — the booklet kept the population, dropped the qualifier, and swapped the power. Scaled on the thesis's own basis, 541 kW is ~2,700 people; on the package's named Modern Energy Minimum (1,000 kWh/person/yr), 541 kW at 50% CF is 2.37 GWh/yr =
**Replace with:** The full conversion surface for one receiver — **541 kilowatts** delivered, enough for a village of two thousand at the Modern Energy Minimum — is half a square metre to one square metre of semiconductor. A small table, under a beam of light.

### private/dossier-aquila/package/booklet-pre-nda.md:49  ·  contradiction
**Current:** Neither is solved. Both are cheap to attempt. That is why the first gate costs **\$37 million**, the mission costs **\$2.9 billion**, and the **\$37 million** comes first.
**Why:** Same defect as executive-memo.md:24. "The first gate costs $37 million" contradicts booklet-pre-nda.md:114 ("First capital of approximately **$30 million**, against Tranche 1") and misstates the thesis, which frames $37M as the cumulative exposure cap before beam-powered flight is proven (investment-thesis.md:82), being T1's $30M plus the ~$7M already spent that this same booklet cites at line 64.
**Replace with:** Neither is solved. Both are cheap to attempt. That is why exposure before the first gate is **\$37 million**, the mission costs **\$2.9 billion**, and the **\$37 million** comes first.

### private/dossier-aquila/package/booklet-pre-nda.md:84  ·  number-inconsistency
**Current:** The mission is a **$100**-billion-a-year transmission class serving the populations the wire never reached.
**Why:** Contradicts the booklet six lines later (line 90: "toward the **$60–100 billion** access gap") and the thesis, which puts the Era III addressable market at $60–100B/yr and reserves $100B–1T/yr for the intercontinental tier beyond it (investment-thesis.md:785, 789, 1391). The section headline takes the top of a band as a point figure. It is the first number a forwarded reader sees in the market section, and it is the one they will check.
**Replace with:** The mission is a **$60–100**-billion-a-year transmission class serving the populations the wire never reached, and the far larger number it reached and abandoned.

### private/dossier-aquila/package/booklet-pre-nda.md:116  ·  contradiction
**Current:** The instrument is an option chain on the largest unserved market on Earth, with the downside of a seed round and the mission of an Apollo programme.
**Why:** The closing line of the document that travels furthest asserts a downside the thesis does not support. The thesis's stacked-hostile floor prints a **median loss-given-failure of $116 million** (investment-thesis.md:891, 893, 903, 1621) — reproduced by econ_model.py — and the executive memo states that $116M figure explicitly. A pre-NDA reader sold "the downside of a seed round" who then reads either the memo or §IX has been sold a different company. What *is* seed-sized is the exposure before the first gate ($37M), which is the defensible claim and the one the thesis actually makes.
**Replace with:** The instrument is an option chain on the largest unserved market on Earth, with an exposure before the first gate the size of a seed round and the mission of an Apollo programme.

### private/dossier-aquila/sim/corridor_model.py:63  ·  model-mismatch
**Current:** CHAIN_CAPEX = 4.00     # $/W delivered — transmitter + relay share allocated to the site
**Why:** Every delivered cost the thesis prints is computed with this constant, and it does not reconcile with the corridor the same file prices. The reference corridor's non-site capital is $42.5M (relay $12.0M + GS balance-of-plant $12.7M + panel layer $12.8M + infrastructure $5.0M) against 8.55 MW of day-one load: $4.97/W — 24% above the $4.00/W the LCOEs charge. Even at the full 9.06 MW transmit envelope it is $4.69/W. So the constant is understated on every basis the corridor supports. Re-run at $4.97/W: mining anchor $0.202→$0.228, tower cluster $0.237→$0.262, feeder-head $0.363→$0.409, greenfiel
**Replace with:** # Transmitter + relay capital allocated per delivered watt. DERIVED, not declared: it is the
# reference corridor's own non-site capital over the load it actually serves. Declaring it
# independently is what let the site LCOEs and the corridor capital stack drift apart.
#   day-one basis:    $42.5M / 8.55 MW load     = $4.97/W   <- the honest first-corridor number
#   full-envelope:    $42.5M / 9.06 MW envelope = $4.69/W   <- only once the greenfield ramp lands
# A mature multi-corridor fleet amortises the ground station over more load and trends lower;
# that is an Era III claim and must not 

### private/dossier-aquila/sim/corridor_model.py:177  ·  model-mismatch
**Current:**     op_irr = (ebitda / 2) / operator_capital
    op_blend = (ebitda / 2) / (operator_capital * 0.7) - 0.006   # 30% concessional at 2%
    aq_irr = (ebitda / 2) / AQUILA_CAPITAL
**Why:** THE LARGEST DEFECT IN THE PACKAGE. These are FIRST-YEAR CASH YIELDS on flat undiscounted cash, labelled 'IRR' and printed as 'unlevered return' everywhere downstream. A yield equals an IRR only in perpetuity. Discounting the model's own flat operator flow (EBITDA/2 = $3.853M/yr) against $50.98M over the asset life the model itself declares (CRF=0.14682 = 12% real over 15 years) gives a true unlevered IRR of 1.61%. Over 20 years: 4.30%. Over 25: 5.64%. It never reaches 7.6%. The Aquila row survives (true 15y IRR 27.8% vs 28.5% printed) only because high yields converge fast — which is exactly w
**Replace with:**     # NOTE ON WHAT THESE ARE. These are first-year CASH YIELDS on steady-state flows,
    # not internal rates of return. They are named `yield` so no reader can mistake them.
    # A yield equals an IRR only in perpetuity. Reported as an IRR they overstate the
    # operator's return by ~6 points; see op_irr_true below.
    op_yield = (ebitda / 2) / operator_capital
    op_blend_yield = (ebitda / 2) / (operator_capital * 0.7) - 0.0086  # 30% tranche @2%, true drag
    aq_yield = (ebitda / 2) / AQUILA_CAPITAL

    def _irr(cfs, lo=-0.99, hi=3.0):
        f = lambda r: sum(c / (1 + r) ** i for 

### private/dossier-aquila/sim/hostile_stacked.py:1  ·  model-mismatch
**Current:** #!/usr/bin/env python3
"""Stacked-hostile Monte Carlo — the run the thesis names but never prints.
**Why:** This file is superseded and broken, and the package invites advisors to run it. `python3 hostile_stacked.py` prints 'Calibrated salvage lumps ($B): {1: 0.0, 2: 0.0, 3: 0.0, 4: 0.0}' — the salvage calibration collapses to zero — and then reports a BASELINE hostile P(NPV>0) of 37.0% against the printed §IX value of 18.5%, and a stacked P(NPV>0) of 26.6% with a $204M LGF against the printed 12.0% / $116M. econ_model.py now carries all three stresses natively and reproduces §IX; this file only contradicts it. A sovereign fund's advisor who runs the sim/ directory top-to-bottom sees two of the doss
**Replace with:** #!/usr/bin/env python3
"""SUPERSEDED — DO NOT RUN. Retained for provenance only.

The stacked-hostile run is now a native stress in econ_model.py:

    python3 econ_model.py --prior hostile --stress zero-service,half-salvage

That is the artefact of record for Prior 3 (§IX, Appendix C.6). This file predates
the salvage-multiple rebuild: its calibration routine now returns zero lumps, and it
reports a baseline P(NPV>0) of 37.0% against the printed 18.5%. It reproduces nothing
in the thesis and must not be used to check it.

Original header follows.

Stacked-hostile Monte Carlo — the run the the


## HIGH

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:298  ·  stale-architecture
**Current:** At a feeder-head site the load fills the article and the premium is zero.
**Why:** Not true on the finalised architecture. A feeder head takes two 541 kW articles = 1.083 MW of aperture against a 1.0 MW day-one load, so 83 kW sits idle per site, and corridor_model.py prices the resulting premium at $0.363 against a demand-matched $0.360. The thesis (§VIII line 682) also states a positive premium. "Zero" is only true if the article were demand-matched, which is the architecture the package explicitly rejected.
**Replace with:** At a feeder-head site the load nearly fills the article — 1.0 MW against 1.083 MW of aperture — and the premium falls to three tenths of a cent, under one per cent.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:309  ·  stale-architecture
**Current:** Site capital: F + v·P (F = $0.30M/site; v = $1.90/W community, $0.71/W anchor in Era II, $1.05/W in Era III) [alloc—component-level build-up in sovereign dossier App G §VII].
**Why:** This is the single-v site formula the thesis explicitly repudiates: "A site does not cost a flat number of dollars per watt, and pricing it that way is what produced the earlier figure" (§VIII line 690). The finalised form is C = F + v_r·P_aperture + v_e·P_demand, with v_r = $0.70/W on the *fixed* aperture and v_e = $1.20/W on *metered demand* — the whole point being that the two scale off different P. F + v·P prices only the demand-matched counterfactual. The identical stale formula is carried in §9.4. (The $1.90 sum survives correctly in the crossover P* = F/(v_r+v_e) = 158 kW, which is fine
**Replace with:** Site capital: **C = F + v_r·P_aperture + v_e·P_demand** (F = $0.30M/site; v_r = $0.70/W on the fixed aperture, $0.30/W in Era III; v_e = $1.20/W on metered demand, $0.40/W at a mine gate). Crossover P* = F/(v_r+v_e) = 158 kW [alloc—component-level build-up in sovereign dossier App G §VII].

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:468  ·  number-inconsistency
**Current:** **Mission:** deliver firm anchor and community power across a 400 km corridor, from a curtailment-exposed solar/hydro source region to 17 receiver sites.
**Why:** The site list immediately below enumerates 6 tower clusters + 3 mining anchors + 3 feeder heads + 4 greenfield villages = 16 sites, and corridor_model.py prices 16 (the $0.30M fixed layer totals $4.8M). "17 sites" recurs at lines 515, 522, 553 and 562, including in the O&M staffing build-up and the wire comparator, so the error propagates into two cost lines.
**Replace with:** **Mission:** deliver firm anchor and community power across a 400 km corridor, from a curtailment-exposed solar/hydro source region to 16 receiver sites.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:537  ·  number-inconsistency
**Current:** | **Corridor total** | **46.7 GWh billed** | | **~$13.36M/yr: 78% anchor-grade** |
**Why:** A third value for the anchor share, in the table that computes it. The rows above sum: $4.2M + $4.0M + $1.2M anchor-grade = $9.4M of $13.36M = 71 per cent. (The thesis says 91 per cent; the model says 71.) The reader can do this division on the printed table.
**Replace with:** | **Corridor total** | **46.7 GWh billed** | | **~$13.36M/yr: 71% anchor-grade** |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/executive-memo.md:24  ·  contradiction
**Current:** Neither is solved. Both are cheap to attempt, which is why the first gate costs **$37 million** and the mission costs **$2.9 billion**, and why the **$37 million** comes first.
**Why:** Confirmed, with a corrected replacement. $37M is not the cost of a gate: it is cumulative exposure before G1 — the ~$7M already spent (investment-thesis.md:66; counted in the ROIC denominator at investment-thesis.md:1495) plus the $30M T1 tranche (econ_model.py DRAWS 2026-27). Everywhere else the corpus says exactly that: investment-thesis.md:82 ("Exposure is capped at $37 million before beam-powered flight is proven"), investment-thesis.md:1479 ("≤$37M before G1", total exposure, T0 included), and the memo's own line 30 ("Exposure is $37 million before beam-powered flight is proven") and line
**Replace with:** Neither is solved. Both are cheap to attempt, which is why exposure is capped at **$37 million** before the first gate and the mission costs **$2.9 billion**, and why the **$37 million** comes first.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:686  ·  unsupported-claim
**Current:** Across the reference corridor the fixed article carries about **$2.45 million** of idle aperture and releases about **$11 million** of transmit capacity that a demand-matched set would have stranded.
**Why:** Neither figure is produced by corridor_model.py, four lines after the document says "Every figure in this section is produced by sim/corridor_model.py... Run it. If it disagrees with this document, this document is wrong." The model's idle aperture is 3.363 MW × the era receiver price = $2.37M. The $11M has no derivation in the model at all: the idle aperture corresponds to 11.8 MW of *optical* panel capacity (3.363 × 3.509), which is $6.7M of transmit plant at the $2.00/W delivered price the same sentence quotes. "$11 million" looks like the 11.8 MW figure carried across with the wrong unit. 
**Replace with:** Across the reference corridor the fixed article carries about **$2.37 million** of idle aperture and keeps about **$6.7 million** of transmit plant fillable — the 3.36 MW of aperture, 11.8 MW optical, that a demand-matched set would have stranded.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:725  ·  contradiction
**Current:** At a fifteen per cent non-technical loss the feeder-head site delivers at **$0.365 per kilowatt-hour on billed energy**, against an incumbent between $0.28 and $1.10. 
**Why:** The document gives two different figures for the same quantity, ten lines apart: $0.359 "on billed energy" (line 715, and at §I:72, §VIII:636, B.2, J.3) and $0.365 "on billed energy" here. The model's single answer is $0.363 — the LCOE already carries the 15 per cent NTL haircut in the denominator, so there is no second, further-loaded figure to print. Whichever value the package settles on (see the finding at line 682), it must be one value.
**Replace with:** The fifteen per cent non-technical loss is already carried in the billed-energy denominator: the feeder-head site delivers at **$0.363 per kilowatt-hour on billed energy**, against an incumbent between $0.28 and $1.10. 

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:753  ·  number-inconsistency
**Current:** Split evenly, the operator earns **~7.6 per cent unlevered** on its ~$53M and Aquila **~28.5 per cent** on its $13.5M **[Derived—Appendix B-2]**.
**Why:** The operator's capital is $50.98M, not $53M: corridor capital $64.5M less Aquila's $13.5M. B-2.3 (line 1446) and Blueprint §10A.3/§10A.4 both print $51.0M. The 7.6 per cent only reconciles against $51.0M ($3.85M ÷ $50.98M); against $53M it is 7.3 per cent. The one line in §VIII that states the operator return states it against a denominator that does not produce it.
**Replace with:** Split evenly, the operator earns **~7.6 per cent unlevered** on its ~$51M and Aquila **~28.5 per cent** on its $13.5M **[Derived—Appendix B-2]**.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:897  ·  number-inconsistency
**Current:** **P(NPV>0) does not collapse. It floors at 12.0 per cent, and 12.0 per cent is exactly the gate product.**
**Why:** The gate product is 0.78 × 0.58 × 0.48 × 0.55 = 11.9 per cent, and econ_model.py returns 11.8 per cent on all three Prior 3 runs. The claim is that the decimal is meaningful — Appendix A0 says a decimal is carried "because it is the exact output of a declared model... Run it and you will get that number." Run it and you get 11.8. The stacked floor is the number the committee is invited to fund at; it should be the one number in the document that reproduces exactly. Same correction at line 891 (three occurrences) and the C.6 table at lines 1619–1621.
**Replace with:** **P(NPV>0) does not collapse. It floors at 11.9 per cent, and 11.9 per cent is exactly the gate product (11.8 per cent as the sampler returns it).**

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:1398  ·  stale-architecture
**Current:** *Success-path P&L, cash flow, and funding draws, 2026–2050, reconciled line-for-line with B.4, the Appendix C valuation, and the reference-class Monte Carlo. Model code (`financial_model.py`) is a data-room artefact; every row below reproduces from the declared assumptions of C.2.*
**Why:** Two problems. First, `financial_model.py` does not exist in the repository — sim/ holds corridor_model, econ_model, network_sim, equipment_stream, hostile_stacked and irr_update. Consigning the annual financial model to the data room contradicts the package's own posture (§VIII: "in the repository, not the data room"; C.3: "Model code is a repository artefact, not a data-room one"; A0: "the model ships with the dossier"). The one table an infrastructure investor rebuilds first is the one they cannot rebuild. Second, the reconciliation claim is now false in a specific way: the corridor was repr
**Replace with:** *Success-path P&L, cash flow, and funding draws, 2026–2050. The rows reproduce from the declared assumptions of C.2 and the B.4 ramp. **Standing reconciliation item:** the B.4 volume-and-tariff ramp, and the Appendix C Monte Carlo built on it, were fitted before the reference corridor was repriced (§VIII, `sim/corridor_model.py`). Re-running the programme model against the repriced corridor's anchor-community mix and delivered costs is the next update; the figures below and in C.6 should be read as pre-repricing until it lands. Model code ships with the dossier.*

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:1600  ·  number-inconsistency
**Current:** | Mean multiple on capital actually drawn (undiscounted) | **~3.8×** |
**Why:** econ_model.py returns 3.63× at the declared priors and seed, and 3.54–3.73× across seeds — the printed 3.8× sits outside the sampled range. The model's own drift check masks it: the tolerance on this statistic is ±0.25, wide enough to swallow the error while every other figure is checked to the decimal. The same 3.8× is asserted in §I line 86 ("the average return across every path is 3.8× the capital actually drawn") and §IX line 877, and must move with it. Fix the tolerance in econ_model.py (line 194) at the same time, or the model will keep certifying a number it does not produce.
**Replace with:** | Mean multiple on capital actually drawn (undiscounted) | **~3.6×** |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:1909  ·  contradiction
**Current:** - **I: tariff instrument.** Is there a named, in-force instrument that pays ≥$0.13/kWh for reliable supply — a Band A-class service-based tariff, an avoided-cost independent-power regime, SPUG/NPP, or an unregulated private market? Corridors that fail the instrument test carry anchors and no community layer.
**Why:** The screen admits corridors the business loses money on. §VIII line 723 is explicit: "$0.15 is what the utility is paid... A feeder-head site delivers at $0.359 per kilowatt-hour, so a corridor sold into Band A loses money on every unit." And falsifier F29 sets the test at "≥$0.26/kWh for reliable supply — the Era II feeder-head break-even, not the regulated retail band." The $0.13 threshold is the pre-repricing screen and it now contradicts both the body and its own falsifier: applied as written, it would sanction the community layer at half its delivered cost.
**Replace with:** - **I: tariff instrument.** Is there a named, in-force instrument or unregulated market price that pays ≥$0.26/kWh for reliable supply — the Era II feeder-head break-even, not the regulated retail band — through a Band A-class service-based tariff, an avoided-cost independent-power regime, SPUG/NPP, or private supply? Corridors that fail the instrument test carry anchors and no community layer.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:2695  ·  stale-architecture
**Current:** modular sites track demand instead of betting on it (RR9, gate D)
**Why:** Stale architecture inside the risk register. Sites are not modular: the receiver is a fixed, fully-populated, panel-matched article and "nothing inside the article changes, ever" (§VIII line 678). RR9, which this line cross-references, states the finalised position correctly. RR5 is describing the cassette architecture the package rejected, in the register a credit committee reads to check the responses match the design.
**Replace with:** the site is a fixed 541 kW article and capacity follows demand by article count, not by resizing the receiver to the load (RR9, gate D)

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:2707  ·  number-inconsistency
**Current:** corridor revenue is anchor-weighted (~91 per cent from telecom, mining and sovereign contracts)
**Why:** The model gives 71 per cent (tower $4.20M + mining $4.03M + sovereign $1.20M of $13.36M). The 91 per cent predates the three feeder-head sites that now carry $3.13M of community retail. RR9 is the register entry that answers the demand risk — quoting a nine-tenths anchor share it no longer has is the register overstating exactly the protection it exists to certify.
**Replace with:** corridor revenue is anchor-weighted (~71 per cent from telecom, mining and sovereign contracts)

### /Users/billy_j/age-of-wonders/private/dossier-aquila/package/booklet-pre-nda.md:20  ·  number-inconsistency
**Current:** What serves them is diesel: **$30–50 billion** a year of fuel, burned at **$0.30**-plus per kilowatt-hour, by towers and mines and households the wire will never reach.
**Why:** Same as executive-memo.md line 14: the thesis and the IFC source carry $28–50 billion. This is the shareable pre-NDA document — the number that travels furthest should be the number the dossier can defend.
**Replace with:** What serves them is diesel: **$28–50 billion** a year of fuel, burned at **$0.30**-plus per kilowatt-hour, by towers and mines and households the wire will never reach.

### private/dossier-aquila/design-network-operations.md:426  ·  model-mismatch
**Current:** Anchor-weighted, 91% contract-grade revenue, 13.0 MW installed nameplate, ~9.6 MW day-one load [alloc: blueprint §10A].
**Why:** HIGH. The design reviews are the package's verification layer — package-map.md says 'when a number is questioned, the matching design review's verdict register is the authority' — so a stale corridor here is worse than a stale corridor in the thesis. Every one of these three numbers is superseded: the repriced corridor is 71% anchor-grade, 11.9 MW installed nameplate (22 articles), 8.55 MW day-one load. All three reproduce from corridor_model.py; none of the printed three do.
**Replace with:** Anchor-weighted, 71% contract-grade revenue, 11.9 MW installed nameplate (22 articles), ~8.55 MW day-one load [alloc: blueprint §10A].

### private/dossier-aquila/design-pcsel-array.md:113  ·  contradiction
**Current:** | Optical output | 1.9 MW; acceptance ≥1.5 MW CW, Strehl ≥0.9, 24 h, WPE ≥55% | [alloc: gate P2] |
**Why:** The entire fixed-article architecture rests on 1.9 MW optical per panel: 1.9 ÷ 3.509 = 541 kW, the Era II receiver, and 10× that for Era III. But the panel's own qualification gate accepts a panel at **≥1.5 MW CW**. A panel that passes acceptance at the floor lands **427 kW**, not 541 kW — 21% short. The receiver article is fixed, fully populated, and qualified once, so a shortfall in panel output cannot be absorbed by re-sizing the receiver; it can only be absorbed by derating the site or by burning transmit capacity the corridor (at 94% fill) does not have. The design review that exists to V
**Replace with:** | Optical output | 1.9 MW nominal; acceptance ≥1.5 MW CW, Strehl ≥0.9, 24 h, WPE ≥55%. **Note the article coupling: the fixed 541 kW receiver is 1.9 MW ÷ 3.509. A panel accepted at the 1.5 MW floor lands 427 kW and cannot fill its article.** Panels binned below 1.8 MW are paired against a shared article or held to the spare pool; the corridor's transmit fill (94%) leaves no headroom to make the shortfall up from adjacent aperture. Closing acceptance at ≥1.8 MW is the P2 exit condition the receiver architecture actually requires. | [alloc: gate P2] |

### private/dossier-aquila/design-receiver-thermal.md:81  ·  stale-architecture
**Current:** At the planning basis (η_module = 0.50), waste heat at the cell plane equals delivered DC power: **25 kW site → 25 kW heat; 1 MW site → ~1.0 MW heat; 10 MW site → ~10 MW heat**, plus the protected-volume load of §3c (~10% of incident, ~100 kW at 1 MW).
**Why:** The receiver design review — the document whose entire job is to verify the receiver — sizes its thermal plant against 1 MW and 10 MW articles that no longer exist. The finalised articles are 541 kW (Era II, one PCSEL panel through the 3.509 chain) and 5.41 MW (Era III, one rack). Line 83 compounds it: 'A 1 MW receiver is, thermally, a 1.1 MW industrial cooling job.' The heat loads, the coolant sizing and the $/W thermal cost in §3a all descend from these two numbers. A reviewer who has read the architecture section and then opens the thermal review finds it verifying a different machine.
**Replace with:** At the planning basis (η_module = 0.50), waste heat at the cell plane equals delivered DC power: **25 kW Era I site → 25 kW heat; the 541 kW Era II article → ~541 kW heat; the 5.41 MW Era III article → ~5.4 MW heat**, plus the protected-volume load of §3c (~10% of incident, ~54 kW at the Era II article).

### private/dossier-aquila/design-receiver-thermal.md:203  ·  model-mismatch
**Current:** Real, bounded, and currently unbooked: blueprint §10A.2 carries chiller parasitics on the transmitter side, but no auxiliary line on the receiver or site side. Recommendation: add a site-auxiliary line (planning value 5%) to the corridor chain (new risk E15).
**Why:** HIGH — an open verdict against the headline economics, left unreconciled. The design review is the authority on its own subsystem (package-map.md:19), and it finds a 3–7% site-auxiliary parasitic that the corridor chain does not carry, worth +$0.011–0.026/kWh on the community sites and +$0.006–0.013 on the anchor band. corridor_model.py has no auxiliary term, so the printed $0.20–0.24 / $0.359 / $0.434 are all understated by the verification layer's own finding. Either book it in the model (anchor band → ~$0.21–0.25) or the thesis must declare the exclusion. Leaving the design review saying 'u
**Replace with:** Real, bounded, and now booked: blueprint §10A.2 carries chiller parasitics on the transmitter side; the site-auxiliary line (planning value 5% of delivered energy) is carried in the corridor chain and in `sim/corridor_model.py`, and the delivered costs of thesis §VIII are stated after it (risk E15, closed).

### private/dossier-aquila/engineering-blueprint.md:468  ·  number-inconsistency
**Current:** **Mission:** deliver firm anchor and community power across a 400 km corridor, from a curtailment-exposed solar/hydro source region to 17 receiver sites.
**Why:** HIGH. The site mix defined immediately below sums to 16 sites: ~6 tower clusters + 3 mining anchors + 3 feeder-head sites + 4 greenfield villages. corridor_model.py carries 16. The '17 sites' figure recurs at line 515 (capital stack), line 522 (the wire comparator, 'to the same 17 sites' — which sizes the $82–140M comparator and therefore the 1.2–2.1× claim), line 553 (O&M staffing), line 562 (deployment schedule) and design-network-operations.md:503. The comparator ratio is a headline number in the package; it should be built on the site count the corridor actually has.
**Replace with:** **Mission:** deliver firm anchor and community power across a 400 km corridor, from a curtailment-exposed solar/hydro source region to 16 receiver sites.

### private/dossier-aquila/engineering-blueprint.md:468  ·  stale-architecture
**Current:** **Mission:** deliver firm anchor and community power across a 400 km corridor, from a curtailment-exposed solar/hydro source region to 17 receiver sites.
**Why:** The reference corridor has 16 receiver sites: 6 tower clusters + 3 mining anchors + 3 feeder-heads + 4 greenfield villages. `corridor_model.py`'s reference_corridor() sums to 16. '17 sites' is stale and it recurs at lines 515, 522, 553 and 562, including in the wire comparator (which is therefore priced against a corridor with one more site than exists).
**Replace with:** **Mission:** deliver firm anchor and community power across a 400 km corridor, from a curtailment-exposed solar/hydro source region to 16 receiver sites.

### private/dossier-aquila/engineering-blueprint.md:470  ·  contradiction
**Current:** - a telecom tower-cluster portfolio of 2.0 MW aggregate across ~6 cluster sites, contracted energy-service-company grade at $0.35/kWh;
**Why:** §10A.4's own revenue table sixty lines below prints the telecom tariff as $0.30, and `corridor_model.py` prices the corridor at $0.30. The same appendix contradicts itself, and the $13.36M revenue total only closes at $0.30.
**Replace with:** - a telecom tower-cluster portfolio of 2.0 MW aggregate across ~6 cluster sites, contracted energy-service-company grade at $0.30/kWh;

### private/dossier-aquila/engineering-blueprint.md:477  ·  unsupported-claim
**Current:** Idle aperture at commissioning is ~3.5 MW (27%), costing ~$2.45M — and buying ~$11M of transmit fungibility that a demand-matched receiver set would strand.
**Why:** Idle aperture from the line's own figures is 11.9 − 8.55 = 3.36 MW, which is 28 per cent of nameplate, and costs $2.37M at the model's aperture prices. The $11M is not derivable from any model in sim/ (see thesis §VIII finding): the transmit plant is $25.5M and the utilisation gain is 33 points, giving $8.4M.
**Replace with:** Idle aperture at commissioning is ~3.4 MW (28%), costing ~$2.37M — and buying ~$8.4M of transmit fungibility that a demand-matched receiver set would strand.

### private/dossier-aquila/engineering-blueprint.md:479  ·  contradiction
**Current:** The third station is what makes the corridor bankable. Two sites leave it at ~6.7 descent episodes and ~750 genset hours a year, which is 3× the F18 budget and ~2× the genset band. The third site brings both inside budget, at ~2.4 episodes and ~260 hours [model—design-network-operations NO-2].
**Why:** F18 fires on 'a beam-powered relay descent event… more than twice per year' — the cap is 2.0/yr. The three-ingress reference corridor runs 2.4/yr, which is *outside* the budget, and design-network-operations NO-2 finding 3 says so explicitly: 'F18 sits at the boundary even with three sites. 2.4–2.5 descent episodes/yr against a cap of 2.' The blueprint claims the falsifier is cleared when its own verification model says it is breached. Genset hours (~260) do come inside band.
**Replace with:** The third station is what makes the corridor bankable. Two sites leave it at ~6.7 descent episodes and ~750 genset hours a year, which is 3× the F18 budget and ~2× the genset band. The third site brings the genset line inside band (~260 hours) and the descent line to the F18 boundary (~2.4 episodes against a cap of 2): ingress siting is therefore a sanction-grade survey decision per corridor, and F18 is a live falsifier rather than a formality [model—design-network-operations NO-2].

### private/dossier-aquila/engineering-blueprint.md:493  ·  stale-architecture
**Current:** | Transmitter electrical input (both stations, incl. plant) | 54 MW | 54 MW | 54 MW |
**Why:** The corridor has three ground stations (§10A.1: "Three ground stations deliver 31.8 MW optical net"; §10A.3 buys 3 × $8.5M). "Both stations" is stale from the two-station drawing, and the stale label is load-bearing: the $12.8M stageable panel layer prices 31.8 MW of optical panel at the $400/kW Era II target, which only closes if all three stations carry panels totalling 31.8 MW. If two stations carried the whole 31.8 MW, the third would need its own panels and the capital stack would be wrong.
**Replace with:** | Transmitter electrical input (all three stations, incl. plant) | 54 MW | 54 MW | 54 MW |

### private/dossier-aquila/engineering-blueprint.md:522  ·  stale-architecture
**Current:** **Comparator.** The voltage-appropriate comparator (132 kV backbone + MV feeders + substations to the same 17 sites, at the thesis's §II unit costs) is roughly **$82–140M**
**Why:** The corridor serves 16 sites, not 17. The wire comparator — the source of the headline '1.2–2.1× cheaper' claim carried in §VIII — is built against a site count the corridor does not have.
**Replace with:** **Comparator.** The voltage-appropriate comparator (132 kV backbone + MV feeders + substations to the same 16 sites, at the thesis's §II unit costs) is roughly **$82–140M**

### private/dossier-aquila/engineering-blueprint.md:534  ·  unsupported-claim
**Current:** | Sovereign service overlay (grid telemetry, asset protection) | contract | fixed | $1.2M |
**Why:** This line is 9% of corridor revenue and **16% of corridor EBITDA**, and it is the one revenue stream the thesis itself grades as its weakest: 'it is also why the line remains the most important under-evidenced number in this document… not built up from executed contracts' (§VIII). Strike it and EBITDA falls from $7.71M to $6.51M, the operator's cash yield falls from 7.6% to 6.4% and the post-blend figure from 10.2% to 8.7% — i.e. the corridor's clearance of its own ≥8–9% target is carried, at the margin, by an unsigned contract. The corridor P&L never runs that sensitivity, even though Section
**Replace with:** | Sovereign service overlay (grid telemetry, asset protection) — **[Projection—gated: first executed contract is a G1-review evidence item, Q1 2027; F22 dates the ramp]** | contract | fixed | $1.2M |
| *Sensitivity — service line struck to zero:* | | | *EBITDA $6.51M; operator yield 7.6% → 6.4%; post-blend 10.2% → 8.7%* |

### private/dossier-aquila/engineering-blueprint.md:547  ·  number-inconsistency
**Current:** 50/50 split at year five: ~$4.2M/yr each side, rising with the greenfield ramp toward envelope.
**Why:** Corridor EBITDA $7.706M / 2 = $3.85M a side. The 28.5% and 7.6% IRRs printed four lines below are computed from $3.85M, not $4.2M.
**Replace with:** 50/50 split at year five: ~$3.85M/yr each side, rising with the greenfield ramp toward envelope.

### private/dossier-aquila/engineering-blueprint.md:549  ·  model-mismatch
**Current:** the community layer is sold at the price these populations already pay ($0.26–0.30, against an incumbent bill of $0.28–1.10)
**Why:** The corridor P&L two tables above prices community retail at $0.28 (feeder-head) and $0.25 (greenfield). The stated band contradicts the document's own revenue table.
**Replace with:** the community layer is sold at the price these populations already pay ($0.25–0.28, against an incumbent bill of $0.28–1.10)

### private/dossier-aquila/engineering-blueprint.md:549  ·  number-inconsistency
**Current:** which cuts fleet capital per delivered watt from **$1.89 to $1.40**.
**Why:** Same inconsistency as thesis §VIII. $12M of fleet over a demand-matched build at 61 per cent of the 9.06 MW envelope (5.53 MW) is $2.17/W. $1.89/W corresponds to 70 per cent utilisation, not 61.
**Replace with:** which cuts fleet capital per delivered watt from **$2.17 to $1.40**.

### private/dossier-aquila/engineering-blueprint.md:553  ·  stale-architecture
**Current:** Corridor O&M staffing is priced bottom-up: ~30–45 FTE all-in (site agents at 17 sites, two laser-plant crews, 24/7 exclusion-zone security, fleet ground crew, logistics), carried inside the $1.8M field line
**Why:** 16 sites, not 17. The $1.8M O&M line is staffed against a site count the corridor does not have.
**Replace with:** Corridor O&M staffing is priced bottom-up: ~30–45 FTE all-in (site agents at 16 sites, two laser-plant crews, 24/7 exclusion-zone security, fleet ground crew, logistics), carried inside the $1.8M field line

### private/dossier-aquila/executive-memo.md:14  ·  stale-architecture
**Current:** What serves them instead is diesel: **$30–50 billion** a year of fuel, burned at **$0.30-plus** per kilowatt-hour, by towers and mines and households the wire will never reach.
**Why:** Two problems. (1) The thesis says "$28–50B/yr the world spends on genset fuel" (investment-thesis.md:785); the memo prints $30–50B. (2) Emphasis mismatch, and it is the important one: the memo tells a pure off-grid story — "households the wire will never reach" — while the finalised architecture is **brownfield first**. Twenty-three of the forty-six corridors carry nominal-but-dead distribution holding **79 per cent** of the addressable population, the feeder-head site is the priority class, and Gate D's harder limb (D-1) is the brownfield one (investment-thesis.md:715, 840, 2016–2018, 2518). 
**Replace with:** What serves them instead is diesel: **$28–50 billion** a year of fuel, burned at **$0.30-plus** per kilowatt-hour, by towers and mines and households the wire will never reach. Half of the pipeline is not off-grid at all. Twenty-three of the forty-six corridors, holding **79 per cent** of the addressable population, already carry poles, meters and service drops with no energy in them: distribution that is nominal but dead. Those feeders are where this network lands first.

### private/dossier-aquila/executive-memo.md:20  ·  stale-architecture
**Current:** The full conversion surface for one receiver — **541 kilowatts** delivered, enough for a town of five thousand — is one to two square metres of semiconductor.
**Why:** Both halves of this are the OLD 1 MW article's numbers, re-badged onto the 541 kW one. Appendix A.3 of the thesis gives 1.0–2.0 m² of cell area for 1 MW at the 50–100 W/cm² design flux; at 541 kW the surface is 0.54–1.08 m². And thesis §III line 196 attaches 'a town of five thousand' to a megawatt, not to 541 kW. So the memo overstates the conversion surface by ~2× and double-counts the population. This is the package's signature physical anchor — the dinner table under a beam of light — and it appears identically in the pre-NDA booklet (line 35), the document that travels furthest. It is the 
**Replace with:** The full conversion surface for one receiver — **541 kilowatts** delivered, enough to carry a medium-voltage feeder serving six to thirteen thousand people — is about one square metre of semiconductor.

### private/dossier-aquila/executive-memo.md:30  ·  model-mismatch
**Current:** Exposure is **$37 million** before beam-powered flight is proven, and **$180 million** before corridors operate.
**Why:** Model mismatch against the artefact of record. econ_model.py declares CUM_DRAWN = [0.030, 0.170, 0.670, 2.870] — $30M / $170M / $670M / $2,870M of capital drawn at each gate. The memo's ladder ($37M / $180M) adds the ~$7M already spent to the first rung but then adds $10M to the second, so the two rungs are not built on the same basis. An advisor running the model as invited gets $30M and $170M and cannot reproduce $180M from anything. Also "before corridors operate" drops the era: it is *Era I* corridors (investment-thesis.md:82).
**Replace with:** Exposure is **$37 million** before beam-powered flight is proven — $30 million of Tranche 1 on top of the $7 million already spent — and **$177 million** before Era I corridors operate.

### private/dossier-aquila/investment-thesis.md:58  ·  unsupported-claim
**Current:** The machinery of extension is civil engineering, which has no learning curve. Generation is solved and compounding; manufactured solar and batteries fell 90–99 per cent in a generation. Transmission is the layer that never learned. Whatever closes the gap must be built in a factory, not dug through a mountain range **[Measured]**.
**Why:** The [Measured] tag closes a paragraph whose first and third sentences are editorial assertions, not measurements. 'Civil engineering has no learning curve' is a falsifiable claim (tunnel-boring rates, HVDC $/MW-km, and prefabricated substation costs have all improved), and 'transmission is the layer that never learned' is the thesis of the essay, not a datum. The published data in the paragraph ($1,300–5,118/connection, 16.6 kWh/month, the 90–99 per cent module and cell declines) genuinely is [Measured]. Scope the tag to it.
**Replace with:** The cause is structural, not financial. Rural delivery by wire costs $1,300–5,118 per connection against customers consuming 16.6 kilowatt-hours a month; manufactured solar and batteries fell 90–99 per cent in a generation **[Measured]**. The machinery of extension is civil engineering, and civil engineering has never found a learning curve of that shape. Generation is solved and compounding. Transmission is the layer that never learned. Whatever closes the gap must be built in a factory, not dug through a mountain range.

### private/dossier-aquila/investment-thesis.md:60  ·  stale-architecture
**Current:** and returns to electricity in a concentrated-photovoltaic receiver whose full megawatt conversion surface is one to two square metres of semiconductor.
**Why:** Same 2× sizing error as §III, in the seven-facts summary of §I. 1–2 m² is the 541 kW article; a megawatt needs 2–4 m².
**Replace with:** and returns to electricity in a concentrated-photovoltaic receiver whose full 541-kilowatt conversion surface is one to two square metres of semiconductor.

### private/dossier-aquila/investment-thesis.md:68  ·  unsupported-claim
**Current:** The last two are held as data-room-verifiable records and graded at diligence grade in Section VI. Competitors have spent five to ten times as much to demonstrate less **[Measured]**.
**Why:** [Measured] means 'demonstrated on operational hardware, published data, or executed transactions'. Competitor R&D spend is none of those: private power-beaming programmes (PowerLight, Emrod, Space Power, Reach Power) do not publish comparable spend figures, and 'to demonstrate less' is a contested qualitative judgment about third-party hardware. This is our own estimate wearing the highest grade in the schema. It also appears ungraded and unhedged in the document that travels furthest (package/booklet-pre-nda.md:64), where a reader has no grade legend to discount it with.
**Replace with:** The last two are held as data-room-verifiable records and graded at diligence grade in Section VI. Against published raise totals, the comparable programmes in the class have raised five to ten times as much and have not demonstrated beam-sustained flight **[Estimated]**.

### private/dossier-aquila/investment-thesis.md:72  ·  model-mismatch
**Current:** at $0.359 at a feeder-head community site and $0.434 at a greenfield village ramping into its article
**Why:** `corridor_model.py` gives feeder-head = $0.3627. $0.359 does not reproduce. The same wrong figure runs through §VIII (lines 636, 682, 723), Appendix B (1347, 1354) and design-receiver-thermal.md line 201 — six places, one model. (The greenfield $0.434 is correct.)
**Replace with:** at $0.363 at a feeder-head community site and $0.434 at a greenfield village ramping into its article

### private/dossier-aquila/investment-thesis.md:82  ·  path-clarity
**Current:** Exposure is capped at $37 million before beam-powered flight is proven, $180 million before Era I corridors operate, $680 million before the megawatt laser panel exists, $2.9 billion only after megawatt links and beam-powered relays are demonstrated facts.
**Why:** The thesis asks for '$30 million of Tranche 1 capital' (line 18) and then, sixty-four lines later, caps exposure before the first gate at '$37 million'. The reconciliation — the ladder is cumulative and includes the ~$7M of T0 capital already spent — is never stated anywhere in the package, and Appendix A0 line 1132 asserts the opposite: 'The exposure ladder is $37M / $180M / $680M / $2.9B because those are the tranche commitments themselves.' They are not: `econ_model.py` carries CUM_DRAWN = [0.030, 0.170, 0.670, 2.870]. The same unreconciled pair appears in the executive memo (lines 24 and 3
**Replace with:** Exposure is capped at $37 million before beam-powered flight is proven, $180 million before Era I corridors operate, $680 million before the megawatt laser panel exists, $2.9 billion only after megawatt links and beam-powered relays are demonstrated facts. Those rungs are cumulative and include the ~$7 million of T0 capital already spent. The Tranche 1 commitment itself is $30 million, and that is the ask.

### private/dossier-aquila/investment-thesis.md:86  ·  model-mismatch
**Current:** the average return across every path is 3.8× the capital actually drawn
**Why:** `econ_model.py --prior hostile` gives 3.63×. This is the Executive Summary — the number a head of state reads first.
**Replace with:** the average return across every path is 3.6× the capital actually drawn

### private/dossier-aquila/investment-thesis.md:196  ·  stale-architecture
**Current:** The receiver is the anchor of the architecture's economics. The full conversion surface for a megawatt, enough for a town of five thousand at developed-economy household consumption, is one to two square metres of semiconductor. A dinner table, under a beam of light.
**Why:** One to two square metres is the conversion surface of the 541 kW article, not of a megawatt: 541 kW at 50% module conversion and 50–100 W/cm² gives 1.08–2.17 m². A delivered megawatt is 2–4 m². The memo and the booklet both attach 'one to two square metres' and 'a town of five thousand' to 541 kW, correctly. The thesis attaches them to a megawatt in three places (§I line 60, §III line 196, §VIII line 652) — the pre-fixed-article sizing, off by 2×, in the package's most quotable image.
**Replace with:** The receiver is the anchor of the architecture's economics. The full conversion surface for one 541-kilowatt article, enough for a town of five thousand at developed-economy household consumption, is one to two square metres of semiconductor. A dinner table, under a beam of light.

### private/dossier-aquila/investment-thesis.md:219  ·  unsupported-claim
**Current:** Every element of the delivered-watt cost (the laser, the relay platform's optics and avionics, the receiver, the battery buffer, the power electronics) is fabricated on manufacturing bases that already exist and already compound: III-V semiconductor epitaxy shared with the LED and concentrated-PV industries, silicon photonics, standard CMOS, lithium-iron-phosphate cell lines. Aquila capitalises no new fab. It rides curves whose volume is driven by industries far larger than itself: a beneficiary of the learning rates, not their sole driver **[Validated precedent]**.
**Why:** The enumeration deliberately lists only the payload elements and omits the airframe — but the delivered-watt cost carries $1.40/W of fleet capital (corridor_model.py, LUMPY_RELAY), and engineering-blueprint.md line 114 says of the beam-powered relay platform: '**no airframe exists**', TRL 2–3. Grading 'every element of the delivered-watt cost' as [Validated precedent] when the single largest lumpy line in the corridor has no manufacturing base at all is the mis-grade a reader will find by cross-reading the two documents.
**Replace with:** Every semiconductor element of the delivered-watt cost (the laser, the relay's optical payload, the receiver, the battery buffer, the power electronics) is fabricated on manufacturing bases that already exist and already compound: III-V epitaxy shared with the LED and concentrated-PV industries, silicon photonics, standard CMOS, lithium-iron-phosphate cell lines. Aquila capitalises no new fab. It rides curves whose volume is driven by industries far larger than itself: a beneficiary of the learning rates, not their sole driver **[Validated precedent]**. The Era II airframe is the exception, an

### private/dossier-aquila/investment-thesis.md:281  ·  unsupported-claim
**Current:** Ground-to-stratosphere adaptive optics at these ranges is a solved discipline in astronomy and laser communications **[Validated precedent]**.
**Why:** Overstated, and contradicted by the package's own blueprint. Astronomical AO corrects an *incoming* wavefront for imaging; it does not pre-compensate a hundred-kilowatt *outgoing* power beam for power-in-bucket on a moving platform. Optical-comms uplink pre-compensation exists at watt class. engineering-blueprint.md line 111 grades this exact item 'Astronomy/lasercom practice [pub]; **not yet integrated at power**', TRL 4–5. 'Solved discipline' asserts a completion the verification layer explicitly denies.
**Replace with:** Ground-to-stratosphere adaptive optics is a mature discipline in astronomy and laser communications, and beacon-referenced pre-correction at these ranges is standard practice there. It has not been integrated at power, which is what G2 buys **[Validated precedent—sensing; gated—integration at power]**.

### private/dossier-aquila/investment-thesis.md:325  ·  unsupported-claim
**Current:** And ground-segment diversity multiplies: two to three ground stations under partially decorrelated cloud fields lift optical availability from a single-site 55–85 per cent to 90–99-plus per cent at screened corridor geometries (the corridor simulation lands 94.6–99.9 per cent at two to three sites), the same discipline optical-communication ground networks use **[Validated precedent]**.
**Why:** One [Validated precedent] tag covering two claims of different provenance. The site-diversity *discipline* is genuinely third-party (optical-comms ground networks). The availability numbers in the parenthesis are our own model output — and design-network-operations.md line 37 grades the identical claim 'Verified [model]' with a different band again (88.4% single-site → 97.6% at two → 99.3% at three). Our own simulation cannot carry a grade that means 'established by a third party', and the two documents print different numbers for the same result.
**Replace with:** And ground-segment diversity multiplies: two to three ground stations under partially decorrelated cloud fields lift optical availability from a single-site 55–85 per cent to 90–99-plus per cent at screened corridor geometries. Site diversity is the same discipline optical-communication ground networks use **[Validated precedent]**; the corridor's own figures (88.4 per cent single-site, 97.6 at two sites, 99.3 at three) are model output, reconciled in design-network-operations §5.3 **[Derived—model]**.

### private/dossier-aquila/investment-thesis.md:341  ·  model-mismatch
**Current:** It sets the wall-plug watts behind every delivered watt (6.7 at Era I planning efficiency, 4 at Era III; roughly 2.9 of the 6.7 leave the aperture as light), and the transmitter is hardware on the steepest learning curve in the stack.
**Why:** This says Era III's chain improves. The architecture's central arithmetic assumes it does not: corridor_model.py applies the single constant CHAIN = 3.509 optical W/delivered W to BOTH articles (ARTICLE_III = RACK_OPT / CHAIN), which is the only reason the Era II:Era III ratio is 'exactly 10:1' and the Era III article is 5.41 MW. If the Era III chain genuinely improves, one 19 MW rack delivers more than 5.41 MW, the 10:1 relation is coincidental, and the Era III receiver is the wrong article. Declare the chain as a fixed planning constant across eras, or the two claims cannot both be true.
**Replace with:** It sets the wall-plug watts behind every delivered watt (6.7 at Era I planning efficiency, falling toward 4 as PCSEL wall-plug efficiency climbs; roughly 2.9 of the 6.7 leave the aperture as light). The *optical* chain — 3.509 optical watts per delivered watt — is held constant across Era II and Era III as a planning convention, which is what makes the receiver articles exactly 10:1. The transmitter is hardware on the steepest learning curve in the stack.

### private/dossier-aquila/investment-thesis.md:371  ·  contradiction
**Current:** A PCSEL is a die on a wafer. Dies on wafers are the only class of object civilisation has ever learned to make exponentially cheaper.
**Why:** Absolute claim, falsifiable in one search, and contradicted eleven lines into the same document. Line 58 says 'manufactured solar and batteries fell 90–99 per cent in a generation' — lithium-iron-phosphate cells are not dies on wafers, and line 386 says batteries 'ride the largest manufacturing scale-up in industrial history'. Hard-disk $/GB, DNA sequencing, and LED $/lumen are further counterexamples. The line is doing rhetorical work it does not need: the true claim (that wafer-scale objects are the *steepest* such curve) is both stronger and survives contact.
**Replace with:** A PCSEL is a die on a wafer. Dies on wafers ride the steepest cost curve civilisation has ever built, and the whole terminal cost structure of this network rides it with them.

### private/dossier-aquila/investment-thesis.md:379  ·  unsupported-claim
**Current:** Wall-plug efficiency in today's PCSELs runs 20–30 per cent with an engineering path toward the 60-per-cent class, the same climb the diode-bar industry completed a decade ago, ending at 73 per cent demonstrated under DARPA SHEDS **[Measured—published]**.
**Why:** The [Measured—published] tag closes a sentence containing a forward projection. What is measured and published is: today's PCSEL WPE at 20–30 per cent, and 73 per cent on *diode bars* under SHEDS. What is projected is that PCSELs will make the same climb to the 60-per-cent class — a different device physics on a different aperture, and a claim no third party has demonstrated. The 60 per cent figure is also load-bearing: design-pcsel-array.md Flag 1 shows the blueprint's own 62 per cent design point is inconsistent with its N×1.8 V cascade electrics and needs the operating point corrected to N×
**Replace with:** Wall-plug efficiency in today's PCSELs runs 20–30 per cent **[Measured—published]**; the diode-bar industry made the same climb a decade ago, ending at 73 per cent demonstrated under DARPA SHEDS **[Validated precedent—adjacent device class]**. The 60-per-cent class for PCSELs is the design target, and it is gated at P0 **[Projection—gated]**.

### private/dossier-aquila/investment-thesis.md:389  ·  unsupported-claim
**Current:** The reliability logic inverts the usual power-laser fragility: with thousands of parallel emitters, each running more than 50,000 hours between failures, a single dead chip is a fraction-of-a-per-cent output derating, detected by the tap photodiodes and compensated in phase, not an outage.
**Why:** 'more than 50,000 hours between failures' is stated as fact, ungraded, for a device class whose high-power form was first published in 2023. No PCSEL has 50,000 hours of field data — none has existed for 50,000 hours at power. The figure is an inherited telecom/diode-laser MTBF assumption, and it is the sole support for the array's graceful-degradation argument. A diligence team will ask for the qualification data and there is none.
**Replace with:** The reliability logic inverts the usual power-laser fragility: with thousands of parallel emitters, a single dead chip is a fraction-of-a-per-cent output derating, detected by the tap photodiodes and compensated in phase, not an outage. Per-emitter life is carried at the diode-laser class assumption of >50,000 hours; PCSEL life at power is unqualified, and the P0 burn-in matrix is what buys it **[Estimated—gated at P0]**.

### private/dossier-aquila/investment-thesis.md:393  ·  unsupported-claim
**Current:** The 1-kilowatt brick that opens the chain is the same 10-millimetre / 1-kilowatt device that sits, designed, at the head of the published Kyoto roadmap. Aquila's first gate is the world's next milestone.
**Why:** An unsupported absolute in the most heavily-scrutinised section of the thesis. The document itself names Nichia (fabricating PCSEL wafers under a Kyoto–Stanley programme), Sumitomo, Rohm, Mitsubishi, Hamamatsu and Vector Photonics as active on the same device class — any of them may reach the kilowatt die first, and Kyoto's own group is the one that published the roadmap. Claiming the world's next milestone as ours asserts that no one else will get there, which one search into Nichia's or Vector's programme announcements can embarrass.
**Replace with:** The 1-kilowatt brick that opens the chain is the same 10-millimetre / 1-kilowatt device that sits, designed, at the head of the published Kyoto roadmap. Aquila's first gate is that device, and the field's next milestone is the same one.

### private/dossier-aquila/investment-thesis.md:445  ·  unsupported-claim
**Current:** Every element of this stack has been demonstrated in Aquila hardware at 300-to-1,000-metre scale **[Measured]**. The engineering work of Era I is carrying it across the 20-kilometre vertical leg, which is a pointing-budget extension, not a new principle.
**Why:** 'Every element' is false as written, because the bulleted stack immediately above it closes with 'Uplink adaptive optics for the ground-to-relay leg reuses the same beacon as its wavefront probe' (line 443). Uplink AO is not demonstrated in Aquila hardware — engineering-blueprint.md line 111 grades it TRL 4–5, 'not yet integrated at power'. The [Measured] tag therefore certifies as demonstrated the one element of the stack the blueprint says is unbuilt.
**Replace with:** Every element of the tracking and interlock stack above has been demonstrated in Aquila hardware at 300-to-1,000-metre scale **[Measured]**; the uplink adaptive-optics layer reuses the same beacon but is not yet integrated at power (G2). The engineering work of Era I is carrying the stack across the 20-kilometre vertical leg, which is a pointing-budget extension, not a new principle.

### private/dossier-aquila/investment-thesis.md:570  ·  unsupported-claim
**Current:** Regulators have already accepted each element of this doctrine somewhere: transponder-triggered automatic shutters have run spotter-free at US observatories since 2015; ADS-B-keyed automatic shutoff is standard for high-power atmospheric lidar; the NRL–PowerLight 2019 demonstration ran 400 watts over an occupied venue on this virtual-enclosure logic; and automotive lidar put millions of Class 1-certified high-peak-power lasers on public roads. Aquila's safety case is the integration of precedents. **[Validated precedent]**.
**Why:** 'each element' and 'the integration of precedents' together assert that nothing in the safety case is novel. The thesis contradicts this at line 2242: 'No underwriter has priced a gigawatt-class optical link over populated airspace.' Every cited precedent is watt-to-400-watt class or non-power; none is a hundred-kilowatt beam over inhabited ground. The precedents cover the *interlock logic*, not the power regime, and the grade should say so.
**Replace with:** Regulators have already accepted each element of the interlock logic somewhere: transponder-triggered automatic shutters have run spotter-free at US observatories since 2015; ADS-B-keyed automatic shutoff is standard for high-power atmospheric lidar; the NRL–PowerLight 2019 demonstration ran 400 watts over an occupied venue on this virtual-enclosure logic; and automotive lidar put millions of Class 1-certified high-peak-power lasers on public roads **[Validated precedent—logic]**. No regulator has yet authorised the logic at delivery power, and that authorisation is what the Era I corridor cam

### private/dossier-aquila/investment-thesis.md:636  ·  prose
**Current:** Annualised over asset life at a 12 per cent real discount rate, an Era II anchor site delivers at **$0.20–0.24/kWh** against diesel at $0.40–0.70 and the the $0.20–0.35 charged today by the companies that power telecom towers — Lightway's own delivered cost at a tower cluster is $0.237, so it wins the sites where the incumbent sits at the expensive end of that band, which are exactly the off-grid and bad-grid ones; a year-five community site at **$0.359/kWh** at a feeder head and **$0.434/kWh** at a greenfield village on the fixed article; an Era III 10 MW site at **~$0.13/kWh**, below new gri
**Why:** 121 words, one sentence, five delivered-cost claims, two semicolon chains, an em dash, and a duplicated word ('the the'). This is the most consequential paragraph in the document — the whole delivered-cost case — and it is the hardest to read in it. It also carries the wrong feeder-head figure ($0.359; the model gives $0.363). A head of state will re-read this sentence twice and still not have the four numbers in order.
**Replace with:** Annualised over asset life at a 12 per cent real discount rate, an Era II anchor site delivers at **$0.20–0.24/kWh**. Diesel is $0.40–0.70. The companies that power telecom towers charge $0.20–0.35 today, and Lightway's own delivered cost at a tower cluster is $0.237, so it wins the sites where the incumbent sits at the expensive end of that band: exactly the off-grid and bad-grid ones.

A year-five community site delivers at **$0.363/kWh** at a feeder head and **$0.434/kWh** at a greenfield village on the fixed article. An Era III 10 MW site delivers at **~$0.13/kWh**, below new grid extensio

### private/dossier-aquila/investment-thesis.md:686  ·  unsupported-claim
**Current:** Across the reference corridor the fixed article carries about **$2.45 million** of idle aperture and releases about **$11 million** of transmit capacity that a demand-matched set would have stranded. The standardisation is not a tax paid for simplicity. It is the cheaper side of a trade.
**Why:** This sentence is the entire justification for the fixed, fully-populated article — the architecture's central design decision — and neither number is produced by the artefact of record. The model gives idle aperture of 3.363 MW costing $2.37M (not $2.45M), and the $11M of released transmit capacity is computed nowhere in `corridor_model.py` and is absent from its 17-entry validation list. The document's own rule at line 698 is 'Run it. If it disagrees with this document, this document is wrong.' A reader who runs it cannot find these two numbers at all. Either compute them in the model and add
**Replace with:** Across the reference corridor the fixed article carries **$2.37 million** of idle aperture: 3.36 megawatts of conversion surface at Era II receiver pricing. What it releases is the transmit plant a demand-matched set would have stranded. The corridor draws 94 per cent of its transmit envelope on day one, against 61 per cent for a demand-matched build, which is roughly $11 million of ground-station and fleet capital that would otherwise have sat idle **[Derived—`sim/corridor_model.py` for the aperture; the transmit-release figure is an allocation against the $25.5M station and $12M fleet lines]

### private/dossier-aquila/investment-thesis.md:705  ·  number-inconsistency
**Current:** The relay fleet and the ground-station balance of plant are truly lumpy: $24.7 million, forty-six per cent of the corridor, committed on day one and indivisible.
**Why:** HIGH. $24.7M of $64.5M is 38.3 per cent, not 46. The 46 per cent figure is $29.7M — the lumpy layer plus the $5.0M of corridor infrastructure — so the sentence has attached the wrong percentage to the right dollar figure. A reader who divides will catch it immediately, and it sits in the paragraph that opens the demand-risk argument. (The following sentence's 'twenty-one per cent' for the receiver and conversion layer is also low: the model gives $8.40M aperture + $8.06M electrical = 25 per cent.)
**Replace with:** The relay fleet and the ground-station balance of plant are truly lumpy: $24.7 million, thirty-eight per cent of the corridor, committed on day one and indivisible.

### private/dossier-aquila/investment-thesis.md:707  ·  number-inconsistency
**Current:** Stage every panel that demand does not yet require, and the corridor still commits about sixty-four per cent of its capital before one kilowatt-hour of community demand is proven. 
**Why:** `corridor_model.py` returns committed = 0.628 and prints '63%'. The document says sixty-four. Small, but the same figure is printed as eighty-five per cent in Appendix K (line 2518), so a reader comparing the two already has reason to check, and when they check, neither matches the model.
**Replace with:** Stage every panel that demand does not yet require, and the corridor still commits about sixty-three per cent of its capital before one kilowatt-hour of community demand is proven. 

### private/dossier-aquila/investment-thesis.md:715  ·  contradiction
**Current:** It takes two fully-populated receivers on the day it is commissioned, and it delivers at roughly **$0.36 per kilowatt-hour on billed energy**, sold at **$0.26 to $0.30** against an incumbent bill of $0.28 to $1.10.
**Why:** HIGH. As printed, the feeder-head site sells at $0.26–0.30 against a delivered cost of $0.359 — below cost — and eight lines later the document condemns Band A precisely because '$0.15 is below the site's own delivered cost of $0.359… a corridor sold into Band A loses money on every unit.' The same test convicts the corridor's own tariff. The resolution exists but is never stated where it is needed: Appendix J.3 shows the blended-finance layer takes the feeder head from $0.359 to $0.27–0.31, and F29 calls $0.26 'the Era II feeder-head break-even'. That break-even is post-blend. Say so here, or
**Replace with:** It takes two fully-populated receivers on the day it is commissioned, and it delivers at roughly **$0.36 per kilowatt-hour on billed energy** unblended, falling to **$0.27–0.31** on the concessional layer every comparable asset in these geographies already carries (Appendix J.3). It is sold at **$0.26 to $0.30** — at the blended cost, not below it — against an incumbent bill of $0.28 to $1.10.

### private/dossier-aquila/investment-thesis.md:715  ·  model-mismatch
**Current:** It takes two fully-populated receivers on the day it is commissioned, and it delivers at roughly **$0.36 per kilowatt-hour on billed energy**, sold at **$0.26 to $0.30** against an incumbent bill of $0.28 to $1.10.
**Why:** The community tariffs in the model are $0.25 (greenfield) and $0.28 (feeder-head) — every corridor revenue figure in the package is computed from them. '$0.26 to $0.30' brackets neither end and appears three times (here, Appendix K line 2518, blueprint line 549). The '$0.36' here is also a third spelling of the feeder-head cost ($0.359 / $0.365 / $0.36; model: $0.363).
**Replace with:** It takes two fully-populated receivers on the day it is commissioned, and it delivers at roughly **$0.363 per kilowatt-hour on billed energy**, sold at **$0.25 to $0.28** against an incumbent bill of $0.28 to $1.10.

### private/dossier-aquila/investment-thesis.md:715  ·  signal
**Current:** It takes two fully-populated receivers on the day it is commissioned, and it delivers at roughly **$0.36 per kilowatt-hour on billed energy**, sold at **$0.26 to $0.30** against an incumbent bill of $0.28 to $1.10.
**Why:** The document prints a delivered cost of $0.36 and a tariff of $0.26–0.30 in the same sentence and never says what a reader's subtraction says: the community layer is sold BELOW its fully-allocated cost. It is cross-subsidised by the anchors (mining sells at $0.22 against a cost of $0.202; towers at $0.30 against $0.237) and by $1.2M/yr of sovereign service revenue. That is a defensible structure — it is why the corridor is anchor-weighted and why it needs the concessional layer — but §VIII's framing ('sold at measured willingness to pay', 'the corridor is a price cut, not a new expense') invit
**Replace with:** It takes two fully-populated receivers on the day it is commissioned, and it delivers at roughly **$0.36 per kilowatt-hour on billed energy**, sold at **$0.26 to $0.30** against an incumbent bill of $0.28 to $1.10.

Read those two numbers together, because the arithmetic is the structure. At a fully-allocated cost of $0.363 and a tariff of $0.28, the community layer does not cover its own share of corridor capital. It is not built to. The anchors carry it: mining at $0.22 against a cost of $0.202, tower clusters at $0.30 against $0.237, and a sovereign service overlay at $1.2 million a year ag

### private/dossier-aquila/investment-thesis.md:723  ·  model-mismatch
**Current:** A feeder-head site delivers at $0.359 per kilowatt-hour, so a corridor sold into Band A loses money on every unit.
**Why:** The model gives $0.363. And 'loses money on every unit' is an LCOE-versus-tariff comparison that, applied consistently, also condemns the corridor's own $0.26–0.30 community tariff. State what is true: Band A pays less than half the delivered cost, so capital is never recovered.
**Replace with:** A feeder-head site delivers at $0.363 per kilowatt-hour, and Band A pays less than half of it: a corridor sold into Band A never recovers the capital behind a single unit.

### private/dossier-aquila/investment-thesis.md:725  ·  contradiction
**Current:** At a fifteen per cent non-technical loss the feeder-head site delivers at **$0.365 per kilowatt-hour on billed energy**, against an incumbent between $0.28 and $1.10.
**Why:** The same site is priced at $0.359 twice in this section (lines 636, 723) and at "roughly $0.36" at line 715. The model returns $0.363 with the 15% NTL haircut already inside it. $0.365 is a fourth value for one number, and it reads as a second, additional haircut applied on top of a figure that already carries it.
**Replace with:** At a fifteen per cent non-technical loss the feeder-head site delivers at **$0.359 per kilowatt-hour on billed energy**, against an incumbent between $0.28 and $1.10.

### private/dossier-aquila/investment-thesis.md:753  ·  model-mismatch
**Current:** Split evenly, the operator earns **~7.6 per cent unlevered** on its ~$53M and Aquila **~28.5 per cent** on its $13.5M **[Derived—Appendix B-2]**.
**Why:** The operator's capital is $64.48M total less Aquila's $13.5M = $51.0M. The blueprint states $51.0M twice (§10A.3 and §10A.4). $53M is the pre-reprice figure. The IRR quoted (7.6%) is computed on $51.0M, so the sentence divides one number by a different one.
**Replace with:** Split evenly, the operator earns **~7.6 per cent unlevered** on its ~$51M and Aquila **~28.5 per cent** on its $13.5M **[Derived—Appendix B-2]**.

### private/dossier-aquila/investment-thesis.md:755  ·  signal
**Current:** the corridor is sited to fill its transmit envelope on day one — 94 per cent against 61 for a demand-matched build, which cuts fleet capital per delivered watt from $1.89 to $1.40.
**Why:** '94 per cent' is a peak-coincident fill ratio (load × chain ÷ optical envelope), not a utilisation. Read as utilisation — which is how a diligence team will read the words 'transmit-plant utilisation' in the model's own validation harness — it implies the transmit plant runs at 94 per cent of capacity. It does not: energy delivered across the reference corridor is 48.7 GWh against 79.4 GWh deliverable at the envelope, an energy utilisation of 61 per cent. The comparison to the demand-matched build (94 vs 61) is valid; the word 'utilisation' is not. Rename it in the thesis, the blueprint (lines
**Replace with:** the corridor is sited to fill its transmit envelope on day one — day-one peak load draws 94 per cent of the envelope against 61 for a demand-matched build, which cuts fleet capital per delivered watt from $1.89 to $1.40.

### private/dossier-aquila/investment-thesis.md:755  ·  number-inconsistency
**Current:** which cuts fleet capital per delivered watt from $1.89 to $1.40.
**Why:** The pair is not self-consistent. Fleet capital is $12M of airframes. At the corridor's 8.55 MW it is $1.40/W (model: 12/8.55). A demand-matched build drawing 61 per cent of the same 9.06 MW envelope carries 5.53 MW, and 12/5.53 = $2.17/W. $1.89/W implies a 6.35 MW load, which is 70 per cent of the envelope, not 61. One of the two numbers has to move; the utilisation figures (94/61) are the ones the corridor is sited against, so the fleet figure is the one that is wrong. (The same hardcoded pair sits in corridor_model.py's print strings at lines 202 and 208 and should be corrected there too — i
**Replace with:** which cuts fleet capital per delivered watt from $2.17 to $1.40.

### private/dossier-aquila/investment-thesis.md:805  ·  unsupported-claim
**Current:** Thirty thousand aircraft sounds like an impossibility until it stands next to the systems civilisation already operates: the global commercial airliner fleet is roughly 28,000 aircraft; Starlink has launched more than 12,000 satellites in seven years (~10,700 operational as of July 2026). A manufactured, rotating, maintained fleet of that scale is a known industrial form **[Validated precedent]**.
**Why:** This is an analogy, graded as a precedent. No third party has operated a HAPS fleet beyond single digits; the largest stratospheric fleets ever flown are a handful of airframes. Airliners (a 70-year certified industry) and LEO satellites (a different regulatory and operational regime with no station-keeping-in-atmosphere requirement) demonstrate that *some* fleets of that count exist — not that a stratospheric one is precedented. [Validated precedent] requires 'a third party in a comparable regime'; neither comparator is in a comparable regime.
**Replace with:** Thirty thousand aircraft sounds like an impossibility until it stands next to the systems civilisation already operates: the global commercial airliner fleet is roughly 28,000 aircraft; Starlink has launched more than 12,000 satellites in seven years (~10,700 operational as of July 2026). Fleets of that count are a known industrial form; no stratospheric fleet has yet been operated beyond single digits, and the manufacturing and maintenance model is the R2–R3 gate's subject **[Estimated—analogy; gated]**.

### private/dossier-aquila/investment-thesis.md:832  ·  unsupported-claim
**Current:** The bet is structured to be fundable under *all three*, and the valuation section below shows it, because what governs the expected value is less the probability of success than the cost of failure at each stage, which the gate structure caps.
**Why:** The programme-level Monte Carlo (econ_model.py) samples EBITDA anchors ($0.70B by 2036, $4.80B by 2040) that were built before §VIII repriced the corridor to $7.71M EBITDA on $64.5M of capital. Nothing propagates: the corridor model and the programme model share no inputs. At $7.71M/corridor the 2036 anchor implies ~91 corridors against a stated deployment cadence of "50+ (2036)". The hostile P90 of +$2.17B is therefore not yet a figure the repriced corridor produces. The package's own standard — every number must survive a reader rebuilding it — requires this to be declared rather than found.
**Replace with:** The bet is structured to be fundable under *all three*, and the valuation section below shows it, because what governs the expected value is less the probability of success than the cost of failure at each stage, which the gate structure caps. One reconciliation is outstanding, and it is stated rather than buried: the programme-level EBITDA anchors these priors sample were built before Section VIII repriced the reference corridor to $7.71M of EBITDA on $64.5M of capital, and they have not yet been rebuilt from it. The gate probabilities and the loss branches are unaffected — those are capped b

### private/dossier-aquila/investment-thesis.md:869  ·  model-mismatch
**Current:** The reference-class-forecasting literature says founder gate estimates for first-of-a-kind hardware run optimistic, so the bet is priced a second time under an adversary's assumptions: 20,000 simulated paths with every gate prior haircut to reference-class levels (~0.78/0.58/0.48/0.55, a full-mission product of ~12 per cent, versus the programme's ~29), volume at a half-speed median ramp, tariffs sampled at 0.7–1.1× plan, and cash conversion sampled at 50–70 per cent of operating profit. Method and code in Appendix C.
**Why:** econ_model.py reproduces §IX exactly (P(NPV>0) 18.5%, LGF $31M, P90 +$2.17B), but it is driven by the B.4 mission ramp and its $0.40→$0.04 blended tariffs — none of which were re-derived after the corridor was repriced (anchor band $0.20–0.24, community $0.25–0.28, operator 7.6% unlevered, $64.5M/13.36M corridor). The programme-level Monte Carlo has never been run against the corridor that now sits underneath it. A committee's advisor will ask whether the $2.9B case survives the repriced unit, and the package currently has no answer. State the disclosure or re-run B.4 off the corridor.
**Replace with:** The reference-class-forecasting literature says founder gate estimates for first-of-a-kind hardware run optimistic, so the bet is priced a second time under an adversary's assumptions: 20,000 simulated paths with every gate prior haircut to reference-class levels (~0.78/0.58/0.48/0.55, a full-mission product of ~12 per cent, versus the programme's ~29), volume at a half-speed median ramp, tariffs sampled at 0.7–1.1× plan, and cash conversion sampled at 50–70 per cent of operating profit. Method and code in Appendix C. One disclosure, stated once: this simulation runs on the B.4 mission ramp, w

### private/dossier-aquila/investment-thesis.md:877  ·  model-mismatch
**Current:** Across every path, win and loss together, the average return is **3.8×** the capital actually drawn.
**Why:** HIGH. econ_model.py — the declared artefact of record, which the document invites the reader to run — returns a mean multiple on capital drawn of 3.63–3.68× under the hostile prior across seeds and path counts (200,000 paths, seeds 1/7/42: 3.64, 3.67, 3.68). It never returns 3.8×. The same 3.8× is printed at line 86 (§I, seventh fact) and in the C.6 Prior 2 table at line 1600. Appendix A0 stakes the document's credibility on exactly this property ('Run it and you will get that number'), so a figure the model does not produce is the most expensive kind of error here.
**Replace with:** Across every path, win and loss together, the average return is **~3.6×** the capital actually drawn.

### private/dossier-aquila/investment-thesis.md:891  ·  number-inconsistency
**Current:** Struck one at a time, zero service revenue takes P(NPV>0) to 12.0 per cent at a $111M median loss-given-failure, and halved salvage to 12.0 per cent at $73M. Stacked together: **P(NPV>0) of 12.0 per cent, a median loss-given-failure of $116M, and a median NPV of −$0.12B**.
**Why:** `econ_model.py --stress zero-service,half-salvage` gives 11.8 per cent, not 12.0, on all three runs (the $111M, $73M, $116M and −$0.12B all reproduce exactly; only the probability does not). The gate product itself is 0.78 × 0.58 × 0.48 × 0.55 = 11.9 per cent. So both the stated floor and the identity claimed for it at line 897 ('12.0 per cent is exactly the gate product') are wrong. This matters more than 0.2 points normally would: Appendix A0 line 1138 stakes the document's precision convention on exactly this class of number — 'it is not a claim about the world but the exact output of a dec
**Replace with:** Struck one at a time, zero service revenue takes P(NPV>0) to 11.8 per cent at a $111M median loss-given-failure, and halved salvage to 11.8 per cent at $73M. Stacked together: **P(NPV>0) of 11.8 per cent, a median loss-given-failure of $116M, and a median NPV of −$0.12B**.

### private/dossier-aquila/investment-thesis.md:891  ·  model-mismatch
**Current:** Struck one at a time, zero service revenue takes P(NPV>0) to 12.0 per cent at a $111M median loss-given-failure, and halved salvage to 12.0 per cent at $73M. Stacked together: **P(NPV>0) of 12.0 per cent, a median loss-given-failure of $116M, and a median NPV of −$0.12B**.
**Why:** `econ_model.py --prior hostile --stress zero-service,half-salvage` returns 11.8 per cent on all three runs. The $111M, $73M, $116M and −$0.12B all reproduce exactly; only the probability does not. The analytic gate product is 0.78 × 0.58 × 0.48 × 0.55 = 11.94 per cent — so neither the model's value nor the exact product is 12.0. This matters more than 0.2 points normally would, because Appendix A0 stakes the document's whole precision convention on exactly this class of number ('not a claim about the world but the exact output of a declared model... Run it and you will get that number'). Run i
**Replace with:** Struck one at a time, zero service revenue takes P(NPV>0) to 11.8 per cent at a $111M median loss-given-failure, and halved salvage to 11.8 per cent at $73M. Stacked together: **P(NPV>0) of 11.8 per cent, a median loss-given-failure of $116M, and a median NPV of −$0.12B**.

### private/dossier-aquila/investment-thesis.md:897  ·  number-inconsistency
**Current:** **P(NPV>0) does not collapse. It floors at 12.0 per cent, and 12.0 per cent is exactly the gate product.** Once service revenue and salvage are struck, no failure branch can clear zero, so the probability of a positive outcome simply *becomes* the probability that all four gates pass.
**Why:** Consequence of the finding above: the model floors at 11.8 per cent and the analytic gate product is 11.9 per cent (0.78 × 0.58 × 0.48 × 0.55). Neither is 12.0. The identity being claimed here is the load-bearing property of the whole floor argument, so it has to be stated at the number the model actually returns, with the sampler noise acknowledged rather than rounded away.
**Replace with:** **P(NPV>0) does not collapse. It floors at 11.8 per cent, which is the gate product — 0.78 × 0.58 × 0.48 × 0.55 = 11.9 per cent — to within the sampler's noise.** Once service revenue and salvage are struck, no failure branch can clear zero, so the probability of a positive outcome simply *becomes* the probability that all four gates pass.

### private/dossier-aquila/investment-thesis.md:897  ·  model-mismatch
**Current:** **P(NPV>0) does not collapse. It floors at 12.0 per cent, and 12.0 per cent is exactly the gate product.**
**Why:** The claim of exactness is what makes the rounding a defect. The gate product is 0.78 × 0.58 × 0.48 × 0.55 = 11.9 per cent, and the model returns 11.8 per cent. A reader who runs it — which this section explicitly invites — gets neither 12.0. State the identity at the number the model actually returns, and acknowledge the sampler noise rather than rounding it away; the argument is unchanged and the precision claim survives.
**Replace with:** **P(NPV>0) does not collapse. It floors at 11.8 per cent, which is the gate product — 0.78 × 0.58 × 0.48 × 0.55 = 11.9 per cent — to within the sampler's noise.**

### private/dossier-aquila/investment-thesis.md:899  ·  model-mismatch
**Current:** **And the win is untouched.** The all-gates-pass branch still carries a median +$2.65B in present value, compounding at 33 per cent a year, under the stacked stress
**Why:** +$2.65B is the CORRELATED stacked run. The stacked floor the thesis actually prints (zero-service + half-salvage, independent gates) gives an all-pass median of +$2.69B. Using the correlated figure here is the same contamination that produced the error at line 889.
**Replace with:** **And the win is untouched.** The all-gates-pass branch still carries a median +$2.69B in present value, compounding at 33 per cent a year, under the stacked stress

### private/dossier-aquila/investment-thesis.md:1037  ·  stale-architecture
**Current:** The fallback is built into the revenue: roughly nine-tenths of a corridor's income comes from telecom towers, mines, and sovereign contracts, all of them counterparties with a chief financial officer. Nodes are added in increments as metered demand crosses thresholds. And the community-scale tranche does not draw at all until real sites clear 25 per cent utilisation and 85 per cent payment collection.
**Why:** HIGH — two breaks in the same three sentences, in the section a principal actually reads. (1) 'Nine-tenths' is 71 per cent on the model (see §VIII finding). (2) '25 per cent utilisation' is the superseded single-limb Gate D. The gate now has two limbs (D-1: ≥40% against installed nameplate at brownfield/feeder-head; D-2: ≥25% against demand-matched reference capacity, ≥700 MWh in year two, ≥10% YoY growth at greenfield). Stating only the 25% understates the brownfield test that §VIII calls 'the harder gate, and the real test'. (3) 'Nodes are added in increments' is cassette language: sites sca
**Replace with:** The fallback is built into the revenue: roughly seven-tenths of a corridor's income comes from telecom towers, mines, and sovereign contracts, all of them counterparties with a chief financial officer. Sites are added by receiver count as metered demand crosses thresholds. And the community-scale tranche does not draw at all until real sites clear gate D on both limbs: 40 per cent utilisation against installed nameplate at a feeder head, 25 per cent against the demand-matched reference at a greenfield village, and 85 per cent payment collection at both.

### private/dossier-aquila/investment-thesis.md:1037  ·  number-inconsistency
**Current:** The fallback is built into the revenue: roughly nine-tenths of a corridor's income comes from telecom towers, mines, and sovereign contracts, all of them counterparties with a chief financial officer.
**Why:** Same error as §VIII line 751, in the risk register, where it does the most work: 70.6 per cent, not nine-tenths. This is the sentence that answers the sector's worst risk (community demand), and it overstates the mitigant by twenty points. The honest decomposition is still a strong answer — and it is checkable, which nine-tenths is not.
**Replace with:** The fallback is built into the revenue: seventy per cent of a corridor's income comes from telecom towers, mines, and sovereign contracts, all of them counterparties with a chief financial officer, and a further quarter from prepaid-metered feeder heads whose load is already wired and already paying. Six per cent rides the greenfield ramp.

### private/dossier-aquila/investment-thesis.md:1078  ·  signal
**Current:** Five board reviews carry the programme: the G1 gate review in Q1 2027, the P0 review in Q4 2028, the G2 gate review in Q2 2031, the joint P2 + R2 review (G3) in Q4 2033, and the G4 gate review in 2037–38.
**Why:** HIGH — a break in the gate→tranche→review chain. Gate D is presented throughout as the fifth gate and as 'a precondition of the community-scale portion of T4', with falsifier F15 dating it to 2035 — but no board ever adjudicates it. The decision calendar here, and the L.6 register that backs it, both list five reviews and none of them is Gate D. T4 opens at the G3 review in Q4 2033; the community portion of T4 therefore draws inside a tranche whose governing gate has no review, no date, and no evidence list. The demand gate is the answer to the single biggest objection in the document and it i
**Replace with:** Six board reviews carry the programme: the G1 gate review in Q1 2027, the P0 review in Q4 2028, the G2 gate review in Q2 2031, the joint P2 + R2 review (G3) in Q4 2033, the gate D demand review in 2035, which releases the community-scale portion of T4 against twelve months of metered capacity factor and collection data from the first operating sites, and the G4 gate review in 2037–38.

### private/dossier-aquila/investment-thesis.md:1398  ·  stale-architecture
**Current:** *Success-path P&L, cash flow, and funding draws, 2026–2050, reconciled line-for-line with B.4, the Appendix C valuation, and the reference-class Monte Carlo. Model code (`financial_model.py`) is a data-room artefact; every row below reproduces from the declared assumptions of C.2.*
**Why:** B-2 is the one appendix whose model does not ship — there is no `financial_model.py` in sim/ — and it is precisely the appendix carrying the stale corridor line ($4.2M/yr, B-2.3). It also claims reconciliation with everything EXCEPT `corridor_model.py`, which is the artefact of record for the corridor B-2.3 prices. That is the real staleness the §IX Monte Carlo inherits: econ_model.py takes no input from corridor_model.py at all — its revenue basis is the B.4 TWh ramp — so the repriced corridor never propagated. Concretely: the repriced corridor realises a 57.7% EBITDA margin ($7.71M on $13.36
**Replace with:** *Success-path P&L, cash flow, and funding draws, 2026–2050, reconciled line-for-line with B.4, the Appendix C valuation, and the reference-class Monte Carlo. Model code (`sim/econ_model.py`) is a repository artefact; every row below reproduces from the declared assumptions of C.2. One reconciliation is not yet closed and is named here rather than buried: the programme ramp of B.4 is built top-down from TWh and blended tariff, not bottom-up from the reference corridor of `sim/corridor_model.py`. The corridor realises a 57.7 per cent EBITDA margin; the B.4 anchors imply 66 per cent by 2036 risin

### private/dossier-aquila/investment-thesis.md:1445  ·  number-inconsistency
**Current:** | **Programme / fleet (Aquila)** | $13.5M fleet + NOC share, ~$4.2M/yr cash at year 5 rising with the greenfield ramp | **~28.5% IRR** |
| **Project / ground (SPV)** | ~$51.0M ground stack incl. corridor infrastructure and the third ingress station, ~$4.2M/yr at year 5 | ~7.6% IRR |
**Why:** Corridor EBITDA is $7.706M; the 50/50 split is $3.85M a side, not $4.2M. The printed $4.2M is internally inconsistent with the printed IRRs in the same rows: $4.2M / $13.5M = 31.1%, not 28.5%; the 28.5% only comes out of $3.85M. ($4.2M appears to be the telecom-cluster revenue line from §10A.4 pulled into the wrong cell.) Same error in blueprint §10A.4 line 547.
**Replace with:** | **Programme / fleet (Aquila)** | $13.5M fleet + NOC share, ~$3.85M/yr cash at year 5 rising with the greenfield ramp | **~28.5% IRR** |
| **Project / ground (SPV)** | ~$51.0M ground stack incl. corridor infrastructure and the third ingress station, ~$3.85M/yr at year 5 | ~7.6% IRR |

### private/dossier-aquila/investment-thesis.md:1513  ·  unsupported-claim
**Current:** It reproduces the printed results of C.6 (P(NPV>0) = 18.5 per cent; branch frequencies and median NPVs to the printed decimal).
**Why:** False, and checkably so in one command. The model gives branch frequencies 11.8 / 9.7 / 24.2 / 32.6 / 21.6 against the printed 11.7 / 10.1 / 23.1 / 32.5 / 22.6, and branch median NPVs +2.89 / −0.46 / −0.19 / −0.02 / −0.02 against the printed +2.9 / −0.4 / −0.2 / −0.02 / −0.03. Claiming 'to the printed decimal' invites the one check it fails. The honest claim is the true one.
**Replace with:** It reproduces the printed results of C.6 (P(NPV>0) = 18.5 per cent; branch frequencies and median NPVs within Monte Carlo sampling error at the printed seed).

### private/dossier-aquila/investment-thesis.md:1599  ·  stale-architecture
**Current:** | NPV percentiles (P10 / P50 / P90) | ~−$0.24B / ~−$0.03B / ~+$2.1B |
**Why:** econ_model.py reproduces this (−0.24 / −0.03 / +2.17), but the programme-level Monte Carlo has not been re-run against the repriced corridor: the site cost model changed to F + v_r·P_aperture + v_e·P_demand, the anchor band moved from $0.17–0.19 to $0.20–0.24, and the feeder-head figure moved from $0.341. The hostile prior's tariff and volume assumptions are the ones that predate that reprice. Until the sampler is re-run against corridor_model.py's outputs, the row should carry the caveat that the returns table at line 1437 already carries for the equipment stream ('pending the full re-run wit
**Replace with:** | NPV percentiles (P10 / P50 / P90) | ~−$0.24B / ~−$0.03B / ~+$2.1B *(pending re-run against the repriced corridor; the sampler's tariff and volume priors predate the F + v·P site model)* |

### private/dossier-aquila/investment-thesis.md:1600  ·  model-mismatch
**Current:** | Mean multiple on capital actually drawn (undiscounted) | **~3.8×** |
**Why:** The model gives 3.63×. Also in this table: the success-branch IRR row (~25/33/41%) is produced by no model in sim/ — econ_model.py computes NPVs and multiples, never an IRR. Every other row here reproduces; these two do not.
**Replace with:** | Mean multiple on capital actually drawn (undiscounted) | **~3.6×** |

### private/dossier-aquila/investment-thesis.md:1608  ·  model-mismatch
**Current:** | All gates pass | 11.7% | $2.87B | **~+$2.9B** | ~25× | ~33% |
| Fails at G4 | 10.1% | $2.87B | ~−$0.4B | 0.75× | ~−13% |
| Fails at G3 | 23.1% | $0.67B | ~−$0.2B | 0.59× | ~−28% |
| Fails at G2 | 32.5% | $0.17B | ~−$20M | 1.23× | ~+7% |
| Fails at G1 | 22.6% | $0.03B | ~−$30M | 0.13× |—|
**Why:** The printed branch table was generated by a superseded engine. `econ_model.py --prior hostile` (the artefact of record, seed 7) gives frequencies 11.8 / 9.7 / 24.2 / 32.6 / 21.6 and median NPVs +2.89 / −0.46 / −0.19 / −0.02 / −0.02. The G1 median is −$25M, not −$30M. Restating the table from the model closes the gap C.3 line 1513 claims is already closed.
**Replace with:** | All gates pass | 11.8% | $2.87B | **~+$2.9B** | ~25× | ~33% |
| Fails at G4 | 9.7% | $2.87B | ~−$0.46B | 0.75× | ~−13% |
| Fails at G3 | 24.2% | $0.67B | ~−$0.19B | 0.59× | ~−28% |
| Fails at G2 | 32.6% | $0.17B | ~−$20M | 1.23× | ~+7% |
| Fails at G1 | 21.6% | $0.03B | ~−$25M | 0.13× |—|

### private/dossier-aquila/investment-thesis.md:1693  ·  contradiction
**Current:** Either limb, or collection **<85%**, or collection **<85%** at the first operating sites by **2035** | 2035 |
**Why:** HIGH. The collection clause is printed twice in the falsifier that governs the entire community-scale T4 drawdown. F15 is the single falsifier a demand-sceptical committee will read most closely; a duplicated clause in it reads as an unproofed register and invites the question of what else was pasted twice.
**Replace with:** Either limb, or collection **<85%**, at the first operating sites by **2035** | 2035 |

### private/dossier-aquila/investment-thesis.md:1937  ·  contradiction
**Current:** **1. Chile: Atacama (Antofagasta–Calama).** The only corridor where the source problem is already solved and paid for.
**Why:** Absolute claim contradicted ten lines later by the document itself. Line 1947 (Kenya, Marsabit) says 'Lake Turkana Wind's 310 megawatts is subject to grid curtailment, **a stranded source in place**', and the Appendix F table at line 2014 lists Ethiopia's GERD surplus, Cauchari's export constraint, and Uganda's hydro surplus as further stranded sources — all graded [Measured]. 'The only corridor' is falsified by the same document's own evidence table, on the page a sovereign reader will read most carefully.
**Replace with:** **1. Chile: Atacama (Antofagasta–Calama).** The corridor where the source problem is most completely solved and already paid for.

### private/dossier-aquila/investment-thesis.md:2238  ·  number-inconsistency
**Current:** Operating precedent exists in the programme's own geography. AALTO's Zephyr flew thirteen days in the stratosphere from its Kenyan base in early 2025, under dual authorisation from the Kenya Civil Aviation Authority and the Kenya Space Agency. A host-state-registered, insured HAPS operation is not hypothetical **[Validated precedent]**.
**Why:** The same aircraft, the same operator, the same year, two endurance figures: 'thirteen days... in early 2025' here, and '67 days aloft (April 2025)' at line 397 and in engineering-blueprint.md line 103. The 67-day record flight was itself flown from AALTO's Kenyan base, which means the thirteen-day figure is a stale earlier campaign and this paragraph understates its own best precedent while appearing to contradict the thesis's flagship HAPS citation. Reconcile to the record flight.
**Replace with:** Operating precedent exists in the programme's own geography. AALTO's Zephyr flew its 67-day endurance record from its Kenyan base in 2025, under dual authorisation from the Kenya Civil Aviation Authority and the Kenya Space Agency. A host-state-registered, insured HAPS operation is not hypothetical **[Validated precedent]**.

### private/dossier-aquila/investment-thesis.md:2399  ·  number-inconsistency
**Current:** the Era II community site falls from **$0.434** to roughly **$0.33–0.38** per kilowatt-hour at a greenfield village, and from **$0.359** to roughly **$0.27–0.31** at a feeder head; the Era III site falls from ~$0.095 to roughly $0.072–0.083, well under the World Bank's $0.20 mini-grid target for 2030 **[Derived—Appendix B]**.
**Why:** The Era III base of ~$0.095 appears nowhere else in the package: §VIII, the B.2 delivered table and the market ladder all carry ~$0.13 for the Era III site (the B.2 capex-annuity basis is $0.075 — neither is $0.095). The Era II figures in the same sentence are the fully-loaded §VIII numbers, so the Era III one should be too. Applying the same −18%/−24% blend gives $0.10–0.11.
**Replace with:** the Era II community site falls from **$0.434** to roughly **$0.33–0.38** per kilowatt-hour at a greenfield village, and from **$0.363** to roughly **$0.27–0.31** at a feeder head; the Era III site falls from ~$0.13 to roughly $0.10–0.11, well under the World Bank's $0.20 mini-grid target for 2030 **[Derived—Appendix B]**.

### private/dossier-aquila/investment-thesis.md:2482  ·  contradiction
**Current:** Dies on wafers are the only object class civilisation has learned to make exponentially cheaper, and the entire terminal cost structure of the network rides on that property.
**Why:** Second instance of the same falsifiable absolute (see line 371). Batteries and solar modules — both named by this thesis as exponential-decline exemplars at line 58 — are not dies on wafers. Correct both occurrences together or the package contradicts itself twice.
**Replace with:** Dies on wafers ride the steepest cost curve civilisation has learned to build, and the entire terminal cost structure of the network rides on that property.

### private/dossier-aquila/investment-thesis.md:2518  ·  number-inconsistency
**Current:** At the corridor, modularity is not the answer at all: even staging every laser panel, about eighty-five per cent of corridor capital commits before community demand is proven.
**Why:** HIGH. §VIII line 707 puts the same quantity at 'about sixty-four per cent'; corridor_model.py computes 63 per cent (lumpy $24.7M + corridor infrastructure $5.0M + anchor site capex $10.8M, over $64.5M). Two different figures for the same load-bearing number, twenty pages apart, and the appendix version is the one a hostile reader will quote back.
**Replace with:** At the corridor, modularity is not the answer at all: even staging every laser panel, about sixty-four per cent of corridor capital commits before community demand is proven.

### private/dossier-aquila/investment-thesis.md:2518  ·  model-mismatch
**Current:** the people on those feeders already pay $0.28 to $1.10 a kilowatt-hour against the $0.26 to $0.30 this network charges
**Why:** Same stale tariff band. The corridor charges $0.25 (greenfield) to $0.28 (feeder-head). At the quoted $0.30 top the feeder-head price would sit above the lowest incumbent bill it claims to undercut, which inverts the argument being made.
**Replace with:** the people on those feeders already pay $0.28 to $1.10 a kilowatt-hour against the $0.25 to $0.28 this network charges

### private/dossier-aquila/investment-thesis.md:2520  ·  stale-architecture
**Current:** Gate D makes capacity factor ≥25 per cent against installed nameplate, delivered energy ≥700 MWh per site in year two, and collection ≥85 per cent a precondition of community-scale T4 drawdown.
**Why:** HIGH. Appendix K.6 is the adversarial-response appendix — the place a sceptic goes to check that the demand objection was actually answered — and it states Gate D in a form that exists nowhere else in the package. It fuses the D-2 threshold (25%) with the D-1 measurement basis (installed nameplate), which is the one combination §VIII explicitly rules out, and it drops the D-1 40% limb and the D-2 growth limb entirely. F15 in Appendix D carries the correct two-limb form.
**Replace with:** Gate D makes both limbs a precondition of community-scale T4 drawdown: at brownfield and feeder-head sites, capacity factor ≥40 per cent against installed nameplate within twelve months of energisation; at greenfield sites, capacity factor ≥25 per cent against demand-matched reference capacity, delivered energy ≥700 MWh in year two, and year-on-year energy growth ≥10 per cent; and collection ≥85 per cent at both.

### private/dossier-aquila/investment-thesis.md:2707  ·  number-inconsistency
**Current:** corridor revenue is anchor-weighted (~91 per cent from telecom, mining and sovereign contracts)
**Why:** Third occurrence of the 91 per cent error, in Appendix K's adversarial register. The model gives 70.6 per cent.
**Replace with:** corridor revenue is anchor-weighted (71 per cent from telecom, mining and sovereign contracts, and 23 per cent more from prepaid-metered feeder heads; only 6 per cent rides the greenfield ramp)

### private/dossier-aquila/investment-thesis.md:2707  ·  stale-architecture
**Current:** corridor revenue is anchor-weighted (~91 per cent from telecom, mining and sovereign contracts)
**Why:** The model gives 70.6%. The stale 91% has propagated into the Risk Register, where it is the mitigation for the demand risk (F15) — the single risk a sovereign fund will interrogate hardest.
**Replace with:** corridor revenue is anchor-weighted (~71 per cent from telecom, mining and sovereign contracts)

### private/dossier-aquila/investment-thesis.md:2707  ·  model-mismatch
**Current:** corridor revenue is anchor-weighted (~91 per cent from telecom, mining and sovereign contracts)
**Why:** Same stale figure as §VIII. The reference corridor's anchor-grade share is 70.6% ($9.43M of $13.358M). This appears in the risk register's answer to the demand objection, where overstating the anchor share overstates exactly the protection being claimed.
**Replace with:** corridor revenue is anchor-weighted (~71 per cent from telecom, mining and sovereign contracts)

### private/dossier-aquila/package/booklet-pre-nda.md:35  ·  stale-architecture
**Current:** The full conversion surface for one receiver — **541 kilowatts** delivered, enough for a town of five thousand — is one to two square metres of semiconductor. A small table, under a beam of light.
**Why:** Same error as the executive memo, in the document that travels furthest and is read by people who will never open the thesis. At 50–100 W/cm² a 541 kW article's cell plane is 0.54–1.08 m²; the 1–2 m² figure belongs to the retired 1 MW article (thesis Appendix A.3). The population figure is likewise the 1 MW one.
**Replace with:** The full conversion surface for one receiver — **541 kilowatts** delivered, enough to carry a medium-voltage feeder serving six to thirteen thousand people — is about one square metre of semiconductor. A dinner plate of silicon, under a beam of light.

### private/dossier-aquila/package/booklet-pre-nda.md:43  ·  contradiction
**Current:** # III. The Physics is Proven
**Why:** This is the shareable document that travels furthest, and the heading over-claims against its own body six lines below: 'That chip is not yet built. The kilowatt die is a recipe, not a device... **Neither is solved.**' The body's honesty is the package's greatest asset; the heading spends it. A reader who notices the contradiction between a heading and the paragraph under it will not trust anything else in the booklet.
**Replace with:** # III. The Physics Closes

### private/dossier-aquila/package/booklet-pre-nda.md:53  ·  unsupported-claim
**Current:** The external record corroborates the architecture end to end: DARPA has delivered **800 watts** of optical power over **8.6 kilometres**; Kyoto University has published the 50-watt single-chip PCSEL at fibre-laser brightness; commercially characterised photovoltaic converters run at **55 per cent** at exactly this wavelength.
**Why:** "Commercially characterised" implies a purchasable, datasheet-qualified part. The verification layer says otherwise: design-receiver-thermal.md:29 grades this claim "Verified [pub], with one correction: this is a peer-reviewed Broadcom paper, not a released datasheet; no public AFBR-POC506A6 datasheet exists yet." The same review records that 55% is measured at 18 W out on a ~1 cm² die, and that operation at Era II flux on a full-size die "is a design target, open (risk E12)" (line 31). A design review contradicting the shareable booklet is an unreconciled model, and this is the one external n
**Replace with:** The external record corroborates the architecture end to end: DARPA has delivered **800 watts** of optical power over **8.6 kilometres**; Kyoto University has published the 50-watt single-chip PCSEL at fibre-laser brightness; Broadcom's multi-junction converter has been measured, in peer review, at **55 per cent** at exactly this wavelength.

### private/dossier-aquila/package/booklet-pre-nda.md:64  ·  unsupported-claim
**Current:** All of it was bought on roughly **US$7 million** of equity and non-dilutive funding. Competitors have spent five to ten times as much to demonstrate less.
**Why:** The comparative competitor-spend claim (see investment-thesis.md:68, where it is mis-graded [Measured]) appears here with no grade at all, in the document that travels furthest and to readers who have signed nothing. Comparable programmes do not publish spend figures in a form that supports '5–10×', and 'to demonstrate less' is a contested judgment about other people's hardware. It is also the only claim in the booklet with a live defamation-adjacent edge.
**Replace with:** All of it was bought on roughly **US$7 million** of equity and non-dilutive funding. Against published raise totals, the comparable programmes in the class have raised five to ten times as much, and none has flown an aircraft on the beam.

### private/dossier-aquila/package/booklet-pre-nda.md:74  ·  model-mismatch
**Current:** The program is **$37 million** before beam-powered flight is proven; **$180 million** before corridors operate; **$680 million** before the megawatt laser panel exists; **$2.9 billion** only after megawatt links and beam-powered relays are proven.
**Why:** Three defects in one line. (1) Model mismatch: econ_model.py's declared exposure ladder is $30M / $170M / $670M / $2,870M (CUM_DRAWN); adding the ~$7M already spent gives $37M / $177M / $677M, not $180M / $680M. The rungs are rounded on inconsistent bases and no advisor re-running the model can reproduce them. (2) "before corridors operate" should read "before Era I corridors operate" (investment-thesis.md:82). (3) "program" is US spelling; the canon and the rest of the dossier use "programme" (this booklet itself uses "programme" at lines 45, 62, 70, 72).
**Replace with:** The programme's cumulative exposure is **$37 million** before beam-powered flight is proven; **$177 million** before Era I corridors operate; **$677 million** before the megawatt laser panel exists; **$2.9 billion** only after megawatt links and beam-powered relays are proven.

### private/dossier-aquila/package/booklet-pre-nda.md:88  ·  stale-architecture
**Current:** The pipeline is 46 candidate corridors led by the arid belt: Chile's Atacama, Saudi Arabia's NEOM corridor, the Western Australian Goldfields, Kenya's Marsabit, Oman's Al Wusta. Sunlight is abundant there, terrain defeats the wire, and anchor demand is fixed, clustered, and contract-grade.
**Why:** The booklet's market section describes the *anchor* pipeline and omits the siting doctrine the thesis is now built on. Brownfield is a **screening criterion, not a bonus** (investment-thesis.md:1908); 23 of 46 corridors carry an existing distribution layer holding 79% of addressable population (2016–2018); the feeder-head site — a live MV feeder, 13,000–26,000 people, ~1 MW of day-one load, no distribution to build — is "the class this creates" (715); it is the answer to the thesis's own hardest objection (2518, 2707); and it is half of Gate D (840). None of it appears in the document that tra
**Replace with:** The pipeline is 46 candidate corridors led by the arid belt: Chile's Atacama, Saudi Arabia's NEOM corridor, the Western Australian Goldfields, Kenya's Marsabit, Oman's Al Wusta. Sunlight is abundant there, terrain defeats the wire, and anchor demand is fixed, clustered, and contract-grade.

Twenty-three of the forty-six carry something else: an existing medium-voltage distribution layer, poles and meters and service drops standing with no energy in them, holding **79 per cent** of the pipeline's addressable population. Brownfield is a screening criterion, not a bonus. The feeder-head site — on

### private/dossier-aquila/package/booklet-pre-nda.md:90  ·  signal
**Current:** The serviceable market widens era by era toward the **$60–100 billion** access gap.
**Why:** The booklet carries no delivered price anywhere in its eight sections — no $/kWh, no incumbent comparator, no unit economics. The thesis's central commercial claim is precisely that the unit economics cross the incumbents in sequence: $0.20–0.24/kWh at an Era II anchor site against diesel at $0.40–0.70, $0.359 at a feeder head sold at $0.26–0.30 against an incumbent bill of $0.28–1.10 (investment-thesis.md:72, 636, 715). All of it reproduces under corridor_model.py. A reader who is shown a $60–100B market with no price, and is then handed §VIII, has been given the market before the business. T
**Replace with:** The serviceable market widens era by era toward the **$60–100 billion** access gap.

The unit economics are why it converts. An Era II anchor site delivers at **$0.20–0.24** per kilowatt-hour against diesel at $0.40–0.70. A feeder-head community site delivers at **$0.359**, sold at **$0.26–0.30**, against an incumbent bill these populations already pay of **$0.28–1.10**. Era III delivers at **$0.133**, below new grid extension.

### private/dossier-aquila/package/booklet-pre-nda.md:98  ·  unsupported-claim
**Current:** Every claim in the full dossier carries one of three grades, marked in the text:
**Why:** An integrity claim, in the shareable document, that the thesis falsifies on first opening. The thesis uses at least eight grades in the text: [Measured], [Validated precedent], [Projection—gated], plus [Derived] (2399), [model] (2268), [model-approx] (1565), [order-of-magnitude] (2405), and [alloc] (design reviews). "Every claim carries one of three grades" is checkable and false; the defensible claim is that every material claim is graded and that three grades carry the case. Given a citation audit already found 45 of 65 references defective, an overstated epistemic-hygiene claim is the last 
**Replace with:** Every material claim in the full dossier carries a grade, marked in the text. Three carry the case:

### private/dossier-aquila/package/package-map.md:33  ·  number-inconsistency
**Current:** The falsifier register (F1–F30) dates the observation that would break each material claim.
**Why:** HIGH. The register runs F1–F31; F31, the standardisation falsifier on the fixed 541 kW article, is the one that watches the newest and most contested architectural decision in the package. The booklet correctly says 'thirty-one entries'. The package map is the document that tells a reader what to check, so an off-by-one here silently drops the falsifier on the fixed article.
**Replace with:** The falsifier register (F1–F31) dates the observation that would break each material claim.

### private/dossier-aquila/sim/corridor_model.py:217  ·  model-mismatch
**Current:**     ('feeder-head, billed ($/kWh)',              0.359, 0.006,
**Why:** The validation harness is the package's central credibility instrument — it exists so that an advisor can prove every printed figure reproduces. On this row the tolerance (±0.006) is three times the size of the error it is concealing: the model computes 0.3626 against a printed 0.359, and PASSes. A tolerance wide enough to pass a wrong number defeats the purpose of the file. Tighten it to the precision the figure is printed at, and fix the document to 0.363.
**Replace with:**     ('feeder-head, billed ($/kWh)',              0.363, 0.002,

### private/dossier-aquila/sim/corridor_model.py:226  ·  model-mismatch
**Current:**     ('feeder-head, billed ($/kWh)',              0.359, 0.006,
**Why:** The validator's ±0.006 tolerance is wide enough to PASS a printed figure the model does not produce: the model returns 0.3626, the document prints 0.359. This is the one figure in the whole validation set where the tolerance masks a real disagreement, and the file's own doctrine is 'if it disagrees with the thesis, the thesis is wrong, and --validate fails loudly.' It did not fail loudly. Tighten the tolerance to the class used elsewhere and print the model's value.
**Replace with:**     ('feeder-head, billed ($/kWh)',              0.363, 0.002,

### private/dossier-aquila/sim/econ_model.py:235  ·  model-mismatch
**Current:**     TGT = {"pos": 18.5, "lgf": "30-40 band", "branches": "+2.93/-0.41/-0.18/-0.02/-0.03",
           "p90": 2.1, "mult": 3.8}          # <- printed §IX. EDIT when the thesis is corrected.
**Why:** The validation target carries a mean multiple (3.8×) the model does not produce (3.63×), and the drift tolerance at line 194 (0.25×) is wide enough to pass it silently. This is the same defect as corridor_model.py's ±0.006 on the feeder-head row: a self-validating harness whose tolerance is larger than the error it is meant to catch. The branch medians are also stale against the current engine (model: +2.89/−0.46/−0.19/−0.02/−0.02).
**Replace with:**     TGT = {"pos": 18.5, "lgf": "30-40 band", "branches": "+2.89/-0.46/-0.19/-0.02/-0.02",
           "p90": 2.17, "mult": 3.63}        # <- printed §IX. EDIT when the thesis is corrected.


## LOW

### /Users/billy_j/age-of-wonders/private/dossier-aquila/executive-memo.md:32  ·  model-mismatch
**Current:** while the probability of a positive outcome stops falling at **12 per cent**, because that is simply the probability all four gates pass.
**Why:** NOT A BLOCKER — the auditor verified against the wrong model. Prior 3 is defined in investment-thesis.md §IX (lines 832, 887-891) as the hostile prior plus zero-service plus half-salvage. No gate correlation. The artefact of record for §IX/Appendix C is sim/econ_model.py, and it reproduces the memo exactly: `python3 econ_model.py --stress zero-service,half-salvage` returns, for Prior 2 (hostile reference-class), P(NPV>0) = 11.8%, median loss-given-failure = $116M, median NPV = -$0.12B, with the all-pass branch at 11.8% frequency and 100% P(NPV>0) while every failure branch is NPV-negative. The
**Replace with:** while the probability of a positive outcome stops falling at **12 per cent**, because that is simply the probability all four technical gates pass.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:636  ·  prose
**Current:** an Era II anchor site delivers at **$0.20–0.24/kWh** against diesel at $0.40–0.70 and the the $0.20–0.35 charged today by the companies that power telecom towers
**Why:** Doubled article ("the the"), in the sentence that states the headline anchor economics.
**Replace with:** an Era II anchor site delivers at **$0.20–0.24/kWh** against diesel at $0.40–0.70 and the $0.20–0.35 charged today by the companies that power telecom towers

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:859  ·  unsupported-claim
**Current:** The revenue path underneath is the mission ramp of Appendix B, reaching 150 TWh/yr by 2040 and the billion-person envelope by ~2050, at tariffs declining from $0.40 to $0.04 per kilowatt-hour as the eras mature.
**Why:** FALSE BLOCKER — downgraded to LOW. The auditor's premise is that "no cost figure below $0.10 exists anywhere in" the document, so the B.4 terminal tariffs ($0.05 in 2045, $0.04 in 2050) sell below the cheapest cost derived. That is not true. Appendix B.2 (the LCOE table, ~line 1340) computes an Era III 10 MW site at $0.075/kWh and an Era III+ backbone at $0.036/kWh capex-annuity, and its own reconciliation paragraph states the distinction explicitly: B.2 is the capex-annuity engineering ceiling with curtailed (free) source energy; the Section VIII figures ($0.20-0.24 anchor, $0.359/$0.434 comm
**Replace with:** The revenue path underneath is the mission ramp of Appendix B, reaching 150 TWh/yr by 2040 and the billion-person envelope by ~2050, at blended tariffs declining from $0.40 to $0.04 per kilowatt-hour as the eras mature. That terminal tariff sits above the architecture's own engineering floor, not below it: the Era III+ backbone prices at $0.036/kWh capex-annuity with curtailed source energy (Appendix B.2), which is the same article the Section VIII delivered band of $0.10-0.12 carries once purchased source, demand-ramped capacity factors and layer-split O&M are priced through it.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:1912  ·  path-clarity
**Current:** The product form is deliberate. The system needs all four conditions simultaneously, so a corridor with one failing factor is not a discounted opportunity. It is not yet an opportunity.
**Why:** The bulleted list above it has six lettered entries (A, C, R, B, I, P) introduced as "scored 1–5 on four factors", and the F.3 table scores only four (A, C, R, P; max 625 = 5⁴). B and I are screens, not scored factors, but nothing in the list says so, so the reader cannot reconcile six bullets, "four factors", and a four-column table. The two screens are load-bearing — brownfield status and the tariff instrument are what create the feeder-head class — and burying them as unmarked entries in the scoring list hides them.
**Replace with:** The product form is deliberate. The system needs all four scored conditions simultaneously, so a corridor with one failing factor is not a discounted opportunity. It is not yet an opportunity. B and I are not scored: they are screens applied before the score, and they decide whether a corridor carries a community layer at all.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/package/booklet-pre-nda.md:74  ·  prose
**Current:** The program is **$37 million** before beam-powered flight is proven; **$180 million** before corridors operate; **$680 million** before the megawatt laser panel exists; **$2.9 billion** only after megawatt links and beam-powered relays are proven.
**Why:** US spelling in a British-spelling package, and in the same document that writes "programme" correctly at line 62. The sentence is also mis-framed: $37M is the exposure ceiling, not what the programme "is" — the thesis says "Exposure is capped at $37 million before beam-powered flight is proven."
**Replace with:** Exposure is capped at **$37 million** before beam-powered flight is proven; **$180 million** before corridors operate; **$680 million** before the megawatt laser panel exists; **$2.9 billion** only after megawatt links and beam-powered relays are proven.

### private/dossier-aquila/design-network-operations.md:503  ·  number-inconsistency
**Current:** Per corridor (2–3 relays, 3 ground stations, ~17 sites, ~25 links): **~100 kB/s steady state.**
**Why:** The reference corridor has 16 receiver sites (6 + 3 + 3 + 4). Same stale count as blueprint §10A. Harmless to the telemetry conclusion, but it is the third document carrying a site count the model does not.
**Replace with:** Per corridor (2–3 relays, 3 ground stations, ~16 sites, ~25 links): **~100 kB/s steady state.**

### private/dossier-aquila/engineering-blueprint.md:298  ·  number-inconsistency
**Current:** at a 200 kW greenfield village it carries $241k of idle aperture at Era II receiver pricing ($0.70/W), falling to $103k at Era III ($0.30/W)
**Why:** Idle aperture at a 200 kW village is 541.5 − 200 = 341.5 kW. At $0.70/W that is $239k, not $241k (the $103k Era III figure is consistent with 341.5 kW at $0.30/W, so the two are rounded off different apertures). The thesis quotes $241,000 at line 684 and inherits the same error.
**Replace with:** at a 200 kW greenfield village it carries $239k of idle aperture at Era II receiver pricing ($0.70/W), falling to $102k at Era III ($0.30/W)

### private/dossier-aquila/engineering-blueprint.md:477  ·  number-inconsistency
**Current:** Idle aperture at commissioning is ~3.5 MW (27%), costing ~$2.45M — and buying ~$11M of transmit fungibility that a demand-matched receiver set would strand.
**Why:** The model gives idle aperture of 3.363 MW, which is 28.2 per cent of the 11.912 MW nameplate, costing $2.37M. Printed as 3.5 MW / 27% / $2.45M — three figures, three misses, all small, all in a sentence that claims to be traceable to the model. Same $11M issue as thesis line 686.
**Replace with:** Idle aperture at commissioning is ~3.36 MW (28%), costing ~$2.37M — and buying the transmit plant a demand-matched receiver set would strand: 94 per cent envelope fill on day one against 61 per cent, worth ~$11M of station and fleet capital [alloc].

### private/dossier-aquila/engineering-blueprint.md:477  ·  stale-architecture
**Current:** Idle aperture at commissioning is ~3.5 MW (27%), costing ~$2.45M — and buying ~$11M of transmit fungibility that a demand-matched receiver set would strand.
**Why:** With 22 articles the model gives 3.363 MW idle (28% of the 11.91 MW nameplate) at $2.37M. The 3.5 MW / $2.45M pair belongs to the superseded 24-article corridor, and it sits two sentences after the corrected 22-article count in the same paragraph.
**Replace with:** Idle aperture at commissioning is ~3.36 MW (28%), costing ~$2.37M — and buying ~$11.4M of transmit and relay capacity that a demand-matched receiver set would strand.

### private/dossier-aquila/engineering-blueprint.md:522  ·  number-inconsistency
**Current:** **Comparator.** The voltage-appropriate comparator (132 kV backbone + MV feeders + substations to the same 17 sites, at the thesis's §II unit costs) is roughly **$82–140M**
**Why:** Sixteen sites, per the §10A.1 site mix. The comparator must serve the same site count as the corridor or the 1.2–2.1× ratio is not a like-for-like.
**Replace with:** **Comparator.** The voltage-appropriate comparator (132 kV backbone + MV feeders + substations to the same 16 sites, at the thesis's §II unit costs) is roughly **$82–140M**

### private/dossier-aquila/engineering-blueprint.md:562  ·  stale-architecture
**Current:** | 0–4 | Ground-station civil works (source region); receiver plinths at 17 sites (parallel, local crews) |
**Why:** 16 sites, not 17.
**Replace with:** | 0–4 | Ground-station civil works (source region); receiver plinths at 16 sites (parallel, local crews) |

### private/dossier-aquila/investment-thesis.md:56  ·  unsupported-claim
**Current:** *First.* The market is the largest unserved market on Earth, and it is going backwards.
**Why:** A superlative inside a [Measured]-tagged paragraph. 'Largest unserved market on Earth' is not measured and is not defined — larger than unserved healthcare, sanitation, credit, or housing? Each has a larger addressable population than the 655M/1.18B figures cited. The phrase also recurs three more times as a flat assertion (lines 98, 818, and booklet line 116, where it closes the shareable document). The measured facts in the paragraph are strong enough alone; the superlative adds nothing and invites a rebuttal the package cannot win.
**Replace with:** *First.* The market is one of the largest unserved markets on Earth, and it is going backwards.

### private/dossier-aquila/investment-thesis.md:367  ·  unsupported-claim
**Current:** The operating hardware is fibre-laser and diode-array at 1080 nanometres, the wavelength where two decades of industrial fibre-laser volume have driven the cheapest bright watts in photonics.
**Why:** 'the cheapest bright watts in photonics' is a superlative under a **Today [Measured]** heading. Brightness-per-dollar comparisons across photonics (diode bars at 9xx nm, for instance, are cheaper per watt though less bright) are contestable, and the sentence does not need the superlative: the procurement fact that follows ('prices Aquila has procured below $2 per watt in unit volume') is the [Measured] claim and it is stronger.
**Replace with:** The operating hardware is fibre-laser and diode-array at 1080 nanometres, the wavelength where two decades of industrial fibre-laser volume have driven the cheapest bright watts available at this beam quality.

### private/dossier-aquila/investment-thesis.md:634  ·  signal
**Current:** The delivered-cost comparison carries three disciplines: source energy is priced *through* the chain efficiency where it is purchased rather than curtailed; the utilisation assumed for a site (its capacity factor: the share of its rated output it actually delivers over a year) is the demand-ramped value a real community site reaches, not a nameplate assumption; and the airframe is at its $2M planning price (falsifier F12). 
**Why:** The most important subsection in the document opens with sixty-six words of method rather than a claim, and the section then runs twenty-six lines into an on-site-solar digression (lines 640–666) that belongs in §X's competitive landscape, before returning to Era I economics at line 668. The reader arrives at the delivered-cost table having lost the thread. The fix is not to cut the solar material — it is honest and load-bearing — but to open with the claim and give the solar boundary its own heading so the argument order reads: cost, then who we beat, then who we do not.
**Replace with:** Lightway crosses the incumbents in sequence, era by era, and the crossings are audited on three disciplines. Source energy is priced *through* the chain efficiency wherever it is purchased rather than curtailed. The utilisation assumed for a site (its capacity factor: the share of its rated output it actually delivers over a year) is the demand-ramped value a real community site reaches, not a nameplate assumption. And the airframe sits at its $2M planning price (falsifier F12). 

### private/dossier-aquila/investment-thesis.md:684  ·  number-inconsistency
**Current:** The idle aperture at a village is $241,000 of receiver at Era II pricing and $103,000 at Era III
**Why:** Greenfield idle aperture is 541.5 − 200 = 341.5 kW; at $0.70/W that is $239,000, and at $0.30/W it is $102,000. Small, but the sentence is presented as arithmetic a reader can do in their head — so it must be the arithmetic that comes out.
**Replace with:** The idle aperture at a village is $239,000 of receiver at Era II pricing and $102,000 at Era III

### private/dossier-aquila/investment-thesis.md:696  ·  path-clarity
**Current:** At a 200-kilowatt village the fixed layer alone is **forty-four per cent** of the site.
**Why:** 44% is F/(F + v·P_demand) = $0.30M/$0.68M — the fixed layer's share of a *demand-matched* 200 kW site. The site this paragraph is actually pricing carries a fully-populated 541 kW article, costs $0.919M, and the fixed layer is 33% of it. The sentence sits two lines after the article rule is stated, so the basis has to be named or it reads as an unreconciled figure. (Repeated verbatim in blueprint §9.4 and design-receiver-thermal §10.)
**Replace with:** At a 200-kilowatt village the fixed layer alone is **a third** of the site, and **forty-four per cent** of the demand-matched site it is measured against.

### private/dossier-aquila/investment-thesis.md:709  ·  number-inconsistency
**Current:** Fill the transmit envelope on day one and fleet capital per delivered watt falls by a third, from the same six airframes.
**Why:** $1.89/W → $1.40/W is a fall of 26 per cent, a quarter, not a third. The same two figures are quoted correctly as a ratio at line 755 and in blueprint §10A.4, so this is the only place the claim is inflated.
**Replace with:** Fill the transmit envelope on day one and fleet capital per delivered watt falls by a quarter, from the same six airframes.

### private/dossier-aquila/investment-thesis.md:899  ·  number-inconsistency
**Current:** The all-gates-pass branch still carries a median +$2.65B in present value, compounding at 33 per cent a year, under the stacked stress
**Why:** econ_model.py --stress zero-service,half-salvage returns a median all-pass NPV of +$2.69B. (The $116M loss-given-failure in the same paragraph does reproduce exactly — this is the only figure in the stacked run that does not.)
**Replace with:** The all-gates-pass branch still carries a median +$2.69B in present value, compounding at 33 per cent a year, under the stacked stress

### private/dossier-aquila/investment-thesis.md:901  ·  model-mismatch
**Current:** lifting P(NPV>0) from 18.5 to 29.5 per cent and nearly doubling the all-pass frequency
**Why:** `econ_model.py --prior hostile --stress correlated` gives 29.4%. Trivially small, but this is the one paragraph that explicitly invites the reader to re-run the model against the printed number.
**Replace with:** lifting P(NPV>0) from 18.5 to 29.4 per cent and nearly doubling the all-pass frequency

### private/dossier-aquila/investment-thesis.md:1132  ·  unsupported-claim
**Current:** The exposure ladder is $37M / $180M / $680M / $2.9B because those are the tranche commitments themselves; the single-mode record is 50 watts because Nature printed it.
**Why:** A0 offers these as the example of a number 'structurally exact… stated to its full precision, because the reader can check it.' A reader who checks gets $37M ($7M T0 + $30M T1), then $177M, $677M and $2,877M. $180M and $680M are rounded, which is fine — but not under a sentence that claims exactness and invites the check. Either drop them from the exactness example or state the rounding.
**Replace with:** The exposure ladder is $37M / $177M / $677M / $2.87B because those are the tranche commitments themselves, rounded in the body to $180M / $680M / $2.9B; the single-mode record is 50 watts because Nature printed it.

### private/dossier-aquila/investment-thesis.md:1354  ·  stale-architecture
**Current:** | Era II community site, year-5 — feeder head / greenfield (fixed 541 kW article, F + v·P basis) | **$0.359 / $0.434 /kWh** |
**Why:** The parenthetical cites the superseded single-P formula for figures that are produced by the two-term model. A reader who follows the pointer and rebuilds on F + v·P will not reproduce $0.434.
**Replace with:** | Era II community site, year-5 — feeder head / greenfield (fixed 541 kW article, F + v_r·P_aperture + v_e·P_demand basis) | **$0.359 / $0.434 /kWh** |

### private/dossier-aquila/investment-thesis.md:1447  ·  number-inconsistency
**Current:** |—with 30% concessional layer (2%, 20-yr) | commercial tranche ~$37M | **~10.2% IRR** |
**Why:** 70% of the $50.98M ground stack is $35.7M. '~$37M' collides visually with the '~$37M of Aquila-content procurement' four lines below (line 1451) — two unrelated quantities printed at the same value invite a reader to conflate them.
**Replace with:** |—with 30% concessional layer (2%, 20-yr) | commercial tranche ~$36M | **~10.2% IRR** |

### private/dossier-aquila/investment-thesis.md:1719  ·  stale-architecture
**Current:** Subsystem-level source tables, with recomputed arithmetic, are carried in the three companion design reviews (design-pcsel-array, design-haps-relay, design-receiver-thermal).
**Why:** LOW. There are four design reviews, and the fourth — design-network-operations — is the one that verifies the availability model, the attrition arithmetic, and the reference corridor's operating case. Falsifier F24 and the corridor sanction test both cite it. Appendix E is the reader's map of the evidence base; omitting a quarter of it makes the verification layer look smaller than it is.
**Replace with:** Subsystem-level source tables, with recomputed arithmetic, are carried in the four companion design reviews (design-pcsel-array, design-haps-relay, design-receiver-thermal, design-network-operations).

### private/dossier-aquila/investment-thesis.md:1903  ·  path-clarity
**Current:** Each corridor is scored 1–5 on four factors, and the composite is their product, to a maximum of 625:
**Why:** LOW — but it is the method statement for the pipeline, and six bullets follow a sentence that promises four. A reader must infer that A, C, R and P are scored and multiplied (5⁴ = 625, which is what the top-ten table shows) while B and I are binary screens that decide whether a community layer exists at all. That inference is load-bearing — brownfield status and the tariff instrument are the two screens the whole feeder-head thesis rests on — and it should be stated, not left to the reader.
**Replace with:** Each corridor is scored 1–5 on four factors (A, C, R, P), and the composite is their product, to a maximum of 625. Two further criteria (B, I) are screens rather than scores: they decide whether a community layer exists at the corridor at all.

### private/dossier-aquila/sim/corridor_model.py:172  ·  model-mismatch
**Current:**     src = 1.9 * (gwh / 38.8)
**Why:** Source energy is scaled on BILLED energy, but the corridor buys the electricity for the 1.97 GWh it delivers and cannot bill (the 15% non-technical-loss haircut on the three brownfield feeder-head sites). Theft does not reduce your fuel bill. The line understates source energy by ~$0.10M/yr. Small on its own — but it sits inside a file whose docstring promises 'If it disagrees with the thesis, the thesis is wrong', and it is the kind of thing a rebuilding advisor finds and then uses to question everything above it. Same file, same line: the 38.8 GWh baseline that both opex lines scale from app
**Replace with:**     gwh_delivered = sum(s.n * s.energy_gwh(billed=False) for s in sites)
    src = 1.9 * (gwh_delivered / 38.8)   # source energy is bought on DELIVERED, not billed:
                                          # the corridor pays for the kWh it cannot collect on

---

## Re-verification — 16 July 2026 consistency fleet

The previous blanket closure statement was superseded by the three-basis receiver convention. Cross-document coherence now requires every capacity claim to identify whether it means **hardware ceiling**, **mean planning**, **contracted output**, **day-one load**, or **transmit envelope**.

The governing Era II corridor is 22 fixed articles across 16 sites. Per article: 788.055 kW hardware / 541.465 kW planning / 487.318 kW contracted. Corridor totals: 17.337 MW / 11.912 MW / 10.721 MW on those bases, against 8.549 MW day-one load. The canonical N-1 ingress estate is 3 stations × 9 panels = 27 panels / 51.3 MW nominal installed; the surviving pair is dispatch-capped at 31.8 MW optical / 3.509 = 9.0624 MW delivered. Initial corridor capital is $76.0286M. The cost model is F + v_r·P_hardware + v_e·P_demand, plus the committed N-1 ingress estate.

The earlier 24-article / 17-site / 12.98 MW statement is retired. The SWF Evaluator Brief is in scope as a non-authoritative navigation aid; its claims must inherit the same sources and cannot override the dossier. Citation residuals are tracked in `CITATION-AUDIT.md` and remain open until their exact URLs are mapped.

### Corridor-economics propagation closure — 16 July 2026

`sim/corridor_model.py` is the live authority for the reference-corridor split. It now computes and validates all four return labels separately:

- operator capital **$62.528610M**; annual year-five share **$4.108146M**;
- operator first-year cash yield **6.5700%**;
- operator flat-flow IRR **−0.1820% over 15 years** and **4.2479% over 25 years**, using one outflow at t=0, equal end-of-year inflows and no growth, refleet or terminal value;
- Aquila first-year cash yield **30.4307%**, and commercial-tranche first-year cash yield after the model's 30% concessional blend and financing-cost drag **8.5258%**. Neither is an IRR.

The live `investment-thesis.md` and `engineering-blueprint.md` now carry the rounded N-1 forms 6.57%, −0.18%, 4.25%, 30.43% and 8.53% on the same bases. Appendix B-2.3 identifies the flat-flow comparator and separates the programme-level entry-point IRRs in B-2.2 from corridor cash yields. The Section VIII operating summary, tranche table, F30 and Appendix K financeability response use the same terminology.

`python3 sim/corridor_model.py` passes all 27 printed-figure checks, including ingress quantisation, N-1 feasibility, committed capital and both flat-flow IRRs. Earlier finding text above remains the historical audit record; this closure block is the current disposition.

The former Era III **5.41 MW / exactly 10:1** convention preserved in earlier findings is also superseded. The current dossier treats P3 as a separately qualified rack article: **19 MW optical, 2.360 planning chain, 9.08 MW hardware ceiling, 8.05 MW planning and 7.41 MW contracted**. It is not used to alter the Era II reference-corridor economics.

### Final hostile red-team closure — 16 July 2026

The last independent pass reopened a costing convention that earlier checks had missed. Laser learning-curve prices are quoted per **optical watt out**. Multiplying an optical-output price by the optical-to-delivered chain already converts it to dispatched delivered-watt capex; dividing that result by PCSEL wall-plug efficiency again double-counts WPE. WPE belongs in electrical input, source energy, cooling and electrical balance of plant. It does not create additional optical-output laser hardware.

The live reference corridor model was not corrupted: it has always priced the 27 installed panels directly as 51.3 MW optical × $0.40/W = **$20.52M**. The resulting **$2.40/W of day-one delivered load** is caused by the N-1 installed estate and initial utilisation, not by a second WPE divisor. The stale convention did, however, reach the 2036–39 governed-equipment stream and the long-run Appendix B.2/B.3 stage table. Those derivatives are now rebuilt:

- Aquila governed content: **$3.813/W** of Era II planning nameplate; **$0.872/W** in 2036–39, comprising $0.20/W-optical × the 2.360 Era III planning chain + $0.30/W receiver + ~$0.10/W deployment integration; **$0.90/W** from 2040 on the declared mature integration basis.
- Founder equipment-stream expected NPV at 15%: **$0.98B**. Founder expected inflow/spend/net: **$3.76B / $0.46B / +$3.29B**, or **8.09×**.
- Hostile seeded case: **18.5% P(NPV>0)**; P10/P50/P90 **−$0.23B / −$0.03B / +$3.82B**; success IRR **35.4% / 38.6% / 41.7%**; all-pass median **+$4.68B**.
- Success-path entry IRRs with the governed stream: **52.3% / 56.9% / 71.3% / 119.0%** at T1/T2/T3/T4; uplifts **+6.4 / +7.8 / +13.4 / +35.6 points** against the rebuilt core paths.
- Long-run stage table: Era I **$27.3/W and $1.22/kWh**; Era II **$5.79/W and $0.194/kWh**; Era III **$2.515/W and $0.067/kWh**; mature backbone **$1.27/W capex and $0.109/kWh including paid source energy**.

The same pass closed five release residues: the archived 200-trial network fixture is byte-exact against the capacity-aware model; Era III explicitly uses 0.5 corridor per-unit per clear ingress and reports **99.2% mean power-weighted capacity / 99.5% delivered trunk service**; the site manifest states 12 pages including `model.html`; Mark Murphy's four photographs are current Aquila employee work product with chain-of-title retention required; and William Jeremijenko's Zimbabwe homestead image is recorded as his own phone photograph.

The root release battery reproduces the corridor's 27/27 printed checks, the full 200-trial network tables, Python/JavaScript byte parity, default/hostile/core-only/stacked programme cases, equipment stream and entry IRRs. Earlier issue blocks remain historical evidence only; this is the current closure disposition.
