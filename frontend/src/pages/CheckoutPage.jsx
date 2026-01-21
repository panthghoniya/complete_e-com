import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const CheckoutPage = () => {
    const { cartItems, shippingAddress, saveShippingAddress, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');
    const [paymentMethod, setPaymentMethod] = useState('COD');

    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

    const submitHandler = async (e) => {
        e.preventDefault();
        saveShippingAddress({ address, city, postalCode, country });

        try {
            const orderData = {
                orderItems: cartItems,
                shippingAddress: { address, city, postalCode, country },
                paymentMethod,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
            };

            const { data } = await api.post('/orders', orderData);
            clearCart();
            // navigate(`/order/${data._id}`); // Order Details page to be implemented
            navigate('/');
            alert('Order Placed Successfully!');
        } catch (error) {
            console.error(error);
            alert('Order failed');
        }
    };

    if (cartItems.length === 0) {
        return <div className="p-4">Your cart is empty</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-2/3">
                    <form onSubmit={submitHandler} className="bg-white p-6 rounded shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                        <div className="mb-4">
                            <label className="block mb-1">Address</label>
                            <input
                                type="text"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">City</label>
                            <input
                                type="text"
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Postal Code</label>
                            <input
                                type="text"
                                required
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Country</label>
                            <input
                                type="text"
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full border rounded p-2"
                            />
                        </div>

                        <h2 className="text-xl font-semibold mb-4 mt-8">Payment Method</h2>
                        <div className="mb-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="COD"
                                    checked={paymentMethod === 'COD'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="mr-2"
                                />
                                Cash on Delivery
                            </label>
                        </div>

                        <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 mt-4 rounded hover:bg-green-700">
                            Place Order
                        </button>
                    </form>
                </div>

                <div className="md:w-1/3">
                    <div className="bg-gray-50 p-6 rounded shadow-md border">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                        <div className="flex justify-between mb-2">
                            <span>Items</span>
                            <span>${itemsPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Shipping</span>
                            <span>${shippingPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Tax</span>
                            <span>${taxPrice.toFixed(2)}</span>
                        </div>
                        <div className="border-t my-2"></div>
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>${totalPrice}</span>
                        </div>

                        <div className="mt-4">
                            {cartItems.map((item) => (
                                <div key={item._id} className="flex justify-between text-sm mb-1">
                                    <span>{item.name} x {item.qty}</span>
                                    <span>${(item.price * item.qty).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
