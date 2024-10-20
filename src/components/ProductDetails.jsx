import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const ProductDetails = ({ product }) => {
  const navigate = useNavigate();
  const {
    addToCart,
    isItemAdded,
    lessQuantityToCart,
    addToWishList,
    isItemAddedToWishList,
  } = useContext(CartContext);

  const { name, description, price, image, rating } = product;
  const productInCart = isItemAdded(product.id) || { quantity: 0 }; // Handle case when product is not yet in cart
  const quantity = productInCart.quantity;

  const increaseQuantity = () => {
    addToCart(product);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      lessQuantityToCart(product.id);
    }
  };

  return (
    <div className="w-[75%] m-auto bg-[#dddddd86] rounded-large my-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="inline-flex justify-center items-center md:w-1/2 bg-pink-200 rounded-large">
          <img src={image} alt={name} className="w-[35%] h-[60%] m-auto " />
        </div>

        <div className="w-full md:w-1/2 p-6 my-4 ">
          <h2 className="text-3xl font-semibold mb-2">{name}</h2>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-yellow-500 text-lg">
              {"★".repeat(Math.floor(rating))}
            </span>
            <span className="text-gray-500">({rating}/5)</span>
          </div>

          <p className="text-xl font-semibold mb-4">${price.toFixed(2)}</p>
          <p className="text-gray-700 mb-6">{description}</p>

          <div className="flex items-center gap-4 mb-6">
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
              onClick={decreaseQuantity}
              disabled={quantity === 0}
            >
              -
            </button>
            <span className="text-lg">{quantity}</span>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
              onClick={increaseQuantity}
            >
              +
            </button>
          </div>

          <Link to={"/cart"}>
            <button className="w-1/2 py-3 bg-pink-500 text-white rounded-lg mb-4">
              Buy Now
            </button>
          </Link>

          <div className="flex justify-between text-pink-500">
            <button
              className="underline"
              onClick={() => {
                addToWishList(product);
              }}
            >
              {isItemAddedToWishList(product.id) ? (
                <span>Remove from wishlist</span>
              ) : (
                <span className="flex items-center">
                  <FaHeart className="text-pink-700" size={18} /> Add to
                  Wishlist
                </span>
              )}
            </button>

            <button
              className="underline"
              onClick={() => {
                navigate("/shop");
              }}
            >
              Back to shop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
