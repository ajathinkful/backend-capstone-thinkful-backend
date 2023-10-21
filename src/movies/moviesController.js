// src/movies/moviesController.js

const moviesService = require("./moviesService");

function list(req, res, next) {
  const { is_showing } = req.query;

  if (is_showing === "true") {
    moviesService
      .listIsShowing()
      .then((data) => res.json({ data }))
      .catch(next);
  } else {
    moviesService
      .list()
      .then((data) => res.json({ data }))
      .catch(next);
  }
}

function read(req, res, next) {
  const { movieId } = req.params;

  moviesService
    .read(movieId)
    .then((data) => {
      if (data) {
        res.json({ data });
      } else {
        res.status(404).json({ error: "Movie cannot be found." });
      }
    })
    .catch(next);
}

function listTheaters(req, res, next) {
  const { movieId } = req.params;

  moviesService
    .listTheaters(movieId)
    .then((data) => {
      if (data) {
        res.json({ data });
      } else {
        next({ status: 404, message: `Movie cannot be found.` });
      }
    })
    .catch(next);
}

function listReviews(req, res, next) {
  const { movieId } = req.params;

  moviesService
    .listReviews(movieId)
    .then((data) => {
      if (data) {
        res.json({ data });
      } else {
        next({ status: 404, message: `Movie cannot be found.` });
      }
    })
    .catch(next);
}

module.exports = {
  list,
  read,
  listTheaters,
  listReviews,
};
