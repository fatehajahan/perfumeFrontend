import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';

const ProductUpdate = () => {
    const { id } = useParams();

    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        fragrance: '',
        category: '',
        subCategory: '',
        discount: '',
        images: [],
    });

    // for options
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_APP_URL}/category/getallcategory`)
            .then((res) => setCategories(res.data.data))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_APP_URL}/subcategory/getallsubcategory`)
            .then((res) => setSubCategories(res.data.data))
            .catch((err) => console.log(err));
    }, []);

    // handle input changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'images') {
            setForm({ ...form, images: files });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    // handle product creation/update
    const handleUpdateProduct = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', form.name);
            formData.append('description', form.description);
            formData.append('price', form.price);
            formData.append('fragrance', form.fragrance);
            formData.append('category', form.category);
            formData.append('subCategory', form.subCategory);
            formData.append('discount', form.discount);

            // append images
            for (let i = 0; i < form.images.length; i++) {
                formData.append('images', form.images[i]);
            }

            const res = await axios.patch(
                `${import.meta.env.VITE_APP_URL}/product/updatesingleproduct/${id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log('Product updated:', res.data.message);
            toast.success(res.data.message);
        } catch (error) {
            console.error('Error updating product:', error.response || error);
            toast.error('Failed to update product');
        }
    };

    return (
        <div className="flex flex-col justify-between items-center">
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
                Update Product <span className="text-amber-700">{id}</span>
            </h1>

            <div className="max-w-5xl mx-auto px-4 py-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Update Product</h2>
                <p className="text-gray-500 mb-6">
                    Enter product details below.
                </p>

                <form
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    onSubmit={handleUpdateProduct}
                >
                    {/* Product Name */}
                    <div>
                        <label className="block font-semibold mb-1">
                            Product Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            onChange={handleChange}
                            name="name"
                            type="text"
                            placeholder="Product's Name"
                            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                            value={form.name}
                            required
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block font-semibold mb-1">
                            Category <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="category"
                            onChange={handleChange}
                            value={form.category}
                            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((c) => (
                                <option key={c._id} value={c._id}>
                                    {c.categoryName}
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
                            onChange={handleChange}
                            value={form.description}
                            placeholder="Product's Description"
                            className="w-full h-24 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                            required
                        />
                    </div>

                    {/* Subcategory */}
                    <div>
                        <label className="block font-semibold mb-1">Subcategory</label>
                        <select
                            name="subCategory"
                            onChange={handleChange}
                            value={form.subCategory}
                            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                        >
                            <option value="">Select Subcategory</option>
                            {subCategories.map((s) => (
                                <option key={s._id} value={s._id}>
                                    {s.subCategoryName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Discount */}
                    <div>
                        <label className="block font-semibold mb-1">Discount</label>
                        <input
                            name="discount"
                            onChange={handleChange}
                            value={form.discount}
                            type="text"
                            placeholder="Product's Discount"
                            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                        />
                    </div>

                    {/* Images */}
                    <div>
                        <label className="block font-semibold mb-1">Images</label>
                        <input
                            type="file"
                            name="images"
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                            multiple
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block font-semibold mb-1">
                            Price <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="price"
                            onChange={handleChange}
                            value={form.price}
                            type="number"
                            placeholder="Product's Price"
                            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                            required
                        />
                    </div>

                    {/* Fragrance */}
                    <div>
                        <label className="block font-semibold mb-1">Fragrance</label>
                        <input
                            name="fragrance"
                            onChange={handleChange}
                            value={form.fragrance}
                            type="text"
                            placeholder="Product's Fragrance"
                            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-1 md:col-span-2 mt-6">
                        <button
                            type="submit"
                            className="w-full bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300"
                        >
                            CREATE PRODUCT
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductUpdate;
