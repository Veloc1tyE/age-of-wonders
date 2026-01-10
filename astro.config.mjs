// @ts-check
// https://astro.build/config
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://ageofwonders.example", // Update this to your actual domain before deploying
  output: "server", // Server-side rendering for API routes
  adapter: vercel(),
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [await import("remark-math").then(m => m.default)],
    rehypePlugins: [await import("rehype-katex").then(m => m.default)],
  },
});
