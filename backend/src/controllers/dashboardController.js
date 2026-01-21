const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');

// @desc    Get dashboard stats
// @route   GET /api/dashboard
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
    try {
        const productsCount = await Product.countDocuments();
        const ordersCount = await Order.countDocuments();
        const usersCount = await User.countDocuments();

        res.json({
            productsCount,
            ordersCount,
            usersCount,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getDashboardStats };
