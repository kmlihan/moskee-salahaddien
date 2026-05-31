// models/PrayerOverride.js
// Optional manual overrides for Iqamah (call-to-prayer congregational start) times.
// If no override exists for a given date, the API falls back to the Aladhan calculation.

import mongoose from 'mongoose';

const prayerOverrideSchema = new mongoose.Schema({
  // Date this override applies to (YYYY-MM-DD). Null = applies as default ongoing schedule.
  date: { type: String, default: null, index: true },

  // Iqamah times in HH:mm. Leave blank to inherit the calculated adhan time.
  fajr:    { type: String, default: '' },
  dhuhr:   { type: String, default: '' },
  asr:     { type: String, default: '' },
  maghrib: { type: String, default: '' },
  isha:    { type: String, default: '' },

  // Jumu'ah (Friday) congregational time
  jumuah:  { type: String, default: '13:30' },

  note:    { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('PrayerOverride', prayerOverrideSchema);
