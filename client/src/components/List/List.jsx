import React from "react";
import "./List.scss";
import ProductCard from "../Card/ProductCard";
import useFetch from "../../hooks/useFetch";

const List = ({ subCats, maxPrice, sort, catId }) => {
  
  const { data, loading} = useFetch(
    `http://localhost:1337/api/products?populate=*&[filters][categories][id][$eq]=${catId}${subCats
      .map((item) => `&[filters][sub_categories][id][$eq]=${item}`)
      .join("")}&[filters][price][$lte]=${maxPrice}&_sort=price:${sort}`

    // 1st filter ,filtering the category according to selected category
  );

  return (
    <div className="list">
      {loading
        ? "loading"
        : data?.map((item) => <ProductCard item={item} id={item.id} key={item.id} />)}
    </div>
  );
};

export default List;

//filter by price filter will make website slow if we have thousands of products. So, we can create buttoms and break the size of prices.
