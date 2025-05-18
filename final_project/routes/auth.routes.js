const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

/**
 * @openapi
 * /customer/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registration successful
 *       400:
 *         description: Username or password missing or already taken
 */
router.post("/register", authController.register);

/**
 * @openapi
 * /customer/login:
 *   post:
 *     summary: Login with username and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCredentials'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       403:
 *         description: Invalid credentials
 */
router.post("/login", authController.login);

/**
 * @openapi
 * /customer/auth/review/{isbn}:
 *   put:
 *     summary: Add or update a book review
 *     tags: [Auth]
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
router.put("/auth/review/:isbn", authController.addOrUpdateReview);


/**
 * @openapi
 * /customer/auth/review/{isbn}:
 *   delete:
 *     summary: Delete a review for a book
 *     tags: [Auth]
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
router.delete("/auth/review/:isbn", authController.deleteReview);

module.exports = router;
module.exports.isValid = authController.isValid;
module.exports.users = authController.users;
