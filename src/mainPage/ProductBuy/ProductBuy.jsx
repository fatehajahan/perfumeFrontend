import React, { useEffect, useState } from "react";
import { FaCcDiscover, FaCcPaypal } from "react-icons/fa6";
import { FaCcMastercard, FaCcVisa, FaCheckCircle, FaStar } from "react-icons/fa";
import { SiAmericanexpress } from "react-icons/si";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Footer from "../../components/Home/Footer/Footer";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { cartTotal } from "../../slices/cartSlice";
import { quantityDecreament, quantityUpdate } from '../../slices/cartSlice'

const ProductBuy = () => {
    const data = useSelector((state) => state.cartDetails.cartItems)
    console.log(data)
    const url = import.meta.env.VITE_APP_URL
    const dispatch = useDispatch()
    const [products, setProducts] = useState([]);
    const [selectedImage, setSelectedImage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${url}/product/getallproduct`);
                setProducts(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProducts();
    }, []);

    const product = products.find((p) => p._id === id);

    useEffect(() => {
        if (product && product.images.length > 0) {
            setSelectedImage(product.images[0]);
        }
    }, [product]);

    if (!product) return <div className="text-center py-20">Loading...</div>;

    // to show related products
    const relatedProducts = products.slice(0, 4);


    // function to add product to cart
    const handleAddToCart = () => {
        const productWithQty = {
            ...product,
            quantity: quantity
        };
        dispatch(cartTotal(productWithQty));
    };

    const handleIncreament = () => {
        setQuantity(prev => prev + 1);
    };

    const handleDecreament = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };
    return (
        <div>
            <div className="container">
                <div className="md:py-[150px] py-[20px] md:flex gap-6">
                    {/* Image Section */}
                    <div className="px-4 md:w-1/2 flex gap-6">
                        {/* Thumbnails */}
                        <div className="flex flex-col gap-4">
                            {product.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Product ${index}`}
                                    className={`w-[100px] h-[100px] object-cover border rounded cursor-pointer ${selectedImage === img ? "border-black" : "border-gray-300"}`}
                                    onClick={() => setSelectedImage(img)}
                                />
                            ))}
                        </div>

                        {/* Main Image */}
                        <div>
                            <img
                                src={selectedImage}
                                alt="Selected Product"
                                className="w-[450px] h-[450px] object-contain"
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="text-left md:w-1/2 flex flex-col gap-y-4 md:px-0 px-4">
                        <p className="font-cormot text-[30px]">{product.name}</p>
                        <p className="text-[25px] text-[#5B5B5B] font-bold font-urbanist">
                            ${product.price} <span className="text-[15px] text-[#818181]">+Free Shipping</span>
                        </p>
                        <p className="font-urbanist text-[15px] text-justify">{product.description}</p>

                        {/* Quantity & Cart */}

                        <div className="flex text-[15px] gap-x-4 items-center">
                            <div className="flex gap-2 items-center">
                                <p onClick={handleDecreament} className={`border px-[15px] transition duration-300 ${quantity === 1 ? 'cursor-not-allowed bg-gray-300 text-gray-600' : 'cursor-pointer hover:bg-black hover:text-white'}`} >-</p>
                                <p className="border px-4">{quantity}</p>
                                <p onClick={handleIncreament} className="border px-[15px] transition duration-300 cursor-pointer hover:bg-black hover:text-white" >+</p>
                            </div>
                            <div onClick={handleAddToCart} className="w-[200px] bg-black text-white text-center py-2 cursor-pointer hover:bg-transparent hover:text-black font-bold transition">
                                Add to Cart
                            </div>
                        </div>



                        {/* Payment */}
                        <div className="mx-auto mt-4 border w-full py-4 relative text-[#000]">
                            <p className="absolute top-[-13px] left-1/2 transform -translate-x-1/2 px-6 font-urbanist bg-white">
                                Guaranteed Safe Checkout
                            </p>
                            <div className="flex items-center justify-center gap-x-8 text-[35px]">
                                <FaCcVisa />
                                <FaCcMastercard />
                                <SiAmericanexpress />
                                <FaCcDiscover />
                                <FaCcPaypal />
                            </div>
                        </div>

                        {/* Guarantee */}
                        <div className="text-[#000] mt-4 space-y-2">
                            <p className="text-[15px] flex items-center gap-x-2">
                                <FaCheckCircle /> No-Risk Money Back Guarantee!
                            </p>
                            <p className="text-[15px] flex items-center gap-x-2">
                                <FaCheckCircle /> No Hassle Refunds
                            </p>
                            <p className="text-[15px] flex items-center gap-x-2">
                                <FaCheckCircle /> Secure Payments
                            </p>
                        </div>
                    </div>
                </div>

                {/* Review Form */}
                <div className="px-4 md:px-0">
                    <ReviewForm />
                </div>

                {/* Related Products */}
                <div className="px-4 md:px-0 py-12">
                    <h2 className="font-cormot text-[35px] py-4">Related Products</h2>
                    <div className="grid md:grid-cols-4 gap-6 mx-auto max-w-[1320px]">
                        {relatedProducts.map((prod) => (
                            <Link key={prod._id} to={`/product/${prod._id}`}
                            >
                                {prod.discount > 0 && (
                                    <div className="absolute top-2 left-2 bg-yellow-400 py-1 w-[60px] text-center rounded">
                                        <p className="font-urbanist font-bold text-xs">Sale!!</p>
                                    </div>
                                )}
                                <div>
                                    <img src={prod.images[0]} alt="" className="w-full object-cover" />
                                    <div className="pt-2">
                                        <p className="text-[#9D9D9D] text-[15px]">{prod.category}</p>
                                        <p className="font-cormot text-black text-[20px] font-semibold">{prod.name}</p>
                                        <div className="flex gap-x-1 text-yellow-400">
                                            <div className='flex gap-x-[10px]'>
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                            </div>
                                        </div>
                                        <p className="pt-2 text-[18px] font-urbanist font-bold">${prod.price}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductBuy;
