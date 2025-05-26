// models/Festival.js
import mongoose from 'mongoose';

const festivalSchema = new mongoose.Schema({
  festivalName: { type: String, required: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'CategoryParent', required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  description: { type: String }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

export default mongoose.models.Festival || mongoose.model('Festival', festivalSchema);
