import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";
import vm from "node:vm";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const rootPagePath = path.join(projectRoot, "dist", "index.html");

async function readRedirectScript() {
  const html = await readFile(rootPagePath, "utf8");
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
  const redirectScript = scripts.find(([, attributes]) =>
    /\bdata-root-locale-redirect(?:\s|=|$)/i.test(attributes),
  );

  assert.ok(
    redirectScript,
    "generated /index.html must contain an executable data-root-locale-redirect script",
  );

  return redirectScript[2];
}

test("root redirects before loading any assets and only shows language choices without JavaScript", async () => {
  const html = await readFile(rootPagePath, "utf8");
  const firstHeadScript = html.match(/<head>\s*<meta\b[^>]*charset="UTF-8"[^>]*>\s*<script\b([^>]*)>/i);
  assert.match(firstHeadScript?.[1] ?? "", /data-root-locale-redirect/);
  assert.doesNotMatch(firstHeadScript[1], /\b(?:src|type|defer|async)\b/i);
  assert.doesNotMatch(html, /<script\b[^>]*\bsrc=|<link\b[^>]*\brel="stylesheet"|<style\b/i);
  const noscript = html.match(/<noscript>([\s\S]*?)<\/noscript>/i)?.[1] ?? "";
  const fallback = noscript.match(/<nav\b[^>]*data-root-locale-fallback[^>]*>[\s\S]*?<\/nav>/i)?.[0] ?? "";
  const expectedLinks = [
    ["en", "/en/", "English"],
    ["zh-TW", "/zh-TW/", "繁體中文"],
    ["zh-CN", "/zh-CN/", "简体中文"],
    ["ja", "/ja/", "日本語"],
    ["ko", "/ko/", "한국어"],
  ];

  assert.ok(fallback, "language choices must be available when JavaScript is disabled");
  const visibleBody = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1].replace(/<noscript>[\s\S]*?<\/noscript>/gi, "") ?? "";
  assert.doesNotMatch(visibleBody, /<nav\b|<h1\b|<pre\b|<code\b/i);
  assert.equal(visibleBody.trim(), "", "normal visits must not render an intermediate page");
  assert.match(fallback, /aria-label="[^"]+"/, "locale fallback navigation needs an accessible name");

  for (const [hreflang, href, label] of expectedLinks) {
    assert.match(
      fallback,
      new RegExp(`<a\\b(?=[^>]*href="${href}")(?=[^>]*hreflang="${hreflang}")[^>]*>[\\s\\S]*?${label}[\\s\\S]*?<\\/a>`),
      `root gateway is missing the ${label} fallback`,
    );
  }
});

function executeRedirect(script, language, { search = "", hash = "" } = {}) {
  const redirects = [];
  const location = {
    search,
    hash,
    replace(destination) {
      redirects.push(destination);
    },
  };
  const navigator = {
    language,
    languages: language ? [language] : [],
  };
  const context = { location, navigator };
  context.window = context;

  vm.createContext(context);
  vm.runInContext(script, context, { filename: "dist/index.html" });

  assert.equal(redirects.length, 1, `expected one location.replace call for ${String(language)}`);
  return redirects[0];
}

test("root redirects device languages to the matching localized homepage", async () => {
  const script = await readRedirectScript();
  const cases = [
    ["en", "/en/"],
    ["en-US", "/en/"],
    ["ja", "/ja/"],
    ["ja-JP", "/ja/"],
    ["zh-TW", "/zh-TW/"],
    ["zh-TW-u-nu-hanidec", "/zh-TW/"],
    ["zh-HK", "/zh-TW/"],
    ["zh-HK-u-ca-chinese", "/zh-TW/"],
    ["zh-MO", "/zh-TW/"],
    ["zh-MO-x-private", "/zh-TW/"],
    ["zh-Hant", "/zh-TW/"],
    ["zh-Hant-HK", "/zh-TW/"],
    ["zh-CN", "/zh-CN/"],
    ["zh-CN-u-ca-gregory", "/zh-CN/"],
    ["zh-SG", "/zh-CN/"],
    ["zh-SG-x-private", "/zh-CN/"],
    ["zh-Hans", "/zh-CN/"],
    ["zh-Hans-CN", "/zh-CN/"],
    ["zh", "/zh-CN/"],
    ["fr-FR", "/en/"],
    ["", "/en/"],
    [undefined, "/en/"],
  ];

  for (const [language, expectedDestination] of cases) {
    assert.equal(
      executeRedirect(script, language),
      expectedDestination,
      `${String(language)} chose the wrong locale`,
    );
  }
});

test("root redirect preserves the query and fragment with location.replace", async () => {
  const script = await readRedirectScript();

  assert.equal(
    executeRedirect(script, "zh-HK", {
      search: "?utm_source=language-test",
      hash: "#contact",
    }),
    "/zh-TW/?utm_source=language-test#contact",
  );
});
