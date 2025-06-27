import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Order = () => {
    const url = import.meta.env.VITE_APP_URL
    console.log(url)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        axios.get(`${url}/order/getallorder`)
            .then((res) => setOrders(res.data.data))
    }, [])
    console.log(orders)
    // const TABLE_HEAD = ["Sr No", "Category Name", "Category Description", "Update", "Delete"];

    const TABLE_ROWS = orders
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">Orders List</h2>

            {/* for empty state */}
            <p className="text-gray-500">No orders found.</p>

            {/* table Container */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-6 text-left">Order ID</th>
                            <th className="py-3 px-6 text-left">Email / Contact No.</th>
                            <th className="py-3 px-6 text-left">Customer</th>
                            <th className="py-3 px-6 text-left">Total Amount</th>
                            <th className="py-3 px-6 text-left">Status</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            TABLE_ROWS.map((order, index) => (
                                <tr className="border-t">
                                    <td className="py-3 px-6">{order.transactionId}</td>
                                    <td className="py-3 px-6">{order.email || order.phone}</td>
                                    <td className="py-3 px-6">{order.firstname}</td>
                                    <td className="py-3 px-6">${order.price}</td>
                                    <td className="py-3 px-6">
                                        <span className="inline-block px-3 py-1 rounded-full text-sm bg-yellow-200 text-yellow-800">
                                            Pending
                                        </span>
                                        <span className="inline-block px-3 py-1 rounded-full text-sm bg-green-200 text-yellow-800">
                                            Accepted
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <button
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition cursor-pointer"
                                        >
                                            Accept
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Order;
