// src/reviews/reviewsRouter.js

const express = require("express");
const router = express.Router();
const reviewsController = require("./reviewsController");

router.delete("/:reviewId", reviewsController.destroy);
router.put("/:reviewId", reviewsController.update);

module.exports = router;
