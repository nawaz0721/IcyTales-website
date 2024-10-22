import React, { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import TopSlider from "../components/TopSlider";
import heading2 from "../images/Background+Shadow(cart).png";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ShoppingCart = () => {
  const { cartItems, addToCart, lessQuantityToCart, removeItemFromCart } =
    useContext(CartContext);

  const shippingCost = 20.0;
  const itemsPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const itemsQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const navigate = useNavigate();

  // localStorage update (optional, might already be handled by CartContext)
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <>
      <TopSlider image1={"Cart"} pagename={"Cart"} link1={"/cart"} />

      {cartItems.length >= 1 ? (
        <div className="shopping-cart flex flex-col lg:flex-row justify-between gap-10 p-6 w-[90%] mx-auto">
          {/* Cart Items Section */}
          <div className="cart-items flex-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-xl">Shopping Cart</h2>
              <div className="font-semibold text-lg">
                ({cartItems.length} Items)
              </div>
            </div>
            <hr className="mb-4" />
            <div className="hidden md:flex h-10 gap-10 items-center">
              <h1 className="font-semibold w-[45%] ">Product Details</h1>
              <h1 className="font-semibold w-20">Price</h1>
              <h1 className="font-semibold w-36">Quantity</h1>
              <h1 className="font-semibold ">Total</h1>
            </div>
            <hr className="mb-4" />

            {cartItems.map((item) => (
              <div
                key={item.id} // Use item.id instead of index as key
                className="cart-item flex flex-col md:flex-row gap-4 mb-6"
              >
                <div className="flex gap-5 items-center w-full md:w-3/5">
                  <img
                    src={item.productImageUrl}
                    alt={item.title}
                    className="w-24 h-24 object-fill bg-pink-100 p-2"
                  />
                  <div className="flex-1">
                    <h3 className="item-details font-bold text-pink-500">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="flex justify-between w-full md:w-auto md:gap-8">
                  <div className="item-price font-semibold">${item.price}</div>

                  <div className="w-36 flex justify-center items-center">
                    <button
                      className="font-semibold border rounded-l-large px-2 h-8 w-8"
                      onClick={() => lessQuantityToCart(item.id)}
                      disabled={item.quantity === 1}
                      title={
                        item.quantity === 1 ? "Cannot decrease further" : ""
                      }
                    >
                      -
                    </button>
                    <span className="font-semibold border px-2 h-8 w-12 flex justify-center items-center">
                      {item.quantity}
                    </span>
                    <button
                      className="font-semibold border px-2 rounded-r-large h-8 w-8"
                      onClick={() => addToCart(item)}
                    >
                      +
                    </button>
                  </div>

                  {/* Total Price */}
                  <div className="font-semibold text-center">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button
                    className="text-red-500 font-bold ml-4 border rounded-full p-3"
                    onClick={() => removeItemFromCart(item.id)}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}

            <Link to={"/shop"}>
              <span className="text-red-700 font-bold block mt-4">
                ← Continue Shopping
              </span>
            </Link>
          </div>

          {/* Order Summary */}
          <div className="order-summary bg-white shadow-md rounded-large p-6 h-full w-full md:w-2/5 lg:w-2/6">
            <h3 className="font-bold text-lg text-center mb-4">
              Order Summary
            </h3>

            <hr className="mb-4" />

            <div className="text-sm mb-2 font-semibold">Product Details:</div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Sub Total</span>
              <span className="font-bold">${itemsPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-400">Shipping</span>
              <span className="font-bold">${shippingCost.toFixed(2)}</span>
            </div>

            <hr className="mb-4" />

            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Grand Total</span>
              <span className="text-pink-600">
                ${(itemsPrice + shippingCost).toFixed(2)}
              </span>
            </div>
            <Link to={"/checkout"}>
              <button className="bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-3xl w-full font-semibold flex justify-center items-center">
                Proceed to checkout <span className="ml-2">→</span>
              </button>
            </Link>

            <div className="mt-4 text-gray-500 text-center text-xs flex items-center justify-center">
              🛡️ Safe and Secure Payments, Easy Returns. 100% Authentic Products
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-semibold my-4">Your Cart is empty</h2>
          <p className="text-gray-500 my-4">
            Browse our shop and add items to the cart!
          </p>
          <Link to={"/shop"}>
            <span className="text-pink-600 font-bold my-10 mb-10">
              Go to Shop →
            </span>
          </Link>
        </div>
      )}
    </>
  );
};

export default ShoppingCart;
