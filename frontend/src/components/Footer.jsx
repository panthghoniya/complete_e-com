import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeart } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div>
                        <Link to="/" className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-6 block">
                            MyShop
                        </Link>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Premium products for your lifestyle. We curate the best items to enhance your everyday experience.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                                <FaFacebook />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-400 transition-colors">
                                <FaTwitter />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-colors">
                                <FaInstagram />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-700 transition-colors">
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Quick Links</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
                            <li><Link to="/products" className="hover:text-blue-400 transition-colors">Shop All</Link></li>
                            <li><Link to="/cart" className="hover:text-blue-400 transition-colors">My Cart</Link></li>
                            <li><Link to="/login" className="hover:text-blue-400 transition-colors">Login/Register</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Customer Care</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link to="/profile" className="hover:text-blue-400 transition-colors">My Account</Link></li>
                            <li><Link to="#" className="hover:text-blue-400 transition-colors">Order Tracking</Link></li>
                            <li><Link to="#" className="hover:text-blue-400 transition-colors">FAQs</Link></li>
                            <li><Link to="#" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Stay Updated</h3>
                        <p className="text-gray-400 mb-4">Subscribe for exclusive offers and updates.</p>
                        <form className="flex flex-col space-y-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500"
                            />
                            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} MyShop. All rights reserved.</p>
                    <p className="flex items-center mt-4 md:mt-0">
                        Made with <FaHeart className="mx-1 text-red-500" /> by Panth
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
