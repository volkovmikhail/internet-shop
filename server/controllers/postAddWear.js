const Wear = require('../models/Wear');
const axios = require('axios').default;
const FormData = require('form-data');
const fs = require('fs');
//const path = require('path');
const imagesApiKey = process.env.IMAGES_API_KEY;

module.exports = async (req, res) => {
  try {
    const { title, price, currency, category, discription } = req.body;
    //const images = req.files.map((file) => file.filename);
    const images = [];
    for (let i = 0; i < req.files.length; i++) {
      const form = new FormData();
      form.append('image', fs.createReadStream(req.files[i].path));
      const res = await axios.post(`https://api.imgbb.com/1/upload?key=${imagesApiKey}`, form, {
        headers: {
          ...form.getHeaders()
        },
      });
      images.push(res.data.data.url);
      fs.rmSync(req.files[i].path);
    }

    const wear = new Wear({
      title,
      price,
      currency,
      category,
      discription,
      images,
    });
    await wear.save();
    res.status(200).json({
      message: 'created'
    })
  } catch (error) {
    res.status(500).json({
      message: 'Somthing wrong',
    });
    console.log(error);
  }
};
