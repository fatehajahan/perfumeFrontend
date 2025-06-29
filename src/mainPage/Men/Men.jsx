import React, { useEffect, useState } from 'react';
import noImg from '../../assets/noImg.jpg';
import { FaStar } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Men = () => {
    const url = import.meta.env.VITE_APP_URL;
    const [exclusiveProducts, setExclusiveProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExclusiveProducts = async () => {
            try {
                const response = await axios.get(`${url}/category/getallcategory`);
                const categories = response.data.data;

                // for index 2:
                console.log(categories[2])
                const exclusiveCategory = categories[2];
                console.log(exclusiveCategory.product)

                if (exclusiveCategory && exclusiveCategory.product) {
                    setExclusiveProducts(exclusiveCategory.product);
                }
            } catch (error) {
                console.error('Error fetching exclusive products:', error);
            }
        };

        fetchExclusiveProducts();
    }, []);
    console.log(exclusiveProducts)

    const [getCategory, setGetCategory] = useState([])
    useEffect(() => {
        axios.get(`${url}/category/getallcategory`)
            .then((res) => {
                let arr = [...res.data.data]
                setGetCategory(arr)
            })
    }, [])
    console.log(getCategory)

    return (
        <div className='md:py-[80px]'>
            <div className="container">
                <div>
                    <p className="font-cormot text-base uppercase tracking-wide text-black pt-[50px] font-medium">
                        Check out our
                    </p>
                    <h3 className='font-cormot md:text-[84px] text-[30px] py-[20px]'>Perfume's for Men</h3>
                </div>

                <div className='grid md:grid-cols-4 gap-[20px] mx-auto max-w-[1320px] px-4'>
                    {exclusiveProducts.length > 0 ? (
                        exclusiveProducts.map((product) => (
                            <Link key={product._id} to={`/product/${product._id}`} className='relative'>
                                {product.discount > 0 && (
                                    <div className='absolute top-[10px] left-[10px] bg-yellow-400 py-[5px] w-[60px] text-center rounded'>
                                        <p className='font-urbanist font-bold text-xs'>Sale!!</p>
                                    </div>
                                )}
                                <div className='md:my-0 my-[30px]'>
                                    <div className="product1">
                                        {/* Image */}
                                        <img
                                            src={product.images?.[0] || noImg}
                                            alt={product.name}
                                            className='w-full object-cover'
                                        />
                                        <div className='pt-[15px]'>
                                            <p className='text-[#9D9D9D] text-[15px]'>
                                                {getCategory.find(cat => cat._id === product.category)?.categoryName || 'Unknown Category'}
                                            </p>
                                            {/* Name */}
                                            <p className='font-cormot text-black text-[25px] font-semibold'>{product.name}</p>
                                            {/* Stars */}
                                            <div className='flex gap-x-[10px] text-yellow-400'>
                                                {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                                            </div>
                                            {/* Price */}
                                            <p className='pt-[10px] text-[20px] font-urbanist font-bold'>
                                                ${product.price}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className='col-span-4 text-center py-10'>No exclusive products available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Men;
