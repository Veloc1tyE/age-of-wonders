---
uid: note_c3174d924a7a
title: "Verification"
subtitle: "Package checksum and control"
classification: "Confidential: Institutional Investment Reference"
company: "Aquila Global Infrastructure"
date: "July 2026"
from: "Aquila Global Infrastructure"
prepared_for: "Counterparties under NDA."
status: verified
revision: "1 August 2026"
---

# Verification

The Appendices expose the arithmetic. Engineering defines the system. Verification checks that every material claim resolves to one current source, one model boundary and one test or gate.

A release passes when:

- the governing models run;
- repeated figures agree with their authoritative output;
- superseded figures remain only in the Revision History;
- the Python and browser models match;
- every material qualification appears beside the claim it qualifies;
- every projected capability resolves to a gate and falsifier;
- the rendered package contains no broken tables or development controls.

Run the package checksum from the repository root:

```bash
python3 sim/validate_package.py
```

The command exits non-zero when the controlled documents and executable models disagree.

## One book at several depths

Each layer answers a different reader question. Successive layers increase resolution while preserving the meaning of the earlier claim.

| Layer | Reader's question | Controlled purpose |
|---|---|---|
| Pre-NDA Briefing | Is this important and credible enough to investigate? | Mission, need, product, evidence boundary, commercial unit and first capital ask |
| Executive Memo | What decision is being requested? | The complete decision in compressed form |
| Aquila Energy Thesis | Why can this become a major infrastructure category? | The causal argument from need through programme |
| The Appendices | Can I reproduce the calculations? | Equations, assumptions, sensitivities, falsifiers and source register |
| Engineering | What will be built and tested? | Baselines, requirements, interfaces, allocations, margins and verification plans |
| Verification | Is the package current and controlled? | Authority map, model manifest, consistency rules and release state |

The shortest complete reading path is:

**Pre-NDA Briefing → Executive Memo → Aquila Energy Thesis**

Diligence continues through **The Appendices → Engineering → Verification**. The Evaluator Guide provides direct routes for technical, commercial, regulatory and investment questions.

## Authority map

Every material fact has one authoritative home. Other documents may summarise it at lower resolution.

| Information | Authoritative home |
|---|---|
| Mission, customer proposition and decision ask | Executive Memo |
| Reader-facing architecture and causal argument | Aquila Energy Thesis |
| Governing equations and sensitivities | The Appendices |
| Exact configuration, requirements and interfaces | Engineering Blueprint |
| Subsystem allocations, margins and test plans | Design reviews |
| Physical parameters and era baselines | `sim/physical_state.py` |
| End-to-end energy planes and losses | `sim/energy_ledger.py` |
| Era III operator financeability | `sim/cost_curve_scenarios.py` |
| Dispatch and source chronology sensitivity | `sim/source_service.py` |
| Link-unit reconciliation and Era II operating screen | `sim/corridor_model.py` |
| Programme cash flow and fleet finance | `sim/econ_model.py` |
| Equipment stream | `sim/equipment_stream.py` |
| Tranche valuation and investor returns | `sim/tranche_valuation.py` |
| Risks and falsifiers | Thesis risk and falsifier registers |
| Published evidence | Appendices source register |
| Historical figures and supersessions | Revision History |

The models own numerical output. The documents explain it.

## Evidence states

The package distinguishes six evidence states.

| State | Meaning |
|---|---|
| Established physics | The governing relationship is well established |
| Published evidence | A third party has demonstrated the result under stated conditions |
| Aquila measured | Aquila has measured the result on an identified article or experiment |
| Engineering allocation | The value is a controlled requirement or budget |
| Model projection | The result is calculated from declared assumptions |
| Unproven integration | Reliance awaits an integrated test |

The long-form tags **[Measured]**, **[Validated precedent]** and **[Projection—gated]** and the compact design-review tags **[meas]**, **[pub]**, **[alloc]** and **[model]** map to these states. **Proposed** identifies a target commercial or programme structure. Plain-language documents state the same boundary without printing a tag beside every sentence.

A state changes only through a controlled source, model or test record. The update propagates to every lower-resolution document in the same release.

## Disclosure rules

1. **Graduated disclosure increases resolution.** A deeper layer may quantify a claim, expose its sensitivity or show its test. Its meaning remains stable.
2. **Material qualifications travel with the claim.** A ceiling, exclusion, measurement plane, availability convention or unproven dependency appears at the first material use.
3. **Each document is locally sufficient.** A reader can understand the promise made by that document without opening another volume.
4. **Authority stays singular.** A summary may quote an owned result. It cannot redefine the result.
5. **No load-bearing premise begins downstream.** A design review or Verification record may discover a new fact. Any consequence for performance, safety, economics or the investment decision returns to the Thesis and Executive Memo before release.
6. **Repeated figures are generated or checked.** Manual transcription creates no second source of truth.

## Executable model manifest

| Boundary | Executable authority |
|---|---|
| Canonical physical state | `sim/physical_state.py` |
| Named-plane energy ledger | `sim/energy_ledger.py` |
| Spherical route, atmosphere and beam screens | `sim/physics_model.py` |
| Segmented-aperture and field acceptance | `sim/field_model.py` |
| Aircraft mass, power, reserve and thermal screen | `sim/aircraft_model.py` |
| Abort timing, exposure and safe-state screen | `sim/safety_model.py` |
| Weather chronology and topology sensitivity | `sim/availability_model.py` |
| Link-unit reconciliation and Era II operating screen | `sim/corridor_model.py` |
| Dispatch and source chronology sensitivity | `sim/source_service.py` |
| Era III operator return boundary | `sim/cost_curve_scenarios.py` |
| Programme cash flow, value boundary and fleet finance | `sim/econ_model.py` |
| First-install equipment stream | `sim/equipment_stream.py` |
| Tranche valuation and investor returns | `sim/tranche_valuation.py` |
| Retired conventional-flow programme-IRR comparator | `sim/irr_update.py` |
| Browser/Python economic parity | `sim/parity_check.py`, `sim/parity_check.mjs` |
| Cross-document release checksum | `sim/validate_package.py` |

Each executable owns its stated boundary. A simplified screen remains labelled as a screen. An integrated model earns authority only for the variables it actually couples.

## Release discipline

The release is withheld when:

- a governing model fails its own validation;
- Python and browser outputs diverge;
- a required document omits a current controlled value;
- a superseded value survives outside the Revision History;
- two documents assign different meanings to the same measurement plane or configuration;
- a planning value lacks its scenario, unit or evidence state;
- a projected capability lacks a measurable gate or falsifier;
- a cited claim lacks a source-register entry;
- a downstream document carries a newer baseline than its authority;
- the site or PDF render changes the meaning of a table, equation or qualification.

The Revision History records what changed. Verification records whether the current release agrees with itself.
