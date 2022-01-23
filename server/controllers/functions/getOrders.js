const Orders = require('../../models/Order');
// const User = require('../models/User');
const Wear = require('../../models/Wear');
const { ObjectId } = require('mongoose').Types;

module.exports = async (req, res) => {
  try {
    const result = [];
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
    for (let i = 0; i < orders.length; i++) {
      const wears = [];
      for (let j = 0; j < orders[i].data.length; j++) {
        const wear = await Wear.findOne({ _id: ObjectId(orders[i].data[j]) });
        wears.push(wear);
      }
      result.push({
        user: orders[i].user,
        wears,
        date: orders[i].orderDate,
      });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Somthing wrong' });
  }
};
