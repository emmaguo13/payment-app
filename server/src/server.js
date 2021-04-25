require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const buyerRouter = require('./routes/buyerRouter.js');
const merchantRouter = require('./routes/merchantRouter.js');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const port = 4000;

mongoose.connect('mongodb+srv://emma:yut4i2xi0N9oD33N@cluster0.utnmj.mongodb.net/hi?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once('open', () => {
    console.log('DB connected successfully!');
});
db.on('error', (err) => {
    console.error(`Error while connecting to DB: ${err.message}`);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

//use auth router
// one of the below is broken
app.use('/api/buyer/', buyerRouter);
app.use('/api/merchant/', merchantRouter);
//app.use('/api/deed/', deedRouter);
//app.use('/api/request/', requestRouter)

module.exports = { app };