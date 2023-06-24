const router = require('express').Router();
//connecting all of the routes for usage

const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes')

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);


module.exports = router
