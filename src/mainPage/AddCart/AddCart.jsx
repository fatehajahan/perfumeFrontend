import React from "react";
import cartPerfume from '../../assets/broughtpageBlue/product1.jpg'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { quantityDecreament, quantityUpdate } from "../../slices/cartSlice";

const AddCart = ({ cartOpen, setCartOpen }) => {
    const data = useSelector((state) => state.cartDetails.cartItems)
    console.log(data)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const totalPrice = data.reduce((acc, items) => {
        return acc + items.price * items.quantity
    }, 0);

    // for add quantity
    const handleIncreament = (index) => {
        console.log('first', index)
        dispatch(quantityUpdate({ index: index, type: "increament" }))
    }

    const handleDecreament = (index) => {
        console.log('first', index)
        dispatch(quantityDecreament({ index: index, type: "decreament" }))
    }

    // for payment
    const handlePayment = () => {
        console.log('zxcz')
        navigate('/payment', {
            state: { some: "state" }
        })
    }
    return (
        <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transition-transform duration-300 flex flex-col justify-between  ${cartOpen ? "translate-x-0 " : "translate-x-full "} z-50 overflow-y-auto`} >
            <div>
                <div className="p-5 flex justify-between items-center border-b ">
                    <h2 className="text-xl font-semibold">Your Cart</h2>
                    <div className="text-red-500 text-lg cursor-pointer" onClick={() => setCartOpen(false)} >  X  </div>
                </div>
                <div className="p-5">
                    {
                        data.length > 0 ?
                            data.map((product, index) => (
                                <div key={product._id} className="py-[10px]">
                                    <div className="flex gap-x-[20px]">
                                        <img src={product.images[0]} alt="" className="w-[60px] h-[60px]" />

                                        <div>
                                            <p>{product.name}</p>
                                            <div className="flex text-[15px]">
                                                <p onClick={() => data[index].quantity > 1 && handleDecreament(index)}
                                                    className={` select-none border px-[15px] transition duration-300 ${data[index].quantity === 1
                                                        ? 'cursor-not-allowed bg-gray-300 text-gray-600'
                                                        : 'cursor-pointer hover:bg-black hover:text-white'
                                                        }`}>-</p>
                                                <p className="border px-[15px]">{product.quantity}</p>
                                                <p onClick={() => handleIncreament(index)} className=" select-none border px-4 cursor-pointer hover:bg-black hover:text-white transition">+</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) : <div className="pt-[30px]">
                                <p>No items in cart.</p>
                            </div>
                    }
                </div>
            </div>


            <div className="p-6 flex flex-col gap-y-[20px]">
                <div className="flex justify-between items-center">
                    <p className="font-urbanist font-bold">Subtotal :</p>
                    <p className="font-urbanist font-bold">${totalPrice}</p>
                </div>

                <div className="flex flex-col gap-y-[20px]">
                    <div className="bg-black w-full text-white text-center py-[5px] cursor-pointer hover:bg-transparent hover:text-black transition duration-500">
                        <Link
                            onClick={() => setCartOpen(false)} to="/mycart" className="font-urbanist font-bold text-[15px]" >VIEW CART</Link>
                    </div>

                    <div className="bg-black w-full text-white text-center py-[5px] cursor-pointer hover:bg-transparent hover:text-black transition duration-500">
                        <div onClick={handlePayment}>
                            <button onClick={() => setCartOpen(false)} className="font-urbanist font-bold text-[15px] cursor-pointer">CHECKOUT</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCart;