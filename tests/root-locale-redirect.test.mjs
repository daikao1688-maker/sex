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
    ["zh-HK", "/zh-TW/"],
    ["zh-MO", "/zh-TW/"],
    ["zh-Hant", "/zh-TW/"],
    ["zh-Hant-HK", "/zh-TW/"],
    ["zh-CN", "/zh-CN/"],
    ["zh-SG", "/zh-CN/"],
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
