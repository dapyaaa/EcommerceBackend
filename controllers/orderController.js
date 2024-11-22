const { createOrder, getOrdersByUserId, getOrderById, updateOrderStatus, deleteOrder } = require('../models/orderModel');

const create = async (req, res) => {
  const { userId, totalAmount } = req.body;

  try {
    const order = await createOrder(userId, totalAmount);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const list = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await getOrdersByUserId(userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const read = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { orderId, status } = req.body;

  try {
    const updatedOrder = await updateOrderStatus(orderId, status);
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  const { orderId } = req.params;

  try {
    const deletedOrder = await deleteOrder(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { create, list, read, update, remove };
