// models/Announcement.js
// Multilingual announcements — community news, Ramadan info, special events.

import mongoose from 'mongoose';

const localizedString = {
  en: { type: String, default: '' },
  nl: { type: String, default: '' },
  fr: { type: String, default: '' },
  ar: { type: String, default: '' },
};

const announcementSchema = new mongoose.Schema({
  title:   localizedString,
  body:    localizedString,

  category: {
    type: String,
    enum: ['general', 'ramadan', 'eid', 'classes', 'renovation', 'urgent'],
    default: 'general',
  },

  startsAt: { type: Date, default: Date.now },
  endsAt:   { type: Date, default: null }, // null = always visible until manually unpublished

  published: { type: Boolean, default: true },
  pinned:    { type: Boolean, default: false },
}, { timestamps: true });

announcementSchema.index({ published: 1, startsAt: -1 });

export default mongoose.model('Announcement', announcementSchema);
