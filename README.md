# Astro Starter Kit: Minimal

```sh
bun create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

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
| `bun dev`             | Starts local dev server at `localhost:7777`      |
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
