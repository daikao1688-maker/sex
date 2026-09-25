import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";

const source = await readFile(new URL("../src/components/SpaGrid.astro", import.meta.url), "utf8");
const script = ts.transpileModule(source.match(/<script>([\s\S]*?)<\/script>/)[1], {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
}).outputText;
const labels = { en: "Overnight", "zh-TW": "過夜", "zh-CN": "过夜", ja: "宿泊", ko: "숙박" };
const expectedOrder = [
  "yu-sauna", "number-nine-sauna", "shang-pin-spa", "majesty-spa",
  "the-excellent-sauna", "empire-sauna", "east-castle-spa", "victoria-sauna", "paused",
];

// Use real rendered card membership and the production click handler. Only DOM
// methods at the browser boundary are substituted, as in the gallery tests.
function harness(section) {
  class Element {
    dataset = {};
    hidden = false;
    attributes = new Map();
    listeners = new Map();
    setAttribute(name, value) { this.attributes.set(name, String(value)); if (name === "hidden") this.hidden = true; }
    removeAttribute(name) { this.attributes.delete(name); if (name === "hidden") this.hidden = false; }
    toggleAttribute(name, force) { if (force) this.setAttribute(name, ""); else this.removeAttribute(name); }
    getAttribute(name) { return this.attributes.get(name); }
    addEventListener(name, callback) { this.listeners.set(name, callback); }
    click() { assert.ok(this.listeners.has("click"), "filter must have a click handler"); this.listeners.get("click")(); }
    getBoundingClientRect() { return { height: 48, top: 600 }; }
  }
  const pills = [...section.matchAll(/<button\b[^>]*data-bucket="([^"]*)"[^>]*>([\s\S]*?)<\/button>/g)]
    .map(([, bucket, label]) => Object.assign(new Element(), { dataset: { bucket }, label: label.trim() }));
  const cards = [...section.matchAll(/<div\b[^>]*data-buckets="([^"]*)"[^>]*>\s*(<(?:a|div)\b[^>]*>)/g)]
    .map(([, buckets, tag]) => Object.assign(new Element(), {
      dataset: { buckets },
      slug: tag.includes('data-testid="spa-paused-card"') ? "paused" : tag.match(/href="\/[^/]+\/spa\/([^/]+)\//)?.[1],
    }));
  const grid = new Element();
  grid.querySelectorAll = (selector) => selector === "[data-buckets]" ? cards : [];
  const filterBar = new Element();
  filterBar.querySelectorAll = (selector) => selector === "button[data-bucket]" ? pills : [];
  filterBar.querySelector = () => pills.find((pill) => pill.dataset.bucket === "all");
  filterBar.closest = () => new Element();
  const note = new Element();
  note.hidden = true;
  const count = new Element();
  const showAll = new Element();
  note.querySelector = (selector) => ({ "[data-hidden-count]": count, "[data-spa-jump-all]": showAll })[selector];
  const document = {
    querySelector: (selector) => ({ "[data-spa-grid]": grid, "[data-spa-filter]": filterBar, "[data-spa-hidden-note]": note })[selector],
  };
  const window = { scrollY: 0, matchMedia: () => ({ matches: false }), scrollTo() {} };
  vm.runInNewContext(script, { document, window });
  return { pills, cards, note, count, showAll, visible: () => cards.filter((card) => !card.hidden).map((card) => card.slug) };
}

for (const [locale, label] of Object.entries(labels)) {
  test(`${locale}: Overnight selects only the three requested venues and All restores the original grid`, async () => {
    const html = await readFile(new URL(`../dist/${locale}/index.html`, import.meta.url), "utf8");
    const section = html.match(/<section\b(?=[^>]*\bid="spas")[\s\S]*?<\/section>/)?.[0];
    assert.ok(section, "featured venues section is missing");
    const h = harness(section);
    assert.deepEqual(h.visible(), expectedOrder, "initial order and paused group must be preserved");

    // This replaces the second filter, so old Theme behavior fails on the
    // actual visible results rather than only failing a label assertion.
    const overnight = h.pills[1];
    overnight.click();
    assert.deepEqual(h.visible(), ["yu-sauna", "number-nine-sauna", "majesty-spa"], "overnight must not include other overnight-capable venues or the paused group");
    assert.equal(overnight.dataset.bucket, "overnight");
    assert.equal(overnight.label, label);
    assert.equal(overnight.getAttribute("aria-pressed"), "true");
    assert.equal(h.pills[0].getAttribute("aria-pressed"), "false");
    assert.equal(h.note.hidden, false);
    assert.equal(h.count.textContent, "6");
    assert.deepEqual(h.pills.map((pill) => pill.dataset.bucket), ["all", "overnight", "value", "taipa", "new", "ktv"]);

    h.pills.find((pill) => pill.dataset.bucket === "taipa").click();
    assert.deepEqual(h.visible(), ["shang-pin-spa", "paused"], "other filters keep their existing venue membership");
    overnight.click();
    h.showAll.click();
    assert.deepEqual(h.visible(), expectedOrder);
    assert.equal(h.note.hidden, true);
    assert.equal(h.pills[0].getAttribute("aria-pressed"), "true");
    assert.equal(overnight.getAttribute("aria-pressed"), "false");
  });
}
