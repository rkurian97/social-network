const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser

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
        


module.exports = router;