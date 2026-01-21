import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

const OrderScreen = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await api.get(`/orders/${id}`);
                setOrder(data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Order not found');
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Order {order._id}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <div className="bg-white p-6 rounded shadow-md mb-6">
                        <h2 className="text-xl font-bold mb-4">Shipping</h2>
                        <p><strong>Name:</strong> {order.user.name}</p>
                        <p><strong>Email:</strong> <a href={`mailto:${order.user.email}`} className="text-blue-500">{order.user.email}</a></p>
                        <p>
                            <strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </p>
                        <div className={`mt-2 p-3 rounded ${order.isDelivered ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {order.isDelivered ? `Delivered on ${order.deliveredAt}` : 'Not Delivered'}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded shadow-md mb-6">
                        <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                        <p><strong>Method:</strong> {order.paymentMethod}</p>
                        <div className={`mt-2 p-3 rounded ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {order.isPaid ? `Paid on ${order.paidAt}` : 'Not Paid'}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded shadow-md mb-6">
                        <h2 className="text-xl font-bold mb-4">Order Items</h2>
                        {order.orderItems.length === 0 ? <p>Order is empty</p> : (
                            <div>
                                {order.orderItems.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center border-b py-2">
                                        <div className="flex items-center">
                                            <img src={item.image || '/images/sample.jpg'} alt={item.name} className="w-12 h-12 object-cover rounded mr-4" />
                                            <Link to={`/product/${item.product}`} className="text-blue-600 hover:underline">{item.name}</Link>
                                        </div>
                                        <div>
                                            {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="md:col-span-1">
                    <div className="bg-gray-50 p-6 rounded shadow-md border">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                        <div className="flex justify-between mb-2">
                            <span>Items</span>
                            <span>${order.itemsPrice}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Shipping</span>
                            <span>${order.shippingPrice}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Tax</span>
                            <span>${order.taxPrice}</span>
                        </div>
                        <div className="border-t my-2"></div>
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>${order.totalPrice}</span>
                        </div>
                        {!order.isPaid && order.paymentMethod !== 'COD' && (
                            <button className="w-full bg-black text-white py-2 mt-4 rounded">Pay Now (PayPal)</button>
                        )}
                        {order.paymentMethod === 'COD' && !order.isPaid && (
                            <div className="w-full bg-yellow-100 text-yellow-800 text-center py-2 mt-4 rounded">Payment on Delivery</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderScreen;
