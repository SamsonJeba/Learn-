const router = require('express').Router();
const Testimonial = require('../models/Testimonial');

router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json(testimonial);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
