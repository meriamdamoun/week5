const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let posts = [
    { id: 1, title: 'First Post', content: 'This is the content of the first post.' },
    { id: 2, title: 'Second Post', content: 'This is the content of the second post.' },
    { id: 3, title: 'Third Post', content: 'This is the content of the third post.' }
];

app.get('/posts', (req, res) => {
    res.json(posts);
});

app.get('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);
    
    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json(post);
});

app.post('/posts', (req, res) => {
    const { id, title, content } = req.body;

    if (!id || !title || !content) {
        return res.status(400).json({ error: 'ID, title, and content are required' });
    }

    const existingPost = posts.find(post => post.id === id);
    if (existingPost) {
        return res.status(400).json({ error: 'A post with this ID already exists' });
    }

    const newPost = { id, title, content };
    posts.push(newPost);

    res.status(201).json(newPost);
});

app.put('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, content } = req.body;
    
    if (!title && !content) {
        return res.status(400).json({ error: 'Title or content is required for update' });
    }
    
    const postIndex = posts.findIndex(post => post.id === id);
    
    if (postIndex === -1) {
        return res.status(404).json({ error: 'Post not found' });
    }
    
    posts[postIndex] = {
        ...posts[postIndex],
        title: title || posts[postIndex].title,
        content: content || posts[postIndex].content
    };
    
    res.json(posts[postIndex]);
});

app.delete('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const postIndex = posts.findIndex(post => post.id === id);
    
    if (postIndex === -1) {
        return res.status(404).json({ error: 'Post not found' });
    }
    
    const deletedPost = posts[postIndex];
    posts = posts.filter(post => post.id !== id);
    
    res.json({ message: 'Post deleted successfully', deletedPost });
});

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong on the server' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});