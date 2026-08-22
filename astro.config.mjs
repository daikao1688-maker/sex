// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

const siteOrigin = new URL(
  process.env.PUBLIC_SITE_ORIGIN ?? 'https://yongjiu-1z5.pages.dev',
).origin;

// https://astro.build/config
export default defineConfig({
  site: siteOrigin,
  trailingSlash: 'ignore',
  server: { port: 8866 },

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
        },
      },
    }),
  ],

  // Keep `locales` in sync with `locales` in src/i18n/config.ts — that file is
  // what the pages, hreflang tags and language switcher read.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-TW', 'zh-CN', 'ja'],
    routing: { prefixDefaultLocale: true },
  },

  vite: {
    plugins: [tailwindcss()]
  }
});
