import type { APIRoute } from 'astro';

// Keep crawling available so search engines can read the site's noindex rules.
// The existing sitemap also lets crawlers revisit previously indexed URLs.
const robotsTxt = (sitemapUrl: URL) => `User-agent: *
Allow: /

Sitemap: ${sitemapUrl.href}
`;

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    throw new Error('Astro site origin is required to generate robots.txt');
  }

  return new Response(robotsTxt(new URL('sitemap-index.xml', site)), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
