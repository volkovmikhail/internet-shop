require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/apiRoutes');
const authRouter = require('./routes/authRouter');

const port = process.env.SERVER_PORT || 3001;

const app = express();
app.use(express.json());

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
