import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import api from '../services/api';
import { FaShippingFast, FaShieldAlt, FaHeadset, FaArrowRight } from 'react-icons/fa';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/products');
                setProducts(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const Feature = ({ icon: Icon, title, desc }) => (
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 text-2xl">
                <Icon />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-500 text-sm">{desc}</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900"></div>
                    {/* Abstract Shapes */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-blue-200 text-sm font-semibold mb-6 backdrop-blur-sm">
                        New Collection 2024
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight leading-tight">
                        Discover the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">Future</span>
                        <br /> of Tech Shopping
                    </h1>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        Explore our curated selection of premium electronics and accessories.
                        Experience quality like never before.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href="#shop" className="px-8 py-4 bg-white text-blue-900 font-bold rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
                            Shop Now <FaArrowRight className="ml-2" />
                        </a>
                        <Link to="/register" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-all duration-300">
                            Create Account
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="container mx-auto px-6 -mt-16 relative z-20 mb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Feature icon={FaShippingFast} title="Free Shipping" desc="On all orders over $100" />
                    <Feature icon={FaShieldAlt} title="Secure Payment" desc="100% secure payment gateway" />
                    <Feature icon={FaHeadset} title="24/7 Support" desc="Dedicated support team" />
                </div>
            </div>

            {/* Product Grid Section */}
            <div id="shop" className="container mx-auto px-6 py-12">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Arrivals</h2>
                    <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded max-w-2xl mx-auto">
                        <p className="font-bold">Error loading products</p>
                        <p>{error}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <Product key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
