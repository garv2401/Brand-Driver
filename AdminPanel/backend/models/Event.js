// models/Event.js
import mongoose from 'mongoose';
const eventSchema = new mongoose.Schema({
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'CategoryParent' },
  eventDate: Date,
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  dateTime: { type: Date, default: Date.now },
});

export default mongoose.models.Event || mongoose.model('Event', eventSchema);
