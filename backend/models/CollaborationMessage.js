const mongoose = require('mongoose');

const collaborationMessageSchema = new mongoose.Schema({
    collaborationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collaboration',
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    senderRole: {
        type: String,
        enum: ['admin', 'entrepreneur'],
        required: true
    },
    text: {
        type: String,
        default: ''
    },
    file: {
        originalName: String,
        mimeType: String,
        size: Number,
        url: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('CollaborationMessage', collaborationMessageSchema);
