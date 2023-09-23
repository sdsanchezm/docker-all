const express = require('express');
const app = express();
const port = 3001;
const mongoose = require('mongoose');

const mongoUrl = 'mongodb://127.0.0.1:27017/test';

mongoose.connect(mongoUrl, {
    family: 4,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('Error connecting to the DB:', error);
});

db.once('open', () => {
    console.log('Successfully connected to the DB!');

    app.get('/', (req, res) => {
        res.send('Yay! Server is running and connected to the DB!');
    });

    app.listen(port, () => {
        console.log(`Server listening on port ${port}!`);
    });
});
