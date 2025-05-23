import CategoryDetails from '../models/CategoryDetails.js';

export const createCategoryDetail = async (req, res) => {
  try {
    const { categoryId, type, status } = req.body;
    if (!categoryId || !type) {
      return res.status(400).json({ message: 'categoryId and type are required' });
    }

    const detail = new CategoryDetails({ categoryId, type, status });
    const saved = await detail.save();

    res.status(201).json({ message: 'Category detail created', detail: saved });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCategoryDetails = async (req, res) => {
  try {
    const details = await CategoryDetails.find()
      .populate('categoryId', 'name')
      .sort({ dateTime: -1 });

    res.status(200).json({ details });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCategoryDetailById = async (req, res) => {
  try {
    const detail = await CategoryDetails.findById(req.params.id).populate('categoryId', 'name');
    if (!detail) return res.status(404).json({ message: 'Not found' });
    res.status(200).json({ detail });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateCategoryDetail = async (req, res) => {
  try {
    const { categoryId, type, status } = req.body;
    const detail = await CategoryDetails.findById(req.params.id);
    if (!detail) return res.status(404).json({ message: 'Not found' });

    detail.categoryId = categoryId || detail.categoryId;
    detail.type = type || detail.type;
    detail.status = status || detail.status;

    await detail.save();
    res.status(200).json({ message: 'Updated successfully', detail });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteCategoryDetail = async (req, res) => {
  try {
    await CategoryDetails.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
