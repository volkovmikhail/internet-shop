const Orders = require('../../models/Order');
// const User = require('../models/User');
const Wear = require('../../models/Wear');
const { ObjectId } = require('mongoose').Types;

module.exports = async (req, res) => {
  try {
    const orders = await Orders.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
    ]);
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Somthing wrong' });
  }
};
