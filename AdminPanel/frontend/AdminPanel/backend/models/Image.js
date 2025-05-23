// models/Image.js
import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  title: { type: String, trim: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  originalImage: { type: String, required: true },
  editedImage: { type: String, default: null },
  userText: { type: String, trim: true, default: "" },
  userName: { type: String, trim: true, default: "" },
  userLogo: { type: String, default: null },
  isCustomized: { type: Boolean, default: false },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Login', required: false },

  // Optional event info
  eventDate: { type: String, default: null }, // Format: MM-DD
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', default: null },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Image', imageSchema);
