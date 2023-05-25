import React, { createContext, useContext, useState, useEffect } from "react";

import toast from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState();
  const [showError, setShowError] = useState(false);

  const [wishlistItems, setWishlistItems] = useState([]);

  let foundProduct;
  let index;

  const onAddToWishlist = (product) => {
    if (wishlistItems.some((item) => item.id === product.id)) {
      return;
    }
    setWishlistItems([...wishlistItems, product]);
  }; 
  const onRemoveFromWishlist = (product) => {
    const updatedWishlistItems = wishlistItems.filter(
      (item) => item.id !== product.id
    );
    setWishlistItems(updatedWishlistItems);
  };
  

  const onAdd = (product, quantity) => {
    if (!selectedSize) {
      setShowError(true);
      return;
    }

    const checkProductInCart = cartItems.find(
      (item) => item.id === product.id && item.size === selectedSize
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.attributes.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    // Update cart items state
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct.id === product.id && cartProduct.size === selectedSize)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        return cartProduct;
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      product.size = selectedSize;
      setCartItems([...cartItems, { ...product }]);
    }

    setShowError(false);
    setQty(1);
    setSelectedSize();
 
    const notify = () => toast.success(`${qty} ${product.attributes.title} added to the cart.`);
    notify();
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find(
      (item) => item.id === product.id && item.size === product.size
    );
    const newCartItems = cartItems.filter(
      (item) => item.id !== product.id || item.size !== product.size
    );

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.attributes.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  const toggleCartItemQuanitity = (id, size, value) => {
    const foundProduct = cartItems.find(
      (item) => item.id === id && item.size === size
    );
    const index = cartItems.findIndex(
      (item) => item.id === id && item.size === size
    );

    if (foundProduct) {
      const newCartItems = [...cartItems];
      let newTotalPrice = totalPrice;
      let newTotalQuantities = totalQuantities;

      if (value === "inc") {
        newCartItems[index] = {
          ...foundProduct,
          quantity: foundProduct.quantity + 1,
        };
        newTotalPrice += foundProduct.attributes.price;
        newTotalQuantities += 1;
      } else if (value === "dec") {
        if (foundProduct.quantity > 1) {
          newCartItems[index] = {
            ...foundProduct,
            quantity: foundProduct.quantity - 1,
          };
          newTotalPrice -= foundProduct.attributes.price;
          newTotalQuantities -= 1;
        } else {
          newCartItems.splice(index, 1);
          newTotalPrice -= foundProduct.attributes.price;
          newTotalQuantities -= 1;
        }
      }

      setCartItems(newCartItems);
      setTotalPrice(newTotalPrice);
      setTotalQuantities(newTotalQuantities);
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        cartItems,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        selectedSize,
        setSelectedSize,
        showError,
        setShowError,
        wishlistItems,
        setWishlistItems,
        onAddToWishlist,
        onRemoveFromWishlist
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
