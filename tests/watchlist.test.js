/**
 * Tests for watchlist.js.
 * Validates rendering, add, remove, and clear operations using a mocked localStorage.
 */

const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

const SCRIPT_PATH = path.join(__dirname, "../src/js/watchlist.js");

function makeLocalStorage() {
  const store = {};
  return {
    getItem: (key) => (key in store ? store[key] : null),
    setItem: (key, val) => { store[key] = String(val); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { Object.keys(store).forEach((k) => delete store[k]); }
  };
}

function loadWatchlist(initialItems = []) {
  const html = `<!DOCTYPE html><html><body>
    <div class="watchlist-actions" style="display:none;">
      <button class="wl-clear-btn" id="wl-clear-all">Clear All</button>
    </div>
    <p id="watchlist-empty">Empty</p>
    <div id="watchlist-items"></div>
  </body></html>`;

  const dom = new JSDOM(html, { runScripts: "dangerously" });

  // Inject mock localStorage with pre-populated data
  const ls = makeLocalStorage();
  if (initialItems.length > 0) {
    ls.setItem("tastytvWatchlist", JSON.stringify(initialItems));
  }
  Object.defineProperty(dom.window, "localStorage", { value: ls });

  const scriptContent = fs.readFileSync(SCRIPT_PATH, "utf8");
  const script = dom.window.document.createElement("script");
  script.textContent = scriptContent;
  dom.window.document.body.appendChild(script);
  return dom;
}

describe("watchlist.js – rendering", () => {
  test("shows empty message when watchlist is empty", () => {
    const dom = loadWatchlist([]);
    const empty = dom.window.document.getElementById("watchlist-empty");
    expect(empty.style.display).not.toBe("none");
    const cards = dom.window.document.querySelectorAll(".watchlist-card");
    expect(cards.length).toBe(0);
  });

  test("hides empty message and renders cards when watchlist has items", () => {
    const dom = loadWatchlist([
      { name: "Ad Astra", year: 2019, runtime: 124, categories: ["sci-fi"], storyline: "A space story." }
    ]);
    const empty = dom.window.document.getElementById("watchlist-empty");
    expect(empty.style.display).toBe("none");
    const cards = dom.window.document.querySelectorAll(".watchlist-card");
    expect(cards.length).toBe(1);
  });

  test("renders movie title for each item", () => {
    const dom = loadWatchlist([
      { name: "Ad Astra", year: 2019, runtime: 124, categories: ["sci-fi"], storyline: "A space story." },
      { name: "Aladdin", year: 2019, runtime: 128, categories: ["animation"], storyline: "A magic lamp." }
    ]);
    const titles = Array.from(
      dom.window.document.querySelectorAll(".wl-title")
    ).map((el) => el.textContent);
    expect(titles).toContain("Ad Astra");
    expect(titles).toContain("Aladdin");
  });

  test("renders meta (year · runtime) for items that have them", () => {
    const dom = loadWatchlist([
      { name: "Ad Astra", year: 2019, runtime: 124, categories: [], storyline: "A story." }
    ]);
    const meta = dom.window.document.querySelector(".wl-meta");
    expect(meta).not.toBeNull();
    expect(meta.textContent).toBe("2019 · 2h 4m");
  });

  test("renders genre badges for items that have categories", () => {
    const dom = loadWatchlist([
      { name: "Ad Astra", year: 2019, runtime: 124, categories: ["sci-fi", "thriller"], storyline: "A story." }
    ]);
    const badges = dom.window.document.querySelectorAll(".wl-badge");
    expect(badges.length).toBe(2);
    expect(badges[0].textContent).toBe("sci-fi");
    expect(badges[1].textContent).toBe("thriller");
  });

  test("renders storyline text", () => {
    const dom = loadWatchlist([
      { name: "Ad Astra", year: 2019, runtime: 124, categories: [], storyline: "A deep space journey." }
    ]);
    const story = dom.window.document.querySelector(".wl-story");
    expect(story.textContent).toBe("A deep space journey.");
  });

  test("renders a remove button for each card", () => {
    const dom = loadWatchlist([
      { name: "Ad Astra", year: 2019, runtime: 124, categories: [], storyline: "Story." },
      { name: "Aladdin", year: 2019, runtime: 128, categories: [], storyline: "Story." }
    ]);
    const removeBtns = dom.window.document.querySelectorAll(".wl-remove-btn");
    expect(removeBtns.length).toBe(2);
  });

  test("shows the actions bar when watchlist has items", () => {
    const dom = loadWatchlist([
      { name: "Ad Astra", year: 2019, runtime: 124, categories: [], storyline: "Story." }
    ]);
    const actions = dom.window.document.querySelector(".watchlist-actions");
    expect(actions.style.display).toBe("flex");
  });
});

describe("watchlist.js – remove", () => {
  test("clicking remove on a card removes it from the DOM", () => {
    const dom = loadWatchlist([
      { name: "Ad Astra", year: 2019, runtime: 124, categories: [], storyline: "Story." },
      { name: "Aladdin", year: 2019, runtime: 128, categories: [], storyline: "Story." }
    ]);
    const removeBtn = dom.window.document.querySelectorAll(".wl-remove-btn")[0];
    removeBtn.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
    const cards = dom.window.document.querySelectorAll(".watchlist-card");
    expect(cards.length).toBe(1);
  });

  test("removing last item shows the empty message", () => {
    const dom = loadWatchlist([
      { name: "Ad Astra", year: 2019, runtime: 124, categories: [], storyline: "Story." }
    ]);
    const removeBtn = dom.window.document.querySelector(".wl-remove-btn");
    removeBtn.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
    const empty = dom.window.document.getElementById("watchlist-empty");
    expect(empty.style.display).toBe("block");
  });
});

describe("watchlist.js – clear all", () => {
  test("clicking clear-all removes all cards", () => {
    const dom = loadWatchlist([
      { name: "Ad Astra", year: 2019, runtime: 124, categories: [], storyline: "Story." },
      { name: "Aladdin", year: 2019, runtime: 128, categories: [], storyline: "Story." }
    ]);
    const clearBtn = dom.window.document.getElementById("wl-clear-all");
    clearBtn.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
    const cards = dom.window.document.querySelectorAll(".watchlist-card");
    expect(cards.length).toBe(0);
  });

  test("clicking clear-all shows the empty message", () => {
    const dom = loadWatchlist([
      { name: "Ad Astra", year: 2019, runtime: 124, categories: [], storyline: "Story." }
    ]);
    const clearBtn = dom.window.document.getElementById("wl-clear-all");
    clearBtn.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
    const empty = dom.window.document.getElementById("watchlist-empty");
    expect(empty.style.display).toBe("block");
  });
});
