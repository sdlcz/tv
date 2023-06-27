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

const addMovie = (time, name, storyline) => {
  const timeContainer = document.querySelector("#movies");
  const moviesContainer = document.querySelector("#movies");
  const storylineContainer = document.querySelector("#movies");

  const timeElement = document.createElement("h2");
  const movieElement = document.createElement("h3");
  const storylineElement = document.createElement("p");

  timeElement.textContent = time;
  movieElement.textContent = name;
  storylineElement.textContent = storyline;

  timeContainer.appendChild(timeElement);
  moviesContainer.appendChild(movieElement);
  storylineContainer.appendChild(storylineElement);

  timeElement.style.padding = "15px";
  timeElement.style.textAlign = "left";
};

const addMovies = (movies) => {
  document.querySelector("#movies").innerHTML = "";

  movies.forEach((movie) => {
    addMovie(movie.name, movie.time, movie.storyline);
  });
};

addMovies(movies);
