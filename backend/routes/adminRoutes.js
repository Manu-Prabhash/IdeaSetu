const express = require('express');
const Problem = require('../models/Problem');
const Pitch = require('../models/Pitch');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);
router.use(authorize('admin'));

router.post('/problems', async (req, res) => {
    try {
        const { title, description, department } = req.body;
        const problem = await Problem.create({
            title,
            description,
            department,
            adminId: req.user.id
        });
        res.status(201).json(problem);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/problems', async (req, res) => {
    try {
        const problems = await Problem.find().sort({ createdAt: -1 });
        res.json(problems);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/problems/:id', async (req, res) => {
    try {
        const problem = await Problem.findByIdAndDelete(req.params.id);

        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }

        res.json({ message: 'Problem deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/pitches', async (req, res) => {
    try {
        const pitches = await Pitch.find().sort({ createdAt: -1, _id: -1 }).populate('entrepreneurId', 'name email');
        res.json(pitches);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.patch('/pitches/:id', async (req, res) => {
    try {
        const { status, adminFeedback } = req.body;

        if (!['pending', 'approved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid pitch status' });
        }

        const pitch = await Pitch.findByIdAndUpdate(
            req.params.id,
            { status, adminFeedback: adminFeedback || '' },
            { new: true }
        );

        if (!pitch) {
            return res.status(404).json({ message: 'Pitch not found' });
        }

        res.json(pitch);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
