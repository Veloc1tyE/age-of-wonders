# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Vision & Purpose

Age of Wonders is a body of writing and creative work exploring a simple belief system:

1. **The universe is abundant beyond our wildest dreams.**
2. **Scarcity is never necessary.**
3. **Access is the limiter.**

The content explores themes of:
- Material abundance and its relationship to moral expansion
- Energy as the fundamental determinant of living standards
- Long-term thinking and infrastructure that enables access
- Optimism about humanity's future without blind techno-utopianism
- Reaching for the stars, both literally and metaphorically

**Aesthetic:** Elegant, readable, thoughtful. Like a well-crafted essay collection. Clean typography (Cormorant Garamond + Inter), generous whitespace, focused on the content. The feeling is "quiet confidence" — the design assumes the content is worth reading rather than trying to convince you.

**The medium is the message.** If you're going to create something about wonders, the thing itself better be a wonder. The site's craft must embody the same standard as the ideas it contains. Every pixel, every interaction, every spacing decision — it all speaks. Mediocre execution would undermine the entire premise.

## Commands

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build production site to ./dist/
npm run preview  # Preview production build locally
```

## Architecture

This is an Astro 5 static site with MDX support and LaTeX math rendering.

**Key integrations:**
- MDX (`@astrojs/mdx`) - Write content in MDX format
- Math rendering - `remark-math` + `rehype-katex` for LaTeX equations in markdown/MDX
- RSS feed (`@astrojs/rss`) - Auto-generated RSS feed at `/rss.xml`

**Structure:**
- `src/pages/` - File-based routing (`.astro` and `.mdx` files become pages)
- `src/content/` - Content collections for essays (MDX files with frontmatter validation)
- `src/layouts/` - Page layout wrappers
- `src/components/` - Reusable Astro components
- `src/assets/` - Images and static assets processed by Astro
- `src/styles/` - Global CSS styles
- `public/` - Static files served as-is

**TypeScript:** Uses Astro's strict config (`astro/tsconfigs/strict`).

## Content Collections

Essays are managed using Astro's content collections:

- **Location:** `src/content/essays/`
- **Format:** MDX files with frontmatter
- **Template:** See `src/content/essays/_template.mdx` for a starting point
- **Schema:** Defined in `src/content/config.ts`
  - `title`: string (required)
  - `description`: string (optional)
  - `date`: date (required, format: YYYY-MM-DD)
  - `draft`: boolean (optional, defaults to false)

**Important:** The date field uses `z.coerce.date()` to automatically convert string dates to Date objects. When displaying dates, use `.toLocaleDateString()` or similar formatting methods.

### Adding a New Essay

1. Create a new `.mdx` file in `src/content/essays/` (use `_template.mdx` as a starting point)
2. Add frontmatter with title, description, and date
3. Write your content using Markdown/MDX
4. Set `draft: false` when ready to publish

Essays support:
- Standard Markdown formatting
- Math equations with KaTeX (`$inline$` and `$$block$$`)
- MDX components (can be extended)

## Deployment

The site is deployed via Vercel with automatic deployments from GitHub:
- **URL:** www.ageofwonders.org
- **Auto-deploy:** Any push to main automatically deploys to production
- **Critical:** Always run `npm run build` and verify it succeeds before pushing

## Development Workflow

### Before Committing
1. Run `npm run build` to verify the build succeeds
2. Check `npm run preview` if testing visual changes
3. Never push broken builds - they auto-deploy to production

### Commit Message Style
Follow these patterns based on commit history:

**For features/improvements:** Detailed messages with rationale
```
Add feature name

**Rationale:** Why this change matters

**What changed:**
- Bullet points for each change
- Technical details where helpful

**Result:** What the user experiences
```

**For bug fixes:** Concise but explanatory
```
Fix issue: Brief description

Explanation of what caused it and why this fix is correct.
```

## Performance & UX Priorities

**This site is optimized for lightning-fast, instant-feel navigation.** Do not degrade this UX.

**Performance targets:**
- First load: <200ms perceived
- Subsequent navigation: <50ms (instant feel)

**How it works:**
- **Service Worker** (`public/sw.js`): Stale-while-revalidate for everything
  - All requests: Instant from cache, background fetch updates for next visit
  - First visit to any page: Network fetch + cache
  - Subsequent visits: Instant from cache (~5-10ms), fresh content ready for next navigation
  - Cache version bumped on deploy clears old stale content
- **Astro ViewTransitions**: SPA-like instant navigation between pages without full reloads
- **Aggressive prefetching**: Viewport-based + mousedown/touchstart prefetch for instant clicks
- **Lazy-loaded images**: Progressive loading for optimal initial paint

**Critical rules when making changes:**
1. **Bump `CACHE_VERSION` in sw.js when making significant changes** - this clears old caches
2. **Never remove ViewTransitions** - they enable instant navigation
3. **Use `astro:page-load` event for client-side initialization** - ViewTransitions don't re-execute module scripts, so use this event to reinitialize on every navigation
4. **Pass server data via data attributes, not `define:vars`** - `define:vars` scripts don't work well with ViewTransitions; use data attributes on hidden elements instead
5. **Persist user preferences with localStorage** - state doesn't persist across ViewTransitions navigations
6. **Server-side render the default state** - ensure initial HTML matches what JavaScript will show to prevent content flashing
7. **Test navigation patterns** - visit page → navigate away → return to verify state persists

## Essay Ordering

**Canonical Order:** Essays have a deliberate narrative order defined in `CANONICAL_ORDER` arrays (see `src/pages/index.astro`). This tells a coherent story from vision → evidence → principles → resources → systems → examples.

**Date Sorting:** When sorting by date, always use `.getTime()` for proper Date object comparison:
```javascript
.sort((a, b) => b.data.date.getTime() - a.data.date.getTime()) // newest first
```

**Client-side sorting:** When adding client-side sorting, ensure the server-side initial render matches the default sort option to prevent content flashing.

## Visual Design Principles

The site aesthetic is elegant, minimal, and restrained. The goal is a feeling of calm virtuosity — smoothness that soothes the brain. When making UI changes, follow these principles:

**Subtlety over boldness:**
- Decorative elements (numbers, borders, accents) should whisper, not shout
- Use very light grays (#d0d0d0 or lighter) for subtle numbering or secondary elements
- Accent colors (blue) are reserved for interactive states (hover) — and even then, use soft variants (#a8c8e8) rather than bold primary accent

**Smoothness eliminates cognitive dissonance:**
- Avoid sharp edges — use soft border-radius (3-4px) on all corners, not just some
- Gradients should have multiple stops and fade gradually (e.g., 35%, 60%) — never abrupt cutoffs
- Transitions should be gentle (0.25-0.3s ease) — fast enough to feel responsive, slow enough to feel smooth
- Hover states should be subtle shifts, not dramatic changes

**Visual variety across pages:**
- Different pages should have distinct but cohesive aesthetics
- Homepage "Creative Works" uses soft gray gradients emanating from left borders, creating a sense of curated collection
- Essays list page uses a quieter approach: simple divider lines, no backgrounds, more whitespace
- This variety keeps the site from feeling monotonous while maintaining brand coherence

**Typography hierarchy:**
- Use Cormorant Garamond for display/decorative text (titles, numbers, elegant controls)
- Use Inter for functional UI elements (dates, navigation)
- Font weights should be light (300) for decorative elements, medium (500) for emphasis

**Spacing and breathing room:**
- Generous padding inside cards/containers (24-32px)
- Consistent vertical rhythm between list items
- Mobile should have slightly tighter spacing but never feel cramped

**Responsive considerations:**
- Scale font sizes down proportionally on mobile (roughly 85-90% of desktop)
- Reduce spacing slightly but maintain proportions
- Stack horizontal layouts vertically on mobile when needed

**Form controls (dropdowns, selects, buttons):**
- Avoid default browser styling — it looks dated and harsh
- Use pill shapes (border-radius: 18px+) with subtle fills (#f8f8f8) and soft borders (#e2e2e2)
- Cormorant Garamond works beautifully for elegant dropdowns
- Muted text (#888) that gently darkens on hover (#666)
- Center text for balanced feel when options vary in length
- Controls should feel integrated with the typography, not bolted-on widgets

**Simplicity as the ultimate sophistication:**
- When struggling to perfect an element's spacing or positioning, consider removing it entirely
- Every element must earn its place — if it doesn't add clear value, delete it
- A clean, sparse page with perfect proportions beats a cluttered page with "helpful" additions
- Subscribe page example: headline + one line intro + form. Nothing else needed.
- The "Low frequency, high quality" aside seemed helpful but created spacing complexity — removing it improved the whole

**Iterative refinement:**
- Visual perfection often requires many iterations (5-10+ rounds is normal)
- "90 to 100" is where most of the work happens — broad strokes are easy, details are hard
- Cognitive dissonance is a signal: if something feels "off" but you can't articulate why, keep iterating
- Sometimes the best solution is subtraction, not addition
- The owner iterates by negation: "not that, not that either, nearly there" — trust the process
- When feedback says "doesn't work at all," investigate thoroughly before making changes

**Let the words carry themselves:**
- Strong statements don't need `<strong>` tags — the content provides the weight
- Avoid "selling" language ("three simple ideas" → "three ideas")
- Gray borders (#e0e0e0) as default state; accent colors only on hover
- The homepage intro can be slightly larger than interior pages (it's the main landing) but should still feel restrained

**Page-specific calibration:**
- Homepage: slightly more prominent sizing (23-25px) since it's sparse and sets the tone
- Interior pages (About, Essays): standard body sizing to let content breathe
- Subscribe: minimal — just the essentials with elegant form controls
- Each page earns its proportions based on content density

**Interactive elements need visible feedback:**
- Every clickable element must have a noticeable hover state
- "Noticeable" means: #f8f8f8 → #eee background, #e2e2e2 → #ccc border, #888 → #333 text
- Too subtle (#f8f8f8 → #f0f0f0) is effectively invisible — users won't register the change
- Test hover states yourself — actually use the site and interact with every element

**CSS specificity matters:**
- Inline styles override class selectors, including hover pseudo-classes
- If hover isn't working, check for inline styles on the element
- Move styles to stylesheet when hover/focus/active states are needed
- Keep interactive element styles in CSS, not inline, to allow state changes

**Custom form validation:**
- Browser default validation tooltips are harsh and don't match refined aesthetics
- Use `novalidate` on forms and implement custom JavaScript validation
- Error states should be soft: dusty rose borders (#d4a5a5), muted coral text (#b88)
- Clear errors on input to provide immediate feedback

## Prose Writing Guide

This guide distils everything learned across the editing of Computational Abundance, using Perceptual Abundance as the prose model. Apply it when writing or editing any essay in this canon.

---

### The Model: What Perceptual Abundance Does

Perceptual Abundance is the prose benchmark for this body of work. Its defining characteristics:

- **Short declarative sentences.** One idea per sentence. Subject, verb, object. Done.
- **One idea per paragraph.** A paragraph makes a single move. If it's making two moves, split it.
- **No hedges.** The essay does not say "seems to" or "might be" or "in significant part." It asserts.
- **Strong section closings.** Every section ends on a line that lands without needing explanation.
- **The reader is trusted.** No hand-holding, no recaps, no "as we've seen."

---

### Principle 1: Lead with the positive assertion

The most common prose weakness in this canon: **negative framing before the real claim**.

> ❌ "The slot hierarchy is not a forecast. It is the current state of the world."  
> ✅ "The slot hierarchy is already in motion."

> ❌ "That mistake is not an indictment of AI. It is the recurring error of every infrastructure cycle..."  
> ✅ "That mistake is the recurring error of every infrastructure cycle..."

> ❌ "An intelligence layer is not a product. It is a property of the substrate."  
> ✅ "An intelligence layer is a property of the substrate."

**Rule:** Every "X is not Y. It is Z." sentence should be tested as "X is Z." If the Z form stands, cut the preamble. The defensive setup drains authority from the assertion it's defending.

The exception: when the contrast is the point and earns its own line — "A bridge delayed by two years is still a bridge. A GPU delayed by two years has crossed an architectural boundary." Here both halves are necessary. The test: does the negation add information, or just protect the claim?

---

### Principle 2: Split compound sentences at natural beats

When a sentence joins two independent thoughts with "and" or a comma, ask whether they're stronger apart.

> ❌ "Compute is in the middle of that transition right now, and intelligence is following it."  
> ✅ "Compute is in the middle of that transition right now. Intelligence is following it."

> ❌ "The bounded engineered system outperforms the raw neural network. That is the shape of plateau intelligence and the preview of how agentic workflows will mature across the economy."  
> ✅ "The bounded engineered system outperforms the raw neural network. That is the shape of plateau intelligence."

The closing sentence carries the most weight in any paragraph. Don't dilute it with trailing commentary. When the line lands, stop.

---

### Principle 3: Break prose walls — especially data paragraphs

A paragraph over 100 words with no natural hinge is a wall. Find the logical joint and split.

**Data paragraphs need their own structure.** When presenting figures on multiple comparable subjects (three labs, four projects, five generations), give each subject its own paragraph.

> ❌ One 150-word paragraph with OpenAI, xAI, and Anthropic financials concatenated together.  
> ✅ "The Q1 2026 financials make the asymmetry impossible to miss." [paragraph break] OpenAI paragraph. [break] xAI paragraph. [break] Anthropic paragraph. [break] Conclusion sentence.

The conclusion sentence then stands alone and hits harder precisely because the evidence preceded it clearly.

---

### Principle 4: Section openers state the rule, not the mechanism

The first sentence of a section should stake a claim. Not describe the process — claim it.

> ❌ "The hyperscaler preference stack does the rest of the work."  
> ✅ "Premium power goes to premium silicon."

> ❌ "The mechanism by which the reset propagates..."  
> ✅ "The important event is migration."

The section body explains and evidences the claim. The opener makes it.

---

### Principle 5: Cut hedges entirely — don't soften them

Hedges weaken assertions without adding accuracy. The instinct is to soften a bold claim; the effect is to undermine it.

Phrases to delete on sight:
- "in significant part" / "in large part" → delete or assert fully
- "somewhat" / "relatively" / "fairly" → delete
- "it is worth noting" / "notably" → delete; the fact speaks for itself
- "also already" → pick one; "already" is usually enough
- "in many ways" / "in some sense" → delete

> ❌ "What has been priced as a vertical demand curve for compute is, in significant part, a vertical demand curve for optionality."  
> ✅ "What has been priced as a vertical demand curve for compute is a vertical demand curve for optionality."

If the claim feels too bold without the hedge, the issue is the claim, not the hedge. Either commit or cut.

---

### Principle 6: Keep anaphora rhythmically consistent

Parallel structures ("Each one cheap. Each one bounded. Each one verifiable.") create momentum. That momentum breaks if the last item is longer than the others.

> ❌ "Each one cheap. Each one bounded. Each one verifiable. Each one operating on a substrate of compute that, at the margin, costs almost nothing."  
> ✅ "Each one cheap. Each one bounded. Each one verifiable. Each one running on a substrate that, at the margin, costs almost nothing."

When writing a list in anaphora: read it aloud. If one item takes longer to say than the others, trim it to match the beat.

---

### Principle 7: Section closers land without explanation

The last sentence of a section is the one readers carry with them. Write it as a statement that needs nothing after it.

Strong closers from this canon:
- "Liquidation makes headlines. Redistribution is what changes the world."
- "The first buyer takes the loss. The second buyer takes the asset."
- "Hardware depreciates. Algorithms compound."
- "The frontier is the laboratory. The plateau is the economy."
- "The arrival is what mattered."

What makes them work: they are complete, they do not hedge, they do not explain themselves, and they trust the reader to have followed the argument. The moment you add "which shows that..." or "this is why..." after a strong closing line, you've killed it.

---

### Principle 8: DataInsight components crystallise, not paraphrase

The `<DataInsight>` component has two fields: insight and context. Both should be **more specific than the surrounding prose**, not less.

> ❌ insight="A GPU goes out of fashion quickly." context="Time changes how we value it."  
> ✅ insight="A GPU delayed by two years has crossed an architectural boundary." context="A bridge delayed by two years is still a bridge."

The component should be the sharpest version of the idea — the sentence a reader would screenshot. If it's vaguer than the body text, it's not doing its job.

---

### Principle 9: Subject consistency within sentences

When a sentence implies a subject and then shifts mid-clause, the reader stumbles.

> ❌ "Run the same model on the older silicon and the run takes longer, costs more in energy..."  
> ✅ "Running the same model on older silicon takes longer, costs more in energy..."

The fix is usually: convert the imperative opener to a gerund, or introduce an explicit subject.

---

### Principle 10: Trailing commentary dilutes closing sentences

After a strong close, resist the urge to add a "this means that..." clause.

> ❌ "The Stockfish architecture is what deployable AI already looks like — and a preview of how agentic workflows will mature across the economy."  
> ✅ "The Stockfish architecture is what deployable AI already looks like."

The body of the section already argued what it means. The close just needs to name it and stop.

---

### Principle 11: Replace em-dashes with full stops or commas

Em-dashes are the default connector for complex thoughts. They should be the exception, not the habit.

**The test for every em-dash:**
1. Could this be two sentences? → Make it two sentences.
2. Is the second clause brief and subordinate? → Use a comma.
3. Is the dash creating a parenthetical aside that interrupts? → Use commas around it, or cut it.

> ❌ "Compute is silicon in racks in halls connected to substations — the kind of infrastructure that takes years to permit."  
> ✅ "Compute is silicon in racks in halls connected to substations. It takes years to permit."

> ❌ "The distribution layer — verification, observability, permissions, rollback — is being built."  
> ✅ "The distribution layer, including verification, observability, permissions, and rollback, is being built."  
> ✅ Or restructure: "The distribution layer is being built: verification, observability, permissions, rollback."

When em-dashes are acceptable:
- **Appositive definitions** where the dash names something: "the NNUE evaluation — a small neural network — is wrapped inside search code." The aside is essential, not decorative.
- **Sharp contrasts** where the dash creates a deliberate beat: "A bridge delayed by two years is still a bridge. A GPU delayed by two years — three generations behind." But test whether a full stop is still cleaner.

The signal that an em-dash is hiding a structural problem: if removing it forces you to split the sentence, the sentence needed splitting.

---

### Principle 12: Minimise compound and complex sentence structures

Compound sentences (two independent clauses joined by a conjunction) and complex sentences (main clause + subordinate clause) are not wrong. But they accumulate, and accumulated complexity reads as effort.

**Compound sentences:** usually split at the conjunction.

> ❌ "The frontier labs will keep training larger models on the newest hardware, and the labs are correct to do this."  
> ✅ "The frontier labs will keep training larger models on the newest hardware. They are correct to do this."

**Complex sentences with embedded subordinate clauses:** break into sequence.

> ❌ "The mechanism by which the reset propagates may be quieter than the fibre crash, because hyperscaler balance sheets are larger than the telecom carriers' were, and internal cascading absorbs more of the inventory before it ever reaches an external market."  
> ✅ "The reset may be quieter than the fibre crash. Hyperscaler balance sheets are larger than the telecom carriers' were. Internal cascading absorbs more inventory before it reaches an external market."

**Relative clauses that can be separate sentences:** break them out.

> ❌ "A frontier training run produces an input that must then be turned into intelligence the economy can apply."  
> ✅ "A frontier training run produces an input. Turning that input into intelligence the economy can apply is the distribution problem."

The goal is not to write like a telegram. Long sentences are sometimes exactly right — for rhythm, for listing, for effect. The goal is that every sentence's complexity is earned, not accidental.

---

### Principle 13: Spelling and hyphenation consistency

This canon uses British conventions. Check:
- "datacentre" (one word) — not "data-center" or "data centre"
- "optimisations" / "organisation" / "recognised" — not American -ize forms
- "aluminium" / "defence" / "licence" (noun)
- No trailing spaces at end of paragraphs (these accumulate invisibly)

---

### Prose editing checklist before shipping

Before any essay goes live, run through:

1. **Scan for "not X, it is Y" constructions** — test each as "is Y" alone
2. **Find every sentence over 40 words** — check for natural split points
3. **Find every paragraph over 80 words with data** — consider per-subject breaks
4. **Read section openers** — do they stake a claim or describe a mechanism?
5. **Read section closers** — do they land alone, or trail off with explanation?
6. **Search for:** "in significant part", "somewhat", "notably,", "also already", "is not a forecast", "in many ways"
7. **Check anaphora lists** — read aloud; all items should take similar time to say
8. **Check DataInsight fields** — are they sharper than the surrounding prose?
9. **Check every em-dash** — could it be a full stop? A comma? If yes, change it
10. **Check compound sentences** — every ", and" or ", but" between independent clauses is a candidate for a full stop
11. **Check trailing spaces** — run a search for `" \n"` or `"  "` in the file
12. **British spelling pass** — "datacentre", "-ise" endings, no stray Americanisms

---

### Component usage

- `<Callout type="highlight">` — example outputs, quotes, rule summaries
- `<Callout type="info">` — definitions, lists, structured reference information
- `<DataInsight>` — metrics or contrasts; must be sharper than body prose
- `<PullQuote>` — the one line per section a reader would quote; place at the climax, not the setup
- `<SummaryBox>` — actionable takeaways at the end of long essays

## Recent Fixes Applied

1. **Date Schema Fix:** Changed date field from `z.string()` to `z.coerce.date()` in content config to properly handle date parsing
2. **Date Sorting:** Updated all date sorting to use `.getTime()` for proper Date object comparison
3. **Date Display:** Added proper date formatting using `toLocaleDateString()` in essay pages
4. **Dynamic Routes:** Fixed `[...slug].astro` to use `getEntry()` with proper `getStaticPaths()` export
5. **RSS Feed:** Updated to pass Date objects directly to `pubDate` (no need for `new Date()` conversion)
6. **Essays Page Sort:** Added server-side sort to match default client-side "newest first" option, preventing content flash on page load
7. **Sort Preference Persistence:** Added localStorage to persist essay sort preference across cached navigation (ViewTransitions re-run scripts, so state must be stored externally)
8. **ViewTransitions Script Fix:** Refactored essays sorting to use `astro:page-load` event instead of `define:vars`, ensuring scripts reinitialize on every navigation
9. **Service Worker Cache Strategy:** Changed from pure stale-while-revalidate to smart routing: network-first for HTML (fresh content), cache-first for assets (instant feel). Bumped to v3.
10. **Stale-While-Revalidate Everywhere:** Simplified SW to use stale-while-revalidate for all requests. Cached pages load instantly (~5-10ms), background fetch updates cache for next visit. Perfect for static essay site. Bumped to v5.
11. **Creative Works Cards Refinement:** Replaced sharp borders/hover effects with smooth multi-stop gradients (`rgba(245,245,245,0.8) → rgba(250,250,250,0.3) 35% → transparent 60%`), soft border-radius on all corners, and gentle blue tint on hover.
12. **Essays Sort Dropdown:** Restyled from default browser select to elegant pill-shaped control with Cormorant Garamond, centered text, and subtle hover states.
13. **Subscribe Page Simplification:** Stripped to essentials (headline, one-line intro, form) after multiple iterations showed extra elements created more problems than they solved.
14. **Homepage Intro Refinement:** Removed bold tags, toned down warm accent to gray border, found middle-ground sizing (25px/23px) that's prominent without being loud. Words carry themselves.
15. **Custom Form Validation:** Replaced harsh browser validation tooltips with soft, on-brand error states using `novalidate` and custom JavaScript.
16. **Share Component Restyle:** Converted boxy buttons with brand-colored hovers to pill-shaped buttons with uniform subtle gray hovers.
17. **Hover State Consistency:** Increased hover contrast across all interactive elements (#f8f8f8 → #eee) so feedback is visible.
18. **Sort Dropdown Styling:** Essays sort uses smaller pill (14px font, 7px padding) with `appearance: none` to hide native arrow — the pill shape provides sufficient affordance.
19. **CSS Specificity Fix:** Moved inline styles to stylesheet for essay CTA button so hover pseudo-class could work.
20. **Essays Page Double Line Fix:** Removed border-bottom from last essay item to prevent double line with footer's border-top.
21. **Dropdown Arrow Removal:** Custom SVG arrows on select elements felt jarring — cleaner to use `appearance: none` with no arrow at all. The pill shape itself signals interactivity.
22. **Text Centering in Pills:** Use `text-align: center` for select elements to center text within the pill, especially important when option text varies in length.
23. **Page Spacing Balance:** Top and bottom spacing should feel symmetrical. On essays page: header margin-bottom (56px) balances with last item padding-bottom (16px) + footer margin-top (80px).
24. **Background Property Gotcha:** `background` is a shorthand — setting `background-color` on hover overrides `background-image`. Use separate properties (`background-color`, `background-image`, `background-position`) when you need hover to change only one aspect.

## Social Media & Distribution

### Daily Social Loop

**Command:** "Run the daily social loop"

This command executes the daily engagement workflow:

1. **Select content** from `private/content/one-liners.md` (1-2 unused items)
2. **Post value tweets** via Typefully (social set 277101)
   - No links in daily posts — pure insight
   - Mark posted items as `[x]` in one-liners.md
3. **Suggest reply targets** — scan for relevant conversations to engage with
4. **Log everything** to `private/content/posting-log.md`

### Essay Launch Protocol

**Command:** "Launch [essay name]"

1. **Newsletter** (Buttondown): Subject + hook + key points + link
2. **X launch post**: Single substantive post with arrows/bullets, link at end (not a thread)
3. **LinkedIn launch post**: Longer narrative version with more context, link at end
4. **Daily value posts**: 5-7 posts extracted from essay for the week
   - X: Mix of punchy one-liners and structured posts with arrows
   - LinkedIn: Longer versions with professional framing and context
   - Create as separate Typefully drafts, some "Both" with platform-specific content
5. **Update tracker** with links

**Social content style (from prior posts):**
- X uses `→` arrows for lists, single substantive posts (not threads for daily content)
- LinkedIn expands on X versions with more narrative and professional context
- Avoid "thread" format for daily content — save threads for deep dives
- Reference prior Typefully posts for tone calibration

### Content Structure

```
private/
├── .env                    # API keys (Typefully, Buttondown)
├── social-strategy.md      # Full strategy documentation
└── content/
    ├── one-liners.md       # Content bank (checkbox = posted)
    └── posting-log.md      # What was posted, engagement metrics
```

### API Access

**Typefully** (X, LinkedIn when connected):
- Social set 277101: @BJeremijenko (X)
- Creates drafts, schedules, publishes
- Use `publish_at: "now"` for immediate posting

**Buttondown** (Newsletter):
- API key in `private/.env`
- Create as draft, then set `status: "about_to_send"`

### Engagement Philosophy

- **Links get derated** — algorithms penalise off-platform links
- **Value-first posting** — build authority through insight, not asks
- **Premium reply boost** — quality replies get algorithmic lift
- **Consistency > virality** — daily presence compounds

### Open Technical Items

- [ ] Create `public/og-default.png` for social sharing previews
- [ ] Add per-essay OG images
- [ ] Reconnect LinkedIn to Typefully social set 277101
- [ ] Configure Buttondown favicon in dashboard
