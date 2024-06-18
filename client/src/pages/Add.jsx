import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Add = () => {
    const [book, setBook] = useState({
        title: '',
        desc: '',
        price: '',
        cover: null // Initialize cover as null to handle file input
    });
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "cover" && files.length > 0) {
            setBook((prev) => ({ ...prev, cover: files[0] }));
        } else {
            setBook((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleClick = async () => {
        const formData = new FormData();
        formData.append('title', book.title);
        formData.append('desc', book.desc);
        formData.append('price', book.price);
        if (book.cover) {
            formData.append('cover', book.cover);
        }

        try {
            await axios.post('http://localhost:8800/books', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate("/");
        } catch (err) {
            console.error(err);
            setError(true);
        }
    };

    return (
        <div>
            <h1>Add a New Book</h1>
            <div className="form">
                <input type="text" placeholder="Title" name="title" value={book.title} onChange={handleChange} />
                <textarea placeholder="Description" name="desc" value={book.desc} onChange={handleChange}></textarea>
                <input type="file" name="cover" onChange={handleChange} />
                <input type="text" placeholder="Price" name="price" value={book.price} onChange={handleChange} />
                <button onClick={handleClick}>Add Book</button>
                {error && <p>Something went wrong!</p>}
                <Link to="/">See all books</Link>
            </div>
        </div>
    );
};

export default Add;
