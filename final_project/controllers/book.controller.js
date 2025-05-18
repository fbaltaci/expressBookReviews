const books = require("../models/book.model");

exports.getAllBooks = (req, res) => {
  res.status(200).json(books);
};

exports.getBookByISBN = (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
};

exports.getBooksByAuthor = (req, res) => {
  const author = req.params.author;
  const booksByAuthor = Object.values(books).filter(b => b.author === author);
  booksByAuthor.length
    ? res.status(200).json(booksByAuthor)
    : res.status(404).json({ message: "Author not found" });
};

exports.getBooksByTitle = (req, res) => {
  const title = req.params.title;
  const booksByTitle = Object.values(books).filter(b => b.title === title);
  booksByTitle.length
    ? res.status(200).json(booksByTitle)
    : res.status(404).json({ message: "Title not found" });
};

exports.getReviewsByISBN = (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];
  book
    ? res.status(200).json(book.reviews)
    : res.status(404).json({ message: "Reviews not found" });
};

exports.addOrUpdateReview = (req, res) => {
  const { isbn } = req.params;
  const { username, password } = req.query;
  const { review } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(403).json({ message: "Unauthorized" });

  const book = books[isbn];
  if (!book) return res.status(404).json({ message: "Book not found" });

  book.reviews[username] = review;
  res.status(200).json({ message: "Review saved successfully" });
};

exports.deleteReview = (req, res) => {
  const { isbn } = req.params;
  const { username, password } = req.query;

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(403).json({ message: "Unauthorized" });

  const book = books[isbn];
  if (!book || !book.reviews[username])
    return res.status(404).json({ message: "Review not found" });

  delete book.reviews[username];
  res.status(200).json({ message: "Review deleted" });
};
