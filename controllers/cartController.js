const { addToCart, getCartByUserId, updateCartItem, removeFromCart } = require('../models/cartModel');

const createOrUpdate = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const cartItem = await addToCart(userId, productId, quantity);
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const list = async (req, res) => {
  const { userId } = req.params;

  try {
    const cartItems = await getCartByUserId(userId);
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const updatedCartItem = await updateCartItem(userId, productId, quantity);
    if (!updatedCartItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    res.status(200).json(updatedCartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const removedItem = await removeFromCart(userId, productId);
    if (!removedItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createOrUpdate, list, update, remove };
