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

    const handleFileChange = (e) => {
        const files = e.target.files;

        if (files.length > 0) {
            const newFiles = Array.from(files);

            setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);

            const newPreviewImages = newFiles.map((file) => {
                console.log(`File size: ${file.size} bytes`); // Log the file size
                return URL.createObjectURL(file); // Use URL.createObjectURL instead of FileReader
            });

            setPreviewImages((prevImages) => [...prevImages, ...newPreviewImages]);
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
        // selectedFiles.forEach((file, index) => {
        //     formData.append(`images`, file);
        // });

        try {
            setLoading(true);

            // Use canvas.toBlob for each image before appending to formData
            for (let i = 0; i < selectedFiles.length; i++) {
                const blob = await new Promise((resolve) => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const img = new Image();
                    img.src = previewImages[i];
                    img.onload = () => {
                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx.drawImage(img, 0, 0, img.width, img.height);
                        canvas.toBlob(resolve, 'image/jpeg', 0.9);
                    };
                });

                formData.append('images', blob);
            }

            formData.append('itemName', itemName);
            formData.append('itemPrice', itemPrice);

            await dispatch(addSingleItem({ formData, token }));
            resetForm();
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
