const Wear = require('../models/Wear');

module.exports = async (req, res) => {
  try {
    const { title, price, currency, category, discription } = req.body;
    const images = req.files.map((file) => file.filename);
    const wear = new Wear({
      title,
      price,
      currency,
      category,
      discription,
      images,
    });
    await wear.save();
  } catch (error) {
    res.status(500).json({
      message: 'Somthing wrong',
    });
    console.log(error);
  }
};
