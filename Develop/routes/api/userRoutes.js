import express from 'express';
const router = express.Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');


//api/users/:userId/friends/:friendId
router.route('/').get(getAllUsers).post(createUser);

//api/users/:id
router.route('/:id').get(getUserById).delete(deleteUser);

//api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;

