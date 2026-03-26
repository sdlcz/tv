const movies = [
  {
    name: "Vitalina Varela",
    time: "Monday at 09:00",
    storyline:
      "Vitalina Varela, a 55-year-old woman from Cape Verde, arrives in Lisbon three days after her husband's funeral. She's been waiting for her plane ticket for more than 25 years."
  },
  {
    name: "Ad Astra",
    time: "Monday at 09:00",
    storyline:
      "Thirty years ago, Clifford McBride led a voyage into deep space, but the ship and crew were never heard from again. Now his son -- a fearless astronaut -- must embark on a daring mission to Neptune to uncover the truth about his missing father and a mysterious power surge that threatens the stability of the universe."
  },
  {
    name: "After",
    time: "Monday at 21:00",
    storyline:
      "A young woman falls for a guy with a dark secret and the two embark on a rocky relationship. Based on the novel by Anna Todd."
  },
  {
    name: "Aladdin",
    time: "Monday at 21:00",
    storyline:
      "A kind-hearted street urchin and a power-hungry Grand Vizier vie for a magic lamp that has the power to make their deepest wishes come true."
  },
  {
    name: "Angel Has Fallen",
    time: "Tuesday at 09:00",
    storyline:
      "Secret Service Agent Mike Banning is framed for the attempted assassination of the President and must evade his own agency and the FBI as he tries to uncover the real threat."
  },
  {
    name: "Annabelle Comes Home",
    time: "Tuesday at 09:00",
    storyline:
      "Determined to keep Annabelle from wreaking more havoc, demonologists Ed and Lorraine Warren bring the possessed doll to the locked artifacts room in their home, placing her 'safely' behind sacred glass and enlisting a priest's holy blessing. But an unholy night of horror awaits as Annabelle awakens the evil spirits in the room, who all set their sights on a new target--the Warrens' ten-year-old daughter, Judy, and her friends."
  },
  {
    name: "Avengers: Endgame",
    time: "Tuesday at 21:00",
    storyline:
      "Now that Thanos has put his plan into action in 'Avengers: Infinity War', it's time to find a way to undo what happened."
  },
  {
    name: "Bacurau",
    time: "Tuesday at 21:00",
    storyline:
      "Shortly after the death of Dona Carmelita, residents of a small town located in the Brazilian Sertão called Bacurau discover that the community is no longer on any map."
  }
];

const formatRuntime = (runtime) => {
  const rt = parseInt(runtime, 10);
  if (isNaN(rt) || rt <= 0) return "";
  const hours = Math.floor(rt / 60);
  const mins = rt % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};

const addMovie = (time, name, storyline, year, runtime, categories) => {
  const moviesContainer = document.querySelector("#movies");

  const card = document.createElement("div");
  card.className = "movie-card";

  const timeEl = document.createElement("p");
  timeEl.className = "movie-time";
  timeEl.textContent = time;

  const titleEl = document.createElement("h3");
  titleEl.className = "movie-title";
  titleEl.textContent = name;

  const metaParts = [];
  if (year) metaParts.push(year);
  const runtimeStr = formatRuntime(runtime);
  if (runtimeStr) metaParts.push(runtimeStr);
  if (metaParts.length > 0) {
    const metaEl = document.createElement("p");
    metaEl.className = "movie-meta";
    metaEl.textContent = metaParts.join(" · ");
    card.appendChild(timeEl);
    card.appendChild(titleEl);
    card.appendChild(metaEl);
  } else {
    card.appendChild(timeEl);
    card.appendChild(titleEl);
  }

  const storylineEl = document.createElement("p");
  storylineEl.className = "movie-storyline";
  storylineEl.textContent = storyline;
  card.appendChild(storylineEl);

  if (categories && categories.length > 0) {
    const badgesEl = document.createElement("div");
    badgesEl.className = "genre-badges";
    categories.forEach((cat) => {
      const badge = document.createElement("span");
      badge.className = "badge";
      badge.textContent = cat;
      badgesEl.appendChild(badge);
    });
    card.appendChild(badgesEl);
  }

  moviesContainer.appendChild(card);
};

const addMovies = (movieList) => {
  const container = document.querySelector("#movies");
  container.innerHTML = "";

  if (movieList.length === 0) {
    const msg = document.createElement("p");
    msg.className = "no-results";
    msg.textContent = "No movies match your search.";
    container.appendChild(msg);
    return;
  }

  movieList.forEach((movie) => {
    addMovie(movie.time, movie.name, movie.storyline, movie.year, movie.runtime, movie.categories);
  });
};

const filterMovies = () => {
  const query = (document.getElementById("search-movies") || { value: "" }).value.trim().toLowerCase();
  const day = (document.getElementById("filter-day") || { value: "" }).value;

  const filtered = movies.filter((movie) => {
    const matchesQuery = !query || movie.name.toLowerCase().includes(query);
    const matchesDay = !day || movie.time.toLowerCase().startsWith(day.toLowerCase());
    return matchesQuery && matchesDay;
  });

  addMovies(filtered);
};

const initFilters = () => {
  const searchInput = document.getElementById("search-movies");
  const daySelect = document.getElementById("filter-day");
  if (searchInput) searchInput.addEventListener("input", filterMovies);
  if (daySelect) daySelect.addEventListener("change", filterMovies);
};

addMovies(movies);
initFilters();
