import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CrtqPIc8.mjs';
import 'piccolore';
import { $ as $$SiteLayout } from '../chunks/SiteLayout_Bu-bk74O.mjs';
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "SiteLayout", $$SiteLayout, { "title": "404 \u2014 Age of Wonders" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div style="text-align:center; padding: 60px 0;"> <h1 style="font-size:72px; margin:0;">404</h1> <p style="font-size:24px; margin:24px 0; color:var(--muted);">
This page doesn't exist yet.
</p> <p style="font-size:20px; margin:32px 0;">
Perhaps it's waiting to be built — like so much of the future.
</p> <p style="margin-top:40px;"> <a href="/" style="font-size:22px; font-weight:600;">Return to the beginning</a> </p> </div> ` })}`;
}, "/Users/billy_j/age-of-wonders/src/pages/404.astro", void 0);

const $$file = "/Users/billy_j/age-of-wonders/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
