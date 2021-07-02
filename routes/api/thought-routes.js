const router = require('express').Router();

const {
    addThought,
    deleteThought,
    updateThought,
    getAllThoughts,
    getThoughtById,
    createReaction,
    deleteReaction

}= require('../../controllers/thought-controller')

router
    .route('/')
    .post(addThought)
    .delete(deleteThought)
    .put(updateThought)
    .get(getAllThoughts)
router
    .route('/:id')
    .get(getThoughtById)
router
    .route('/:thoughtId/reactions')
    .put(createReaction)
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction)

module.exports = router;