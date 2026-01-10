import { d as createAstro, c as createComponent, r as renderComponent, e as renderScript, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_CrtqPIc8.mjs';
import 'piccolore';
import { $ as $$SiteLayout } from '../../chunks/SiteLayout_Bu-bk74O.mjs';
import { getEntry, getCollection } from '../../chunks/_astro_content_DNwZad_O.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://ageofwonders.example");
async function getStaticPaths() {
  const { getCollection: getCollection2 } = await import('../../chunks/_astro_content_DNwZad_O.mjs');
  const essays = await getCollection2("essays");
  return essays.map((entry) => ({
    params: { slug: entry.slug }
  }));
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { slug } = Astro2.params;
  const entry = await getEntry("essays", slug);
  if (!entry) return Astro2.redirect("/essays");
  const { Content } = await entry.render();
  const allEssays = (await getCollection("essays")).filter((e) => !e.data.draft).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const currentIndex = allEssays.findIndex((e) => e.slug === slug);
  const previousEssay = currentIndex < allEssays.length - 1 ? allEssays[currentIndex + 1] : null;
  const nextEssay = currentIndex > 0 ? allEssays[currentIndex - 1] : null;
  return renderTemplate`${renderComponent($$result, "SiteLayout", $$SiteLayout, { "title": `${entry.data.title} — Age of Wonders`, "description": entry.data.description, "data-astro-cid-dijh3akd": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 style="margin-top: 0; margin-bottom: 12px;" data-astro-cid-dijh3akd>${entry.data.title}</h1> ${entry.data.description && renderTemplate`<p style="font-style: italic; font-size: 21px; color: var(--muted); margin-bottom: 8px; line-height: 1.5;" data-astro-cid-dijh3akd> ${entry.data.description} </p>`}<p class="meta" style="margin-top: 12px; margin-bottom: 48px;" data-astro-cid-dijh3akd> ${entry.data.date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} </p> ${renderComponent($$result2, "Content", Content, { "data-astro-cid-dijh3akd": true })}  <div style="margin-top: 64px; padding: 32px; background: linear-gradient(to right, var(--accent-light), transparent); border-left: 4px solid var(--accent); border-radius: 0 6px 6px 0;" data-astro-cid-dijh3akd> <h3 style="margin: 0 0 12px 0; font-size: 26px; font-weight: 500; color: var(--text);" data-astro-cid-dijh3akd>Explore More</h3> <p style="margin: 0 0 20px 0; font-size: 20px; line-height: 1.6; color: var(--text-light);" data-astro-cid-dijh3akd>
Read new essays exploring abundance, access, and the Age of Wonders ahead.
</p> <a href="/subscribe" style="display: inline-block; padding: 12px 28px; background: var(--accent); color: white; text-decoration: none; border-radius: 6px; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 16px; letter-spacing: 0.3px; transition: all 0.2s ease;" onmouseover="this.style.background='#0052a3'" onmouseout="this.style.background='var(--accent)'" data-astro-cid-dijh3akd>
Subscribe
</a> <p style="margin: 16px 0 0 0; font-family: 'Inter', sans-serif; font-size: 15px; color: var(--muted); font-style: italic;" data-astro-cid-dijh3akd>
Low frequency. High quality. No distractions.
</p> </div>  <nav style="margin-top: 80px; padding-top: 32px; border-top: 1px solid var(--rule); display: flex; justify-content: space-between; align-items: center; gap: 32px;" data-astro-cid-dijh3akd> <div style="flex: 1;" data-astro-cid-dijh3akd> ${previousEssay ? renderTemplate`<a${addAttribute(`/essays/${previousEssay.slug}/`, "href")} style="text-decoration: none; display: block;" data-astro-cid-dijh3akd> <span style="font-family: 'Inter', sans-serif; font-size: 14px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 8px;" data-astro-cid-dijh3akd>← Previous</span> <span style="font-size: 20px; color: var(--text); font-weight: 500;" data-astro-cid-dijh3akd>${previousEssay.data.title}</span> </a>` : null} </div> <div style="flex: 1; text-align: right;" data-astro-cid-dijh3akd> ${nextEssay ? renderTemplate`<a${addAttribute(`/essays/${nextEssay.slug}/`, "href")} style="text-decoration: none; display: block;" data-astro-cid-dijh3akd> <span style="font-family: 'Inter', sans-serif; font-size: 14px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 8px;" data-astro-cid-dijh3akd>Next →</span> <span style="font-size: 20px; color: var(--text); font-weight: 500;" data-astro-cid-dijh3akd>${nextEssay.data.title}</span> </a>` : null} </div> </nav>  ${false}` })} ${renderScript($$result, "/Users/billy_j/age-of-wonders/src/pages/essays/[...slug].astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/billy_j/age-of-wonders/src/pages/essays/[...slug].astro", void 0);
const $$file = "/Users/billy_j/age-of-wonders/src/pages/essays/[...slug].astro";
const $$url = "/essays/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
