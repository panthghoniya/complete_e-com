const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db.js');
const { users, products } = require('./src/data/data.js');
const User = require('./src/models/User.js');
const Product = require('./src/models/Product.js');
const Order = require('./src/models/Order.js');
const Category = require('./src/models/Category.js');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        await Category.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;

        // Create a default category
        const category = await Category.create({
            name: 'Electronics',
            description: 'Electronic Items',
            isActive: true
        });

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser, category: category.name };
        });

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        await Category.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
