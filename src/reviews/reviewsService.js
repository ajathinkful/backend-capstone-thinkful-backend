const knex = require("../db/connection");

function getReviewById(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).first();
}

function updateReview(reviewId, updatedReview) {
  console.log("Review ID in Service:", reviewId);
  console.log("Updated Review in Service:", updatedReview);

  updatedReview.updated_at = knex.fn.now(); // Set updated_at timestamp

  return knex("reviews")
    .where({ review_id: reviewId })
    .update(updatedReview, ["*"])
    .then(async (updatedReviews) => {
      if (updatedReviews.length === 0) {
        throw new Error("Review not found or not updated");
      }

      // Retrieve the updated review
      const updatedReviewData = await getReviewById(reviewId);

      // Retrieve the critic information
      const critic = await getCriticById(updatedReviewData.critic_id);
      updatedReviewData.critic = critic;

      return updatedReviewData;
    });
}

function deleteReview(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

function getCriticById(criticId) {
  return knex("critics").where({ critic_id: criticId }).first();
}

module.exports = {
  getReviewById,
  updateReview,
  deleteReview,
  getCriticById, // Add this line to export the getCriticById function
};
