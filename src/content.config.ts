import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Blog articles, one Markdown file per locale under `src/content/blog/<lang>/`.
 * The id is `<lang>/<slug>`; the route splits it back apart.
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** Matches a key in the blog page copy's `categories` map. */
    category: z.enum(['beginner', 'price', 'compare', 'itinerary', 'experience', 'news']),
    /** ISO date; drives ordering and the printed month. */
    date: z.string(),
    /** ISO date of a verified editorial update; published date is the fallback. */
    dateModified: z.string().optional(),
    /** Printed under the title, e.g. "Jul 2026 · 6 min read". */
    meta: z.string(),
    cover: z.string(),
    coverAlt: z.string(),
    author: z.string().default('Relax Macau Team'),
    /** Marks stub content that still needs the real article. */
    draftPlaceholder: z.boolean().default(false),
  }),
});

export const collections = { blog };
