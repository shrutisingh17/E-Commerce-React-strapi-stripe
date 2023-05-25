import React, { useState } from "react";
import "./Product.scss";

import RelatedProducts from "./RelatedProducts";

import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { useStateContext } from "../../context/StateContext";
import { Toaster } from "react-hot-toast";

function Product() {
  const {
    notify,
    decQty,
    incQty,
    qty,
    onAdd,
    wishlistItems,
    onAddToWishlist,
    onRemoveFromWishlist,
    selectedSize,
    setSelectedSize,
    showError,
    setShowError,
  } = useStateContext();

  const id = useParams().id;
  const [selectedImg, setSelectedImg] = useState("img");

  const { data, loading } = useFetch(
    `http://localhost:1337/api/products/${id}?populate=*`
  );

  const percentageDiscount =
    (((data?.oldPrice || data?.attributes?.price + 50) -
      data?.attributes?.price) /
      (data?.oldPrice || data?.attributes?.price + 50)) *
    100;
  const discount = percentageDiscount.toFixed(0);

  const isProductInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };  

  return (
    <>
      <div className="product">
        {loading ? (
          "loading"
        ) : (
          <>
            <div className="left">
              <div className="images">
                <img
                  src={`http://localhost:1337${data?.attributes?.img?.data?.attributes?.url}`}
                  alt=""
                  onClick={(e) => setSelectedImg("img")}
                />
                <img
                  src={`http://localhost:1337${data?.attributes?.img2?.data?.attributes?.url}`}
                  alt=""
                  onClick={(e) => setSelectedImg("img2")}
                />
                <img
                  src={`http://localhost:1337${data?.attributes?.img3?.data?.attributes?.url}`}
                  alt=""
                  onClick={(e) => setSelectedImg("img3")}
                />
                <img
                  src={`http://localhost:1337${data?.attributes?.img4?.data?.attributes?.url}`}
                  alt=""
                  onClick={(e) => setSelectedImg("img4")}
                />
              </div>
              <div className="mainImg">
                <img
                  src={
                    `http://localhost:1337${data?.attributes[selectedImg]?.data?.attributes?.url}`
                    // process.env.REACT_APP_UPLOAD_URL +
                    // data?.attributes[selectedImg]?.data?.attributes?.url
                  }
                  alt=""
                />
              </div>
            </div>
            <div className="right">
              <h1>{data?.attributes?.title}</h1>
              <h3>{data?.attributes?.subTitle}</h3>
              <hr />
              <span className="price">
                <h3>
                  <CurrencyRupeeIcon className="rupee" />
                  {data?.oldPrice || data?.attributes?.price + 50}
                </h3>
                <h3>
                  <CurrencyRupeeIcon className="rupee" />
                  {data?.attributes?.price}
                </h3>
                <h4>({discount}% OFF)</h4>
              </span>
              <h5>inclusive of all taxes</h5>
              <p>{data?.attributes?.desc}</p>

              {/* PRODUCT SIZE RANGE START */}
              <div className="size-chart-container">
                <div className="size-chart-heading">
                  <div className="size-chart-select">
                    <div className="size-chart-select-size">Select Size</div>
                    <div className="size-chart-select-guide">Size Guide</div>
                  </div>
                </div>
                <div className="size-chart-sizes">
                  {data?.attributes?.size.data.map((item, i) => (
                    <div
                      key={i}
                      className={`size-chart-size ${
                        item.enabled ? "" : "size-chart-size-disabled"
                      } ${
                        selectedSize === item.size
                          ? "size-chart-size-selected"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedSize(item.size);
                        setShowError(false);
                      }}
                    >
                      {item.size}
                    </div>
                  ))}
                </div>
                {showError && (
                  <div className="size-chart-error">
                    Size selection is required
                  </div>
                )}
              </div>
              {/* PRODUCT SIZE RANGE END */}
              
              <div className="quantity">
                <button onClick={decQty}>
                  {" "}
                  <RemoveOutlinedIcon />{" "}
                </button>
                {qty}
                <button onClick={incQty}>
                  {" "}
                  <AddOutlinedIcon />{" "}
                </button>
              </div>
              <div className="items">
                <button className="add" onClick={() => onAdd(data, qty)}>
                  <AddShoppingCartIcon /> ADD TO CART
                </button>
                <Toaster toastOptions={{ duration: 2000}}/>
                
                {isProductInWishlist(data?.id) ? (
                  <button
                    className="wish"
                    onClick={() => onRemoveFromWishlist(data)}
                  >
                    <FavoriteIcon /> REMOVE FROM WISHLIST
                  </button>
                ) : (
                  <button
                    className="wish"
                    onClick={() => onAddToWishlist(data)}
                  >
                    <FavoriteBorderIcon /> ADD TO WISHLIST
                  </button>
                )}

                {/* <button className="wish" onClick={() => onAddToWishlist(data)}>
                  <FavoriteBorderIcon /> ADD TO WISH LIST
                </button> */}
              </div>
              <div className="details">
              <div className="info">
                <span>DESCRIPTION</span>
                <span>
                  <ReactMarkdown>{data?.attributes?.details}</ReactMarkdown>
                </span>
              </div>
              <div className="info">
                <p>Standard delivery in 2-7 days</p>
                <p>Pay on delivery might be available</p>
                <p>Easy 14 days returns and exchanges</p>
              </div>
              </div>
              <div className="info">
                <span>PRODUCT DETAILS </span>
                <span>Vendor: Polo</span>
                <span>
                  Product Type:{" "}
                  {data?.attributes?.sub_categories?.data[0]?.attributes?.title}
                </span>
                <span>
                  Tag:{" "}
                  {data?.attributes?.sub_categories?.data[0]?.attributes?.title}
                  , {data?.attributes?.categories?.data[0]?.attributes?.title},{" "}
                  {data?.attributes?.sub_categories?.data[1]?.attributes?.title}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="bottom">
        <RelatedProducts
          productId={data?.id}
          categoryId={data?.attributes?.categories?.data[0]?.id}
        />
      </div>
    </>
  );
}
export default Product;
