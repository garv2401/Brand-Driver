import Category from '../models/Category.js';
import CategoryDetails from '../models/CategoryDetails.js';

export const createCategory = async (req, res) => {
  try {
    const { name, parentId, status } = req.body;

    if (!name || !parentId) {
      return res.status(400).json({ message: 'Name and parentId are required' });
    }

    const category = new Category({
      name,
      parentId,
      status: status || 'active',
    });

    const savedCategory = await category.save();

    // Optional: Create default CategoryDetails (e.g., for banners)
    const categoryDetail = new CategoryDetails({
      categoryId: savedCategory._id,
      type: 'banner',
    });

    await categoryDetail.save();

    res.status(201).json({ message: 'Category created successfully', category: savedCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .populate('parentId', 'name slug')
      .sort({ dateTime: -1 });

    res.status(200).json({ categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id).populate('parentId', 'name slug');

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, parentId, status } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.name = name || category.name;
    category.parentId = parentId || category.parentId;
    category.status = status || category.status;

    await category.save();

    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Optional: Soft delete (update status instead of removing)
    category.status = 'inactive';
    await category.save();

    // Optional: Inactivate related CategoryDetails
    await CategoryDetails.updateMany(
      { categoryId: id },
      { $set: { status: 'inactive' } }
    );

    res.status(200).json({ message: 'Category deleted (soft) successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
