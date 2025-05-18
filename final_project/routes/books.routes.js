const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");

/**
 * @openapi
 * /:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of books
 */
router.get("/", bookController.getAllBooks);

/**
 * @openapi
 * /isbn/{isbn}:
 *   get:
 *     summary: Get book by ISBN
 *     tags: [Books]
 *     parameters:
 *       - name: isbn
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 */
router.get("/isbn/:isbn", bookController.getBookByISBN);

/**
 * @openapi
 * /author/{author}:
 *   get:
 *     summary: Get books by author
 *     tags: [Books]
 *     parameters:
 *       - name: author
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Books by author
 *       404:
 *         description: Author not found
 */
router.get("/author/:author", bookController.getBooksByAuthor);

/**
 * @openapi
 * /title/{title}:
 *   get:
 *     summary: Get books by title
 *     tags: [Books]
 *     parameters:
 *       - name: title
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Books by title
 *       404:
 *         description: Title not found
 */
router.get("/title/:title", bookController.getBooksByTitle);

/**
 * @openapi
 * /review/{isbn}:
 *   get:
 *     summary: Get book reviews by ISBN
 *     tags: [Books]
 *     parameters:
 *       - name: isbn
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reviews of the book
 *       404:
 *         description: Reviews not found
 */
router.get("/review/:isbn", bookController.getReviewsByISBN);

/**
 * @openapi
 * /customer/auth/review/{isbn}:
 *   put:
 *     summary: Add or update a book review
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: isbn
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: username
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *       - name: password
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: Review saved
 */
router.put("/auth/review/:isbn", bookController.addOrUpdateReview);


/**
 * @openapi
 * /customer/auth/review/{isbn}:
 *   delete:
 *     summary: Delete a review for a book
 *     tags: [Books]
 *     parameters:
 *       - name: isbn
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: username
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *       - name: password
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review deleted
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Review not found
 */
router.delete("/auth/review/:isbn", bookController.deleteReview);

module.exports = router;
