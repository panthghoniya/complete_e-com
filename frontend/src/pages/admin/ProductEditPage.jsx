import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import AdminLayout from '../../components/AdminLayout';
import { FaSave, FaArrowLeft, FaUpload } from 'react-icons/fa';

const ProductEditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isEditMode) {
            const fetchProduct = async () => {
                setLoading(true);
                try {
                    const { data } = await api.get(`/products/${id}`);
                    setName(data.name);
                    setPrice(data.price);
                    setImage(data.image);
                    setBrand(data.brand);
                    setCategory(data.category);
                    setCountInStock(data.countInStock);
                    setDescription(data.description);
                    setLoading(false);
                } catch (err) {
                    setError(err.message);
                    setLoading(false);
                }
            };
            fetchProduct();
        }
    }, [id, isEditMode]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const productData = {
                name,
                price,
                image,
                brand,
                category,
                countInStock,
                description,
            };

            if (isEditMode) {
                await api.put(`/products/${id}`, productData);
            } else {
                await api.post('/products', productData);
            }
            navigate('/admin/products');
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            setLoading(false);
        }
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        console.log('[Upload Handler] File selected:', file.name);

        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);
        setError(null);

        try {
            console.log('[Upload Handler] Sending request to /api/upload...');
            // Let axios set the correct Content-Type with boundary for FormData
            const { data } = await api.post('/upload', formData);
            console.log('[Upload Handler] Upload success:', data);

            setImage(data);
            setUploading(false);
        } catch (error) {
            console.error('[Upload Handler] Error:', error);
            const errorMsg = error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
            setError('Image upload failed: ' + errorMsg);
            setUploading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <Link to="/admin/products" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                        <FaArrowLeft className="mr-2" /> Back to Products
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-800">
                        {isEditMode ? 'Edit Product' : 'Create New Product'}
                    </h1>
                </div>

                {loading && <div className="text-center py-4">Loading...</div>}
                {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">{error}</div>}

                <form onSubmit={submitHandler} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column: Basic Info */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter product name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                                <input
                                    type="text"
                                    placeholder="Enter brand"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <input
                                    type="text"
                                    placeholder="Enter category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                    required
                                />
                            </div>
                        </div>

                        {/* Right Column: Details & Inventory */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Count In Stock</label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                                <div className="flex flex-col space-y-2">
                                    <input
                                        type="text"
                                        placeholder="Enter image URL"
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                    />
                                    <div className="flex items-center">
                                        <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors w-full">
                                            <FaUpload className="mr-2 text-gray-500" />
                                            <span className="text-sm text-gray-600">Choose File</span>
                                            <input type="file" className="hidden" onChange={uploadFileHandler} />
                                        </label>
                                    </div>
                                    {uploading && <div className="text-sm text-blue-600 font-medium animate-pulse">Uploading image...</div>}

                                    {/* Image Preview */}
                                    {image && (
                                        <div className="mt-4 p-2 bg-gray-50 rounded-lg border border-gray-200 text-center">
                                            <p className="text-xs text-gray-500 mb-2">Image Preview:</p>
                                            <img src={image} alt="Preview" className="h-40 w-full object-contain mx-auto rounded-md" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    placeholder="Enter description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows="5"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none"
                                    required
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 px-8 py-6 flex items-center justify-end border-t border-gray-100">
                        <Link
                            to="/admin/products"
                            className="mr-4 px-6 py-2.5 rounded-lg text-gray-600 hover:bg-gray-200 font-medium transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center px-8 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5"
                        >
                            <FaSave className="mr-2" />
                            {isEditMode ? 'Update Product' : 'Create Product'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default ProductEditPage;
