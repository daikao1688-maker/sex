import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { bookableVenues, venues } from '../data/venues';
import { getDictionary } from '../i18n';
import { localeMeta, locales, localizePath } from '../i18n/config';
import { venueSummary } from '../i18n/pages/spa';
import { getPostsFor, postSlug } from '../lib/blog';

export const prerender = true;

const markdownText = (value: string) =>
  value.replace(/\s+/g, ' ').replace(/([\\[\]])/g, '\\$1').trim();

export const GET: APIRoute = async () => {
  const english = getDictionary('en');
  const languageLinks = locales.map((locale) => {
    const url = new URL(`/${locale}/`, site.origin).href;
    return `- [${localeMeta[locale].label}](${url}): Localized homepage and venue directory.`;
  });
  const resourceNotes: Record<string, string> = {
    '/ranking/': 'Venue comparison and editorial shortlist.',
    '/guide/': 'Planning, booking, and visit guidance.',
    '/faq/': 'Frequently asked questions and direct answers.',
    '/about/': 'Site purpose and editorial scope.',
    '/blog/': 'Article index for this language.',
    '/shuttle/': 'Transport and shuttle planning information.',
    '/contact/': 'Contact channels and same-day information requests.',
    '/privacy/': 'Privacy and data-use information.',
    '/editorial-policy/': 'How information is reviewed, corrected, and disclosed.',
  };
  const siteResourceLinks = locales.flatMap((locale) => {
    const dictionary = getDictionary(locale);
    const resources = [
      ...dictionary.footer.links.filter(({ path }) => path !== '/'),
      { path: '/editorial-policy/', label: dictionary.footer.editorialPolicy },
    ];
    return resources.map(({ path, label }) => {
      const url = new URL(localizePath(locale, path), site.origin).href;
      const note = resourceNotes[path] ?? 'Localized site resource.';
      return `- [${localeMeta[locale].label}: ${markdownText(label)}](${url}): ${note}`;
    });
  });
  const articleLinks = (
    await Promise.all(
      locales.map(async (locale) => {
        const posts = await getPostsFor(locale);
        return posts.map((post) => {
          const slug = postSlug(post);
          const url = new URL(localizePath(locale, `/blog/${slug}/`), site.origin).href;
          const title = markdownText(post.data.title);
          const description = markdownText(post.data.description);
          return `- [${title}](${url}): ${localeMeta[locale].label}; published ${post.data.date}. ${description}`;
        });
      }),
    )
  ).flat();
  const venueLink = (venue: (typeof venues)[number], referenceOnly: boolean) => {
    const copy = english.spas.venues[venue.slug];
    const url = new URL(localizePath('en', `/spa/${venue.slug}/`), site.origin).href;
    const summary = markdownText(copy.summary ?? venueSummary(copy.description, 'en'));
    const status = referenceOnly
      ? 'Reference only; the site currently lists this venue as temporarily closed.'
      : 'Editorial guide for a venue currently listed as operating.';
    return `- [${markdownText(copy.name)}](${url}): ${status} ${summary}`;
  };
  const currentVenueLinks = bookableVenues.map((venue) => venueLink(venue, false));
  const closedVenueLinks = venues
    .filter((venue) => venue.temporarilyClosed)
    .map((venue) => venueLink(venue, true));
  const markdown = [
    '# Macau Sauna Sites',
    '',
    '> Independent multilingual editorial guide to Macau sauna and spa venues, practical visit planning, venue status, and travel information.',
    '',
    'This file is generated during every production build. Venue availability and commercial details can change; use the linked pages as editorial references and confirm time-sensitive details before travel.',
    '',
    '## Language Editions',
    '',
    ...languageLinks,
    '',
    '## Core Site Resources',
    '',
    ...siteResourceLinks,
    '',
    '## Published Articles',
    '',
    ...articleLinks,
    '',
    '## Current Venue Guides',
    '',
    ...currentVenueLinks,
    '',
    '## Temporarily Closed Venue References',
    '',
    ...closedVenueLinks,
    '',
  ].join('\n');

  return new Response(`\uFEFF${markdown}`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
