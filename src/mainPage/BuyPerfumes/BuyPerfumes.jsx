import React, { useEffect, useState } from 'react'
import noImg from '../../assets/noImg.jpg'
import { FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import axios from 'axios'

const BuyPerfumes = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/product/getallproduct");
                setProducts(response.data.data);  // because your backend returns { data: [...] }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);
    console.log(products)
    return (
        <div className='md:py-[80px]'>
            <div className="container">
                <div>
                    <p className="font-cormot text-base uppercase tracking-wide text-black pt-[50px] font-medium">
                        Check out our
                    </p>
                    <h3 className='font-cormot md:text-[84px] text-[30px] py-[20px]'>Shop</h3>
                </div>

                <div className='grid md:grid-cols-4 gap-[20px] mx-auto max-w-[1320px] px-4'>
                    {
                        products.map((product) => (
                            <div key={product._id} className='md:my-0 my-[30px] relative'>
                                {product.discount && (
                                    <div className='absolute top-[10px] left-[10px] bg-yellow-400 py-[5px] w-[60px] text-center rounded'>
                                        <p className='font-urbanist font-bold text-xs'>Sale!!</p>
                                    </div>
                                )}
                                <div className='md:my-0 my-[30px]'>
                                    <Link to="/bluePerfume" className="product1 cursor-pointer">
                                        {/* image below */}
                                        <img src={product.image ? product.image : noImg} alt="" className='w-[534px] md:w-auto' />
                                        <div className='pt-[15px]'>
                                            {/* category */}
                                            <p className='text-[#9D9D9D] text-[15px]'>Exclusive</p>
                                            {/* name */}
                                            <p className='font-cormot text-black text-[25px] font-semibold'>{product.name}</p>
                                            <div className='flex gap-x-[10px]'>
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                            </div>
                                            {/* price */}
                                            <p className='pt-[10px] text-[20px] font-urbanist font-bold'>
                                                ${product.price}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default BuyPerfumes