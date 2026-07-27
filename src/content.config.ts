import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    products: z
      .array(
        z.object({
          name: z.string(),
          price: z.number(),
          reviewAverage: z.number(),
          reviewCount: z.number(),
          affiliateUrl: z.string().url(),
          imageUrl: z.string().url().optional(),
        }),
      )
      .default([]),
  }),
});

export const collections = { posts };
