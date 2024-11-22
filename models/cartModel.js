const pool = require('../db/db');

// Create or update cart for a user
const addToCart = async (userId, productId, quantity) => {
  const query = `
    INSERT INTO cart (user_id, product_id, quantity)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, product_id)
    DO UPDATE SET quantity = cart.quantity + $3
    RETURNING *;
  `;
  const values = [userId, productId, quantity];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Get cart items for a user
const getCartByUserId = async (userId) => {
  const query = `
    SELECT c.id, p.name, p.price, c.quantity, (p.price * c.quantity) AS total_price
    FROM cart c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = $1;
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

// Update quantity of a cart item
const updateCartItem = async (userId, productId, quantity) => {
  const query = `
    UPDATE cart
    SET quantity = $3
    WHERE user_id = $1 AND product_id = $2
    RETURNING *;
  `;
  const values = [userId, productId, quantity];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Remove item from the cart
const removeFromCart = async (userId, productId) => {
  const query = `DELETE FROM cart WHERE user_id = $1 AND product_id = $2 RETURNING *;`;
  const values = [userId, productId];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = { addToCart, getCartByUserId, updateCartItem, removeFromCart };
