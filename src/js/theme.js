const THEME_KEY = "tastytvTheme";

const applyTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  const btn = document.querySelector(".theme-toggle");
  if (btn) {
    btn.textContent = theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode";
  }
};

const initTheme = () => {
  const saved = localStorage.getItem(THEME_KEY) || "dark";
  applyTheme(saved);

  const btn = document.querySelector(".theme-toggle");
  if (btn) {
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
    });
  }
};

initTheme();
