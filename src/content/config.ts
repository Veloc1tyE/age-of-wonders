import { defineCollection, z } from "astro:content";

const essays = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    draft: z.boolean().optional().default(false),
    ogImage: z.string().optional(),
  }),
});

export const collections = { essays };
