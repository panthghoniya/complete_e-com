import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaTrash } from 'react-icons/fa';

const CartPage = () => {
    const { cartItems, removeFromCart, addToCart } = useCart();
    const navigate = useNavigate();

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div className="bg-blue-100 text-blue-700 p-4 rounded">
                    Your cart is empty <Link to="/" className="underline font-bold">Go Back</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        {cartItems.map((item) => (
                            <div key={item._id} className="flex flex-col md:flex-row items-center border-b py-4">
                                <div className="md:w-1/6">
                                    <img src={item.images && item.images.length > 0 ? item.images[0] : '/images/sample.jpg'} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                </div>
                                <div className="md:w-2/6 mt-2 md:mt-0 md:ml-4">
                                    <Link to={`/product/${item._id}`} className="text-lg font-semibold text-gray-800 hover:text-blue-600">{item.name}</Link>
                                </div>
                                <div className="md:w-1/6 mt-2 md:mt-0 font-bold">${item.price}</div>
                                <div className="md:w-1/6 mt-2 md:mt-0">
                                    <select
                                        value={item.qty}
                                        onChange={(e) => addToCart(item, Number(e.target.value))}
                                        className="border border-gray-300 rounded p-1"
                                    >
                                        {[...Array(item.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="md:w-1/6 mt-2 md:mt-0">
                                    <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:text-red-700">
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="md:col-span-1">
                        <div className="bg-white p-6 rounded shadow-md border">
                            <h2 className="text-xl font-bold mb-4">Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                            <div className="text-2xl font-bold text-gray-800 mb-6">
                                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                            </div>
                            <button
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
                            >
                                Proceed To Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
