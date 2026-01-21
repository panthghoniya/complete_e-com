import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { FaTrash, FaPlus } from 'react-icons/fa';

const CategoryListPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const { data } = await api.get('/categories');
            setCategories(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await api.delete(`/categories/${id}`);
                fetchCategories();
            } catch (err) {
                alert('Delete failed');
            }
        }
    };

    const createCategoryHandler = async () => {
        const name = prompt('Enter category name');
        if (name) {
            try {
                await api.post('/categories', { name });
                fetchCategories();
            } catch (err) {
                alert(err.response?.data?.message || 'Create failed');
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Categories</h1>
                <button onClick={createCategoryHandler} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center">
                    <FaPlus className="mr-2" /> Create Category
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="py-2 px-4 text-left">ID</th>
                                <th className="py-2 px-4 text-left">NAME</th>
                                <th className="py-2 px-4 text-left">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr key={category._id} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-4">{category._id}</td>
                                    <td className="py-2 px-4">{category.name}</td>
                                    <td className="py-2 px-4">
                                        <button onClick={() => deleteHandler(category._id)} className="text-red-500 hover:text-red-700">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CategoryListPage;
