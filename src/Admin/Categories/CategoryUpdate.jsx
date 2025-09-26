import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';

const CategoryUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch category details on mount
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_URL}/category/getallSinglecategory/${id}`
        );
        setCategoryName(res.data.categoryName || '');
        setCategoryDescription(res.data.categoryDescription || '');
      } catch (err) {
        console.error(err);
        toast.error('Failed to load category details');
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  // Update category
  const updateCategory = async () => {
    if (!categoryName || !categoryDescription) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_APP_URL}/category/updatesinglecategory/${id}`,
        {
          categoryName,
          categoryDescription,
        }
      );

      toast.success(res.data.message || 'Category Updated Successfully');
      navigate('/categorylist');
    } catch (err) {
      console.error(err);
      toast.error('Category Update Failed');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        Loading category details...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mt-10 px-4">
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

      <h1 className="text-3xl font-bold mb-6">
        Update Category No. <span className="text-amber-700">{id}</span>
      </h1>

      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <label
          htmlFor="categoryName"
          className="block mb-2 font-medium text-gray-700"
        >
          Category's Name
        </label>
        <input
          id="categoryName"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          type="text"
          className="border border-gray-400 py-2 px-4 w-full mb-4 rounded"
          placeholder="Enter new category name"
        />

        <label
          htmlFor="categoryDescription"
          className="block mb-2 font-medium text-gray-700"
        >
          Category's Description
        </label>
        <textarea
          id="categoryDescription"
          value={categoryDescription}
          onChange={(e) => setCategoryDescription(e.target.value)}
          className="border border-gray-400 py-2 px-4 w-full mb-6 rounded h-24"
          placeholder="Enter new category description"
        />

        <button
          onClick={updateCategory}
          className="w-full bg-amber-700 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
        >
          Update Category
        </button>
      </div>
    </div>
  );
};

export default CategoryUpdate;
