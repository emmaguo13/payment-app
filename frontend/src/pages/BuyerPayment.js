import React, { useState, useEffect } from "react";
import { Button, Tabs, Input, Upload, message } from "antd";
import { LCDClient, MnemonicKey, MsgSend, Coin } from "@terra-money/terra.js";
import { useLocation } from "@reach/router";
import { parse } from "query-string";
require("dotenv").config();

const { TextArea } = Input;

function Payment() {
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [loading, setLoading] = useState(true);
  const [generatedAddress, setGeneratedAddress] = useState();
  const [generatedMk, setGeneratedMk] = useState();

  const location = useLocation();
  const searchParams = parse(location.search);
  console.log(searchParams);

  function handleGenerate() {
    // create a key out of a mnemonic
    const mk = new MnemonicKey();
    const address = mk.accAddress;
    setGeneratedAddress(address);
    setGeneratedMk(mk);
    console.log(address);

    //get chosen item
    let initiatedPayments = [];
    initiatedPayments.push({
      itemName: searchParams.item,
      itemPrice: searchParams.price,
    });

    fetch(`${process.env.REACT_APP_SERVER_URL}/api/buyer/newBuyer`, {
      body: JSON.stringify({
        name: buyerName,
        initiatedPayments,
        address: address,
        email: buyerEmail,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  }

  function handleSubmit() {
    console.log(process.env.REACT_APP_SERVER_URL);

    //make transaction
    // connect to soju testnet
    const terra = new LCDClient({
      URL: "https://lcd.terra.dev",
      chainID: "columbus-3",
    });

    // terra.market.swapRate(new Coin('uluna', 10000), 'ukrw').then(c => console.log(c.toString()))

    // a wallet can be created out of any key
    // wallets abstract transaction building
    const wallet = terra.wallet(generatedMk);

    // create a simple message that moves coin balances
    const send = new MsgSend(generatedAddress, searchParams.address, {
      uluna: searchParams.price,
      ukrw: 0,
      uusd: 0,
    });

    wallet
      .createAndSignTx({
        msgs: [send],
        memo: "test from terra.js!",
      })
      .then((tx) => terra.tx.broadcast(tx))
      .catch((error) => console.log(error))
      .then((result) => {
        console.log(`TX hash: ${result.txhash}`);
        setLoading(false);
      });

    if (!loading) {
      //remove from merchant
      fetch(`${process.env.REACT_APP_SERVER_URL}/api/merchant/removeItems`, {
        body: JSON.stringify({
          itemName: searchParams.item,
          itemPrice: searchParams.price,
          address: searchParams.address,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      //email
      fetch(`${process.env.REACT_APP_SERVER_URL}/api/buyer/email`, {
        body: JSON.stringify({
          buyerEmail: buyerEmail,
          merchantEmail: searchParams.email,
          items: {
            itemName: searchParams.item,
            itemPrice: searchParams.price,
          },
          address: generatedAddress,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
    }
  }

  return (
    <>
      <div className="form">
        <div style={{ fontSize: "40px", fontWeight: "700" }}>Buy Item</div>
        <div className="contents-align">
          <div className="form-display">
            <div
              style={{
                zIndex: "1",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                width: "30vw",
                height: "100%",
                padding: "0 5vw 0 5vw",
                marginTop: "2vh",
              }}
            >
              <div style={{ fontSize: "15px", marginTop: "2vh" }}>Name</div>
              <Input
                style={{ borderRadius: "1vw", size: "small" }}
                onChange={(event) => setBuyerName(event.target.value)}
              />

              <div style={{ fontSize: "15px", marginTop: "2vh" }}>Email</div>
              <Input
                style={{ borderRadius: "1vw", size: "small" }}
                onChange={(event) => setBuyerEmail(event.target.value)}
                multiple
                text="email"
              />
              <div style={{ fontSize: "15px", marginTop: "2vh" }}>
                {generatedAddress}
              </div>
            </div>
          </div>
        </div>
        {generatedAddress ? (
          <Button
            type="primary"
            onClick={handleSubmit}
            className="button button--secondary"
          >
            Submit Purchase
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={handleGenerate}
            className="button button--secondary"
          >
            Generate Address
          </Button>
        )}
      </div>
    </>
  );
}

export default Payment;
