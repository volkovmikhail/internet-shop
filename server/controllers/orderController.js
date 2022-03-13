const { Router } = require('express');
const roleMiddleware = require('../middlewares/roleMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const router = Router();
const Order = require('../models/Order');
const Wear = require('../models/Wear');
const User = require('../models/User');

router.get('/all', roleMiddleware(['ADMIN']), async (req, res) => {
  try {
    const orders = await Order.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
    ]).sort({ orderDate: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Somthing wrong' });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const order = await Order.findOne({ _id: id });
    if (!order) {
      res.status(404).json(null);
      return;
    }

    const newData = [];
    for (let i = 0; i < order.data.length; i++) {
      const wear = await Wear.findOne({ _id: order.data[i].wearId });
      newData.push(wear);
    }
    const user = await User.findOne({ _id: order.userId });
    const sum = newData.reduce((p, c) => p + c.price, 0);
    res.status(200).json({
      order,
      wears: newData,
      user: {
        phone: user.phone,
        name: user.name,
        _id: user._id,
        email: user.email,
      },
      sum,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'somthing wrong' });
  }
});

router.get('/all/user', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.aggregate(
      [
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
      ],
      { userId: req.user.id }
    ).sort({ orderDate: -1 });
    res.status(200).json(orders.filter((o) => o.userId.toString() === req.user.id));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'somthing wrong' });
  }
});

router.patch('/', roleMiddleware(['ADMIN']), async (req, res) => {
  try {
    await Order.updateOne({ _id: req.body.id }, { status: req.body.status });
    res.status(200).json({ message: 'OK' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'somthing wrong' });
  }
});

module.exports = router;
