import React, { useState } from 'react';
import image from '../../assets/broughtpageBlue/product1.jpg'; // Adjust the path as necessary

const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState("bank");

    return (
        <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto px-6 py-[150px] bg-gray-50">

            {/* Left - Form Section */}
            <div className="flex-1 space-y-8">
                <div>
                    <h2 className="text-xl font-semibold">Contact <span className='text-red-600 text-[18px] '>*</span></h2>
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full mt-2 px-4 py-2 border border-gray-300 rounded"
                    />
                </div>

                <div>
                    <h2 className="text-xl font-semibold">Billing Details <span className='text-red-600 text-[18px] '>*</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <input type="text" placeholder="First name" className="px-4 py-2 border rounded" />
                        <input type="text" placeholder="Last name" className="px-4 py-2 border rounded" />
                        <input
                            type="text"
                            placeholder="House number and street name"
                            className="md:col-span-2 px-4 py-2 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="Apartment, suite, unit, etc. (optional)"
                            className="md:col-span-2 px-4 py-2 border rounded"
                        />
                        <input type="text" placeholder="Town / City" className="px-4 py-2 border rounded" />
                        <input type="text" placeholder="Country" value="Bangladesh" className="px-4 py-2 border rounded" />
                        <input type="text" placeholder="Postcode / ZIP" className="md:col-span-2 px-4 py-2 border rounded" />
                        <input type="tel" placeholder="Phone" className="md:col-span-2 px-4 py-2 border rounded" />
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold">Additional Information (Optional)</h2>
                    <textarea
                        placeholder="Notes about your order, e.g. special notes for delivery."
                        className="w-full mt-2 px-4 py-2 border rounded"
                    ></textarea>
                </div>

                {/* Payment Options */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">Payment <span className='text-red-600 text-[18px] '>*</span></h2>
                    <div className="border rounded overflow-hidden">
                        <label className="flex items-start p-4 border-b cursor-pointer">
                            <input
                                type="radio"
                                name="payment"
                                checked={paymentMethod === "bank"}
                                onChange={() => setPaymentMethod("bank")}
                                className="mt-1 mr-3"
                            />
                            <div>
                                <span className="font-medium">Direct bank transfer</span>
                                {paymentMethod === "bank" && (
                                    <p className="text-sm text-gray-600 mt-1">
                                        Make your payment directly into our bank account. Please use your Order ID as the payment reference.
                                        Your order will not be shipped until the funds have cleared in our account.
                                    </p>
                                )}
                            </div>
                        </label>

                        <label className="flex items-start p-4 cursor-pointer">
                            <input
                                type="radio"
                                name="payment"
                                checked={paymentMethod === "cod"}
                                onChange={() => setPaymentMethod("cod")}
                                className="mt-1 mr-3"
                            />
                            <span className="font-medium">Cash on delivery</span>
                        </label>
                    </div>
                </div>

                {/* Place Order Button */}
                <div className='relative'>
                    <button className="w-full mt-4 cursor-pointer bg-black text-white py-3 rounded font-semibold hover:bg-transparent hover:border hover:text-black transition duration-500 absolute">
                        🔒 Place Order $425.00
                    </button>
                </div>
            </div>

            {/* Right - Summary Section */}
            <div className="w-full md:w-80 bg-white p-6 rounded shadow">
                <div className="flex items-center gap-4 mb-4">
                    <img src={image} alt="Perfume" className="w-14 h-14 object-cover rounded" />
                    <div>
                        <p className="font-medium text-gray-800">Bright Light by Yana</p>
                        <p className="text-gray-600">$425.00</p>
                    </div>
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Coupon Code"
                        className="w-full px-3 py-2 border rounded mb-2"
                    />
                    <div className='relative'>
                        <button className="w-full cursor-pointer bg-black text-white py-2 rounded hover:bg-transparent hover:border hover:text-black transition duration-500 absolute">
                            Apply
                        </button>
                    </div>
                </div>

                <div className=" pt-[50px] text-sm space-y-2">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>$425.00</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>$425.00</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
