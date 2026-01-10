import { d as createAstro, c as createComponent, r as renderComponent, e as renderScript, a as renderTemplate, b as addAttribute, i as renderHead, j as renderSlot } from './astro/server_CrtqPIc8.mjs';
import 'piccolore';
/* empty css                         */

const $$Astro$1 = createAstro("https://ageofwonders.example");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index;
  const propsStr = JSON.stringify(Astro2.props);
  const paramsStr = JSON.stringify(Astro2.params);
  return renderTemplate`${renderComponent($$result, "vercel-analytics", "vercel-analytics", { "data-props": propsStr, "data-params": paramsStr, "data-pathname": Astro2.url.pathname })} ${renderScript($$result, "/Users/billy_j/age-of-wonders/node_modules/@vercel/analytics/dist/astro/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/billy_j/age-of-wonders/node_modules/@vercel/analytics/dist/astro/index.astro", void 0);

const $$Astro = createAstro("https://ageofwonders.example");
const $$SiteLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SiteLayout;
  const { title = "Age of Wonders", description = "A body of work exploring abundance, access, and the Age of Wonders ahead." } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><meta name="description"${addAttribute(description, "content")}><!-- Open Graph / Social Media --><meta property="og:type" content="website"><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:site_name" content="Age of Wonders"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><!-- Favicon --><link rel="icon" type="image/svg+xml" href="/favicon.svg"><!-- Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet"><!-- KaTeX --><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css" crossorigin="anonymous">${renderComponent($$result, "Analytics", $$Index, {})}${renderHead()}</head> <body> <div class="wrap"> <header style="margin-bottom: 64px;"> <h1 class="title"> <a href="/" style="text-decoration:none;border-bottom:none;">Age of Wonders</a> </h1> <nav class="nav" aria-label="Primary"> <a href="/">Introduction</a> <a href="/essays">Essays</a> <a href="/about">About</a> <a href="/subscribe">Subscribe</a> </nav> </header> <main class="prose" style="margin-top: 0;"> ${renderSlot($$result, $$slots["default"])} </main> <footer class="meta" style="margin-top:80px; padding-top:32px; border-top: 1px solid var(--rule);"> <p style="margin: 0 0 16px 0;">
© ${(/* @__PURE__ */ new Date()).getFullYear()} Age of Wonders
</p> </footer> </div> </body></html>`;
}, "/Users/billy_j/age-of-wonders/src/layouts/SiteLayout.astro", void 0);

export { $$SiteLayout as $ };
