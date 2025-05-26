import express from 'express';
import {
  uploadBanner,
  deleteBanner,
  getBanners,
  updateBanner,
  getBannerById
} from '../controllers/bannerController.js';
import { upload } from '../middlewares/upload.js';

const router = express.Router();
router.post( 
  '/upload',
  upload.fields([
    { name: 'bannerImage', maxCount: 1 },
    { name: 'sectionImage', maxCount: 1 },
  ]),
  uploadBanner
);
router.delete('/delete/:id', deleteBanner);
router.put(
  '/update/:id',
  upload.fields([
    { name: 'bannerImage', maxCount: 1 },
    { name: 'sectionImage', maxCount: 1 },
  ]),
  updateBanner
);
router.get('/', getBanners);
router.get('/:id',getBannerById);



export default router; 
