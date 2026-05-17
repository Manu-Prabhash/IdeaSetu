const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const Collaboration = require('../models/Collaboration');
const CollaborationMessage = require('../models/CollaborationMessage');
const Pitch = require('../models/Pitch');
const { authenticate, authenticateToken } = require('../middleware/auth');

const router = express.Router();
const uploadDir = path.join(__dirname, '..', 'uploads', 'collaboration-files');
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const sseClients = new Map();

router.use((req, res, next) => {
    if (req.path === '/stream') return next();
    authenticate(req, res, next);
});

router.get('/', async (req, res) => {
    try {
        const filter = req.user.role === 'admin'
            ? { adminId: req.user.id }
            : { entrepreneurId: req.user.id };

        const collaborations = await Collaboration.find(filter)
            .populate('pitchId', 'title description status')
            .populate('entrepreneurId', 'name email')
            .populate('adminId', 'name email')
            .sort({ updatedAt: -1 });

        res.json(collaborations);
    } catch (error) {
        console.error('List collaborations error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/request', async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Only government admins can request collaboration' });
        }

        const { pitchId } = req.body;
        const pitch = await Pitch.findById(pitchId);

        if (!pitch) {
            return res.status(404).json({ message: 'Pitch not found' });
        }

        if (pitch.status !== 'approved') {
            return res.status(400).json({ message: 'Pitch must be approved before collaboration can be requested' });
        }

        let collaboration = await Collaboration.findOne({ pitchId: pitch._id });
        const wasCreated = !collaboration;

        if (wasCreated) {
            collaboration = await Collaboration.create({
                pitchId: pitch._id,
                entrepreneurId: pitch.entrepreneurId,
                adminId: req.user.id
            });
        }

        const populated = await populateCollaboration(collaboration._id);
        broadcastToUsers([String(populated.entrepreneurId._id), String(populated.adminId._id)], 'collaboration:update', populated);
        res.status(wasCreated ? 201 : 200).json(populated);
    } catch (error) {
        console.error('Request collaboration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.patch('/:id/accept', async (req, res) => {
    try {
        const collaboration = await Collaboration.findById(req.params.id);

        if (!collaboration) {
            return res.status(404).json({ message: 'Collaboration not found' });
        }

        if (req.user.role !== 'entrepreneur' || String(collaboration.entrepreneurId) !== req.user.id) {
            return res.status(403).json({ message: 'Only the invited entrepreneur can accept this collaboration' });
        }

        collaboration.status = 'accepted';
        collaboration.acceptedAt = collaboration.acceptedAt || new Date();
        await collaboration.save();

        const populated = await populateCollaboration(collaboration._id);
        broadcastToUsers([String(populated.entrepreneurId._id), String(populated.adminId._id)], 'collaboration:update', populated);
        res.json(populated);
    } catch (error) {
        console.error('Accept collaboration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/:id/messages', async (req, res) => {
    try {
        const collaboration = await getParticipantCollaboration(req.params.id, req.user);

        if (!collaboration) {
            return res.status(404).json({ message: 'Collaboration not found' });
        }

        const messages = await CollaborationMessage.find({ collaborationId: collaboration._id }).sort({ createdAt: 1 });
        res.json(messages);
    } catch (error) {
        console.error('List collaboration messages error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/:id/messages', async (req, res) => {
    try {
        const collaboration = await getParticipantCollaboration(req.params.id, req.user);

        if (!collaboration) {
            return res.status(404).json({ message: 'Collaboration not found' });
        }

        if (collaboration.status !== 'accepted') {
            return res.status(400).json({ message: 'Collaboration must be accepted before chatting' });
        }

        const text = String(req.body.text || '').trim().slice(0, 2000);
        const file = req.body.file ? await saveUploadedFile(req.body.file) : undefined;

        if (!text && !file) {
            return res.status(400).json({ message: 'Message text or file is required' });
        }

        const message = await CollaborationMessage.create({
            collaborationId: collaboration._id,
            senderId: req.user.id,
            senderRole: req.user.role,
            text,
            file
        });

        await Collaboration.findByIdAndUpdate(collaboration._id, { updatedAt: new Date() });

        broadcastToUsers([String(collaboration.entrepreneurId), String(collaboration.adminId)], 'collaboration:message', message);
        res.status(201).json(message);
    } catch (error) {
        console.error('Create collaboration message error:', error);
        res.status(error.status || 500).json({ message: error.message || 'Server error' });
    }
});

router.get('/stream', (req, res) => {
    const token = req.query.token;
    const user = token ? authenticateToken(token) : null;

    if (!user) {
        return res.status(401).end();
    }

    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive'
    });
    res.write('event: connected\ndata: {}\n\n');

    const userId = String(user.id);
    const clients = sseClients.get(userId) || new Set();
    clients.add(res);
    sseClients.set(userId, clients);

    req.on('close', () => {
        clients.delete(res);
        if (clients.size === 0) {
            sseClients.delete(userId);
        }
    });
});

async function populateCollaboration(id) {
    return Collaboration.findById(id)
        .populate('pitchId', 'title description status')
        .populate('entrepreneurId', 'name email')
        .populate('adminId', 'name email');
}

async function getParticipantCollaboration(id, user) {
    const collaboration = await Collaboration.findById(id);

    if (!collaboration) return null;

    const userId = String(user.id);
    const isParticipant = String(collaboration.adminId) === userId || String(collaboration.entrepreneurId) === userId;
    return isParticipant ? collaboration : null;
}

async function saveUploadedFile(file) {
    const data = String(file.data || '');
    const base64 = data.includes(',') ? data.split(',').pop() : data;
    const buffer = Buffer.from(base64, 'base64');

    if (buffer.length > MAX_FILE_BYTES) {
        const error = new Error('Files must be 5 MB or smaller');
        error.status = 413;
        throw error;
    }

    await fs.mkdir(uploadDir, { recursive: true });

    const originalName = path.basename(String(file.name || 'attachment')).replace(/[^\w.\- ]/g, '_').slice(0, 120);
    const storedName = `${Date.now()}-${Math.random().toString(16).slice(2)}-${originalName}`;
    const fullPath = path.join(uploadDir, storedName);
    await fs.writeFile(fullPath, buffer);

    return {
        originalName,
        mimeType: String(file.type || 'application/octet-stream'),
        size: buffer.length,
        url: `/uploads/collaboration-files/${storedName}`
    };
}

function broadcastToUsers(userIds, event, payload) {
    userIds.forEach((userId) => {
        const clients = sseClients.get(String(userId));
        if (!clients) return;

        clients.forEach((client) => {
            client.write(`event: ${event}\n`);
            client.write(`data: ${JSON.stringify(payload)}\n\n`);
        });
    });
}

module.exports = router;
