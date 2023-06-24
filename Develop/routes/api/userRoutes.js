const router = require('express').Router();

const {
    getUserById,
    getAllUsers,
    createUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');


//api/users/:userId/friends/:friendId
router.route('/').get(getAllUsers).post(createUser);

//api/users/:id
router.route('/:id').get(getUserById).put(createUser).delete(deleteUser);

//api/users/:userId/friends/:friendId
router.route('/:id/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;

