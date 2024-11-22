const pool = require('../db/db');

// Create a new order
const createOrder = async (userId, totalAmount) => {
  const query = `
    INSERT INTO orders (user_id, total_amount, status)
    VALUES ($1, $2, 'pending')
    RETURNING *;
  `;
  const values = [userId, totalAmount];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Get orders by userId
const getOrdersByUserId = async (userId) => {
  const query = `
    SELECT * FROM orders WHERE user_id = $1;
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

// Get a specific order by orderId
const getOrderById = async (orderId) => {
  const query = `
    SELECT * FROM orders WHERE id = $1;
  `;
  const result = await pool.query(query, [orderId]);
  return result.rows[0];
};

// Update order status (e.g., to 'completed', 'shipped', etc.)
const updateOrderStatus = async (orderId, status) => {
  const query = `
    UPDATE orders SET status = $2 WHERE id = $1 RETURNING *;
  `;
  const values = [orderId, status];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Delete an order
const deleteOrder = async (orderId) => {
  const query = `DELETE FROM orders WHERE id = $1 RETURNING *;`;
  const values = [orderId];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = { createOrder, getOrdersByUserId, getOrderById, updateOrderStatus, deleteOrder };
