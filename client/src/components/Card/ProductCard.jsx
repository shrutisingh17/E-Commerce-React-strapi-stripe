import React from "react";
import "./ProductCard.scss";
import { Link } from "react-router-dom";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const ProductCard = ({ item, id }) => {
  return (
    <Link className="link" to={`/product/${id}`}>
      <div className="card">
        <div className="image">
          {item?.attributes.isNew && <span>New Season</span>}{" "}
          {/* By default it's not sending media, to see those images we're gonna be using emv file*/}
          <img
            src={`http://localhost:1337${item.attributes.img.data.attributes.url}`}
            alt=""
            className="mainImg"
          />
          <img
            src={
              `http://localhost:1337${item.attributes.img4.data.attributes.url}`
              // item.attributes?.img2?.data?.attributes?.url
              // process.env.REACT_APP_UPLOAD_URL + item.attributes?.img2?.data?.attributes?.url
            }
            alt=""
            className="secondImg"
          />
        </div>
        <h2>{item?.attributes.title}</h2>

        <div className="prices">
          <h3>
            <CurrencyRupeeIcon className="rupee" />
            {item.oldPrice || item?.attributes.price + 20}
          </h3>
          <h3>
            <CurrencyRupeeIcon className="rupee" />
            {item?.attributes.price}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
