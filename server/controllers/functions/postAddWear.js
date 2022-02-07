const Wear = require('../../models/Wear');
const axios = require('axios').default;
const FormData = require('form-data');
const fs = require('fs');
//const path = require('path');
const imagesApiKey = process.env.IMAGES_API_KEY;

module.exports = async (req, res) => {
  try {
    const { title, price, currency, category, discription, quantity, sex, images } = req.body;

    const wear = new Wear({
      title,
      price,
      currency,
      category,
      discription,
      images: JSON.parse(images),
      quantity,
      sex,
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
