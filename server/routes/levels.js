const router = require('express').Router();
const Level = require('../models/Level');

router.get('/', async (req, res) => {
  try {
    const levels = await Level.find().sort({ order: 1 });
    res.json(levels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const level = await Level.create(req.body);
    res.status(201).json(level);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
