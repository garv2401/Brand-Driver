// models/CategoryDetails.js
import mongoose from "mongoose"; 
const categoryDetailsSchema = new mongoose.Schema({
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  type: { type: String, enum: ['banner', 'section'], required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  dateTime: { type: Date, default: Date.now },
});

export default mongoose.models.CategoryDetails || mongoose.model('CategoryDetails', categoryDetailsSchema);
