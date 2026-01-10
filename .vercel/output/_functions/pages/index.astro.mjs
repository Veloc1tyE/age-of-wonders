import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_CrtqPIc8.mjs';
import 'piccolore';
import { $ as $$SiteLayout } from '../chunks/SiteLayout_Bu-bk74O.mjs';
import { getCollection } from '../chunks/_astro_content_DNwZad_O.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const essays = (await getCollection("essays")).filter((e) => !e.data.draft).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  return renderTemplate`${renderComponent($$result, "SiteLayout", $$SiteLayout, { "title": "Age of Wonders" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div style="font-size:24px; line-height:1.75; max-width: 680px; margin-top:40px;"> <p style="font-size:27px; margin-bottom:40px; line-height:1.6;">
Age of Wonders explores three simple ideas
</p> <ol style="margin: 40px 0; padding-left: 0; list-style-position: inside; font-size:25px;"> <li style="margin: 20px 0;"><strong>The universe is abundant beyond our wildest dreams.</strong></li> <li style="margin: 20px 0;"><strong>We can create a future of wonders.</strong></li> <li style="margin: 20px 0;"><strong>Access is everything.</strong></li> </ol> <p style="margin-top:48px; font-size:27px; font-style:italic; color:var(--muted); line-height:1.6; padding-left:28px; border-left: 3px solid var(--accent-warm);">
The sky isn't the limit. It's an infinite canvas.
</p> </div> <hr style="margin: 72px 0;"> <h2 style="margin-bottom:16px;">Creative Works</h2> <p class="meta" style="margin-bottom:48px;">Each piece stands alone, but together they come together into a coherent vision for the future.</p> <ul style="list-style: none; padding: 0;"> ${essays.map((e) => renderTemplate`<li style="margin: 32px 0; padding: 28px; border-left: 4px solid var(--accent); background: linear-gradient(to right, var(--accent-light), transparent); border-radius: 0 6px 6px 0; transition: all 0.3s ease;" class="essay-card"> <a${addAttribute(`/essays/${e.slug}/`, "href")} style="text-decoration:none; display:block;"> <strong style="font-size:28px; display:block; margin-bottom:12px; color:var(--text); transition: all 0.2s ease; font-weight:500;">${e.data.title}</strong> <span class="meta" style="display:block; line-height:1.6;">${e.data.description}</span> </a> </li>`)} </ul> ` })}`;
}, "/Users/billy_j/age-of-wonders/src/pages/index.astro", void 0);

const $$file = "/Users/billy_j/age-of-wonders/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
