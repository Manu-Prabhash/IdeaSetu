const express = require('express');

const router = express.Router();

const queryByType = {
    AI: 'artificial intelligence OR AI OR machine learning',
    Security: 'cybersecurity OR data security OR privacy',
    Finance: 'finance OR fintech OR banking',
    Startup: 'startup OR entrepreneurship OR venture capital',
    Tech: 'technology OR software OR innovation',
    Policy: 'government policy OR public policy OR regulation',
    Grants: 'startup grants OR government grants OR innovation funding',
    Procurement: 'government procurement OR public procurement OR tender',
    Compliance: 'business compliance OR startup compliance OR regulatory compliance',
    Sustainability: 'sustainability OR climate tech OR clean energy',
    Health: 'healthtech OR public health OR digital health',
    Education: 'edtech OR education technology OR skills development',
    Infrastructure: 'infrastructure OR urban development OR transport technology',
    Agriculture: 'agritech OR agriculture technology OR food security',
    'Smart Cities': 'smart cities OR civic technology OR urban innovation'
};

router.get('/', async (req, res) => {
    try {
        if (!process.env.NEWS_API_KEY) {
            return res.status(500).json({ message: 'News API key is not configured' });
        }

        const type = queryByType[req.query.type] ? req.query.type : 'AI';
        const search = String(req.query.search || '').trim();
        const sort = req.query.sort === 'oldest' ? 'publishedAt' : 'publishedAt';
        const pageSize = Math.min(Math.max(Number(req.query.pageSize) || 24, 1), 50);
        const query = search ? `(${queryByType[type]}) AND (${search})` : queryByType[type];

        const params = new URLSearchParams({
            q: query,
            language: 'en',
            sortBy: sort,
            pageSize: String(pageSize)
        });

        if (req.query.from) params.set('from', String(req.query.from));
        if (req.query.to) params.set('to', String(req.query.to));

        const newsResponse = await fetch(`https://newsapi.org/v2/everything?${params.toString()}`, {
            headers: {
                'X-Api-Key': process.env.NEWS_API_KEY
            }
        });
        const data = await newsResponse.json();

        if (!newsResponse.ok) {
            return res.status(newsResponse.status).json({
                message: data.message || 'News API request failed'
            });
        }

        const articles = Array.isArray(data.articles) ? data.articles : [];

        res.json({
            type,
            articles: articles
                .filter((article) => article.title && article.url)
                .map((article, index) => ({
                    id: article.url || `${type}-${index}`,
                    title: article.title,
                    excerpt: article.description || article.content || 'No summary available.',
                    type,
                    publishedAt: article.publishedAt,
                    url: article.url,
                    image: article.urlToImage || '',
                    source: article.source?.name || 'News source'
                }))
        });
    } catch (error) {
        console.error('News route error:', error);
        res.status(500).json({ message: 'Failed to fetch news' });
    }
});

module.exports = router;
