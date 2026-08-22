import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLocale, locales, type Locale } from '../i18n/config';

export type BlogPost = CollectionEntry<'blog'>;

/** Splits the collection id, which is `<lang>/<slug>`. */
export function postSlug(post: BlogPost): string {
  return post.id.split('/').slice(1).join('/');
}

/**
 * The collection id is `<lang>/<slug>` with the language lower-cased by the
 * loader, so `zh-TW` arrives as `zh-tw` — match locales case-insensitively.
 */
function postLocale(post: BlogPost): Locale | undefined {
  const prefix = post.id.split('/')[0].toLowerCase();
  return locales.find((lang) => lang.toLowerCase() === prefix);
}

/**
 * Posts for a locale, newest first. Locales without their own articles fall
 * back to the English set so the blog exists everywhere; drop translated
 * Markdown into `src/content/blog/<lang>/` and it takes over automatically.
 */
export async function getPostsFor(lang: Locale): Promise<BlogPost[]> {
  const all = await getCollection('blog');
  const translated = all.filter((post) => postLocale(post) === lang);
  const posts = translated.length ? translated : all.filter((post) => postLocale(post) === defaultLocale);
  return posts.sort((a, b) => b.data.date.localeCompare(a.data.date));
}

/** Locales that have their own article for this slug — drives hreflang. */
export async function localesForSlug(slug: string): Promise<Locale[]> {
  const all = await getCollection('blog');
  const owning = new Set(
    all.filter((post) => postSlug(post) === slug).map((post) => postLocale(post)),
  );
  return locales.filter((lang) => owning.has(lang));
}

/** Slug → heading list for the in-article table of contents. */
export function tableOfContents(headings: Array<{ depth: number; slug: string; text: string }>) {
  return headings.filter((heading) => heading.depth === 2);
}
