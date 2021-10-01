const { Schema, model } = require('mongoose');

const schema = new Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    category: { type: String, required: true },
});

module.exports = model('Wear', schema);