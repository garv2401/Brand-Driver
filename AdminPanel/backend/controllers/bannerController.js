import Banner from '../models/Banner.js';
import Category from '../models/Category.js';
import CategoryParent from '../models/CategoryParent.js';

/**
 * Upload a new banner
 */
export const uploadBanner = async (req, res) => {
  try {
    const {
      heading,
      paragraph,
      pattern,
      link,
      startDate,
      expiryDate,
      state,
      categoryParentId,
      type,
    } = req.body;

    // Required fields check
    if (!startDate || !expiryDate || !categoryParentId || !type) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate categoryParentId
    const categoryParent = await CategoryParent.findById(categoryParentId);
    if (!categoryParent) {
      return res.status(404).json({ message: 'CategoryParent not found' });
    }

    // Extract file path from multer (expecting a single banner image upload)
    const bannerImageFile = req.files?.bannerImage?.[0]?.filename;
    if (!bannerImageFile) {
      return res.status(400).json({ message: 'Banner image is required' });
    }

    const bannerImageUrl = `${req.protocol}://${req.get('host')}/uploads/banners/${bannerImageFile}`;

    const banner = new Banner({
      heading,
      paragraph,
      pattern,
      bannerImage: bannerImageUrl,
      type,
      link: link || 'no',
      categoryParentId,
      startDate: new Date(startDate),
      expiryDate: new Date(expiryDate),
      state: state || 'in_use',
    });

    await banner.save();

    res.status(201).json({ message: 'Banner uploaded successfully', banner });
  } catch (error) {
    console.error('Error uploading banner:', error);
    res.status(500).json({ message: 'Server error during banner upload' });
  }
};
/**
 * Soft delete a banner
 */
export const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    banner.state = 'deleted';
    await banner.save();

    res.status(200).json({ message: 'Banner marked as deleted', banner });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get all banners, optionally filtered by state
 */
export const getBanners = async (req, res) => {
  try {
    const { state } = req.query;

    // Default: exclude deleted banners unless explicitly requested
    const filter = state ? { state } : { state: { $ne: 'deleted' } };

    const banners = await Banner.find(filter)
      .populate('categoryParentId', 'name status') // assuming CategoryParent has these fields
      .sort({ dateTime: -1 });

    res.status(200).json({ banners });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


/**
 * Get banners by category ID
 */
export const getBannersByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const banners = await Banner.find({ categoryId, state: { $ne: 'deleted' } })
      .populate('categoryId', 'name status')
      .sort({ dateTime: -1 });

    res.status(200).json({ banners });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get banners by category name
 */
export const getBannersByCategoryName = async (req, res) => {
  try {
    const { categoryName } = req.params;

    if (!categoryName) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const banners = await Banner.find({ categoryId: category._id, state: { $ne: 'deleted' } })
      .populate('categoryId', 'name status')
      .sort({ dateTime: -1 });

    res.status(200).json({ banners });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Update a banner by ID
 */
export const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      heading,
      paragraph,
      pattern,
      type,
      link,
      startDate,
      expiryDate,
      state,
    } = req.body;

    if (!startDate || !expiryDate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    // Update fields
    banner.heading = heading || banner.heading;
    banner.paragraph = paragraph || banner.paragraph;
    banner.pattern = pattern || banner.pattern;
    banner.type = type || banner.type;
    banner.link = link || 'no';
    banner.startDate = new Date(startDate);
    banner.expiryDate = new Date(expiryDate);
    banner.state = state || banner.state;

    // Handle optional new banner image upload
    if (req.files?.bannerImage?.[0]) {
      const bannerImageFile = req.files.bannerImage[0].filename;
      banner.bannerImage = `${req.protocol}://${req.get('host')}/uploads/banners/${bannerImageFile}`;
    }

    await banner.save();

    res.status(200).json({ message: 'Banner updated successfully', banner });
  } catch (error) {
    console.error('Error updating banner:', error);
    res.status(500).json({ message: 'Server error during banner update' });
  }
};


export const getBannerById=async(req,res)=>{
  try{
    const {id}=req.params;
    const banner=await Banner.findById(id);
    if(!banner){
      return res.status(404).json({message:"Banner not found"});
    }
    return res.status(200).json({banner});
  }catch(err){
    return res.status(500).json({message:"Internal Server Error"});
  }
}