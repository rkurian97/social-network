const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    deleteFriend

}= require('../../controllers/user-controller')

router
    .route('/')
    .post(createUser)
    .get(getAllUsers);
router
    .route('/:id')
    .delete(deleteUser)
    .put(updateUser)
    .get(getUserById)
router
    .route('/:userId/friends/:friendId')
    .put(addFriend)
    .delete(deleteFriend)
        


module.exports = router;