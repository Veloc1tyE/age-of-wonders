export const meta = {
  name: 'coherent-array-precedent',
  description: 'Pull the Starshot, DE-STAR and coherent-beam-combining groundwork on how phasing scales with element count, and establish what transfers',
  phases: [
    { title: 'Gather', detail: 'six independent literature angles' },
    { title: 'Verify', detail: 'adversarial check on each' },
    { title: 'Synthesise', detail: 'what transfers and what does not' },
  ],
}

const RULES = `
METHOD RULES, these matter more than coverage:
- Cite primary sources: author, venue, year, DOI where you can get it. Verify against publisher
  metadata (Crossref, OpenAlex, NASA ADS, arXiv) rather than trusting a search snippet.
- Separate DEMONSTRATED results from PROPOSED or CALCULATED ones, always. A concept study is not
  evidence. Say which you are reporting, every time.
- If a number is widely quoted but you cannot source it primarily, say so explicitly.
- If part of my framing contains a wrong assumption, say that plainly rather than answering around it.
- Give a confidence level per claim. "Not found" is a valid and useful answer.
- Do not write files.
`

const FINDING = {
  type: 'object', additionalProperties: false,
  required: ['topic', 'summary', 'demonstrated', 'proposed', 'key_numbers', 'gaps', 'confidence'],
  properties: {
    topic: { type: 'string' },
    summary: { type: 'string' },
    demonstrated: { type: 'array', items: { type: 'string' }, description: 'built and measured results only' },
    proposed: { type: 'array', items: { type: 'string' }, description: 'concept studies, calculations, designs' },
    key_numbers: { type: 'array', items: { type: 'string' } },
    gaps: { type: 'array', items: { type: 'string' } },
    confidence: { type: 'string' },
  },
}

const VERDICT = {
  type: 'object', additionalProperties: false,
  required: ['refuted', 'reasoning', 'corrections'],
  properties: {
    refuted: { type: 'boolean' },
    reasoning: { type: 'string' },
    corrections: { type: 'array', items: { type: 'string' } },
  },
}

const ANGLES = [
  { key: 'starshot', prompt: `${RULES}

TOPIC: Breakthrough Starshot's laser array, and Lubin's DE-STAR lineage.

1. What are the actual design parameters? Total optical power, aperture size, wavelength, and above
   all the ELEMENT COUNT — how many individually phased emitters does the design contemplate, and
   what is each element's power? Element counts from 10^6 to 10^9 are quoted loosely; find what the
   primary sources actually say.
2. Kevin Parkin, "The Breakthrough Starshot System Model", Acta Astronautica 152 (2018) — what does
   it say about phasing, phase tolerance, and how the array is held coherent?
3. Philip Lubin's DE-STAR papers ("A Roadmap to Interstellar Flight" and the DE-STAR series) — same
   questions.
4. What phasing ARCHITECTURE do they assume? Metrology-based closed-loop, master-oscillator power
   amplifier, injection locking, or something else? How is the reference distributed to elements?
5. Do any of them derive how phase tolerance or combining efficiency SCALES with element count N?
   This is the question I care about most. If they treat N as unlimited, say so and say why.
6. What has actually been BUILT in this lineage? Any hardware demonstrations, at what scale?
7. Cost and status: what happened to the programme, and what did the array cost estimates come to?` },

  { key: 'cbc-record', prompt: `${RULES}

TOPIC: The demonstrated record for high-power coherent beam combining.

1. What is the largest number of channels ever COHERENTLY COMBINED at high power, and by whom? I
   believe fibre-laser coherent beam combining has reached roughly a hundred channels; verify or
   correct that. Give the record, the channel count, total power, and combining efficiency.
2. Distinguish tiled-aperture (side-by-side, filled fraction matters) from filled-aperture
   (beamsplitter) combining. Which scales better with N and why?
3. What limits the channel count in practice? Phase-locking bandwidth, path-length matching, seed
   distribution, thermal, control electronics, or something else? Rank them.
4. What phase-locking techniques are used at the highest channel counts — LOCSET / frequency-tagging,
   stochastic parallel gradient descent, heterodyne, self-organising? How does each scale with N,
   and is there a known ceiling for any of them?
5. Combining efficiency versus residual phase error: what is the relation, and does the required
   per-channel phase error get TIGHTER as N grows, or stay constant? Be precise about this.
6. Are there demonstrations above a thousand channels at any power level?` },

  { key: 'opa', prompt: `${RULES}

TOPIC: Optical phased arrays at high element count, and whether they transfer to high power.

1. Silicon-photonic optical phased arrays: what is the demonstrated element-count record? I recall a
   64x64 = 4,096 element MIT device around 2013 (Sun et al., Nature) and possibly larger since.
   Verify and find the current record.
2. What power do these handle, per element and total? Why can they not scale to watt-class or
   kilowatt-class per element?
3. How are they phased, and how is the phase reference distributed across thousands of elements?
4. What is the measured beam quality or sidelobe performance at the highest element counts, and does
   it degrade with N?
5. Is there anything in the OPA literature about phase-error scaling with N that transfers to a
   high-power array, or is the whole regime too different to learn from?
6. Any mid-power examples that bridge the two regimes — say, hundreds of milliwatts to watts per
   element at hundreds to thousands of elements?` },

  { key: 'injection', prompt: `${RULES}

TOPIC: Injection locking of semiconductor laser arrays, at scale.

This is the specific mechanism I care about: a common master seed injected into many slave lasers,
which then amplify and emit coherently.

1. What is the demonstrated record for the NUMBER of semiconductor lasers injection-locked to a
   common seed and shown to be mutually coherent? Give the count, device type, power, and coherence
   evidence.
2. Adler's equation gives the locking half-range as a function of injection ratio. How does the
   required injection ratio, or the locking range, change as the number of slaves grows — if the
   master power is divided among N slaves, the per-slave injection ratio falls as 1/N. Does the
   literature treat this, and what does it conclude about the maximum N?
3. What sets the locking bandwidth in practice for a semiconductor laser: injection ratio, linewidth
   enhancement factor alpha, detuning, or cavity parameters? Give typical numbers.
4. Frequency detuning inside the locking range produces a fixed phase offset. What is the relation,
   and what does it imply for how tightly the slave frequencies must be matched?
5. Has anyone injection-locked a PCSEL, or an array of PCSELs? Any VCSEL array results that transfer?
6. What is the failure mode when injection locking breaks down — unlocking, chaos, four-wave mixing?
   How is the boundary characterised?` },

  { key: 'scaling-theory', prompt: `${RULES}

TOPIC: The theory of how coherent combining degrades with element count and phase error.

This is the most important question in this set. I want the actual mathematics, not a survey.

1. For an array of N emitters with independent random phase errors of RMS sigma, what is the
   combining efficiency or Strehl ratio in the far field? I believe the classic result is
   exp(-sigma^2), INDEPENDENT of N. Verify this or correct it, and give the source.
2. If that is right, it means element count does not itself limit coherence — only per-element phase
   error does. Is that the correct reading? What assumptions does it rest on (independence,
   equal amplitude, Gaussian statistics, filled aperture)?
3. Where does N re-enter? Consider: amplitude errors, fill factor and sidelobe structure, correlated
   rather than independent errors, pointing errors, polarisation, and the practical problem of
   distributing a reference to N elements. Which of these actually degrade with N and how fast?
4. What is the effect of a SPARSE or tiled aperture on the far field — how much power goes into
   grating lobes and sidelobes as a function of fill factor, and does that scale with N?
5. Is there a published treatment of the maximum useful N for a coherent array, from any field? If
   the answer is that no fundamental limit exists and it is purely engineering, say that clearly.
6. Amplitude and phase error budgets: what per-element phase error is typically required for
   90 percent, 95 percent and 99 percent combining efficiency?` },

  { key: 'limits-practice', prompt: `${RULES}

TOPIC: What actually stops people building very large coherent arrays.

Assume the theory permits large N. I want the engineering reasons nobody has gone past roughly a
hundred high-power channels.

1. Seed or reference distribution: how is a master oscillator distributed to N elements, and what
   breaks as N grows? Path-length matching tolerance, dispersion, amplitude uniformity, splitter loss.
2. Control: N phase actuators need N sensors and a controller. What control architectures exist for
   large N — centralised, hierarchical, self-organising, nearest-neighbour? What is the demonstrated
   ceiling for each, and what is the computational scaling?
3. Thermal: how tightly must element temperatures be matched, and why? What differential temperature
   tolerance is typical for semiconductor devices phase-locked together?
4. Metrology: how do you measure N phases fast enough to correct them? What sensing schemes scale and
   which do not?
5. Cost and integration: what dominates the per-channel cost in existing high-power coherent arrays?
6. Is there a published roadmap or study on scaling coherent arrays to 10^4 or more high-power
   channels, from any group or agency? What does it say is required?` },
]

phase('Gather')
const results = await pipeline(
  ANGLES,
  a => agent(a.prompt, { label: `gather:${a.key}`, phase: 'Gather', schema: FINDING }),
  (f, a) => {
    if (!f) return null
    return agent(
      `${RULES}

A researcher reported the following. Your job is to REFUTE it — check the citations exist and say
what the reporter claims, re-derive any load-bearing mathematics yourself, and look for results that
contradict it. Be especially alert to concept studies reported as if demonstrated, to element counts
quoted without a primary source, and to scaling claims asserted rather than derived.

TOPIC: ${f.topic}
SUMMARY: ${f.summary}
DEMONSTRATED: ${(f.demonstrated || []).join(' | ')}
PROPOSED: ${(f.proposed || []).join(' | ')}
KEY NUMBERS: ${(f.key_numbers || []).join(' | ')}

Default to refuted=true if a load-bearing claim is unsupported or if you cannot verify a citation.`,
      { label: `verify:${a.key}`, phase: 'Verify', schema: VERDICT },
    ).then(v => ({ ...f, key: a.key, verdict: v }))
  },
)

const clean = results.filter(Boolean)
const brief = clean.map(r => `### ${r.key} — ${r.topic}
${r.summary}
DEMONSTRATED: ${(r.demonstrated || []).join(' | ')}
PROPOSED: ${(r.proposed || []).join(' | ')}
NUMBERS: ${(r.key_numbers || []).join(' | ')}
GAPS: ${(r.gaps || []).join(' | ')}
CONFIDENCE: ${r.confidence}
VERIFIER: ${r.verdict ? (r.verdict.refuted ? 'REFUTED — ' : 'stands — ') + r.verdict.reasoning : 'no verdict'}
CORRECTIONS: ${r.verdict ? (r.verdict.corrections || []).join(' | ') : ''}`).join('\n\n')

phase('Synthesise')
const memo = await agent(
  `You are writing a groundwork memo for a doctoral research programme on the coherent-domain limit in
injection-locked semiconductor laser arrays. The target system needs roughly 13,300 emitters of about
1 kW each, injection-locked to a common seed, launching one beam through the atmosphere over tens of
kilometres. The research question is how large a coherent domain can be.

Six literature threads were gathered and each adversarially verified. Here is what came back:

${brief}

Write a memo to /Users/billy_j/age-of-wonders/private/dossier-pcsel-research/documents/20-coherent-array-precedent.md

It must answer four questions, in this order:

1. **Is the ambition unprecedented?** Compare the 13,300-channel target against what Starshot and
   DE-STAR propose, and against what has actually been demonstrated. Be scrupulous about the
   distinction — a concept study is precedent for the ambition, not evidence for the physics.

2. **Does element count itself limit coherence?** If the combining efficiency for independent random
   phase errors really is exp(-sigma^2) independent of N, then N is not the variable and per-element
   phase error is. Say so plainly if the literature supports it, and say where N re-enters through
   fill factor, correlated errors, reference distribution and control. This reframes the research
   question and is the most important section.

3. **What transfers from Starshot, and what does not?** Starshot assumes fibre amplifiers phased by
   metrology and focuses at interstellar range; this programme injection-locks semiconductor devices
   at tens of kilometres. Name which parts of their analysis carry across and which do not, with
   reasons. Different Fresnel numbers and error budgets are the obvious ones, but check for others.

4. **What is genuinely open, and therefore what the doctorate contributes.** The gap between the
   demonstrated high-power record and 13,300 channels. What nobody has measured. Be specific about
   the experiments that would close it.

RULES FOR THE MEMO:
- Every number carries its source and a label: [pub] published third party, [demo] built and measured,
  [calc] calculated or proposed only, [assume] a declared assumption.
- Where the verifier refuted or corrected a thread, carry the correction, not the original claim.
- Where the literature has a gap, say "not found" rather than filling it.
- Lead with the answer in each section. Short declarative sentences. No hedging.
- British spelling. Em dashes set closed with no spaces, or better, replaced by full stops.
- End with a short register of the highest-value follow-ups that could not be retrieved.

Write the file. Then return a 200-word summary of what it concludes, flagging anything that
materially changes how the research question should be posed.`,
  { label: 'synthesise:memo', phase: 'Synthesise' },
)

return { memo, refuted: clean.filter(r => r.verdict && r.verdict.refuted).map(r => r.key) }
