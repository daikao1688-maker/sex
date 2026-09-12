// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

const siteOrigin = new URL(
  process.env.PUBLIC_SITE_ORIGIN ?? 'https://sex-macau.com',
).origin;

// https://astro.build/config
export default defineConfig({
  site: siteOrigin,
  trailingSlash: 'ignore',
  server: { host: '127.0.0.1', port: 1717 },

  integrations: [
    sitemap({
      filter: (page) => new URL(page).pathname !== '/',
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          'zh-TW': 'zh-TW',
          'zh-CN': 'zh-CN',
          ja: 'ja',
          ko: 'ko',
        },
      },
    }),
  ],

  // Keep `locales` in sync with `locales` in src/i18n/config.ts — that file is
  // what the pages, hreflang tags and language switcher read.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-TW', 'zh-CN', 'ja', 'ko'],
    routing: { prefixDefaultLocale: true },
  },

  vite: {
    server: { strictPort: true },
    preview: { strictPort: true },
    plugins: [tailwindcss()]
  }
});
