require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/apiRoutes');

const port = process.env.PORT || 3001;

const app = express();

app.use('/api/', router);
app.use('/', express.static(path.join(__dirname, '..', 'client', 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
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