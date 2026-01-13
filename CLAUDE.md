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
- Add visual affordances for non-obvious controls (e.g., dropdown arrow on select elements)
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
18. **Sort Dropdown Affordance:** Added subtle dropdown arrow indicator to Essays sort control for better discoverability.
19. **CSS Specificity Fix:** Moved inline styles to stylesheet for essay CTA button so hover pseudo-class could work.
