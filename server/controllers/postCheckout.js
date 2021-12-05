const Order = require('../models/Order');
const { ObjectId } = require('mongoose').Types;

module.exports = async (req, res) => {
  try {
    const data = req.body;
    const wears = [];
    data.forEach((e) => {
      wears.push(ObjectId(e._id));
    });
    const order = new Order({ data: wears, userId: ObjectId(req.user.id), orderDate: Date.now() });
    order.save();
    res.status(200).json({ message: 'Order created' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Somthing wrong' });
  }
};
