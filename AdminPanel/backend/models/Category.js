// models/Category.js
import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'CategoryParent' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  dateTime: { type: Date, default: Date.now },
});

export default mongoose.models.Category || mongoose.model('Category', categorySchema);
