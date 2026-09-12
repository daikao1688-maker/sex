# sex-macau

Astro website source repository: `git@github.com:daikao1688-maker/sex.git`.

## Production domain

The default production URL is **https://sex-macau.com/**. Canonical URLs,
language alternates, social metadata, structured data, sitemaps, `robots.txt`,
and `llms.txt` use this origin. `PUBLIC_SITE_ORIGIN` can override it at build
time; leave that variable unset or set it to `https://sex-macau.com` for production.

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

- Add each article as Markdown under `src/content/blog/<locale>/<slug>.md` and satisfy the schema in `src/content.config.ts`.
- Do not maintain a separate article list in `llms.txt`. The build endpoint at `src/pages/llms.txt.ts` reads the same content collection and localized routing helpers as the blog pages.
- Every `bun build` regenerates `dist/llms.txt`; any newly built localized article is included automatically. The regression test compares the generated list with every localized article emitted to `dist/`.
- Never edit `dist/llms.txt` by hand because `dist/` is a build artifact and the next build replaces it.

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
