const User = require('../../models/User');
const { Types } = require('mongoose');

module.exports = async (req, res) => {
  try {
    const user = await User.findOne({ _id: Types.ObjectId(req.user.id) });
    if (!user) {
      res.status(400).json({ message: 'User not found' });
      return;
    }
    res.status(200).json({
      email: user.email,
      name: user.name,
      phone: user.phone,
    });
  } catch (error) {
    res.status(400).json({ message: 'User not found' });
  }
};
