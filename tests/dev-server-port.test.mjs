import assert from "node:assert/strict";
import { test } from "node:test";

import astroConfig from "../astro.config.mjs";

test("Astro uses the dedicated local development port", () => {
  assert.equal(
    astroConfig.server?.port,
    7777,
    "the dev and preview servers must use port 7777 instead of Astro's default port",
  );
});
