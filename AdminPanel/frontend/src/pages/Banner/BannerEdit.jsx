import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BannerEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    heading: '',
    paragraph: '',
    pattern: '',
    link: 'no',
    type: 'section',
    state: 'active',
    categoryParentId: '',
    startDate: '',
    expiryDate: '',
  });

  const [categoryParents, setCategoryParents] = useState([]);
  const [bannerImage, setBannerImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryParents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/category-parents');
        setCategoryParents(res.data.parents);
      } catch (err) {
        console.error('Failed to fetch category parents:', err);
      }
    };
    fetchCategoryParents();
  }, []);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/banners/${id}`);
        const data = res.data.banner;

        setFormData({
          heading: data.heading || '',
          paragraph: data.paragraph || '',
          pattern: data.pattern || '',
          link: data.link || 'no',
          type: data.type || 'section',
          state: data.state || 'active',
          categoryParentId: data.categoryParentId?._id || '',
          startDate: data.startDate?.slice(0, 10) || '',
          expiryDate: data.expiryDate?.slice(0, 10) || '',
        });
      } catch (err) {
        console.error('Failed to load banner:', err);
        alert('Failed to load banner data.');
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    for (let key in formData) {
      payload.append(key, formData[key]);
    }

    if (bannerImage) payload.append('bannerImage', bannerImage);

    try {
      await axios.put(`http://localhost:5000/api/banners/update/${id}`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Banner updated successfully.');
      navigate('/show-banners');
    } catch (err) {
      console.error(err);
      alert('Failed to update banner.');
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-600">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg border border-slate-200">
        <h2 className="text-3xl font-bold text-indigo-700 text-center mb-8">Edit Banner</h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Text Inputs */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Heading</label>
            <input
              name="heading"
              value={formData.heading}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Paragraph</label>
            <textarea
              name="paragraph"
              value={formData.paragraph}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Pattern</label>
            <input
              name="pattern"
              value={formData.pattern}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Expiry Date</label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          {/* Dropdowns */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Link</label>
              <select
                name="link"
                value={formData.link}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="section">Section</option>
                <option value="footer">Footer</option>
                <option value="landing">Landing</option>
              </select>
            </div>
          </div>

          {/* Category Parent */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Category Parent</label>
            <select
              name="categoryParentId"
              value={formData.categoryParentId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Category Parent</option>
              {categoryParents.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="deleted">Deleted</option>
            </select>
          </div>

          {/* Banner Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Update Banner Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setBannerImage(e.target.files[0])}
              className="w-full"
            />
          </div>

          {/* Submit */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-md font-semibold"
            >
              Update Banner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BannerEdit;
