const jwt = require("jsonwebtoken");
let users = [];
const books = require("../models/book.model");

exports.isValid = username => users.some(u => u.username === username);
exports.users = users;

exports.register = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Username and password required" });

  if (exports.isValid(username))
    return res.status(400).json({ message: "User already exists" });

  users.push({ username, password });
  res.status(200).json({ message: "Registered successfully" });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user)
    return res.status(403).json({ message: "Invalid username or password" });

  const token = jwt.sign({ username }, "access", { expiresIn: "1h" });
  req.session.authorization = { accessToken: token, username };
  res.status(200).json({ message: "Logged in", token });
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
