# bookhaven

BookHaven is a web application for managing a collection of books. Users can add, update, and delete books from the collection. This project is built using React for the frontend and Node.js with Express for the backend, with MySQL as the database. It's a basic web app useful for learning the basics of each of these technologies.

### Desktop/Laptop View
![Desktop/Laptop View](https://github.com/pratt-sark/bookhaven/assets/72748736/833995fc-e933-4706-8fe0-35c5dc8cc051)

<p align="center">
    ### Mobile View
    <img src="https://github.com/pratt-sark/bookhaven/assets/72748736/8a78c5c3-9264-4c60-a268-c17327f9c11b" alt="Mobile View" />
</p>


## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Display a list of books with their details (title, description, price, cover image).
- Add new books to the collection.
- Update existing book details.
- Delete books from the collection.
- Responsive design with a simple but effective UI.

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MySQL

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- React (v17 or higher)
- MySQL


## Installation

### Backend Setup

Install dependencies:

```bash
npm install
```

Configure the database:

Create a MySQL database named `bookhaven`.

Import the provided SQL file to set up the initial schema and data:

```bash
mysql -u yourusername -p bookhaven < path/to/your/sqlfile.sql
```

Update the database configuration in `config.js`:

```javascript
module.exports = {
    host: 'localhost',
    user: 'yourusername',
    password: 'yourpassword',
    database: 'your_db'
};
```

Start the backend server:

```bash
npm start
```

The backend server will run on [http://localhost:8800](http://localhost:8800).

### Frontend Setup

Navigate to the frontend directory:

```bash
cd ../frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm start
```

The frontend development server will run on [http://localhost:3000](http://localhost:3000).

## Usage

### Running the Application

Ensure the backend server is running:

```bash
cd backend
npm start
```

In a new terminal, start the frontend server:

```bash
cd frontend
npm start
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### Adding a New Book

- Click on the "Add new book" button in the navbar.
- Fill in the book details and click "Submit".

### Updating a Book

- Click the "Update" button on a book card.
- Modify the details and click "Submit".

### Deleting a Book

- Click the "Delete" button on a book card.
- Confirm the deletion.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
