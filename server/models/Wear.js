const { Schema, model } = require('mongoose');

const schema = new Schema({
  images: { type: [String], required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, required: true },
  category: { type: String, required: true },
  discription: { type: String, required: true, default: '-' },
  active: { type: Boolean, required: true, default: true },
  quantity: { type: Number, required: true, default: 0 },
  popularity: { type: Number, required: true, default: 0 },
  sex: { type: Number, required: true, default: 1 },
});

module.exports = model('Wear', schema);
