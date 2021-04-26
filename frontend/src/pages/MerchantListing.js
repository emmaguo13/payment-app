import React, { useState, useEffect } from 'react';
import { Button, Tabs, Input, Upload, message } from 'antd';
import { LCDClient, MnemonicKey } from '@terra-money/terra.js';
import { navigate } from '@reach/router';
require('dotenv').config();


const { TextArea } = Input;

function Form() {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerEmail, setSellerEmail] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  

  function handleSubmit() {
    console.log(process.env.REACT_APP_SERVER_URL);

    // create a key out of a mnemonic
    const mk = new MnemonicKey();
    const address = mk.accAddress
    console.log(address)
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/merchant/newMerchant`, {
      body: JSON.stringify({
        name: sellerName,
        items: {
          itemName,
          itemPrice, 
          selectedFile,
        },
        address: address,
        email: sellerEmail,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }).then((response) => {
      console.log('merchant address', response.body);
      navigate(`/buyerPayment`);
    });
  }

  function fileSelectedHandler(e) {
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  }

  return (
    <>
     
        <div className="form">
          <div style={{ fontSize: '40px',  fontWeight: '700' }}>
            Create a Listing
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
                <div style={{ fontSize: '15px', marginTop: '2vh' }}>Seller Name</div>
                <Input
                  style={{ borderRadius: '1vw', size: 'small' }}
                  onChange={(event) => setSellerName(event.target.value)}
                />

                <div style={{ fontSize: '15px', marginTop: '2vh' }}>Email</div>
                <Input
                  style={{ borderRadius: '1vw', size: 'small' }}
                  onChange={(event) => setSellerEmail(event.target.value)}
                  multiple
                  text="email"
                />

                <div style={{ fontSize: '15px', marginTop: '2vh' }}>Item Name</div>
                <Input
                  style={{ borderRadius: '1vw', size: 'small' }}
                  onChange={(event) => setItemName(event.target.value)}
                  multiple
                />

                <div style={{ fontSize: '15px', marginTop: '2vh' }}>Item Price</div>
                <Input
                  style={{ borderRadius: '1vw', size: 'small' }}
                  onChange={(event) => setItemPrice(event.target.value)}
                  multiple
                />
                
                <div style={{ fontSize: '15px', marginTop: '2vh' }}>Item Image</div>
                <input
                  style={{ marginLeft:'13vw', size: 'small' }}
                  // onChange={(event) => setItemPrice(event.target.value)}
                  // multiple
                  type="file"
                  onChange={fileSelectedHandler}
                />

              </div>
            </div>
          </div>
          <Button
            type="primary"
            onClick={handleSubmit}
            className="button button--secondary"
          >
            Apply 
          </Button>
        </div>
    </>
  );
}

export default Form;
