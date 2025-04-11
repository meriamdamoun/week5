const express = require('express');
const app = express();

app.use(express.json());

let books = [
    { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', publishedYear: 1960 },
    { id: 2, title: '1984', author: 'George Orwell', publishedYear: 1949 },
    { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', publishedYear: 1925 }
];

app.get('/api/books', (req, res) => {
    res.json(books);
});

app.get('/api/books/:bookId', (req, res) => {
    const bookId = parseInt(req.params.bookId);
    const book = books.find(b => b.id === bookId);
    
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }
    
    res.status(200).json(book);
});

app.post('/api/books', (req, res) => {
    const { title, author, publishedYear } = req.body;
    const maxId = books.reduce((max, book) => (book.id > max ? book.id : max), 0);
    const newId = maxId + 1;
    
    const newBook = {
        id: newId,
        title,
        author,
        publishedYear
    };
    
    books.push(newBook);
    res.status(201).json(newBook);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});