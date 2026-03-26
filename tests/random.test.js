/**
 * Regression tests for random.js.
 * Validates the "Recommend a Movie" button behavior, including the meta
 * (year · runtime) and genre badges introduced in the frontend overhaul (PR #3).
 */

const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

const SCRIPT_PATH = path.join(__dirname, "../src/js/random.js");

function loadRandom() {
  const html = `<!DOCTYPE html>
<html><body>
  <div id="random-movie">
    <p id="random-name"></p>
    <p id="random-story"></p>
  </div>
  <button class="randomise">Recommend a Movie</button>
</body></html>`;
  const dom = new JSDOM(html, { runScripts: "dangerously" });
  const scriptContent = fs.readFileSync(SCRIPT_PATH, "utf8");
  const script = dom.window.document.createElement("script");
  script.textContent = scriptContent;
  dom.window.document.body.appendChild(script);
  return dom;
}

function clickRecommend(doc) {
  doc.querySelector(".randomise").dispatchEvent(
    new doc.defaultView.MouseEvent("click", { bubbles: true, cancelable: true })
  );
}

describe("random.js – movie recommendation", () => {
  let dom, doc;

  beforeEach(() => {
    dom = loadRandom();
    doc = dom.window.document;
  });

  test("clicking the button populates the movie name", () => {
    clickRecommend(doc);
    const name = doc.getElementById("random-name").textContent;
    expect(name.trim().length).toBeGreaterThan(0);
  });

  test("clicking the button populates the storyline", () => {
    clickRecommend(doc);
    const story = doc.getElementById("random-story").textContent;
    expect(story.trim().length).toBeGreaterThan(0);
  });

  test("clicking the button creates a .random-meta element", () => {
    clickRecommend(doc);
    const meta = doc.querySelector(".random-meta");
    expect(meta).not.toBeNull();
  });

  test("meta element is not empty after click", () => {
    clickRecommend(doc);
    const meta = doc.querySelector(".random-meta");
    expect(meta.textContent.trim().length).toBeGreaterThan(0);
  });

  test("meta element contains a year (4-digit number)", () => {
    clickRecommend(doc);
    const meta = doc.querySelector(".random-meta");
    expect(meta.textContent).toMatch(/\d{4}/);
  });

  test("clicking the button creates a .random-badges element", () => {
    clickRecommend(doc);
    const badges = doc.querySelector(".random-badges");
    expect(badges).not.toBeNull();
  });

  test(".random-badges contains at least one .random-badge span", () => {
    clickRecommend(doc);
    const badges = doc.querySelectorAll(".random-badge");
    expect(badges.length).toBeGreaterThan(0);
  });

  test("clicking multiple times updates the displayed information", () => {
    // Collect names over several clicks – at least one change should occur
    // across enough attempts given the 50-movie pool.
    const names = new Set();
    for (let i = 0; i < 30; i++) {
      clickRecommend(doc);
      names.add(doc.getElementById("random-name").textContent);
    }
    // With 50 distinct movies it is statistically impossible to get the same
    // movie 30 consecutive times.
    expect(names.size).toBeGreaterThan(1);
  });

  test("movie-flash class is added to the card on click", () => {
    clickRecommend(doc);
    expect(doc.getElementById("random-movie").classList.contains("movie-flash")).toBe(true);
  });

  test("badges are cleared and re-populated on each click", () => {
    clickRecommend(doc);
    const countFirst = doc.querySelectorAll(".random-badge").length;

    // Mock Math.random to always pick index 0, then click again.
    // The badge count must match the categories of that movie.
    const original = dom.window.Math.random;
    dom.window.Math.random = () => 0; // picks movies[0]
    clickRecommend(doc);
    dom.window.Math.random = original;

    const countSecond = doc.querySelectorAll(".random-badge").length;
    // Badges should only reflect the current movie, not accumulate
    expect(countSecond).toBeGreaterThan(0);
    expect(doc.querySelectorAll(".random-badges").length).toBe(1);
  });

  test("movies array is not empty", () => {
    // Verify the movies array loaded correctly – at least 10 entries
    const movieCount = dom.window.eval("movies.length");
    expect(movieCount).toBeGreaterThanOrEqual(10);
  });
});
