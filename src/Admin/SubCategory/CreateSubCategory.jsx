import axios from 'axios'
import { toast, ToastContainer, Bounce } from 'react-toastify'
import React, { useEffect, useState } from 'react'

const CreateSubCategory = () => {
    const url = import.meta.env.VITE_APP_URL
    const [categoryies, setCategories] = useState([])
    const [subCategoryName, setSubCategoryName] = useState("")
    const [subCategoryDescription, setsubCategoryDescription] = useState("")
    const [category, setCategory] = useState("")

    useEffect(() => {
        axios.get(`${url}/category/getallcategory`)
            .then((res) => {
                console.log(res.data.data);
                setCategories(res.data.data)
            })
    }, [])
    console.log(categoryies.map((cat) => cat._id))

    const handleCreateCategory = () => {
        console.log(subCategoryName)
        console.log(subCategoryDescription)
        setsubCategoryDescription("")
        setSubCategoryName("")
        setCategory("")
        const data = {
            subCategoryName,
            subCategoryDescription,
            category
        };
        axios.post(`${url}/subcategory/createsubcategory`, data)
            .then((res) => {
                console.log(res)
                toast.success("SubCategory Created Successfully")
            })
            .catch((err) => {
                console.log(err)
                toast.error("SubCategory Creation Failed")
            });
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
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-[50px]'>Create a New Sub Category</h1>
                <div>
                    {/* subcategory name */}
                    <label htmlFor="subCategoryName">SubCategory's Name</label>
                    <input onChange={(e) => setSubCategoryName(e.target.value)} type="text" className='border border-[#4a4a4a] py-[10px] px-[15px] w-full mb-[26px]' />

                    {/* subcategory Description */}
                    <label htmlFor="subCategoryDescription">SubCategory's Description</label>
                    <textarea onChange={(e) => setsubCategoryDescription(e.target.value)} type="text" className='border border-[#4a4a4a] py-[10px] px-[15px] w-full mb-[26px] ' />

                    <div>
                        <label className="block font-semibold mb-1">
                            Product's Category <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                        >
                            <option value="">Select a category</option>
                            {categoryies.map((cat) => (
                                <option value={cat._id} key={cat._id}>
                                    {cat._id}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div onClick={handleCreateCategory} className='bg-amber-700 py-[20px] text-center cursor-pointer px-[9px] rounded-md text-white font-urbanist font-bold hover:bg-amber-500 hover:text-black transition duration-500 mt-[30px]'>
                    <button >Create a New Sub Category</button>
                </div>
            </div>
        </div>
    )
}

export default CreateSubCategory