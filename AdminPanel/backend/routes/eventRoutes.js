import express from 'express';
const router=express.Router();

import { getAllEvents } from '../controllers/eventController.js';

router.get('/',getAllEvents);

export default router;
