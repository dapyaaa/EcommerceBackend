const express = require('express');
const { createOrUpdate, list, update, remove } = require('../controllers/cartController');

const router = express.Router();

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add a product to the shopping cart
 *     description: Add a specific product to the user's shopping cart. If the product already exists in the cart, update the quantity.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               productId:
 *                 type: integer
 *                 example: 101
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Product successfully added or updated in the cart
 *       400:
 *         description: Bad request (e.g., missing required fields)
 *       500:
 *         description: Internal server error
 */
router.post('/add', createOrUpdate);

/**
 * @swagger
 * /api/cart/{userId}:
 *   get:
 *     summary: View the shopping cart
 *     description: Retrieve all the products currently in the user's shopping cart.
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user whose cart is being retrieved
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: The list of products in the user's cart
 *         content:
 *           application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 productId:
 *                   type: integer
 *                   example: 101
 *                 productName:
 *                   type: string
 *                   example: Laptop
 *                 quantity:
 *                   type: integer
 *                   example: 2
 *                 price:
 *                   type: number
 *                   example: 999.99
 *       404:
 *         description: Cart not found for the user
 *       500:
 *         description: Internal server error
 */
router.get('/:userId', list);

/**
 * @swagger
 * /api/cart/update:
 *   put:
 *     summary: Update the cart with new product quantities
 *     description: Update the quantity of a product already in the user's cart.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               productId:
 *                 type: integer
 *                 example: 101
 *               quantity:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Cart successfully updated with new quantity
 *       400:
 *         description: Bad request (e.g., invalid product ID or quantity)
 *       404:
 *         description: Product not found in the user's cart
 *       500:
 *         description: Internal server error
 */
router.put('/update', update);

/**
 * @swagger
 * /api/cart/remove/{userId}/{productId}:
 *   delete:
 *     summary: Remove a product from the cart
 *     description: Remove a specific product from the user's shopping cart.
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user whose cart is being updated
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: productId
 *         in: path
 *         required: true
 *         description: The ID of the product to remove from the cart
 *         schema:
 *           type: integer
 *           example: 101
 *     responses:
 *       200:
 *         description: Product successfully removed from the cart
 *       404:
 *         description: Product or cart not found
 *       500:
 *         description: Internal server error
 */
router.delete('/remove/:userId/:productId', remove);

module.exports = router;
