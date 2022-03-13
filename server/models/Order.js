const { Schema, model, Types } = require('mongoose');

const orderedWear = new Schema({
  wearId: { type: Types.ObjectId, ref: 'Wear' },
  size: { type: String },
});

const Order = new Schema({
  userId: { type: Types.ObjectId, ref: 'User' },
  data: [orderedWear],
  onDate: { type: Date, default: null },
  address: { type: String, default: null },
  orderDate: { type: Date },
  status: { type: String, default: 'В обработке' },
});

module.exports = model('Order', Order);
