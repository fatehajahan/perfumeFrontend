import React from 'react';

const Order = () => {
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
                            <th className="py-3 px-6 text-left">Customer</th>
                            <th className="py-3 px-6 text-left">Total Amount</th>
                            <th className="py-3 px-6 text-left">Status</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t">
                            <td className="py-3 px-6">12345</td>
                            <td className="py-3 px-6">John Doe</td>
                            <td className="py-3 px-6">$100.00</td>
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
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Order;
