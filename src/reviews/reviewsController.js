// src/reviews/reviewsController.js

const reviewsService = require("./reviewsService");

async function update(req, res, next) {
  const { reviewId } = req.params;
  const updatedReview = {
    ...req.body.data,
    review_id: reviewId,
  };
  console.log(reviewId); // Check if this prints the correct reviewId
  console.log(updatedReview); // Check if this contains the updated content and score
  try {
    const review = await reviewsService.getReviewById(reviewId);

    if (!review) {
      return res.status(404).json({ error: "Review cannot be found." });
    }

    const updatedReviewResult = await reviewsService.updateReview(
      reviewId,

      updatedReview
    );

    res.json({ data: updatedReviewResult });
  } catch (error) {
    next(error);
  }
}

async function destroy(req, res, next) {
  const { reviewId } = req.params;

  try {
    const review = await reviewsService.getReviewById(reviewId);

    if (!review) {
      return res.status(404).json({ error: "Review cannot be found." });
    }

    await reviewsService.deleteReview(reviewId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  update,
  destroy,
};
