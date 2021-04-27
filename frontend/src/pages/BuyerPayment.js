import React, { useState, useEffect } from 'react';
import { Button, Tabs, Input, Upload, message } from 'antd';
import { LCDClient, MnemonicKey, MsgSend } from '@terra-money/terra.js';
import { useLocation } from '@reach/router'
import { parse } from 'query-string'
require('dotenv').config();


const { TextArea } = Input;

function Payment() {
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [loading, setLoading] = useState(true);

  const location = useLocation();
    const searchParams = parse(location.search)
    console.log(searchParams)
  
  function handleSubmit() {
    console.log(process.env.REACT_APP_SERVER_URL);

    // create a key out of a mnemonic
    const mk = new MnemonicKey();
    const address = mk.accAddress
    console.log(address)

    //get chosen item
    let initiatedPayments = [];
    initiatedPayments.push({
        itemName: searchParams.item,
        itemPrice: searchParams.price, 
      })
    
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/buyer/newBuyer`, {
      body: JSON.stringify({
        name: buyerName,
        initiatedPayments,
        address: address,
        email: buyerEmail,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }).then((response) => {
      console.log('merchant address', response.body);
    });

    //make transaction 
    // connect to soju testnet
     const terra = new LCDClient({
        URL: 'https://soju-lcd.terra.dev',
        chainID: 'soju-0014',
    });

    // a wallet can be created out of any key
    // wallets abstract transaction building
    const wallet = terra.wallet(mk);

    // create a simple message that moves coin balances
    const send = new MsgSend(
    searchParams.address,
    address,
    { uusd: searchParams.price }
    );

    wallet
    .createAndSignTx({
        msgs: [send],
        memo: 'test from terra.js!',
    })
    .then(tx => terra.tx.broadcast(tx))
    .then(result => {
        console.log(`TX hash: ${result.txhash}`);
        setLoading(false)
    });
    /*
    if (!loading) {
    //remove from buyer
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/merchant/removeItems`, {
        body: JSON.stringify({

            itemName: item,
            itemPrice: price, 
            address: add,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
    })
    //email
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/buyer/email`, {
        body: JSON.stringify({

            itemName: item,
            itemPrice: price, 
            email,
            address: add,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
    }) 

    }
    */

  }

  return (
    <>
     
        <div className="form">
          <div style={{ fontSize: '40px',  fontWeight: '700' }}>
            Buy Item
          </div>
          <div className="contents-align">
            <div className="form-display">
              <div
                style={{
                  zIndex: '1',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  width: '30vw',
                  height: '100%',
                  padding: '0 5vw 0 5vw',
                  marginTop: '2vh',
                }}
              >
                <div style={{ fontSize: '15px', marginTop: '2vh' }}>Name</div>
                <Input
                  style={{ borderRadius: '1vw', size: 'small' }}
                  onChange={(event) => setBuyerName(event.target.value)}
                />

                <div style={{ fontSize: '15px', marginTop: '2vh' }}>Email</div>
                <Input
                  style={{ borderRadius: '1vw', size: 'small' }}
                  onChange={(event) => setBuyerEmail(event.target.value)}
                  multiple
                  text="email"
                />
                
              </div>
            </div>
          </div>
          <Button
            type="primary"
            onClick={handleSubmit}
            className="button button--secondary"
          >
            Complete Purchase 
          </Button>
        </div>
    </>
  );
}

export default Payment;
