require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/apiRoutes');
const authRouter = require('./routes/authRouter');
const multer = require('multer');

const port = process.env.SERVER_PORT || process.env.PORT || 3001;

const app = express();
app.use(express.json());

//fucking multer
const storagePath =
  process.env.NODE_ENV === 'development'
    ? path.join(__dirname, '..', 'public', 'images')
    : path.join(__dirname, '..', 'build', 'images');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, storagePath);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().getTime().toString() +
        Math.floor(Math.random() * 100000).toString() +
        Math.floor(Math.random() * 100000).toString() +
        Math.floor(Math.random() * 100000).toString() +
        path.extname(file.originalname)
    ); //Appending extension
  },
});

const upload = multer({ storage: storage });
app.use(upload.array('images'));

app.use('/api/', router);
app.use('/api/auth/', authRouter);
app.use('/', express.static(path.join(__dirname, '..', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server started on port: ${port}`);
    });
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
}

start();
