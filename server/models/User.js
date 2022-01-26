const { Schema, model } = require('mongoose');

const User = new Schema({
  name: { type: String, unique: false, required: true },
  lastname: { type: String, unique: false, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: {type: String, required: true, default: null},
  roles: [{ type: String, ref: 'Role' }],
});

module.exports = model('User', User);
