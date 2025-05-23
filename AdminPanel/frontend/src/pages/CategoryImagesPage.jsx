import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ImageUploadForm from "./Image/imageUpload";

const CategoryImagesPage = () => {
  const { categoryParentName, categoryParentId } = useParams(); // categoryname (display), id (used to fetch)
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/images/category/${categoryParentId}`);
        console.log("Received images:",res.data.images);
        setImages(res.data.images || []);
      } catch (err) {
        console.error("Failed to fetch images:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [categoryParentId]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-10 text-gray-800 text-center capitalize">
        {categoryParentName} Images
      </h1>

      {/*Image Upload Form */}
      <div className="mb-14">
        <ImageUploadForm />
      </div>

      {/* Display Images */}
      <div className="bg-gradient-to-br from-white via-slate-50 to-slate-100 p-6 rounded-xl border border-gray-200 shadow-xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Images in this Category</h2>

        {loading ? (
          <p className="text-gray-500">Loading images...</p>
        ) : images.length === 0 ? (
          <p className="text-gray-500">No images uploaded yet for this category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {images.map((img) => (
              <div
                key={img._id}
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <img
                  src={img.originalImage}
                  alt={img.title || "Uploaded Image"}
                  className="w-full h-52 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-gray-700 font-medium text-sm">
                    {img.title || "Untitled"}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryImagesPage;
