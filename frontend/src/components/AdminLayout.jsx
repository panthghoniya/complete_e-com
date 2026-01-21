import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    FaTachometerAlt,
    FaBox,
    FaShoppingBag,
    FaUsers,
    FaSignOutAlt,
    FaBars,
    FaTimes,
    FaHome
} from 'react-icons/fa';

const AdminLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    const isActive = (path) => {
        return location.pathname === path || location.pathname.startsWith(`${path}/`)
            ? 'bg-white/10 text-white shadow-lg border-l-4 border-cyan-400'
            : 'text-gray-400 hover:bg-white/5 hover:text-white border-l-4 border-transparent';
    };

    const NavItem = ({ to, icon: Icon, children }) => (
        <Link
            to={to}
            className={`flex items-center px-6 py-4 mb-2 transition-all duration-300 mx-2 font-medium rounded-r-xl ${isActive(to)}`}
        >
            <Icon className={`mr-4 text-xl ${location.pathname.startsWith(to) ? 'text-cyan-300' : ''}`} />
            {children}
        </Link>
    );

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#1a1c23] text-white shadow-2xl transform transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Logo Area */}
                <div className="h-20 flex items-center justify-center border-b border-gray-700/50 bg-gradient-to-r from-gray-900 to-gray-800">
                    <h1 className="text-2xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        ADMIN PANEL
                    </h1>
                </div>

                {/* Navigation */}
                <nav className="mt-8 pr-2 space-y-2">
                    <NavItem to="/admin/dashboard" icon={FaTachometerAlt}>Dashboard</NavItem>
                    <NavItem to="/admin/products" icon={FaBox}>Products</NavItem>
                    <NavItem to="/admin/orders" icon={FaShoppingBag}>Orders</NavItem>
                    <NavItem to="/admin/users" icon={FaUsers}>Users</NavItem>
                </nav>

                {/* Bottom Actions */}
                <div className="absolute bottom-0 w-full p-4 border-t border-gray-700/50 bg-[#1a1c23]">
                    <Link to="/" className="flex items-center px-6 py-3 text-gray-400 hover:text-white transition-colors mb-2">
                        <FaHome className="mr-3 text-lg" />
                        Back to Shop
                    </Link>
                    <button
                        onClick={logoutHandler}
                        className="flex items-center w-full px-6 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-all duration-300 group"
                    >
                        <FaSignOutAlt className="mr-3 group-hover:translate-x-1 transition-transform" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden bg-gray-100/50">
                {/* Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-30">
                    <button
                        className="md:hidden text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-100"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>

                    {/* Breadcrumbs or Title could go here */}
                    <div className="hidden md:block text-gray-500 text-sm">
                        Admin / {location.pathname.split('/').pop().charAt(0).toUpperCase() + location.pathname.split('/').pop().slice(1)}
                    </div>

                    <div className="flex items-center space-x-4 ml-auto">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold text-gray-800">Administrator</p>
                            <p className="text-xs text-gray-500">Super User</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30 ring-2 ring-white">
                            A
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-8">
                    <div className="max-w-7xl mx-auto animate-fade-in-up">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
