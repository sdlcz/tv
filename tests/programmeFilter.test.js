/**
 * Tests for the programme.js search/filter feature.
 * Validates that filterMovies() correctly filters cards by title keyword and day.
 */

const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

const SCRIPT_PATH = path.join(__dirname, "../src/js/programme.js");

function loadProgramme(extraHtml = "") {
  const html = `<!DOCTYPE html><html><body>
    ${extraHtml}
    <div id="movies"></div>
  </body></html>`;
  const dom = new JSDOM(html, { runScripts: "dangerously" });
  const scriptContent = fs.readFileSync(SCRIPT_PATH, "utf8");
  const script = dom.window.document.createElement("script");
  script.textContent = scriptContent;
  dom.window.document.body.appendChild(script);
  return dom;
}

describe("programme.js – search/filter bar", () => {
  test("filterMovies returns all 8 movies when search and day are empty", () => {
    const filterHtml = `
      <input id="search-movies" value="" />
      <select id="filter-day"><option value="">All Days</option></select>`;
    const dom = loadProgramme(filterHtml);
    const cards = dom.window.document.querySelectorAll(".movie-card");
    expect(cards.length).toBe(8);
  });

  test("filterMovies filters by title keyword (case-insensitive)", () => {
    const filterHtml = `
      <input id="search-movies" value="" />
      <select id="filter-day"><option value="">All Days</option></select>`;
    const dom = loadProgramme(filterHtml);
    const { window } = dom;

    // Set search value and trigger input event
    window.document.getElementById("search-movies").value = "avengers";
    window.document.getElementById("search-movies").dispatchEvent(
      new window.Event("input", { bubbles: true })
    );

    const cards = window.document.querySelectorAll(".movie-card");
    expect(cards.length).toBe(1);
    expect(cards[0].querySelector(".movie-title").textContent).toBe("Avengers: Endgame");
  });

  test("filterMovies filters by day (Monday)", () => {
    const filterHtml = `
      <input id="search-movies" value="" />
      <select id="filter-day">
        <option value="">All Days</option>
        <option value="monday">Monday</option>
      </select>`;
    const dom = loadProgramme(filterHtml);
    const { window } = dom;

    window.document.getElementById("filter-day").value = "monday";
    window.document.getElementById("filter-day").dispatchEvent(
      new window.Event("change", { bubbles: true })
    );

    const cards = window.document.querySelectorAll(".movie-card");
    // Monday movies: Vitalina Varela, Ad Astra, After, Aladdin = 4
    expect(cards.length).toBe(4);
    cards.forEach((card) => {
      expect(card.querySelector(".movie-time").textContent.toLowerCase()).toContain("monday");
    });
  });

  test("filterMovies filters by day (Tuesday)", () => {
    const filterHtml = `
      <input id="search-movies" value="" />
      <select id="filter-day">
        <option value="">All Days</option>
        <option value="tuesday">Tuesday</option>
      </select>`;
    const dom = loadProgramme(filterHtml);
    const { window } = dom;

    window.document.getElementById("filter-day").value = "tuesday";
    window.document.getElementById("filter-day").dispatchEvent(
      new window.Event("change", { bubbles: true })
    );

    const cards = window.document.querySelectorAll(".movie-card");
    expect(cards.length).toBe(4);
    cards.forEach((card) => {
      expect(card.querySelector(".movie-time").textContent.toLowerCase()).toContain("tuesday");
    });
  });

  test("filterMovies combines title search and day filter", () => {
    const filterHtml = `
      <input id="search-movies" value="" />
      <select id="filter-day">
        <option value="">All Days</option>
        <option value="monday">Monday</option>
      </select>`;
    const dom = loadProgramme(filterHtml);
    const { window } = dom;

    window.document.getElementById("search-movies").value = "aladdin";
    window.document.getElementById("search-movies").dispatchEvent(
      new window.Event("input", { bubbles: true })
    );
    window.document.getElementById("filter-day").value = "monday";
    window.document.getElementById("filter-day").dispatchEvent(
      new window.Event("change", { bubbles: true })
    );

    const cards = window.document.querySelectorAll(".movie-card");
    expect(cards.length).toBe(1);
    expect(cards[0].querySelector(".movie-title").textContent).toBe("Aladdin");
  });

  test("filterMovies shows no-results message when nothing matches", () => {
    const filterHtml = `
      <input id="search-movies" value="" />
      <select id="filter-day"><option value="">All Days</option></select>`;
    const dom = loadProgramme(filterHtml);
    const { window } = dom;

    window.document.getElementById("search-movies").value = "xyznotamovie999";
    window.document.getElementById("search-movies").dispatchEvent(
      new window.Event("input", { bubbles: true })
    );

    const cards = window.document.querySelectorAll(".movie-card");
    expect(cards.length).toBe(0);
    const noResults = window.document.querySelector(".no-results");
    expect(noResults).not.toBeNull();
    expect(noResults.textContent).toContain("No movies");
  });

  test("filterMovies is not sensitive to extra whitespace in search", () => {
    const filterHtml = `
      <input id="search-movies" value="" />
      <select id="filter-day"><option value="">All Days</option></select>`;
    const dom = loadProgramme(filterHtml);
    const { window } = dom;

    window.document.getElementById("search-movies").value = "  after  ";
    window.document.getElementById("search-movies").dispatchEvent(
      new window.Event("input", { bubbles: true })
    );

    const cards = window.document.querySelectorAll(".movie-card");
    expect(cards.length).toBe(1);
    expect(cards[0].querySelector(".movie-title").textContent).toBe("After");
  });
});
