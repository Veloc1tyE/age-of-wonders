# Age of Wonders

A body of writing and creative work exploring a simple belief system:

1. **The universe is abundant beyond our wildest dreams.**
2. **We can create a future of wonders.**
3. **Access is everything.**

More energy from sunlight hits Earth in one hour than humanity uses in a year. The oceans contain fusion fuel for billions of years. Materials exist that are lighter than air yet stronger than steel. The gap between what's possible and what we've built isn't imposed by physics—it's imposed by infrastructure, imagination, and courage.

The Age of Wonders isn't about waiting for miracles. It's about building the infrastructure to access what's already there.

---

## 🚀 Getting Started

```sh
npm install
npm run dev
```

The site will be available at `http://localhost:4321/`

## 📁 Project Structure

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── content/
│   │   ├── config.ts          # Content collections schema
│   │   └── essays/            # Essay content (MDX)
│   ├── layouts/
│   │   ├── Layout.astro       # Base layout
│   │   └── SiteLayout.astro   # Main site layout
│   ├── pages/
│   │   ├── index.astro        # Homepage
│   │   ├── about.astro        # About page
│   │   ├── subscribe.astro    # Subscribe page
│   │   ├── rss.xml.js         # RSS feed
│   │   └── essays/
│   │       ├── index.astro    # Essays listing
│   │       └── [...slug].astro # Individual essay pages
│   └── styles/
│       └── global.css         # Global styles
└── package.json
```

## ✍️ Adding Essays

Create a new `.mdx` file in `src/content/essays/` with the following frontmatter:

```mdx
---
title: Your Essay Title
description: A brief description
date: 2026-01-07
draft: false
---

Your essay content here...
```

Essays support:
- **Markdown** formatting
- **Math** equations with KaTeX (inline: `$E = mc^2$`, block: `$$...$$`)
- **MDX** components

## 🧞 Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |

## 🌐 Deployment

Before deploying:
1. Update the `site` URL in `astro.config.mjs` to your actual domain
2. Set up email subscriptions (see `EMAIL_SETUP.md`)
3. Test the subscription form

Built with [Astro](https://astro.build) 🚀
