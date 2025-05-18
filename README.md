# 📚 Express Book Reviews API

An Express.js-based RESTful API that allows users to browse books, register, log in, and manage reviews.  
Now featuring JWT authentication, modular structure (routes/controllers/models), and auto-generated Swagger
documentation.

## 🚀 Features

- 📖 Browse book details by ISBN, title, or author
- 🔒 JWT authentication & middleware-based route protection
- 📝 Authenticated users can add, update, or delete reviews
- ⚙️ Modular folder structure with controllers, models, middlewares
- 🧪 Swagger UI for interactive API docs (`/api-docs`)

## 📂 Project Structure

```
final\_project/
├── app.js # Main Express.js app
├── package.json
├── .env (optional)
│
├── routes/
│ ├── auth.routes.js # Auth & Review routes
│ └── books.routes.js # Public book routes
│
├── controllers/
│ ├── auth.controller.js # Auth-related logic
│ └── book.controller.js # Book and review handlers
│
├── models/
│ └── book.model.js # Static book mock data
│
├── middlewares/
│ └── auth.js # JWT auth middleware
│
├── swagger/
│ └── swaggerConfig.js # Swagger setup
│
├── data/
│ └── booksdb.js # Static book data

````

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/fbaltaci/expressBookReviews.git
cd expressBookReviews/final_project
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run the Server

```bash
node app.js
```

Server runs at:
➡️ `http://localhost:5000`
Swagger docs:
➡️ `http://localhost:5000/api-docs`

## 📡 API Endpoints

### 🔓 Public Endpoints

| Method | Endpoint             | Description            |
|--------|----------------------|------------------------|
| POST   | `/customer/register` | Register a new user    |
| GET    | `/`                  | Get all books          |
| GET    | `/isbn/:isbn`        | Get book by ISBN       |
| GET    | `/author/:author`    | Get books by author    |
| GET    | `/title/:title`      | Get books by title     |
| GET    | `/review/:isbn`      | Get reviews for a book |

### 🔒 Authenticated Endpoints (Requires JWT)

| Method | Endpoint                      | Description            |
|--------|-------------------------------|------------------------|
| POST   | `/customer/login`             | User login             |
| PUT    | `/customer/auth/review/:isbn` | Add or update a review |
| DELETE | `/customer/auth/review/:isbn` | Delete a review        |

## 🔑 Authentication

After login, you’ll receive a JWT token.
Send it with protected requests:

```http
Authorization: Bearer your-token-here
```

## 📘 Example Usage

### ➕ Register

```http
POST /customer/register
Content-Type: application/json
{
  "username": "newuser",
  "password": "securepassword"
}
```

### 🔐 Login

```http
POST /customer/login
{
  "username": "newuser",
  "password": "securepassword"
}
```

### 📚 Get Book by ISBN

```http
GET /isbn/1
```

Response:

```json
{
  "author": "Chinua Achebe",
  "title": "Things Fall Apart",
  "reviews": {
    "user1": "Loved it!"
  }
}
```

### ✏️ Add Review

```http
PUT /customer/auth/review/1
Authorization: Bearer your-token
Content-Type: application/json
{
  "review": "Fantastic read!"
}
```

## 🔍 Interactive Swagger Docs

Available at:
[http://localhost:5000/api-docs](http://localhost:5000/api-docs)
You can test all endpoints, add your JWT token, and view schemas.

## 🛠 Tech Stack

* **Node.js** + **Express**
* **JWT** (`jsonwebtoken`)
* **Session management** (`express-session`)
* **Swagger UI** (`swagger-ui-express`)
* **Modular architecture** (routes/controllers/models)

## 🛡️ License

MIT

## 🔗 Links

* GitHub: [https://github.com/fbaltaci/expressBookReviews](https://github.com/fbaltaci/expressBookReviews)

