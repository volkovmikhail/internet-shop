const { Schema, model, Types } = require('mongoose');

const Order = new Schema({
  userId: { type: Types.ObjectId, ref: 'User' },
  data: [{ type: Types.ObjectId, ref: 'Wear' }],
  orderDate: { type: Date },
});

module.exports = model('Order', Order);
