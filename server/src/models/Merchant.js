
require('dotenv').config();
const mongoose = require('mongoose');
//const validator = require('validator');

const Schema = mongoose.Schema;

let Merchant = new Schema({
    name: {
        type: String,
        required: true,
    },
    items: {
        type: Array,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Merchant', Merchant);