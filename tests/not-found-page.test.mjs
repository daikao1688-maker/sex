import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";
import vm from "node:vm";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const notFoundPath = path.join(projectRoot, "dist", "404.html");

const readNotFoundPage = () => readFile(notFoundPath, "utf8");

function makeElement(dataset = {}) {
  const attributes = new Map();
  const listeners = new Map();
  const classes = new Set();

  return {
    dataset,
    textContent: "",
    hidden: false,
    focused: false,
    classList: {
      add: (...names) => names.forEach((name) => classes.add(name)),
      remove: (...names) => names.forEach((name) => classes.delete(name)),
      toggle: (name, force) => {
        if (force === undefined) {
          if (classes.has(name)) classes.delete(name);
          else classes.add(name);
          return classes.has(name);
        }
        if (force) classes.add(name);
        else classes.delete(name);
        return force;
      },
      contains: (name) => classes.has(name),
    },
    setAttribute: (name, value) => attributes.set(name, String(value)),
    getAttribute: (name) => attributes.get(name) ?? null,
    removeAttribute: (name) => attributes.delete(name),
    addEventListener: (type, listener) => listeners.set(type, listener),
    focus() {
      this.focused = true;
    },
  };
}

function extractNotFoundScript(html) {
  const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(
    (match) => match[1],
  );
  return scripts.find(
    (source) => source.includes("data-404-heading") && source.includes("navigator.language"),
  );
}

function runNotFoundScript(source, { pathname, language }) {
  const selectors = [
    "eyebrow",
    "heading",
    "body",
    "brand",
    "language-current",
    "home",
    "spas",
    "guide",
    "contact",
    "brand-link",
    "language-toggle",
    "language-panel",
  ];
  const elements = Object.fromEntries(
    selectors.map((name) => [`[data-404-${name}]`, makeElement()]),
  );
  const localeLinks = ["en", "zh-TW", "zh-CN", "ja"].map((locale) =>
    makeElement({ locale }),
  );
  const documentElement = makeElement();
  const document = {
    title: "",
    documentElement,
    querySelector: (selector) => elements[selector] ?? null,
    querySelectorAll: (selector) =>
      selector === "[data-404-locale-link]" ? localeLinks : [],
    addEventListener() {},
  };
  const window = {
    location: { pathname },
    addEventListener() {},
  };

  vm.runInNewContext(source, {
    document,
    window,
    navigator: { language, languages: [language] },
    console,
  });

  return { document, elements, localeLinks };
}

test("the global 404 is non-indexable and does not advertise fictional locale URLs", async () => {
  const html = await readNotFoundPage();

  assert.match(html, /<meta name="robots" content="noindex, follow"\s*\/?\s*>/);
  assert.doesNotMatch(html, /<link rel="canonical"/);
  assert.doesNotMatch(html, /<link rel="alternate"/);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, "404 must expose one page heading");
});

test("the 404 ships natural recovery copy and destinations for all four locales", async () => {
  const html = await readNotFoundPage();

  for (const phrase of [
    "This page slipped off the map",
    "這一頁暫時找不到",
    "这个页面暂时找不到",
    "お探しのページが見つかりません",
    "Macau Sauna Sites",
    "澳門桑拿導航站",
    "澳门桑拿导航站",
    "マカオ・サウナ・ガイド",
  ]) {
    assert.ok(html.includes(phrase), `404 is missing localized copy: ${phrase}`);
  }

  for (const target of ["home", "spas", "guide", "contact"]) {
    assert.match(html, new RegExp(`data-404-${target}`), `missing ${target} recovery link`);
  }
});

test("the URL locale wins and synchronizes every Traditional Chinese recovery target", async () => {
  const html = await readNotFoundPage();
  const source = extractNotFoundScript(html);
  assert.ok(source, "404 must execute its real device-language localization script");

  const { document, elements } = runNotFoundScript(source, {
    pathname: "/zh-TW/a-missing-page/",
    language: "ja-JP",
  });

  assert.equal(document.documentElement.lang, "zh-TW");
  assert.equal(elements["[data-404-brand]"].textContent, "澳門桑拿導航站");
  assert.equal(elements["[data-404-heading]"].textContent, "這一頁暫時找不到");
  assert.equal(elements["[data-404-home]"].getAttribute("href"), "/zh-TW/");
  assert.equal(elements["[data-404-spas]"].getAttribute("href"), "/zh-TW/#spas");
  assert.equal(elements["[data-404-guide]"].getAttribute("href"), "/zh-TW/guide/");
  assert.equal(elements["[data-404-contact]"].getAttribute("href"), "/zh-TW/contact/");
  assert.match(document.title, /這一頁暫時找不到.*澳門桑拿導航站/);
});

test("an unprefixed 404 follows device language and falls back to international English", async () => {
  const html = await readNotFoundPage();
  const source = extractNotFoundScript(html);
  assert.ok(source, "404 must execute its real device-language localization script");

  const japanese = runNotFoundScript(source, {
    pathname: "/missing/",
    language: "ja-JP",
  });
  assert.equal(japanese.document.documentElement.lang, "ja");
  assert.equal(
    japanese.elements["[data-404-heading]"].textContent,
    "お探しのページが見つかりません",
  );
  assert.equal(japanese.elements["[data-404-home]"].getAttribute("href"), "/ja/");

  const international = runNotFoundScript(source, {
    pathname: "/missing/",
    language: "fr-FR",
  });
  assert.equal(international.document.documentElement.lang, "en");
  assert.equal(
    international.elements["[data-404-heading]"].textContent,
    "This page slipped off the map",
  );
  assert.equal(international.elements["[data-404-home]"].getAttribute("href"), "/en/");
});
