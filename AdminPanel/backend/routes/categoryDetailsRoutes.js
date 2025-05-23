import express from 'express';
import {
  createCategoryDetail,
  getCategoryDetails,
  getCategoryDetailById,
  updateCategoryDetail,
  deleteCategoryDetail,
} from '../controllers/categoryDetailsController.js';

const router = express.Router();

router.post('/', createCategoryDetail);
router.get('/', getCategoryDetails);
router.get('/:id', getCategoryDetailById);
router.put('/:id', updateCategoryDetail);
router.delete('/:id', deleteCategoryDetail);

export default router;
