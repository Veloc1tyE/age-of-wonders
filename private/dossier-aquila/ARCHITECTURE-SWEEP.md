---
uid: note_a41cd6b14116
---

# Architecture consistency sweep — 14 July 2026 (finding register; basis updated 16 July 2026)

**170 findings in the 14 July pass.** Every BLOCKER was adversarially re-verified before it entered this register. The detailed `Current` and `Replace with` blocks preserve the architecture reviewed on that date; they are not live specifications. The latest basis and closure state are in the addendum at the end.


## BLOCKER

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-haps-relay.md:142
**Current:** The design carries two pre-registered responses if the spectrum is hostile: passive isolation stage between wing and payload (costs 2–4 kg), and spot-size increase at the receiver (costs receiver area, not feasibility).
**Why:** "Costs receiver area" assumes a re-sizable ground receiver. The finalised architecture fixes the aperture, concentrating optic and cell tiling, qualified once at one flux point: no swappable optic, no partial population, no per-site area growth. Sites scale by receiver COUNT. As written this pre-registered fallback silently reintroduces the rejected variable-aperture architecture.
**Replace with:** The design carries two pre-registered responses if the spectrum is hostile: passive isolation stage between wing and payload (costs 2–4 kg), and spot-size increase at the receiver, absorbed by adding receiver articles at the site (the article's aperture, optic and cell tiling are fixed and qualified once; receiver count is the site's only scaling variable): costs receiver count and flux-managed capture margin, not feasibility.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-haps-relay.md:358
**Current:** - **Cost consequence:** doubles relay count per corridor length. Fleet capital and the tap toll both scale with relay count: a 400 km corridor takes 4 relays instead of 2, fleet capital +$12M at the $2M planning hull ×6-airframe ratio, and relay throughput stacks twice more (0.96² = 0.92 corridor relay stage).
**Why:** The printed ratio contradicts the printed total. Two added stations at a 6-airframe-per-station ratio and $2M/hull rebuilds to $24M, not $12M. The N+1 doctrine is 3 hulls per station (6 assigned across the 2-station reference corridor, design-network-operations §3.2), which is what gives $12M.
**Replace with:** - **Cost consequence:** doubles relay count per corridor length. Fleet capital and the tap toll both scale with relay count: a 400 km corridor takes 4 relays instead of 2, fleet capital +$12M (2 added stations × 3 hulls per station at N+1 × $2M planning hull), and relay throughput stacks twice more (0.96² = 0.92 corridor relay stage).

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-network-operations.md:132
**Current:** **Geometry.** The §10A reference: two ingress stations (80 km apart, both ≥1,200 m), two relay stations at 200 km hop spacing, each serving its half-corridor's receiver footprint. Nominal 9.75 MW, ~7.3 MW firm on the planning basis [alloc: blueprint §10A].
**Why:** "9.75 MW nominal" is the superseded §10A.2 figure. Under the fixed, fully-populated, panel-matched article the corridor's true receiver nameplate is 13.06 MW (24 articles across 17 sites: 4 feeder-head × 2 + 4 greenfield × 1 + anchor/tower articles). 9.75 MW counted anchor DEMAND as nameplate. A reader rebuilding 24 × 541 kW cannot reach 9.75 MW.
**Replace with:** **Geometry.** The §10A reference: two ingress stations (80 km apart, both ≥1,200 m), two relay stations at 200 km hop spacing, each serving its half-corridor's receiver footprint. Receiver nameplate 13.06 MW: 24 fully-populated 541 kW articles across 17 sites (feeder-head sites take 2 articles, greenfield villages 1). Day-one load ~7.9 MW, ~7.3 MW firm on the planning basis; the difference between nameplate and load is deliberate over-build, not spare hardware [alloc: blueprint §10A].

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-network-operations.md:322
**Current:** Era II beam-powered fleet, 2 relay stations, N+1, anchor firm 0.50 pu + community 0.35 pu peak, genset 0.55 pu (pu = per unit of corridor capacity).
**Why:** "Corridor capacity" is now ambiguous and the whole table is unrebuildable in MW. With the fixed article the corridor has two different capacities: 13.06 MW of receiver nameplate and ~9.75 MW of contracted planning capacity. The simulated demand fractions were set against the latter (0.50 pu ≈ 4.9 MW anchor firm + 0.35 pu ≈ 3.4 MW community peak ≈ the 7.9 MW day-one load). Read against nameplate th
**Replace with:** Era II beam-powered fleet, 2 relay stations, N+1, anchor firm 0.50 pu + community 0.35 pu peak, genset 0.55 pu (pu = per unit of the corridor's 9.75 MW contracted planning capacity, NOT the 13.06 MW fully-populated receiver nameplate: anchor firm 4.9 MW, community 3.4 MW peak, genset 5.4 MW, against a ~7.9 MW day-one load).

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-network-operations.md:391
**Current:** At today's $5.5M hull that is the $1.5–3.0M/yr line that keeps Era I corridors service-carried. At the $2M Era II hull and 2%/transit it is ~$0.25M/yr (Table NO-2 loss column × $2M ≈ $0.5–0.6M at 2 ingress, ~$0.55M of which is descent-driven, halved again by the third site).
**Why:** The arithmetic does not rebuild. Table NO-2's loss column at 2 ingress is 0.52–0.59 hulls/yr, which × $2M is $1.0–1.2M/yr, not the $0.5–0.6M printed; $0.5–0.6M is the 3-ingress row (0.27–0.29 × $2M). The parenthetical also says $0.55M is "descent-driven" out of a $0.5–0.6M total, which would leave no scheduled-rotation attrition at all, contradicting §4.2 (0.05 hulls/station-yr × 2 stations = 0.10
**Replace with:** At today's $5.5M hull that is the $1.5–3.0M/yr line that keeps Era I corridors service-carried. At the $2M Era II hull and 2%/transit, scheduled rotation alone costs ~$0.2M/yr (0.05 hull losses/station-yr × 2 stations × $2M, §4.2). The simulated total, which adds descent-recovery transits, is Table NO-2's loss column × $2M: ~$1.0–1.2M/yr at two ingress sites (0.52–0.59 hulls/yr) and ~$0.55M/yr at three (0.27–0.29 hulls/yr). The third ingress site halves the attrition line as well as the genset line.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-network-operations.md:426
**Current:** Anchor-weighted, 91% contract-grade revenue, 9.75 MW nominal [alloc: blueprint §10A].
**Why:** Same stale nameplate. The finalised architecture fixes the corridor at 13.06 MW of fully-populated receiver nameplate; "9.75 MW nominal" is the demand-matched figure the fixed article replaced. This is a travelling case-study number a reader will rebuild against the site table.
**Replace with:** Anchor-weighted, 91% contract-grade revenue; 13.06 MW of fully-populated receiver nameplate (24 × 541 kW articles across 17 sites) against a ~7.9 MW day-one load [alloc: blueprint §10A].

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-pcsel-array.md:119
**Current:** | Combining budget | λ/30 RMS piston ⇒ η = exp(−(2π/30)²) = 0.957; fill/truncation 0.85–0.92 post-lenslet; product 0.81–0.88. The corridor link budget's 0.90 "homogeniser + fill" line sits at the optimistic edge: hold λ/30 and >90% effective fill simultaneously or re-baseline the line to 0.85 | recomputed |
**Why:** The 0.90 homogeniser+fill term is now a frozen factor inside the finalised 3.509 optical-W-per-delivered-W chain, and that chain is what fixes the article at 1.9 MW / 3.509 = 541 kW. Offering 're-baseline the line to 0.85' as an equal option would move the article to ~511 kW and force re-certification of a fixed, fully-populated aperture. The review must convert it into a P2 acceptance requirement
**Replace with:** | Combining budget | λ/30 RMS piston ⇒ η = exp(−(2π/30)²) = 0.957; fill/truncation 0.85–0.92 post-lenslet; product 0.81–0.88. The corridor link budget's 0.90 "homogeniser + fill" line is **frozen**: it is a term in the finalised chain of **3.509 optical W per delivered W**, which fixes the Era II article at 1.9 MW / 3.509 = **541 kW delivered**. Re-baselining it to 0.85 would move the article to ~511 kW and force re-certification of a fixed, fully-populated aperture. Therefore: hold λ/30 and >90% effective fill **simultaneously** — this is a P2 acceptance requirement, not a budget line available for relaxation | recomputed |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-pcsel-array.md:279
**Current:** | P1 | Side-lobe census fails the stray-flux safety allocation | Sub-array far-field survey at P1 | Raise effective fill (lenslet redesign); aperture apodisation; spot-size increase at receiver (costs receiver area) |
**Why:** 'Spot-size increase at receiver (costs receiver area)' assumes a receiver whose aperture can be bought larger per site. The receiver is a fixed article: aperture, concentrating optic and cell tiling are qualified once, fully populated, with no partial population and no swappable optic. Receiver area is not a purchasable fallback lever, and printing it as one revives the rejected cassette architect
**Replace with:** | P1 | Side-lobe census fails the stray-flux safety allocation | Sub-array far-field survey at P1 | Raise effective fill (lenslet redesign); aperture apodisation. **Spot-size growth at the receiver is not a lever**: the receiver is a fixed, fully-populated article with a qualified aperture, so any spot growth beyond it spills off the cell plane and lands in the stray-flux budget, not in a larger receiver |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-pcsel-array.md:284
**Current:** | P4 | Control-plane latency/fault-propagation at 10⁵ channels defeats autonomous safe shutdown | P4 field-scale shutdown demonstration | Block segmentation into independently interlocked racks (costs block-level coherence ⇒ larger far-field spot; receiver oversizing absorbs it); staged commissioning |
**Why:** 'Receiver oversizing absorbs it' contradicts the fixed article directly. Receivers ship at one aperture, fully populated, qualified once. There is no oversizing lever; the larger far-field spot must be absorbed inside the article's already-qualified aperture or it is a stray-flux event.
**Replace with:** | P4 | Control-plane latency/fault-propagation at 10⁵ channels defeats autonomous safe shutdown | P4 field-scale shutdown demonstration | Block segmentation into independently interlocked racks (costs block-level coherence ⇒ larger far-field spot, which must be absorbed inside the fixed article's qualified aperture: **there is no receiver-oversizing lever** — receivers ship at one aperture, fully populated); staged commissioning |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-receiver-thermal.md:38
**Current:** | 10 | Node CAPEX $1.19–2.19M/MW → $0.93–1.56M/MW | **Holds with the thermal correction**. The receiver's heat-rejection plant and the battery cooling together add ~$60–160k/MW, which is inside the width of the band (§6 below). |
**Why:** This is the verdict row that CERTIFIES the site cost model, and it certifies a pure $/MW formula — the exact modelling defect the finalised architecture names. Site cost is F + v_r·P_aperture + v_e·P_demand (F ≈ $300k fixed, v_r $0.70/W Era II → $0.30/W Era III on aperture, v_e ≈ $1.20/W on metered demand). A per-MW band cannot reproduce the 44% fixed-layer share at a 200 kW site or the P* = 158 k
**Replace with:** | 10 | Site CAPEX = F + v_r·P_aperture + v_e·P_demand (F ≈ $300k fixed per site; v_r = $0.70/W Era II → $0.30/W Era III, scaling with APERTURE; v_e ≈ $1.20/W, scaling with METERED DEMAND) | **Holds with the thermal correction, on the fixed-article cost model.** The receiver's heat-rejection plant (~$27–70k per 541 kW article) lands in v_r; the battery cooling (~$30–80k per site) lands in F. Together ~$57–150k against a ~$0.92M greenfield village site (1 article, 200 kW demand) or a ~$2.26M feeder-head site (2 articles, 1 MW demand) — see §6. Any pure $/W or $/MW site figure is a modelling defect: at a 200 kW site the fixed layer is 44% of the cost, and the crossover is P* = F/v = 158 kW. |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-receiver-thermal.md:81
**Current:** At the planning basis (η_module = 0.50), waste heat at the cell plane equals delivered DC power: **25 kW site → 25 kW heat; 1 MW site → ~1.0 MW heat; 10 MW site → ~10 MW heat**, plus the protected-volume load of §3c (~10% of incident, ~100 kW at 1 MW).
**Why:** There is no 1 MW or 10 MW receiver. The receiver is a fixed, panel-matched article: Era II = 541 kW delivered (one 1.9 MW panel ÷ 3.509), Era III = 5.41 MW (one 19 MW rack). Every downstream thermal-plant size, parasitic, and cost line in this document is rebuilt from this row, so the whole cooling plant is oversized ~1.85× at Era II and ~1.85× at Era III.
**Replace with:** At the planning basis (η_module = 0.50), waste heat at the cell plane equals delivered DC power: **25 kW Era I anchor → 25 kW heat; the 541 kW Era II article → ~541 kW heat; the 5.41 MW Era III article → ~5.41 MW heat**, plus the protected-volume load of §3c (~10% of incident: ~108 kW at Era II, ~1.08 MW at Era III).

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-receiver-thermal.md:83
**Current:** A 1 MW receiver is, thermally, a 1.1 MW industrial cooling job in a 45 °C ambient: routine data-centre/industrial scale [pub].
**Why:** No 1 MW receiver exists in the finalised architecture. The Era II article is 541 kW delivered against ~1.08 MW incident: a ~0.65 MW cooling job (541 kW cell plane + ~108 kW protected volume). The Era III article is ~6.5 MW.
**Replace with:** The Era II receiver article is, thermally, a ~0.65 MW industrial cooling job in a 45 °C ambient (541 kW at the cell plane plus ~108 kW of protected volume); the Era III article is a ~6.5 MW one. Both are routine data-centre/industrial scale [pub].

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-receiver-thermal.md:115
**Current:** - **Era II community (1 MW).** Option 3 as baseline at 50–80 W/cm² planning flux: its cost is inside Option 2's band, its margin is 4× better, and it is the stack the IBM dense-array precedent already ran at 2,000 suns [pub].
**Why:** The Era II community receiver is the fixed 541 kW article, not a 1 MW one. The stack is qualified once, at one flux point in the 50–100 W/cm² band, for that article — there is no per-site sizing.
**Replace with:** - **Era II community (the fixed 541 kW article).** Option 3 as baseline at 50–80 W/cm² planning flux, qualified once at a single flux point for the article: its cost is inside Option 2's band, its margin is 4× better, and it is the stack the IBM dense-array precedent already ran at 2,000 suns [pub].

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-receiver-thermal.md:116
**Current:** - **Era III (10 MW).** Option 3 mandatory. ~10 MW of heat, carried through coolant-distribution-unit manifolds to adiabatic dry coolers, is a standard industrial plant. At 100 W/cm² operation the stack has ≥2× margin at every module efficiency in the table. Era III at 100 W/cm² is gated on the cell (E12), never on the cooling.
**Why:** Era III is a 5.41 MW article (one 19 MW rack ÷ 3.509), not 10 MW, and it is a re-certification event on a single 3.6–5.1 m aperture with a 10–20 m² cell plane — not a composition of ten Era II receivers. '~10 MW of heat' oversizes the Era III thermal plant by ~1.85× and a reader will rebuild the dry-cooler field from it.
**Replace with:** - **Era III (the fixed 5.41 MW article).** Option 3 mandatory. ~6.5 MW of heat (5.41 MW at the cell plane plus ~1.08 MW of protected volume), carried through coolant-distribution-unit manifolds to adiabatic dry coolers, is a standard industrial plant. At 100 W/cm² operation the stack has ≥2× margin at every module efficiency in the table. The Era III stack is re-qualified in its own right on the 10–20 m² cell plane of a single 3.6–5.1 m aperture; it is not ten Era II receivers. Era III at 100 W/cm² is gated on the cell (E12), never on the cooling.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-receiver-thermal.md:180
**Current:** **Arithmetic of the uncorrected claim.** A 3 MWh unrefrigerated buffer, cycling daily at 40–50 °C cell temperature, reaches 80% state of health in ~5–7 years, against the site's 15–20-year frame.
**Why:** The 3 MWh buffer is a legacy 1 MW-site figure. Under the finalised architecture the greenfield battery is sized to the BEAM SLICE, not to load and not to nameplate: the 541 kW article against a ~200 kW day-one load leaves ~344 kW of surplus over a ~4 h window ⇒ ~1.4 MWh usable (~1.55 MWh nameplate). The package's current battery line is under-sized by ~$40–60k/site against this; a 3 MWh figure pri
**Replace with:** **Arithmetic of the uncorrected claim.** The greenfield buffer is sized to the beam slice, not to load: the 541 kW article against a ~200 kW day-one load leaves ~344 kW of surplus over a ~4 h window ⇒ ~1.4 MWh usable (~1.55 MWh nameplate). Unrefrigerated, cycling daily at 40–50 °C cell temperature, it reaches 80% state of health in ~5–7 years, against the site's 15–20-year frame.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-receiver-thermal.md:182
**Current:** That is one to two extra pack replacements at ~$285k each (3 MWh × $95/kWh pack [pub-class]), or **+13–26% relay CAPEX equivalent**. Active cooling costs ~$30–80k installed, plus 2–5% of throughput in parasitic load.
**Why:** Two errors. The $285k rebuilds from the wrong 3 MWh buffer (correct: ~1.55 MWh nameplate ⇒ ~$150k). And 'relay CAPEX' is a nomenclature violation: relay = the stratospheric platform. This is SITE CAPEX, and it must be quoted against the F + v_r·P_aperture + v_e·P_demand site, not a per-MW band.
**Replace with:** That is one to two extra pack replacements at ~$150k each (1.55 MWh nameplate × $95/kWh pack [pub-class]), or **+16–33% of the ~$0.92M greenfield site CAPEX** (F $300k + $0.70/W × 541 kW + $1.20/W × 200 kW). Active cooling costs ~$30–80k installed, plus 2–5% of throughput in parasitic load.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-receiver-thermal.md:190
**Current:** **Inverters.** The 500 kW-class power conversion system (PCS) runs at 98.5–98.7% peak efficiency, forced-air cooled, with derating onset at +45 °C ambient (Dynapower CPS-class [pub]). That is ~7.5 kW of heat each at rating, ~15 kW per site pair.
**Why:** '~15 kW per site pair' sizes two 500 kW PCS units to a 1 MW receiver nameplate. The finalised architecture sizes ALL surrounding electrical — battery, inverters, switchgear, conversion — to METERED DEMAND, never to receiver nameplate. A greenfield village runs ~200 kW day-one against a deliberately over-built 541 kW article. Sizing the PCS to nameplate double-counts v_e and inflates the site.
**Replace with:** **Inverters.** Power conversion is modular and sized to METERED DEMAND, never to the article's 541 kW nameplate. The 500 kW-class power conversion system (PCS) runs at 98.5–98.7% peak efficiency, forced-air cooled, with derating onset at +45 °C ambient (Dynapower CPS-class [pub]): ~7.5 kW of heat each at rating. A greenfield village at ~200 kW day-one demand carries one 250 kW-class unit (~3.75 kW of heat) and adds units as the ramp earns them; a feeder-head site at ~1 MW carries two 500 kW units (~15 kW).

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-receiver-thermal.md:201
**Current:** **LCOE carry.** Delivered-energy denominators shrink by the same fraction: the Era II community site's ~$0.34/kWh planning LCOE takes **+$0.011–0.026/kWh**; the Era II anchor band $0.17–0.19 takes +$0.006–0.013.
**Why:** $0.34/kWh is the superseded LCOE and is 12% optimistic. The corrected figures are $0.434/kWh community greenfield and $0.359/kWh feeder-head billed (Era III $0.133). A reader rebuilding the parasitic carry against $0.34 lands on the wrong site economics.
**Replace with:** **LCOE carry.** Delivered-energy denominators shrink by the same fraction: the community greenfield site's **$0.434/kWh** LCOE and the feeder-head site's **$0.359/kWh** billed LCOE each take **+$0.011–0.026/kWh**; the Era II anchor band $0.17–0.19 takes +$0.006–0.013.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-receiver-thermal.md:229
**Current:** **Register entry.** The E4 fallback at Era II economics is **100 → 50 W/cm² (cost +60% on the module line, ~+9–12% on site CAPEX)**: survivable.
**Why:** The +9–12% cannot be rebuilt from anything printed in the package, and it is wrong on the finalised cost model. Derating 100→50 W/cm² takes v_r from $0.70/W to $1.12/W. On a greenfield village site ($300k + $0.70×541k + $1.20×200k = $0.92M) that is +$227k = +25%; on a feeder-head site ($300k + $0.70×1,082k + $1.20×1,000k = $2.26M) it is +$454k = +20%. An unrebuildable number in a verified review i
**Replace with:** **Register entry.** The E4 fallback at Era II economics is **100 → 50 W/cm² (cost +60% on the module line: v_r $0.70 → $1.12/W, which is +$227k on a ~$0.92M greenfield village site (+25%) and +$454k on a ~$2.26M feeder-head site (+20%))**: survivable.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-receiver-thermal.md:297
**Current:** **Node CAPEX check.** Receiver heat-rejection plant at 1 MW (~$50–130k installed) plus BESS active cooling (~$30–80k, §3d correction) adds ~$60–160k/MW inside the $1.19–2.19M band, taking roughly its mid-band to mid-band-plus-8%. The band holds; the composition shifts.
**Why:** Same $/MW defect as verdict 10, plus the retired word 'node', plus a receiver sized at 1 MW that does not exist. The article is 541 kW delivered. A reader rebuilding site cost from '$/MW' will not reproduce the fixed layer, and cannot rebuild any of the LCOEs in §4 of the finalised model.
**Replace with:** **Site CAPEX check.** Receiver heat-rejection plant for the 541 kW article (~$27–70k installed) sits inside v_r; BESS active cooling (~$30–80k, §3d correction) sits inside F. Together ~$57–150k on a ~$0.92M greenfield village site (F $300k + $0.70/W × 541 kW + $1.20/W × 200 kW) or a ~$2.26M feeder-head site (F $300k + $0.70/W × 1,082 kW + $1.20/W × 1,000 kW). The cost model holds; the composition shifts. Site cost is never $/W: at a 200 kW site the fixed layer F is 44% of the total (crossover P* = F/v = 158 kW).

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-receiver-thermal.md:305
**Current:** | E4 (revised) | Cell degradation under kilosun monochromatic duty exceeds the 20-year model | §5.2 rig from T1; 8,760 h design-point run gates Era II module freeze; fleet EL + efficiency telemetry per site | Derate 100→50 W/cm² (+60% module cost, ~+9–12% relay CAPEX: survivable at Era II); chemistry second source; mosaic smaller die |
**Why:** Says 'relay CAPEX' for what is site CAPEX (relay = stratospheric platform, a retired-nomenclature collision), contradicts §4's own 'site CAPEX' wording at line 229, and repeats the unrebuildable +9–12%. The correct figure on the fixed-article cost model is +20–25%.
**Replace with:** | E4 (revised) | Cell degradation under kilosun monochromatic duty exceeds the 20-year model | §5.2 rig from T1; 8,760 h design-point run gates Era II module freeze; fleet EL + efficiency telemetry per site | Derate 100→50 W/cm² (+60% on the module line: v_r $0.70 → $1.12/W, +20–25% site CAPEX: survivable at Era II); chemistry second source; mosaic smaller die |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:67
**Current:** | LW-0.2 | Delivered LCOE below the incumbent at each deployment class: < diesel band ($0.40–0.70/kWh) in Era I anchor markets; ≤ retail tariff (~$0.15/kWh) at Era II community sites; ≤ new-transmission-at-range (~$0.10–0.13/kWh delivered, hardened basis; $0.06–0.08 is the B.2 engineering ceiling) at Era III | Thesis §VIII |
**Why:** A Level-0 mission requirement that the finalised architecture makes unmeetable and commercially fatal. The corrected Era II community LCOE is $0.434 (greenfield) and $0.359 (feeder-head). A requirement to sell at ~$0.15/kWh loses $0.21 on every feeder-head unit and trips falsifier F30 (operator post-blend IRR <8%). It also breaches falsifier F29, whose tariff floor is now ≥$0.26/kWh. The community
**Replace with:** | LW-0.2 | Delivered LCOE below the incumbent at each deployment class: < diesel band ($0.40–0.70/kWh) in Era I anchor markets; at Era II community sites, **below measured willingness-to-pay**, i.e. below the $0.28–$1.10/kWh incumbent bill these populations already pay (captive diesel Kano $0.28–0.33; PLN avoided cost NTT $0.37–0.57; SPUG Palawan $0.35–1.10; Somaliland private IPP $0.59–1.00) — corrected Era II LCOE is $0.359 feeder-head, $0.434 greenfield, billed at $0.26–0.30/kWh (falsifier F29 floor ≥$0.26); ≤ new-transmission-at-range (~$0.10–0.13/kWh delivered, hardened basis; $0.06–0.08 is the B.2 engineering ceiling) at Era III, where corrected LCOE is $0.133 | Thesis §VIII |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:294
**Current:** **The certified article is a fixed, fully-populated receiver, sized to one transmit panel.** Era II: **544 kW delivered** — the output of one 1.9 MW optical PCSEL panel through the planning chain. Era III: **5.44 MW** — one 19 MW rack. Exactly 10:1. Aperture, concentrating optic and cell tiling are fixed and qualified once, at one flux point in the 50–100 W/cm² band. There is no swappable optic, n
**Why:** 544 kW / 5.44 MW is the stale 3.49-chain rounding artefact. The finalised chain is 3.509 optical W per delivered W. The blueprint's own §10A.2 planning column proves it: 0.85 × 0.96 × 0.80 × 0.90 × 0.50 × 0.97 = 0.2850, i.e. 1/0.2850 = 3.509. 1.9 MW / 3.509 = 541 kW; 19 MW / 3.509 = 5.41 MW. Every downstream number in §10A is built on 544 and therefore inherits the error. This is the primary block
**Replace with:** **The certified article is a fixed, fully-populated receiver, sized to one transmit panel.** Era II: **541 kW delivered** — the output of one 1.9 MW optical PCSEL panel through the planning chain of §10A.2 (3.509 optical watts per delivered watt). Era III: **5.41 MW** — one 19 MW rack. Exactly 10:1. Aperture, concentrating optic and cell tiling are fixed and qualified once, at one flux point in the 50–100 W/cm² band. There is no swappable optic, no silicon cassette, no variable tiling, and no partially-populated configuration to re-qualify.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:296
**Current:** Sites scale by **receiver count**: a village takes one article, a feeder-head site with a megawatt of load takes two, an Era III site takes racks. Battery, inverters, switchgear and the conversion stack remain sized to metered demand.
**Why:** Two defects. (1) The Era II → Era III step is presented as though the same article simply multiplies; it is a **re-certification event**. Era III is a single 3.6–5.1 m aperture with a 10–20 m² cell plane, not ten Era II articles (1.2–1.6 m, 1–2 m²). Any 'one SKU forever' reading is wrong. (2) 'Battery ... sized to metered demand' under-sizes the greenfield battery by construction: at a greenfield 
**Replace with:** Sites scale by **receiver count**: a village takes one article, a feeder-head site with a megawatt of load takes two, an Era III site takes racks. Era II → Era III is a **re-certification event, not a composition**: the Era III article is a single 3.6–5.1 m aperture with a 10–20 m² cell plane, qualified afresh, not ten Era II articles ganged. Inverters, switchgear and the conversion stack remain sized to metered demand. The battery is the exception: at a greenfield site it is sized to the **beam slice**, not the load — a 541 kW article against a ~200 kW day-one load leaves ~341 kW of surplus to absorb over a ~4 h window, so the greenfield pack is ~1.4 MWh usable (~$40–60k above a demand-matc

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:298
**Current:** The cost of the fixed article, stated: at a 200 kW greenfield village it carries $241k of idle aperture at Era II receiver pricing ($0.70/W), falling to $103k at Era III ($0.30/W). At a feeder-head site the load fills the article and the premium is zero. This is the price of retiring the swappable-optics and variable-flux qualification programmes from the critical path, and it is carried deliberat
**Why:** Two problems. (1) $241k / $103k rebuild only from the stale 544 kW article (344 kW idle × $0.70 = $241k). At 541 kW the idle aperture is 341 kW ⇒ $239k Era II and $102k Era III. A reader rebuilding from the corrected article gets different numbers. (Note for the architecture owner: the finalised-architecture brief still quotes '$241k' — that headline is itself a 544-artefact and should be reconcil
**Replace with:** The cost of the fixed article, stated: at a 200 kW greenfield village it carries $239k of idle aperture at Era II receiver pricing (341 kW idle × $0.70/W), falling to $102k at Era III ($0.30/W). At a feeder-head site the load fills the article and the premium is zero.

**541 kW is the minimum of the cost curve, not a convenience.** The transmitter costs $2.00/W; the receiver costs $0.70/W. A sub-panel article forces the serving panel to derate, so the saving is bought in the wrong currency: a half-panel article saves $0.76M of receiver and costs $11M of transmit capacity. A two-panel article grows idle aperture 2.5×. The panel-matched article sits at the floor between them.

**And because ev

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:309
**Current:** Capital cost per MW site: $1.19–2.19M (Era II) → $0.93–1.56M (Era III) [alloc—component-level build-up in sovereign dossier App G §VII].
**Why:** A pure $/MW site cost is a modelling defect under the finalised architecture. Site cost is F + v_r·P_aperture + v_e·P_demand: a ~$300k fixed layer that does not shrink with silicon (interlock, surveillance, safety PLC, SCADA, plinth, aperture housing, tracking mount, grid tie, consent/ESIA, mobilisation), a receiver/optic term scaling with aperture, and an electrical term scaling with demand. A pe
**Replace with:** Site capital does not scale as $/MW. It is **F + v_r·P_aperture + v_e·P_demand**: a fixed layer **F ≈ $300k per site** (interlock, surveillance, safety PLC, SCADA, plinth, aperture housing, tracking mount, grid tie, consent/ESIA, mobilisation) that does not shrink with silicon; a receiver-and-optic term **v_r = $0.70/W (Era II) → $0.30/W (Era III)** scaling with installed **aperture**; and an electrical term **v_e ≈ $1.20/W** (battery, inverters, switchgear, interconnect) scaling with metered **demand**. Crossover P* = F/v = **158 kW**: at a 200 kW site the fixed layer is **44%** of the site. Any pure-$/W or per-MW site cost is a modelling defect [alloc—component-level build-up in sovereign 

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:429
**Current:** Quarterly actual-vs-curve review per Section 1.3 against the era targets: laser $2,500 → $400 → $200/kW-optical; receiver $15 → $5 → $0.70 → $0.30/W; platform $5–6M (procured, today) → <$2M (Era I at 10-unit orders: falsifier F12) → **$2M carried as the Era II planning basis** (every corridor pro-forma prices the fleet at $2M/hull until a rate line proves better); site stack $1.19–2.19M (Era II) →
**Why:** Same modelling defect as §6.2, now inside the design-to-cost governance table — which is where the defect propagates into every quarterly procurement review. The site stack has no per-MW target because it has three independent cost drivers on three independent bases (fixed per site, per aperture watt, per demand watt). A DTC review run against a per-MW target will never catch a fixed-layer overrun
**Replace with:** Quarterly actual-vs-curve review per Section 1.3 against the era targets: laser $2,500 → $400 → $200/kW-optical; receiver $15 → $5 → $0.70 → $0.30/W; platform $5–6M (procured, today) → <$2M (Era I at 10-unit orders: falsifier F12) → **$2M carried as the Era II planning basis** (every corridor pro-forma prices the fleet at $2M/hull until a rate line proves better). The site stack is governed on three separate bases, never per MW: **F ≈ $300k fixed per site**; **v_r = $0.70/W (Era II) → $0.30/W (Era III)** on installed aperture; **v_e ≈ $1.20/W** on metered demand (§6.2).

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:472
**Current:** - **4 feeder-head sites**, each on an existing medium-voltage feeder aggregating several villages onto one bus (13,000–26,000 people, a real ~1 MW day-one load, no distribution to build). Each takes **2 × 544 kW receivers**, fully populated at commissioning: 1.088 MW, ~50% capacity factor;
**Why:** Stale article size. 2 × 541 kW = 1.082 MW, not 1.088 MW. The corridor is also missing the statement that brownfield/feeder-head siting is the **base case**, not an upside: 23 of 46 corridors carry existing nominal-but-dead distribution holding 79% of addressable population, and the feeder-head class is the priority site class.
**Replace with:** - **4 feeder-head sites** — the priority site class, and the base case, not an upside: 23 of 46 screened corridors carry existing nominal-but-dead MV distribution holding 79% of the addressable population. Each site sits on an existing medium-voltage feeder aggregating several villages onto one bus (13,000–26,000 people, a real ~1 MW day-one load, no distribution to build). Each takes **2 × 541 kW receivers**, fully populated at commissioning: 1.082 MW, ~50% capacity factor;

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:473
**Current:** - **4 greenfield community sites**, each taking **1 × 544 kW receiver**, fully populated, against a 200 kW day-one load growing on the productive-use ramp. The ramp cost is carried deliberately (§6.2).
**Why:** Stale article size (541 kW), and the section omits the two facts that make the greenfield ramp defensible to a diligence reader. First, the ramp is accepted because its NPV ($0.45M–$2.04M per village) dwarfs the $239k of idle aperture. Second, and load-bearing for Gate D: a greenfield site runs ~10.5% capacity factor against **nameplate** in year 1 by construction, because the article is deliberat
**Replace with:** - **4 greenfield community sites**, each taking **1 × 541 kW receiver**, fully populated, against a 200 kW day-one load growing on the productive-use ramp. The ramp cost is carried deliberately: the ramp's own NPV is $0.45M–$2.04M per village, which dwarfs the $239k of idle aperture it buys (§6.2). Because the article is deliberately over-built against day-one load, a greenfield site runs ~10.5% capacity factor against **nameplate** in year 1 by construction. Gate D therefore has two limbs: **D-1** (brownfield/feeder-head) tests CF ≥40% against installed nameplate within 12 months plus collection ≥85%; **D-2** (greenfield) tests CF ≥25% against **demand-matched reference capacity**, delivere

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:475
**Current:** **Nominal installed delivered capacity: 11.0 MW** (2.0 towers + 2.75 anchors + 4 × 1.088 feeder-head + 4 × 0.544 greenfield). Day-one *load* ~7.9 MW, rising with the greenfield ramp. Receiver nameplate is fully populated from commissioning; the ramp is in the demand, not in the hardware.
**Why:** Three unrebuildable numbers. (1) The parenthetical counts anchor **demand** (2.0 MW towers, 2.75 MW mining) as **nameplate** — but anchors take fully-populated articles too. On the fixed article the corridor is 24 articles: 6 tower clusters × 1, 3 mining anchors × 2, 4 feeder-heads × 2, 4 greenfield × 1. True nameplate = 24 × 541 kW = **12.98 MW**. (Note: the finalised-architecture brief's '13.06 
**Replace with:** **Nominal installed delivered capacity (receiver nameplate): 12.98 MW** — 24 fully-populated 541 kW articles: 6 tower-cluster sites × 1, 3 mining anchors × 2, 4 feeder-head sites × 2, 4 greenfield sites × 1. Day-one *load* is **9.55 MW** (2.0 towers + 2.75 mining + 4 × 1.0 feeder-head + 4 × 0.2 greenfield), rising with the greenfield ramp. Nameplate exceeds day-one load by design: receiver aperture is fully populated from commissioning, the ramp is in the demand, and the surplus aperture is what makes panel-hours fungible across the corridor (§6.2).

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:501
**Current:** The corridor's 9.75 MW nominal receiver capacity is therefore served firm at ~7.3 MW on the planning basis (capacity factor and buffer scheduling absorb the difference: no receiver site runs at 100 per cent duty) and ~4.7 MW if Era II hardware arrives no better than today's demonstrated class. In that case the corridor operates at reduced build-out and the P2 gate has already told the capital plan
**Why:** 9.75 MW is stale and contradicts §10A.1's own (also stale) 11.0 MW two pages earlier — the document quotes two different nominal capacities for the same corridor. True nameplate on the fixed article is 12.98 MW (24 × 541 kW). The gap between 12.98 MW nameplate and ~7.3 MW firm is not an embarrassment to be minimised; it is the fungibility margin, and stating it that way is the argument.
**Replace with:** The corridor's **12.98 MW of installed receiver nameplate** is served firm at ~7.3 MW on the planning basis, and ~4.7 MW if Era II hardware arrives no better than today's demonstrated class. The gap is deliberate: no receiver site runs at 100 per cent duty, capacity factor and buffer scheduling absorb the difference, and the surplus aperture is what lets a panel-hour move to whichever site is calling for it. Under the demonstrated-class column the corridor operates at reduced build-out, and the P2 gate has already told the capital plan so.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:513
**Current:** | Receiver modules (initial ~6.4 MW deployed, staged) | 17 sites |—| $5M initial |
**Why:** Directly contradicts the finalised architecture. 'Initial ~6.4 MW deployed, staged' is the rejected partial-population / silicon-cassette architecture. Every receiver ships fully populated at commissioning: 24 articles × 541 kW = 12.98 MW of aperture, at v_r $0.70/W = **$9.09M**, not $5M. The line understates receiver capital by $4.1M and, worse, describes an architecture the programme has retired
**Replace with:** | Receiver articles (fully populated at commissioning; 24 × 541 kW = 12.98 MW aperture, at v_r $0.70/W) | 24 articles across 17 sites | $0.379M | **$9.1M** |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:514
**Current:** | Conversion stacks: modular community (8 × 200 kW) + anchor | initial build |—| $6.5M initial |
**Why:** '8 × 200 kW' prices all eight community sites at a greenfield load. Four of them are feeder-heads with a ~1 MW day-one load. The modular electrical layer is sized to **metered demand**, so the correct build is 4 × ~1 MW (feeder-head) + 4 × 200 kW (greenfield) + 4.75 MW (anchors) = 9.55 MW of demand at v_e ≈ $1.20/W = $11.46M, plus the greenfield beam-slice battery uplift (4 × ~$50k) and the fixed 
**Replace with:** | Electrical stack, sized to metered demand (4 × ~1 MW feeder-head + 4 × 200 kW greenfield + 4.75 MW anchor = 9.55 MW at v_e ≈ $1.20/W), incl. greenfield beam-slice battery uplift (4 × ~$50k) | 9.55 MW demand |—| **$11.7M initial** |
| Fixed site layer F (interlock, surveillance, safety PLC, SCADA, plinth, aperture housing, tracking mount, grid tie, consent/ESIA, mobilisation) | 17 sites | $0.30M | **$5.1M** |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:516
**Current:** | **Total corridor capital, initial** | | | **~$54M** |
|—of which Aquila (fleet $12M + NOC share $1.5M) | | | **$13.5M** |
|—of which network operator / project SPV (ground stack + corridor infrastructure and deployment) | | | **~$40.5M initial** (growing to ~$56.5M at full build as metered demand draws expansion capex) |
**Why:** The total is the sum of the stale lines above it and no longer rebuilds. On the fixed-article, F + v_r·P_aperture + v_e·P_demand model: ground stations $25.5M + relay fleet $12M + receiver articles $9.1M + demand-sized electrical $11.7M + fixed site layer $5.1M + corridor infrastructure/NOC/deployment $5M = **$68.4M**. Aquila's share is unchanged at $13.5M; the operator/SPV side is therefore ~$54.
**Replace with:** | **Total corridor capital, initial** | | | **~$68.4M** |
|—of which Aquila (fleet $12M + NOC share $1.5M) | | | **$13.5M** |
|—of which network operator / project SPV (ground stations, receiver articles, demand-sized electrical, fixed site layer, corridor infrastructure and deployment) | | | **~$54.9M initial** (growing as metered demand draws v_e expansion capex; the receiver and fixed layers are fully drawn at commissioning) |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:534
**Current:** | Community retail — greenfield (4 sites, demand ramp) | 3.2 GWh | $0.25 | $0.8M |
**Why:** $0.25/kWh sits below the falsifier F29 tariff floor of ≥$0.26/kWh, so the corridor as drawn fails its own falsifier on the greenfield line. The community layer is sold at measured willingness-to-pay in the $0.26–0.30/kWh band, against incumbent bills of $0.28–$1.10. Pricing greenfield *below* feeder-head ($0.28) is also backwards: the greenfield site carries the higher LCOE ($0.434 vs $0.359).
**Replace with:** | Community retail — greenfield (4 sites, demand ramp) | 3.2 GWh | $0.28 | $0.9M |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:535
**Current:** | **Corridor total** | ~38.8 GWh delivered | | ~$11.1M/yr: 91% anchor-grade |
**Why:** The total row does not sum its own table. Delivered energy: 14.0 + 18.4 + 17.5 + 3.2 = **53.1 GWh**, not 38.8. Revenue: $4.9M + $4.0M + $1.2M + $4.9M + $0.8M = **$15.8M/yr**, not $11.1M. Anchor-grade share (telecom + mining + sovereign = $10.1M) is **64%** of $15.8M, not 91% — 91% is what it was when the community rows were a rounding error, i.e. under the demand-matched architecture the programme
**Replace with:** | **Corridor total** | ~53.1 GWh delivered | | ~$15.8M/yr: 64% anchor-grade, 36% community |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:543
**Current:** | **Corridor EBITDA** | **~$6.2M/yr** |
**Why:** $6.2M = the stale $11.1M revenue minus $4.9M of costs. Rebuilt: revenue $15.8M (or $15.9M with the greenfield tariff corrected to $0.28) minus O&M $1.8M, insurance $0.9M, source energy $2.7M, attrition $0.3M = $5.7M ⇒ **~$10.2M/yr**. Every downstream return in this section is computed off the wrong EBITDA.
**Replace with:** | **Corridor EBITDA** | **~$10.2M/yr** |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:545
**Current:** 50/50 split at year five: ~$3.1M/yr each side, rising with the community ramp toward envelope.
**Why:** Half of the stale $6.2M EBITDA. Half of the rebuilt $10.2M is ~$5.1M per side.
**Replace with:** 50/50 split at year five: ~$5.1M/yr each side, rising with the community ramp toward envelope.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:547
**Current:** On that basis the operator earns **~5–6% unlevered against its ~$40.5M** (the three-station drawing). That sits below the ~15.6% African power-sector cost of capital, which is why the operator side carries a concessional layer. At 30% concessional (2%, 20-year) the commercial tranche clears **~8–9%** [model-delta—corridor model re-runs at sanction], inside the blended class (thesis §VIII, Appendix
**Why:** Both the numerator (EBITDA share) and the denominator (operator capital) are stale: $40.5M is the pre-fixed-article capital base, and the true operator base is ~$54.9M. The IRRs quoted are therefore not rebuildable from anything in this document and cannot simply be arithmetically patched — the corridor DCF must be re-run on the fixed-article capital stack and the corrected P&L before any number i
**Replace with:** On that basis the operator's return is computed against its **~$54.9M** initial base (the three-station drawing, fixed-article receiver stack). That base sits below the ~15.6% African power-sector cost of capital unlevered, which is why the operator side carries a concessional layer; at 30% concessional (2%, 20-year) the commercial tranche must clear **≥8%** to hold falsifier F30. **[Both IRRs pending re-run: the corridor DCF is being rebuilt on the fixed-article capital stack ($68.4M corridor / $54.9M operator) and the corrected P&L (~$15.8M revenue, ~$10.2M EBITDA). No IRR is quoted until that model closes.]**

### /Users/billy_j/age-of-wonders/private/dossier-aquila/executive-memo.md:20
**Current:** The full conversion surface for a megawatt, enough for a town of five thousand, is one to two square metres of semiconductor.
**Why:** The 1–2 m² cell plane is the Era II article's conversion surface, and the Era II article delivers **541 kW**, not a megawatt. (Era III, at 5.41 MW, takes 10–20 m².) The memo pairs the 541 kW cell area with a megawatt of delivered power, overstating areal delivery by ~2x. This is the single most quotable technical figure in the memo — a sovereign reader will rebuild it, and it will not close agains
**Replace with:** The full conversion surface for one receiver — **541 kilowatts** delivered, enough for a town of five thousand — is one to two square metres of semiconductor.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:47
**Current:** **Receiver** — the manufactured article at a site: aperture, optic, photovoltaic array. It is fixed and always ships fully populated. Era II is **544 kW delivered — one PCSEL panel**. Era III is **5.44 MW — one rack**. Sites scale by receiver count, not by reconfiguring a receiver. Battery, inverter and conversion stay sized to metered demand.
**Why:** 544 kW / 5.44 MW are the stale figures produced by the 3.49 rounding artefact. The finalised chain is 3.509 optical W per delivered W, so a 1.9 MW optical panel delivers 541 kW and a 19 MW rack delivers 5.41 MW. This is the defining constant of the whole architecture and it is wrong in the nomenclature callout, which is the first place a reader anchors.
**Replace with:** **Receiver** — the manufactured article at a site: aperture, optic, photovoltaic array. It is fixed and always ships fully populated. The chain runs at **3.509 optical watts per delivered watt**, so Era II is **541 kW delivered — one PCSEL panel (1.9 MW optical)**. Era III is **5.41 MW — one rack (19 MW optical)**. Exactly ten to one. Sites scale by receiver count, not by reconfiguring a receiver. Battery, inverter and conversion stay sized to metered demand.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:49
**Current:** So: *a 1 MW receiver at a community site, fed by an Era II relay.*
**Why:** There is no such thing as a 1 MW receiver. The receiver is a fixed, fully-populated 541 kW article; a 1 MW load is served by TWO articles. The worked example in the nomenclature block directly contradicts the fixed-article architecture the same callout has just defined, three lines above.
**Replace with:** So: *two receivers at a feeder-head site, fed by an Era II relay.*

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:72
**Current:** Era II (PCSEL arrays, modular demand-following sites, gated on the panel milestone) delivers at $0.17–0.19 per kilowatt-hour to anchor sites, below diesel everywhere and below what the companies that power telecom towers charge today, and near $0.38 at a blended year-five community site, reaching retail as the demand ramp and the concessional layer do their work.
**Why:** Two defects in the executive summary, the most-read paragraph in the package. (1) 'modular demand-following sites' is the REJECTED cassette architecture; the receiver is a fixed, fully-populated, panel-matched article and only the surrounding electrical follows demand. (2) '$0.38 at a blended year-five community site' is the superseded $/W figure; the corrected greenfield LCOE on the fixed article
**Replace with:** Era II (PCSEL arrays, a fixed fully-populated receiver article with demand-sized electrical around it, gated on the panel milestone) delivers at $0.17–0.19 per kilowatt-hour to anchor sites, below diesel everywhere and below what the companies that power telecom towers charge today, and at $0.359 at a feeder-head community site (the priority class) rising to $0.434 at a greenfield village that must ramp into its article, reaching retail as the demand ramp and the concessional layer do their work.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:636
**Current:** Annualised over asset life at a 12 per cent real discount rate, an Era II anchor site delivers at **$0.17–0.19/kWh** against diesel at $0.40–0.70 and the $0.20–0.35 charged today by the companies that power telecom towers; a blended year-five community site at **~$0.38/kWh**, or **~$0.31–0.37** at a feeder-head site; an Era III 10 MW site at **~$0.13/kWh**, below new grid extension; and an Era III
**Why:** Superseded LCOE set. The community greenfield figure is $0.434 (not ~$0.38 — that is the $/W-priced number the same section admits, 20 lines later, was 12 per cent optimistic), and the feeder-head is a point estimate of $0.359, not a ~$0.31–0.37 band. §VIII opens by contradicting its own corrected numbers.
**Replace with:** Annualised over asset life at a 12 per cent real discount rate, an Era II anchor site delivers at **$0.17–0.19/kWh** against diesel at $0.40–0.70 and the $0.20–0.35 charged today by the companies that power telecom towers; a feeder-head community site at **$0.359/kWh** and a greenfield village at **$0.434/kWh** on the fixed article; an Era III site at **$0.133/kWh**, below new grid extension; and an Era III+ backbone at **~$0.10–0.12/kWh** with the source energy purchased and priced through the chain.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:638
**Current:** Two of those numbers do the most work. The community site's delivered cost is ~$0.38 per kilowatt-hour in year five, not the $0.13–0.21 a nameplate utilisation would print, because a real site does not run at 55 per cent of its rating from day one.
**Why:** ~$0.38 is superseded and 12 per cent optimistic. The corrected greenfield number on the fixed article is $0.434.
**Replace with:** Two of those numbers do the most work. The greenfield community site's delivered cost is **$0.434** per kilowatt-hour in year five, not the $0.13–0.21 a nameplate utilisation would print, because a real site does not run at 55 per cent of its rating from day one — and because the article it is served by is deliberately larger than its day-one load.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:676
**Current:** **The site answer is a fixed article, and the transmit side already chose its size.** A PCSEL panel is 1.9 megawatts optical, which is 544 kilowatts delivered through the planning chain. That is the receiver. One panel feeds one receiver, and the receiver is built to it: fixed aperture, fixed optic, fixed cell tiling, fully populated on the day it ships. In Era III one rack of nineteen megawatts o
**Why:** Two defects. (1) 544 kW / 5.44 MW are stale (3.49 rounding artefact); the true figures are 541 kW / 5.41 MW at 3.509 optical W per delivered W. (2) 1.9 MW ÷ 544 kW = 3.49 and 1.9 MW ÷ 541 kW = 3.509 — the chain factor is never printed anywhere in the document, so a reader cannot rebuild either number. Under the citation-audit standard that is a blocker on its own. (3) 'the same article scaled once
**Replace with:** **The site answer is a fixed article, and the transmit side already chose its size.** A PCSEL panel is 1.9 megawatts optical. The delivery chain runs at **3.509 optical watts per delivered watt**, so a panel is **541 kilowatts delivered**. That is the receiver. One panel feeds one receiver, and the receiver is built to it: fixed aperture, fixed optic, fixed cell tiling, fully populated on the day it ships. In Era III one rack of nineteen megawatts optical feeds one **5.41 megawatt** receiver. The ratio is exactly ten to one. Era III is not ten Era II articles bolted together: it is a single 3.6-to-5.1-metre aperture over a ten-to-twenty-square-metre cell plane, and crossing to it is a **re-c

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:682
**Current:** The bill is legible. At a greenfield village the fixed 544 kW receiver delivers at **$0.434 per kilowatt-hour against $0.381** for a perfectly demand-matched one: five cents, or fourteen per cent. At a feeder-head site with a real megawatt of load, two fully-populated articles deliver at **$0.359 against $0.348**: one cent. Site where the demand already is, and the premium is three per cent, not f
**Why:** Three errors. 544 kW is stale (541). The feeder-head counterfactual is $0.356, not $0.348. And the resulting premium is 0.8 per cent, not 'one cent / three per cent'. The spec calls this exact sentence out as the surviving stale claim in §VIII; a sovereign reader will rebuild $0.359 − $0.356 and get 0.3 cents, not one.
**Replace with:** The bill is legible. At a greenfield village the fixed 541 kW receiver delivers at **$0.434 per kilowatt-hour against $0.381** for a perfectly demand-matched one: five cents, or fourteen per cent. At a feeder-head site with a real megawatt of load, two fully-populated articles deliver at **$0.359 against $0.356**: three-tenths of a cent. Site where the demand already is, and the premium is **eight-tenths of one per cent**, not fourteen.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:684
**Current:** And it is transient. The idle aperture at a village is $241,000 of receiver at Era II pricing and $103,000 at Era III, because the converter is a thousand-sun concentrator and its cost per watt is on the steepest curve in the system. The penalty for standardising halves as the curve runs. The engineering risk it retires does not come back.
**Why:** The strongest argument for the fixed article is missing from the package entirely. As written, the standardisation decision reads as a $2.45M engineering-convenience premium the reader is asked to accept on faith. The actual case is economic and provable: because every receiver absorbs a full panel at full power, panel-hours are FUNGIBLE across the corridor. A demand-matched receiver strands trans
**Replace with:** And it is transient. The idle aperture at a village is $241,000 of receiver at Era II pricing and $103,000 at Era III, because the converter is a thousand-sun concentrator and its cost per watt is on the steepest curve in the system. The penalty for standardising halves as the curve runs. The engineering risk it retires does not come back.

**And the bill is not what the article buys. It is what the corridor buys.** The transmitter costs $2.00 per watt. The receiver costs $0.70. Because every receiver on the corridor can absorb a full panel at full power, **panel-hours are fungible**: any panel can be pointed at any site, at any hour, and the site will take all of it. A demand-matched receiv

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:686
**Current:** Battery, inverter, switchgear and the conversion stack stay sized to metered demand. Only the optical article is fixed, because only the optical article has a reason to be.
**Why:** Correct for inverters, switchgear and conversion, but WRONG for the battery at a greenfield site, and the error is a real cost omission. The greenfield battery must be sized to the BEAM SLICE, not to load: the article delivers ~541 kW against a ~200 kW load, so ~344 kW of surplus must be absorbed over a ~4 h window, requiring ~1.4 MWh usable. Sizing the battery to load under-sizes every greenfield
**Replace with:** Inverter, switchgear and the conversion stack stay sized to metered demand. The battery is the one exception, and it is a deliberate one: at a greenfield village the article delivers 541 kW against a day-one load near 200 kW, so the buffer is sized to the **beam slice** — the ~344 kW of surplus, absorbed over a ~4-hour delivery window, which is **~1.4 MWh usable** — and not to the load. Sized to load, the site would spill the surplus the fungibility argument exists to capture. That is ~$40–60k of additional storage per greenfield site, and it is carried. Only the optical article is fixed, because only the optical article has a reason to be.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:692
**Current:** F is about **$300,000** and does not shrink with anything: interlock and surveillance, the safety controller, SCADA, the plinth, the aperture housing and tracking mount, the grid tie, consent and environmental assessment, and mobilisation. v_r is the receiver and its optic, at **$0.70 per watt** in Era II and **$0.30** in Era III, and it scales with the aperture, which is fixed at 544 kilowatts. v
**Why:** 544 kilowatts is stale. The aperture is fixed at 541 kW. Everything downstream (the $241k idle-aperture figure, the crossover, the LCOE) is computed against the aperture, so a wrong aperture number breaks the reader's rebuild of the whole site-cost model.
**Replace with:** F is about **$300,000** and does not shrink with anything: interlock and surveillance, the safety controller, SCADA, the plinth, the aperture housing and tracking mount, the grid tie, consent and environmental assessment, and mobilisation. v_r is the receiver and its optic, at **$0.70 per watt** in Era II and **$0.30** in Era III, and it scales with the aperture, which is fixed at 541 kilowatts. v_e is the battery, inverters, switchgear and interconnect, at about **$1.20 per watt**, and it scales with metered demand.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:696
**Current:** Priced this way, the blended year-five community site delivers at **$0.381 per kilowatt-hour** on the demand-matched counterfactual and **$0.434** on the fixed 544-kilowatt article **[Derived—Appendix B]**. The earlier figure of $0.341 priced the site linearly in dollars per watt, and was twelve per cent optimistic. The number in this section is the corrected one.
**Why:** 544-kilowatt is stale (541).
**Replace with:** Priced this way, the blended year-five community site delivers at **$0.381 per kilowatt-hour** on the demand-matched counterfactual and **$0.434** on the fixed 541-kilowatt article **[Derived—Appendix B]**. The earlier figure of $0.341 priced the site linearly in dollars per watt, and was twelve per cent optimistic. The number in this section is the corrected one.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:701
**Current:** There is no fraction of an airframe and no half of a beam director. The laser panel layer is coarsely stageable, in 1.9 MW optical steps of roughly 544 kilowatts delivered. Only the receiver and conversion layer, twenty-one per cent, stages finely.
**Why:** 544 kilowatts is stale (541). Also 'the receiver and conversion layer... stages finely' contradicts the fixed fully-populated article: the receiver does not stage at all, only the surrounding electrical (battery, inverters, switchgear) stages with metered demand.
**Replace with:** There is no fraction of an airframe and no half of a beam director. The laser panel layer is coarsely stageable, in 1.9 MW optical steps of **541 kilowatts delivered**. Only the surrounding electrical layer — battery, inverters, switchgear, conversion, twenty-one per cent — stages finely, and it stages against metered demand. The receiver itself never stages: every article ships fully populated.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:713
**Current:** The populations on these feeders are paying **$0.28 to $1.10 per kilowatt-hour today** — captive diesel in Kano, PLN's true cost in Nusa Tenggara Timur, private IPPs in Somaliland, SPUG in Palawan — against the $0.15 this model assumes **[Measured—incumbent tariffs; Appendix F.6]**. That is revealed willingness to pay at two to seven times the modelled tariff. The corridor is a price cut, not a ne
**Why:** The model does NOT assume $0.15. $0.15 is the Nigerian Band A regulated tariff, which is what the DisCo is paid, not the revenue instrument. Selling at $0.15 against a $0.359 feeder-head LCOE loses $0.21 on every unit and trips falsifier F30. The community layer is sold at measured willingness-to-pay, $0.26–0.30/kWh. This sentence contradicts the paragraph at line 719 of the same section, which sa
**Replace with:** The populations on these feeders are paying **$0.28 to $1.10 per kilowatt-hour today** — captive diesel in Kano ($0.28–0.33), PLN's avoided cost in Nusa Tenggara Timur ($0.37–0.57), private IPPs in Somaliland ($0.59–1.00), SPUG in Palawan ($0.35–1.10) — against the **$0.26 to $0.30 this model sells at** **[Measured—incumbent tariffs; Appendix F.6]**. That is revealed willingness to pay at one to four times the price the corridor charges. The corridor is a price cut, not a new expense.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:723
**Current:** **The discipline that follows: a demand gate.** Demand risk, the variable with the worst empirical record in this sector, is gated exactly like technical risk. Gate D measures capacity factor against *populated* capacity, not against the certified envelope, because a gate measured against a nameplate a site is not yet meant to fill tests arithmetic rather than demand. It also measures delivered en
**Why:** 'Populated capacity' is cassette-architecture language. Every receiver now ships fully populated, so populated capacity IS nameplate and the sentence is self-defeating. Gate D has two limbs: D-1 (brownfield/feeder-head) measures CF ≥40% against installed nameplate; D-2 (greenfield) measures CF ≥25% against demand-matched REFERENCE capacity. A single-limb gate measured against nameplate fires at ev
**Replace with:** **The discipline that follows: a demand gate, in two limbs.** Demand risk, the variable with the worst empirical record in this sector, is gated exactly like technical risk. Because every receiver ships fully populated, populated capacity *is* nameplate, and one threshold cannot serve two site classes. **D-1 (brownfield and feeder-head)** measures capacity factor against installed nameplate: the load is already there, so nameplate is the honest ruler. **D-2 (greenfield)** measures capacity factor against the *demand-matched reference capacity* — the receiver that would have been built to day-one load — because the article is deliberately over-built and testing it against nameplate tests the 

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:1013
**Current:** **Demand might come slower than capacity.** Community demand is the slow variable in every honest reading of the rural-electrification record, and this document says so in Section VIII rather than hiding from it. The fallback is built into the revenue: roughly nine-tenths of a corridor's income comes from telecom towers, mines, and sovereign contracts, all of them counterparties with a chief finan
**Why:** Three defects in the top-level risk register that a sovereign reader will read before the appendices. (1) 'Nodes' — the word is retired; it was overloaded across relay and site. (2) 'added in increments' is the rejected cassette architecture; capacity is added by whole receiver count, never in increments inside an article. (3) '25 per cent utilisation' is a single-limb Gate D against nameplate, wh
**Replace with:** **Demand might come slower than capacity.** Community demand is the slow variable in every honest reading of the rural-electrification record, and this document says so in Section VIII rather than hiding from it. The fallback is built into the revenue: roughly nine-tenths of a corridor's income comes from telecom towers, mines, and sovereign contracts, all of them counterparties with a chief financial officer. Receivers are added to a site by whole count as metered demand crosses thresholds — a village takes one article, a feeder head takes two — while the battery, inverters and switchgear around them stay sized to metered demand. And the community-scale tranche does not draw at all until re

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:1209
**Current:** | Delivered power | Flux design point | Cell area | Equivalent disc |
|---|---|---|---|
| 25 kW (Era I) | 50–100 W/cm² | 0.03–0.05 m² | 0.18–0.25 m |
| 1 MW (Era II) | 50–100 W/cm² | 1.0–2.0 m² | 1.1–1.6 m |
| 10 MW (Era III) | 50–100 W/cm² | 10–20 m² | 3.6–5.1 m |
**Why:** The column header says 'Delivered power' but the areas are computed from OPTICAL power incident on the cell plane. 541 kW delivered ÷ (0.55 receiver × 0.97 electronics) ≈ 1.0 MW optical, which is what gives 1.0–2.0 m² at 50–100 W/cm². Labelled as delivered, a reader rebuilding a 1 MW *delivered* article gets 1.8 MW optical and 1.8–3.6 m², and the aperture and the whole receiver cost line move with
**Replace with:** | Article (delivered) | Optical power at the cell plane | Flux design point | Cell area | Equivalent disc |
|---|---|---|---|---|
| 25 kW (Era I) | ~46 kW | 50–100 W/cm² | 0.03–0.05 m² | 0.18–0.25 m |
| **541 kW (Era II, one panel)** | ~1.0 MW | 50–100 W/cm² | 1.0–2.0 m² | 1.1–1.6 m |
| **5.41 MW (Era III, one rack)** | ~10 MW | 50–100 W/cm² | 10–20 m² | 3.6–5.1 m |

Era II→Era III is a **re-certification event**, not a composition: the Era III article is a single 3.6-to-5.1-metre aperture over a 10-to-20-square-metre cell plane, qualified once at one flux point in the 50–100 W/cm² band, exactly as the Era II article was. It is not ten Era II receivers.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:1311
**Current:** LCOE = C·(CRF(r,n) + f_O&M) / (8,760·CF) + E_source, with r = 10%, f = 3%/yr. C is capex per watt, CRF the capital recovery factor that annuitises it over life n at discount rate r, f_O&M the annual operations-and-maintenance charge, CF the capacity factor, and E_source the cost of the source energy itself.
**Why:** This is a pure $/W site-cost formula, and §VIII explicitly names that formula as the modelling defect that produced the superseded $0.341. A site does not cost a flat number of dollars per watt: it costs F + v_r·P_aperture + v_e·P_demand, and the fixed layer alone is a large share of a 200 kW site. Appendix B still teaches the reader to rebuild the site the wrong way, and the B.2 and B.3 tables th
**Replace with:** LCOE = [F + v_r·P_aperture + v_e·P_demand]·(CRF(r,n) + f_O&M) / (8,760·CF·P_demand) + E_source, with r = 10%, f = 3%/yr. A site does not cost a flat number of dollars per watt. **F** is the fixed layer (~$300k: interlock, surveillance, safety PLC, SCADA, plinth, aperture housing, tracking mount, grid tie, consent/ESIA, mobilisation) and does not shrink with silicon. **v_r** is the receiver and its optic ($0.70/W Era II, $0.30/W Era III), and it scales with the fixed **aperture** (541 kW Era II, 5.41 MW Era III), not with demand. **v_e** is the battery, inverters, switchgear and interconnect (~$1.20/W), and it scales with **metered demand**. CRF annuitises capex over life n at discount rate r

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:1317
**Current:** | Era II 1 MW site (mid) | 6.4 | 15 | 55% | 0.21 |
| Era III 10 MW site (mid) | 2.8 | 18 | 65% | 0.075 |
**Why:** Both rows price the site linearly in $/W against a nameplate that no longer exists. There is no 1 MW Era II site and no 10 MW Era III receiver: the articles are 541 kW and 5.41 MW, and site cost is F + v_r·P_aperture + v_e·P_demand. A reader rebuilding an Era II community site from this table gets a number 12 per cent below the corrected one.
**Replace with:** | Era II site, one fixed 541 kW article (mid) | F $0.30M + v_r·541 kW + v_e·P_demand | 15 | 55% | see §VIII |
| Era III site, one fixed 5.41 MW article (mid) | F $0.30M + v_r·5.41 MW + v_e·P_demand | 18 | 65% | 0.133 |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:1323
**Current:** Reconciliation with Section VIII: the table above is the capex-annuity LCOE at design capacity factors with curtailed (free) source energy: the engineering ceiling of the architecture. The hardened delivered figures in Section VIII ($0.17–0.19 anchor, ~$0.38 community year-5, ~$0.13 Era III) additionally price purchased source energy *through* the chain efficiency, demand-ramped capacity factors, 
**Why:** The reconciliation paragraph — the one place a diligence team goes to tie Appendix B to §VIII — still carries the superseded ~$0.38 community figure and does not carry the feeder-head class at all. It also does not reconcile the two site classes the architecture now distinguishes.
**Replace with:** Reconciliation with Section VIII: the table above is the capex-annuity LCOE at design capacity factors with curtailed (free) source energy: the engineering ceiling of the architecture. The hardened delivered figures in Section VIII ($0.17–0.19 anchor; **$0.359 feeder-head and $0.434 greenfield** on the fixed 541 kW article; **$0.133 Era III**) additionally price purchased source energy *through* the chain efficiency, demand-ramped capacity factors, layer-split O&M with insurance and attrition, the $2M planning airframe, the fixed-plus-two-variable site cost structure of §VIII (F + v_r·P_aperture + v_e·P_demand), and a 12 per cent real discount rate. Both are true; only the Section VIII set i

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:1330
**Current:** | Era II community site, blended year-5 (~45% CF, fixed-cost-per-site basis) | **~$0.38/kWh** | Diesel; reaches retail with demand ramp + concessional | On-site solar+storage where viable |
**Why:** Superseded. The table that the body's delivered-cost claim is built from still prints the 12-per-cent-optimistic figure, and collapses two site classes with materially different economics into one row.
**Replace with:** | Era II feeder-head site, billed energy (the priority class; ~50% CF, two fully-populated articles) | **$0.359/kWh** | Diesel; captive IPP; SPUG; PLN avoided cost | On-site solar+storage where viable |
| Era II greenfield village, blended year-5 (one fixed 541 kW article against a ~200 kW day-one load) | **$0.434/kWh** | Diesel; reaches retail with demand ramp + concessional | On-site solar+storage where viable |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:1344
**Current:** Every cell but the worst corner beats diesel outright, and the corner ($10/W at 35 per cent capacity factor, $0.527) still lands inside the band. Retail ($0.15) closes below ~$3.5/W at the hardened year-five capacity factor of ~45 per cent, which is Era III pricing, not Era II, and which is why the Era II corridor is anchor-weighted and community retail rides the demand ramp (Section VIII).
**Why:** Two defects. The B.3 sensitivity grid is a pure full-stack-$/W × CF model, the formula §VIII names as the modelling defect. And 'Retail ($0.15)' imports the Nigerian Band A regulated tariff as the community selling price. The community layer is sold at measured willingness-to-pay, $0.26–0.30/kWh, against an incumbent bill of $0.28–$1.10. Selling at $0.15 loses $0.21 per unit at a feeder head and t
**Replace with:** Every cell but the worst corner beats diesel outright, and the corner ($10/W at 35 per cent capacity factor, $0.527) still lands inside the band. Read the grid as a sensitivity on the *aperture-plus-electrical* layers only: the $300k fixed layer does not appear in it, and at a 200 kW village that layer is a large share of the bill, which is why the site-cost identity of §VIII, not this grid, is the pricing instrument. The community layer sells at **$0.26–0.30/kWh**, the measured willingness-to-pay against an incumbent bill of $0.28–$1.10 — never at the $0.15 regulated band, which is what the utility is paid and is below the site's own cost (Section VIII).

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:1879
**Current:** - **I: tariff instrument.** Is there a named, in-force instrument that pays ≥$0.13/kWh for reliable supply — a Band A-class service-based tariff, an avoided-cost independent-power regime, SPUG/NPP, or an unregulated private market? Corridors that fail the instrument test carry anchors and no community layer.
**Why:** $0.13/kWh is BELOW the feeder-head site's own LCOE of $0.359. A corridor can pass this screen and lose $0.23 on every unit sold. The screen must be set at the Era II feeder-head break-even, ≥$0.26/kWh, which is the threshold falsifier F29 already carries — the two instruments currently disagree by a factor of two inside the same document.
**Replace with:** - **I: tariff instrument.** Is there a named, in-force instrument or unregulated market price that pays **≥$0.26/kWh** for reliable supply — the Era II feeder-head break-even, not the regulated retail band — through a Band A-class service-based tariff, an avoided-cost independent-power regime, SPUG/NPP, or an unregulated private market? Corridors that fail the instrument test carry anchors and no community layer. (This is the same threshold falsifier F29 tests.)

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:1989
**Current:** | Jurisdictions with direct HAPS regulatory precedent | **3** (Kenya, Saudi Arabia, and the Japan-linked HAPS certification pipeline) | Licensed flights and designated processes; other corridors inherit precedent **[Validated precedent]** |
**Why:** The Japan 'certification pipeline' has no source. A headline count of 3 that cannot be rebuilt from a cited record is exactly what failed the citation audit. The defensible count is 2: Kenya (KCAA/KSA licensed Zephyr operations from Laikipia) and Saudi Arabia (designated HAPS licensing process, NTN regulations in force).
**Replace with:** | Jurisdictions with direct HAPS regulatory precedent | **2** (Kenya, Saudi Arabia) | Licensed flights and designated processes, both source-backed; other corridors inherit precedent. Japan's HAPS certification work is tracked but carries no citable instrument and is not counted **[Validated precedent]** |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:2369
**Current:** Applied consistently, repricing the node's capital at the blended rates against the same 15 per cent commercial baseline the reductions are measured from (a capex-annuity basis; §VIII's fully loaded ~$0.34 additionally prices purchased source energy and layer O&M at 12 per cent real), the Era II community site falls from ~$0.33 to roughly $0.26–0.29 per kilowatt-hour at the hardened year-five capa
**Why:** Three defects in the appendix a DFI credit committee reads. (1) 'the node's capital' — 'node' is retired. (2) '§VIII's fully loaded ~$0.34' is the SUPERSEDED figure, 12 per cent optimistic; §VIII itself now says $0.434 greenfield / $0.359 feeder-head. (3) The blended-capital results ($0.26–0.29) are computed off the stale ~$0.33 base and are therefore wrong.
**Replace with:** Applied consistently, repricing the site's capital at the blended rates against the same 15 per cent commercial baseline the reductions are measured from (a capex-annuity basis; §VIII's fully loaded **$0.359 feeder-head / $0.434 greenfield** additionally price purchased source energy, the fixed-plus-two-variable site cost structure, and layer O&M at 12 per cent real), the Era II feeder-head site falls from $0.359 to roughly **$0.27–0.32** per kilowatt-hour at the hardened capacity factor, the greenfield village from $0.434 to roughly **$0.33–0.38**, and the Era III site from $0.133 to roughly **$0.10–0.12**: at or under the World Bank's $0.20 mini-grid target for 2030 in every case.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:2488
**Current:** **Engineering response.** Nodes deploy modular at 150–250 kW against anchor loads that pay from day one, growing in ~100 kW increments as metered demand crosses thresholds: capacity tracks the ramp instead of betting ahead of it (Section VIII). Corridor revenue is anchor-weighted (~91 per cent contract-grade).
**Why:** K.6's engineering response defends the REJECTED cassette architecture (150–250 kW, ~100 kW increments) and uses the retired word 'node'. The challenge register is the appendix an adversarial diligence team reads first; it currently answers the demand challenge with a design the programme does not build.
**Replace with:** **Engineering response.** The receiver is a **fixed, fully-populated 541 kW article** (one PCSEL panel through the 3.509 chain). A greenfield village takes one; a feeder head with a real megawatt of load takes two. Capacity is added by whole receiver count as metered demand crosses thresholds, and the battery, inverters, switchgear and conversion around it are sized to metered demand, never to receiver nameplate (Section VIII). The greenfield over-build is deliberate and priced: $241,000 of idle aperture at Era II pricing, against a ramp NPV of $0.45M–$2.04M per village, and against the transmit fungibility a demand-matched receiver would destroy. Corridor revenue is anchor-weighted (~91 per

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:2490
**Current:** Gate D makes capacity factor ≥25 per cent against installed nameplate, delivered energy ≥700 MWh per site in year two, and collection ≥85 per cent a precondition of community-scale T4 drawdown. The Monte Carlo prices volume at a half-speed median.
**Why:** Single-limb Gate D measured against installed nameplate. On the fixed article a greenfield village runs 10.5 per cent CF in year one by construction, so this gate fires at every greenfield village and costs ~$2.2B of P90. The gate must split: D-1 nameplate-referenced for brownfield/feeder-head, D-2 reference-capacity-referenced for greenfield.
**Replace with:** Gate D has two limbs. **D-1 (brownfield and feeder-head):** capacity factor ≥40 per cent against installed nameplate within twelve months of energisation, and collection ≥85 per cent. **D-2 (greenfield):** capacity factor ≥25 per cent against *demand-matched reference capacity* — not against nameplate, because the article is deliberately over-built and nameplate CF would test the design decision rather than demand — plus delivered energy ≥700 MWh in year two, year-on-year growth ≥10 per cent, and collection ≥85 per cent. Both are preconditions of community-scale T4 drawdown. The Monte Carlo prices volume at a half-speed median.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:2514
**Current:** and the precedent inheritance running through the three jurisdictions with live HAPS regimes today: Kenya, Saudi Arabia, and the Japan-linked certification pipeline (Appendix F).
**Why:** Same unsourced count of three. The Japan certification pipeline has no source and cannot be a 'live HAPS regime today'. The count is 2.
**Replace with:** and the precedent inheritance running through the two jurisdictions with live HAPS regimes today: Kenya and Saudi Arabia (Appendix F).

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:2677
**Current:** *Solved by:* modular demand-following sites deploying at 150–250 kW against anchor loads that pay from day one, capacity added in ~100 kW increments as metered demand crosses thresholds (Section VIII); anchor-weighted corridor revenue (~91 per cent from telecom, mining, and sovereign contracts); and **gate D**: Tranche 4's community-scale portion does not draw until measured site capacity factor ≥
**Why:** RR9 still describes the REJECTED cassette architecture verbatim: 150–250 kW sites populated in ~100 kW increments. That architecture was rejected because it forces a swappable concentrating optic and a variable-flux qualification onto the critical path. RR9 is the entry a sovereign risk committee reads on demand risk, and it currently describes a design the programme does not build. Gate D is also
**Replace with:** *Solved by:* a **fixed, fully-populated, panel-matched receiver** (541 kW delivered, one PCSEL panel), deployed one article per greenfield village and two per feeder head against anchor loads that pay from day one, with the battery, inverters, switchgear and conversion sized to metered demand rather than to receiver nameplate (Section VIII); capacity added by whole receiver count as metered demand crosses thresholds, never in increments inside an article; anchor-weighted corridor revenue (~91 per cent from telecom, mining, and sovereign contracts); and **gate D, in two limbs**: Tranche 4's community-scale portion does not draw until brownfield and feeder-head sites clear capacity factor ≥40 

### /Users/billy_j/age-of-wonders/private/dossier-aquila/package/booklet-pre-nda.md:35
**Current:** The full conversion surface for a megawatt, enough for a town of five thousand, is one to two square metres of semiconductor. A small table, under a beam of light.
**Why:** Same defect as executive-memo.md:20, in the second travelling document. 1–2 m² is the cell plane of the 541 kW fixed article, not of a megawatt. Both documents travel together, so the error is quoted twice and reinforces itself.
**Replace with:** The full conversion surface for one receiver — **541 kilowatts** delivered, enough for a town of five thousand — is one to two square metres of semiconductor. A small table, under a beam of light.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/package/booklet-pre-nda.md:78
**Current:** Era II moves to PCSEL arrays and megawatt-class, demand-following community sites, gated on the laser panel milestone.
**Why:** Two contradictions of the finalised architecture in one clause. (1) "demand-following" is the REJECTED demand-matched/cassette architecture. The receiver is a fixed, fully-populated, panel-matched article — aperture, concentrating optic and cell tiling are qualified once; sites scale by receiver COUNT, not by sizing the article to load. (2) "megawatt-class" is the wrong nameplate: the Era II artic
**Replace with:** Era II moves to PCSEL arrays and community sites built on a fixed receiver: one panel, fully populated, **541 kilowatts** delivered. Sites scale by receiver count, not by resizing the article. Gated on the laser panel milestone.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/package/booklet-pre-nda.md:80
**Current:** Era III is the backbone: 10-megawatt nodes at 30-kilometre altitudes, priced against new conventional transmission at range.
**Why:** Three defects. (1) Wrong number: the Era III receiver is one rack = 19 MW optical / 3.509 = **5.41 MW** delivered, exactly 10:1 on the Era II panel. "10-megawatt" cannot be rebuilt from the quantisation chain and is ~85% high. (2) "nodes" is the retired word — it was overloaded across relay (stratospheric platform) and site (ground delivery point), and here it ambiguously means both. (3) It implie
**Replace with:** Era III is the backbone: **5.41-megawatt** receivers — one full rack, a single larger aperture re-qualified for the class — served by relays at 30-kilometre altitudes, priced against new conventional transmission at range.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/package/booklet-pre-nda.md:110
**Current:** A dated falsifier register of thirty entries names, for each material claim, the observation that would break it and when.
**Why:** The register now carries **thirty-one** entries: F31 was added (standardisation on the fixed article — idle-aperture cost >$0.03/kWh by 2035, or greenfield >40% of community capacity by 2034). A reader who counts the register in the dossier and finds thirty-one against a printed "thirty" in the shareable booklet has found a citation defect in the document that governs the discipline claim of §VII.
**Replace with:** A dated falsifier register of **thirty-one** entries names, for each material claim, the observation that would break it and when.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/sim/econ_model.py:54
**Current:** VALIDATION: the hostile run must reproduce the printed Section IX table. If it does
not, this script says so loudly and exits non-zero. Do not trust a model that cannot
reproduce its own published result.
**Why:** The script NEVER exits non-zero. There is no `import sys`, no `sys.exit`, no `raise SystemExit` anywhere in the file — verified: `python3 econ_model.py --prior hostile; echo $?` returns rc=0. The drift block at L196-201 only prints. This is a false claim about the package's own audit trail, made in the docstring of the artefact of record, in a document going to sovereign wealth funds. It is also s
**Replace with:** VALIDATION: the hostile run must reproduce the printed Section IX table — P(NPV>0),
P90, the mean multiple, and all ten branch statistics (5 frequencies, 5 median NPVs).
If any of them drifts, this script says so loudly and exits non-zero. Wire it into CI.
Do not trust a model that cannot reproduce its own published result.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/sim/econ_model.py:188
**Current:**         # percentile + multiple checks — the printed table must reproduce, or say so.
        drift = []
        if abs(pos * 100 - target['pos']) > 0.5:
            drift.append(f"P(NPV>0) {pos*100:.1f}% vs printed {target['pos']}%")
        if abs(p90 - target['p90']) > 0.15:
            drift.append(f"P90 {p90:+.2f} vs printed {target['p90']:+.2f}")
        if abs(mult - target['mult']) > 0.25:
**Why:** This is the mechanism by which the stale §IX table survived. Two defects. (1) The tolerances are WIDER THAN THE ACTUAL DRIFT: P90 is out by 0.07 against a 0.15 gate and the mean multiple is out by 0.17 against a 0.25 gate, so the validator prints nothing while the published multiple is wrong by 4.7%. A tolerance calibrated to swallow the error is not a check. (2) The branch table — the five freque
**Replace with:**         # percentile, multiple AND BRANCH checks — the printed table must reproduce, or
        # this run fails. Tolerances are set to Monte-Carlo noise at 20k paths, not to
        # whatever gap the current prose happens to have.
        drift = []
        if abs(pos * 100 - target['pos']) > 0.5:
            drift.append(f"P(NPV>0) {pos*100:.1f}% vs printed {target['pos']}%")
        if abs(p90 - target['p90']) > 0.05:
            drift.append(f"P90 {p90:+.2f} vs printed {target['p90']:+.2f}")
        if abs(mult - target['mult']) > 0.05:
            drift.append(f"mean multiple {mult:.2f}x vs printed {target['mult']}x")
        if 'freqs' in target:
            for (g, nm), tf in zip([(0

### /Users/billy_j/age-of-wonders/private/dossier-aquila/sim/econ_model.py:196
**Current:**         if drift:
            print("\n  *** THE PRINTED TABLE DOES NOT REPRODUCE ***")
            for d in drift:
                print(f"      - {d}")
            print("      The model is the artefact of record. Where it disagrees with the")
            print("      printed table, the printed table is what needs correcting.")
**Why:** The docstring (L55) promises this block 'exits non-zero'. It does not — it prints and returns, and the process exits 0 (verified). Nothing in the package can detect a stale §IX table automatically, which is how the current stale table shipped.
**Replace with:**         if drift:
            print("\n  *** THE PRINTED TABLE DOES NOT REPRODUCE ***")
            for d in drift:
                print(f"      - {d}")
            print("      The model is the artefact of record. Where it disagrees with the")
            print("      printed table, the printed table is what needs correcting.")
            raise SystemExit(1)

### /Users/billy_j/age-of-wonders/private/dossier-aquila/sim/econ_model.py:235
**Current:**     TGT = {"pos": 18.5, "lgf": "30-40 band", "branches": "+2.93/-0.41/-0.18/-0.02/-0.03",
           "p90": 2.1, "mult": 3.8}          # <- printed §IX. EDIT when the thesis is corrected.
**Why:** The model's own validation target is stale against the model's own output. Running `python3 econ_model.py --prior hostile` (the declared default, seed 7, 20,000 paths) gives P90 +2.169, mean multiple 3.63x, branch medians +2.89/-0.46/-0.19/-0.02/-0.02, medLGF $30.8M. The comment 'EDIT when the thesis is corrected' has the causality backwards and the file itself says so at L200-201 ('the printed ta
**Replace with:**     # Printed §IX, REGENERATED FROM THIS MODEL on 2026-07-14 (hostile, 20k paths, seed 7).
    # The model is the artefact of record (see L200-201). When these drift, the THESIS
    # is what gets corrected — never these constants.
    TGT = {"pos": 18.5, "lgf": "~$31M", "branches": "+2.89/-0.46/-0.19/-0.02/-0.02",
           "p90": 2.17, "mult": 3.63,
           "freqs": [11.8, 9.7, 24.2, 32.7, 21.6]}   # order: pass/G4/G3/G2/G1

### /Users/billy_j/age-of-wonders/private/dossier-aquila/sim/equipment_stream.py:3
**Current:** Prices the ground-hardware equipment stream (transmitter, receiver, node
integration — the Aquila-content share of every corridor SPV's procurement)
at a governed margin, as an ADDITIVE line on top of the Appendix C valuation.
**Why:** 'node' is retired nomenclature (relay = stratospheric platform; site = ground delivery point; receiver = the manufactured article). This is the file's opening sentence, and 'node integration' does not name anything in the finalised architecture.
**Replace with:** Prices the ground-hardware equipment stream (transmitter, receiver, and the fixed
site layer — the Aquila-content share of every corridor SPV's procurement)
at a governed margin, as an ADDITIVE line on top of the Appendix C valuation.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/sim/equipment_stream.py:12
**Current:**   A1. Capacity additions derive from the B.4 TWh anchors, geometric
      interpolation between anchors (C.2 convention), converted at
      285 GW / 1,500 TWh = 0.19 GW per TWh/yr (mission arithmetic).
**Why:** This is the §10A.1 defect — counting delivered DEMAND as installed NAMEPLATE — reproduced inside the equipment model, where it drives the entire revenue base. 285 GW against 1,500 TWh/yr implies a fleet capacity factor of 1500e12 / (285e9 x 8760) = 60.1%. Under the finalised architecture no site class reaches that: greenfield villages run 10.5% CF in year 1 against a deliberately over-built 541 kW
**Replace with:**   A1. Capacity additions derive from the B.4 TWh anchors, geometric
      interpolation between anchors (C.2 convention). Converted to INSTALLED
      NAMEPLATE (not delivered demand) at the corridor-blend capacity factor:
      the receiver is a fixed, fully-populated article, so nameplate is set by
      the article, not by the load. Feeder-head sites (the base case, 79% of
      addressable population) run CF ~50%; greenfield villages ramp from 10.5%.
      Blend carried at CF = 0.50 => 1 TWh/yr = 1 / (0.50 x 8.760) = 0.2283 GW
      nameplate. The old 285 GW / 1,500 TWh = 0.19 GW/TWh basis is SUPERSEDED:
      it implied a 60.1% fleet CF, which no site class in the architecture
      att

### /Users/billy_j/age-of-wonders/private/dossier-aquila/sim/equipment_stream.py:16
**Current:**       (2032-35: transmitter $2.00 + receiver $0.70 + node integration ~$0.30),
      $1.20/W in Era III (2036-39: $0.80 + $0.30 + ~$0.10), $0.90/W from 2040
**Why:** Two defects on one line. (1) NOMENCLATURE: 'node' is retired — it was overloaded across relay and site. There is no 'node integration' line item anywhere in the finalised cost model. (2) STRUCTURE: the finalised site cost is F + v_r*P_aperture + v_e*P_demand, and any pure-$/W or per-MW site cost formula is a modelling defect. The $0.30/W here stands in for the FIXED layer F (~$300k per site: inter
**Replace with:**       (2032-35: transmitter $2.00/W + receiver $0.70/W, both APERTURE-scaling,
      + the FIXED site layer F ~$300k/site — interlock, surveillance, safety PLC,
      SCADA, plinth, aperture housing, tracking mount, grid tie, consent/ESIA,
      mobilisation. F does not scale with watts: on the 541 kW Era II article it is
      $0.554/W; on the 5.41 MW Era III rack it is $0.055/W. Carried as a per-site
      line, never a $/W line — a pure-$/W site cost is a modelling defect),
      Era III (2036-39: $0.80/W + $0.30/W + F), volume pricing from 2040

### /Users/billy_j/age-of-wonders/private/dossier-aquila/sim/equipment_stream.py:39
**Current:** GW_PER_TWH = 285.0 / 1500.0          # A1
**Why:** The executable form of the A1 defect. 285/1500 = 0.19 GW per TWh/yr embeds a 60.1% fleet capacity factor that no site class in the finalised architecture attains. It is the multiplier on every revenue, margin and NPV figure the file prints, including the headline 'E[NPV of equipment-margin stream @15%]: $1.04B' (founder) / '$0.24B' (hostile) and the '$1.74B/yr' 2040 margin run-rate — all understat
**Replace with:** CF_BLEND   = 0.50                      # A1: corridor-blend capacity factor (feeder-head base case)
GW_PER_TWH = 1.0 / (CF_BLEND * 8.760)  # A1: TWh/yr -> GW NAMEPLATE = 0.2283 GW per TWh/yr

### /Users/billy_j/age-of-wonders/private/dossier-aquila/sim/hostile_stacked.py:11
**Current:** Validation target (printed): P(NPV>0)=18.5%; branch freq 11.7/10.1/23.1/32.5/22.6;
branch median NPV +2.93 / -0.41 / -0.18 / -0.02 / -0.03 ($B); median LGF ~$40M.
**Why:** Every figure on these two lines except 18.5% is stale against the artefact of record. econ_model.py run at its declared default (hostile prior, 20,000 paths, seed 7) yields: branch freq 11.82/9.71/24.18/32.65/21.64; branch median NPV +2.889/-0.464/-0.190/-0.017/-0.025; median LGF $30.8M. The G4 branch median is out by $50M and G3's frequency by 1.1 points.
**Replace with:** Validation target (printed): P(NPV>0)=18.5%; branch freq 11.8/9.7/24.2/32.6/21.6;
branch median NPV +2.89 / -0.46 / -0.19 / -0.02 / -0.02 ($B); median LGF ~$31M.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/sim/hostile_stacked.py:26
**Current:**   - Salvage is a terminal lump at the failure year, CALIBRATED so each branch's median
    NPV reproduces the printed baseline table. That calibration is what makes the
    stressed run comparable to the printed one.
**Why:** False as shipped. The calibration returns {1: 0.0, 2: 0.0, 3: 0.0, 4: 0.0} and the baseline reproduces P(NPV>0) 37.0%, not 18.5%. The stressed run is therefore NOT comparable to the printed one, which is the entire epistemic warrant this file offers. It is served to investors from site.content.json as 'the run the thesis names but never prints'.
**Replace with:**   - Salvage is a terminal lump at the failure year, SOLVED so each branch's median NPV
    reproduces the printed baseline table. The solve is bracketed on [-6, +6] $B: the
    era-gated failure branches out-earn the printed medians at zero salvage, so the
    solution is a wind-down COST, not a recovery. calibrate() raises if any branch
    cannot be brought within $20M of its printed target — a stressed run that does not
    share a baseline with the printed table is not evidence about anything.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/sim/hostile_stacked.py:127
**Current:**         drawn = sum(v for y, v in DRAWS.items() if y <= stop)
**Why:** Capital-at-risk at a failed G2 disagrees with econ_model.py, the artefact of record, by 2x. Gate G2 resolves in 2031, but 2031 is the FIRST year of the $500M T3 tranche. `y <= stop` therefore books a $167M T3 draw that a failed G2 gate truncates. RUN OUTPUT confirms it: hostile_stacked reports `fail G2 ... drawn$B 0.34`, while econ_model.py reports `fail G2 ... 0.17` and its own CUM_DRAWN[1] = 0.1
**Replace with:**         # A failed gate TRUNCATES the tranche it gates — capital is not drawn into a
        # tranche whose gate has just failed. Mirrors econ_model._last_draw_year().
        LAST_DRAW_YEAR = {0: 2055, 1: 2027, 2: 2030, 3: 2033, 4: 2037}
        last = LAST_DRAW_YEAR[fail_gate]
        drawn = sum(v for y, v in DRAWS.items() if y <= last)

### /Users/billy_j/age-of-wonders/private/dossier-aquila/sim/hostile_stacked.py:182
**Current:** def calibrate():
    sv = {0: 0.0, 1: 0.0, 2: 0.0, 3: 0.0, 4: 0.0}
    for g in (1, 2, 3, 4):
        lo, hi = 0.0, 6.0
        for _ in range(40):
            mid = (lo + hi) / 2
            sv[g] = mid
            rows = run(salvage=sv, seed=SEED)
            b = [r[2] for r in rows if r[0] == g]
            med = st.median(b) if b else 0.0
            if med < TARGET[g]: lo = mid
            el
**Why:** RUN OUTPUT: `Calibrated salvage lumps ($B, at failure year): {1: 0.0, 2: 0.0, 3: 0.0, 4: 0.0}`. The bisection cannot converge and silently returns zero for every branch. Salvage is monotonically INCREASING in NPV, but at sv=0 the branch medians are ALREADY ABOVE the printed targets (verified: G2 +0.002 vs target -0.02; G3 -0.070 vs -0.18; G4 +0.130 vs -0.41). No non-negative salvage reproduces the
**Replace with:** def calibrate():
    """Solve each branch's terminal salvage lump so the branch median NPV reproduces
    the printed §IX target. The era-gated failure branches here already out-earn the
    printed medians at ZERO salvage, so the solution is a NEGATIVE lump (a wind-down
    COST, not a recovery) — the bracket must admit it, and the model must fail loudly
    if the printed table is unreachable inside the bracket."""
    sv = {0: 0.0, 1: 0.0, 2: 0.0, 3: 0.0, 4: 0.0}
    for g in (1, 2, 3, 4):
        lo, hi = -6.0, 6.0
        for _ in range(60):
            mid = (lo + hi) / 2
            sv[g] = mid
            rows = run(salvage=sv, seed=SEED)
            b = [r[2] for r in rows if r[0] =

### /Users/billy_j/age-of-wonders/private/dossier-aquila/sim/hostile_stacked.py:204
**Current:**     print("  printed: P(NPV>0) 18.5% | freq 11.7/10.1/23.1/32.5/22.6 | medLGF ~$40M")
**Why:** This line prints the printed-§IX target immediately beneath the file's own BASELINE of P(NPV>0) 37.0% / medLGF $28M and does nothing about the 18.5-point gap. It is a validation line that cannot fail. Three separate numbers on it are also independently wrong: (a) 37.0% ≠ 18.5%; (b) the branch frequencies 11.7/10.1/23.1/32.5/22.6 do not reproduce from ANY of the three models — econ_model.py at its 
**Replace with:**     print("  printed §IX: P(NPV>0) 18.5% | freq 11.8/9.7/24.2/32.6/21.6 | medLGF ~$31M")
    base_pos = sum(1 for r in base if r[2] > 0) / len(base)
    if abs(base_pos * 100 - 18.5) > 0.5:
        raise SystemExit(
            f"*** BASELINE DOES NOT REPRODUCE §IX: {base_pos*100:.1f}% vs printed 18.5%. "
            f"The stacked run below is NOT comparable to the printed baseline. Refusing "
            f"to print it.")

### /Users/billy_j/age-of-wonders/private/dossier-aquila/sim/network_sim.py:56
**Current:** STATION_AVAIL = float(os.environ.get("AQ_STATION_AVAIL", "1.0"))   # on-station availability
**Why:** The default treats an on-station relay payload as PERFECTLY RELIABLE, and the file's own comment (L52-55) admits the omission 'compounds as a^N across N relays' in the Era III serial backbone. The published reproduce command in site.content.json does not set AQ_STATION_AVAIL, so every table an investor regenerates carries the optimistic assumption. Measured on the Era III backbone row: at AQ_STATI
**Replace with:** STATION_AVAIL = float(os.environ.get("AQ_STATION_AVAIL", "0.99"))  # on-station availability (planning basis; set 1.0 ONLY to reproduce pre-2026-07-13 runs)

### /Users/billy_j/age-of-wonders/private/dossier-aquila/sim/network_sim.py:576
**Current:**     print("Era II beam-powered fleet, 2 relay stations, N+1 (3 hulls/station),")
    print("anchor firm 0.50 pu flat + community 0.35 pu evening peak, genset 0.55 pu.\n")
**Why:** The whole dispatch model encodes the REJECTED demand-matched receiver. Bus capacity is 1.0 pu and peak demand is firm 0.50 + community 0.35 = 0.85 pu — capacity sized to ~1.2x peak load. The finalised architecture is the opposite: a FIXED, fully-populated 541 kW article against a ~200 kW greenfield day-one load (2.7x over-built, 10.5% nameplate CF in year 1), ramping into it. Because the sim has n
**Replace with:**     print("Era II beam-powered fleet, 2 relay stations, N+1 (3 hulls/station).")
    print("Receiver: FIXED fully-populated 541 kW article (one panel), NOT demand-matched.")
    print("Bus nameplate 1.00 pu = the article. Greenfield day-one load ~0.37 pu")
    print("(anchor firm 0.18 pu flat + community 0.19 pu evening peak), ramping.")
    print("Demand-matched REFERENCE capacity 0.37 pu = the Gate D-2 CF basis.")
    print("Genset 0.20 pu. Nameplate CF and reference CF are reported separately:")
    print("Gate D-1 tests CF>=40% vs NAMEPLATE; Gate D-2 tests CF>=25% vs REFERENCE.\n")

### /Users/billy_j/age-of-wonders/private/dossier-aquila/sim/network_sim.py:597
**Current:**     rows = [
        # WA Goldfields class: Era I anchor, arid, single relay, solar (immune)
        ("arid anchor EraI 2ing", dict(clim="arid", ingress=2, stations=1,
**Why:** The BASE CASE is missing from the corridor-class table. Brownfield-first siting is now the base case, not an upside: 23 of 46 corridors carry existing nominal-but-dead distribution holding 79% of addressable population, and the feeder-head site class (existing MV feeder, 13,000-26,000 people, ~1 MW day-one load, no distribution build, CF ~50%, 2 receiver articles) is the priority. Table NO-3 simul
**Replace with:**     rows = [
        # FEEDER-HEAD (THE BASE CASE): existing MV feeder, 13k-26k people, ~1 MW
        # day-one load, no distribution build, CF ~50%. 2 receiver articles
        # (1.08 MW nameplate). 79% of addressable population sits behind this class.
        ("feeder-head BASE 3ing", dict(clim="reference", ingress=3, stations=2,
         per_station=3, era="II", beam=True, topo="dist2", buffer=2.6,
         firm=0.55, comm_peak=0.60, genset=0.30)),
        # GREENFIELD village: 1 fixed 541 kW article against a ~200 kW day-one load,
        # ramping into it. Nameplate CF 10.5% in year 1 BY DESIGN — this is the row a
        # single-limb nameplate Gate D would fire on by construction.
  

### /Users/billy_j/age-of-wonders/private/dossier-aquila/site.content.json:132
**Current:**     "printedIX": {
      "_comment": "The published Section IX figures the model is checked against. EDIT THESE if the thesis changes.",
      "pos": 18.5,
      "p10": -0.24,
      "p50": -0.03,
      "p90": 2.1,
      "meanMultiple": 3.8,
      "branches": {
        "0": { "freq": 11.7, "medNpv": 2.93 },
        "4": { "freq": 10.1, "medNpv": -0.41 },
        "3": { "freq": 23.1, "medNpv": -0.18
**Why:** These are the figures the interactive model page prints as 'published §IX' beside a LIVE Monte Carlo that a committee's advisor runs in the browser. They do not reconcile. Verified against econ_model.py at the declared default (hostile, 20,000 paths, seed 7): P90 is +2.17 not 2.1; mean multiple is 3.63x not 3.8x (a 4.7% error on the single number an investor carries away); ALL FIVE branch frequenc
**Replace with:**     "printedIX": {
      "_comment": "The published Section IX figures the model is checked against. Reproduced from `python3 sim/econ_model.py --prior hostile` (20,000 paths, seed 7) on 2026-07-14. EDIT THESE ONLY BY RE-RUNNING THE MODEL — never by hand.",
      "pos": 18.5,
      "p10": -0.24,
      "p50": -0.03,
      "p90": 2.17,
      "meanMultiple": 3.63,
      "branches": {
        "0": { "freq": 11.8, "medNpv": 2.89 },
        "4": { "freq": 9.7, "medNpv": -0.46 },
        "3": { "freq": 24.2, "medNpv": -0.19 },
        "2": { "freq": 32.7, "medNpv": -0.02 },
        "1": { "freq": 21.6, "medNpv": -0.02 }
      }
    },

### /Users/billy_j/age-of-wonders/private/dossier-aquila/site.content.json:174
**Current:**           "title": "hostile_stacked.py",
          "kicker": "All three stressors applied together — the run the thesis names but never prints.",
          "cli": "python3 hostile_stacked.py"
**Why:** The dossier invites investors to run a file whose salvage calibration silently returns all-zeros, whose BASELINE reports P(NPV>0) 37.0% against the printed 18.5% without failing, and whose stacked-stress headline (26.6%) is HIGHER than the printed base case — as shipped, the file appears to show that stacking three adverse stressors IMPROVES the programme. It also books $337M of G2 capital-at-risk
**Replace with:**           "title": "hostile_stacked.py",
          "kicker": "All three stressors applied together — the run the thesis names but never prints. Its baseline is asserted against §IX; the script exits non-zero if it fails to reproduce.",
          "cli": "python3 hostile_stacked.py"

### /Users/billy_j/age-of-wonders/private/dossier-aquila/site.content.json:192
**Current:**           "kicker": "Fleet, corridor and availability Monte Carlo — Design Review, Network Operations.",
          "cli": "python3 network_sim.py --table all --trials 200 --seed 7"
**Why:** This is the command the dossier tells a sovereign fund's advisors to run. It leaves AQ_STATION_AVAIL unset, so it reproduces the optimistic run in which an on-station relay payload never fails — the omission network_sim.py's own L52-55 comment says 'compounds as a^N' across the Era III serial trunk. The advisor regenerates 99.6% backbone availability; the planning basis is 96.7%.
**Replace with:**           "kicker": "Fleet, corridor and availability Monte Carlo — Design Review, Network Operations. On-station payload availability is priced at 0.99; set AQ_STATION_AVAIL=1.0 to reproduce the pre-2026-07-13 runs that omitted it.",
          "cli": "AQ_STATION_AVAIL=0.99 python3 network_sim.py --table all --trials 200 --seed 7"


## HIGH

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-haps-relay.md:62
**Current:** Eliminated as relay carrier (8–18× payload deficit); flies WP-B2 instrumentation and beacon nodes
**Why:** "node" is retired from the package nomenclature: it was overloaded across relay (stratospheric platform) and site (ground delivery point). "Beacon nodes" is ambiguous between an airborne beacon platform and a ground beacon station.
**Replace with:** Eliminated as relay carrier (8–18× payload deficit); flies WP-B2 instrumentation and beacon platforms

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-haps-relay.md:502
**Current:** | E1 pointing budget on moving platform | WP-B2 PSD, 2027; G2 diurnal lock record | Flux-managed spot margin (50×); isolation stage (+2–4 kg); spot-size increase at receiver |
**Why:** Same defect as §2.4 in the risk register: the E1 fallback reads as a receiver re-sizing option, which the fixed, panel-matched, fully-populated article forbids. The fallback must be expressed in receiver count.
**Replace with:** | E1 pointing budget on moving platform | WP-B2 PSD, 2027; G2 diurnal lock record | Flux-managed spot margin (50×); isolation stage (+2–4 kg); spot-size increase absorbed by added receiver articles at the site (fixed aperture; receiver count is the scaling variable) |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-network-operations.md:45
**Current:** | N9 | Site buffer 2–4 MWh per MW sized for hours-class events | **Verified for its stated job, with a boundary [model]**. Against days-class outages the buffer is nearly irrelevant to annual availability: the bus moves 0.1 points across the whole 1→4 MWh/MW sweep. The buffer is a short-episode and diurnal instrument. The third ingress site does what the third MWh cannot | §5.3 |
**Why:** The verdict leaves the "per MW" denominator undeclared, and with the fixed article the two candidate denominators (receiver nameplate vs metered demand) differ by 34% at the reference corridor and by 2.7× at a greenfield village. The greenfield beam-slice floor (~1.4 MWh usable) is also missing from the verdict.
**Replace with:** | N9 | Site buffer 2–4 MWh per MW sized for hours-class events | **Verified for its stated job, with a boundary and a denominator [model]**. The rule is 2–4 MWh per MW of metered demand, not per MW of receiver nameplate. Against days-class outages the buffer is nearly irrelevant to annual availability: the bus moves 0.1 points across the whole 1→4 MWh/MW sweep. The buffer is a short-episode and diurnal instrument, and the third ingress site does what the third MWh cannot. One floor overrides the rule: the greenfield battery is sized to the beam slice (~344 kW of article surplus over ~4 h ⇒ ~1.4 MWh usable), not to load | §5.3 |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-network-operations.md:90
**Current:** **Overprovisioning is not free.** The internet's default answer to congestion (overprovision, because marginal bandwidth is nearly free) fails here: every unit of link headroom is transmitter capex at $2,500/kW-optical falling to $400 [alloc: blueprint §9.4]. The corridor runs deliberately close to capacity, so oversubscription is managed by contract class and shed order, not by protocol backoff.
**Why:** Two problems. (1) The transmitter price is quoted only on the optical basis, while the site-cost model prices transmit at $2.00/W delivered; a reader cannot reconcile them without the 3.509 optical-W-per-delivered-W chain, which is never printed here. (2) The bullet asserts the corridor is run close to capacity without naming the counterpart of the finalised architecture: the receiver IS deliberat
**Replace with:** **Overprovisioning is asymmetric.** The internet's default answer to congestion (overprovision, because marginal bandwidth is nearly free) only half-transfers. Transmit capacity is the expensive side: every unit of link headroom is transmitter capex at $2,500/kW-optical falling to $400 [alloc: blueprint §9.4], which on the 3.509 optical W per delivered W chain is the $2.00/W-delivered transmit line of the site-cost model. Receiver capacity is the cheap side, at $0.70/W Era II. So the corridor over-builds the receiver and runs the transmitter close to capacity. That is the point of the fixed, fully-populated, panel-matched article: because every receiver can absorb a full panel at full power,

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-network-operations.md:140
**Current:** This is a proposed delta to §10A's drawing and to the corridor capital stack (one further transportable ground station, order $8.5M at Era II pricing: cheap against 1.5 bus points and F18 compliance).
**Why:** $8.5M is a capital-stack number a diligence reader will try to rebuild and cannot: no basis, no citation, no grade. It appears three times in this document (§3.2, §5.3 finding 1, §6.2) and is the entire cost of the document's headline recommendation.
**Replace with:** This is a proposed delta to §10A's drawing and to the corridor capital stack (one further transportable ground station, order $8.5M at Era II pricing [alloc: blueprint §9.4 ground-station cost class, at the corridor's per-station optical rating]: cheap against 1.5 bus points and F18 compliance).

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-network-operations.md:164
**Current:** **The toll arithmetic.** Each added backbone relay costs ~3.5% of through-flow (99% relay throughput × ~2.5% station-keeping tap) [alloc: blueprint §5.2, LW-1.6]. Routing a megawatt-hour one extra site to reach a cheaper source therefore pays whenever the source-price spread, priced through the Era III chain, exceeds ~3.5% of delivered price, roughly $0.004/kWh at the Era III $0.10–0.13 band.
**Why:** Two stale inputs. The Era III station-keeping tap is 2.4% on the recomputed electrical basis (design-haps-relay §3.2, V9), not 2.5%. And the Era III delivered price is now the corrected LCOE of $0.133/kWh, not a $0.10–0.13 band; 3.4% of $0.133 is $0.0045, so "$0.004" is built on a superseded floor.
**Replace with:** **The toll arithmetic.** Each added backbone relay costs ~3.4% of through-flow (99% relay throughput × 2.4% station-keeping tap, the recomputed Era III figure of design-haps-relay §3.2) [alloc: blueprint §5.2, LW-1.6]. Routing a megawatt-hour one extra site to reach a cheaper source therefore pays whenever the source-price spread, priced through the Era III chain, exceeds ~3.4% of delivered price, roughly $0.005/kWh at the corrected Era III LCOE of $0.133/kWh.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-network-operations.md:349
**Current:** 2. **Buffer size is a second-order availability instrument.** The full 1→4 MWh/MW sweep moves bus availability by ~0.1 points, because the residual outages are days-class (post-descent re-climb gaps), not hours-class. The 2–4 MWh/MW sizing rule survives, but its justification is short-episode ride-through, diurnal shaping, and power quality, not annual availability. Money that wants to buy availab
**Why:** As written this licenses under-sizing the greenfield battery. Under the fixed article the greenfield battery must be sized to the BEAM SLICE, not to load: a 541 kW article against a ~200 kW day-one load leaves ~344 kW of surplus over a ~4 h window, i.e. ~1.4 MWh usable. A per-MW-of-demand rule under-sizes those sites by ~$40–60k each. The buffer is modular electrical (sized to metered demand) ever
**Replace with:** 2. **Buffer size is a second-order availability instrument, with one sizing floor that is not about availability at all.** The full 1→4 MWh/MW sweep moves bus availability by ~0.1 points, because the residual outages are days-class (post-descent re-climb gaps), not hours-class. The 2–4 MWh/MW rule (per MW of metered demand) survives for short-episode ride-through, diurnal shaping, and power quality, not annual availability. Money that wants to buy availability buys ingress diversity. The exception is the greenfield village: its battery is sized to the beam slice, not to load. A 541 kW article against a ~200 kW day-one load delivers ~344 kW of surplus over a ~4 h window, so the usable floor i

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-network-operations.md:456
**Current:** **Contract structure:** transmission-service pricing against new-build wire at range (~$0.10–0.13/kWh delivered basis), with interchange/wheeling terms written from the outset (§3.4).
**Why:** The Era III delivered LCOE is $0.133/kWh on the corrected basis. Printing a $0.10 floor understates the backbone's own cost and, in an investor document, reads as the superseded (12%-optimistic) LCOE family that the $0.341/$0.34 correction retired.
**Replace with:** **Contract structure:** transmission-service pricing against new-build wire at range, at the corrected Era III LCOE of $0.133/kWh delivered, with interchange/wheeling terms written from the outset (§3.4).

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-pcsel-array.md:113
**Current:** | Optical output | 1.9 MW; acceptance ≥1.5 MW CW, Strehl ≥0.9, 24 h, WPE ≥55% | [alloc: gate P2] |
**Why:** The panel is the quantum the fixed receiver is matched to, and this document never states the link. Without 1.9 MW / 3.509 = 541 kW printed here, a reader cannot rebuild the article, the 10:1 Era II→Era III ratio, or the panel-hour fungibility argument. Missing linkage in the transmit review is why 544 kW and other stale articles survive elsewhere in the package.
**Replace with:** | Optical output | 1.9 MW ⇒ 1.9/3.509 = **541 kW delivered: exactly one Era II receiver article** (the panel is the quantum the fixed, fully-populated receiver is matched to) | [alloc]; chain 3.509 optical W per delivered W |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-pcsel-array.md:128
**Current:** | Optical output | 19 MW; acceptance ≥18 MW, 24 h, −20 to +45 °C | gate P3 |
**Why:** Same missing linkage at the rack tier: 19 MW / 3.509 = 5.41 MW delivered = exactly one Era III receiver article, the 10:1 step from the Era II panel. The transmit review is the natural place this ratio is rebuilt from.
**Replace with:** | Optical output | 19 MW ⇒ 19/3.509 = **5.41 MW delivered: exactly one Era III receiver article** (10:1 on the Era II panel/article, and a re-certification event, not ten Era II receivers); acceptance ≥18 MW, 24 h, −20 to +45 °C | gate P3 |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-pcsel-array.md:147
**Current:** | Site area | Racks ~0.5 ha + thermal field ~1–1.5 ha + PCS/switchyard ⇒ **~2 ha total** (the ~0.5 ha figure is the rack field alone) | recomputed |
**Why:** 'Site' is now reserved for a ground delivery point. This is the transmit station footprint. The same collision runs through §1.3 (line 60 'Block site area'), §3.6 ('arid sites'), §3.7 ('the site's P99 hot hour') and the P3 risk row ('Site ambient screening'). The blueprint already uses 'station-inclusive' at the rack cost row, so 'station' is the available word.
**Replace with:** | Station area | Racks ~0.5 ha + thermal field ~1–1.5 ha + PCS/switchyard ⇒ **~2 ha total** (the ~0.5 ha figure is the rack field alone). Nomenclature: this is the transmit **station**; **site** is reserved for a ground delivery point, and **relay** for the stratospheric platform | recomputed |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-pcsel-array.md:278
**Current:** | P1 | Injection locking fails at power across 1,000 channels (phase noise, thermal crosstalk, chaotic locking states) | ≥1,000-channel locked sub-array acceptance with combining-efficiency measurement | **Incoherent tile combining** at reduced brightness (E2: costs aperture and spot size, not feasibility); second foundry process; smaller locked domains with optical phase stitching |
**Why:** 'Costs aperture and spot size' is ambiguous about which aperture. The transmit aperture can grow; the receiver aperture cannot — it is fixed and qualified once. Left ambiguous, this fallback reads as licence to grow the receiver, which the finalised architecture forbids.
**Replace with:** | P1 | Injection locking fails at power across 1,000 channels (phase noise, thermal crosstalk, chaotic locking states) | ≥1,000-channel locked sub-array acceptance with combining-efficiency measurement | **Incoherent tile combining** at reduced brightness (E2: costs *transmit* aperture and spot size, not feasibility — the **receiver** aperture is fixed and cannot absorb the growth, so any spot excess lands in the stray-flux budget); second foundry process; smaller locked domains with optical phase stitching |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-receiver-thermal.md:34
**Current:** | 6 | Suncave corner-cube geometry: three internal reflections, 1–2% residual reflectivity, ~10⁵× stray reduction | **Accepted [meas: Aquila]**, and thermally consistent. New obligation quantified: at 1 MW the protected volume absorbs ~100 kW of homogeniser and fill-factor loss, so it needs a cooled-wall loop of its own (§3c below). |
**Why:** 'at 1 MW' is neither the article's delivered power (541 kW) nor a labelled incident figure. The reader cannot tell which, and the 1 MW/10 MW convention used throughout the document is defined at line 81 as DELIVERED — which is wrong. Bind it to the article and state the basis.
**Replace with:** | 6 | Suncave corner-cube geometry: three internal reflections, 1–2% residual reflectivity, ~10⁵× stray reduction | **Accepted [meas: Aquila]**, and thermally consistent. New obligation quantified: at the Era II article (541 kW delivered, ~1.08 MW incident at the cell plane) the protected volume absorbs ~108 kW of homogeniser and fill-factor loss, so it needs a cooled-wall loop of its own (§3c below). |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-receiver-thermal.md:35
**Current:** | 7 | Downlink spot 1.1–1.6 m at 1 MW; 10–20 m² / 3.6–5.1 m disc at 10 MW | **Verified**. Arithmetic reproduces exactly (A = P/flux; d = √(4A/π)). |
**Why:** The geometry is right but the power labels are not: 1.1–1.6 m corresponds to ~1.08 MW INCIDENT (the 541 kW Era II article) and 3.6–5.1 m to ~10.8 MW INCIDENT (the 5.41 MW Era III article). As printed, a reader rebuilds 1 MW and 10 MW delivered receivers, which do not exist, and may read Era III as ten Era II apertures rather than the single re-certified 3.6–5.1 m aperture it is.
**Replace with:** | 7 | Downlink spot 1.1–1.6 m at ~1.08 MW incident (the Era II article: 541 kW delivered, one transmit panel); 10–20 m² / 3.6–5.1 m disc at ~10.8 MW incident (the Era III article: 5.41 MW delivered, one transmit rack) | **Verified**. Arithmetic reproduces exactly (A = P_incident/flux; d = √(4A/π)). Both apertures are fixed and fully populated. Era III is a single 3.6–5.1 m aperture with a 10–20 m² cell plane, qualified in its own right: a re-certification event, not ten Era II apertures. |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-receiver-thermal.md:36
**Current:** | 8 | Cost: ~$15/W hand-build → ~$5/W anchor → $0.70 → $0.30; NREL ~$0.65/Wₚ anchor | **$15→$5 verified as procurement class; $0.70/$0.30 design targets.** The NREL transfer gap is now quantified: liquid cooling and MPPT add $0.15–0.30/W the Fresnel comparator never carried, offset by the tracker and lens parquet it did carry and Lightway deletes (§6). |
**Why:** $0.70 and $0.30 are v_r — the receiver-and-optic coefficient that scales with APERTURE only. Printed as a bare cost curve they read as a site $/W, which is the defect the package must retire. A verified review must label them so a reader cannot rebuild a site from them.
**Replace with:** | 8 | Cost: ~$15/W hand-build → ~$5/W anchor → $0.70 → $0.30; NREL ~$0.65/Wₚ anchor | **$15→$5 verified as procurement class; $0.70/$0.30 design targets.** These are **v_r**, the receiver-and-optic coefficient scaling with APERTURE power only — not a site $/W. Site cost is F + v_r·P_aperture + v_e·P_demand (F ≈ $300k fixed, v_e ≈ $1.20/W on metered demand). The NREL transfer gap is now quantified: liquid cooling and MPPT add $0.15–0.30/W the Fresnel comparator never carried, offset by the tracker and lens parquet it did carry and Lightway deletes (§6). |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-receiver-thermal.md:158
**Current:** The corner-cube geometry's thermal accounting, taken through the blueprint §10A.2 loss chain at a 1 MW site:
**Why:** No 1 MW site exists. The Era II article is 541 kW delivered against ~1.08 MW incident; the whole §3c loss accounting hangs off this basis line.
**Replace with:** The corner-cube geometry's thermal accounting, taken through the blueprint §10A.2 loss chain at the Era II article (541 kW delivered, ~1.08 MW incident at the cell plane):

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-receiver-thermal.md:161
**Current:** - **Homogeniser and fill-factor losses (the 0.90 chain factor): ~100 kW at 1 MW.** This is the receiver's second thermal system and the baseline never located it. It lands in three places: absorption in the homogeniser optics (allocate ≤1% of incident, ~10 kW: dielectric surfaces at 1080 nm, coating-grade [pub]); geometric spill onto inter-cell dead area and cavity walls (~60–80 kW); aperture-edge
**Why:** Restated on the wrong article power. On the 541 kW article's ~1.08 MW incident the 0.90 chain factor drops ~108 kW, and the three sub-allocations scale with it. As printed the cooled-wall loop is sized from a receiver that does not exist.
**Replace with:** - **Homogeniser and fill-factor losses (the 0.90 chain factor): ~108 kW at the Era II article's ~1.08 MW incident.** This is the receiver's second thermal system and the baseline never located it. It lands in three places: absorption in the homogeniser optics (allocate ≤1% of incident, ~11 kW: dielectric surfaces at 1080 nm, coating-grade [pub]); geometric spill onto inter-cell dead area and cavity walls (~65–85 kW); aperture-edge clip on the entrance baffle (~11–22 kW).

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-receiver-thermal.md:163
**Current:** **Proposal: the protected volume's walls are the heat sink by design**: black-anodised, liquid-cooled wall panels on the same glycol circuit as the cell plates (return leg, where coolant grade is irrelevant), sized for 150 kW at 1 MW (50% margin). Wall flux is <1 W/cm²: trivial per area, real in aggregate.
**Why:** Sizes the cooled-wall loop from the non-existent 1 MW receiver. On the fixed article the 50% margin sits on ~108 kW ⇒ 160 kW at Era II, and 1.6 MW at the Era III article. Because the article is fixed and fully populated, this loop is qualified once, not sized per site.
**Replace with:** **Proposal: the protected volume's walls are the heat sink by design**: black-anodised, liquid-cooled wall panels on the same glycol circuit as the cell plates (return leg, where coolant grade is irrelevant), sized for 160 kW at the Era II article (50% margin on ~108 kW) and 1.6 MW at the Era III article. The loop is qualified once with the article, not sized per site. Wall flux is <1 W/cm²: trivial per area, real in aggregate.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-receiver-thermal.md:192
**Current:** **Site thermal parasitic roll-up (1 MW community site, 45 °C design day) [alloc]:**
**Why:** The community site carries one fixed 541 kW article, not a 1 MW receiver. The percentages survive but the basis line is wrong, and it is the header a reader rebuilds the aux load from.
**Replace with:** **Site thermal parasitic roll-up (community site: one fixed 541 kW article, 45 °C design day) [alloc]:**

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-receiver-thermal.md:199
**Current:** | **Node total** | **~3–7%** |
**Why:** 'Node' is retired: it was overloaded across relay and site. This row is the site aux total.
**Replace with:** | **Site total** | **~3–7%** |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:80
**Current:** | LW-1.4 | End-to-end efficiency (wall-plug to AC, planning, device-class chain; corridor-level slant/fill/parasitic allowances per §10A.2) | ≥15% | ≥20% | ≥25% |
**Why:** The Era II floor of ≥20% is breached by the blueprint's own planning column. §10A.2 plans 54 MW electrical in to 9.1 MW AC out = 16.9% wall-plug to AC. The parenthetical carve-out ('device-class chain; corridor-level allowances per §10A.2') is doing all the work and a reader rebuilding the link budget will read a requirement breach on the face of the document. State the two bases separately so the
**Replace with:** | LW-1.4 | End-to-end efficiency, **device-class chain** (wall-plug to AC, near-zenith, device-class values met) | ≥15% | ≥20% | ≥25% |
| LW-1.4a | End-to-end efficiency, **corridor planning basis** (incl. 30° slant, homogeniser/fill, chiller and BOS parasitics per §10A.2; 3.509 optical W per delivered W) | ≥12% | ≥16% | ≥20% |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:215
**Current:** At 40–90 kg, Zephyr (5 kg) and PHASA-35 (15 kg) are eliminated as Era I power-relay carriers. They carry instrumentation, beacon nodes, and WP-B2 jitter campaigns.
**Why:** 'Node' is retired from the package nomenclature — it was overloaded across the stratospheric-platform sense and the ground-delivery-point sense. 'Beacon nodes' is a third, ambiguous use, on airborne hardware, in the very section that discusses relays. The same phrase appears at line 193 ('flies WP-B2 instrumentation and beacon nodes'). Both must go. The controlled vocabulary is relay = stratospher
**Replace with:** At 40–90 kg, Zephyr (5 kg) and PHASA-35 (15 kg) are eliminated as Era I power-relay carriers. They carry instrumentation, beacon transceivers, and WP-B2 jitter campaigns.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:520
**Current:** **Comparator.** The voltage-appropriate comparator (132 kV backbone + MV feeders + substations to the same 17 sites, at the thesis's §II unit costs) is roughly **$82–140M**: the corridor's initial capital is ~1.5–2.5× cheaper at the three-station drawing.
**Why:** The ratio is derived from the stale $54M total. Against the rebuilt $68.4M the comparator range $82–140M gives 1.2–2.0×. Printing 2.5× against a capital number a reader can rebuild to $68.4M is exactly the kind of claim that failed the citation audit. The honest version is still a win and survives challenge.
**Replace with:** **Comparator.** The voltage-appropriate comparator (132 kV backbone + MV feeders + substations to the same 17 sites, at the thesis's §II unit costs) is roughly **$82–140M**: the corridor's initial capital is ~1.2–2.0× cheaper at the three-station drawing.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:522
**Current:** The geometry of the two budgets differs more than their size does. The comparator's capital lies mostly in the backbone between the sites: 400 km at $100–280k/km sub-transmission rates is $40–112M, half to nine-tenths of the total, spent before a single feeder or meter is funded [alloc—decomposition at §II unit-cost classes]. The corridor's ~$54M concentrates at the endpoints instead, in the site-
**Why:** Carries the stale $54M total. The paragraph's argument is unaffected and in fact strengthened — the rebuilt $68.4M concentrates an even larger share at the endpoints.
**Replace with:** The geometry of the two budgets differs more than their size does. The comparator's capital lies mostly in the backbone between the sites: 400 km at $100–280k/km sub-transmission rates is $40–112M, half to nine-tenths of the total, spent before a single feeder or meter is funded [alloc—decomposition at §II unit-cost classes]. The corridor's ~$68M concentrates at the endpoints instead, in the site-and-feeder layer that connects households.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:541
**Current:** | Source energy (50% purchased at ~$0.02/kWh, priced through chain) | $1.9M |
**Why:** Scales off the stale 38.8 GWh (19.4 GWh purchased × ~$0.10/kWh delivered-equivalent = $1.9M). Against the corrected 53.1 GWh delivered, 50% purchased is 26.6 GWh × ~$0.10 = **$2.7M**. Understates cost by $0.8M/yr.
**Replace with:** | Source energy (50% of 53.1 GWh purchased at ~$0.02/kWh, priced through chain efficiency at ~$0.10/kWh delivered) | $2.7M |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:549
**Current:** Aquila earns **~20–25% unlevered against its $13.5M**, net of the fleet maintenance and attrition provisions above, and through the refleet cycle. It also books ~$3–5M of governed equipment margin at deployment, on the corridor's ~$37M of Aquila-content procurement (thesis C.4). That margin sits outside the IRRs stated here, and is worth roughly 7–8 points on the Aquila position if booked in [mode
**Why:** $37M of Aquila-content procurement = ground stations $25.5M + the stale $5M receiver line + the stale $6.5M conversion line. On the rebuilt stack it is $25.5M + $9.1M receivers + $11.7M electrical = ~$46M, so the governed 10–15% margin is ~$5–7M, not $3–5M. The Aquila IRR itself is unchanged in denominator ($13.5M) but its numerator flows from the corrected EBITDA and must be re-run with the opera
**Replace with:** Aquila's return is computed against its **$13.5M**, net of the fleet maintenance and attrition provisions above, and through the refleet cycle **[pending the same corridor-model re-run]**. It also books ~$5–7M of governed equipment margin at deployment, on the corridor's ~$46M of Aquila-content procurement (ground stations $25.5M + receiver articles $9.1M + electrical stack $11.7M; thesis C.4). That margin sits outside the IRRs and is worth roughly 7–8 points on the Aquila position if booked in [model-approx].

### /Users/billy_j/age-of-wonders/private/dossier-aquila/executive-memo.md:22
**Current:** Every piece of hardware at every layer is a manufactured unit: a laser die, a receiver cell, a battery pack. Each rides a cost curve that industries far larger than this one are already driving down. The cost of a delivered kilowatt-hour stops scaling with distance. It starts scaling with the semiconductor industry's appetite for volume.
**Why:** The memo names the manufactured-unit thesis but never names the fixed article, and so omits the strongest argument in the finalised architecture — the one an investor will otherwise raise as an objection. Because every receiver is fully populated and can absorb a full panel at full power, panel-hours are fungible across the corridor; a demand-matched receiver would strand transmit capacity at ever
**Replace with:** Every piece of hardware at every layer is a manufactured unit: a laser die, a receiver cell, a battery pack. Each rides a cost curve that industries far larger than this one are already driving down. The receiver is one article, fixed and fully populated, delivering **541 kilowatts** — sites scale by how many they take, never by resizing the article. That is not standardisation for its own sake. Because every receiver can absorb a full panel at full power, transmit hours become fungible across the corridor: **$2.45 million** of receiver buys **$11 million** of transmit capacity that a demand-matched site would strand. The cost of a delivered kilowatt-hour stops scaling with distance. It star

### /Users/billy_j/age-of-wonders/private/dossier-aquila/executive-memo.md:30
**Current:** Four gates. Twelve years. **$2.9 billion**, committed at programme level and drawn only as demonstrations retire the risk they were priced against.
**Why:** The programme is four technical gates PLUS the demand gate (Gate D), as the booklet correctly states at line 70 ("Four technical gates plus a demand gate"). The memo drops Gate D entirely. The two documents travel together and give different gate counts. Gate D is not decorative — it is two-limbed (D-1 brownfield: CF >=40% against installed nameplate + collection >=85%; D-2 greenfield: CF >=25% ag
**Replace with:** Four technical gates and a demand gate. Twelve years. **$2.9 billion**, committed at programme level and drawn only as demonstrations retire the risk they were priced against.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/executive-memo.md:32
**Current:** while the probability of a positive outcome stops falling at **12 per cent**, because that is simply the probability all four gates pass.
**Why:** Same gate-count defect, and here it is load-bearing on a number. The 12 per cent floor is asserted to BE the joint pass probability of "all four gates" — but the programme has four technical gates and a demand gate, and Gate D is a live failure mode (a single-limb Gate D measured against nameplate fires at every greenfield village by construction — 10.5% CF in year 1 — and costs ~$2.2B of P90). A 
**Replace with:** while the probability of a positive outcome stops falling at **12 per cent**, because that is simply the probability the four technical gates pass.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:192
**Current:** Behind it sits a lithium-iron-phosphate buffer of two to four megawatt-hours per megawatt and a grid-forming inverter stack that establishes voltage and frequency autonomously, emulating the inertia of a synchronous machine.
**Why:** 'Per megawatt' sizes the battery against receiver nameplate. The architecture sizes the surrounding electrical to METERED DEMAND, with the greenfield battery sized to the beam slice (~344 kW surplus over ~4 h ⇒ ~1.4 MWh usable). Sizing to nameplate over-builds the feeder head and mis-builds the village.
**Replace with:** Behind it sits a lithium-iron-phosphate buffer — sized to metered demand at a feeder head, and to the beam slice (the surplus between the article's 541 kW and the day-one load, ~1.4 MWh usable at a greenfield village) — and a grid-forming inverter stack that establishes voltage and frequency autonomously, emulating the inertia of a synchronous machine.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:196
**Current:** The receiver is the anchor of the architecture's economics. The full conversion surface for a megawatt, enough for a town of five thousand at developed-economy household consumption, is one to two square metres of semiconductor. A dinner table, under a beam of light.
**Why:** 'The full conversion surface for a megawatt' conflates delivered and optical power and contradicts the fixed article. The 1–2 m² cell plane corresponds to ~1 MW *optical* at the cell plane, which is 541 kW *delivered* — the Era II article. Stated as a megawatt delivered, the image is 1.8× off and the receiver cost line moves with it.
**Replace with:** The receiver is the anchor of the architecture's economics. The full conversion surface of one article — 541 kilowatts delivered, one PCSEL panel, enough for a town of three thousand at developed-economy household consumption — is one to two square metres of semiconductor. A dinner table, under a beam of light.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:327
**Current:** Beneath the optical layer sits the buffer: two to four megawatt-hours of LFP per megawatt of site capacity, sized for hours-class cloud events, with the community's existing backup generator retained, its duty inverted from primary supply to a 200-to-400-hour-per-year tail-event bridge.
**Why:** 'Per megawatt of site capacity' is nameplate-referenced sizing, which the architecture explicitly rejects for the surrounding electrical. Battery is sized to metered demand (feeder head) or the beam slice (greenfield), never to receiver nameplate.
**Replace with:** Beneath the optical layer sits the buffer: LFP sized to metered demand for hours-class cloud events (two to four megawatt-hours per megawatt of *load*, not of receiver nameplate), and at greenfield sites to the beam slice as well, with the community's existing backup generator retained, its duty inverted from primary supply to a 200-to-400-hour-per-year tail-event bridge.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:711
**Current:** It takes two fully-populated receivers on the day it is commissioned, and it delivers at roughly **$0.36 per kilowatt-hour on billed energy**, sold at **$0.26 to $0.30** against an incumbent bill of $0.28 to $1.10.
**Why:** 'roughly $0.36' is a third variant of the feeder-head LCOE inside the same section (see $0.359 at line 719, $0.365 at line 721). The finalised figure is $0.359 and it should be stated to its full precision, because it is the number F29's ≥$0.26 floor and the 0.8-per-cent standardisation premium are both computed against.
**Replace with:** It takes two fully-populated receivers on the day it is commissioned, and it delivers at **$0.359 per kilowatt-hour on billed energy**, sold at **$0.26 to $0.30** against an incumbent bill of $0.28 to $1.10.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:715
**Current:** The mechanism runs in both directions. A Band A feeder that misses its committed level for seven consecutive days is downgraded automatically. A feeder that delivers twenty hours across a two-week window is re-banded upward by order: in May 2025 the Commission approved exactly that, upgrading feeders to Band A on fourteen days of measured supply **[Validated precedent]**.
**Why:** 'The mechanism runs in both directions' overstates the symmetry, and 're-banded upward by order' implies automaticity. Downward re-banding is automatic; upward requires the DisCo to FILE, requires smart meters on the feeder, and requires NERC approval. The two limits do appear at line 717, but the claim as written is the one a reader carries away, and it is the claim that would fail diligence.
**Replace with:** The mechanism runs in both directions, but not symmetrically. A Band A feeder that misses its committed level for seven consecutive days is downgraded **automatically**. Upward re-banding is not automatic: the distribution company must file it, the feeder must be smart-metered, and the Commission must approve. It does happen — in May 2025 the Commission approved exactly that, upgrading feeders to Band A on fourteen days of measured supply **[Validated precedent]**.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:721
**Current:** At a fifteen per cent non-technical loss the feeder-head site delivers at **$0.365 per kilowatt-hour on billed energy**, against an incumbent between $0.28 and $1.10. The margin survives the haircut. The number is stated after it, not before.
**Why:** §VIII now prints three different feeder-head billed LCOEs within twelve lines: $0.36 (line 711), $0.359 (line 719), and $0.365 (here). The finalised figure is $0.359 billed. A reader rebuilding the feeder-head case cannot tell which is the number, and the paragraph's own claim ('the number is stated after it, not before') makes the inconsistency load-bearing.
**Replace with:** At a fifteen per cent non-technical loss the feeder-head site delivers at **$0.359 per kilowatt-hour on billed energy**, against an incumbent between $0.28 and $1.10, and it is sold at $0.26 to $0.30. The margin survives the haircut. The number is stated after it, not before.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:753
**Current:** **Era III: grid-competitive at per-site power scale.** The relay platform's cost is roughly power-independent (a mirror does not care how many watts it redirects), so Aquila's fleet capital per delivered watt collapses as per-relay throughput scales: at 1 MW per site the fleet is $2M per MW, but at 10 MW per site it is $0.2M per MW.
**Why:** '1 MW per site' and '10 MW per site' are the old nameplate ladder. The articles are 541 kW and 5.41 MW. A reader rebuilding fleet capital per delivered watt from the printed site scales will land 1.85× off at Era II. The ten-to-one ratio survives; the absolute numbers do not.
**Replace with:** **Era III: grid-competitive at per-site power scale.** The relay platform's cost is roughly power-independent (a mirror does not care how many watts it redirects), so Aquila's fleet capital per delivered watt collapses as per-relay throughput scales: at one Era II article per site (541 kW) the fleet is ~$3.7M per MW, and at one Era III article per site (5.41 MW) it is ~$0.37M per MW — the same ten-to-one collapse, on the articles the network actually ships.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:799
**Current:** Serving one billion people at the energy-abundance envelope of 1,500 kilowatt-hours per person per year requires roughly 1,500 terawatt-hours annually: 171 gigawatts average, ~285 gigawatts of delivered capacity at design capacity factors. At Era III site scale that is approximately 29,000 ten-megawatt community and industrial sites, served by a relay fleet in the 30,000-airframe class.
**Why:** The Era III receiver is 5.41 MW, not 10 MW. A 'ten-megawatt site' is two articles, which the text does not say, so the site count cannot be rebuilt: 285 GW ÷ 5.41 MW = ~52,700 receivers, and only if sites average two racks does 29,000 sites hold. The mission arithmetic — the headline the whole $0.7–1.8T ground-stack figure rests on — is unrebuildable as printed.
**Replace with:** Serving one billion people at the energy-abundance envelope of 1,500 kilowatt-hours per person per year requires roughly 1,500 terawatt-hours annually: 171 gigawatts average, ~285 gigawatts of delivered capacity at design capacity factors. The Era III article is 5.41 megawatts (one rack of nineteen megawatts optical), so that is approximately **52,700 receivers** across roughly **29,000 sites** averaging two racks each, served by a relay fleet in the 30,000-airframe class.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:1304
**Current:** | Community conversion stack (1 MW site) |—| $1.19–2.19 | $0.93–1.56 |
| **Full stack to a community bus** | **—** | **~$5.9–6.9** | **~$2.5–3.2** |
**Why:** The B.1 build-up prices the community stack per MW of site nameplate, in $/W. Under the finalised architecture site cost is F + v_r·P_aperture + v_e·P_demand, and the fixed layer never appears in a $/W table. A reader rebuilding a 200 kW village from this row gets a number that omits the $300k fixed layer entirely — 44 per cent of the site.
**Replace with:** | Community electrical stack, per watt of **metered demand** (v_e) |—| ~$1.20 | ~$0.95 |
| Fixed layer per site (F), independent of silicon |—| ~$300k | ~$300k |
| **Full stack to a community bus** | **—** | **F + v_r·P_aperture + v_e·P_demand** (see §VIII; the crossover P* = F/v is 158 kW) | **as above at Era III rates** |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:1359
**Current:** Plus Era I service revenue ($10M 2028 → $250M/yr mid-2030s, 40% margin). Fleet, site, and mission arithmetic: 1B people × 1,500 kWh = 1,500 TWh/yr = 171 GW average = ~285 GW capacity at 60% CF = ~29,000 × 10 MW sites ≈ 30–35k airframes (global airliner fleet: ~28,000).
**Why:** Same defect in the appendix the body's mission arithmetic is checked against: '~29,000 × 10 MW sites' does not divide by the 5.41 MW Era III article. The receiver count is 52,700; the site count only holds at two racks per site.
**Replace with:** Plus Era I service revenue ($10M 2028 → $250M/yr mid-2030s, 40% margin). Fleet, site, and mission arithmetic: 1B people × 1,500 kWh = 1,500 TWh/yr = 171 GW average = ~285 GW capacity at 60% CF = **~52,700 × 5.41 MW receivers ≈ ~29,000 sites at two racks each** ≈ 30–35k airframes (global airliner fleet: ~28,000).

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:1554
**Current:** | T3 | 2031–34 | ~$500M | PCSEL panel gate (P2); beam-powered relay prototype (R1–R2); first 1 MW community sites | **G3: 1.9 MW panel + 25 km beam-powered relay** | 0.65 |
**Why:** 'first 1 MW community sites' is the retired nameplate. What T3 buys is the first fixed 541 kW receiver articles. The tranche-and-gate ladder is the table an LP signs against; the deliverable must name the article it actually funds.
**Replace with:** | T3 | 2031–34 | ~$500M | PCSEL panel gate (P2); beam-powered relay prototype (R1–R2); **first 541 kW community receiver articles** | **G3: 1.9 MW panel + 25 km beam-powered relay** | 0.65 |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:1669
**Current:** | F15 | Demand gate (gate D) | **D-1 (brownfield/feeder-head):** capacity factor **<40% against installed nameplate** within 12 months of energisation. **D-2 (greenfield):** capacity factor **<25% against demand-matched reference capacity**, or year-two delivered energy **<700 MWh/site**, or year-on-year energy growth **<10%**. Either limb, or collection **<85%**, or collection **<85%** at the fir
**Why:** The D-1/D-2 split is correct, but the closing clause duplicates 'or collection <85%' and is unparseable as a falsifier condition. A falsifier register whose firing condition cannot be read is not a falsifier.
**Replace with:** | F15 | Demand gate (gate D) | **D-1 (brownfield/feeder-head):** capacity factor **<40% against installed nameplate** within 12 months of energisation. **D-2 (greenfield):** capacity factor **<25% against demand-matched reference capacity**, or year-two delivered energy **<700 MWh/site**, or year-on-year energy growth **<10%**. Fires on either limb, or on collection **<85%** at the first operating sites, by **2035** | 2035 | Community-scale T4 portion does not draw; model reverts to anchor-only service; mission envelope re-dated |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:1689
**Current:** Prediction register (the affirmative bets, dated): G1 perpetual flight by **Q1 2027**; first sovereign service revenue by **2028**; first anchor corridor cash-flowing by **2030**; 1 kW PCSEL die by **2029**; 1.9 MW panel by **2033**; first 1 MW community site by **2033**; 100M people in reach by **2040**.
**Why:** 'first 1 MW community site' is the retired nameplate. The dated affirmative bet must be against the article the programme ships: the 541 kW fixed receiver.
**Replace with:** Prediction register (the affirmative bets, dated): G1 perpetual flight by **Q1 2027**; first sovereign service revenue by **2028**; first anchor corridor cash-flowing by **2030**; 1 kW PCSEL die by **2029**; 1.9 MW panel by **2033**; **first 541 kW community receiver article energised by 2033**; 100M people in reach by **2040**.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:1873
**Current:** Each corridor is scored 1–5 on four factors, and the composite is their product, to a maximum of 625:
**Why:** Six factors are then listed (A, C, R, B, I, P) but the composite is 5^4 = 625 and the F.3 table carries only four columns (A, C, R, P). A reader cannot rebuild Chile's 400 (4×5×4×5) from a six-factor product. B (brownfield) and I (tariff instrument) are screens, not scored factors — which is what the B bullet itself says ('a screening criterion, not a bonus') — and the method paragraph must say so
**Replace with:** Each corridor is scored 1–5 on **four** factors — A, C, R and P — and the composite is their product, to a maximum of 625. **B (brownfield status) and I (tariff instrument) are screens, not scored factors**: a corridor that fails either does not enter the composite at all. All six are defined below:

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:1882
**Current:** The product form is deliberate. The system needs all four conditions simultaneously, so a corridor with one failing factor is not a discounted opportunity. It is not yet an opportunity.
**Why:** Consistent with a four-factor composite but not with the six bullets printed above it, and the sentence lands immediately after the B and I bullets, so it reads as if B and I are two of the four. The screens must be named as gates, not as members of the product.
**Replace with:** The product form is deliberate. The system needs all four scored conditions simultaneously, so a corridor with one failing factor is not a discounted opportunity. It is not yet an opportunity. And the two screens sit upstream of the product: a corridor with no in-force ≥$0.26/kWh instrument carries anchors and no community layer, whatever it scores.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:2486
**Current:** **The challenge, at its strongest.** "The node assumed 64× measured African rural consumption, immediately, at $60/household/month against measured ARPU of $2–8. Mini-grids die of exactly this. No gate, tranche, or sensitivity stressed demand volume. The architecture that 'never spends tomorrow's capital on yesterday's assumption' spent T4's $2.2B on an unmeasured demand assumption."
**Why:** The word 'node' is retired across the package — it was overloaded across the stratospheric platform and the ground delivery point, which is exactly the ambiguity that produced the site-cost modelling defect. The challenge register must state the challenge in the current nomenclature or a reader cannot map it onto the architecture it is challenging.
**Replace with:** **The challenge, at its strongest.** "The site assumed 64× measured African rural consumption, immediately, at $60/household/month against measured ARPU of $2–8. Mini-grids die of exactly this. No gate, tranche, or sensitivity stressed demand volume. The architecture that 'never spends tomorrow's capital on yesterday's assumption' spent T4's $2.2B on an unmeasured demand assumption."

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:2608
**Current:** | **Receiver / site** | Anchor-variant receivers (5–25 kW); OPC life-test rigs | Anchor fleet at corridor volume; $5/W cell pricing | First 1 MW community sites; container line pilot | Receiver-article production 500–1,000/yr, regionalised | 2,000–5,000/yr |
**Why:** 'First 1 MW community sites' in the workstream register is the retired nameplate; the article is 541 kW. The same row correctly says 'Receiver-article production' one column later, so the register contradicts itself.
**Replace with:** | **Receiver / site** | Anchor-variant receivers (5–25 kW); OPC life-test rigs | Anchor fleet at corridor volume; $5/W cell pricing | **First 541 kW community receiver articles**; container line pilot | Receiver-article production 500–1,000/yr, regionalised | 2,000–5,000/yr |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:2665
**Current:** *Priced by:* the anchor-tenant sequencing, in which towers, mines, and sovereign contracts (payers with CFOs) carry the network's economics; community delivery prices at Era II costs, not Era I; modular sites track demand instead of betting on it (RR9, gate D); and the productive-use causal record is mixed (Appendix J.5 carries both sides), which is why the corridor model is anchor-first and the c
**Why:** 'modular sites track demand instead of betting on it' is the rejected cassette framing. Under the finalised architecture the receiver deliberately DOES bet ahead of demand at a greenfield village — that over-build is the design decision, paid for and justified by transmit fungibility. RR5 currently sells the opposite claim.
**Replace with:** *Priced by:* the anchor-tenant sequencing, in which towers, mines, and sovereign contracts (payers with CFOs) carry the network's economics; community delivery prices at Era II costs, not Era I; **brownfield-first siting**, so that sites are placed where the load already is and the article fills on day one, with the greenfield over-build accepted deliberately and priced (RR9, gate D); and the productive-use causal record is mixed (Appendix J.5 carries both sides), which is why the corridor model is anchor-first and the community ramp is gated rather than assumed.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/package/booklet-pre-nda.md:32
**Current:** A ground station converts power into a coherent beam at **1080 nanometres**. Relays in the stratosphere, at **20 to 35 kilometres**, above weather and above aviation, pass it **300 kilometres** at a time, losing one to eight per cent per hop.
**Why:** The booklet prints per-hop loss (1–8%) and cell efficiency (55%, line 53) but never prints the chain constant. A reader cannot rebuild any delivered figure — 541 kW from a 1.9 MW optical panel, or 5.41 MW from a 19 MW rack — without **3.509 optical watts per delivered watt**. Given the corrected receiver figures being introduced above, the shareable document should carry the one constant that lets
**Replace with:** A ground station converts power into a coherent beam at **1080 nanometres**. Relays in the stratosphere, at **20 to 35 kilometres**, above weather and above aviation, pass it **300 kilometres** at a time, losing one to eight per cent per hop. End to end, the chain costs **3.509 optical watts per delivered watt**: a 1.9-megawatt optical panel lands 541 kilowatts on the ground.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/package/booklet-pre-nda.md:88
**Current:** The pipeline is 46 candidate corridors led by the arid belt: Chile's Atacama, Saudi Arabia's NEOM corridor, the Western Australian Goldfields, Kenya's Marsabit, Oman's Al Wusta. Sunlight is abundant there, terrain defeats the wire, and anchor demand is fixed, clustered, and contract-grade.
**Why:** Stale siting framing. Brownfield-first is now the BASE CASE, not an upside: 23 of the 46 corridors carry existing nominal-but-dead distribution holding **79 per cent** of the addressable population, and the priority site class is the feeder-head (existing MV feeder aggregating 13,000–26,000 people, ~1 MW day-one load, no distribution build, CF ~50%). The booklet leads the pipeline entirely on gree
**Replace with:** The pipeline is 46 candidate corridors. The base case is brownfield: **23 of the 46** carry existing distribution that is nominal but dead, holding **79 per cent** of the addressable population. The priority site is the feeder head — an existing medium-voltage feeder aggregating 13,000 to 26,000 people, roughly a megawatt of load on day one, no distribution to build. Beside it runs the arid belt: Chile's Atacama, Saudi Arabia's NEOM corridor, the Western Australian Goldfields, Kenya's Marsabit, Oman's Al Wusta. Sunlight is abundant there, terrain defeats the wire, and anchor demand is fixed, clustered, and contract-grade.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/sim/econ_model.py:16
**Current:** STRUCTURE (declared in full — this is the part Appendix C previously left implicit)
**Why:** The structure is NOT declared in full, and the gap is the argument the package most needs. Nothing in this model carries an idle-aperture term, so F31 — the falsifier that fires if idle-aperture cost exceeds $0.03/kWh by 2035, or greenfield exceeds 40% of community capacity by 2034 — cannot be tested from the artefact of record. Nor can the case FOR the fixed article: because every receiver absorb
**Replace with:** STRUCTURE (declared in full — this is the part Appendix C previously left implicit)

  NOT YET IN THIS MODEL — declared so the omission is not mistaken for a result:
    - Idle aperture. The receiver is a fixed, fully-populated 541 kW article; greenfield
      villages ramp into it from a ~200 kW day-one load. The idle-aperture cost (~$241k
      NPV per village) and the ramp NPV it buys ($0.45M-$2.04M per village) are BOTH
      outside these flows. F31's $0.03/kWh idle-aperture falsifier cannot be tested here.
    - Panel-hour fungibility. Because every receiver absorbs a full panel at full power,
      panel-hours are fungible across the corridor. A demand-matched receiver strands
      t

### /Users/billy_j/age-of-wonders/private/dossier-aquila/sim/econ_model.py:113
**Current:**         tar = rnd.uniform(0.7, 1.1)
**Why:** The tariff multiplier has no declared base anywhere in the file, so the most consequential revenue assumption in the programme valuation cannot be rebuilt. It matters more now: the community layer is sold at MEASURED willingness-to-pay ($0.26-0.30/kWh against an incumbent bill of $0.28-$1.10), not at the regulated Nigeria Band A figure of $0.15/kWh, and the feeder-head LCOE is $0.359/kWh (the old 
**Replace with:**         # Tariff multiplier over the DECLARED BASE: $0.28/kWh, the midpoint of the
        # measured willingness-to-pay band ($0.26-0.30) at which the community layer is
        # sold — NOT the regulated Nigeria Band A figure ($0.15/kWh), which is what the
        # DisCo is paid and is not the revenue instrument. Floor 0.7x = $0.196/kWh, BELOW
        # the $0.359/kWh feeder-head LCOE: those draws are loss-making by construction,
        # and are the F29/F30 tail this band exists to price.
        tar = rnd.uniform(0.7, 1.1)

### /Users/billy_j/age-of-wonders/private/dossier-aquila/sim/equipment_stream.py:4
**Current:** Prices the ground-hardware equipment stream (transmitter, receiver, node
integration — the Aquila-content share of every corridor SPV's procurement)
at a governed margin, as an ADDITIVE line on top of the Appendix C valuation.
**Why:** PARTIALLY CONFIRMED, DOWNGRADED, AND THE PROPOSED FIX IS WRONG. (1) Mis-lined: the text is at line 4, not line 3 (the docstring opens at line 2); it is otherwise quoted accurately. (2) The nomenclature point is genuine — 'node' is retired (relay = stratospheric platform; site = ground delivery point; receiver = the manufactured article) and it survives twice, here and again at line 16 ('transmitte
**Replace with:** Prices the ground-hardware equipment stream (transmitter, receiver, site
integration — the Aquila-content share of every corridor SPV's procurement)
at a governed margin, as an ADDITIVE line on top of the Appendix C valuation.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/sim/equipment_stream.py:11
**Current:**   A1. Capacity additions derive from the B.4 TWh anchors, geometric
      interpolation between anchors (C.2 convention), converted at
      285 GW / 1,500 TWh = 0.19 GW per TWh/yr (mission arithmetic).
**Why:** VERIFIED PRESENT, but the auditor mis-lined and mis-diagnosed it. The A1 block runs lines 11-13 (the 285 GW figure is on line 13, not 12). The defect is REAL: GW_PER_TWH = 285/1500 = 0.19 GW per TWh/yr embeds a fleet capacity factor of 1500e12 / (285e9 x 8760) = 60.1%, and no site class in the finalised architecture attains it (feeder-head ~50%, greenfield 10.5% in year 1, Gate D-1 only demands >=
**Replace with:**   A1. Capacity additions derive from the B.4 TWh anchors, geometric
      interpolation between anchors (C.2 convention), converted to INSTALLED
      NAMEPLATE. The receiver is a fixed, fully-populated article: nameplate
      is set by the article, not by the load, so the GW installed per TWh/yr
      delivered is set by the fleet capacity factor. Carried at the
      feeder-head base case (79% of addressable population, CF ~50%;
      greenfield villages ramp into their article from 10.5% CF in year 1):
      1 TWh/yr = 1 / (0.50 x 8.760) = 0.2283 GW nameplate.
      The prior 285 GW / 1,500 TWh = 0.19 GW per TWh/yr basis is SUPERSEDED:
      it carried the mission-arithmetic 60% fleet CF

### /Users/billy_j/age-of-wonders/private/dossier-aquila/sim/equipment_stream.py:77
**Current:**         if y > 2050:                                  # A5 quasi-terminal
            marg = rows[-1][4]
**Why:** Produces a printed row a reader cannot rebuild. RUN OUTPUT, founder prior, year 2055: '+TWh 0.0 | +GW 0.00 | content$B 0.00 | margin$B 4.98'. Margin is 15% of content, so a reader who multiplies the printed content ($0.00B) by the printed margin rate gets $0.00B, not $4.98B. The quasi-terminal hold is correct modelling, but it is invisible in the table, and the 2051-55 tail is a material share of 
**Replace with:**         if y > 2050:                                  # A5 quasi-terminal: flows 2051-55
            marg = rows[-1][4]                        # held FLAT at the 2050 margin, and
            rev = marg / margin(2050)                 # the implied content is back-solved
                                                      # so the printed row still reconciles:
                                                      # margin = content x margin-rate.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/sim/hostile_stacked.py:10
**Current:** Validation target (printed): P(NPV>0)=18.5%; branch freq 11.7/10.1/23.1/32.5/22.6;
branch median NPV +2.93 / -0.41 / -0.18 / -0.02 / -0.03 ($B); median LGF ~$40M.
**Why:** CONFIRMED STALE, BUT DOWNGRADED FROM BLOCKER — the auditor is right on the arithmetic and wrong on the framing, and their fix is incomplete. (a) Verified: econ_model.py at its declared default (hostile prior, N=20,000, seed 7) prints freq 11.8/9.7/24.2/32.6/21.6, median NPV +2.89/-0.46/-0.19/-0.02/-0.02 ($B), median LGF $31M. P(NPV>0)=18.5% DOES reproduce exactly. So every figure except 18.5% is s
**Replace with:** Validation target (printed): P(NPV>0)=18.5%; branch freq 11.8/9.7/24.2/32.6/21.6;
branch median NPV +2.89 / -0.46 / -0.19 / -0.02 / -0.02 ($B); median LGF ~$31M.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/sim/network_sim.py:37
**Current:** * Node model — hourly state-of-charge dynamics on the corridor bus, per-QoS
  dispatch: anchor-firm (flat) served first, community (diurnal profile)
  best-effort, buffer charges on link headroom, genset backstops the firm
  class only. All power in per-unit of corridor bus capacity.
**Why:** 'node' is retired — it was overloaded across the relay and the ground delivery point, which is exactly the ambiguity this file must avoid, since it simulates both. Nomenclature is now: relay = stratospheric platform; site = ground delivery point; receiver = the manufactured article. 'per-unit of corridor bus capacity' also fails to say WHICH capacity, now that nameplate (the fixed article) and dem
**Replace with:** * Site model — hourly state-of-charge dynamics on the corridor bus at the ground
  delivery point, per-QoS dispatch: anchor-firm (flat) served first, community
  (diurnal profile) best-effort, buffer charges on link headroom, genset backstops
  the firm class only. All power in per-unit of RECEIVER NAMEPLATE (the fixed,
  fully-populated article), not of demand — the two are deliberately different.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/sim/network_sim.py:104
**Current:** # Fleet-era parameters (hours).  Sources: blueprint §5, §10.2, §10A.1;
# investment thesis §VII; hardened planning bases.
**Why:** Cites §10A.1 as a source. §10A.1's nominal-capacity figure is a known defect — it counted anchor DEMAND as nameplate; the true nameplate is 13.06 MW (24 fully-populated articles). A model that sources its planning bases from a section flagged for correction inherits the error and hands the reader a broken citation trail.
**Replace with:** # Fleet-era parameters (hours).  Sources: blueprint §5, §10.2, §10A.1 (nameplate per
# §10A.1 as CORRECTED: 24 fully-populated articles = 13.06 MW, NOT the superseded
# demand-as-nameplate figure); investment thesis §VII; hardened planning bases.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/sim/network_sim.py:383
**Current:** # ---------------------------------------------------------------------------
# Node dispatch
# ---------------------------------------------------------------------------
def dispatch(joint, rcov, topo, cfg):
**Why:** Retired nomenclature. 'node' was overloaded across relay and site and has been withdrawn from the architecture. This section dispatches power at the ground delivery point, which is a SITE.
**Replace with:** # ---------------------------------------------------------------------------
# Site dispatch (ground delivery point)
# ---------------------------------------------------------------------------
def dispatch(joint, rcov, topo, cfg):

### /Users/billy_j/age-of-wonders/private/dossier-aquila/sim/network_sim.py:582
**Current:**         for buf in (1.0, 2.0, 4.0):
**Why:** The Table NO-2 buffer sweep does not contain the design point. The beam-slice rule fixes the greenfield battery at ~1.4 MWh usable on the 541 kW article = 2.6 MWh/MW of nameplate. The sweep runs 1.0 / 2.0 / 4.0, so the sized-to-rule case is never simulated and the reader is left to interpolate; two of the three rungs sit below the rule.
**Replace with:**         for buf in (1.0, 2.6, 4.0):        # 2.6 MWh/MW = the beam-slice design point

### /Users/billy_j/age-of-wonders/private/dossier-aquila/sim/network_sim.py:633
**Current:**     print("Reference-corridor geometry, F18-compliant 3-ingress siting,")
    print("2 relay stations, buffer 2 MWh/MW, corridor-pooled spares.")
**Why:** The buffer is under-sized against the finalised battery rule. On a greenfield site the battery must be sized to the BEAM SLICE — article power minus load, ~344 kW of surplus over a ~4 h window => ~1.4 MWh usable — not to load. Against the 541 kW article that is 1.4 / 0.541 = 2.6 MWh/MW of nameplate. The carried default of 2.0 MWh/MW sizes below the beam slice, which is the ~$40-60k/site under-sizi
**Replace with:**     print("Reference-corridor geometry, F18-compliant 3-ingress siting, 2 relay stations,")
    print("buffer 2.6 MWh/MW of RECEIVER NAMEPLATE — sized to the BEAM SLICE (article power")
    print("minus load, ~344 kW surplus over a ~4 h window => ~1.4 MWh usable on the 541 kW")
    print("article), NOT to load. Corridor-pooled spares.")

### /Users/billy_j/age-of-wonders/private/dossier-aquila/sim/network_sim.py:646
**Current:**             cfg = dict(cid=cid, clim="reference", ingress=3, stations=2,
                       per_station=nps, era=era, beam=beam, topo="dist2",
                       buffer=2.0, firm=0.50, comm_peak=0.35, genset=0.55)
**Why:** Table NO-4's fleet-sizing decision (N+0 vs N+1 vs N+2) — the most capital-consequential output in this file — is taken against the demand-matched load shape (firm 0.50 + community peak 0.35 = 0.85 pu against a 1.0 pu bus) and a 2.0 MWh/MW buffer. Both are superseded: the receiver is the fixed 541 kW article, greenfield day-one load is ~0.37 pu of it, and the buffer is sized to the beam slice at 2.
**Replace with:**             cfg = dict(cid=cid, clim="reference", ingress=3, stations=2,
                       per_station=nps, era=era, beam=beam, topo="dist2",
                       buffer=2.6, firm=0.18, comm_peak=0.19, genset=0.20)

### /Users/billy_j/age-of-wonders/private/dossier-aquila/site.content.json:193
**Current:**           "kicker": "Fleet, corridor and availability Monte Carlo — Design Review, Network Operations.",
          "cli": "python3 network_sim.py --table all --trials 200 --seed 7"
**Why:** Confirmed present (at lines 193-194, not 192) and genuinely defective, but NOT a BLOCKER and not a contradiction of the finalised architecture — that spec is silent on station availability, and the package already exposes the assumption in design-network-operations.md N12 / review-network.html. The real defect: this is the command the dossier tells an advisor to run, and it leaves AQ_STATION_AVAIL
**Replace with:**           "kicker": "Fleet, corridor and availability Monte Carlo — Design Review, Network Operations. On-station payload availability is priced at 0.99, which takes the Era III backbone trunk from 99.5% to 96.5%; set AQ_STATION_AVAIL=1.0 to reproduce the pre-2026-07-13 runs that omitted it.",
          "cli": "AQ_STATION_AVAIL=0.99 python3 network_sim.py --table all --trials 200 --seed 7"


## LOW

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-haps-relay.md:41
**Current:** | V6 | Radiator net 0.8–1.0 kW/m² two-sided | **Verified at T_r ≈ 350 K**. Stefan-Boltzmann arithmetic reproduces the band. The hidden coupling: a 350 K radiator forces the flight-receiver cells to run hot, their conversion efficiency falls with temperature, and the corridor tap rises from 6.4 to ~6.8% | §3.2 |
**Why:** The verdict register states a point value (~6.8%) where the body (§3.2, hot-cell coupling) computes a range (~6.6–6.8%). The register is the part read without the body, so the two must agree.
**Replace with:** | V6 | Radiator net 0.8–1.0 kW/m² two-sided | **Verified at T_r ≈ 350 K**. Stefan-Boltzmann arithmetic reproduces the band. The hidden coupling: a 350 K radiator forces the flight-receiver cells to run hot, their conversion efficiency falls with temperature, and the corridor tap rises from 6.4% to ~6.6–6.8% | §3.2 |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-network-operations.md:47
**Current:** | N11 | Era III mesh beats point-to-point corridors | **Design-target**. The interchange toll is ~3.5% of through-flow per added backbone relay (99% relay throughput × ~2.5% station-keeping tap).
**Why:** The Era III station-keeping tap was recomputed to 2.4% in design-haps-relay §3.2 (verdict V9), which the companion document explicitly verifies. Carrying 2.5% here leaves two figures for the same quantity across the package.
**Replace with:** | N11 | Era III mesh beats point-to-point corridors | **Design-target**. The interchange toll is ~3.4% of through-flow per added backbone relay (99% relay throughput × 2.4% station-keeping tap, the recomputed figure of design-haps-relay V9).

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-network-operations.md:422
**Current:** The corridor becomes energy-profitable when loss-rate × hull-price falls below ~$0.5M/corridor-yr: 2%/transit at the $2M hull clears it threefold.
**Why:** "Threefold" does not rebuild. Scaling the printed 0.26 hulls/yr from 5% to 2% per transit gives 0.10 hulls/yr; at $2M that is $0.21M/yr, which clears the $0.5M threshold by ~2.4×, not 3×.
**Replace with:** The corridor becomes energy-profitable when loss-rate × hull-price falls below ~$0.5M/corridor-yr: at 2%/transit the 0.26 hulls/yr falls to ~0.10, and at the $2M hull that is ~$0.21M/yr, clearing the threshold by ~2.4×.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-network-operations.md:440
**Current:** The Philippine Small Power Utilities Group (SPUG) pays ₱20–62/kWh in Palawan [pub: thesis F].
**Why:** The package's incumbent-cost evidence is stated in USD everywhere else (Kano $0.28–0.33, PLN NTT $0.37–0.57, Somaliland $0.59–1.00) and the willingness-to-pay argument turns on the USD comparison. A peso figure with no FX cannot be rebuilt by a sovereign-fund reader, and the package has already failed a citation audit on exactly this class of unconverted figure (the Band A ₦/USD staleness).
**Replace with:** The Philippine Small Power Utilities Group (SPUG) pays ₱20–62/kWh in Palawan, $0.35–1.10/kWh at current FX [pub: thesis F].

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-pcsel-array.md:143
**Current:** | Optical output | 380 MW | [alloc] |
**Why:** The block tier never states its delivered equivalent, so the reader cannot close the transmit-to-receiver ledger: 380 MW / 3.509 = 108 MW delivered, served as 200 panels = 200 Era II articles (or 20 Era III articles). This is the arithmetic behind panel-hour fungibility across the corridor.
**Replace with:** | Optical output | 380 MW ⇒ 380/3.509 = **108 MW delivered**, quantised as 20 racks = 200 panels = **200 Era II receiver articles** (or 20 Era III articles). Because every receiver absorbs a full panel at full power, panel-hours are fungible across the corridor | [alloc]; chain 3.509 |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-pcsel-array.md:150
**Current:** | Cost | $400/kW Era II ⇒ $152M/block; $200/kW Era III ⇒ $76M/block | recomputed from era targets |
**Why:** The block cost is quoted per optical kW while the corridor model prices the transmitter at $2.00/W DELIVERED (the number the 541 kW optimality proof turns on: half-panel saves $0.76M of receiver and costs $11M of transmitter). Nothing printed lets a reader bridge $0.40/W-optical to $2.00/W-delivered. State the ×3.509 conversion and name the residual.
**Replace with:** | Cost | $400/kW-optical Era II ⇒ $152M/block; $200/kW-opt Era III ⇒ $76M/block. On the corridor's delivered basis (×3.509 optical W per delivered W) that is $1.40/W-delivered Era II and $0.70/W-delivered Era III at the station boundary; the corridor's $2.00/W-delivered transmit line is this plus relay and station overheads, which are booked outside this review | recomputed from era targets |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/design-receiver-thermal.md:160
**Current:** Emergent stray radiation ~10⁻⁵ of beam power [meas: Aquila]: ~10 W at 1 MW, a non-problem outside and a design confirmation for the Class 1 case.
**Why:** Same 1 MW basis error. On the article's ~1.08 MW incident it is ~11 W. Small, but the basis must be the article or the number cannot be rebuilt.
**Replace with:** Emergent stray radiation ~10⁻⁵ of beam power [meas: Aquila]: ~11 W at the article's ~1.08 MW incident, a non-problem outside and a design confirmation for the Class 1 case.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:70
**Current:** | LW-0.5 | Scalable to ≥285 GW delivered capacity (1B people at 1,500 kWh/person/yr) without architecture change | Mission arithmetic |
**Why:** Does not rebuild. 1e9 people × 1,500 kWh/yr = 1.5e12 kWh/yr ÷ 8,760 h = 171 GW average delivered. Reaching 285 GW of *capacity* requires a ~60% capacity-factor assumption that is printed nowhere. A citation auditor rebuilding 'mission arithmetic' from the two printed inputs gets 171, not 285.
**Replace with:** | LW-0.5 | Scalable to ≥285 GW installed delivered capacity — 1B people at 1,500 kWh/person/yr is 1.5 PWh/yr, i.e. 171 GW average, at a 60% corridor capacity factor — without architecture change | Mission arithmetic |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:193
**Current:** | AALTO Zephyr 8/T | 5 kg / 20 kg (T) | ~250 W–1 kW | 67-day record flight; UK CAA DOA; 2026 service entry target | **Eliminated as power-relay carrier**; flies WP-B2 instrumentation and beacon nodes |
**Why:** Second surviving instance of the retired word 'node' (see line 215). Same fix.
**Replace with:** | AALTO Zephyr 8/T | 5 kg / 20 kg (T) | ~250 W–1 kW | 67-day record flight; UK CAA DOA; 2026 service entry target | **Eliminated as power-relay carrier**; flies WP-B2 instrumentation and beacon transceivers |

### /Users/billy_j/age-of-wonders/private/dossier-aquila/engineering-blueprint.md:601
**Current:** Reserves policy: each WBS allocation carries its own subsystem-level contingency and the programme line holds the unallocated reserve.
**Why:** The §12 table labels the programme-management line '(≥15%)', but it is 7% of T2 ($10M of $140M) and 3% of T3 ($15M of $500M). The tranche column sums are correct (30 / 140 / 500 / 2,200 all tie), so the arithmetic defect is confined to the reserve label — but a reader who tests the one percentage printed in the table finds it false in two of four columns.
**Replace with:** Reserves policy: the ≥15% programme reserve is held across two lines — subsystem-level contingency inside each WBS allocation, plus the unallocated reserve on the programme-management line (the table's programme line is the unallocated portion only: 17% of T1, 7% of T2, 3% of T3, 9% of T4).

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:680
**Current:** The alternative we rejected was a 1 MW envelope populated progressively in silicon cassettes. It is cheaper on paper. It also requires a concentrating optic that changes as the array grows — the cell plane must hold 50 to 100 watts per square centimetre whatever area is populated — and a tiling that changes with it. That is a swappable-optics programme and a variable-flux qualification sitting on 
**Why:** Correct on the rejection, but the em dashes here are spaced (' — ') while the dossier's typographic convention is spaced em dashes and the canon's is closed. This is the one place the rejection is stated, and it should also name the flux qualification point explicitly, since 'qualified once at one flux point in the 50–100 W/cm² band' is the property that makes the fixed article certifiable at all.
**Replace with:** The alternative we rejected was a 1 MW envelope populated progressively in silicon cassettes. It is cheaper on paper. It also requires a concentrating optic that changes as the array grows — the cell plane must hold 50 to 100 watts per square centimetre whatever area is populated — and a tiling that changes with it. That is a swappable-optics programme and a variable-flux qualification sitting on the critical path of the thing we actually have to do, which is deploy. The fixed article is qualified **once, at one flux point inside the 50-to-100-watt band**, and never re-qualified. There is no swappable optic, no silicon cassette, and no partial population anywhere in the network. **We took th

### /Users/billy_j/age-of-wonders/private/dossier-aquila/investment-thesis.md:2458
**Current:** the blueprint baselines the payload at 40–90 kg with a dual-aperture ICD (Blueprint §5.1) and derives the platform set from it: Sunglider's flight-demonstrated 68–75 kg bus and the Sceye airship class (~250 kg) are the Era I carriers; Zephyr-class wings carry instrumentation and beacon nodes, not power optics.
**Why:** 'beacon nodes' uses the retired word. Under the finalised nomenclature there are three objects and three words — relay, site, receiver — and 'node' is flagged wherever it survives because it was overloaded across the platform and the ground point. Here it is being used for a third thing again.
**Replace with:** the blueprint baselines the payload at 40–90 kg with a dual-aperture ICD (Blueprint §5.1) and derives the platform set from it: Sunglider's flight-demonstrated 68–75 kg bus and the Sceye airship class (~250 kg) are the Era I carriers; Zephyr-class wings carry instrumentation and beacon payloads, not power optics.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/package/booklet-pre-nda.md:74
**Current:** The program is **$37 million** before beam-powered flight is proven; **$180 million** before corridors operate; **$680 million** before the megawatt laser panel exists; **$2.9 billion** only after megawatt links and beam-powered relays are proven.
**Why:** "program" is US spelling; the rest of the package and the house style are British ("programme" is used correctly at booklet lines 60, 62, 64 and 108). Wording only — but this is a shareable document going to sovereign readers, and the same sentence is the gate ladder they will quote.
**Replace with:** The programme is **$37 million** before beam-powered flight is proven; **$180 million** before corridors operate; **$680 million** before the megawatt laser panel exists; **$2.9 billion** only after megawatt links and beam-powered relays are proven.

### /Users/billy_j/age-of-wonders/private/dossier-aquila/sim/econ_model.py:41
**Current:**   Sampling     volume x median 0.55 (hostile) / 1.0 (founder); tariff 0.7-1.1x;
               FCF conversion 0.50-0.70 (hostile) / 0.72 (founder).
**Why:** 'tariff 0.7-1.1x' — of what? The base is never stated here or anywhere else in the file (see also L113). This is the docstring an advisor reads before running their own priors, and it hands them a multiplier with no multiplicand.
**Replace with:**   Sampling     volume x median 0.55 (hostile) / 1.0 (founder); tariff 0.7-1.1x of a
               $0.28/kWh base (midpoint of measured willingness-to-pay, $0.26-0.30 —
               NOT the $0.15/kWh regulated band, which is not the revenue instrument);
               FCF conversion 0.50-0.70 (hostile) / 0.72 (founder).

### /Users/billy_j/age-of-wonders/private/dossier-aquila/sim/network_sim.py:74
**Current:** #   reference  Blueprint §10A class (elevated semi-arid, sites 80 km apart):
**Why:** Uses 'sites' for INGRESS/transmit ground stations. Under the finalised nomenclature 'site' is reserved for the ground DELIVERY point (where the receiver stands); the transmit ground stations feeding the relay are a different article. This file uses 'site' in the ingress sense throughout (gen_cloud, joint_blocked, the '2 ingress / 3 ingress' labels) while also modelling delivery points — reintroduc
**Replace with:** #   reference  Blueprint §10A class (elevated semi-arid, INGRESS STATIONS 80 km apart
#              — 'ingress station', never 'site': 'site' is reserved for the ground
#              DELIVERY point where the receiver stands):

### /Users/billy_j/age-of-wonders/private/dossier-aquila/sim/network_sim.py:577
**Current:**     print("Era II beam-powered fleet, 2 relay stations, N+1 (3 hulls/station),")
    print("anchor firm 0.50 pu flat + community 0.35 pu evening peak, genset 0.55 pu.\n")
**Why:** AUDITOR WAS WRONG - downgraded from BLOCKER to LOW. The quoted text is at lines 577-578, not 576. network_sim.py is a network-operations availability Monte Carlo (weather episodes, relay fleet state machine, buffer SoC, genset backstop); it models no receiver article, no aperture, no capex. In dispatch() (lines 409-420) `cap` is derived purely from optical ingress AND relay coverage - it is LINK c
**Replace with:**     print("Era II beam-powered fleet, 2 relay stations, N+1 (3 hulls/station),")
    print("anchor firm 0.50 pu flat + community 0.35 pu evening peak, genset 0.55 pu.")
    print("pu = per unit of corridor LINK capacity (beam delivery through the relay),")
    print("not receiver nameplate. cap% is link availability, not a capacity factor.")
    print("Receiver-side CF (Gate D-1 vs nameplate, D-2 vs demand-matched reference)")
    print("is an economics quantity and is not modelled here.\n")

### /Users/billy_j/age-of-wonders/private/dossier-aquila/sim/network_sim.py:618
**Current:**         # Montane with beam-powered relay: the configuration F18 forbids
        ("montane BEAM 3ing", dict(clim="montane", ingress=3, stations=1,
         per_station=3, era="II", beam=True, topo="single", buffer=4.0,
         firm=0.20, comm_peak=0.55, genset=0.25)),
    ]
**Why:** FALSE BLOCKER — downgraded to LOW. The quoted text is genuinely at line 597, and Table NO-3 does omit a feeder-head row, but the auditor misread what the table is. network_sim.py models CORRIDOR availability, not site classes: there is no receiver, no nameplate, no capacity factor anywhere in it, and load enters only as firm/comm_peak/genset expressed in PER-UNIT of corridor bus capacity (docstrin
**Replace with:**         # Montane with beam-powered relay: the configuration F18 forbids
        ("montane BEAM 3ing", dict(clim="montane", ingress=3, stations=1,
         per_station=3, era="II", beam=True, topo="single", buffer=4.0,
         firm=0.20, comm_peak=0.55, genset=0.25)),
        # Brownfield feeder-head class (base-case siting): reference corridor,
        # community-dominated brownfield load on an existing MV feeder, Era II
        # beam relays, F18-compliant 3-ingress siting. Mean bus load ~0.54 pu
        # (firm 0.25 + community 0.65 x 0.44 mean-to-peak), the ~50% CF class.
        # Appended, with an explicit cid, so the six rows above keep cids
        # 200-205 and their published NO-2 reference rows.
        (\"brownfield_feederhead BEAM 3ing\", dict(clim=\"montane\", ingress=3, stations=1,
         per_station=3, era=\"II\", beam=True, topo=\"single\", buffer=4.0,
         firm=0.25, comm_peak=0.65, genset=0.25)),

---

## Re-verification — 16 July 2026 consistency fleet

The earlier closure list was superseded when the fixed article was separated into hardware, planning, and contracted bases. The governing Era II architecture is now:

- **Per article:** 788.055 kW hardware ceiling; 541.465 kW mean-planning output; 487.318 kW contracted output.
- **Reference corridor:** 22 articles across 16 sites; 17.337 MW hardware ceiling; 11.912 MW planning output; 10.721 MW contracted output; 8.549 MW day-one load.
- **Ingress estate:** 3 stations × 9 panels = 27 panels / 51.3 MW nominal optical installed; surviving-pair N-1 dispatch cap 31.8 MW optical / 3.509 = 9.0624 MW delivered.
- **Initial corridor capital:** $76.0286M; 83.04% committed before community demand is proven.
- **Receiver cost form:** F + v_r·P_hardware + v_e·P_demand. A capacity statement that does not name its basis is incomplete.
- **Falsifier register:** F1–F31; F31 governs fixed-article standardisation.

The old 24-article / 17-site / 12.98 MW closure statement is retired. Historical findings above retain it only where that was the text under review. Current source verification must rebuild from `sim/corridor_model.py` and the corrected engineering blueprint.

**Era III supersession.** Historical findings above also preserve the former cross-era assumption that a 19 MW rack used the Era II 3.509 chain and therefore delivered 5.41 MW at an exactly 10:1 ratio. That assumption is retired. Era III is a separately qualified P3 article with a distinct **2.360 planning chain**, giving **9.08 MW hardware ceiling / 8.05 MW planning / 7.41 MW contracted**. These values are gated allocations, not demonstrated performance, and must be frozen from the P3 rack link budget before sanction.

**Optical-output cost convention.** Learning-curve transmitter prices are per optical watt out. Convert them to dispatched delivered-watt capex by multiplying by the optical-to-delivered chain; do not divide by WPE again. WPE governs electrical input, source energy, cooling and electrical balance of plant. For Era III the documented governed-content allocation is $0.20/W-optical × 2.360 + $0.30/W receiver + ~$0.10/W integration = **$0.872/W of planning nameplate** for 2036–39. The first Era II corridor separately installs the full N-1 estate—51.3 MW optical for $20.52M—to preserve 31.8 MW dispatch after one ingress loss.

**Network closure.** The Era III backbone now declares the same conservative ingress-capacity rule as Era II: each clear station contributes 0.5 corridor per-unit; two sustain full dispatch. The corrected 200-trial row is **99.9% optical / 99.2% power-weighted capacity / 99.5% delivered bus**, with the archived fixture regenerated byte-for-byte from the live simulator. This closes the former implicit any-clear/full-capacity assumption.
