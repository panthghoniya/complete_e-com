const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');
const Product = require('./src/models/Product');

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const testDelete = async () => {
    await connectDB();

    console.log('--- Starting Delete Test ---');

    // 1. Test User Delete
    try {
        const user = await User.create({
            name: 'Test Delete User',
            email: 'testdelete@example.com',
            password: 'password123',
            isAdmin: false
        });
        console.log('Test User Created:', user._id);

        const deleteResult = await user.deleteOne();
        console.log('User Delete Result:', deleteResult);

        const checkUser = await User.findById(user._id);
        console.log('User still exists?', !!checkUser);
    } catch (err) {
        console.error('User Delete Error:', err);
    }

    // 2. Test Product Delete
    try {
        const product = await Product.create({
            name: 'Test Delete Product',
            price: 100,
            user: new mongoose.Types.ObjectId(), // Fake user ID
            image: '/images/sample.jpg',
            category: 'Sample',
            countInStock: 0,
            numReviews: 0,
            description: 'Sample description'
        });
        console.log('Test Product Created:', product._id);

        const deleteResult = await product.deleteOne();
        console.log('Product Delete Result:', deleteResult);

        const checkProduct = await Product.findById(product._id);
        console.log('Product still exists?', !!checkProduct);

    } catch (err) {
        console.error('Product Delete Error:', err);
    }

    console.log('--- Finished Delete Test ---');
    process.exit();
};

testDelete();
