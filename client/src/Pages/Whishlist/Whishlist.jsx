import React, {useEffect} from "react";
import { useStateContext } from "../../context/StateContext";
import ProductCard from "../../components/Card/ProductCard";
import "./Wishlist.scss";

const WishlistPage = () => {
  const { wishlistItems, setWishlistItems } = useStateContext();

  useEffect(() => {
    const storedWishlistItems = localStorage.getItem("wishlistItems");
    if (storedWishlistItems) {
      setWishlistItems(JSON.parse(storedWishlistItems));
    }
  }, []);

  useEffect(() => {
    if(wishlistItems?.length){
      localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
    }
  }, [wishlistItems]);


  return (
    <div className="wishlist-wrapper">
      <h1>WishList</h1>
      <div>
        {wishlistItems.length > 0 ? (
          <div className="wishlist">
            {wishlistItems.map((item) => (
              <ProductCard item={item} id={item.id} key={item.id} />
            ))}
          </div>
        ) : (
          <p>No items in wishlist.</p>
        )}
      </div>
    </div>
  );
};
export default WishlistPage;
