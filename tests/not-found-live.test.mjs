import assert from "node:assert/strict";
import { test } from "node:test";

const baseUrl = process.env.ASTRO_TEST_BASE_URL;

test(
  "an unknown URL is rendered through the custom 404 route",
  { skip: !baseUrl },
  async () => {
    const response = await fetch(new URL("/zh-CN/404-integration-probe", baseUrl), {
      redirect: "manual",
    });
    const html = await response.text();

    assert.equal(response.status, 404);
    assert.match(html, /data-404-heading/);
    assert.doesNotMatch(html, /<title>404: Not Found<\/title>/);
  },
);
