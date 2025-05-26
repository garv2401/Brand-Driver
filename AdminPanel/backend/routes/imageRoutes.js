import express from "express";
import {
  createImage,
  updateImage,
  deleteImage,
  getImageById,
  getAllImages,
  getImagesByCategoryParentId,
  getImagesByEventDate,
  getImagesByCategoryName,
  getImagesByEventId, 
  getImagesByCategoryParentName,
  getImagesWithEvents
} from "../controllers/imageController.js";
import auth from "../middlewares/auth.js";
import { upload } from "../middlewares/imageUpload.js"; // Handles multer config for image uploads

const router = express.Router();

// GET images with events
router.get("/with-events", getImagesWithEvents);

// GET by category parent name
router.get("/by-category-parent-name/:categoryParentName", getImagesByCategoryParentName);

// GET by category name
router.get("/by-category-name/:categoryName", getImagesByCategoryName);

// GET by event date
router.get("/by-event-date/:date", getImagesByEventDate);

// GET by event ID
router.get("/by-event-id/:eventId", getImagesByEventId);

// GET images by category parent ID
router.get("/category/:categoryParentId", getImagesByCategoryParentId);

// GET all images (general)
router.get("/", getAllImages);

//GET single image by ID (MUST BE LAST to avoid conflict)
router.get("/:id", getImageById);

//POST new image (upload)
router.post("/", auth, upload.single("originalImage"), createImage);

//PUT update edited image
router.put(
  "/:id",
  auth,
  upload.fields([
    { name: "editedImage", maxCount: 1 },
    { name: "userLogo", maxCount: 1 },
  ]),
  updateImage
);

//DELETE image
router.delete("/:id", auth, deleteImage);

export default router;
