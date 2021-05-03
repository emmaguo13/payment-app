const express = require("express");
const Merchant = require("../models/Merchant");

const router = express.Router();

// Create merchant
router.post("/newMerchant", async (req, res) => {
  const { name, items, email, address } = req.body;

  if (!name) {
    return res.status(400).send("Name not found");
  } else if (!items) {
    return res.status(400).send("No items added");
  } else if (!email) {
    return res.status(400).send("Email not found");
  } else if (!address) {
    return res.status(400).send("No address found");
  }

  let merchant = await Merchant.findOne({ email });
  console.log(merchant);
  if (merchant) {
    console.log("found same merchant");
    merchant.items.push(items);
    await merchant.save();
  } else {
    // create merchant
    let newMerchant = new Merchant({
      name,
      items,
      address,
      email,
    });
    await newMerchant.save();
  }

  // return address
  await res.status(200).send(address);
});

// add items
router.post("/addItems", async (req, res) => {
  const { items, address } = req.body;

  let merchant = await Merchant.findOne({ address });
  if (!merchant) {
    return res.status(400).send("Merchant does not exist");
  }

  merchant.items.push(items[i]);

  await merchant.save();
  await res.status(200).send(address);
});

// remove items
router.post("/removeItems", async (req, res) => {
  const { itemName, itemPrice, address } = req.body;

  let merchant = await Merchant.findOne({ address });
  if (!merchant) {
    return res.status(400).send("Merchant does not exist");
  }
  let newItems = [];
  for (let i = 0; i < merchant.items.length; i++) {
    if (
      merchant.items.itemName != itemName ||
      merchant.items.itemPrice != itemPrice
    ) {
      newItems.push(merchant.items[i]);
    }
  }

  merchant.items = newItems;
  await merchant.save();
  await res.status(200).send(address);
});

// get items
router.get("/getItems", async (req, res) => {
  const { address } = req.body;

  let merchant = await Merchant.findOne({ address });
  if (!merchant) {
    return res.status(400).send("Merchant does not exist");
  }

  await res.status(200).send(merchant.items);
});

// get all merchants
router.get("/getAllMerchants", async (req, res) => {
  let merchant = await Merchant.find();
  if (!merchant) {
    return res.status(400).send("Merchants do not exist");
  }

  await res.status(200).send(merchant);
});

// get email
router.get("/getEmail", async (req, res) => {
  const { address } = req.body;

  let merchant = await Merchant.findOne({ address });
  if (!merchant) {
    return res.status(400).send("Merchant does not exist");
  }

  await res.status(200).send(merchant.email);
});

module.exports = router;
