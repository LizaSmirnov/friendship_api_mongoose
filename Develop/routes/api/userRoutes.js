const router = require('express').Router();

const {
    getUserById,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');


//api/users/:userId/friends/:friendId
router.route('/').get(getAllUsers).post(createUser);

//api/users/:id
router.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

//api/users/:userId/friends/:friendId
router.route('/:id/friends/:friendId')
.post(addFriend)
.delete(removeFriend);

module.exports = router;

