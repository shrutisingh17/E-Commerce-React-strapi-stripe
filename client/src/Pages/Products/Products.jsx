import React, { useState } from 'react'
import "./Products.scss"
import List from '../../components/List/List';
import { useParams } from 'react-router-dom';
import useFetch from "../../hooks/useFetch";

function Products() {

  const catId = parseInt(useParams().id)
 
  const [maxPrice, setMaxPrice] = useState(10000)
  const [sort, setSort] = useState(null)
  const [selectedSubCats, setSelectedSubCats] = useState([]);

  const { data } = useFetch(
    `http://localhost:1337/api/sub-categories?[filters][categories][id][$eq]=${catId}`  //fetching subcategory data according to category
  );

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked; //checked or not

    setSelectedSubCats(
      isChecked
        ? [...selectedSubCats, value]  // if checked we'll add that subCategory's id inside the list (selectedSubCats list)
        : selectedSubCats.filter((item) => item !== value) // not checked filtered out that id (delete that id from list)
    );
    // console.log(selectedSubCats)
  };

  return (
    <div className="products">
      <div className="left">
        <div className="filterItem">
          <h2>Product Categories</h2>
          {data?.map((item) => (
            <div className="inputItem" key={item.id}>
              <input
                type="checkbox"
                id={item.id}
                value={item.id}
                onChange={handleChange}
              />
              <label htmlFor={item.id}>{item.attributes.title}</label>
            </div>
          ))}
        </div>
        <div className="filterItem">
          <h2>Filter by price</h2>
          <div className="inputItem">
            <span>0</span>
            <input
              type="range"
              min={0}
              max={10000}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <span>{maxPrice}</span>
          </div>
        </div>
        <div className="filterItem">
          <h2>Sort by</h2>
          <div className="inputItem">
            <input
              type="radio"
              id="asc"
              value="asc"
              name="price"
              onChange={(e) => setSort("asc")}
            />
            <label htmlFor="asc">Price (Lowest first)</label>
          </div>
          <div className="inputItem">
            <input
              type="radio"
              id="desc"
              value="desc"
              name="price"
              onChange={(e) => setSort("desc")}
            />
            <label htmlFor="desc">Price (Highest first)</label>
          </div>
        </div>
      </div>
      <div className="right">
        <img
          className="catImg"
          src="/img/category.jpg"
          alt=""
        />
        <List catId={catId} maxPrice={maxPrice} sort={sort} subCats={selectedSubCats} />
      </div>
    </div>
  );
}

export default Products
