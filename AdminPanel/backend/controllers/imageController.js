import Image from "../models/Image.js";
import Category from "../models/Category.js";
import Event from "../models/Event.js";
import mongoose from 'mongoose';
import CategoryParent from "../models/CategoryParent.js";

// Get all images
export const getAllImages = async (req, res) => {
  try {
    const images = await Image.find()
      .populate("categoryId")
      .populate("uploadedBy");
    res.status(200).json({ images });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get image by ID
export const getImageById = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id)
      .populate("categoryId")
      .populate("uploadedBy");
    if (!image) return res.status(404).json({ message: "Image not found" });
    res.status(200).json({ image });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

//create image
export const createImage = async (req, res) => {
  try {
    const { title, categoryName, categoryParentId, eventDate } = req.body;
    console.log("Received:",req.body)

    if (!categoryName || !categoryParentId) {
      return res
        .status(400)
        .json({ message: "Category name and parent ID are required." });
    }

    // Find or create the category
    let category = await Category.findOne({
      name: categoryName,
      categoryParentId,
    });

    if (!category) {
      category = new Category({ name: categoryName,parentId: categoryParentId });
      await category.save();
    }

    let eventId = null;

    // If eventDate is present, handle event creation or retrieval
    if (eventDate) {
      const eventDateObj = new Date(eventDate);

      let event = await Event.findOne({
        eventDate: eventDateObj,
        categoryId: category._id,
        parentId: categoryParentId,
      });

      if (!event) {
        event = new Event({
          eventDate: eventDateObj,
          categoryId: category._id,
          parentId: categoryParentId,
        });
        await event.save();
      }

      eventId = event._id;
    }

    // Save image
    const newImage = new Image({
      title,
      categoryId: category._id,
      originalImage: `${req.protocol}://${req.get("host")}/uploads/images/${
        req.file.filename
      }`,
      uploadedBy: req.user?.id,
      eventDate: eventDate || null,
      eventId: eventId || null,
    });

    await newImage.save();

    res.status(201).json({
      message: "Image uploaded successfully",
      image: newImage,
    });
  } catch (err) {
    console.error("Error uploading image:", err);
    res.status(500).json({ message: "Failed to upload image" });
  }
};

// Update image
export const updateImage = async (req, res) => {
  try {
    const { userText, userName, isCustomized, eventDate } = req.body;

    const updates = {
      userText,
      userName,
      isCustomized: isCustomized === "true" || isCustomized === true,
      eventDate: eventDate || undefined, // optionally update eventDate
    };

    if (req.files?.editedImage) {
      updates.editedImage = req.files.editedImage[0].filename;
    }

    if (req.files?.userLogo) {
      updates.userLogo = req.files.userLogo[0].filename;
    }

    const updatedImage = await Image.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    if (!updatedImage) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.status(200).json({
      message: "Image updated successfully",
      image: updatedImage,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update image" });
  }
};

// Delete image
export const deleteImage = async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete image" });
  }
};

// Get images by categoryParentId
export const getImagesByCategoryParentId = async (req, res) => {
  try {
    const { categoryParentId } = req.params;
    //console.log("Category Parent ID:", categoryParentId);

    const categories = await Category.find({parentId:categoryParentId});
    if (!categories.length) {
      return res
        .status(200)
        .json({ });
    }

    
    // console.log(
    //   "Found categories:",
    //   categories.map((c) => ({ id: c._id, name: c.name }))
    // );

    const categoryIds = categories.map((cat) => cat._id);
    //console.log("Matching category IDs:", categoryIds);

    const images = await Image.find({ categoryId: { $in: categoryIds } });
    //console.log("Fetched images count:", images.length);

    res.status(200).json({ images });
  } catch (err) {
    console.error("Error fetching images by categoryParentId:", err);
    res.status(500).json({ message: "Server error while fetching images" });
  }
};

// New: Get images by eventDate (MM-DD)
export const getImagesByEventDate = async (req, res) => {
  try {
    const { date } = req.params; // e.g. '08-15'
    const images = await Image.find({ eventDate: date })
      .populate("categoryId")
      .populate("uploadedBy");

    if (!images.length) {
      return res
        .status(404)
        .json({ message: "No images found for this date." });
    }

    res.status(200).json({ images });
  } catch (err) {
    console.error("Error fetching images by event date:", err);
    res.status(500).json({ message: "Server error while fetching images" });
  }
};

// Get images by category name
export const getImagesByCategoryName = async (req, res) => {
  try {
    const { categoryName } = req.params;

    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const images = await Image.find({ categoryId: category._id })
      .populate("categoryId")
      .populate("uploadedBy");

    res.status(200).json({ images });
  } catch (err) {
    console.error("Error fetching images by category name:", err);
    res.status(500).json({ message: "Server error while fetching images" });
  }
};


// Get images by category parent name
export const getImagesByCategoryParentName = async (req, res) => {
  try {
    const { categoryParentName } = req.params;

    // Step 1: Find the CategoryParent document
    const parent = await CategoryParent.findOne({ name: categoryParentName });
    if (!parent) {
      return res.status(404).json({ message: "Category parent not found" });
    }

    // Step 2: Get all categories under that parent
    const categories = await Category.find({ parentId: parent._id });
    if (!categories.length) {
      return res.status(404).json({ message: "No categories under this parent" });
    }

    // Step 3: Find images in these categories
    const categoryIds = categories.map(cat => cat._id);
    const images = await Image.find({ categoryId: { $in: categoryIds } })
      .populate("categoryId")
      .populate("uploadedBy");

    res.status(200).json({ images });
  } catch (err) {
    console.error("Error fetching images by category parent name:", err);
    res.status(500).json({ message: "Server error" });
  }
};



// Get images by event ID
export const getImagesByEventId = async (req, res) => {
  try {
    const { eventId } = req.params;

    const images = await Image.find({ eventId })
      .populate("categoryId")
      .populate("uploadedBy");

    if (!images.length) {
      return res.status(404).json({ message: "No images found for this event." });
    }

    res.status(200).json({ images });
  } catch (err) {
    console.error("Error fetching images by event ID:", err);
    res.status(500).json({ message: "Server error while fetching images" });
  }
};


// Get all images that are associated with an event
export const getImagesWithEvents = async (req, res) => {
  try {
    //console.log("route hit");
    const images = await Image.find({ eventId: { $ne: null } });
    if (!images.length) {
      return res.status(404).json({ message: "No images associated with any events." });
    }
    //console.log("Images",images);
    res.status(200).json({ images });
  } catch (err) {
    console.error("Error fetching images with events:", err);
    res.status(500).json({ message: "Server error while fetching event images" });
  }
};
