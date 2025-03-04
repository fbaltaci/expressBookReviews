# 📚 Express Book Reviews API

An Express.js-based RESTful API that allows users to browse books, register, log in, and submit or delete book reviews.
The API features JWT authentication, session management, and book retrieval by title, author, and ISBN.

## 🚀 Features

- 📖 Retrieve book details by ISBN, title, or author.
- 📝 Authenticated users can add, update, or delete reviews.
- 🔐 JWT-based authentication for secure login.
- 🛠 Express.js backend with session-based authentication.
- 📡 Supports RESTful API endpoints.

## 📂 Project Structure

```
expressBookReviews/
│── final_project/
│   ├── router/
│   │   ├── auth_users.js        # Authentication & User Routes
│   │   ├── booksdb.js           # Book Database (Mock Data)
│   │   ├── general.js           # Public Routes
│   ├── index.js                 # Main Express.js App
│   ├── package.json             # Dependencies & Scripts
│   ├── README.md                # Project Documentation
└── package-lock.json

```

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/fbaltaci/expressBookReviews.git
cd expressBookReviews/final_project
```

## 2️⃣ Install Dependencies

```
npm install
```

## 3️⃣ Run the Server

```
npm start
```

The server runs on http://localhost:5000

## 📡 API Endpoints

### 🔓 Public Endpoints (No Authentication Required)

- Method Endpoint Description
- POST /register Register a new user
- GET /books Get all books
- GET /isbn/:isbn Get book details by ISBN
- GET /author/:author Get books by a specific author
- GET /title/:title Get books by title
- GET /review/:isbn Get book reviews by ISBN

### 🔒 Authenticated User Endpoints (Requires JWT)

- Method Endpoint Description
- POST /customer/login Login and receive a JWT
- PUT /customer/auth/review/:isbn Add or update a book review
- DELETE /customer/auth/review/:isbn Delete a book review

## 🔑 Authentication & Authorization

- To access protected routes, users must log in and receive a JWT token.
- Pass the token in the request headers as:

```JSON
{
  "Authorization": "Bearer your-token-here"
}
```

- Example login request:

```curl
 curl -X POST http://localhost:5000/customer/login \
-H "Content-Type: application/json" \
-d '{"username": "testuser", "password": "password123"}'
```

## 🛠 Technologies Used

- Node.js – JavaScript runtime
- Express.js – Web framework for Node.js
- JWT (jsonwebtoken) – Secure authentication
- Express-session – Session management
- Nodemon – Auto-reloading during development

## 📝 Example API Requests

### Register a New User

POST /register

```JSON
{
  "username": "newuser",
  "password": "securepassword"
}
```

### Login

POST /customer/login

```JSON
{
  "username": "newuser",
  "password": "securepassword"
}
```

### Get Book Details by ISBN

GET /isbn/1
Response:

```JSON
{
  "author": "Chinua Achebe",
  "title": "Things Fall Apart",
  "reviews": {
    "username1": "my first review",
    "username2": "my second review"
  }
}
```

### Add a Review (Authenticated)

PUT /customer/auth/review/1
Headers:

```JSON
{
  "Authorization": "Bearer your-token"
}
```

Body:

```JSON
{
"review": "Amazing book! A must-read."
}
```

### Delete a Review (Authenticated)

DELETE /customer/auth/review/1
Headers:

```JSON
{
  "Authorization": "Bearer your-token"
}
```

## 🛡️ License

This project is licensed under the MIT License.

## Links

- 🔗 GitHub Repository: https://github.com/fbaltaci/expressBookReviews
- 🌎 Live API: _will be available later!_

