# Aquila Dossier — SWF Evaluator Brief

## Who this is for

A sovereign wealth fund investment team evaluating a multi-billion dollar energy infrastructure programme. The evaluator manages patient capital on decade-plus horizons and assesses against infrastructure allocations, not venture bets. They need: scale, structure, sovereign alignment, phased gates, quantified risk, and the counterfactual.

This brief is a context map — it tells you where everything is, how the documents check each other, and how to use the Atlas brain to navigate the full institutional record. Read it alongside the dossier documents, not instead of them.

---

## The dossier documents (what to read and in what order)

The dossier lives at `~/age-of-wonders/private/dossier-aquila/`. Read in this order:

| # | Document | What it answers |
|---|---|---|
| 1 | `executive-memo.md` | The distilled case. One hour of reading. What we're building, why now, what it costs, who funds it. |
| 2 | `investment-thesis.md` | The full investment case. Technology, markets, deployment, capital structure, risk architecture, geopolitical configuration. The governing reference. |
| 3 | `engineering-blueprint.md` | The build plan. R&D gates, manufacturing roadmap, PCSEL scaling, HAPS platform, receiver thermal design, corridor model. |
| 4 | `design-pcsel-array.md` | Transmitter design verification. Die to 380 MW block. |
| 5 | `design-haps-relay.md` | Relay platform design. Era I relay, Era II–III beam-powered platform. |
| 6 | `design-receiver-thermal.md` | Receiver and thermal design. Optical power converter, Suncave receiver, community-substation environment. |
| 7 | `design-network-operations.md` | Network operations model. Corridor simulation, availability, scheduling. |
| 8 | `COHERENCE-SWEEP.md` | How the documents check each other. Every cross-reference verified, every number reconciled. |
| 9 | `ARCHITECTURE-SWEEP.md` | Consistency across the architecture documents. |
| 10 | `CITATION-AUDIT.md` | Source provenance audit. Every load-bearing claim traced to its origin. |

---

## The brain as evaluation partner

The dossier documents are the static reference set. The Atlas brain holds the living institutional memory — financial updates, corrections, sovereign engagement records, operator test results, and the full context of how this programme connects to the broader mission. Use the brain continuously during evaluation.

### Start here: the spine of the case

```
atlas_recall(queries=[
  "Aquila energy thesis investment case sovereign wealth fund evaluation",
  "Lightway executive memo distilled case energy delivery cost",
  "mission thesis energy abundance billions PCSEL HAPS Africa"
])
```

These surface the Investment Thesis (the governing reference), the Executive Memo (the distilled case), and the Mission root note (why this exists at all). Read the Executive Memo first for the narrative; then the Investment Thesis for the architecture.

### The capital structure — how this fits a sovereign portfolio

```
atlas_recall(queries=[
  "capital sovereigns UAE TII TAQA ADIA Masdar funding pathway",
  "Aquila Global Infrastructure AGI structure tranche commitment gate discharge",
  "no debt no collateral no exposure Zimbabwe sovereign capital architecture"
])
```

Key sources: Capital and Sovereigns (the funding pathway — why UAE SWFs, the TII Phase 1 gate, the capital architecture), the Investment Thesis §IX (who funds what, the AGI structure fit), and the Energy Abundance note (the "no debt, no collateral, no exposure" offer to host states).

An evaluator should understand: this programme is engineered for the capital architecture Aquila Global Infrastructure already operates — programme capital committed at Top-Co level, drawn only at gate discharges, with the same discipline as ACI's compute pillar. The tranche structure mirrors infrastructure fund drawdown, not venture capital rounds.

### The technology — is it real?

```
atlas_recall(queries=[
  "PCSEL power beaming technology architecture cost per delivered watt",
  "Lightway engineering blueprint receiver sizing convention corrected",
  "PCSEL phased array transmitter design verification die to block"
])
```

Key sources: Technology — PCSEL and Power Beaming (the delivery stack), the Receiver Sizing Convention (corrected July 15 — Era II planning 541 kW, Era III planning 8.05 MW, with contracted firm numbers), and the PCSEL transmitter design verification. The engineering blueprint §4.2 is the baseline. Every anchor claim has been checked against published datasheets.

The evaluator's question is not "does the physics work?" — DARPA POWER validated sub-μrad pointing precision, and Aquila has demonstrated 500W over 300m to a manoeuvring drone with active safety. The question is "does the scaling roadmap hold?" The blueprint answers with gates, not dates.

### The deployment — where, when, with whom

```
atlas_recall(queries=[
  "Zimbabwe corridor deployment four phase programme grid comms rural electrification",
  "Africa deployment sovereign partner states regulatory anchoring",
  "HAPS landscape engineering constraints failure modes competitive picture"
])
```

Key sources: Zimbabwe Hub (the four-phase programme), Africa Deployment, and the HAPS Landscape (engineering constraints, failure modes, competitive picture). The Zimbabwe MOU was placed before the board June 2026. The programme phases from grid communications (Phase 1) through rural electrification (Phase 3) to national rollout (Phase 4).

### The financial reality — current state

```
atlas_recall(queries=[
  "Aquila financial runway corrected insolvency project phoenix",
  "Aquila burn rate cash position visible dashboard July 2026"
])
```

Key sources: Project Phoenix (the restructure/recapitalisation framework), the Financial Runway corrections (verified across multiple operator sweeps — $2.1M cash, ~$420K/mo burn, 5-month runway to December 2026). An evaluator should understand: the legacy entity is pre-revenue and capital-constrained, which is why the programme is structured through AGI Top-Co with new sovereign capital, not through the existing venture vehicle.

### The geopolitical configuration

```
atlas_recall(queries=[
  "UAE strategic posture South-to-South sovereign capital Global South infrastructure",
  "geopolitical configuration Zimbabwe first mover African continental programme"
])
```

Key sources: the Investment Thesis §XI (Geopolitical Configuration) and the Energy Abundance note. The UAE's explicit pivot toward sovereign-defence capability and patient infrastructure capital deployment in the Global South opens a window for South-to-South sovereign capital outside traditional Western frameworks. The Zimbabwe corridor is the first anchor; the architecture scales continentally.

### The counterfactual — what happens without this

```
atlas_recall(queries=[
  "cost of not building Lightway counterfactual solar mini-grid comparison",
  "storage days autonomy solar battery limitation multi-day cost"
])
```

The brain holds recent analysis comparing Lightway against solar mini-grid alternatives — storage autonomy requirements, multi-day cost, reliability for cold-chain and clinical loads. The counterfactual is not "nothing." It's "solar plus batteries with multi-day storage, which costs X and delivers Y." The dossier should answer: what does the world look like if this programme doesn't happen?

---

## The coherence sweep — how the documents check each other

Every number in the dossier has been cross-verified. The coherence sweep (`COHERENCE-SWEEP.md`) is the record of that verification. Key examples:

- The receiver sizing convention (Era II: 541 kW planning, 487 kW contracted; Era III: 8.05 MW planning, 7.41 MW contracted) has been reconciled across the investment thesis, engineering blueprint, and corridor model
- The $24.7M lumpy corridor cost was corrected from "46% of corridor" to "38% of corridor"
- The Era III ceiling chain (47.78%) and planning chain (42.37%) are documented with derivations

An evaluator should read the coherence sweep to understand what was checked and what was caught — the corrections themselves are evidence of diligence.

---

## How to use the brain during evaluation

**Query as questions arise.** Don't read everything upfront. When a specific question emerges — "what's the IEC TC 76 relationship?" or "what happened with the Phoenix recap?" — query the brain before searching the dossier. The brain may have a verified note written during the event itself.

**Follow the links.** Every note in the brain links to related notes. If you pull `Aquila — Hub`, you'll find links to the venture description, technology stack, deployment thread, capital pathway, and corporate structure. Follow the edges — the graph is the navigation.

**Read the signals.** The brain marks every claim with epistemic status:
- `verified` — machine-checked or corroborated by a cited source
- `proposed` — agent-authored, not yet audited
- `superseded` — replaced by a newer version; follow `superseded_by`
- `stale` — exceeded its TTL; verify before relying

The evaluator should prefer verified nodes. A proposed note is a working hypothesis, not an established fact.

**Verify against the dossier.** The brain is the living memory; the dossier documents are the static reference set. When the brain and the dossier disagree on a number, the dossier is the baseline and the brain may carry a correction. The coherence sweep documents the reconciliation.

---

## The evaluation arc (corrected)

A SWF evaluator should move through these layers, but not strictly sequentially. Some questions should be asked first because their answers determine whether deeper diligence is warranted.

### First pass — the structural questions (do not proceed without these)

1. **The vehicle question** — is this programme structured for a 30-year mission or is it another 5-year venture trap? The "Friction Was Structural" diagnosis is explicit: the founder was removed from a venture-backed company three days after proposing the pivot that became the company's thesis. The next vehicle must encode founder voting control, mission capital separate from operating capital, and sovereign relationships that travel with the founder. The AGI Top-Co structure (ADGM, private company limited by shares) is the proposed answer. Does the governance match the mission horizon?

2. **The people question** — who executes? The founder owns the UAE sovereign relationship (Eelke Sijbrandij), the African sovereign relationship (Oliver Tapuwa Mapunga), and the technology vision. The IEC TC 76 seat belongs to Aquila's optical engineer, not the founder personally. The legacy entity has a CEO who is not the founder. Understanding who controls what — and whether the founder can execute through the proposed vehicle — is load-bearing.

3. **The window question** — why now? The connectome carries a claim: "Architecture closeable window bounded ~end-2027" with seven independent clocks converging. The legacy entity has ~5 months of runway (December 2026 base case, October 2026 floor). The UAE strategic posture — explicit pivot toward sovereign-defence capability and patient infrastructure capital deployment in the Global South — is not permanent. If this programme doesn't secure sovereign anchoring in the current window, the configuration may not reassemble.

### Second pass — the investment case

4. **The narrative** — Executive Memo. One hour. Does the case hold as a story? The core claim: generation is manufactured and gets cheaper; delivery is construction and does not. Lightway inverts the cost curve for delivery.
5. **The architecture** — Investment Thesis + Engineering Blueprint. Does the scaling roadmap close? Era I (fibre laser, solar HAPS, 10-30 kW), Era II (PCSEL phased array, 1 MW, 541 kW planning), Era III (beam-powered relay, 10 MW corridors, 8.05 MW planning, grid-competitive). Gates, not dates.
6. **The capital structure** — tranche-and-gate discipline. Programme capital committed at AGI Top-Co, drawn only at gate discharges. This is infrastructure fund drawdown, not venture rounds. The $2.9B is the programme estimate; the actual commitment structure is phased.
7. **The return architecture** — sovereign capital is strictly last in the loss waterfall. Builder's equity absorbs first, facility equity second, sovereign partner's capital last. This is the cross-portfolio asymmetry: risk is structured so the sovereign only loses after everyone else has. Carry flows: ACI CarryCo → HoldCo → AGI Top-Co, with the founder holding majority governance at Top-Co.

### Third pass — the risk and counterfactual

8. **The risk architecture** — the Risk Register (RR1-RR12) names every risk, its gate, its mitigant, and its falsifier. The three that matter most: PCSEL may not scale (RR1, the central technical risk — 1 kW die designed but not demonstrated, demonstrated point is 50 W), demand may form more slowly than capacity (RR9), and a cheaper competitor may arrive with Era II rather than before it (RR12). The insurance architecture maps four risk objects (airframes, the beam, ground infrastructure, revenue interruption) to four insurance markets with named sellers. The de-risking sequence ranks actions by premium leverage per dollar.

9. **The competitive landscape** — Investment Thesis §X. The structural inversion is the moat: beaming cost is proportional to delivered power, independent of distance (∂C_beam/∂d = 0). Grid cost is linear with distance. Solar+LFP mini-grids work at small scale but hit multi-day storage walls for productive-use loads. The falsifier to watch: if rural PV+LFP mini-grid LCOE falls below the Era II delivered band by 2030, the thesis weakens at the community scale.

10. **The counterfactual** — what happens if this capital deploys elsewhere? The comparative summary against Eastern Highlands alternatives is the reference: grid extension ($500M-$2B+, 10-20 years, sovereign debt), solar mini-grids (productive-use gap), diesel (fuel logistics, emissions). Lightway's counterfactual advantage is structural: $0 sovereign capital, no debt, no collateral, 12-18 month deployment. If this programme doesn't happen, the alternative for the host state is likely nothing — or worse, a debt-funded grid extension that takes two decades and creates a fiscal liability.

11. **The coherence** — Coherence sweep + citation audit. Every number checked. The corrections list is evidence of diligence, not weakness.

## What's different from a venture evaluation

A SWF evaluator should approach this differently than a venture capitalist would:

- **Horizon.** VC evaluates 5-7 year exits. SWFs hold infrastructure for decades. The question isn't "when does this exit?" — it's "does the cash flow compound over 20+ years?"
- **Risk appetite.** VC prices binary risk (works/doesn't). SWFs price infrastructure risk (builds slower than planned, costs more, delivers less). The tranche-and-gate structure is designed for the latter.
- **Governance.** VC accepts misaligned boards as normal. SWFs require governance that matches the holding period. The question is whether AGI Top-Co's governance can survive a 30-year mission — and the lesson from the legacy entity is that venture governance cannot.
- **Counterfactual.** VC compares against other deals. SWFs compare against other infrastructure allocations. The right comparison for Lightway is not another startup — it's a transmission line, a gas plant, a solar farm with multi-day storage.

## How this brief should be used

This is not a static document. It should be treated the same way the fleet treats the development brief — as a context map that points to sources, not as a substitute for them. The evaluator should:

- Query the brain continuously as questions arise during due diligence
- Follow links — the Investment Thesis links to the Engineering Blueprint, which links to the PCSEL design review, which links to the Risk Register
- Read the signals — prefer verified over proposed, follow superseded_by chains
- Persist findings back to the brain — the evaluation itself produces knowledge that compounds

The SWF evaluator's job is not to read a dossier. It's to make a multi-billion dollar decision with decade-plus consequences. The brain is the institutional memory that makes that decision informed.
