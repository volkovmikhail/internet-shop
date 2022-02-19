const Wear = require('../../models/Wear');

module.exports = async (req, res) => {
  try {
    const { title, price, currency, category, discription, quantity, sex, images, sizes } = req.body;

    const wear = new Wear({
      title,
      price,
      currency,
      category,
      discription,
      images: JSON.parse(images),
      quantity,
      sex,
      sizes: JSON.parse(sizes),
    });
    await wear.save();
    res.status(200).json({
      message: 'created',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Somthing wrong',
    });
    console.log(error);
  }
};
