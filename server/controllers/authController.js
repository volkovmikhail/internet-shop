const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = process.env.TOKEN_KEY;

function generateAccessToken(id, roles) {
  const payload = { id, roles };
  return jwt.sign(payload, key, { expiresIn: '24h' });
}

class authController {
  async registration(req, res) {
    try {
      const { name, lastname, email, password, phone } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({ message: 'This email already exist' });
      }
      if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters' });
      }
      const hashPw = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: 'USER' }); //поставить нужную роль
      const user = new User({ name, lastname, email, phone, password: hashPw, roles: [userRole.value] });
      await user.save();
      return res.json({ message: 'User successfuly created!' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Registration error' });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ message: 'Wrong password' });
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token, role: user.roles[0] });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Login error' });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'error' });
    }
  }
}

module.exports = new authController();
