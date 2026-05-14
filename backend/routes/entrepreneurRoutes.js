const express = require('express');
const Problem = require('../models/Problem');
const Pitch = require('../models/Pitch');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);
router.use(authorize('entrepreneur'));

router.get('/problems', async (req, res) => {
    try {
        const problems = await Problem.find().sort({ createdAt: -1 });
        res.json(problems);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/pitches', async (req, res) => {
    try {
        const { title, description, tags = [] } = req.body;
        const normalizedTags = Array.isArray(tags)
            ? tags
            : String(tags).split(',');

        const pitch = await Pitch.create({
            title,
            description,
            tags: normalizedTags
                .map((tag) => String(tag).trim().toLowerCase())
                .filter(Boolean),
            entrepreneurId: req.user.id
        });
        res.status(201).json(pitch);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/pitches', async (req, res) => {
    try {
        const pitches = await Pitch.find({ entrepreneurId: req.user.id }).sort({ _id: -1 });
        res.json(pitches);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
