import CategoryParent from '../models/CategoryParent.js';

export const createCategoryParent = async (req, res) => {
  try {
    const { name, slug, status } = req.body;

    if (!name || !slug) {
      return res.status(400).json({ message: 'Name and slug are required' });
    }

    const newParent = new CategoryParent({ name, slug, status });
    const saved = await newParent.save();

    res.status(201).json({ message: 'Category parent created', parent: saved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllCategoryParents = async (req, res) => {
  try {
    const parents = await CategoryParent.find().sort({ name: 1 });
    res.status(200).json({ parents });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCategoryParentById = async (req, res) => {
  try {
    const parent = await CategoryParent.findById(req.params.id);
    if (!parent) return res.status(404).json({ message: 'Not found' });
    res.status(200).json({ parent });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateCategoryParent = async (req, res) => {
  try {
    const { name, slug, status } = req.body;
    const parent = await CategoryParent.findById(req.params.id);
    if (!parent) return res.status(404).json({ message: 'Not found' });

    parent.name = name || parent.name;
    parent.slug = slug || parent.slug;
    parent.status = status || parent.status;

    await parent.save();
    res.status(200).json({ message: 'Updated successfully', parent });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteCategoryParent = async (req, res) => {
  try {
    await CategoryParent.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
