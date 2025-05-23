import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
  heading: String,
  paragraph: String,
  pattern: String,
  bannerImage: String,
  type:String,
  link: { type: String, enum: ['yes', 'no'], default: 'no' },
  categoryParentId: { type: mongoose.Schema.Types.ObjectId, ref: 'CategoryParent' },
  startDate: Date,
  expiryDate: Date,
  state: { type: String, enum: ['in_use', 'expired', 'deleted'], default: 'in_use' },
  dateTime: { type: Date, default: Date.now },
});

export default mongoose.models.Banner || mongoose.model('Banner', bannerSchema);
