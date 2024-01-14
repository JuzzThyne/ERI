import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSingleItem } from '../redux/itemSlice.js';

const AddItem = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const isLoading = useSelector((state) => state.item.isLoading);
    const message = useSelector((state) => state.item.message);
    const errors = useSelector((state) => state.item.error);

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [previewImages, setPreviewImages] = useState([]);

    const resetForm = () => {
        setSelectedFiles([]);
        setItemName('');
        setItemPrice('');
        setError(null);
        setPreviewImages([]);
    };

    const handleFileChange = async (e) => {
        const files = e.target.files;

        if (files.length > 0) {
            const newFiles = Array.from(files);

            const newPreviewImages = await Promise.all(
                newFiles.map((file) => {
                    return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onloadend = () => {
                            resolve(reader.result);
                        };
                    });
                })
            );

            setPreviewImages((prevImages) => [...prevImages, ...newPreviewImages]);
            setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
        }
    };

    const handleNameChange = (e) => {
        setItemName(e.target.value);
    };

    const handlePriceChange = (e) => {
        setItemPrice(e.target.value);
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0 || !itemName || !itemPrice) {
            setError('Please fill in all fields.');
            return;
        }
    
        const formData = new FormData();
        selectedFiles.forEach((file, index) => {
            formData.append(`images`, file);
        });
        formData.append('itemName', itemName);
        formData.append('itemPrice', itemPrice);
    
        try {
            setLoading(true);
            await dispatch(addSingleItem({ formData, token }));
            resetForm(); // Call the resetForm function after successful submission
            // Provide feedback to the user on success, e.g., set a success message in state
            setError('Item uploaded successfully.');
        } catch (error) {
            console.error('Error uploading item:', error);
            setError('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 items-center h-screen justify-center">
            <label
                htmlFor="fileInput"
                className="bg-green-500 text-white py-2 px-4 rounded cursor-pointer"
            >
                Choose files
            </label>
            <input
                type="file"
                id="fileInput"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                multiple // Enable multiple file selection
                capture="camera"
            />
            <div className='grid grid-cols-2 gap-2'>
                {previewImages.map((preview, index) => (
                    <img key={index} src={preview} alt={`Preview ${index}`} className="rounded-lg w-40 h-40" />
                ))}
            </div>
            <input
                type="text"
                placeholder="Item Name"
                value={itemName}
                onChange={handleNameChange}
                className="border rounded p-2"
            />
            <input
                type="number"
                placeholder="Item Price"
                value={itemPrice}
                onChange={handlePriceChange}
                className="border rounded p-2"
            />
            <button onClick={handleUpload} disabled={loading} className="bg-green-300 rounded-xl py-4 px-2">
                Upload
            </button>
            {errors && <p>Error: {errors}</p>}
            {isLoading && <p>Loading ...</p>}
            {message && <p>Message: {message}</p>}
        </div>
    );
};

export default AddItem;
