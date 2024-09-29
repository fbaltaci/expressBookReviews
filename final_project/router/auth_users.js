const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  return users.some((user) => user.username === username);
};

const authenticatedUser = (username, password) => {
  return users.some((user) => user.username === username && user.password === password);
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  const customerUsername = req.body.username;
  const customerPassword = req.body.password;

  if (!customerUsername || !customerPassword) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (authenticatedUser(customerUsername, customerPassword)) {
    let accessToken = jwt.sign({ username: customerUsername }, "access", { expiresIn: "1h" });

    req.session.authorization = {
      accessToken: accessToken,
      username: customerUsername,
    };

    return res.status(200).json({
      message: "User successfully logged in",
      token: accessToken,
    });
  } else {
    return res.status(403).json({ message: "Invalid username or password" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.query.username;
  const password = req.query.password;
  const review = req.body.review;

  if (!authenticatedUser(username, password)) {
    return res.status(403).json({ message: "Invalid username or password" });
  }

  const book = books[isbn];

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (!book.reviews) {
    book.reviews = {};
  }

  if (book.reviews[username]) {
    book.reviews[username] = review;
    return res.status(200).json({ message: "Review updated successfully" });
  } else {
    book.reviews[username] = review;
    return res.status(200).json({ message: "Review added successfully" });
  }
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.query.username;
  const password = req.query.password;

  const book = books[isbn];

  if (!authenticatedUser(username, password)) {
    return res.status(403).json({ message: "Invalid username or password" });
  }

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (!book.reviews) {
    return res.status(404).json({ message: "No reviews found for the book." });
  }

  if (book.reviews[username]) {
    delete book.reviews[username];
    return res.status(200).json({ message: "Review deleted successfully" });
  } else {
    return res.status(404).json({ message: "This user hasn't left any review for the book." });
  }

});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
