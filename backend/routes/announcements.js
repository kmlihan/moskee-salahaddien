// routes/announcements.js
import express from 'express';
import Announcement from '../models/Announcement.js';

const router = express.Router();

// GET /api/announcements?lang=en
// Returns published announcements active right now, pinned first, then newest.
router.get('/', async (req, res, next) => {
  try {
    const now = new Date();
    const docs = await Announcement.find({
      published: true,
      startsAt: { $lte: now },
      $or: [{ endsAt: null }, { endsAt: { $gte: now } }],
    })
      .sort({ pinned: -1, startsAt: -1 })
      .limit(20)
      .lean();

    res.json(docs);
  } catch (err) {
    next(err);
  }
});

// Admin endpoints — gate behind ADMIN_TOKEN env var for now.
// In production, swap for proper auth (JWT, session, etc.)
function adminAuth(req, res, next) {
  const token = req.headers['x-admin-token'];
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

router.post('/', adminAuth, async (req, res, next) => {
  try {
    const doc = await Announcement.create(req.body);
    res.status(201).json(doc);
  } catch (err) { next(err); }
});

router.patch('/:id', adminAuth, async (req, res, next) => {
  try {
    const doc = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc);
  } catch (err) { next(err); }
});

router.delete('/:id', adminAuth, async (req, res, next) => {
  try {
    const doc = await Announcement.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (err) { next(err); }
});

export default router;
