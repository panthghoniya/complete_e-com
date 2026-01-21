import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

const ProductScreen = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${id}`);
                setProduct(data);
                setLoading(false);
            } catch (err) {
                setError('Product not found');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const addToCartHandler = () => {
        // Implement add to cart logic later
        console.log('Add to cart:', product._id, qty);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/" className="text-gray-600 hover:underline mb-4 inline-block">&larr; Back to Home</Link>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img
                        src={product.images && product.images.length > 0 ? product.images[0] : '/images/sample.jpg'}
                        alt={product.name}
                        className="w-full rounded-lg shadow-lg"
                    />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                    <p className="text-2xl text-blue-600 font-bold mb-4">${product.price}</p>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-1">Description:</h3>
                        <p className="text-gray-700">{product.description}</p>
                    </div>

                    <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <span className="font-semibold">Price:</span>
                            <span className="text-xl font-bold">${product.price}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <span className="font-semibold">Status:</span>
                            <span className={product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}>
                                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>

                        {product.countInStock > 0 && (
                            <div className="flex justify-between items-center mb-4 border-b pb-2">
                                <span className="font-semibold">Qty:</span>
                                <select
                                    value={qty}
                                    onChange={(e) => setQty(Number(e.target.value))}
                                    className="border border-gray-300 rounded p-1"
                                >
                                    {[...Array(product.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <button
                            onClick={addToCartHandler}
                            disabled={product.countInStock === 0}
                            className={`w-full py-3 px-4 rounded-lg font-bold text-white transition ${product.countInStock > 0
                                    ? 'bg-blue-600 hover:bg-blue-700'
                                    : 'bg-gray-400 cursor-not-allowed'
                                }`}
                        >
                            {product.countInStock > 0 ? 'Add To Cart' : 'Out Of Stock'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductScreen;
