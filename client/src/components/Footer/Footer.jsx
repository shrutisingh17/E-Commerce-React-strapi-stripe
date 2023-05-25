import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="top">
        <div className="item">
          <h1>Categories</h1>
          <span>Women</span>
          <span>Men</span>
          <span>Shoes</span>
          <span>Accessories</span>
          <span>New Arrivals</span>
        </div>
        <div className="item">
          <h1>Links</h1>
          <span>FAQ</span>
          <span>Pages</span>
          <span>Stores</span>
          <span>Compare</span>
          <span>Cookies</span>
        </div>
        <div className="item">
          <h1>About</h1>
          <span>
            At our store, we believe that fashion should be accessible to
            everyone, no matter your budget or personal style. That's why we
            offer a wide range of clothing options for men, women, and children.
            We also carry a variety of sizes and styles to ensure that everyone
            can find something that fits and flatters their body.
          </span>
        </div>
        <div className="item">
          <h1>Contact</h1>
          <span>
            Email: singhshruti1017@gmail.com <br />
            Phone: 555-555-5555 <br />
            Address: 123 Main Street, Near Big Mall, Mumbai, Maharastra, India, 764002 <br />
          </span>
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          <span className="logo">FashionInsta</span>
          <span className="copyright">
            © Copyright 2023. All Rights Reserved
          </span>
        </div>
        <div className="right">
          <img src="/img/payment.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
