const express = require('express');
const Buyer = require('../models/Buyer.js');
const terraMoney = require('@terra-money/terra.js');
const nodemailer = require('nodemailer');
//const sha256 = require('js-sha256');
//const fs = require('fs');
require('dotenv').config();

//const { initializeWeb3 } = require('../utils/blockchainUtils');

const router = express.Router();

//create buyer address, store email, store item POST - 
//get completed transactions
//make transaction, send stuff to email 

// get completed transactions, send email
router.post('/email', async (req, res) => {
    console.log('Email');
    const { buyerEmail, merchantEmail, items, address } = req.body;

    if (!buyerEmail) {
        return res.status(400).send('Buyer email not found');
    } else if (!merchantEmail) {
        return res.status(400).send('Merchant email not found');
    } else if (!items) {
        return res.status(400).send('Items not found');
    } 

    console.log(process.env.buyerRouter)

    var transporter = nodemailer.createTransport({
        service: 'yahoo',
        auth: {
          user: 'emmag013@yahoo.ca',
          pass: process.env.EMAIL_PASS
        }
      });
      
    var mailOptions = {
        from: 'emmag013@yahoo.ca',
        to: `${buyerEmail}, ${merchantEmail}`,
        subject: 'Your Transaction was Made',
        text: `Your Order was made to ${merchantEmail}`
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });

    let buyer = await Buyer.findOne({ address });
    if (!buyer) {
        return res.status(400).send('Buyer does not exist');
    }
    for (var i = 0; i < items.length; i++) {
        buyer.completedPayments.push(items[i]);
    }
    await buyer.save();

    res.status(400)

})

// Create new user
router.post('/newBuyer', async (req, res) => {
    console.log('New Buyer');
    const { name, initiatedPayments, email, address } = req.body;

    if (!name) {
        return res.status(400).send('Name not found');
    } else if (!initiatedPayments) {
        return res.status(400).send('No items in basket');
    } else if (!email) {
        return res.status(400).send('Email not found');
    } 

    // create user 
    let newBuyer = new Buyer({
        name,
        initiatedPayments,
        completedPayments: [],
        address,
        email
    });
    await newBuyer.save();
    
    // return address
    await res.status(200).send(address)

});

// add pending transaction into database
router.post('/transaction', async (req, res) => {
    const { address, initiatedPayments } = req.body;

    let buyer = await Buyer.findOne({ address });
    if (!buyer) {
        return res.status(400).send('Buyer does not exist');
    }
    buyer.initiatedPayments = initiatedPayments;
    await buyer.save();
    res.status(200).send(JSON.stringify(buyer.initiatedPayments))
})



module.exports = router;
