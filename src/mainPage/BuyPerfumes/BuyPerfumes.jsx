import React, { useEffect, useState } from 'react'
import noImg from '../../assets/noImg.jpg'
import { FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const BuyPerfumes = () => {
    const url = import.meta.env.VITE_APP_URL
    console.log(url)

    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/product/getallproduct")
                setProducts(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])
    console.log(products)
    const [getCategory, setGetCategory] = useState([])

    useEffect(() => {
        const cat = axios.get(`${url}/category/getallcategory`)
            .then((res) => {
                let arr = [...res.data.data]
                setGetCategory(arr)
            })
    }, [])
    console.log(getCategory)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${url}/product/getallproduct`);
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
                            <Link key={product._id} to={`/product/${product._id}`}>
                                {product.discount > 0 && (
                                    <div className='absolute top-[10px] left-[10px] bg-yellow-400 py-[5px] w-[60px] text-center rounded'>
                                        <p className='font-urbanist font-bold text-xs'>Sale!!</p>
                                    </div>
                                )}
                                <div className='md:my-0 my-[30px]'>
                                    <div className="product1 cursor-pointer">
                                        {/* image below */}
                                        <img src={product.images[0]} alt="" className='w-[534px] md:w-auto' />
                                        <div className='pt-[15px]'>
                                            {/* category */}
                                            {
                                                (() => {
                                                    const matchedCategory = getCategory.find(cat => cat._id === product.category);
                                                    return matchedCategory ? (
                                                        <p className='text-[#9D9D9D] text-[15px]'>{matchedCategory.categoryName}</p>
                                                    ) : (
                                                        <p className='text-[#9D9D9D] text-[15px]'>Unknown Category</p>
                                                    );
                                                })()
                                            }

                                            {/* name */}
                                            <p className='font-cormot text-black text-[25px] font-semibold'>{product.name}</p>
                                            <div className='flex gap-x-[10px] text-yellow-400'>
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
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
        // <p>deee</p>
    )
}

export default BuyPerfumes