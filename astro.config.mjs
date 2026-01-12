// @ts-check
// https://astro.build/config
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://ageofwonders.org", // Updated to actual domain
  output: "server", // Server-side rendering for API routes
  adapter: vercel(),
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [await import("remark-math").then(m => m.default)],
    rehypePlugins: [await import("rehype-katex").then(m => m.default)],
  },
  // Enable image optimization
  image: {
    domains: [],
    remotePatterns: [],
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: 268402689, // ~16K pixels
      },
    },
  },
  // Prefetch configuration for instant navigation
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  // Aggressive build optimization
  vite: {
    build: {
      cssCodeSplit: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info'],
        },
      },
    },
    ssr: {
      noExternal: ['@vercel/analytics', '@vercel/speed-insights'],
    },
  },
});
