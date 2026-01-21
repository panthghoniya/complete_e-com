const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./src/models/User');

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

const resetAdminPassword = async () => {
    await connectDB();

    const email = 'admin@example.com';
    const newPassword = 'admin123';

    const user = await User.findOne({ email });

    if (user) {
        console.log(`User found: ${user.name}`);
        // Manually hash execution since pre-save might be tricky if not triggered correctly
        // But better to let the model handle if possible, or force hash here.
        // Let's force hash to be sure.
        user.password = newPassword;

        await user.save();
        console.log(`Password reset for ${email} to: ${newPassword}`);
    } else {
        console.log(`User with email ${email} not found. Creating one...`);
        await User.create({
            name: 'Admin User',
            email: email,
            password: newPassword,
            isAdmin: true,
        });
        console.log(`Admin user created with password: ${newPassword}`);
    }

    // Verification step
    const updatedUser = await User.findOne({ email });
    const isMatch = await updatedUser.matchPassword(newPassword);
    console.log(`Verification: Login with '${newPassword}' ${isMatch ? 'SUCCEEDED' : 'FAILED'}`);
    if (!isMatch) {
        console.log('Stored Hash:', updatedUser.password);
    }

    process.exit();
};

resetAdminPassword();
