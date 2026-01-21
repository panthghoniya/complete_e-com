import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const ProfilePage = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await api.get('/orders/myorders');
                setOrders(data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching orders');
                setLoading(false);
            }
        };

        if (user) {
            fetchOrders();
        }
    }, [user]);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                    <h2 className="text-2xl font-bold mb-4">User Profile</h2>
                    {user && (
                        <div className="bg-white p-4 rounded shadow">
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Admin:</strong> {user.isAdmin ? 'Yes' : 'No'}</p>
                            <button className="mt-4 text-blue-600 hover:underline">Update Profile</button>
                        </div>
                    )}
                </div>
                <div className="md:col-span-3">
                    <h2 className="text-2xl font-bold mb-4">My Orders</h2>
                    {loading ? (
                        <p>Loading orders...</p>
                    ) : error ? (
                        <div className="text-red-500">{error}</div>
                    ) : orders.length === 0 ? (
                        <div className="bg-blue-100 text-blue-700 p-4 rounded">You have no orders</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border">
                                <thead>
                                    <tr className="bg-gray-100 border-b">
                                        <th className="py-2 px-4 text-left">ID</th>
                                        <th className="py-2 px-4 text-left">DATE</th>
                                        <th className="py-2 px-4 text-left">TOTAL</th>
                                        <th className="py-2 px-4 text-left">PAID</th>
                                        <th className="py-2 px-4 text-left">DELIVERED</th>
                                        <th className="py-2 px-4 text-left"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order._id} className="border-b hover:bg-gray-50">
                                            <td className="py-2 px-4">{order._id.substring(0, 10)}...</td>
                                            <td className="py-2 px-4">{order.createdAt.substring(0, 10)}</td>
                                            <td className="py-2 px-4">${order.totalPrice}</td>
                                            <td className="py-2 px-4">
                                                {order.isPaid ? (
                                                    <span className="text-green-600">Paid</span>
                                                ) : (
                                                    <span className="text-red-600">Not Paid</span>
                                                )}
                                            </td>
                                            <td className="py-2 px-4">
                                                {order.isDelivered ? (
                                                    <span className="text-green-600">Delivered</span>
                                                ) : (
                                                    <span className="text-red-600">Not Delivered</span>
                                                )}
                                            </td>
                                            <td className="py-2 px-4">
                                                <Link to={`/order/${order._id}`} className="text-blue-600 hover:underline border px-2 py-1 rounded">
                                                    Details
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
