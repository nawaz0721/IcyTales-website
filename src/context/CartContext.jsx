import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [wishListItems, setWishListItems] = useState([]);

  function addToCart(item) {
    const arr = cartItems;
    // Add item to cart
    const itemIndex = cartItems.findIndex((data) => data.id == item.id);
    if (itemIndex == -1) {
      arr.push({ ...item, quantity: 1 });
      toast.success("Add to cart");
    } else {
      arr[itemIndex].quantity++;
    }
    setCartItems([...arr]);
  }

  function lessQuantityToCart(id) {
    const arr = cartItems;
    const itemIndex = cartItems.findIndex((data) => data.id == id);
    arr[itemIndex].quantity--;
    setCartItems([...arr]);
  }

  function removeItemFromCart(id) {
    const arr = cartItems;
    const itemIndex = cartItems.findIndex((data) => data.id == id);
    arr.splice(itemIndex, 1);
    toast.success("Delete cart");
    setCartItems([...arr]);
  }

  function isItemAdded(id) {
    const arr = cartItems;
    const itemIndex = cartItems.findIndex((data) => data.id == id);
    if (itemIndex == -1) {
      return null;
    } else {
      return arr[itemIndex];
    }
  }

  function addToWishList(item) {
    const arr = wishListItems;
    // Add item to wish list
    const itemIndex = wishListItems.findIndex((data) => data.id == item.id);
    if (itemIndex == -1) {
      arr.push({ ...item, quantity: 1 });
    } else {
      arr[itemIndex].quantity++;
      removeItemFromWishList();
    }
    setWishListItems([...arr]);
  }

  function lessQuantityToWishList(id) {
    const arr = wishListItems;
    const itemIndex = wishListItems.findIndex((data) => data.id == id);
    arr[itemIndex].quantity--;
    setWishListItems([...arr]);
  }

  function removeItemFromWishList(id) {
    const arr = wishListItems;
    const itemIndex = wishListItems.findIndex((data) => data.id == id);
    arr.splice(itemIndex, 1);
    setWishListItems([...arr]);
  }

  function isItemAddedToWishList(id) {
    const arr = wishListItems;
    const itemIndex = wishListItems.findIndex((data) => data.id == id);
    if (itemIndex == -1) {
      return null;
    } else {
      return arr[itemIndex];
    }
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
