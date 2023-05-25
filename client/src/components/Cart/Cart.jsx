import React, { useRef, useEffect } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Link } from "react-router-dom";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import "./Cart.scss";
import { useStateContext } from "../../context/StateContext";

import {loadStripe} from '@stripe/stripe-js';
import axios from "axios";

const Cart = () => {
  
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove,
  } = useStateContext();

  const stripePromise = loadStripe(
    'pk_test_51N3buiSBtIqjvoB9h2Xbkhr75SLsVvV4V4rP1yc6T9tHsi9eYwLokTLzgYaONGj4YwwCnUefLrfd66gWPP4dWKL700qsaTEVEn'
  );
  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const res = await axios.post("http://localhost:1337/api/orders", {
        products: cartItems,
      });
      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div
      className="cart-wrapper"
      ref={cartRef}
      onClick={() => setShowCart(false)}
    >
      <div className="cart-container" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <ChevronLeftOutlinedIcon />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <ShoppingBagOutlinedIcon />
            <h3>Your shopping bag is empty</h3>
            <Link to={"/"}>
              <div className="btn-container">
                <button
                  type="button"
                  onClick={() => setShowCart(false)}
                  className="btn"
                >
                  Continue Shopping
                </button>
              </div>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="product" key={item.id}>
                <img
                  src={
                    "http://localhost:1337" +
                    item?.attributes?.img?.data?.attributes?.url
                  }
                  alt=""
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item?.attributes?.title} </h5>
                    <br />
                    <p>{item?.attributes?.desc}</p>
                    <h4>{item?.size}</h4>
                    <h4>
                      {item?.quantity} x<CurrencyRupeeIcon className="rupee" />
                      {item?.attributes?.price}
                    </h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            toggleCartItemQuanitity(item.id, item.size, "dec")
                          }
                        >
                          <RemoveOutlinedIcon />
                        </span>
                        <span className="num" onClick="">
                          {item?.quantity}
                        </span>
                        <span
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuanitity(item.id, item.size, "inc")
                          }
                        >
                          <AddOutlinedIcon />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <DeleteOutlinedIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>SUBTOTAL:</h3>
              <h3>
                <CurrencyRupeeIcon className="rupee" />
                {totalPrice}
              </h3>
            </div>
            <div className="btn-container" onClick={handlePayment}>
              <button type="button" className="btn">
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;