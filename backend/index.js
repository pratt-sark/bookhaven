import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
app.use(express.json());  // Add this line to parse JSON bodies
app.use(cors());

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
    const query = "SELECT * FROM books";
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    });
});

app.post('/books', (req, res) => {
    const query = "INSERT INTO books (`title`, `desc`, `cover`, `price`) VALUES (?, ?, ?, ?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price
    ];
    db.query(query, values, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: err.message });  // Add error response
        } else {
            res.json("Book has been created successfully.");
        }
    });
});

app.delete('/books/:id', (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM books WHERE id =?";
    db.query(query, id, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: err.message });  // Add error response
        } else {
            res.json("Book has been deleted successfully.");
        }
    });
})

app.put('/books/:id', (req, res) => {
    const id = req.params.id;
    const query = "UPDATE books SET `title` = ?, `desc` = ?, `cover` = ?, `price` = ? WHERE id = ?";
    
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price
    ];

    db.query(query, [...values,id], (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: err.message });  // Add error response
        } else {
            res.json("Book has been updated successfully.");
        }
    });
})

app.listen(8800, () => {
    console.log('Server is running on port 8800');
});
