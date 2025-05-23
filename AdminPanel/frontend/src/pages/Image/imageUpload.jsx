import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ImageUploadForm = () => {
  const { categoryParentName, categoryParentId } = useParams();
  //console.log("categoryParent:",categoryParentName,categoryParentId);
  const [title, setTitle] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile || !categoryName) {
      return setMessage('Please fill in all required fields.');
    }
 
    const formData = new FormData();
    formData.append('title', title);
    formData.append('categoryName', categoryName);
    formData.append('categoryParentId', categoryParentId);
    formData.append('originalImage', imageFile);
    if (categoryParentName === 'Event' && eventDate) {
      formData.append('eventDate', eventDate);
    }

    try {
      setUploading(true);
      setMessage('');

      await axios.post('http://localhost:5000/api/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      setMessage('Image uploaded successfully!');
      setTitle('');
      setCategoryName('');
      setImageFile(null);
      setEventDate('');
    } catch (err) {
      console.error(err);
      setMessage('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 bg-gradient-to-br from-white via-slate-50 to-slate-100 shadow-xl rounded-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Upload a New Image</h2>

      {message && (
        <p
          className={`text-center mb-6 font-medium text-sm ${
            message.includes('successfully') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-8 justify-between">
          {/* Title */}
          <div className="flex-1">
            <label className="block mb-1 text-gray-700 font-medium">
              Title <span className="text-sm text-gray-400">(optional)</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter image title..."
            />
          </div>

          {/* Category Name */}
          <div className="flex-1">
            <label className="block mb-1 text-gray-700 font-medium">Category Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="e.g., Diwali"
              required
            />
          </div>

          {/* Image File */}
          <div className="flex-1">
            <label className="block mb-1 text-gray-700 font-medium">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-3 py-2 border rounded-lg shadow-sm bg-white text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
              onChange={(e) => setImageFile(e.target.files[0])}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex-shrink-0">
            <button
              type="submit"
              disabled={uploading}
              className="mt-6 w-full md:w-auto bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-2 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </div>

        {/* Conditional Event Date Input */}
        {categoryParentName === 'Event' && (
          <div className="mt-6 md:mt-8">
            <label className="block mb-1 text-gray-700 font-medium">Event Date</label>
            <input
              type="date"
              className="w-full max-w-xs px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default ImageUploadForm;
