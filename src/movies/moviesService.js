// src/movies/moviesService.js

const knex = require("../db/connection");

function list() {
  return knex("movies").select("*");
}

function listIsShowing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "=", "mt.movie_id")
    .distinct("m.*")
    .where({ "mt.is_showing": true });
}

function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

function listTheaters(movieId) {
  return knex("theaters")
    .join(
      "movies_theaters",
      "theaters.theater_id",
      "=",
      "movies_theaters.theater_id"
    )
    .where({ "movies_theaters.movie_id": movieId })
    .select("*");
}

function listReviews(movieId) {
  return knex("reviews")
    .join("critics", "reviews.critic_id", "=", "critics.critic_id")
    .where({ "reviews.movie_id": movieId })
    .select(
      "reviews.*",
      "critics.critic_id",
      "critics.preferred_name",
      "critics.surname",
      "critics.organization_name"
    )
    .then((reviews) => {
      // Add a nested "critic" object for each review
      return reviews.map((review) => ({
        ...review,
        critic: {
          preferred_name: review.preferred_name,
          surname: review.surname,
          organization_name: review.organization_name,
        },
      }));
    });
}

module.exports = {
  list,
  listIsShowing,
  read,
  listTheaters,
  listReviews,
};
