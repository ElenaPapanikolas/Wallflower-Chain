// Importing Express Router
const router = require('express').Router();
// Importing functions from thoughtController
const {
getAllThoughts,
getOneThought,
newThought,
updateThought,
deleteThought,
newReaction,
deleteReaction
} = require('../../controllers/thoughtController');

// /api/thoughts Endpoint to get all thoughts and to post new thought
router.route('/').get(getAllThoughts).post(newThought);

// /api/thoughts/:thoughtId Endpoint to get single thought, update a thought and to delete a thought
router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions Endpoint to create a reaction
router.route('/:thoughtId/reactions').post(newReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId Endpoint to delete a reaction
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// Exporting router
module.exports = router;