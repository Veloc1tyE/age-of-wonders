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

**Aesthetic:** Elegant, readable, thoughtful. Like a well-crafted essay collection. Clean typography (EB Garamond + Great Vibes), generous whitespace, focused on the content.

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

## Recent Fixes Applied

1. **Date Schema Fix:** Changed date field from `z.string()` to `z.coerce.date()` in content config to properly handle date parsing
2. **Date Sorting:** Updated all date sorting to use `.getTime()` for proper Date object comparison
3. **Date Display:** Added proper date formatting using `toLocaleDateString()` in essay pages
4. **Dynamic Routes:** Fixed `[...slug].astro` to use `getEntry()` with proper `getStaticPaths()` export
5. **RSS Feed:** Updated to pass Date objects directly to `pubDate` (no need for `new Date()` conversion)
