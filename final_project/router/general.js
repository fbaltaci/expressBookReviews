const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

/**
 * @openapi
 * /register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registration successful
 *       400:
 *         description: User already exists or input missing
 */
public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ username, password });
      return res.status(200).json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(400).json({ message: "User already exists!" });
    }
  } else {
    return res.status(400).json({ message: "Username and password are required" });
  }
});

/**
 * @openapi
 * /:
 *   get:
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: List of books
 */
public_users.get("/", function (req, res) {
  let promiseGetBooks = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (books) {
        resolve(books);
      } else {
        reject({ message: "Books not found" });
      }
    }, 1000);
  });

  promiseGetBooks
    .then((books) => {
      return res.status(200).json(books);
    })
    .catch((error) => {
      return res.status(404).json(error);
    });
});

/**
 * @openapi
 * /isbn/{isbn}:
 *   get:
 *     summary: Get book details by ISBN
 *     parameters:
 *       - name: isbn
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book details found
 *       404:
 *         description: Book not found
 */
public_users.get("/isbn/:isbn", function (req, res) {
  const isbn = parseInt(req.params.isbn);

  let promiseGetBookDetails = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (books[isbn]) {
        resolve(books[isbn]);
      } else {
        reject({ message: "Book details not found." });
      }
    });
  });

  promiseGetBookDetails
    .then((bookDetails) => {
      return res.status(200).json(bookDetails);
    })
    .catch((error) => {
      return res.status(404).json(error);
    });
});

/**
 * @openapi
 * /author/{author}:
 *   get:
 *     summary: Get books by author
 *     parameters:
 *       - name: author
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Books by the author
 *       404:
 *         description: Author not found
 */
public_users.get("/author/:author", function (req, res) {
  const author = req.params.author;

  let promiseGetBooksByAuthor = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (author) {
        const booksByAuthor = Object.values(books).filter((book) => book.author === author);
        if (booksByAuthor.length > 0) {
          resolve(booksByAuthor);
        } else {
          reject({ message: "Author not found" });
        }
      }
    }, 500);
  });

  promiseGetBooksByAuthor
    .then((booksByAuthor) => {
      return res.status(200).json(booksByAuthor);
    })
    .catch((error) => {
      return res.status(404).json(error);
    });
});

/**
 * @openapi
 * /title/{title}:
 *   get:
 *     summary: Get books by title
 *     parameters:
 *       - name: title
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Books with the title
 *       404:
 *         description: Title not found
 */
public_users.get("/title/:title", function (req, res) {
  const title = req.params.title;
  if (title) {
    const booksByTitle = Object.values(books).filter((book) => book.title === title);
    if (booksByTitle.length > 0) {
      return res.status(200).json(booksByTitle);
    } else {
      return res.status(404).json({ message: "Title not found" });
    }
  }
});

/**
 * @openapi
 * /review/{isbn}:
 *   get:
 *     summary: Get book reviews by ISBN
 *     parameters:
 *       - name: isbn
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reviews for the book
 *       404:
 *         description: ISBN not found or invalid
 */
public_users.get("/review/:isbn", function (req, res) {
  const isbn = parseInt(req.params.isbn);

  let promiseGetBookReviewByISBN = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (books[isbn]) {
        resolve(books[isbn].reviews);
      } else {
        reject({ message: "ISBN not found or invalid" });
      }
    }, 500);
  });

  promiseGetBookReviewByISBN.then(() => {
    return res.status(200).json(books[isbn].reviews);
  }).catch((error) => {
    return res.status(404).json(error);
  });
});

module.exports.general = public_users;
