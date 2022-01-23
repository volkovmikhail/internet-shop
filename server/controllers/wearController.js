const { Router } = require('express');
const router = Router();
const Wear = require('../models/Wear');
const { ObjectId } = require('mongoose').Types;
const axios = require('axios').default;
const FormData = require('form-data');
const fs = require('fs');
const imagesApiKey = process.env.IMAGES_API_KEY;

router.put('/:id', async (req, res) => {
  try {
    const { title, price, currency, category, discription, quantity } = req.body;
    //const images = req.files.map((file) => file.filename);
    const images = [];
    const filesLen = req.files.length || 0;
    for (let i = 0; i < filesLen; i++) {
      const form = new FormData();
      form.append('image', fs.createReadStream(req.files[i].path));
      const res = await axios.post(`https://api.imgbb.com/1/upload?key=${imagesApiKey}`, form, {
        headers: {
          ...form.getHeaders(),
        },
      });
      images.push(res.data.data.url);
      fs.rmSync(req.files[i].path);
    }

    await Wear.updateOne(
      { _id: ObjectId(req.params.id) },
      {
        title,
        price,
        currency,
        category,
        discription,
        images,
        quantity
      }
    );
    res.status(201).json({
      message: 'created',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Somthing wrong',
    });
    console.log(error);
  }
});

module.exports = router;
