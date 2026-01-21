const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

const verify = async () => {
    try {
        // 1. Login as Admin
        console.log('Logging in...');
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: 'admin@example.com',
            password: '123456'
        });
        const token = loginRes.data.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        console.log('Login successful.');

        // 2. Create a test user (via register or relying on existing data if create API exists? We don't have Admin Create User API yet)
        // Let's use the register public API
        console.log('Creating test user...');
        const uniqueEmail = `testuser_${Date.now()}@example.com`;
        const regRes = await axios.post(`${API_URL}/auth/register`, {
            name: 'Test User',
            email: uniqueEmail,
            password: 'password123'
        });
        const userId = regRes.data._id;
        console.log(`Test user created: ${userId}`);

        // 3. Update User via Admin API
        console.log('Updating user...');
        const updateRes = await axios.put(`${API_URL}/users/${userId}`, {
            name: 'Updated Name',
            email: uniqueEmail,
            isAdmin: true
        }, config);

        console.log('Update response:', updateRes.data);

        // 4. Verify Update
        if (updateRes.data.name === 'Updated Name' && updateRes.data.isAdmin === true) {
            console.log('SUCCESS: User name and admin status updated.');
        } else {
            console.error('FAILURE: User update mismatch.');
            process.exit(1);
        }

        // 4.5 Verify List Structure
        console.log('Fetching all users to verify list structure...');
        const listRes = await axios.get(`${API_URL}/users`, config);
        console.log('User List Type:', Array.isArray(listRes.data) ? 'Array' : typeof listRes.data);
        console.log('User List Length:', listRes.data.length);
        if (listRes.data.length > 0) {
            console.log('First User Sample:', JSON.stringify(listRes.data[0], null, 2));
        }

        // 5. Cleanup
        console.log('Deleting test user...');
        await axios.delete(`${API_URL}/users/${userId}`, config);
        console.log('Test user deleted.');

        // 6. Manual Check for "John Doe" update attempt from before if needed, but new user is clean.

    } catch (error) {
        console.error('ERROR DETAILS:', error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
        if (error.code) console.error('CODE:', error.code);
        process.exit(1);
    }
};

verify();
