import React from "react";
import "./CategoryCard.scss";
import { Link } from "react-router-dom";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const CategoryCard = ({ item }) => {
  return (
    <Link
      className="link"
      to={`/products/${item.attributes.categories.data[0].id}`}
    >
      <div className="card">
        <div className="image">
          {item?.attributes.isNew && <span>New Season</span>}
          <img
            src={`http://localhost:1337${item?.attributes?.img?.data?.attributes?.url}`}
            alt=""
            className="mainImg"
          />
          <img
            src={`http://localhost:1337${item?.attributes?.img4?.data?.attributes?.url}`}
            alt=""
            className="secondImg"
          />
        </div>
        <h2>{item?.attributes.title}</h2>
        {/* <h3>{item?.attributes.desc}</h3> */}
        <div className="prices">
          <h3>
            <CurrencyRupeeIcon className="rupee" />
            {item.oldPrice || item?.attributes.price + 150}
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

export default CategoryCard;
