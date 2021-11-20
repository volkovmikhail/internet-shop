const Wear = require('../models/Wear');
const { isValidObjectId } = require('mongoose');
const { Types } = require('mongoose');

module.exports = async (req, res) => {
    if (isValidObjectId(req.params.id)) {
        const data = await Wear.find({ _id: Types.ObjectId(req.params.id) });
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: 'item not found' });
        }
    } else {
        res.status(404).json({ message: 'item not found' });
    }
};
