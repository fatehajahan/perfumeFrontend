import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import axios from 'axios'

const BestSellers = () => {
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
    const bestSellers = products.slice(0, 4);
    console.log(products)

    return (
        <div className='md:py-[80px]'>
            <div className="container">
                <div>
                    <p className="font-cormot text-base uppercase tracking-wide text-black pt-[50px] text-center font-medium">
                        Check out our
                    </p>
                    <h3 className='font-cormot md:text-[68px] text-[30px] text-center py-[20px]'>Best Sellers</h3>
                </div>

                <div className='grid md:grid-cols-4 gap-[20px] mx-auto max-w-[1320px] px-4'>
                    {
                        bestSellers.map((product) => (
                            <div key={product._id} className='md:my-0 my-[30px]'>
                                <Link to={`/product/${product._id}`} className="product1 cursor-pointer">
                                    <img src={product.images[0]} alt="" className='w-[534px] md:w-auto' />
                                    <div className='pt-[15px]'>
                                        <p className='text-[#9D9D9D] text-[15px]'>Exclusive</p>
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
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default BestSellers