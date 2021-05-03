import React from 'react';
import { Button, Image } from 'antd';
import {navigate} from '@reach/router';

const ItemCard = (props) => {
  const { merchant } = props;

  return (
    <div
     style={{
      backgroundColor: '#697FCB',
      display: 'flex',
      borderRadius: '3vw',
      flexDirection: 'column',
      width: '1000px',
      height: 'auto',
      marginBottom: '5vw',
      paddingBottom:'2vw'
     }}
    >
      <div
      style={{
        fontWeight:'800',
        margin: 'auto',
        marginTop: '20px',
        alignItems:'center',
        display: 'flex',
        fontSize: '30px'

      }}
      >{merchant.name}'s shop</div>
      <div
        style={{
          flexWrap: 'wrap',
          display: 'flex',
          margin:'auto',
          justifyContent: 'center'
        }}
      >
    {merchant.items.map((item, index) => (
        <div
        key={item.itemName}
        style={{
          width: 'auto',
        height: 'auto',
        backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          margin: '1.5vw',
          borderRadius: '1vw',
        padding: '0 2vw 0 2vw',
  
        }}
      >
        <Image></Image>
        <div style={{marginTop:"5px"}}>{item.itemName}</div>
        <div style={{ width: '15vw', textAlign: 'center' }}>${item.itemPrice}</div>
        <Button
          type="link"
          onClick={() => navigate(`/buyerPayment?item=${item.itemName}&price=${item.itemPrice}&email=${merchant.email}&address=${merchant.address}`)
          }
        >
          Buy Item
        </Button>
      </div>
    ))}
    </div>
    </div>
  );
};

export default ItemCard;