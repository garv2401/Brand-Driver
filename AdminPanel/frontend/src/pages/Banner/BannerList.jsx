import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../../../axios';

const BannerList = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchBanners = async () => {
    try {
      const res = await api.get('/api/banners');
      console.log(res.data.banners);
      setBanners(res.data.banners || []);
    } catch (err) {
      console.error('Error fetching banners:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners(); 
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this banner?')) return;

    try {
      await api.delete(`/api/banners/delete/${id}`);
      fetchBanners(); // Refresh after deletion
    } catch (err) {
      console.error('Error deleting banner:', err);
      alert('Failed to delete banner.');
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-600">Loading banners...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">All Banners</h1>

      {banners.length === 0 ? (
        <div className="text-center text-gray-500">No banners found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {banners.map((banner) => (
            <div
              key={banner._id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 flex flex-col"
            >
              <img
                src={`${banner.bannerImage}`}
                alt="Banner"
                className="w-full h-48 object-cover"
              />

              <div className="p-5 space-y-2 flex-1">
                <h2 className="text-xl font-semibold text-gray-800">{banner.heading}</h2>
                <p className="text-gray-600 text-sm">{banner.paragraph}</p>
                {banner.pattern && (
                  <p className="text-xs text-gray-400 italic">Pattern: {banner.pattern}</p>
                )}

                <div className="text-sm text-gray-500 space-y-1">
                  {banner.type && <p><strong>Type:</strong> {banner.type}</p>}
                  {banner.categoryParentId?.name && (
                    <p><strong>Category:</strong> {banner.categoryParentId.name}</p>
                  )}
                  {banner.startDate && (
                    <p>
                      <strong>Start:</strong>{' '}
                      {new Date(banner.startDate).toLocaleDateString()}
                    </p>
                  )}
                  {banner.expiryDate && (
                    <p>
                      <strong>Expires:</strong>{' '}
                      {new Date(banner.expiryDate).toLocaleDateString()}
                    </p>
                  )}
                  <p><strong>Link Enabled:</strong> {banner.link === 'yes' ? 'Yes' : 'No'}</p>
                  <p><strong>Status:</strong> {banner.state}</p>
                </div>
              </div>

              <div className="flex justify-between items-center px-5 py-3 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={() => navigate(`/edit-banner/${banner._id}`)}
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Edit
                </button>

                {
                  banner.link && banner.link==='yes' &&(
                  <a href={banner.bannerImage} className="text-sm text-gray-500 hover:text-gray-700 font-medium">Link</a>
                  )
                }


                <button
                  onClick={() => handleDelete(banner._id)}
                  className="text-sm text-red-500 hover:text-red-700 font-medium"
                >
                  Delete
                </button>

                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerList;
