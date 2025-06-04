import React, { useEffect, useState } from "react";

import { FaCcDiscover, FaCcPaypal, FaCircleArrowLeft, FaCircleArrowRight, FaStar } from "react-icons/fa6";
import { FaCcMastercard, FaCcVisa, FaCheckCircle } from "react-icons/fa";
import { SiAmericanexpress } from "react-icons/si";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Footer from "../../components/Home/Footer/Footer";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import axios from "axios";

const ProductBuy = () => {
    const url = import.meta.env.VITE_APP_URL
    console.log(url)
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);
    const location = useLocation()
    const product = location.state.product;
    console.log(product)
    const [selectedImage, setSelectedImage] = useState(product.images[0]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get(`${url}/product/getallproduct`);
                setProducts(response.data.data);  // because your backend returns { data: [...] }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        getProducts();
    }, []);
    const bestSellers = products.slice(0, 4);


    const images = [product.images[0], product.images[1], product.images[2], product.images[3]];


    return (
        <div>
            <div className="">
                <div className="container">
                    <div className="md:py-[150px] py-[20px] md:flex items-center">
                        {/* image work */}
                        <div className="px-4 md:w-1/2">
                            <div className="flex gap-6 items-center">
                                {/* Thumbnail Images */}
                                <div className="flex flex-col gap-4">
                                    {images.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            className={`md:w-[100px] md:h-[100px] w-[110px] object-cover border rounded-md cursor-pointer ${selectedImage == img ? "border-black" : "border-gray-300"
                                                }`}
                                            onClick={() => setSelectedImage(img)}
                                        />
                                    ))}
                                </div>

                                {/* Main Image Display */}
                                <div className="relative">
                                    <img
                                        src={selectedImage}
                                        alt="Selected Product"
                                        className="w-[450px] h-[450px] object-contain"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="text-left md:w-1/2 flex flex-col gap-y-[15px] md:px-0 px-[20px]">
                            {/* product name and description */}
                            <div className="flex items-center justify-between">
                                <p className="font-cormot md:text-[30px] text-[25px]">{product.name}</p>
                                <div className="flex gap-x-[20px] ">
                                    <FaCircleArrowLeft className="text-[25px] cursor-pointer hover:text-[#878787] transition duration-300" />
                                    <FaCircleArrowRight className="text-[25px] cursor-pointer hover:text-[#878787] transition duration-300" />
                                </div>

                            </div>
                            <div className="flex flex-col gap-y-[15px]">
                                <p className="text-[25px] text-[#5B5B5B] font-bold font-urbanist">${product.price} <span className="text-[15px] text-[#818181]">+Free Shipping</span></p>
                                <p className="font-urbanist text-[15px] text-justify">{product.description}</p>
                            </div>

                            {/* quantity selector */}
                            <div className="flex text-[15px] gap-x-[20px] items-center">
                                <div className=" flex items-center">
                                    <p className="border px-[15px] cursor-pointer hover:bg-black hover:text-white transition duration-300">-</p>
                                    <p className="border px-[15px]">1</p>
                                    <p className="border px-[15px] cursor-pointer hover:bg-black hover:text-white transition duration-300">+</p>
                                </div>

                                <div className="w-[400px] bg-black text-white text-center py-[4px] cursor-pointer hover:bg-transparent hover:text-black font-bold transition duration-500">
                                    <p>Add to Cart</p>
                                </div>
                            </div>

                            {/* payment */}
                            <div className="mx-auto mt-[15px] border w-full py-[20px] relative text-[#000]">
                                <p className="absolute top-[-13px] md:left-[31%] left-[17%] px-[25px] font-urbanist bg-white">Guaranteed Safe Checkout</p>
                                <div className="flex items-center justify-center gap-x-[35px] text-[55px] md:px-0 px-[20px]">
                                    <FaCcVisa />
                                    <FaCcMastercard />
                                    <SiAmericanexpress />
                                    <FaCcDiscover />
                                    <FaCcPaypal />
                                </div>
                            </div>

                            {/* guarantee */}
                            <div className="text-[#000]">
                                <p className="text-[15px] flex items-center gap-x-[15px]">
                                    <FaCheckCircle />
                                    No-Risk Money Back Guarantee!
                                </p>

                                <p className="text-[15px] flex items-center gap-x-[15px]">
                                    <FaCheckCircle />
                                    No Hassle Refunds
                                </p>

                                <p className="text-[15px] flex items-center gap-x-[15px]">
                                    <FaCheckCircle />
                                    Secure Payments
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* review form */}
                    <div className='md:px-0 px-[20px]'>
                        <ReviewForm />
                    </div>

                    {/* related products */}
                    <div className="md:px-0 px-[20px] py-[50px]">
                        <h2 className="font-cormot text-[35px] py-[20px]">Related Products</h2>
                        <div className="grid md:grid-cols-4 gap-[20px] mx-auto max-w-[1320px] px-4">
                            {
                                bestSellers.map((product, index) => (
                                    <div
                                        key={product._id}
                                        className="md:my-0 my-[30px] relative cursor-pointer"
                                        onClick={() => navigate(`/product/${product._id}`, { state: { product } })}
                                    >
                                        {product.discount > 0 && (
                                            <div className='absolute top-[10px] left-[10px] bg-yellow-400 py-[5px] w-[60px] text-center rounded'>
                                                <p className='font-urbanist font-bold text-xs'>Sale!!</p>
                                            </div>
                                        )}
                                        <div className="product1 cursor-pointer">
                                            <img src={product.images[0]} alt="" className="" />
                                            <div className='pt-[15px]'>
                                                <p className='text-[#9D9D9D] text-[15px]'>{product.category}</p>
                                                <p className='font-cormot text-black text-[25px] font-semibold'>{product.name}</p>
                                                <div className='flex gap-x-[10px]'>
                                                    <FaStar />
                                                    <FaStar />
                                                    <FaStar />
                                                    <FaStar />
                                                    <FaStar />
                                                </div>
                                                <p className='pt-[10px] text-[20px] font-urbanist font-bold'>
                                                    ${product.price}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductBuy;
