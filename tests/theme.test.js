/**
 * Tests for theme.js.
 * Validates that the theme toggle applies data-theme attributes and persists the preference.
 */

const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

const SCRIPT_PATH = path.join(__dirname, "../src/js/theme.js");

function makeLocalStorage() {
  const store = {};
  return {
    getItem: (key) => (key in store ? store[key] : null),
    setItem: (key, val) => { store[key] = String(val); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { Object.keys(store).forEach((k) => delete store[k]); }
  };
}

function loadTheme(savedTheme = null) {
  const html = `<!DOCTYPE html><html><body>
    <button class="theme-toggle">☀️ Light Mode</button>
  </body></html>`;
  const dom = new JSDOM(html, { runScripts: "dangerously" });

  const ls = makeLocalStorage();
  if (savedTheme) ls.setItem("tastytvTheme", savedTheme);
  Object.defineProperty(dom.window, "localStorage", { value: ls });

  const scriptContent = fs.readFileSync(SCRIPT_PATH, "utf8");
  const script = dom.window.document.createElement("script");
  script.textContent = scriptContent;
  dom.window.document.body.appendChild(script);
  return { dom, ls };
}

describe("theme.js – initialisation", () => {
  test("defaults to dark theme when no preference is saved", () => {
    const { dom } = loadTheme(null);
    expect(dom.window.document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  test("restores saved dark theme on load", () => {
    const { dom } = loadTheme("dark");
    expect(dom.window.document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  test("restores saved light theme on load", () => {
    const { dom } = loadTheme("light");
    expect(dom.window.document.documentElement.getAttribute("data-theme")).toBe("light");
  });

  test("button label says Light Mode in dark theme", () => {
    const { dom } = loadTheme("dark");
    const btn = dom.window.document.querySelector(".theme-toggle");
    expect(btn.textContent).toContain("Light Mode");
  });

  test("button label says Dark Mode in light theme", () => {
    const { dom } = loadTheme("light");
    const btn = dom.window.document.querySelector(".theme-toggle");
    expect(btn.textContent).toContain("Dark Mode");
  });
});

describe("theme.js – toggle", () => {
  test("clicking the button switches from dark to light", () => {
    const { dom } = loadTheme("dark");
    const btn = dom.window.document.querySelector(".theme-toggle");
    btn.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
    expect(dom.window.document.documentElement.getAttribute("data-theme")).toBe("light");
  });

  test("clicking the button switches from light to dark", () => {
    const { dom } = loadTheme("light");
    const btn = dom.window.document.querySelector(".theme-toggle");
    btn.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
    expect(dom.window.document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  test("button label updates to Dark Mode after switching to light", () => {
    const { dom } = loadTheme("dark");
    const btn = dom.window.document.querySelector(".theme-toggle");
    btn.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
    expect(btn.textContent).toContain("Dark Mode");
  });

  test("button label updates to Light Mode after switching back to dark", () => {
    const { dom } = loadTheme("light");
    const btn = dom.window.document.querySelector(".theme-toggle");
    btn.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
    expect(btn.textContent).toContain("Light Mode");
  });

  test("theme preference is saved to localStorage on toggle", () => {
    const { dom, ls } = loadTheme("dark");
    const btn = dom.window.document.querySelector(".theme-toggle");
    btn.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
    expect(ls.getItem("tastytvTheme")).toBe("light");
  });

  test("toggling twice returns to original theme", () => {
    const { dom } = loadTheme("dark");
    const btn = dom.window.document.querySelector(".theme-toggle");
    btn.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
    btn.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
    expect(dom.window.document.documentElement.getAttribute("data-theme")).toBe("dark");
  });
});
