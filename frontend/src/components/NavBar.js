import React, { useState } from 'react';
import { Link } from '@reach/router';
import Logo from './Logo'

const MenuItem = ({ children, icon = null, className = '', ...props }) => (
  <Link
    {...props}
    className={className}
    getProps={({ isPartiallyCurrent }) => ({
      className: isPartiallyCurrent ? `${className} nav-item--active` : '',
    })}
  >
    {icon}
    {children}
  </Link>
);

const Navbar = () => {
  const [current, setCurrent] = useState('mail');

  function handleClick(e) {
    setCurrent(e.key);
  }

  return (
    <header>
      <nav>
        <MenuItem icon={<Logo />} to="/" className="nav-item--primary">
          TerraPay
        </MenuItem>

        <div className="nav-item--stretch" />

        {/* <MenuItem to="/form">Form</MenuItem> */}
        <MenuItem to="/buyerChoices">Browse Items</MenuItem>
        <MenuItem to="/merchantListing">List Items</MenuItem>
      </nav>
    </header>
  );
};

export default Navbar;

