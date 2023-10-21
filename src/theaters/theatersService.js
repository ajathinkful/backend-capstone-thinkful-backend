const knex = require("../db/connection");

async function getAllTheatersWithMovies() {
  const theaters = await knex("theaters")
    .join(
      "movies_theaters",
      "theaters.theater_id",
      "=",
      "movies_theaters.theater_id"
    )
    .join("movies", "movies_theaters.movie_id", "=", "movies.movie_id")
    .select(
      "theaters.theater_id",
      "theaters.name",
      "theaters.address_line_1",
      "theaters.address_line_2",
      "theaters.city",
      "theaters.state",
      "theaters.zip",
      "movies.movie_id",
      "movies.title",
      "movies.runtime_in_minutes",
      "movies.rating"
    );

  const theatersMap = new Map();

  theaters.forEach((theater) => {
    const {
      theater_id,
      name,
      address_line_1,
      address_line_2,
      city,
      state,
      zip,
      movie_id,
      title,
      runtime_in_minutes,
      rating,
    } = theater;

    if (!theatersMap.has(theater_id)) {
      theatersMap.set(theater_id, {
        theater_id,
        name,
        address_line_1,
        address_line_2,
        city,
        state,
        zip,
        movies: [],
      });
    }

    theatersMap.get(theater_id).movies.push({
      movie_id,
      title,
      runtime_in_minutes,
      rating,
    });
  });

  const theatersWithMovies = Array.from(theatersMap.values());
  return theatersWithMovies;
}

module.exports = {
  getAllTheatersWithMovies,
};
