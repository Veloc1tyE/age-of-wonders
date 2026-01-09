// @ts-check
// https://astro.build/config
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://www.ageofwonders.org",
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [await import("remark-math").then(m => m.default)],
    rehypePlugins: [await import("rehype-katex").then(m => m.default)],
  },
});
