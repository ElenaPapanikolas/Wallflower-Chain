// Importing Express Router and importing user and thought routes
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// /api endpoint
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// Exporting router
module.exports = router;