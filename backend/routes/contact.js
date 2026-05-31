// routes/contact.js
import express from 'express';
import rateLimit from 'express-rate-limit';
import ContactMessage from '../models/ContactMessage.js';

const router = express.Router();

// Strict rate limit on contact form to prevent abuse
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { error: 'Too many messages from this IP, please try again later.' },
});

function validEmail(s) {
  return typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

router.post('/', contactLimiter, async (req, res, next) => {
  try {
    const { name, email, phone, subject, message, language, honeypot } = req.body;

    // Honeypot — if filled, silently drop (bots)
    if (honeypot) return res.json({ ok: true });

    if (!name || typeof name !== 'string' || name.length > 120) {
      return res.status(400).json({ error: 'Invalid name' });
    }
    if (!validEmail(email)) {
      return res.status(400).json({ error: 'Invalid email' });
    }
    if (!message || typeof message !== 'string' || message.length > 4000) {
      return res.status(400).json({ error: 'Invalid message' });
    }

    const doc = await ContactMessage.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: (phone || '').trim(),
      subject: (subject || '').trim(),
      message: message.trim(),
      language: ['en', 'nl', 'fr', 'ar'].includes(language) ? language : 'en',
      ip: req.ip,
    });

    res.status(201).json({ ok: true, id: doc._id });
  } catch (err) {
    next(err);
  }
});

export default router;
