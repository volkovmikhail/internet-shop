const { Router } = require('express');
const router = Router();
const Wear = require('../models/Wear');
const { ObjectId } = require('mongoose').Types;
const axios = require('axios').default;
const FormData = require('form-data');
const fs = require('fs');
const roleMiddleware = require('../middlewares/roleMiddleware');
const imagesApiKey = process.env.IMAGES_API_KEY;

router.put('/:id', roleMiddleware(['ADMIN']), async (req, res) => {
  try {
    const { title, price, currency, category, discription, quantity, images, sex, sizes } = req.body;
    await Wear.updateOne(
      { _id: ObjectId(req.params.id) },
      {
        title,
        price,
        currency,
        category,
        discription,
        images: JSON.parse(images),
        quantity,
        sex,
        sizes: JSON.parse(sizes),
      }
    );
    res.status(200).json({
      message: 'updated',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Somthing wrong',
    });
    console.log(error);
  }
});

router.patch('/popularity', async (req, res) => {
  try {
    const { id, popularity } = req.query;
    await Wear.updateOne({ _id: ObjectId(id) }, { $inc: { popularity: popularity } });
    res.status(204).json({ message: 'popularity is added' });
  } catch (error) {
    console.log(error);
  }
});

router.post('/images', roleMiddleware(['ADMIN']), async (req, res) => {
  try {
    const images = [];
    for (let i = 0; i < req.files.length; i++) {
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
    res.status(200).json(images);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'somthing wrong' });
  }
});

module.exports = router;
