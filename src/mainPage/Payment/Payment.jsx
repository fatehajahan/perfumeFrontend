import React, { useState } from 'react';
import image from '../../assets/broughtpageBlue/product1.jpg'; // Adjust the path as necessary
import axios from "axios"
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Bounce, toast, ToastContainer } from 'react-toastify';

const Payment = () => {
    const url = import.meta.env.VITE_APP_URL
    console.log(url)
    const [paymentMethod, setPaymentMethod] = useState("bank");

    // for taking the data from the form
    const [checkoutData, setCheckoutData] = useState({
        firstname: "",
        lastname: "",
        address: "",
        appartment: "",
        town: "",
        country: "Bangladesh",
        postcode: "",
        phone: "",
        notes: "",
        email: "",
    })

    const handleChange = (e) => {
        setCheckoutData({
            ...checkoutData, [e.target.name]: e.target.value
        })
    }


    // payment data
    const data = useSelector((state) => state.cartDetails.cartItems)
    console.log(data)
    const location = useLocation()
    console.log(location.state.totalPrice)
    const totalPrice = location.state.totalPrice || "$00.00"


    const handleOrder = () => {
        console.log(checkoutData)
        const response = axios.post(`${url}/order/orderprocess`, {
            firstname: checkoutData.firstname,
            lastname: checkoutData.lastname,
            address: checkoutData.address,
            town: checkoutData.town,
            country: checkoutData.country,
            postcode: checkoutData.postcode,
            phone: checkoutData.phone,
            notes: checkoutData.notes,
            price: totalPrice,
            email: checkoutData.email
        }).then((res) => {
            toast.success("Order placed successfully!")
        })
    }
    return (
        <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto px-6 py-[150px] bg-gray-50">
            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            {/* Left - Form Section */}
            <div className="flex-1 space-y-8">
                <div>
                    <h2 className="text-xl font-semibold">Contact <span className='text-red-600 text-[18px] '>*</span></h2>
                    <input
                        onChange={handleChange}
                        value={checkoutData.email}
                        name='email'
                        type="email"
                        placeholder="Email Address"
                        className="w-full mt-2 px-4 py-2 border border-gray-300 rounded"
                    />
                </div>

                <div>
                    <h2 className="text-xl font-semibold">Billing Details <span className='text-red-600 text-[18px] '>*</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <input onChange={handleChange} value={checkoutData.firstname} name='firstname' type="text" placeholder="First name" className="px-4 py-2 border rounded" />
                        <input onChange={handleChange} value={checkoutData.lastname} name='lastname' type="text" placeholder="Last name" className="px-4 py-2 border rounded" />
                        <input onChange={handleChange} value={checkoutData.address} name='address'
                            type="text"
                            placeholder="House number and street name"
                            className="md:col-span-2 px-4 py-2 border rounded"
                        />
                        <input onChange={handleChange} value={checkoutData.appartment} name='apartment'
                            type="text"
                            placeholder="Apartment, suite, unit, etc. (optional)"
                            className="md:col-span-2 px-4 py-2 border rounded"
                        />
                        <input onChange={handleChange} value={checkoutData.town} name='town' type="text" placeholder="Town / City" className="px-4 py-2 border rounded" />
                        <input onChange={handleChange} value={checkoutData.country} name='country' type="text" placeholder="Country" className="px-4 py-2 border rounded" />
                        <input onChange={handleChange} value={checkoutData.postcode} name='postcode' type="text" placeholder="Postcode / ZIP" className="md:col-span-2 px-4 py-2 border rounded" />
                        <input onChange={handleChange} value={checkoutData.phone} name='phone' type="tel" placeholder="Phone" className="md:col-span-2 px-4 py-2 border rounded" />
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold">Additional Information (Optional)</h2>
                    <textarea onChange={handleChange} value={checkoutData.notes} name='notes'
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
                    <button onClick={handleOrder} className="w-full mt-4 cursor-pointer bg-black text-white py-3 rounded font-semibold hover:bg-transparent hover:border hover:text-black transition duration-500 absolute">
                        🔒 Place Order ${totalPrice}
                    </button>
                </div>
            </div>

            {/* Right - Summary Section */}
            <div className="w-full md:w-80 bg-white p-6 rounded shadow">
                {
                    data.map((product) => (
                        <div>
                            <div key={product._id} className="flex items-center gap-4 mb-4">
                                <img src={product.images[0]} alt="Perfume" className="w-14 h-14 object-cover rounded" />
                                <div>
                                    <p className="font-medium text-gray-800">{product.name}</p>
                                    <p className="text-gray-600">${product.price * product.quantity}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }

                <div className=" pt-[20px] text-sm space-y-2">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${totalPrice}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>${totalPrice}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
