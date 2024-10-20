import React, { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

function CartContextProvider({ children }) {
  // Initialize cart and wishlist from localStorage or as empty arrays
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishListItems, setWishListItems] = useState(() => {
    const savedWishList = localStorage.getItem("wishListItems");
    return savedWishList ? JSON.parse(savedWishList) : [];
  });

  // Use effect to update localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("wishListItems", JSON.stringify(wishListItems));
  }, [wishListItems]);

  function addToCart(item) {
    const arr = [...cartItems];
    const itemIndex = cartItems.findIndex((data) => data.id === item.id);
    if (itemIndex === -1) {
      arr.push({ ...item, quantity: 1 });
      toast.success("Added to cart");
    } else {
      arr[itemIndex].quantity++;
    }
    setCartItems(arr);
  }

  function lessQuantityToCart(id) {
    const arr = [...cartItems];
    const itemIndex = cartItems.findIndex((data) => data.id === id);
    if (itemIndex !== -1 && arr[itemIndex].quantity > 1) {
      arr[itemIndex].quantity--;
      setCartItems(arr);
    }
  }

  function removeItemFromCart(id) {
    const arr = cartItems.filter((item) => item.id !== id);
    toast.success("Item removed from cart");
    setCartItems(arr);
  }

  function isItemAdded(id) {
    return cartItems.find((item) => item.id === id) || null;
  }

  function addToWishList(item) {
    const arr = [...wishListItems];
    const itemIndex = wishListItems.findIndex((data) => data.id === item.id);
    if (itemIndex === -1) {
      arr.push({ ...item, quantity: 1 });
      toast.success("Added to wishlist");
    } else {
      removeItemFromWishList(item.id);
    }
    setWishListItems(arr);
  }

  function lessQuantityToWishList(id) {
    const arr = [...wishListItems];
    const itemIndex = wishListItems.findIndex((data) => data.id === id);
    if (itemIndex !== -1 && arr[itemIndex].quantity > 1) {
      arr[itemIndex].quantity--;
      setWishListItems(arr);
    }
  }

  function removeItemFromWishList(id) {
    const arr = wishListItems.filter((item) => item.id !== id);
    setWishListItems(arr);
  }

  function isItemAddedToWishList(id) {
    return wishListItems.find((item) => item.id === id) || null;
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishListItems,
        setCartItems,
        addToCart,
        removeItemFromCart,
        isItemAdded,
        lessQuantityToCart,
        addToWishList,
        lessQuantityToWishList,
        removeItemFromWishList,
        isItemAddedToWishList,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
