// @ts-check
// https://astro.build/config
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://ageofwonders.example", // Update this to your actual domain before deploying
  output: "hybrid", // Allows API routes to be server-rendered while keeping pages static
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [await import("remark-math").then(m => m.default)],
    rehypePlugins: [await import("rehype-katex").then(m => m.default)],
  },
});
