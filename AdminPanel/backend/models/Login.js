// models/Login.js
import mongoose from 'mongoose';

const loginSchema = new mongoose.Schema({
  name:String,
  email: String,
  password: String,
  role: { type: String, enum: ['admin', 'editor'], default: 'admin' },
});

export default mongoose.models.Login || mongoose.model('Login', loginSchema);
