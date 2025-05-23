import express from 'express';
import {
  createCategoryParent,
  getAllCategoryParents,
  getCategoryParentById,
  updateCategoryParent,
  deleteCategoryParent,
} from '../controllers/categoryParentController.js';

const router = express.Router();

router.post('/', createCategoryParent);
router.get('/', getAllCategoryParents);
router.get('/:id', getCategoryParentById);
router.put('/:id', updateCategoryParent);
router.delete('/:id', deleteCategoryParent);

export default router;
