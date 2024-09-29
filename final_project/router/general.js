const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

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

// Get the book list available in the shop
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

// Get book details based on ISBN
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

// Get book details based on author
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

// Get all books based on title
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

//  Get book review
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
