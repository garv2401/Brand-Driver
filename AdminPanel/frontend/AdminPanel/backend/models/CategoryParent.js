// models/CategoryParent.js
import mongoose from "mongoose";
const categoryParentSchema = new mongoose.Schema({
  name: { type: String, required: true }, // festival, event, business
  slug: { type: String, required: true, unique: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
});

export default mongoose.models.CategoryParent || mongoose.model('CategoryParent', categoryParentSchema);
