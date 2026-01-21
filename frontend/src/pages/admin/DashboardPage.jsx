import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaShoppingBag, FaUsers, FaArrowRight, FaChartLine, FaPlus } from 'react-icons/fa';
import AdminLayout from '../../components/AdminLayout';
import api from '../../services/api';

const DashboardPage = () => {
    const [stats, setStats] = useState({
        productsCount: 0,
        ordersCount: 0,
        usersCount: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/dashboard');
                setStats(data);
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            }
        };

        fetchStats();
    }, []);

    // Stat Card Component
    const StatCard = ({ title, count, icon: Icon, to, color, gradient }) => (
        <Link
            to={to}
            className="relative overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
        >
            {/* Background Icon Watermark */}
            <div className={`absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity transform rotate-12 ${color}`}>
                <Icon size={120} />
            </div>

            <div className="flex justify-between items-start relative z-10">
                <div>
                    <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">{title}</h3>
                    <p className="text-4xl font-extrabold text-gray-800 mb-2">{count}</p>
                </div>
                <div className={`p-4 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
                    <Icon size={24} />
                </div>
            </div>

            <div className="mt-6 flex items-center text-sm font-medium text-gray-400 group-hover:text-blue-600 transition-colors">
                <span>Manage {title}</span>
                <FaArrowRight className="ml-2 w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
            </div>
        </Link>
    );

    return (
        <AdminLayout>
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
                    <p className="text-gray-500 mt-2 text-lg">Welcome back! Here's what's happening today.</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <Link to="/admin/product/create" className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5">
                        <FaPlus className="mr-2" /> Add New Product
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <StatCard
                    title="Total Products"
                    count={stats.productsCount}
                    icon={FaBox}
                    to="/admin/products"
                    color="text-blue-500"
                    gradient="from-blue-500 to-blue-600"
                />
                <StatCard
                    title="Recent Orders"
                    count={stats.ordersCount}
                    icon={FaShoppingBag}
                    to="/admin/orders"
                    color="text-purple-500"
                    gradient="from-purple-500 to-purple-600"
                />
                <StatCard
                    title="Active Users"
                    count={stats.usersCount}
                    icon={FaUsers}
                    to="/admin/users"
                    color="text-pink-500"
                    gradient="from-pink-500 to-rose-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity / Placeholder */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center">
                            <FaChartLine className="mr-3 text-blue-500" />
                            Performance Analytics
                        </h2>
                        <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                            <option>This Year</option>
                        </select>
                    </div>

                    <div className="h-80 flex flex-col items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 group hover:border-blue-200 hover:bg-blue-50/50 transition-colors">
                        <FaChartLine size={48} className="mb-4 text-gray-300 group-hover:text-blue-300 transition-colors" />
                        <span className="font-medium">Analytics Chart Visualization</span>
                        <span className="text-sm mt-2 opacity-70">(Coming Soon)</span>
                    </div>
                </div>

                {/* Quick Links / Guide */}
                <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-4">Admin Pro Tips</h2>
                        <ul className="space-y-4 text-indigo-100">
                            <li className="flex items-start">
                                <span className="mr-3 mt-1 text-green-400">✓</span>
                                Keep your inventory up to date to avoid stock discrepancies.
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 mt-1 text-green-400">✓</span>
                                Review user orders daily for prompt delivery.
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 mt-1 text-green-400">✓</span>
                                Manage user roles carefully to maintain security.
                            </li>
                        </ul>
                        <button className="mt-8 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-sm font-medium transition-all backdrop-blur-sm">
                            Read Documentation
                        </button>
                    </div>

                    {/* Decorative Circles */}
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default DashboardPage;
