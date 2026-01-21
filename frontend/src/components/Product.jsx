import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaShoppingCart } from 'react-icons/fa';

const Product = ({ product }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 group">
            <Link to={`/product/${product._id}`} className="block relative overflow-hidden">
                <img
                    src={product.image || '/images/sample.jpg'}
                    alt={product.name}
                    className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />

                {/* Quick Action Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent flex justify-center">
                    <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold text-sm shadow-lg hover:bg-blue-600 hover:text-white transition-colors flex items-center">
                        <FaShoppingCart className="mr-2" /> View Details
                    </button>
                </div>
            </Link>

            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <div className="text-gray-500 text-xs font-bold uppercase tracking-wider bg-gray-100 px-2 py-1 rounded">
                        {product.category || 'Electronics'}
                    </div>
                    <div className="flex items-center text-yellow-400 text-sm">
                        <FaStar />
                        <span className="text-gray-400 font-medium ml-1">
                            {product.rating || 4.5} ({product.numReviews} rev)
                        </span>
                    </div>
                </div>

                <Link to={`/product/${product._id}`} className="block mb-2">
                    <h2 className="text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors line-clamp-1">
                        {product.name}
                    </h2>
                </Link>

                <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-black text-gray-900">
                        ${product.price}
                    </span>
                    <button className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                        <FaShoppingCart size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product;
