const router = require('express').Router();
//connecting all of the routes for usage
// const reactionRoutes = require('./reactionRoutes');
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes')

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);
// router.use('/reactions', reactionRoutes);

module.exports = router
