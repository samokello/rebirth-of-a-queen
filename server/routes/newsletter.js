const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');
const { authenticateAdmin } = require('../middleware/auth');
const { sendBulkEmail } = require('../services/mailer');

// POST /api/newsletter/subscribe
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ success: false, message: 'Valid email is required' });
    }
    let sub = await Subscriber.findOne({ email });
    if (!sub) sub = new Subscriber({ email, status: 'subscribed' });
    else sub.status = 'subscribed';
    await sub.save();
    return res.json({ success: true, message: 'Subscribed successfully' });
  } catch (e) {
    return res.status(500).json({ success: false, message: 'Subscription failed', error: e.message });
  }
});

// POST /api/newsletter/unsubscribe
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ success: false, message: 'Valid email is required' });
    }
    const sub = await Subscriber.findOne({ email });
    if (!sub) return res.status(404).json({ success: false, message: 'Subscriber not found' });
    sub.status = 'unsubscribed';
    await sub.save();
    return res.json({ success: true, message: 'Unsubscribed' });
  } catch (e) {
    return res.status(500).json({ success: false, message: 'Unsubscribe failed', error: e.message });
  }
});

// GET /api/newsletter - admin list
router.get('/', authenticateAdmin, async (_req, res) => {
  try {
    const list = await Subscriber.find().sort({ createdAt: -1 });
    res.json({ success: true, data: list });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Failed to fetch subscribers', error: e.message });
  }
});

// POST /api/newsletter/send (admin bulk)
router.post('/send', authenticateAdmin, async (req, res) => {
  try {
    const { subject, html } = req.body;
    if (!subject || !html) return res.status(400).json({ success: false, message: 'Subject and HTML are required' });
    const subs = await Subscriber.find({ status: 'subscribed' });
    const emails = subs.map(s => s.email);
    if (!emails.length) return res.json({ success: true, message: 'No subscribers to send' });
    await sendBulkEmail({ subject, html, to: emails });
    res.json({ success: true, message: `Sent to ${emails.length} subscribers` });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Failed to send emails', error: e.message });
  }
});

module.exports = router;


