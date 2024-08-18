// Importing Express Router and importing API routes
const router = require('express').Router();
const apiRoutes = require('./api');

// Any requests that start with /api will be handled by apiRoutes
router.use('/api', apiRoutes);

// Any request that doesn't match /api path will get this response
router.use((req, res) => {
    return res.send('Wrong Route!');
});

// Exporting router
module.exports = router;