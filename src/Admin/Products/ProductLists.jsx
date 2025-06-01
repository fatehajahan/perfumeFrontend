import axios from 'axios'
import React from 'react'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const ProductLists = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_APP_URL}/product/getallproduct`)
            .then((res) => setProducts(res.data.data))
    }, [])
    console.log(products)

    const TABLE_ROWS = products

    const handleDelete = (id) => {
        axios.delete(`${import.meta.env.VITE_APP_URL}/product/deleteproduct/${id}`)
            .then((res) => {
                console.log(res.data)
                setProducts(products.filter((product) => product._id !== id))
                toast.success("product Deleted Successfully")
            })
    }
    return (
        <div>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className="p-8">
                <h2 className="text-4xl font-bold text-center text-gray-600 mb-6">Product List</h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-700 shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-100">
                            <tr className="rounded-t-lg">
                                <th className="px-6 py-4">Sr No</th>
                                <th className="px-6 py-4">Product Name</th>
                                <th className="px-6 py-4">Product Description</th>
                                <th className="px-6 py-4">Product's Category</th>
                                <th className="px-6 py-4">Update</th>
                                <th className="px-6 py-4">Delete</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {TABLE_ROWS.map(({ _id, name, description, category }, index) => (
                                <tr key={name} className="border-b">
                                    <td className="px-6 py-4">{index + 1}.</td>
                                    <td className="px-6 py-4">{name}</td>
                                    <td className="px-6 py-4">{description}</td>
                                    <td className="px-6 py-4">{category}</td>
                                    <td className="px-6 py-4 text-blue-500 cursor-pointer">
                                        <Link
                                            to={`/updateProduct/${_id}`}
                                        >
                                            Update
                                        </Link>
                                    </td>
                                    <td onClick={() => handleDelete(_id)} className="px-6 py-4 text-red-500 cursor-pointer">Delete</td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProductLists