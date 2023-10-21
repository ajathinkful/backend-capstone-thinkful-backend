// src/theaters/theatersRouter.js

const express = require("express");
const router = express.Router();
const theatersController = require("./theatersController");

router.get("/", theatersController.getAllTheaters);

module.exports = router;
