# CLAUDE.md

This file guides Claude Code (claude.ai/code) when working in this repository.

It has two jobs.

First, keep the site fast, stable, and clean.

Second, protect the standard of the canon.

Age of Wonders is a body of work about abundance, access, and the future humanity can build. The implementation has to carry that belief. The prose has to carry it too.

## Vision & Purpose

Age of Wonders is a body of writing and creative work built on three ideas:

1. **The universe is abundant beyond our wildest dreams.**
2. **We can create a future of wonders.**
3. **Access is everything.**

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

### Pushing from a restricted network

SSH to GitHub is blocked here. Both `github.com:22` and the `ssh.github.com:443`
fallback time out, so the default `origin` (an `git@github.com:` SSH URL) cannot
push. HTTPS (port 443) works.

Do not waste time retrying SSH. Push over HTTPS using the authenticated `gh`
token, without changing the `origin` remote:

```bash
git push "https://x-access-token:$(gh auth token)@github.com/Veloc1tyE/age-of-wonders.git" main
```

This needs `gh auth status` to show a logged-in account with `repo` scope (it does).

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

1. **Bump `CACHE_VERSION` in `sw.js` when stale content matters.** Old pages persist otherwise.
2. **Never remove ViewTransitions.** They carry the instant-navigation feel.
3. **Use `astro:page-load` for client-side initialisation.** ViewTransitions do not re-run module scripts on every navigation.
4. **Pass server data through data attributes, not `define:vars`.** Data attributes survive the navigation model more reliably.
5. **Persist user preferences with `localStorage`.** State does not automatically persist across ViewTransitions.
6. **Server-render the default state.** The initial HTML should match the JavaScript state. Avoid flashing.
7. **Test real navigation.** Visit a page. Leave it. Return to it. Confirm state, hover, and layout still work.

## Essay Ordering

**Canonical Order:** Essays have a deliberate narrative order defined in `CANONICAL_ORDER` arrays, especially in `src/pages/index.astro`.

The order tells a story: vision, evidence, infrastructure, reach, human experience, love, and cosmology.

Do not replace canonical order with date order unless the page explicitly asks for chronology.

**Date sorting:** Always use `.getTime()` when sorting Date objects.

```javascript
.sort((a, b) => b.data.date.getTime() - a.data.date.getTime()) // newest first
```

**Client-side sorting:** The server-rendered initial order must match the default client-side option. Otherwise the page flashes into a new order after load.

## Visual Design Principles

The site should feel calm, precise, and alive.

The goal is trust.

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

- Use pill shapes (`18px+` radius). The pill shape supplies the affordance; selects need no arrows.
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

Two sanctioned exceptions: the essay's irreducible final line is bolded (the canon's signature chord, consistent across all essays), and bold may serve as structural navigation — Perceptual Abundance bolds its opener/closer spine, Bridge to Infinity bolds its name-reveal drops. Bold marks structure, never emphasis.

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

`background` is shorthand. Use separate `background-color`, `background-image`, and `background-position` when hover should change only one part.

### Custom form validation

Browser validation bubbles are too harsh for the aesthetic.

- Use `novalidate`.
- Implement custom JavaScript validation.
- Error borders should be soft dusty rose (`#d4a5a5`).
- Error text should be muted coral (`#b88`).
- Clear errors on input.

## Editorial standard

Read [The soul of Age of Wonders](STYLE_GUIDE.md) before drafting or revising an essay. It is the authoritative prose guide: close readings, argumentative standards, register, reader-facing surfaces, and the editing workflow. It replaces the former prose principles and five-pattern checklist.

The central conviction remains: the universe offers more than we have learned to use, and making it available to another person is worthy work.

Preserve the wonder. Strive for simplicity, beauty, and humanity. Protect the open horizon of a manifesto, the life inside a metaphor, and the room an ending leaves for the reader. Show constraints through the things themselves; minimise negative constructions and explanatory disclaimers. Make the mechanism legible while keeping possibility alive. The body and its captions should carry essential conditions naturally.

The canon has a point of view, and it may be wrong. Preserve the conviction, vulnerability, and risk of the writing. Qualify where the qualification carries information; let the central thesis stand directly. Keep sources accurate and the author's judgement their own. A reader should have something substantial to agree or disagree with.

Protect flow and graduated disclosure. The body carries a continuous argument; appendices reward deeper reading. Short sentences need not become separate paragraphs. Visual elements also supply pace and emphasis: a deliberate refrain can earn its repetition. Highlight the idea worth carrying away, not the qualification surrounding it.

Canonical membership and order come from the site's `CANONICAL_ORDER` arrays. Symbolic Superintelligence occupies position nine. Irreducible remains available as its superseded predecessor; retain its `supersededBy` field and historical route.

For revisions, inspect every affected reading surface: title and description, opening, body, headings, components, image captions and alt text, close, share copy, and appendix summaries. If title or frontmatter description changes, regenerate the affected OG image.

Keep new essays as drafts until publication is authorised. Existing published essays retain their publication and supersession metadata during local editorial work. Build and inspect the revised routes before handoff. Do not commit, push, publish, or distribute without authorisation.

The September 2026 work is recorded in [the initial editorial review](docs/editorial-review-2026-09.md) and [the complete canon pass](docs/canon-complete-pass-2026-09.md), including its remaining evidential limits.

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
   - **The unit is the build-plus-drop, not the bare aphorism.** Two or three sentences that end on the short line. The canon's drops inherit their weight from the builds above them; a drop posted alone is a fortune cookie. When a bank item is a bare one-liner, restore its build from the essay before posting.
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
   - X: build-plus-drop excerpts and structured posts (see the daily-loop unit rule).
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

- [x] Create `public/og-default.png` for social sharing previews.
- [x] Add per-essay OG images. Generated into `public/og/` by `scripts/generate-og-images.mjs` (rerun after a title or description changes); wired via `ogImage` frontmatter.
- [ ] Reconnect LinkedIn to Typefully social set `277101`.
- [ ] Configure Buttondown favicon in the dashboard.
