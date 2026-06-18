# CLAUDE.md

This file guides Claude Code (claude.ai/code) when working in this repository.

It has two jobs.

First, keep the site fast, stable, and clean.

Second, protect the standard of the canon.

Age of Wonders is a body of work about abundance, access, and the future humanity can build. The implementation has to carry that belief. The prose has to carry it too.

## Vision & Purpose

Age of Wonders is a body of writing and creative work built on three ideas:

1. **The universe is abundant beyond our wildest dreams.**
2. **Scarcity is never necessary.**
3. **Access is the limiter.**

The canon explores:

- Material abundance and moral expansion
- Energy as the foundation of living standards
- Infrastructure as the bridge between possibility and use
- Optimism without denial
- Reaching for the stars, literally and metaphorically

**Aesthetic:** Elegant, readable, restrained. The site should feel like a serious essay collection. Cormorant Garamond gives the work grace. Inter gives the interface clarity. Whitespace does the rest.

The feeling is quiet confidence. The design does not beg for attention. It assumes the work is worth reading.

**The medium is the message.** A site about wonders has to be one. Every pixel speaks. Every transition speaks. Every spacing decision speaks. Mediocre craft would weaken the premise.

## Commands

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build production site to ./dist/
npm run preview  # Preview production build locally
```

## Architecture

This is an Astro 5 static site with MDX support and LaTeX math rendering.

**Key integrations:**

- MDX (`@astrojs/mdx`) for essay content
- Math rendering with `remark-math` and `rehype-katex`
- RSS feed via `@astrojs/rss` at `/rss.xml`

**Structure:**

- `src/pages/` — file-based routes. `.astro` and `.mdx` files become pages.
- `src/content/` — content collections for essays.
- `src/layouts/` — page layout wrappers.
- `src/components/` — reusable Astro components.
- `src/assets/` — images and assets processed by Astro.
- `src/styles/` — global CSS.
- `public/` — static files served as-is.

**TypeScript:** Uses Astro's strict config (`astro/tsconfigs/strict`).

## Content Collections

Essays live in Astro content collections.

- **Location:** `src/content/essays/`
- **Format:** MDX with frontmatter
- **Template:** `src/content/essays/_template.mdx`
- **Schema:** Defined in `src/content/config.ts`
  - `title`: string, required
  - `description`: string, optional
  - `date`: date, required, format `YYYY-MM-DD`
  - `draft`: boolean, optional, defaults to `false`

**Important:** The date field uses `z.coerce.date()`. String dates become Date objects. When displaying dates, use `.toLocaleDateString()` or equivalent formatting.

### Adding a New Essay

1. Create a new `.mdx` file in `src/content/essays/`.
2. Use `_template.mdx` as the starting point.
3. Add frontmatter with title, description, and date.
4. Write the essay in Markdown or MDX.
5. Set `draft: false` when ready to publish.

Essays support:

- Standard Markdown
- Math equations with KaTeX (`$inline$` and `$$block$$`)
- MDX components

## Deployment

The site deploys through Vercel.

- **URL:** www.ageofwonders.org
- **Auto-deploy:** Any push to `main` deploys to production.
- **Critical:** Always run `npm run build` before pushing.

Broken builds do not stay local. They ship.

## Development Workflow

### Before Committing

1. Run `npm run build`.
2. Use `npm run preview` for visual changes.
3. Never push a broken build.

### Commit Message Style

Use this structure for features and refinements:

```text
Add feature name

**Rationale:** Why this change matters

**What changed:**
- Specific change
- Technical detail where useful

**Result:** What the reader or operator experiences
```

Use this structure for fixes:

```text
Fix issue: Brief description

What caused the problem, and why this fix is correct.
```

Commit messages should be clear enough to reconstruct the decision later.

## Performance & UX Priorities

The site should feel instant.

**Performance targets:**

- First load: under 200ms perceived
- Subsequent navigation: under 50ms perceived

**How it works:**

- **Service Worker** (`public/sw.js`): stale-while-revalidate for all requests.
  - First visit: fetch from network and cache.
  - Return visit: serve from cache, then update in background.
  - Deploys should bump the cache version when stale content matters.
- **Astro ViewTransitions:** navigation feels like an app without losing static-site reliability.
- **Aggressive prefetching:** viewport, mousedown, and touchstart prefetch make links feel immediate.
- **Lazy-loaded images:** preserve the first paint.

**Critical rules:**

1. **Bump `CACHE_VERSION` in `sw.js` after significant changes.** Old pages may otherwise persist.
2. **Never remove ViewTransitions.** They carry the instant-navigation feel.
3. **Use `astro:page-load` for client-side initialisation.** ViewTransitions do not re-run module scripts on every navigation.
4. **Pass server data through data attributes, not `define:vars`.** Data attributes survive the navigation model more reliably.
5. **Persist user preferences with `localStorage`.** State does not automatically persist across ViewTransitions.
6. **Server-render the default state.** The initial HTML should match the JavaScript state. Avoid flashing.
7. **Test real navigation.** Visit a page. Leave it. Return to it. Confirm state, hover, and layout still work.

## Essay Ordering

**Canonical Order:** Essays have a deliberate narrative order defined in `CANONICAL_ORDER` arrays, especially in `src/pages/index.astro`.

The order tells a story: vision, evidence, principles, resources, systems, examples.

Do not replace canonical order with date order unless the page explicitly asks for chronology.

**Date sorting:** Always use `.getTime()` when sorting Date objects.

```javascript
.sort((a, b) => b.data.date.getTime() - a.data.date.getTime()) // newest first
```

**Client-side sorting:** The server-rendered initial order must match the default client-side option. Otherwise the page flashes into a new order after load.

## Visual Design Principles

The site should feel calm, precise, and alive.

The goal is not decoration. The goal is trust.

### Subtlety over boldness

- Decorative elements should whisper.
- Use light greys (`#d0d0d0` or lighter) for numbers, dividers, and secondary marks.
- Reserve blue for interaction.
- Even interactive blue should be soft (`#a8c8e8`), never loud.

### Smoothness eliminates cognitive dissonance

- Avoid sharp edges. Use soft radius values (`3-4px`) unless a pill shape is intended.
- Gradients should fade gradually. Use multiple stops.
- Transitions should feel responsive, not jumpy. `0.25s` to `0.3s ease` is the range.
- Hover states should shift. They should not shout.

### Visual variety across pages

Pages should belong to the same world without becoming copies.

- Homepage Creative Works cards use soft grey gradients from the left edge.
- Essays list pages use quieter dividers and more whitespace.
- Subscribe is almost empty by design.

Variety keeps the site alive. Restraint keeps it coherent.

### Typography hierarchy

- Use Cormorant Garamond for titles, numbers, display text, and elegant controls.
- Use Inter for functional UI: dates, navigation, labels, metadata.
- Use light weights for decorative text.
- Use medium weights only when the interface needs clarity.

### Spacing and breathing room

- Cards and containers usually need `24-32px` of internal padding.
- Lists need stable vertical rhythm.
- Mobile can tighten spacing, but it should never feel cramped.

Whitespace is not absence. It is tempo.

### Responsive considerations

- Scale mobile type to roughly 85-90% of desktop.
- Reduce spacing slightly on small screens.
- Preserve proportions.
- Stack horizontal layouts when they begin to compress.

### Form controls

Default browser controls look too harsh for this site.

- Use pill shapes (`18px+` radius).
- Use subtle fills (`#f8f8f8`) and soft borders (`#e2e2e2`).
- Use Cormorant Garamond for elegant dropdowns.
- Use muted text (`#888`) that darkens on hover (`#666`).
- Centre text when option widths vary.
- Controls should feel integrated with the page, not bolted on.

### Simplicity as the ultimate sophistication

When an element is hard to tune, consider deleting it.

Every element must earn its place. If it does not add value, remove it.

A sparse page with perfect proportions beats a cluttered page with helpful extras.

The Subscribe page is the model: headline, one-line intro, form. Nothing else.

### Iterative refinement

Visual perfection arrives late.

The first 90% is broad strokes. The last 10% is where the work is.

Cognitive dissonance is a signal. If something feels off, keep looking. The problem is usually spacing, hierarchy, edge shape, or contrast.

The owner iterates by negation: "not that, not that either, nearly there." Trust that process.

When feedback says "doesn't work at all," investigate before changing. The wrong fix can preserve the underlying mistake.

### Let the words carry themselves

Strong lines do not need `<strong>` tags.

Do not sell the work. Let it stand.

- Avoid phrases like "three simple ideas". Use "three ideas".
- Use grey borders as the default state.
- Use accent colour only on interaction.
- Let the homepage be slightly larger than interior pages, but still restrained.

### Page-specific calibration

- Homepage: slightly more prominent type, around `23-25px`, because it sets the tone.
- Interior pages: quieter body scale.
- Essays page: more rhythm, fewer surfaces.
- Subscribe page: minimal.

Each page earns its proportions from its density.

### Interactive feedback

Every clickable element needs visible feedback.

Visible means noticeable:

- Background: `#f8f8f8` to `#eee`
- Border: `#e2e2e2` to `#ccc`
- Text: `#888` to `#333`

Too subtle is invisible. Test with your own cursor.

### CSS specificity

Inline styles override class selectors and pseudo-classes.

If hover does not work, check for inline styles first.

Move interactive styles into CSS. Hover, focus, and active states belong in stylesheets, not inline attributes.

### Custom form validation

Browser validation bubbles are too harsh for the aesthetic.

- Use `novalidate`.
- Implement custom JavaScript validation.
- Error borders should be soft dusty rose (`#d4a5a5`).
- Error text should be muted coral (`#b88`).
- Clear errors on input.

## Prose Writing Guide

This guide protects the standard of the canon.

It covers two layers:

1. **The argumentative layer:** what to claim, what to prove, and how to structure the movement.
2. **The prose layer:** how to write sentences that carry complex ideas without strain.

Both matter.

A strong argument in weak prose is forgettable. Clean prose around a weak argument is polished nothing.

The reference essays are **Create an Age of Wonders** and **Perceptual Abundance**.

They solve different problems.

**Create an Age of Wonders** is the manifesto reference. It names the belief system. It turns physics, energy, materials, computation, and biology into a claim about moral possibility. Its danger is generic futurism. Its solution is mechanism, number, physical example, and agency.

**Perceptual Abundance** is the perceptual reference. It does not argue by declaration. It leads the reader through thresholds: Earthrise, exoplanets, LIGO, the black hole image, Webb, Gaia, and daily planetary observation. Its danger is becoming a timeline. Its solution is sequence, sensory conversion, and section endings that change what the evidence means.

Together they define the method:

The world is already larger than our inherited systems admit. The essay gives the reader access to that fact.

---

## Argumentative Guide

### The canonical argument pattern

The canon does not argue from possibility alone.

The move is always:

1. **Name what is already true.** Physics. Observed data. Running systems. Existing instruments. Current cost curves.
2. **Name the access constraint.** What prevents the world from using what is already there?
3. **Name the mechanism of change.** What is changing the constraint now?
4. **Let the implication follow.** The reader draws the conclusion. The essay supplies the evidence.

"This could happen" is not enough.

"This is already true, and access is changing" is the canonical claim.

Every major essay has a mechanism:

- **Perceptual Abundance:** retrieval replaces inference.
- **Create an Age of Wonders:** intelligence, simulation, biotech, and energy infrastructure raise the creative ceiling.
- **Computational Abundance:** the cascade and plateau crossover move intelligence into the economy.
- **Bridge to Infinity:** the Pythagorean Dividend changes launch economics.
- **The Free Starship:** fuel autonomy turns a probe into a vessel.
- **The Solar Gravitational Lens:** the physics is already the instrument; computation becomes the camera.

If the mechanism cannot be named, the argument is not finished.

---

### The access frame

The connective thread of the canon is simple:

**The universe is abundant. Access is the constraint.**

Every essay should answer two questions:

1. What is abundant but inaccessible here?
2. What mechanism is changing access?

The essay does not always need to say the word "access". Often it is stronger if the reader arrives there alone.

Perceptual Abundance is the model. It almost never leans on canonical vocabulary. It shows instruments turning the universe from guesswork into retrieval. By the time access is named, the reader already understands it.

The danger is premature vocabulary.

Do not write:

> This is an access problem.

Show it:

> The Sun already delivers the power. The ocean already contains the fuel. The stars already emit the light. The bottleneck is capture, conversion, and distribution.

The word is earned when the paragraph has made it unavoidable.

---

### The two reference modes

#### Manifesto mode: Create an Age of Wonders

Manifesto mode states the belief system.

The movement is:

1. Name the civilisational moment.
2. Name the tools now entering the world.
3. Show that each tool already works in bounded form.
4. Convert possibility into access.
5. Convert access into moral obligation.
6. Return agency to the reader.

This mode is allowed to be grand. It is not allowed to be vague.

Every large claim needs a mechanism, a number, or an example within three sentences.

Weak:

> We are entering a revolutionary future.

Strong:

> We can design intelligence, simulate nature, and reprogram life.

The second line works because it names capacities, not mood.

#### Discovery mode: Perceptual Abundance

Discovery mode does not announce the thesis first. It stages revelation.

The movement is:

1. Begin with a human limit.
2. Introduce the instrument or event.
3. Show what became perceptible.
4. State the change in plain language.
5. End with a line that alters the reader's sense of reality.

Discovery mode is cumulative. Each section is simple. Together they become civilisational.

The sequence should feel like a widening aperture:

First, we saw Earth.

Next, we found other worlds.

Then, we felt spacetime.

We even made absence visible.

Finally, measurement became systematic.

And then perception became abundant.

Do not explain the thesis before the reader has experienced the evidence.

---

### Falsifiability

Every central claim should be capable of being wrong.

If a claim cannot be disproven, it is not a claim. It is a mood.

The test is simple:

Name one observable that would weaken or falsify the argument.

Computational Abundance does this explicitly through dated predictions. Other essays do it implicitly. The Solar Gravitational Lens depends on the physics. The Free Starship depends on fuel autonomy. Perceptual Abundance depends on measurement becoming more available, not less.

The optimism is load-bearing.

That is what separates the canon from motivational writing.

---

### Essay openings

Essay openings have one job: put the reader in contact with something real before the thesis arrives.

Open with:

- a place
- a moment
- a physical fact
- an instrument
- a number
- a constraint
- an image

Perceptual Abundance opens with history and human limitation: we looked at the stars and guessed.

Create an Age of Wonders opens with a civilisational moment, then names the tools that make the claim concrete.

The Free Starship opens on Saturn.

Bridge to Infinity opens with the sensation of launch.

The rule:

**Open with something that exists. Let the thesis arrive after contact.**

---

### The appendix as structural feature

Technical essays carry quantitative claims.

The body should remain readable. The maths should remain checkable.

Use the appendix for:

- arithmetic
- derivations
- assumptions
- sensitivity tables
- source calculations
- prediction registers

The body carries the argument. The appendix carries verification.

A reader who skips the appendix should still understand the essay. A reader who checks the appendix should respect the rigour.

---

### The canon's register: engineering scripture

The canon's register is best described as **engineering scripture**.

It has three parts:

- technical content
- liturgical cadence
- the revelation that reality is richer than our inherited systems admit

This is the tradition of natural theology reversed. Where natural theology argues from design to designer, the canon argues from design to obligation: the universe is structured this way, therefore this is the work.

The best lines join the technical and the mythic in one sentence:

> The physics is the instrument. Computation is the camera.

> The galaxy is not far. It is just not supplied.

> Hardware depreciates. Algorithms compound.

These are not poetic decorations placed over engineering claims. They are engineering claims written at mythic scale.

When prose is failing, ask:

Do the technical meaning and the mythic meaning converge?

If they pull apart, fix the sentence or fix the argument.

---

### Canon coherence

New essays should connect to the existing canon where the argument builds on prior work.

The Solar Gravitational Lens and The Free Starship are the model. One gives the map. The other gives the vessel.

Before publishing, ask:

1. Does the essay use the access frame?
2. Does it name its mechanism?
3. Does it connect to a prior essay where the argument continues?
4. Does it add a new tool, threshold, or inversion to the canon?

If it only repeats the worldview, it is not ready.

---

### The canon's structural tiers

The canon moves through three nested scales:

- **Foundation** (LitF, CAOW): the moral and intellectual ground — why abundance matters and what tools make it possible.
- **Infrastructure** (CA, Leviathan, BtI): the material systems that build and distribute access.
- **Reach** (SGL, TFS, PA): what becomes possible once those conditions are met.

The structure is recursive, not linear. PA is also the epistemological engine of the whole canon — the claim that the universe became *retrievable* (not just observable) is the underlying logic of every other essay. SGL retrieves coastlines. CA retrieves intelligence at ambient cost. BtI retrieves orbital access by removing the atmospheric constraint. The perceptual revolution PA describes is the canon's method, not only one of its subjects.

LitF, placed last, is structurally the deepest foundation. The canon earns it by building the superstructure first. By the time the reader arrives at "the scarcity is only ever local," they have seen it proven eight ways.

---

### Essay interdependencies

The essays hand off to each other:

- **SGL gives TFS its destinations.** Without the maps, the starship has no purpose.
- **TFS makes SGL's maps actionable.** Without vessels, maps are curiosity.
- **BtI makes TFS possible.** The starship requires the bridge before it can reach Saturn.
- **CA diffuses the intelligence that operates all of it.** Plateau models run navigation, planning, and analysis across the whole system.
- **Leviathan trains the frontier models that distil into CA's plateau.** The forge is upstream of the diffusion.
- **LitF provides the moral claim that makes all of it matter.** Without love as foundation, abundance is accumulation.
- **CAOW is the thesis. PA is the proof that the thesis is already partly true.**

A new essay should add a node to this graph — a new domain, mechanism, or inversion. If it only restates the worldview without connecting to the existing dependencies, it is not ready.

---

### The unwritten argument

The canon claims the universe is organised in favour of life across eight domains without ever arguing *why* this keeps being true. Each essay names a specific instance — the Sun bends light, hydrogen fuses, silicon computes, love founds — but no essay makes the meta-argument.

The ninth essay would make it: a universe that produces observers is necessarily a universe rich enough to support their emergence and persistence. Therefore it is a universe in which engineering works, in which access can be extended, in which the gap between what exists and what is accessible can be closed. The access frame is not an observation about technology. It is an observation about what kind of universe produces beings who can observe anything at all.

The closing line is already written: *If you can ask whether the universe is with you, you are already the answer.*

---

### The Model: What Perceptual Abundance Does

Perceptual Abundance is the clarity benchmark.

Its defining traits:

- **Graduate concept. Elementary syntax.** The subject matter is advanced. The sentence structure is simple.
- **Short declarative sentences.** One idea. One sentence. Stop.
- **One movement per paragraph.** If the paragraph makes two moves, split it.
- **Few hedges.** The essay asserts what the evidence supports.
- **Strong section closings.** Each section ends with a line that lands.
- **Sensory conversion.** Instruments become senses: we saw, felt, photographed, measured, kept.
- **Scale compression.** A grain of sand holds thousands of galaxies. A flower petal holds a material lighter than air.
- **Reader trust.** The essay does not recap what the reader can infer.

The lesson is not to make every essay sound like Perceptual Abundance.

The lesson is to make every essay that clear.

---

### The Model: What Create an Age of Wonders Does

Create an Age of Wonders is the manifesto benchmark.

Its defining traits:

- **Grand claims grounded quickly.** Every large claim is followed by a tool, number, example, or mechanism.
- **Catalogues with purpose.** AI, quantum computing, biotech, solar, fusion, aerogels, levitation, relativity, black holes. Each expands the boundary of the possible.
- **Access pivots.** The resource exists. The bottleneck is capture, conversion, distribution, cost, or infrastructure.
- **Moral infrastructure.** The moral argument comes after the physical constraint.
- **Agency after awe.** The essay enlarges the world, then returns responsibility to the reader.

The manifesto mode fails when it becomes aspiration.

It succeeds when it says:

This is real. This is measured. This is waiting for someone with vision and will.

---

## Prose Principles

### Principle 1: Lead with the positive assertion

The most common weakness is negative framing before the real claim.

> ❌ "The slot hierarchy is not a forecast. It is the current state of the world."
>
> ✅ "The slot hierarchy is already in motion."

> ❌ "That mistake is not an indictment of AI. It is the recurring error of every infrastructure cycle."
>
> ✅ "That mistake is the recurring error of every infrastructure cycle."

> ❌ "An intelligence layer is not a product. It is a property of the substrate."
>
> ✅ "An intelligence layer is a property of the substrate."

Every "X is not Y. It is Z." sentence should be tested as "X is Z."

If the positive version stands, cut the defensive setup.

Keep the contrast only when the contrast is the information.

> ✅ "A bridge delayed by two years is still a bridge. A GPU delayed by two years has crossed an architectural boundary."

Both halves matter there. The contrast carries the claim.

---

### Principle 2: Split compound sentences at natural beats

When a sentence joins two independent thoughts, test the split.

> ❌ "Compute is in the middle of that transition right now, and intelligence is following it."
>
> ✅ "Compute is in the middle of that transition right now. Intelligence is following it."

> ❌ "The bounded engineered system outperforms the raw neural network. That is the shape of plateau intelligence and the preview of how agentic workflows will mature across the economy."
>
> ✅ "The bounded engineered system outperforms the raw neural network. That is the shape of plateau intelligence."

The closing sentence carries the most weight.

Do not dilute it with trailing commentary.

When the line lands, stop.

---

### Principle 3: Break prose walls, especially data paragraphs

A paragraph over 100 words is usually a wall.

Find the hinge. Split it.

Data paragraphs need extra structure. When presenting several comparable subjects, give each subject its own paragraph.

> ❌ One 150-word paragraph covering OpenAI, xAI, and Anthropic financials.
>
> ✅ One setup sentence. One OpenAI paragraph. One xAI paragraph. One Anthropic paragraph. One conclusion.

The conclusion lands harder because the evidence is ordered.

---

### Principle 4: Section openers state the rule or stage the moment

The first sentence of a section should make a claim or create contact.

> ❌ "The hyperscaler preference stack does the rest of the work."
>
> ✅ "Premium power goes to premium silicon."

> ❌ "The mechanism by which the reset propagates..."
>
> ✅ "The important event is migration."

> ✅ "In April 2019, we made the Earth itself into a telescope."

A section opener does not need to explain. It needs to open the door.

---

### Principle 5: Cut hedges entirely

Hedges weaken claims without adding precision.

Delete on sight:

- "in significant part"
- "in large part"
- "somewhat"
- "relatively"
- "fairly"
- "it is worth noting"
- "notably"
- "in many ways"
- "in some sense"
- "may well"
- "arguably"

> ❌ "What has been priced as a vertical demand curve for compute is, in significant part, a vertical demand curve for optionality."
>
> ✅ "What has been priced as a vertical demand curve for compute is a vertical demand curve for optionality."

If the sentence feels too strong without the hedge, the claim is not ready.

Revise the claim. Do not hide behind the hedge.

---

### Principle 6: Keep anaphora rhythmically consistent

Parallel structures create momentum.

They break when one item is much longer than the others.

> ❌ "Each one cheap. Each one bounded. Each one verifiable. Each one operating on a substrate of compute that, at the margin, costs almost nothing."
>
> ✅ "Each one cheap. Each one bounded. Each one verifiable. Each one running on a substrate that, at the margin, costs almost nothing."

Read anaphora aloud.

If one item takes longer to say, trim it or move it out of the sequence.

---

### Principle 7: Section closers land without explanation

The last sentence of a section is the line the reader carries.

Strong closers from the canon:

- "LIGO detected it."
- "Something evolution never equipped us to perceive."
- "The deep past became retrievable."
- "We didn't just find the universe. We kept it."
- "Hardware depreciates. Algorithms compound."
- "The frontier is the laboratory. The plateau is the economy."
- "The Age of Wonders is something we can create, today."
- "Courage is."

A closer should not explain itself.

Do not add:

- "which shows that..."
- "this is why..."
- "as we have seen..."
- "in the next section..."

The section has done the work. The closer names the arrival.

---

### Principle 8: DataInsight components crystallise

`<DataInsight>` has two fields: `insight` and `context`.

Both should be sharper than the prose around them.

> ❌ `insight="A GPU goes out of fashion quickly." context="Time changes how we value it."`
>
> ✅ `insight="A GPU delayed by two years has crossed an architectural boundary." context="A bridge delayed by two years is still a bridge."`

The component should hold the sentence a reader would screenshot.

If it is vaguer than the body text, remove it or rewrite it.

---

### Principle 9: Keep subjects consistent within sentences

A sentence that changes subject mid-clause makes the reader stumble.

> ❌ "Run the same model on the older silicon and the run takes longer, costs more in energy..."
>
> ✅ "Running the same model on older silicon takes longer, costs more in energy..."

The fix is usually simple:

- make the implied subject explicit
- convert an imperative into a gerund
- split the sentence

Clarity often comes from restoring the actor.

---

### Principle 10: Cut trailing commentary after a strong line

After a sentence lands, stop.

> ❌ "The Stockfish architecture is what deployable AI already looks like, and a preview of how agentic workflows will mature across the economy."
>
> ✅ "The Stockfish architecture is what deployable AI already looks like."

The body should carry the implications.

The closing line should not carry luggage.

---

### Principle 11: Replace em dashes with full stops or commas

Em dashes are useful. They are also addictive.

Test every one:

1. Could this be two sentences? Use two sentences.
2. Is the second clause brief and subordinate? Use a comma.
3. Is it introducing a list? Use a colon.
4. Is it a true reveal, interruption, or necessary parenthetical? Keep the dash.

> ❌ "Compute is silicon in racks in halls connected to substations — the kind of infrastructure that takes years to permit."
>
> ✅ "Compute is silicon in racks in halls connected to substations. It takes years to permit."

> ❌ "The distribution layer — verification, observability, permissions, rollback — is being built."
>
> ✅ "The distribution layer is being built: verification, observability, permissions, rollback."

Keep em dashes for:

- appositive definitions where commas would blur the sentence
- name or concept reveals
- parenthetical lists with internal commas
- sharp rhythmic contrast

The signal is structural.

If removing the dash forces a split, the sentence probably needed splitting.

---

### Principle 12: Minimise compound and complex sentence structures

Compound and complex sentences are not wrong.

Accumulated complexity is the problem.

> ❌ "The frontier labs will keep training larger models on the newest hardware, and the labs are correct to do this."
>
> ✅ "The frontier labs will keep training larger models on the newest hardware. They are correct to do this."

> ❌ "The mechanism by which the reset propagates may be quieter than the fibre crash, because hyperscaler balance sheets are larger than the telecom carriers' were, and internal cascading absorbs more of the inventory before it ever reaches an external market."
>
> ✅ "The reset may be quieter than the fibre crash. Hyperscaler balance sheets are larger than the telecom carriers' were. Internal cascading absorbs more inventory before it reaches an external market."

Long sentences are allowed when rhythm demands them.

They should be earned, not accidental.

---

### Principle 13: Replace vague quantifiers with exact figures

Vague scale weakens wonder.

Exact scale creates it.

Replace:

- "many" with a number
- "large" with a figure
- "substantial" with a figure
- "significant" with a figure
- "rapid" with a rate
- "most" with a percentage

> ❌ "OpenAI reported heavy losses and stalling user growth."
>
> ✅ "OpenAI reported a -122% operating margin. Weekly active users stalled at 905 million."

> ❌ "Hyperscalers have issued substantial corporate debt."
>
> ✅ "Hyperscalers issued $121 billion in corporate bonds in 2025."

When the exact number is unknown, use a range or an order of magnitude.

"Roughly $100 million" is stronger than "significant cost".

---

### Principle 14: End sections with a close, not a bridge

Do not end a section by previewing the next one.

> ❌ "The backbone is built. Now the question is how the cascade begins."
>
> ✅ "Liquidation makes headlines. Redistribution is what changes the world."
>
> [Next heading: **V. The Repricing Mechanism**]

The heading can bridge.

The closer should land.

Readers do not need a tour guide between sections. They need momentum.

---

### Principle 15: Avoid rhetorical questions

Rhetorical questions usually delay the answer.

> ❌ "So what happens when frontier hardware gets evicted? The cascade begins."
>
> ✅ "The cascade begins when frontier hardware gets evicted."

> ❌ "Why does coding dominate AI revenue? Because it already had the scaffolding."
>
> ✅ "Coding dominates AI revenue because it already had the scaffolding."

Use a rhetorical question only when the pause is the effect.

Once per essay is usually enough.

---

### Principle 16: Name the actor

Passive voice hides agency.

> ❌ "Level 4 was demonstrated around 2016."
>
> ✅ "Google and Waymo demonstrated Level 4 around 2016."

> ❌ "The expansion was collapsed by a mix of financing complexity and demand revisions."
>
> ✅ "OpenAI revised its demand forecasts. The financing complexity did the rest."

Name the actor when the actor matters.

Passive voice is fine when the actor is unknown, irrelevant, or naturally subordinate to the object.

---

### Principle 17: Cut filler intensifiers

Intensifiers usually weaken the words they modify.

Delete:

- very
- really
- quite
- truly
- deeply
- highly
- extremely
- quite simply

> ❌ "A very scarce resource."
>
> ✅ "A scarce resource."

> ❌ "This is a truly counterintuitive result."
>
> ✅ "This is counterintuitive."

If the sentence feels weak without the intensifier, replace the noun or verb.

Do not inflate the modifier.

---

### Principle 18: Fragment sentences are intentional

Fragments are allowed when they create a beat.

> "The magic is in the assembly."
>
> "LIGO detected it."
>
> "Not before."
>
> "Courage is."

Do not pad a working fragment into a full sentence.

A short standalone paragraph is not an orphan. It is a rest beat.

Merging it into the previous paragraph destroys the rhythm.

---

### Principle 19: Preserve register

Different essays speak differently.

The canon has four main registers:

- **Personal narrative:** embodied, direct, emotionally specific.
- **Technical exposition:** precise, quantified, patient.
- **Analytical:** mechanism-led, data-anchored, formally reasoned.
- **Visionary-accessible:** declarative, physical, generous, broad.

Apply the principles within the register.

Do not flatten every essay into the same voice.

Create an Age of Wonders carries the highest risk of generic language. The fix is always mechanism.

Replace mood with matter.

---

### Principle 20: Concept capitalisation is deliberate

When the canon treats an abstract word as a named concept, capitalisation can be correct.

Examples:

- **Abundance** in Create an Age of Wonders
- **Slot** in Computational Abundance

Capitalisation signals that the word is doing the work of a proper noun. It marks the concept the essay defines and builds around.

Do not lowercase these automatically.

But do not capitalise ordinary nouns.

"Energy abundance" stays lowercase when it is descriptive.

"Abundance changes the equation" can take a capital when Abundance is the thesis.

The test:

Is the word acting as a name?

If yes, preserve it.

---

### Principle 21: One inversion at a time

The canon runs on inversion.

Scarcity becomes access.

Distance becomes supply.

Observation becomes retrieval.

Intelligence becomes infrastructure.

Waste becomes asset.

Impossibility becomes engineering.

Do not stack several inversions in one paragraph. The reader cannot hold them all.

Give each turn room.

> ✅ "Reality stopped being inference. It became retrieval."

That works because it is one turn, alone.

If a paragraph contains two inversions, split it.

If it contains three, expand before condensing.

---

### Principle 22: Use connective tissue between aphorisms

Too many strong sentences in a row become percussion.

Keep the best aphorisms. Add movement around them.

Movement sentences carry the reader from one landed claim to the next.

They do not need to dazzle.

Examples:

> "The shift happened slowly, then quickly."

> "The infrastructure arrived before the culture knew what to call it."

> "The mechanism is not new. Only the scale is."

A movement sentence is not padding.

It is pacing.

---

### Principle 23: Spelling and hyphenation consistency

Use British conventions.

Check:

- `datacentre`, not `data center`
- `optimisation`, `organisation`, `recognised`
- `aluminium`
- `defence`
- `licence` as noun, `license` as verb only when needed
- `metre`, not `meter`

Also check for trailing spaces. They accumulate invisibly.

---

### Principle 24: High conceptual density through elementary syntax

Heavy concepts need simple syntax.

Do not make the sentence imitate the complexity of the idea.

The harder the concept, the cleaner the sentence.

> ❌ "By utilising an interferometer to track spatial distortions smaller than one ten-thousandth the width of a proton, LIGO successfully detected the binary black hole merger."
>
> ✅ "LIGO measured a distortion smaller than a proton. It detected the merger."

> ❌ "When high-field diamagnetic levitation is amplified to sufficient Tesla output, counteracting the gravitational force on living tissue effectively renders gravity optional."
>
> ✅ "Amplify that field enough, and gravity becomes optional."

The test:

Could a ten-year-old parse the sentence structure on first reading?

The idea can be advanced. The syntax should be clear.

---

### Principle 25: Use tactile anchors for impossible scale

Astronomical and microscopic numbers need physical anchors.

The reader cannot feel "13 billion years" or "0.16 milligrams per cubic centimetre" without help.

Give the scale a body.

Use:

- a grain of sand
- a flower petal
- a gallon of seawater
- a proton's width
- a city block
- a human lifetime
- a map anyone can open

> ❌ "Webb imaged a small patch of sky containing thousands of distant galaxies."
>
> ✅ "Hold a grain of sand at arm's length. That is the patch of sky. Inside it: thousands of galaxies."

> ❌ "Graphene aerogel has extremely low density."
>
> ✅ "Graphene aerogel is frozen air with a carbon skeleton. You can balance it on a flower petal without bending the stem."

Scale without touch is abstraction.

Scale with touch becomes wonder.

---

### Principle 26: Build the moral bridge from infrastructure

Do not jump from technology to virtue.

Build the bridge.

The movement is:

1. Physical resource.
2. Access constraint.
3. Social pressure.
4. Moral expansion.

Weak:

> "Energy abundance will make humanity better."

Strong:

> "When energy is scarce, every choice means sacrifice. When energy becomes cheap, whole categories of forced trade-off disappear."

Best:

> "Abundance does not guarantee good choices. It removes the false excuse that cruelty is necessary."

The canon's moral claims work because they are downstream of physics.

---

### Principle 27: Use the pre-existence rule

Do not frame the future as conjuring abundance from nothing.

Frame it as gaining access to what was already there.

Weak:

> "Technology will create abundance."

Strong:

> "Abundance was already present. Technology changed our access to it."

This produces humility.

The universe is not waiting for humanity to become impressive. It is waiting for us to build the bridge.

---

### Principle 28: Erase the intermediary when the instrument can witness directly

Bureaucratic prose weakens wonder.

When the instrument is the point, let it meet reality directly.

Weak:

> "Scientists analysed data from interferometers that confirmed gravitational waves."

Strong:

> "LIGO detected it."

Weak:

> "Researchers used global radio observatories to produce an imaging model of a black hole."

Strong:

> "In April 2019, we made the Earth itself into a telescope."

Use sensory verbs when the instrument earns them:

- saw
- felt
- heard
- photographed
- measured
- mapped
- kept
- retrieved

Do not fake the sense. Earn it with the mechanism.

---

### Principle 29: First-time sentences create historical voltage

Perceptual Abundance uses first-time sentences because it is about thresholds.

Use them only when the threshold is real.

> "This was the first time we saw Earth as a whole."

> "This was the first time we felt gravitational waves."

> "The result was the first photograph of a black hole."

The test:

Could the sentence sit on a museum wall?

If yes, it may belong.

If not, remove the false historicity.

---

### Principle 30: Agency must follow awe

Do not leave the reader small.

Awe opens the world. Agency brings the reader back into it.

Create an Age of Wonders closes by returning responsibility to the builder.

The movement is:

1. The tools exist.
2. The facts are real.
3. The infrastructure is buildable.
4. Permission is unnecessary.
5. Courage is the bottleneck.

Never end only in wonder.

End with the work.

---

## The Five Magic Patterns

The 30 prose principles keep the writing clean. These five patterns are what make it unforgettable.

They are derived from the two canon benchmarks: **Create an Age of Wonders** and **Perceptual Abundance**. Every passage in those essays that makes a reader stop, re-read, or carry a line away uses one of these five moves.

Apply them diagnostically. When an essay is technically clean but feels flat — a section closes without landing, a claim is accurate but doesn't resonate — one of these patterns is missing or misfiring.

---

### Pattern 1: The Compression Drop

Build up. Then drop short.

A long sentence or paragraph charges the reader with scale, consequence, or mechanism. Then a very short sentence — under eight words — inherits all that weight without explaining it. The short sentence does not summarise. It witnesses.

> *Build:* Two black holes, each dozens of times more massive than the Sun, had spiralled into each other 1.3 billion light-years away. The collision sent ripples through spacetime. Those waves stretched and squeezed space by less than one ten-thousandth the width of a proton.
>
> *Drop:* **"LIGO detected it."**

> *Build:* Quantum computing will expand our ability to simulate how matter behaves at the atomic level. Biology already does this — muscles, shells, spider silk, coral, all made with simple elements, yet stronger, lighter, and more adaptive than most human-made materials.
>
> *Drop:* **"The magic is in the assembly."**

> *Build:* The Age of Wonders is something we can create, today. And intelligence is no longer the bottleneck.
>
> *Drop:* **"Courage is."**

The ratio matters. The drop should be under eight words. The build must do all the work, so the drop can be pure arrival.

**The test:** can the drop sentence stand alone, before the build? If yes, the build is not long enough. The compression moment works only when the sentence inherits weight it did not create.

---

### Pattern 2: The Physical Anchor

Abstract or impossible scale becomes real through one specific physical object or gesture.

Not "enormous" but "a grain of sand at arm's length." Not "extremely light" but "balance it on a flower petal without bending the stem." Not "very deep" but "sealed at two hundred metres."

> "Hold a grain of sand at arm's length. That is the patch of sky. Inside it: thousands of galaxies."

> "Graphene aerogel, essentially frozen air with a carbon skeleton, has a density of 0.16 milligrams per cubic centimetre. You can balance it on a flower petal without bending the stem."

> "One gallon of seawater, properly harnessed, holds the energy equivalent of hundreds of gallons of gasoline."

> "A pod is an AI supercomputer sealed at two hundred metres."

The anchor must be specific enough to feel. "A large area" does not work. "A city block" works. "The width of a proton" works. The rule is: can the reader's body respond to it? If not, the anchor is still abstraction.

This is Principle 25 at its most distilled: the number or physical object is doing the work that "enormous" cannot.

---

### Pattern 3: The Staircase Close

A section or essay closes with a sequence of sentences that get shorter. The final sentence is irreducible.

> "The Age of Wonders is something we can create, today. And intelligence is no longer the bottleneck. **Courage is.**"

> "Abundance did not arrive. It was always here. What arrived was the ability to retrieve it."

> "Reality stopped being inference. It became retrieval."

> "Liquidation makes headlines. Redistribution changes the world."

> "The frontier is running out of land. The ocean has been there the whole time."

The staircase works because each step down tightens the claim. By the time the shortest sentence arrives, the reader has been trained by the longer sentences above it. The final line lands with everything the staircase built.

**The test:** read only the last sentence of the section. Does it carry the section's argument in compressed form? If it needs the sentences above it to make sense, it may be a good closer — but it is not a staircase close. A staircase close is the section distilled to its single most irreducible sentence.

---

### Pattern 4: The Threshold Sentence

A single sentence that names a crossing — an irreversible first, a moment before which something was impossible and after which it is not. These sentences create historical voltage.

> "This was the first time we saw Earth as a whole."

> "This was the first time we felt gravitational waves."

> "In April 2019, we made the Earth itself into a telescope."

> "After 1995, finding another world became background noise."

The threshold sentence is not a claim about potential. It is a claim about something that already happened, stated with the weight of the fact that it can never unhappen.

**The test:** could this sentence sit on a museum wall without the essay around it? If yes, it may belong. If not, remove the false historicity. The threshold sentence must name a real crossing.

Use sparingly. One or two per essay. Perceptual Abundance uses them as its structural spine, which is why they work there — each section marks a genuine threshold. In other essays, they appear once, at the essay's pivot.

---

### Pattern 5: The Access Inversion

The exact moment where the essay names what changed — not what exists, but what changed about access to it. The resource was already there. The constraint dissolved. State the dissolution as arrival.

> "Reality stopped being inference. It became retrieval."

> "Abundance did not arrive. It was always here. What arrived was the ability to retrieve it."

> "The challenge is capture, conversion, and distribution." *(stating the actual limit, not the resource)*

> "The frontier is running out of land. The ocean has been there the whole time."

> "The galaxy is traversable. It's just not supplied."

This is Principle 27 (the pre-existence rule) in motion. The resource pre-exists. The essay names the moment access changed. The access inversion is the canonical thesis of the entire series, stated in miniature: the universe is already abundant; the bottleneck is always access; something is now changing that.

Every essay should have one. It is often the best candidate for the closing staircase.

---

These five patterns work together. A Physical Anchor inside a build-up earns the Compression Drop that follows. A Threshold Sentence marks the moment the Access Inversion makes possible. A Staircase Close restates the Access Inversion in its irreducible form.

When an essay has all five, it feels like the canon.

When it is missing one, it reads as clean but not quite right.

Find the missing pattern. Add it. That is usually the difference between a good essay and an unforgettable one.

---

## Prose editing checklist before shipping

Before any essay goes live, run this pass.

1. **Mechanism check:** Can the essay's access-change mechanism be named in one sentence?
2. **Access check:** What is abundant but inaccessible? What changes access?
3. **Falsifier check:** What observable would weaken or falsify the claim?
4. **Opening check:** Does the essay open with something real before the thesis arrives?
5. **Positive assertion check:** Search for "not X, it is Y" and test "X is Y".
6. **Sentence length check:** Split sentences over 40 words unless the rhythm earns them.
7. **Paragraph wall check:** Split paragraphs over 100 words, especially data paragraphs.
8. **Section opener check:** Does each section open with a rule, moment, or claim?
9. **Section closer check:** Does each section end with a line that lands?
10. **Bridge removal:** Cut section endings that preview the next section.
11. **Hedge purge:** Remove "somewhat", "relatively", "notably", "in significant part", "in many ways", "arguably".
12. **Intensifier purge:** Remove "very", "really", "quite", "truly", "deeply", "highly", "extremely".
13. **Em dash check:** Replace with full stops, commas, or colons unless the dash is structural.
14. **Compound sentence check:** Test every ", and" and ", but" between independent clauses.
15. **Passive voice check:** Name the actor when the actor matters.
16. **Vague quantity check:** Replace "many", "large", "substantial", "significant", "rapid", "most" with figures or ranges.
17. **Anaphora check:** Read parallel lists aloud. Trim the item that breaks the beat.
18. **Aphorism spacing:** Add movement sentences around strong lines if the section becomes percussion.
19. **Inversion count:** One conceptual inversion per paragraph.
20. **Canonical vocabulary check:** Are words like abundance, access, substrate, frontier, and infrastructure earned?
21. **Concept capitalisation check:** Preserve capitals only when the word acts as a named concept.
22. **Register check:** Is the piece personal, technical, analytical, or visionary-accessible?
23. **Scale anchor check:** Does every impossible scale have a tactile anchor?
24. **Moral bridge check:** Does the moral claim follow from physical constraint and infrastructure?
25. **Sensory verb check:** Do instruments witness directly where the mechanism supports it?
26. **DataInsight check:** Is every component sharper than the prose around it?
27. **Image and caption check:** Does the visual advance the argument, not just decorate it?
28. **Semicolon purge:** Replace semicolons with full stops unless the sentence truly needs one.
29. **Transitional adverb purge:** Replace "However", "Furthermore", "Consequently", and "Therefore" with "But", "And", "So", or a direct assertion.
30. **British spelling pass:** Check metre, organisation, optimisation, defence, aluminium, and datacentre.
31. **Whitespace pass:** Remove trailing spaces.
32. **Read-aloud pass:** Mark every stumble. A stumble usually means a fused sentence, early abstraction, or broken rhythm.
33. **Title circuit:** Read the title, subtitle, and final sentence together. They should form a circuit.
34. **Compression drop:** Does the essay's heaviest claim land in under eight words, after a sufficient build? If no sentence is that short and that loaded, the compression drop is missing.
35. **Physical anchor:** Does every claim of impossible scale have a specific physical object or gesture attached? "Enormous" is not an anchor. "A grain of sand at arm's length" is.
36. **Staircase close:** Does the essay's final section close with sentences that shorten toward an irreducible last line? Read only the closing sentence. Does it carry the essay's argument in compressed form?
37. **Threshold sentence:** If the essay marks a genuine first-time crossing, is it named as such — stated with the weight of something that can never unhappen?
38. **Access inversion:** Does the essay name the exact moment the constraint dissolved — not what exists, but what changed about access to it? This is usually the best candidate for the staircase close.
39. **Five-pattern audit:** When prose is technically clean but flat, check which of the five magic patterns is absent from the weakest section. Add it. That is usually the repair.

---

### Component usage

- `<Callout type="highlight">` — examples, quotes, rule summaries, and major conceptual handles.
- `<Callout type="info">` — definitions, structured reference material, and compact lists.
- `<DataInsight>` — metrics, contrasts, scale inversions, and screenshot-worthy claims.
- `<PullQuote>` — the one line per section a reader would quote. Place it at the climax, not the setup.
- `<SummaryBox>` — actionable takeaways at the end of long essays.

Components are not decoration.

They are crystallisation.

If a component is weaker than the prose around it, rewrite it or remove it.

## Recent Fixes Applied

1. **Date Schema Fix:** Changed the date field from `z.string()` to `z.coerce.date()` in the content config. Dates now parse correctly.
2. **Date Sorting:** Updated date sorting to use `.getTime()` for proper Date object comparison.
3. **Date Display:** Added proper formatting with `toLocaleDateString()` in essay pages.
4. **Dynamic Routes:** Fixed `[...slug].astro` to use `getEntry()` with a proper `getStaticPaths()` export.
5. **RSS Feed:** Updated RSS generation to pass Date objects directly to `pubDate`.
6. **Essays Page Sort:** Added server-side sorting to match the default client-side "newest first" option. This prevents content flash.
7. **Sort Preference Persistence:** Added `localStorage` so essay sort preference survives cached navigation.
8. **ViewTransitions Script Fix:** Refactored essay sorting to use `astro:page-load` instead of `define:vars`. Scripts now reinitialise on every navigation.
9. **Service Worker Cache Strategy:** Changed from pure stale-while-revalidate to smart routing: network-first for HTML, cache-first for assets. Bumped to v3.
10. **Stale-While-Revalidate Everywhere:** Simplified the service worker to stale-while-revalidate for all requests. Cached pages load instantly. Background fetch updates the cache for the next visit. Bumped to v5.
11. **Creative Works Cards Refinement:** Replaced sharp borders and heavy hover effects with smooth multi-stop gradients, soft radius, and a gentle blue hover tint.
12. **Essays Sort Dropdown:** Restyled the native select into an elegant pill with Cormorant Garamond, centred text, and subtle hover states.
13. **Subscribe Page Simplification:** Reduced the page to the essentials: headline, one-line intro, form.
14. **Homepage Intro Refinement:** Removed bold tags, toned the accent to grey, and settled on a prominent but restrained size.
15. **Custom Form Validation:** Replaced browser validation bubbles with soft custom error states using `novalidate` and JavaScript.
16. **Share Component Restyle:** Converted boxy buttons with brand-coloured hovers into pill buttons with uniform grey hover states.
17. **Hover State Consistency:** Increased hover contrast across interactive elements so feedback is visible.
18. **Sort Dropdown Styling:** Essays sort uses a smaller pill with `appearance: none`. The pill shape supplies the affordance.
19. **CSS Specificity Fix:** Moved inline styles into the stylesheet for the essay CTA button so hover states could work.
20. **Essays Page Double Line Fix:** Removed the final item border to prevent a double line against the footer.
21. **Dropdown Arrow Removal:** Removed custom SVG arrows from selects. The pill is cleaner without them.
22. **Text Centring in Pills:** Added `text-align: center` for select elements so variable option text stays balanced.
23. **Page Spacing Balance:** Tuned top and bottom spacing on the essays page so header, list, and footer feel symmetrical.
24. **Background Property Gotcha:** `background` is shorthand. Use separate `background-color`, `background-image`, and `background-position` when hover should change only one part.

## Social Media & Distribution

### Daily Social Loop

**Command:** "Run the daily social loop"

This runs the daily engagement workflow.

1. **Select content** from `private/content/one-liners.md`.
   - Choose one or two unused items.
2. **Post value tweets** through Typefully.
   - Social set: `277101`
   - X account: `@BJeremijenko`
   - No links in daily posts.
   - Pure insight.
   - Mark posted items as `[x]` in `one-liners.md`.
3. **Suggest reply targets.**
   - Look for relevant conversations worth joining.
4. **Log everything** in `private/content/posting-log.md`.

### Essay Launch Protocol

**Command:** "Launch [essay name]"

1. **Newsletter:** Buttondown subject, hook, key points, and link.
2. **X launch post:** One substantive post. Use arrows or bullets where useful. Put the link at the end. Do not make a thread by default.
3. **LinkedIn launch post:** Longer narrative version with more context. Link at the end.
4. **Daily value posts:** Create five to seven posts extracted from the essay for the following week.
   - X: punchy one-liners and structured posts.
   - LinkedIn: longer versions with professional framing.
   - Create separate Typefully drafts.
   - Use platform-specific content where needed.
5. **Update tracker** with draft links and posting links.

### Content Structure

```text
private/
├── .env                    # API keys: Typefully, Buttondown
├── social-strategy.md      # Full strategy documentation
└── content/
    ├── one-liners.md       # Content bank. Checkbox means posted.
    └── posting-log.md      # Posts, dates, and engagement metrics.
```

### API Access

**Typefully**

- Used for X and LinkedIn when connected.
- Social set `277101`: `@BJeremijenko` on X.
- Creates drafts, schedules posts, and publishes.
- Use `publish_at: "now"` for immediate posting.

**Buttondown**

- API key lives in `private/.env`.
- Create the email as a draft first.
- Set `status: "about_to_send"` only when ready.

### Engagement Philosophy

- **Links get derated.** Platforms penalise off-platform links.
- **Value-first posting compounds.** Build authority through insight before asking for attention.
- **Premium replies get lift.** Strong replies can outperform standalone posts.
- **Consistency beats virality.** Daily presence compounds.

### Open Technical Items

- [ ] Create `public/og-default.png` for social sharing previews.
- [ ] Add per-essay OG images.
- [ ] Reconnect LinkedIn to Typefully social set `277101`.
- [ ] Configure Buttondown favicon in the dashboard.
