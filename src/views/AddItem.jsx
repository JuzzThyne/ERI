import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { addSingleItem } from '../redux/itemSlice.js';

const AddItem = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const isLoading = useSelector((state) => state.item.isLoading);
    const errors = useSelector((state) => state.item.error);

    const [selectedFile, setSelectedFile] = useState(null);
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    const resetForm = () => {
        setSelectedFile(null);
        setItemName('');
        setItemPrice('');
        setError(null);
        setPreviewImage(null);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNameChange = (e) => {
        setItemName(e.target.value);
    };

    const handlePriceChange = (e) => {
        setItemPrice(e.target.value);
    };

    const handleUpload = async () => {
        if (!selectedFile || !itemName || !itemPrice) {
            setError('Please fill in all fields.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('itemName', itemName);
        formData.append('itemPrice', itemPrice);

        try {
            setLoading(true);
            await dispatch(addSingleItem({ formData, token }));
            resetForm(); // Call the resetForm function after successful submission
        } catch (error) {
            console.error('Error uploading item:', error);
            setError('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col gap-4 items-center'>
            <label
                htmlFor="fileInput"
                className="bg-green-500 text-white py-2 px-4 rounded cursor-pointer"
            >
                Choose a file
            </label>
            <input
                type="file"
                id="fileInput"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />
            {previewImage && <img src={previewImage} alt="Preview" className='rounded-full w-40 h-40' />}
            <input type="text" placeholder="Item Name" value={itemName} onChange={handleNameChange} className='border rounded p-2' />
            <input type="number" placeholder="Item Price" value={itemPrice} onChange={handlePriceChange} className='border rounded p-2' />
            <button onClick={handleUpload} disabled={loading} className='bg-green-300 rounded-xl py-4 px-2'>
                Upload
            </button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {loading && <div>Loading...</div>}
        </div>
    );
};

export default AddItem;
