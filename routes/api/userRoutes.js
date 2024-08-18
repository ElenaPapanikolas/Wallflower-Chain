// Importing Express Router
const router = require('express').Router();
// Importing functions from userController
const {
getAllUsers,
getOneUser,
newUser,
updateUser,
deleteUser,
addFriend,
deleteFriend
} = require('../../controllers/userController');

// /api/users endpoint to get all users and create new user
router.route('/').get(getAllUsers).post(newUser);

// /api/users/:userId endpoint to get single user and update user
router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId endpoint to add and delete friends
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

// Exporting router
module.exports = router;