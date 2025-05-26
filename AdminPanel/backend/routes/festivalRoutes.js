import express from 'express';
const router=new express.Router();

import { getAllFestivals } from '../controllers/festivalController.js';

//Get all festivals
router.get('/',getAllFestivals);
export default router;