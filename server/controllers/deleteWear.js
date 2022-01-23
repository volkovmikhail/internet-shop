const Wear = require('../models/Wear');
const { ObjectId } = require('mongoose').Types;

module.exports = async (req, res) => {
  try {
    const id = req.params.id;
    await Wear.updateOne({ _id: ObjectId(id) }, { $set: { active: false } });
    res.status(200).json({ message: 'Deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Somthing wrong' });
  }
};
