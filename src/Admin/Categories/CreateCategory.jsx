import React, { useState } from 'react'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import axios from 'axios';

const CreateCategory = () => {
    const url = import.meta.env.VITE_APP_URL
    console.log(url)
    const [categoryName, setCategoryName] = useState("")
    const [categoryDescription, setCategoryDescription] = useState("")

    const handleCreateCategory = () => {
        console.log(categoryName)
        console.log(categoryDescription)
        setCategoryDescription("")
        setCategoryName("")
        const data = {
            categoryName,
            categoryDescription
        };
        axios.post(`${url}/category/createcategory`, data)
            .then((res) => {
                toast.success(res.data.message)
                setCategoryDescription("")
                setCategoryName("")
            })
            .catch((err) => toast.error("Category Creation Failed"));
    }

    return (
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-[50px]'>Create a New Category</h1>
            <ToastContainer
                position="top-center"
                autoClose={2000}
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
            <div>
                {/* category name */}
                <label htmlFor="categoryName">Category's Name</label>
                <input onChange={(e) => setCategoryName(e.target.value)} value={categoryName} type="text" className='border border-[#4a4a4a] py-[10px] px-[15px] w-full mb-[26px]' />

                {/* category Description */}
                <label htmlFor="categoryDescription">Category's Description</label>
                <textarea onChange={(e) => setCategoryDescription(e.target.value)} value={categoryDescription} type="text" className='border border-[#4a4a4a] py-[10px] px-[15px] w-full mb-[26px] ' />
            </div>

            <div onClick={handleCreateCategory} className='bg-amber-700 py-[20px] text-center cursor-pointer px-[9px] rounded-md text-white font-urbanist font-bold hover:bg-amber-500 hover:text-black transition duration-500'>
                <button className='cursor-pointer'>Create a New Category</button>
            </div>
        </div>
    )
}

export default CreateCategory