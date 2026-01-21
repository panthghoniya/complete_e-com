const express = require('express');
const router = express.Router();
const { getUsers, deleteUser, getUserById, updateUser } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getUsers);
router.route('/:id')
    .delete(protect, admin, deleteUser)
    .get(getUserById)
    .put(updateUser);

module.exports = router;
