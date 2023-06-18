const router = require('express').Router();
const {
  getReaction,
  getSingleReaction,
  createReaction,
  updateReaction,
  deleteReaction,
} = require('../../controllers/courseController.js');

// /api/reactions
router.route('/').get(getReaction).post(createReaction);

// /api/reaction/:reactionId
router
  .route('/:courseId')
  .get(getSingleReaction)
  .put(updateReaction)
  .delete(deleteReaction);

module.exports = router;
