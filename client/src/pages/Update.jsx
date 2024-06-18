import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
    const [book, setBook] = useState({
        title: "",
        desc: "",
        price: "",
        cover: null
    });
    const [error, setError] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const bookId = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/books/${bookId}`);
                const bookData = response.data;
                setBook(bookData);
            } catch (error) {
                console.error("Error fetching book data:", error);
                setError(true);
            }
        };
        fetchBookData();
    }, [bookId]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "cover" && files.length > 0) {
            setBook((prev) => ({ ...prev, cover: files[0] }));
        } else {
            setBook((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', book.title);
        formData.append('desc', book.desc);
        formData.append('price', book.price);
        if (book.cover) {
            formData.append('cover', book.cover);
        }

        try {
            await axios.put(`http://localhost:8800/books/${bookId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate("/");
        } catch (err) {
            console.error("Error updating book:", err);
            setError(true);
        }
    };

    return (
        <div className="form">
            <h1>Update the book</h1>
            <input
                type="text"
                placeholder="Book title"
                name="title"
                value={book.title}
                onChange={handleChange}
            />
            <textarea
                rows={5}
                placeholder="Book desc"
                name="desc"
                value={book.desc}
                onChange={handleChange}
            />
            <input
                type="number"
                placeholder="Book price"
                name="price"
                value={book.price}
                onChange={handleChange}
            />
            <input
                type="file"
                name="cover"
                onChange={handleChange}
            />
            <button onClick={handleClick}>Update</button>
            {error && "Something went wrong!"}
            <Link to="/">See all books</Link>
        </div>
    );
};

export default Update;
