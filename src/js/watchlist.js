const WATCHLIST_KEY = "tastytvWatchlist";

const getWatchlist = () => {
  try {
    return JSON.parse(localStorage.getItem(WATCHLIST_KEY)) || [];
  } catch (_) {
    return [];
  }
};

const saveWatchlist = (list) => {
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
};

const formatRuntime = (runtime) => {
  const rt = parseInt(runtime, 10);
  if (isNaN(rt) || rt <= 0) return "";
  const hours = Math.floor(rt / 60);
  const mins = rt % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};

const renderWatchlist = () => {
  const container = document.getElementById("watchlist-items");
  const emptyEl = document.getElementById("watchlist-empty");
  const actionsEl = document.querySelector(".watchlist-actions");
  const list = getWatchlist();

  container.innerHTML = "";

  if (list.length === 0) {
    if (emptyEl) emptyEl.style.display = "block";
    if (actionsEl) actionsEl.style.display = "none";
    return;
  }

  if (emptyEl) emptyEl.style.display = "none";
  if (actionsEl) actionsEl.style.display = "flex";

  list.forEach((movie, index) => {
    const card = document.createElement("div");
    card.className = "watchlist-card";

    const titleEl = document.createElement("p");
    titleEl.className = "wl-title";
    titleEl.textContent = movie.name;
    card.appendChild(titleEl);

    const metaParts = [];
    if (movie.year) metaParts.push(movie.year);
    const runtimeStr = formatRuntime(movie.runtime);
    if (runtimeStr) metaParts.push(runtimeStr);
    if (metaParts.length > 0) {
      const metaEl = document.createElement("p");
      metaEl.className = "wl-meta";
      metaEl.textContent = metaParts.join(" · ");
      card.appendChild(metaEl);
    }

    const storyEl = document.createElement("p");
    storyEl.className = "wl-story";
    storyEl.textContent = movie.storyline || "";
    card.appendChild(storyEl);

    if (movie.categories && movie.categories.length > 0) {
      const badgesEl = document.createElement("div");
      badgesEl.className = "wl-badges";
      movie.categories.forEach((cat) => {
        const badge = document.createElement("span");
        badge.className = "wl-badge";
        badge.textContent = cat;
        badgesEl.appendChild(badge);
      });
      card.appendChild(badgesEl);
    }

    const removeBtn = document.createElement("button");
    removeBtn.className = "wl-remove-btn";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      const updated = getWatchlist().filter((_, i) => i !== index);
      saveWatchlist(updated);
      renderWatchlist();
    });
    card.appendChild(removeBtn);

    container.appendChild(card);
  });
};

const initClearAll = () => {
  const btn = document.getElementById("wl-clear-all");
  if (btn) {
    btn.addEventListener("click", () => {
      saveWatchlist([]);
      renderWatchlist();
    });
  }
};

renderWatchlist();
initClearAll();
