import React, { useState, useEffect } from 'react';
import { Button, Tabs, Input, Upload, message } from 'antd';
import Login from './Login.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import WhiteBackground from '../components/WhiteBackground.js';
import { navigate } from '@reach/router';


const { TextArea } = Input;

function Form() {
  const [deedName, setDeedName] = useState('');
  const [granteeName, setGranteeName] = useState('');
  const [address, setAddress] = useState('');
  const [granteePhone, setGranteePhone] = useState('');
  const [propertyDescription, setPropertyDescription] = useState('');
  const [metamaskAddress, setMetamaskAddress] = useState('');
  const [toLogin, setToLogin] = useState(false);
  const [points, setPoints] = useState([]);

  function handleSubmit() {
    // setToLogin(true);
    console.log(JSON.stringify(points));
    let json = {
      title: deedName,
      data: [
        {
          label: 'Granting',
          content: `This deed is granted by the granter${granteeName}, whose mailing address is ${address}, 
        to the grantee, who is the legal owner of ${address}`,
        },
        {
          label: 'Description',
          content: propertyDescription,
        },
        {
          label: 'Location',
          content: `This property may be bounded at the following coordinates: ${JSON.stringify(
            points
          )}`,
        },
      ],
    };
    console.log(process.env.REACT_APP_SERVER_URL);
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/deed/newDeed`, {
      body: JSON.stringify({
        name: deedName,
        comments: propertyDescription,
        coordinates: points,
        address: address,
        json: json,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }).then((response) => {
      response.json();
      navigate(`/user-status`);
    });
  }

  return (
    <>
     
        <div className="form">
          <div style={{ fontSize: '40px', marginBottom: '2vh', fontWeight: '700' }}>
            Create a Listing
          </div>
          <div className="contents-align">
            <div className="form-display">
              <div
                style={{
                  position: 'absolute',
                  zIndex: '-1',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  
                }}
              >
                <WhiteBackground />
              </div>
              <div
                style={{
                  zIndex: '1',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  width: '30vw',
                  height: '100%',
                  padding: '0 5vw 0 5vw',
                  marginTop: '20vh',
                }}
              >
                <div style={{ fontSize: '15px', marginTop: '2vh' }}>Deed Name</div>
                <Input
                  style={{ borderRadius: '1vw', size: 'small' }}
                  onChange={(event) => setDeedName(event.target.value)}
                />

                <div style={{ fontSize: '15px', marginTop: '2vh' }}>Grantee Full name</div>
                <Input
                  style={{ borderRadius: '1vw', size: 'small' }}
                  onChange={(event) => setGranteeName(event.target.value)}
                  multiple
                />

                <div style={{ fontSize: '15px', marginTop: '2vh' }}>Grantee Mailing Address</div>
                <Input
                  style={{ borderRadius: '1vw', size: 'small' }}
                  onChange={(event) => setGranteePhone(event.target.value)}
                />

                <div style={{ fontSize: '15px', marginTop: '2vh' }}>Metamask Address</div>
                <Input
                  style={{ borderRadius: '1vw', size: 'small' }}
                  onChange={(event) => setAddress(event.target.value)}
                />

                <div style={{ fontSize: '15px', marginTop: '2vh' }}>Property Description</div>
                <TextArea
                  style={{ borderRadius: '1vw', size: 'small' }}
                  onChange={(event) => setPropertyDescription(event.target.value)}
                />
              </div>
            </div>
          </div>

          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit}
            className="button button--secondary"
          >
            APPLY
          </Button>
        </div>
    </>
  );
}

export default Form;
