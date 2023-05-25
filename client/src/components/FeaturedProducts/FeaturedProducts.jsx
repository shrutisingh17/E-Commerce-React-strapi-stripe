import React from "react";
import CategoryCard from "../Card/CategoryCard";
import "./FeaturedProducts.scss";
import useFetch from "../../hooks/useFetch";

const FeaturedProducts = ({ type, para }) => {
  const { data, loading, error } = useFetch(
    `http://localhost:1337/api/products?populate=*&[filters][type][$eq]=${type}`
  );
 
  return (
    <div className="featuredProducts">
      <div className="top">
        <h1>{type} products</h1>
        <p>
          {para}
        </p>
      </div>
      <div className="bottom">
        {error
          ? "Something went wrong!"
          : loading
          ? "loading"
          : data?.map((item) => <CategoryCard item={item} key={item.id} />)}
      </div>
    </div>
  );
};

export default FeaturedProducts;
