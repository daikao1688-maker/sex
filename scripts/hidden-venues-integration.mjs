import { readFile, readdir, rm, appendFile } from 'node:fs/promises';

/** Keep disabled venue assets in source, but omit them from the published build. */
export default function hiddenVenues() {
  return {
    name: 'hidden-venues',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const visibility = JSON.parse(await readFile(new URL('../src/data/venueVisibility.json', import.meta.url), 'utf8'));
        const hidden = Object.keys(visibility).filter((slug) => visibility[slug] === false);
        if (!hidden.length) return;

        for (const directory of ['covers', 'media']) {
          const root = new URL(`${directory}/`, dir);
          for (const file of await readdir(root)) {
            if (hidden.some((slug) => file.startsWith(`${slug}-`) || file.startsWith(`macau-sauna-spa-${slug}-`))) {
              await rm(new URL(file, root));
            }
          }
        }

        const slugs = hidden.map((slug) => slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
        // 404 is reversible; also block stale HTML/assets on hosts that upload without deleting.
        await appendFile(new URL('.htaccess', dir), `\n# Hidden venues: generated from src/data/venueVisibility.json.\n<IfModule mod_alias.c>\n  RedirectMatch 404 "^/(en|zh-TW|zh-CN|ja|ko)/spa/(${slugs})(/index\\.html|/)?$"\n  RedirectMatch 404 "^/(covers|media)/(macau-sauna-spa-)?(${slugs})-[^/]+$"\n</IfModule>\n`);
      },
    },
  };
}
