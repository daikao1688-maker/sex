# sex-macau

Astro website source repository: `git@github.com:daikao1688-maker/sex.git`.

## Production domain

The default production URL is **https://sex-macau.com/**. Canonical URLs,
language alternates, social metadata, structured data, sitemaps, `robots.txt`,
and `llms.txt` use this origin. `PUBLIC_SITE_ORIGIN` can override it at build
time; leave that variable unset or set it to `https://sex-macau.com` for production.

## Search indexing disabled

All HTML pages, including all five languages, the root language gateway, and the
404 page, contain a `robots` meta tag with `noindex`. The deployment files
`public/.htaccess` (Hostinger/Apache/LiteSpeed) and `public/_headers` (hosts that
support this format) also apply `X-Robots-Tag: noindex, follow` to every response,
including images and other static resources.

Keep crawling allowed in `robots.txt` so search engines can read these directives.
The existing sitemap is retained to help crawlers revisit previously indexed URLs;
it does not override `noindex`. Normal browsing and language switching still work.
Already indexed pages are removed after search engines recrawl them, not immediately
when the code is deployed. Publish the complete `html` branch, including `.htaccess`,
then verify the live page metadata and response headers.

## Google Tag Manager

Container `GTM-NF5S83BB` is included on all pages, including the root language
gateway and 404 page. `GoogleTagManagerHead.astro` renders the inline bootstrap
first in `<head>`; `GoogleTagManagerBody.astro` renders the noscript iframe
immediately after `<body>`. Both the shared layout and root gateway use these
components. Manage and publish conversion tags and triggers in GTM; installing
these snippets alone does not verify that conversion events are being recorded.
The previously removed direct Google Ads tag `AW-18409047939` remains absent
from the website source and generated files. Search indexing remains disabled.

## Local development

Requires Node.js 22.12.0 or newer. Install dependencies with `npm ci`, then run
`npm run dev` to start the background server at **http://localhost:1717/**.
The server listens on this computer only and fails if port 1717 is already in use.

| Command | Action |
| --- | --- |
| `npm run dev` | Start the background development server |
| `npm run dev:status` | Check server status |
| `npm run dev:logs` | Read server logs |
| `npm run dev:stop` | Stop this project's server |
| `npm run build` | Generate the static website in `dist/` |
| `npm test` | Build and run the regression suite |

## Repository branches

- `main`: source code, configuration, content, and original static assets.
- `html`: generated static website, with the contents of `dist/` at the branch root.

Continue editing the website on `main`. After building, update `html` with the new
`dist/` output using a separate checkout of that branch. Keep generated files out
of `main`; `dist/` is ignored there. The `html` branch stores build artifacts;
hosting configuration is managed separately.

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun install`             | Installs dependencies                            |
| `bun dev`             | Starts background dev server at `localhost:1717` |
| `bun build`           | Build your production site to `./dist/`          |
| `bun preview`         | Preview your build locally, before deploying     |
| `bun astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `bun astro -- --help` | Get help using the Astro CLI                     |

## Article publishing and `llms.txt`

- The three 2026 August, overnight, and September articles and their five-language
  editions were removed on 2026-09-21. The blog remains available with an empty
  state; its homepage teaser hides when there are no published articles.
- Deploy deletions from the `html` branch as well as additions. The Hostinger
  `.htaccess` returns HTTP 410 for the retired article URLs, including their
  `index.html` variants, to prevent leftover uploaded HTML from being served.
- The build refreshes Astro's content cache with `--force` so removing the last
  articles cannot leave previously cached posts in the generated site.
- Add each article as Markdown under `src/content/blog/<locale>/<slug>.md` and satisfy the schema in `src/content.config.ts`.
- Do not maintain a separate article list in `llms.txt`. The build endpoint at `src/pages/llms.txt.ts` reads the same content collection and localized routing helpers as the blog pages.
- Every `bun build` regenerates `dist/llms.txt`; any newly built localized article is included automatically. Regression tests currently verify the empty article list and the absence of the removed article URLs throughout `dist/`.
- Never edit `dist/llms.txt` by hand because `dist/` is a build artifact and the next build replaces it.

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
