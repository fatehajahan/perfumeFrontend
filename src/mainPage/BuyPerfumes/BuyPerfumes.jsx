import React, { useEffect, useState } from 'react'
import noImg from '../../assets/noImg.jpg'
import { FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const BuyPerfumes = () => {
    const url = import.meta.env.VITE_APP_URL

    const [products, setProducts] = useState([])

    // for show category
    const [getCategory, setGetCategory] = useState([])
    useEffect(() => {
        axios.get(`${url}/category/getallcategory`)
            .then((res) => {
                let arr = [...res.data.data]
                setGetCategory(arr)
            })
    }, [])

    // for all products
    const [currentPage, setCurrentPage] = useState(1)
    const [productPerPage, setProductPerPage] = useState(2)
    const [count, setCount] = useState(0)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // const response = await axios.get(`http://localhost:3000/api/v1/product/getallproduct?page=${currentPage}&size=${productPerPage}`);
                // http://localhost:3000/api/v1/product/getallproduct?page=3&size=2

                const response = await axios.get(`${url}/product/getallproduct?page=${currentPage}&size=${productPerPage}`);
                setProducts(response.data.data);
                setCount(response.data.totalProducts)
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [currentPage, productPerPage]);
    console.log(products)

    // pagination
    const pageArr = [...Array(Math.ceil(count / productPerPage)).keys()].map((btn) => btn + 1)
    const handlePageChange = (value) => {
        setCurrentPage(value)
    }
    console.log(pageArr.length)
    return (
        <div className='md:py-[80px]'>
            <div className="container">
                <div >
                    <div>
                        <p className="font-cormot text-base uppercase tracking-wide text-black pt-[50px] font-medium">
                            Check out our
                        </p>
                        <h3 className='font-cormot md:text-[84px] text-[30px] py-[20px]'>Shop</h3>
                    </div>

                    <div className='grid md:grid-cols-4 gap-[20px] mx-auto max-w-[1320px] px-4'>
                        {
                            products.map((product) => (
                                <Link key={product._id} to={`/product/${product._id}`} className='relative'>
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
                                                <p className='text-[#9D9D9D] text-[15px]'>
                                                    {getCategory.find(cat => cat._id === product.category)?.categoryName || 'Unknown Category'}
                                                </p>

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

                {/* buttons */}
                <div className=' flex justify-end pt-[50px]'>
                    <div className='flex items-center space-x-2'>
                        <button
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)} className={`${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "bg-gray-600 py-[4.2px] px-[5px] rounded-xl text-white font-semibold cursor-pointer"} `}>Prev</button>
                        {
                            pageArr.map((btn) => (
                                <button
                                    key={btn}
                                    onClick={() => currentPage == btn ? "bg-transparent" : setCurrentPage(btn)}
                                    className={`cursor-pointer ${currentPage === btn && "bg-gray-500 py-[4.2px] px-[5px] rounded-xl text-white font-semibold"}`}>{btn}
                                </button>
                            ))
                        }
                        <button
                            disabled={currentPage === pageArr.length}
                            onClick={() => handlePageChange(currentPage + 1)} className={`${currentPage === pageArr.length ? "opacity-50 cursor-not-allowed" : "bg-gray-600 py-[4.2px] px-[5px] rounded-xl text-white font-semibold cursor-pointer"} `}>Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BuyPerfumes