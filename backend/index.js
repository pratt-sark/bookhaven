import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(express.json());
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage });

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Cr7pro2K',
    database: 'test'
});

app.get('/', (req, res) => {
    res.json("success");
});

app.get('/books', (req, res) => {
    const query = "SELECT id, title, `desc`, cover, price FROM books";
    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
});

app.get('/books/:id/cover', (req, res) => {
    const query = "SELECT cover FROM books WHERE id = ?";
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        } else {
            if (results.length > 0) {
                res.type('image/jpeg').send(results[0].cover); // Adjust content type if needed
            } else {
                res.status(404).json({ error: "Book not found" });
            }
        }
    });
});

app.post('/books', upload.single('cover'), (req, res) => {
    const query = "INSERT INTO books (`title`, `desc`, `cover`, `price`) VALUES (?, ?, ?, ?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.file.buffer, // Store the buffer
        req.body.price
    ];
    db.query(query, values, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        } else {
            res.json("Book has been created successfully.");
        }
    });
});

app.delete('/books/:id', (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM books WHERE id = ?";
    db.query(query, id, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        } else {
            res.json("Book has been deleted successfully.");
        }
    });
});

app.put('/books/:id', upload.single('cover'), (req, res) => {
    const id = req.params.id;
    const query = "UPDATE books SET `title` = ?, `desc` = ?, `cover` = COALESCE(?, `cover`), `price` = ? WHERE id = ?";
    const values = [
        req.body.title,
        req.body.desc,
        req.file ? req.file.buffer : null, // Use buffer if a new file is uploaded
        req.body.price
    ];

    db.query(query, [...values, id], (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        } else {
            res.json("Book has been updated successfully.");
        }
    });
});

app.listen(8800, () => {
    console.log('Server is running on port 8800');
});
