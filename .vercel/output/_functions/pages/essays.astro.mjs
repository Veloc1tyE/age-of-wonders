import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_CrtqPIc8.mjs';
import 'piccolore';
import { $ as $$SiteLayout } from '../chunks/SiteLayout_Bu-bk74O.mjs';
import { getCollection } from '../chunks/_astro_content_DNwZad_O.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const essays = (await getCollection("essays")).filter((e) => !e.data.draft).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  return renderTemplate`${renderComponent($$result, "SiteLayout", $$SiteLayout, { "title": "Essays \u2014 Age of Wonders" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 style="margin-top: 0; margin-bottom: 24px;">Essays</h1> <p class="meta" style="margin-bottom:48px;">
Explorations of abundance, access, and the Age of Wonders ahead.
</p> <ul style="list-style: none; padding: 0;"> ${essays.map((e) => renderTemplate`<li style="margin: 24px 0; padding: 20px; border-left: 3px solid var(--rule); background: #fafafa;"> <strong style="font-size:26px;"><a${addAttribute(`/essays/${e.slug}/`, "href")}>${e.data.title}</a></strong> <div class="meta" style="margin-top:8px;"> ${e.data.date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} </div> ${e.data.description && renderTemplate`<div style="margin-top:10px; font-size:19px; line-height:1.5;"> ${e.data.description} </div>`} </li>`)} </ul> ` })}`;
}, "/Users/billy_j/age-of-wonders/src/pages/essays/index.astro", void 0);

const $$file = "/Users/billy_j/age-of-wonders/src/pages/essays/index.astro";
const $$url = "/essays";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
