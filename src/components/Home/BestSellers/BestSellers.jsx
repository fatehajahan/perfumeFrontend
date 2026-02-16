import { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import axios from 'axios'

const BestSellers = () => {
    const [products, setProducts] = useState([]);
    const [getCategory, setGetCategory] = useState([]);
    const url = import.meta.env.VITE_APP_URL

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${url}/product/getallproduct`);
                setProducts(response.data.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);
    const bestSellers = products.slice(0, 4);

    useEffect(() => {
        axios
            .get(`${url}/category/getallcategory`)
            .then((res) => {
                setGetCategory(res.data.data || []);
            })
            .catch((err) => {
                console.error('Error fetching categories:', err);
            });
    }, []);
    return (
        <div className='md:py-[80px] py-[50px]'>
            <div className="container mx-auto">

                {/* Title Section */}
                <div>
                    <p className="font-cormot text-base uppercase tracking-wide text-black pt-[50px] text-center font-medium">
                        Check out our
                    </p>
                    <h3 className='font-cormot md:text-[68px] text-[30px] text-center py-[20px]'>
                        Best Sellers
                    </h3>
                </div>

                {/* Products Grid */}
                <div className='
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            gap-[30px] 
            max-w-[1320px] 
            mx-auto 
            px-4
        '>
                    {bestSellers.map((product) => (
                        <div
                            key={product._id}
                            className='relative group'
                        >
                            <Link
                                to={`/product/${product._id}`}
                                className="block cursor-pointer"
                            >
                                {/* Sale Badge */}
                                {product.discount > 0 && (
                                    <div className='absolute top-[10px] left-[10px] bg-yellow-400 py-[5px] w-[60px] text-center rounded z-10'>
                                        <p className='font-urbanist font-bold text-xs'>
                                            Sale!!
                                        </p>
                                    </div>
                                )}

                                {/* Product Image */}
                                <div className="overflow-hidden">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className='
                                    w-full 
                                    h-[350px] 
                                    object-cover 
                                    transition duration-500 
                                    group-hover:scale-105
                                '
                                    />
                                </div>

                                {/* Product Info */}
                                <div className='pt-[15px]'>
                                    <p className='text-[#9D9D9D] text-[15px]'>
                                        {
                                            getCategory.find((cat) => cat._id === product.category)?.categoryName ||
                                            'Unknown Category'
                                        }
                                    </p>

                                    <p className='font-cormot text-black text-[25px] font-semibold'>
                                        {product.name}
                                    </p>

                                    <div className='flex gap-x-[10px] text-yellow-400'>
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
                    ))}
                </div>

            </div>
        </div>

    )
}

export default BestSellers