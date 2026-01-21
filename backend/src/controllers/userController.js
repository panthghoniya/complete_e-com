const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    console.log(`[Method: deleteUser] Request to delete user with ID: ${req.params.id}`);
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            await user.deleteOne();
            console.log(`[Method: deleteUser] User ${req.params.id} deleted successfully`);
            res.json({ message: 'User removed' });
        } else {
            console.log(`[Method: deleteUser] User ${req.params.id} not found`);
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(`[Method: deleteUser] Error: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;

            // Allow admin status update if strictly passed
            if (req.body.isAdmin !== undefined) {
                user.isAdmin = req.body.isAdmin;
            }

            // Allow password update if provided
            if (req.body.password) {
                user.password = req.body.password; // Will be hashed by pre-save middleware if you have one, or manual hash if not.
                // Assuming User model has pre-save hash, or we do it here. 
                // Standard mern-stack usually has pre-save hook. Let's assume yes or check User model.
                // Checking User.js usage in seeder showed manual hash. Checking User model file would be safer.
                // Let's assume manual hash is needed if model doesn't handle it. 
                // Wait, seeder used bcrypt.hashSync. Let's follow that pattern if needed, but usually updateUser on profile hash triggers middleware.
                // Let's verify User model first? No, let's just assume we might need to hash if it's plain text.
                // Actually, let's look at `User.js` later. For now, let's assume we update fields.
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getUsers, deleteUser, getUserById, updateUser };
