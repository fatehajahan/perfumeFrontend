import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';

const CreateProduct = () => {
  const url = import.meta.env.VITE_APP_URL; // hosted backend URL
  console.log(url)
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    fragrance: '',
    discount: '',
    category: '',
    subCategory: '',
    images: [],
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // Fetch categories
  useEffect(() => {
    axios
      .get(`${url}/category/getallcategory`)
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch subcategories
  useEffect(() => {
    axios
      .get(`${url}/subcategory/getallsubcategory`)
      .then((res) => setSubCategories(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'images') {
      setForm({ ...form, images: Array.from(e.target.files) });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleCreateProduct = async () => {
    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (key === 'images') {
          value.forEach((file) => formData.append('images', file));
        } else if (value !== '') {
          formData.append(key, value);
        }
      });

      const response = await axios.post(`${url}/product/createproduct`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success(response.data.message || 'Product created successfully');
      // Reset form
      setForm({
        name: '',
        description: '',
        price: '',
        fragrance: '',
        discount: '',
        category: '',
        subCategory: '',
        images: [],
      });
    } catch (error) {
      console.error(error.response || error);
      toast.error(error.response?.data?.message || 'Product creation failed');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
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

      <h2 className="text-2xl md:text-3xl font-bold mb-2">Create Product</h2>
      <p className="text-gray-500 mb-6">Fill in the details to create a new product.</p>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block font-semibold mb-1">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.categoryName || c._id}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Product Description"
            className="w-full h-24 border border-gray-300 px-4 py-2 rounded-md"
          ></textarea>
        </div>

        {/* Subcategory */}
        <div>
          <label className="block font-semibold mb-1">Subcategory</label>
          <select
            name="subCategory"
            value={form.subCategory}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          >
            <option value="">Select Subcategory</option>
            {subCategories.map((s) => (
              <option key={s._id} value={s._id}>
                {s.subCategoryName || s._id}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold mb-1">
            Price <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />
        </div>

        {/* Fragrance */}
        <div>
          <label className="block font-semibold mb-1">Fragrance</label>
          <input
            type="text"
            name="fragrance"
            value={form.fragrance}
            onChange={handleChange}
            placeholder="Fragrance"
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />
        </div>

        {/* Discount */}
        <div>
          <label className="block font-semibold mb-1">Discount</label>
          <input
            type="text"
            name="discount"
            value={form.discount}
            onChange={handleChange}
            placeholder="Discount"
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />
        </div>

        {/* Images */}
        <div>
          <label className="block font-semibold mb-1">Images</label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>
      </form>

      <div className="mt-8">
        <button
          type="button"
          onClick={handleCreateProduct}
          className="w-full md:w-auto bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800"
        >
          CREATE PRODUCT
        </button>
      </div>
    </div>
  );
};

export default CreateProduct;

