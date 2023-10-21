// src/theaters/theatersController.js

const theatersService = require("./theatersService");

async function getAllTheaters(req, res, next) {
  try {
    const theaters = await theatersService.getAllTheatersWithMovies();
    res.json({ data: theaters });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllTheaters,
};
