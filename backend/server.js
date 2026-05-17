const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const entrepreneurRoutes = require('./routes/entrepreneurRoutes');
const collaborationRoutes = require('./routes/collaborationRoutes');
const newsRoutes = require('./routes/newsRoutes');

const app = express();

app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use(cors());
app.use(express.json({ limit: '8mb' }));

app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/entrepreneur', entrepreneurRoutes);
app.use('/api/collaborations', collaborationRoutes);
app.use('/api/news', newsRoutes);

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({ message: 'Message is required' });
        }

        if (!process.env.GROQ_API_KEY) {
            return res.status(500).json({ message: 'Chatbot API key is not configured' });
        }

        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
                messages: [
                    {
                        role: 'system',
                        content: [
                            'You are the IdeaSetu assistant.',
                            'Help Indian entrepreneurs and government admins use this app.',
                            'Answer questions about Indian startup schemes, DPIIT recognition, MSME Udyam, grants, startup laws, pitching, login issues, MongoDB, and dashboard navigation.',
                            'Keep replies concise, practical, and friendly.',
                            'Do not claim to submit government forms or provide legal advice.'
                        ].join(' ')
                    },
                    {
                        role: 'user',
                        content: message.slice(0, 1200)
                    }
                ],
                temperature: 0.4,
                max_completion_tokens: 450
            })
        });

        const data = await groqResponse.json();

        if (!groqResponse.ok) {
            console.error('Groq chatbot error:', data);
            return res.status(groqResponse.status).json({
                message: data.error?.message || 'Chatbot request failed'
            });
        }

        res.json({
            reply: data.choices?.[0]?.message?.content || 'Sorry, I could not generate a reply.'
        });
    } catch (error) {
        console.error('Chatbot error:', error);
        res.status(500).json({ message: 'Chatbot failed' });
    }
});

const requiredEnv = ['MONGO_URI', 'JWT_SECRET'];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);

if (missingEnv.length > 0) {
    console.error(`Missing required environment variables: ${missingEnv.join(', ')}`);
    process.exit(1);
}

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1);
    });
