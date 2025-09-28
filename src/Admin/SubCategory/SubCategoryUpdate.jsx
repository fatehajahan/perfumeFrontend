import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';

const SubCategoryUpdate = () => {
  const url = import.meta.env.VITE_APP_URL
  console.log(url)
  const { id } = useParams()
  const [subCategoryName, setSubCategoryName] = useState("")
  const [subCategoryDescription, setSubCategoryDescription] = useState("")

  const handleUpdate = async () => {
    const data = {
      subCategoryName: subCategoryName,
      subCategoryDescription: subCategoryDescription,
    }
    await axios.patch(`${url}/subcategory/updatesinglesubcategory/${id}`, data)
      .then((res) => {
        toast.success(res.data.message)
      }).catch((err)=>{
        toast.error(err)
      })
  }

  return (
    <div className="flex flex-col items-center justify-center mt-10 px-4">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnHover
        draggable
        theme="light"
        transition={Bounce}
      />

      <h1 className="text-3xl font-bold mb-6">
        Update SubCategory No. <span className="text-amber-700">{id}</span>
      </h1>

      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <label
          htmlFor="subCategoryName"
          className="block mb-2 font-medium text-gray-700"
        >
          SubCategory's Name
        </label>
        <input
          id="subCategoryName"
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
          type="text"
          className="border border-gray-400 py-2 px-4 w-full mb-4 rounded"
          placeholder="Enter new subCategory name"
        />

        <label
          htmlFor="subCategoryDescription"
          className="block mb-2 font-medium text-gray-700"
        >
          SubCategory's Description
        </label>
        <textarea
          id="subCategoryDescription"
          value={subCategoryDescription}
          onChange={(e) => setSubCategoryDescription(e.target.value)}
          className="border border-gray-400 py-2 px-4 w-full mb-6 rounded h-24"
          placeholder="Enter new subCategory description"
        />

        <button
          onClick={handleUpdate}
          className="w-full bg-amber-700 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
        >
          Update SubCategory
        </button>
      </div>
    </div>
  );
};

export default SubCategoryUpdate;
