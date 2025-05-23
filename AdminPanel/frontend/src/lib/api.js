import axios from 'axios';

export const fetchBanners = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/banners');
      return res.data.banners;
    } catch (err) {
      console.error('Failed to fetch banners:', err);
    }
};

export const fetchBannersByCategoryName = async (categoryName) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/banners/category/${encodeURIComponent(categoryName)}`);
    return res.data.banners;
  } catch (err) {
    console.error(`Failed to fetch banners for category "${categoryName}":`, err);
  }
};

export default {fetchBanners,fetchBannersByCategoryName}



