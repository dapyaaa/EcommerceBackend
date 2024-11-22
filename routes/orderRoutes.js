const express = require('express');
const { create, list, read, update, remove } = require('../controllers/orderController');

const router = express.Router();

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     description: Place a new order for the user with products from the cart.
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
 *               totalAmount:
 *                 type: number
 *                 example: 250.99
 *               shippingAddress:
 *                 type: string
 *                 example: "123 Main St, City, Country"
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Bad request (e.g., missing required fields)
 *       500:
 *         description: Internal server error
 */
router.post('/', create);

/**
 * @swagger
 * /api/orders/{userId}:
 *   get:
 *     summary: Get orders by user ID
 *     description: Retrieve all orders placed by a specific user.
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user whose orders are being retrieved
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: List of orders for the user
 *         content:
 *           application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 orderId:
 *                   type: integer
 *                   example: 1001
 *                 totalAmount:
 *                   type: number
 *                   example: 250.99
 *                 shippingAddress:
 *                   type: string
 *                   example: "123 Main St, City, Country"
 *                 status:
 *                   type: string
 *                   example: "Pending"
 *       404:
 *         description: No orders found for the user
 *       500:
 *         description: Internal server error
 */
router.get('/:userId', list);

/**
 * @swagger
 * /api/orders/order/{orderId}:
 *   get:
 *     summary: Get an order by order ID
 *     description: Retrieve the details of a specific order using its ID.
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         description: ID of the order to retrieve
 *         schema:
 *           type: integer
 *           example: 1001
 *     responses:
 *       200:
 *         description: Details of the order
 *         content:
 *           application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: integer
 *                 example: 1001
 *               totalAmount:
 *                 type: number
 *                 example: 250.99
 *               shippingAddress:
 *                 type: string
 *                 example: "123 Main St, City, Country"
 *               status:
 *                 type: string
 *                 example: "Pending"
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.get('/order/:orderId', read);

/**
 * @swagger
 * /api/orders/update:
 *   put:
 *     summary: Update an existing order
 *     description: Modify an order's details such as status or shipping address.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: integer
 *                 example: 1001
 *               status:
 *                 type: string
 *                 example: "Shipped"
 *               shippingAddress:
 *                 type: string
 *                 example: "456 New Address, City, Country"
 *     responses:
 *       200:
 *         description: Order successfully updated
 *       400:
 *         description: Bad request (e.g., invalid input data)
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.put('/update', update);

/**
 * @swagger
 * /api/orders/delete/{orderId}:
 *   delete:
 *     summary: Delete an order
 *     description: Remove an order from the system using its order ID.
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         description: ID of the order to delete
 *         schema:
 *           type: integer
 *           example: 1001
 *     responses:
 *       200:
 *         description: Order successfully deleted
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.delete('/delete/:orderId', remove);

module.exports = router;
