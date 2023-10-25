if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

app.use(cors());

app.use(express.json()); // Add this line to parse JSON request bodies

const moviesRouter = require("./movies/moviesRouter");
const reviewsRouter = require("./reviews/reviewsRouter");
const theatersRouter = require("./theaters/theatersRouter");

app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

module.exports = app;
