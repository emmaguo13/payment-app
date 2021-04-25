
//require('dotenv').config();
const mongoose = require('mongoose');
//const validator = require('validator');

const Schema = mongoose.Schema;

let Buyer = new Schema({
    name: {
        type: String,
        required: true,
    },
    initiatedPayments: {
        type: Array,
        required: true,
    },
    completedPayments: {
        type: Array,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        require:true
    }
});

module.exports = mongoose.model('Buyer', Buyer);