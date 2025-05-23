import express from "express";
import {
  createImage,
  updateImage,
  deleteImage,
  getImageById,
  getAllImages,
  getImagesByCategoryParentId,
  getImagesByEventDate,
} from "../controllers/imageController.js";
import auth from "../middlewares/auth.js";
import { upload } from "../middlewares/imageUpload.js"; // Handles multer config for image uploads

const router = express.Router();

// GET all images
router.get("/", getAllImages);

router.get("/category/:categoryParentId", getImagesByCategoryParentId);

// GET single image by ID
router.get("/:id", getImageById);

// POST new image (original)
router.post("/", auth, upload.single("originalImage"), createImage);

// PUT update (e.g., edited image, user text/logo)
router.put(
  "/:id",
  auth,
  upload.fields([
    { name: "editedImage", maxCount: 1 },
    { name: "userLogo", maxCount: 1 },
  ]),
  updateImage
);

// DELETE image
router.delete("/:id", auth, deleteImage);
router.get("/by-event-date/:date", getImagesByEventDate);


export default router;
