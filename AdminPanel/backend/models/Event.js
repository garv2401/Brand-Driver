// models/Event.js
import mongoose from 'mongoose';
const eventSchema = new mongoose.Schema({
  eventName:{type: String},
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'CategoryParent' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  dateTime: { type: Date, default: Date.now },
});

export default mongoose.models.Event || mongoose.model('Event', eventSchema);
