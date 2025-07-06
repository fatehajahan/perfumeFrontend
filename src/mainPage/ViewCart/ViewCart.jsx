import React, { useState } from 'react'
import productImg from '../../assets/broughtpageBlue/product1.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { quantityDecreament, quantityUpdate, removeItem } from '../../slices/cartSlice'

const ViewCart = () => {
    const [coupon, setCoupon] = useState("")
    const [discount, setDiscount] = useState(0)
    const data = useSelector((state) => state.cartDetails.cartItems)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleIncreament = (index) => {
        console.log('first', index)
        dispatch(quantityUpdate({ index: index, type: "increament" }))
    }

    const handleDecreament = (index) => {
        console.log('first', index)
        dispatch(quantityDecreament({ index: index, type: "decreament" }))
    }

    const handleRemove = (index) => {
        dispatch(removeItem(index))
    }

    // payment 
    const totalPrice = data.reduce((acc, items) => {
        return acc + items.price * items.quantity
    }, 0);

    const handleAddCoupon = () => {
        console.log(coupon)
        if (coupon === "PANDA10") {
            setDiscount(totalPrice * 0.1);
        } else if (coupon === "PANDA20") {
            setDiscount(totalPrice * 0.2);
        } else {
            setCoupon("")
            if (coupon == "") {
                toast.error("Please enter a coupon code")
            } else {
                toast.error("Invalid coupon code")
            }
        }
    }
    const subTotal = totalPrice - discount

    // for payment
    const handlePayment = () => {
        navigate('/payment', {
            state: { totalPrice: subTotal }
        })
    }
    return (
        <div className="container mx-auto py-[150px] px-4">
            <ToastContainer
                position="top-right"
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
            <h1 className="text-[65px] font-serif text-center mb-8">Cart</h1>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-2/3 border border-gray-300">

                    <table className="w-full text-left hidden md:table">
                        <thead>
                            <tr className="border-b">
                                <th className="p-4 font-semibold">Product</th>
                                <th className="p-4 font-semibold">Price</th>
                                <th className="p-4 font-semibold">Quantity</th>
                                <th className="p-4 font-semibold">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? data.map((product, index) => (
                                <tr key={product._id} className="border-b">
                                    <td className="p-4">
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => handleRemove(index)}
                                                className="text-gray-500 hover:text-red-500 cursor-pointer"
                                            >
                                                X
                                            </button>
                                            <img src={product.images[0]} className="w-16 h-16 object-cover border" />
                                            <span className="font-medium">{product.name}</span>
                                        </div>
                                    </td>

                                    <td className="p-4 font-bold">${product.price}</td>

                                    <td className="p-4">
                                        <div className="flex text-[15px]">
                                            <p
                                                onClick={() => data[index].quantity > 1 && handleDecreament(index)}
                                                className={` select-none border px-[15px] transition duration-300 ${data[index].quantity === 1
                                                    ? 'cursor-not-allowed bg-gray-300 text-gray-600'
                                                    : 'cursor-pointer hover:bg-black hover:text-white'
                                                    }`}
                                            >
                                                -
                                            </p>
                                            <p className="border px-[15px]">{product.quantity}</p>
                                            <p
                                                onClick={() => handleIncreament(index)}
                                                className=" select-none border px-[15px] cursor-pointer hover:bg-black hover:text-white transition"
                                            >
                                                +
                                            </p>
                                        </div>
                                    </td>

                                    <td className="p-4 font-bold">${product.price * product.quantity}</td>
                                </tr>

                            )) : (
                                <tr>
                                    <td colSpan="4" className="p-4 text-center">No items in cart</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* below design is for responsive */}
                    {
                        data.length > 0 ? data.map((product) => (
                            <div key={product._id} className="md:hidden border-t border-gray-300">
                                <div className="border-b p-4">
                                    <div className="flex justify-between items-start mb-4">
                                        <img src={product.images[0]} className="w-20 h-20 object-cover border mx-auto" />
                                        <button className="text-gray-500 hover:text-red-500 text-xl">×</button>
                                    </div>
                                    <table className="w-full text-sm">
                                        <tbody className="space-y-2">
                                            <tr className="border-b">
                                                <td className="py-2 font-semibold w-[30%]">Product:</td>
                                                <td className="py-2 text-right">{product.name}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2 font-semibold">Price:</td>
                                                <td className="py-2 text-right">${product.price}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2 font-semibold">Quantity:</td>
                                                <td className="py-2 text-right">
                                                    <div className="flex justify-end text-sm">
                                                        <button className="border px-3 hover:bg-black hover:text-white transition">-</button>
                                                        <span className="border px-3">{product.quantity}</span>
                                                        <button onClick={handleIncreament} className="border px-3 hover:bg-black hover:text-white transition cursor-pointer">+</button>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="py-2 font-semibold">Subtotal:</td>
                                                <td className="py-2 text-right">${(product.price * product.quantity)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )) : <div>
                            <td colSpan="4" className="md:hidden p-4 text-center">No items in cart</td>
                        </div>
                    }
                </div>


                {/* cart totals */}
                <div className="w-full  md:w-1/3 border border-gray-300 p-6">
                    <h2 className="text-lg font-semibold mb-4">Cart totals</h2>
                    <div className="flex justify-between border-b py-2">
                        <span>Total:</span>
                        <span>${totalPrice}</span>
                    </div>
                    <div className="flex justify-between border-b py-2">
                        <span>Discount:</span>
                        <span>${discount}</span>
                    </div>
                    <div className="flex justify-between border-b py-2 font-bold">
                        <span>Subtotal:</span>
                        <span>${subTotal}</span>
                    </div>
                    <div>
                        <p className="mt-4 text-sm cursor-pointer">Have a coupon?</p>
                        <div className="flex gap-2 w-full">
                            <input value={coupon} onChange={(e) => setCoupon(e.target.value)} type="text" className='border py-2 px-[20px] w-full bg-gray-200 rounded-xl' placeholder='Enter coupon code' />
                            <button onClick={handleAddCoupon} className='bg-amber-500 text-black font-semibold px-4 py-2 rounded-xl cursor-pointer hover:bg-amber-700 hover:text-white transition duration-500'>Apply</button>
                        </div>
                    </div>
                    <div >
                        <button onClick={handlePayment} className="mt-4 bg-black hover:bg-transparent hover:text-black transition duration-500 text-white px-6 py-3 w-full text-center uppercase font-semibold cursor-pointer">
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewCart