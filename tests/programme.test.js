/**
 * Regression tests for programme.js.
 * Validates that movie cards are rendered correctly in the DOM,
 * including optional meta (year / runtime) and genre badge elements
 * introduced in the frontend overhaul (PR #3).
 */

const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

const SCRIPT_PATH = path.join(__dirname, "../src/js/programme.js");

function loadProgramme() {
  const html = '<!DOCTYPE html><html><body><div id="movies"></div></body></html>';
  const dom = new JSDOM(html, { runScripts: "dangerously" });
  const scriptContent = fs.readFileSync(SCRIPT_PATH, "utf8");
  const script = dom.window.document.createElement("script");
  script.textContent = scriptContent;
  dom.window.document.body.appendChild(script);
  return dom;
}

describe("programme.js – DOM rendering", () => {
  let dom;

  beforeEach(() => {
    dom = loadProgramme();
  });

  test("renders the expected number of movie cards on load", () => {
    const cards = dom.window.document.querySelectorAll(".movie-card");
    // programme.js defines 8 movies in its movies array
    expect(cards.length).toBe(8);
  });

  test("each card contains a movie-time element", () => {
    const timeEls = dom.window.document.querySelectorAll(".movie-time");
    expect(timeEls.length).toBe(8);
    timeEls.forEach((el) => {
      expect(el.textContent.trim().length).toBeGreaterThan(0);
    });
  });

  test("each card contains a movie-title element", () => {
    const titleEls = dom.window.document.querySelectorAll(".movie-title");
    expect(titleEls.length).toBe(8);
    titleEls.forEach((el) => {
      expect(el.textContent.trim().length).toBeGreaterThan(0);
    });
  });

  test("each card contains a movie-storyline element", () => {
    const storylineEls = dom.window.document.querySelectorAll(".movie-storyline");
    expect(storylineEls.length).toBe(8);
    storylineEls.forEach((el) => {
      expect(el.textContent.trim().length).toBeGreaterThan(0);
    });
  });

  test("cards with no year/runtime do not render a movie-meta element", () => {
    // The default movies in programme.js have no year or runtime data,
    // so no meta line should appear.
    const metaEls = dom.window.document.querySelectorAll(".movie-meta");
    expect(metaEls.length).toBe(0);
  });

  test("addMovies renders a movie-meta element when year and runtime are supplied", () => {
    const { window } = dom;
    window.eval(`
      addMovies([{
        name: "Meta Movie",
        time: "Wednesday at 20:00",
        storyline: "A movie with rich metadata.",
        year: 2022,
        runtime: 105
      }]);
    `);
    const metaEl = window.document.querySelector(".movie-meta");
    expect(metaEl).not.toBeNull();
    expect(metaEl.textContent).toBe("2022 · 1h 45m");
  });

  test("meta element uses · as separator when both year and runtime are present", () => {
    const { window } = dom;
    window.eval(`
      addMovies([{
        name: "Meta Movie",
        time: "Wednesday at 20:00",
        storyline: "A storyline.",
        year: 2019,
        runtime: 124
      }]);
    `);
    const metaEl = window.document.querySelector(".movie-meta");
    const parts = metaEl.textContent.split("·").map((p) => p.trim());
    expect(parts.length).toBe(2);
    expect(parts[0]).toMatch(/^\d{4}$/);
    expect(parts[1]).toMatch(/\d+h \d+m|\d+m/);
  });

  test("cards with no categories do not render genre-badges", () => {
    // The default movies in programme.js have no categories data.
    const badgesContainers = dom.window.document.querySelectorAll(".genre-badges");
    expect(badgesContainers.length).toBe(0);
  });

  test("addMovies renders genre-badges when categories are supplied", () => {
    const { window } = dom;
    window.eval(`
      addMovies([{
        name: "Genre Movie",
        time: "Thursday at 18:00",
        storyline: "A movie with genres.",
        categories: ["action", "sci-fi"]
      }]);
    `);
    const badgesContainer = window.document.querySelector(".genre-badges");
    expect(badgesContainer).not.toBeNull();
    const badges = badgesContainer.querySelectorAll(".badge");
    expect(badges.length).toBe(2);
    expect(badges[0].textContent).toBe("action");
    expect(badges[1].textContent).toBe("sci-fi");
  });

  test("known movie 'Vitalina Varela' appears in the programme", () => {
    const titles = Array.from(
      dom.window.document.querySelectorAll(".movie-title")
    ).map((el) => el.textContent);
    expect(titles).toContain("Vitalina Varela");
  });

  test("known movie 'Avengers: Endgame' appears in the programme", () => {
    const titles = Array.from(
      dom.window.document.querySelectorAll(".movie-title")
    ).map((el) => el.textContent);
    expect(titles).toContain("Avengers: Endgame");
  });

  test("addMovies clears existing content before re-rendering", () => {
    const { window } = dom;
    // Call addMovies again with a single custom movie
    window.eval(`
      addMovies([{
        name: "Test Movie",
        time: "Friday at 18:00",
        storyline: "Test storyline."
      }]);
    `);
    const cards = window.document.querySelectorAll(".movie-card");
    expect(cards.length).toBe(1);
    expect(cards[0].querySelector(".movie-title").textContent).toBe("Test Movie");
  });

  test("addMovies renders movie without optional fields (no meta, no badges)", () => {
    const { window } = dom;
    window.eval(`
      addMovies([{
        name: "Minimal Movie",
        time: "Saturday at 10:00",
        storyline: "Just a storyline."
      }]);
    `);
    const card = window.document.querySelector(".movie-card");
    expect(card.querySelector(".movie-time").textContent).toBe("Saturday at 10:00");
    expect(card.querySelector(".movie-title").textContent).toBe("Minimal Movie");
    expect(card.querySelector(".movie-storyline").textContent).toBe("Just a storyline.");
    expect(card.querySelector(".movie-meta")).toBeNull();
    expect(card.querySelector(".genre-badges")).toBeNull();
  });
});
