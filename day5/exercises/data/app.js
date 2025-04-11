const express = require('express');
const app = express();
const dataService = require('./data/dataService');

const PORT = 5000;

app.get('/posts', async (req, res) => {
    try {
        const posts = await dataService.fetchPosts();
        console.log('Data successfully retrieved and sent as a response.');
        res.json(posts); 
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});