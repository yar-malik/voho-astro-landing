import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    publishDate: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const collections = {
  posts: postsCollection,
};
