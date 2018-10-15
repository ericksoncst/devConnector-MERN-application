const express = require('express');
const mongoose = require('mongoose');

const app = express();

// db config
const db = require('./config/keys').mongoURI;

// connect to mongo
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('HELOO!!') );

const port = process.env.PORT || 5000;

app.listen(port, () =>  console.log(`Server is running on ${port}`));