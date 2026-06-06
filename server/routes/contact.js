const router = require('express').Router();
const Contact = require('../models/Contact');
const { sendContactNotification } = require('../emailService');

router.post('/', async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    
    // Send email notification (non-blocking)
    sendContactNotification(req.body);
    
    res.status(201).json({ message: 'Message sent successfully!', contact });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
