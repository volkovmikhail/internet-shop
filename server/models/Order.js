const { Schema, model, Types } = require('mongoose');

const Order = new Schema({
  userId: { type: Types.ObjectId, ref: 'User' },
  data: [{ type: Types.ObjectId, ref: 'Wear' }],
  onDate: { type: Date, default: null },
  address: { type: String, default: null },
  orderDate: { type: Date },
});

module.exports = model('Order', Order);
