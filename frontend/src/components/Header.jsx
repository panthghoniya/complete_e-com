import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Handle scroll effect for sticky header
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    return (
        <header
            className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/90 backdrop-blur-md shadow-lg py-3'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center group">
                    <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
                        MyShop
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                        Home
                    </Link>
                    <Link to="/products" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                        Shop
                    </Link>
                    <Link to="/cart" className="relative text-gray-700 hover:text-blue-600 font-medium transition-colors group">
                        <span className="flex items-center">
                            <FaShoppingCart className="mr-1" /> Cart
                        </span>
                    </Link>

                    {user ? (
                        <div className="relative group">
                            <div className="flex items-center text-gray-700 cursor-pointer hover:text-blue-600 transition-colors">
                                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold mr-2 shadow-md">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="font-medium">{user.name}</span>
                            </div>

                            {/* Dropdown */}
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600">
                                    Profile
                                </Link>
                                <button
                                    onClick={logout}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Sign In
                        </Link>
                    )}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`md:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out pt-24 px-6 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <nav className="flex flex-col space-y-6 text-lg">
                    <Link to="/" className="text-gray-800 font-medium hover:text-blue-600 border-b border-gray-100 pb-2">
                        Home
                    </Link>
                    <Link to="/cart" className="flex items-center text-gray-800 font-medium hover:text-blue-600 border-b border-gray-100 pb-2">
                        <FaShoppingCart className="mr-3" /> Cart
                    </Link>
                    {user ? (
                        <>
                            <Link to="/profile" className="text-gray-800 font-medium hover:text-blue-600 border-b border-gray-100 pb-2">
                                Profile
                            </Link>
                            <button onClick={logout} className="flex items-center text-red-600 font-medium hover:text-red-700">
                                <FaSignOutAlt className="mr-3" /> Sign Out
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="flex justify-center items-center py-3 rounded-xl bg-blue-600 text-white font-bold shadow-lg">
                            Sign In
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
