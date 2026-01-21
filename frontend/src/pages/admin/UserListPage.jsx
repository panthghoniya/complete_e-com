import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import AdminLayout from '../../components/AdminLayout';
import { FaTrash, FaUserShield, FaUser, FaCheck, FaTimes, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const UserListPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await api.get('/users');
                setUsers(data);
                setLoading(false);
            } catch (err) {
                // If the route fails (404/500), just show empty or error
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await api.delete(`/users/${id}`);
                // Refresh list
                const { data } = await api.get('/users');
                setUsers(data);
            } catch (err) {
                alert(err.response?.data?.message || 'Delete failed');
            }
        }
    };

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Users</h1>
                    <p className="text-gray-500 mt-1">Manage platform users</p>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : error ? (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-sm">
                    <p className="font-bold">Error</p>
                    <p>{error}</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                                    <th className="py-4 px-6 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {Array.isArray(users) && users.length > 0 ? (
                                    users.map((user) => (
                                        <tr key={user._id} className="hover:bg-blue-50 transition-colors duration-150">
                                            <td className="py-4 px-6 border-b border-gray-100">
                                                <div className="text-sm font-medium text-gray-700">{user?.email || 'N/A'}</div>
                                            </td>
                                            <td className="py-4 px-6 border-b border-gray-100">
                                                {user.isAdmin ? (
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                                        <FaUserShield className="mr-1.5" /> Admin
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600 border border-gray-200">
                                                        <FaUser className="mr-1.5" /> User
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-4 px-6 border-b border-gray-100 text-right">
                                                <div className="flex justify-end space-x-2">
                                                    <Link
                                                        to={`/admin/user/${user._id}/edit`}
                                                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors border border-transparent hover:border-blue-200"
                                                        title="Edit User"
                                                    >
                                                        <FaEdit size={18} />
                                                    </Link>
                                                    {!user.isAdmin && (
                                                        <button
                                                            onClick={() => deleteHandler(user._id)}
                                                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors border border-transparent hover:border-red-200"
                                                            title="Delete User"
                                                        >
                                                            <FaTrash size={18} />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colspan="4" className="py-12 text-center text-gray-500">
                                            <div className="flex flex-col items-center justify-center">
                                                <FaUser className="text-4xl text-gray-300 mb-4" />
                                                <p className="text-lg font-medium">No users found</p>
                                                <p className="text-sm text-gray-400">The user list is empty currently.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default UserListPage;
