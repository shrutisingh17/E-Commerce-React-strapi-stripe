import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LocalMallIcon from '@mui/icons-material/LocalMall';

import { useStateContext } from '../../context/StateContext';
import { runFireworks } from './Confettti';
import './Success.scss'

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  
  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <h2 className="icon" >
          <LocalMallIcon fontSize="large"/>
        </h2>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any questions, please email
          <a className="email" href="mailto:order@example.com">
            order@example.com
          </a>
        </p>
        <Link to={"/"}>
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Success