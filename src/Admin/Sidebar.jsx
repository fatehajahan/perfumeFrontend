import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const demo = useContext(AuthContext)
    console.log(demo, 'sdsds')

    const [user, setUser] = useState("")
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/authentication/currentuser", { withCredentials: true }).then((res) => {
            setUser(res.data)
        })
    }, [])
    console.log(user)
    return (
        <div className='w-[20%] bg-[linear-gradient(90deg,#AE8625,#F7EF8A,#D2AC47,#EDC967)] py-[20px] flex flex-col items-center h-screen'>
            <h1 className='font-urbanist text-[30px] font-bold'>Inessa Admin Panel</h1>
            {
                user?.role == "admin" && <div>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="inline-flex justify-center w-[300px] rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                        E-Commerce
                    </button>

                    {isOpen && (
                        <div className="z-10 mt-2 w-[300px] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 font-urbanist ">
                            <div className="py-1">
                                {/* Category */}
                                <p className='pb-[13px] text-[30px] pl-[4px] underline'>Category Section</p>
                                <Link to="/createcategory" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-[18px]">
                                    Create Category
                                </Link>
                                <Link to="/categorylist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-[18px]">
                                    Category List
                                </Link>

                                {/* SubCategory */}
                                <p className='pb-[13px] text-[30px] pl-[4px] underline'>SubCategory Section</p>
                                <Link to="/createsubcategory" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-[18px]">
                                    Create SubCategory
                                </Link>
                                <Link to="/subCategoryList" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-[18px]">
                                    SubCategory List
                                </Link>

                                {/* Product */}
                                <p className='pb-[13px] text-[30px] pl-[4px] underline'> Product Section</p>
                                <Link to="/createproduct" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-[18px]">
                                    Create Product
                                </Link>
                                <Link to="/productList" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-[18px]">
                                    Product List
                                </Link>

                                {/* Order */}
                                <p className='pb-[13px] text-[30px] pl-[4px] underline'>Order Section</p>
                                <Link to="/orderList" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-[18px]">
                                    Order List
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            }

            {
                user?.role == "user" && <div><h1>Only for admins</h1></div>
            }
        </div>
    )
}

export default Sidebar