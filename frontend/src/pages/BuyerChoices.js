import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ItemCard from '../components/ItemCard';
import { navigate } from '@reach/router';

function UserStatus() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  //end
  const publicAddress = '0x20E43CAdC9961eDfc61170EeeF66d571C5993DFC'; // Dummy value for now
 
  useEffect(() => {
    const getData = async () => {
      let { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/merchant/getAllMerchants`
      );
      console.log(data)
      setData(data);
      setLoading(false);
    };
    getData();
  });

  return (
    <>
      <div style={{ padding: '5vw', backgroundColor: '#FFFFFF' }}>
        <div
          style={{
            width: '90vw',
            height: '100%',
            borderTopLeftRadius: '2vw',
            borderTopRightRadius: '2vw',
            padding: '3vh 5vw 3vh 5vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '0'
          }}
        >
          <h1>Items for Sale</h1>
          {loading ? (
            <div> Loading </div>
          ) : (
            data.map((merchant, index) => (
              <ItemCard merchant={merchant} />
            ))
          )}
        </div>
      </div>
    </>
  );


}

export default UserStatus;
