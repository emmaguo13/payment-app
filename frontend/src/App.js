import React from 'react';
import { Router } from '@reach/router';
import logo from './logo.svg';

import './App.scss';

import NavBar from './components/NavBar'
import BuyerChoices from './pages/BuyerChoices'
import BuyerPayment from './pages/BuyerPayment'
import MerchantListing from './pages/MerchantListing'
import Home from './pages/Home'

function App() {
  return (
    <div className="App">
    <NavBar></NavBar>
    <Router>
      <Home path="/" />
      <BuyerChoices path="/buyerChoices" />
      <BuyerPayment path="/buyerPayment" />
      <MerchantListing path="/merchantListing" />
    </Router>
    </div>
  );
}

export default App;
