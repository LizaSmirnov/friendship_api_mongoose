const router = require('express').Router();
const {
  getThought,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  removeThought,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThought).post(createThought);

// /api/courses/:courseId
router
  .route('/:courseId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
