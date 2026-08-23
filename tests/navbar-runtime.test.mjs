import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";
import vm from "node:vm";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));

class FakeElement {
  constructor() {
    this.attributes = new Map();
    this.classes = new Set();
    this.dataset = {};
    this.listeners = new Map();
    this.inert = false;
    this.focused = false;
    this.classList = {
      add: (...names) => names.forEach((name) => this.classes.add(name)),
      remove: (...names) => names.forEach((name) => this.classes.delete(name)),
      toggle: (name, force) => {
        const active = force ?? !this.classes.has(name);
        if (active) this.classes.add(name);
        else this.classes.delete(name);
        return active;
      },
      contains: (name) => this.classes.has(name),
    };
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }

  getAttribute(name) {
    return this.attributes.get(name) ?? null;
  }

  removeAttribute(name) {
    this.attributes.delete(name);
  }

  toggleAttribute(name, force) {
    if (force) this.setAttribute(name, "");
    else this.removeAttribute(name);
  }

  addEventListener(name, listener) {
    this.listeners.set(name, listener);
  }

  querySelectorAll() {
    return [];
  }

  contains() {
    return false;
  }

  focus() {
    this.focused = true;
  }
}

const navbarScript = async () => {
  const source = await readFile(path.join(projectRoot, "src/components/Navbar.astro"), "utf8");
  const scripts = [...source.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  const script = scripts.at(-1)?.[1];
  assert.ok(script, "Navbar must ship a client interaction script");
  return script
    .replace(/<([A-Z][A-Za-z0-9]*)>/g, "")
    .replace(/: (?:HTMLElement|HTMLButtonElement|number|boolean|string)(?: \| (?:null|undefined))?/g, "")
    .replace(/ as [A-Z][A-Za-z0-9]*(?: \| null)?/g, "")
    .replace(/: (?:boolean|string)/g, "");
};

test("mobile navigation morphs to a close state and resets on scroll, Escape, and desktop breakpoint", async () => {
  const nav = new FakeElement();
  const homeLink = new FakeElement();
  const toggle = new FakeElement();
  const menu = new FakeElement();
  const menuChild = new FakeElement();
  const windowListeners = new Map();
  const documentListeners = new Map();
  const desktopMedia = { matches: false, addEventListener: (_, listener) => (desktopMedia.listener = listener) };

  toggle.dataset = { openLabel: "Open menu", closeLabel: "Close menu" };
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Open menu");
  menu.classList.add("hidden");
  menu.setAttribute("aria-hidden", "true");
  menu.setAttribute("inert", "");
  menu.inert = true;
  menu.contains = (element) => element === menuChild;

  const document = {
    querySelector: (selector) =>
      ({
        "[data-site-nav]": nav,
        "[data-nav-home]": homeLink,
        "[data-menu-toggle]": toggle,
        "[data-mobile-menu]": menu,
      })[selector] ?? null,
    querySelectorAll: () => [],
    addEventListener: (name, listener) => documentListeners.set(name, listener),
    activeElement: null,
  };
  const window = {
    scrollY: 0,
    addEventListener: (name, listener) => windowListeners.set(name, listener),
    matchMedia: () => desktopMedia,
  };

  vm.runInNewContext(await navbarScript(), { document, window });

  toggle.listeners.get("click")();
  assert.equal(toggle.getAttribute("aria-expanded"), "true", "clicking the hamburger must expose the X state");
  assert.equal(toggle.getAttribute("aria-label"), "Close menu", "open state must announce the close action");
  assert.equal(menu.classList.contains("hidden"), false);
  assert.equal(menu.inert, false, "an open menu must be keyboard-interactive");
  assert.equal(menu.getAttribute("aria-hidden"), "false");

  toggle.listeners.get("click")();
  assert.equal(toggle.getAttribute("aria-expanded"), "false", "clicking the X must close the menu");
  toggle.listeners.get("click")();
  assert.equal(toggle.getAttribute("aria-expanded"), "true", "the hamburger must reopen after closing");

  document.activeElement = menuChild;
  toggle.focused = false;
  window.scrollY = 80;
  windowListeners.get("scroll")();
  assert.equal(toggle.getAttribute("aria-expanded"), "false", "page scroll must restore the hamburger state");
  assert.equal(toggle.getAttribute("aria-label"), "Open menu");
  assert.equal(menu.inert, true);
  assert.equal(toggle.focused, true, "scroll close must not strand focus inside the inert menu");

  window.scrollY = 0;
  toggle.listeners.get("click")();
  documentListeners.get("keydown")({ key: "Escape", preventDefault() {} });
  assert.equal(toggle.getAttribute("aria-expanded"), "false", "Escape must close the menu");
  assert.equal(toggle.focused, true, "Escape must restore focus to the menu trigger");

  toggle.listeners.get("click")();
  document.activeElement = menuChild;
  homeLink.focused = false;
  desktopMedia.matches = true;
  desktopMedia.listener({ matches: true });
  assert.equal(toggle.getAttribute("aria-expanded"), "false", "desktop breakpoint must reset mobile state");
  assert.equal(menu.classList.contains("hidden"), true);
  assert.equal(homeLink.focused, true, "desktop reset must move menu focus to the visible home link");

  desktopMedia.matches = false;
  toggle.listeners.get("click")();
  windowListeners.get("orientationchange")();
  assert.equal(toggle.getAttribute("aria-expanded"), "false", "orientation changes must reset mobile state");
});
