const Wear = require('../models/Wear');

module.exports = async (req, res) => {
    const data = await Wear.find({});
    res.status(200).json(data);
};
