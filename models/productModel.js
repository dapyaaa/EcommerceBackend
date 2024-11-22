const pool = require('../db/db');

const createProduct = async (name, description, price, stock) => {
  const query = `INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING *`;
  const values = [name, description, price, stock];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getAllProducts = async () => {
  const result = await pool.query(`SELECT * FROM products`);
  return result.rows;
};

const getProductById = async (id) => {
  const query = `SELECT * FROM products WHERE id = $1`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

const updateProduct = async (id, updates) => {
  const { name, description, price, stock } = updates;
  const query = `UPDATE products SET name=$1, description=$2, price=$3, stock=$4 WHERE id=$5 RETURNING *`;
  const values = [name, description, price, stock, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const deleteProduct = async (id) => {
  const query = `DELETE FROM products WHERE id = $1 RETURNING *`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
