// import React from 'react'

// const Orders = () => {
//   return (
//     <div>Orders</div>
//   )
// }

// export default Orders

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminOrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Fetch orders from backend
        axios.get(`${import.meta.env.VITE_APP_URL}/orders`)
            .then(res => setOrders(res.data.orders))
            .catch(err => console.error(err));
    }, []);

    const handleAccept = async (orderId) => {
        try {
            await axios.put(`${import.meta.env.VITE_APP_URL}/orders/${orderId}/accept`);
            setOrders(orders.map(order => 
                order._id === orderId ? { ...order, status: 'Accepted' } : order
            ));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">Orders List</h2>
            {orders.length === 0 ? (
                <p className="text-gray-500">No orders found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-6 text-left">Order ID</th>
                                <th className="py-3 px-6 text-left">Customer</th>
                                <th className="py-3 px-6 text-left">Total Amount</th>
                                <th className="py-3 px-6 text-left">Status</th>
                                <th className="py-3 px-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id} className="border-t">
                                    <td className="py-3 px-6">{order._id}</td>
                                    <td className="py-3 px-6">{order.customerName}</td>
                                    <td className="py-3 px-6">${order.totalAmount}</td>
                                    <td className="py-3 px-6">
                                        <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                                            order.status === 'Accepted'
                                                ? 'bg-green-200 text-green-800'
                                                : 'bg-yellow-200 text-yellow-800'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        {order.status !== 'Accepted' && (
                                            <button
                                                onClick={() => handleAccept(order._id)}
                                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
                                            >
                                                Accept
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminOrderList;
