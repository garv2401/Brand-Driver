import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../../axios';

const BannerUploadForm = () => {
  const [heading, setHeading] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [pattern, setPattern] = useState('');
  const [bannerImage, setBannerImage] = useState(null);
  const [link, setLink] = useState('no');
  const [startDate, setStartDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [type, setType] = useState('');
  const [categoryParentId, setCategoryParentId] = useState('');
  const [categoryParents, setCategoryParents] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCategoryParents = async () => {
      try {
        const res = await api.get('/api/category-parents');
        setCategoryParents(res.data.parents);
      } catch (err) {
        console.error('Failed to fetch category parents', err);
      }
    };
    fetchCategoryParents();
  }, []);

  const handleUpload = async () => {
    if (
      !heading || !paragraph || !bannerImage || !startDate ||
      !expiryDate || !categoryParentId || !type
    ) {
      setMessage('Please fill in all required fields.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('heading', heading);
      formData.append('paragraph', paragraph);
      formData.append('pattern', pattern);
      formData.append('bannerImage', bannerImage);
      formData.append('link', link);
      formData.append('startDate', startDate);
      formData.append('expiryDate', expiryDate);
      formData.append('categoryParentId', categoryParentId);
      formData.append('state', 'in_use');
      formData.append('type', type);

      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };

      await api.post('/api/banners/upload', formData, config);
      setMessage('Banner uploaded successfully!');

      // Reset form
      setHeading('');
      setParagraph('');
      setPattern('');
      setBannerImage(null);
      setLink('no');
      setStartDate('');
      setExpiryDate('');
      setCategoryParentId('');
      setType('');
    } catch (error) {
      console.error(error);
      setMessage('Upload failed. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Upload Banner</h2>

      {message && (
        <div
          className={`mb-4 p-3 rounded-lg text-sm font-medium ${
            message.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <InputField label="Heading *" value={heading} onChange={setHeading} />
        <InputField label="Paragraph *" value={paragraph} onChange={setParagraph} />
        <InputField label="Pattern" value={pattern} onChange={setPattern} />

        <FileInput label="Banner Image *" onChange={setBannerImage} />

        <SelectField
          label="Link Enabled"
          value={link}
          onChange={setLink}
          options={[
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ]}
        />

        <SelectField
          label="Banner Type *"
          value={type}
          onChange={setType}
          options={[
            { value: '', label: 'Select type' },
            { value: 'section', label: 'Section' },
            { value: 'landing', label: 'Landing' },
            { value: 'footer', label: 'Footer' },
          ]}
        />

        <SelectField
          label="Category Parent *"
          value={categoryParentId}
          onChange={setCategoryParentId}
          options={[
            { value: '', label: 'Select a category parent' },
            ...categoryParents.map((cat) => ({
              value: cat._id,
              label: cat.name,
            })),
          ]}
        />

        <InputField type="date" label="Start Date *" value={startDate} onChange={setStartDate} />
        <InputField type="date" label="Expiry Date *" value={expiryDate} onChange={setExpiryDate} />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleUpload}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
        >
          Upload Banner
        </button>
      </div>
    </div>
  );
};

// Reusable text/date input
const InputField = ({ label, value, onChange, type = 'text' }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

// Reusable file input
const FileInput = ({ label, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type="file"
      onChange={(e) => onChange(e.target.files[0])}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
    />
  </div>
);

// Reusable select input
const SelectField = ({ label, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default BannerUploadForm;
