// src/movies/moviesRouter.js

const express = require("express");
const router = express.Router();
const controller = require("./moviesController");

router.route("/").get(controller.list);

router.route("/:movieId").get(controller.read);

router.route("/:movieId/theaters").get(controller.listTheaters);

router.route("/:movieId/reviews").get(controller.listReviews);

router.route("/:movieId/critics").get((req, res) => {
  res.status(404).json({ error: "Endpoint not found." });
});

module.exports = router;
