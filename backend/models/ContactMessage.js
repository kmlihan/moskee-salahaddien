// models/ContactMessage.js
// Messages submitted via the contact form.

import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema({
  name:    { type: String, required: true, trim: true, maxlength: 120 },
  email:   { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
  phone:   { type: String, default: '', trim: true, maxlength: 40 },
  subject: { type: String, default: '', trim: true, maxlength: 200 },
  message: { type: String, required: true, trim: true, maxlength: 4000 },
  language: { type: String, enum: ['en', 'nl', 'fr', 'ar'], default: 'en' },
  ip:       { type: String, default: '' },
  handled:  { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('ContactMessage', contactMessageSchema);
