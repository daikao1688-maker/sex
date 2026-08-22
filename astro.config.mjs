// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://relaxmacau.com',
  trailingSlash: 'ignore',
  server: { port: 8866 },

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
