import React, { useContext } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { Badge } from "@nextui-org/react";

const ProductCard = ({ product }) => {
  const { name, description, price, rating, imgUrl, id } = product;
  const { addToCart, isItemAdded, addToWishList, isItemAddedToWishList } =
    useContext(CartContext);

  return (
    <div className=" rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="h-auto">
        <div className="relative bg-pink-200 border-solid border-2 border-pink-500 h-[220px] rounded-lg">
          <button
            className="absolute top-2 right-2 p-2 rounded-full "
            onClick={() => {
              addToWishList(product);
            }}
          >
            {isItemAddedToWishList(product.id) ? (
              <FaHeart
                size={30}
                className="absolute top-2 right-2 text-red-600"
              />
            ) : (
              <FaHeart
                size={30}
                className="absolute top-2 right-2   text-white"
              />
            )}
          </button>
          <Link to={`/shop/${id}`}>
            <div className="flex justify-center items-center cover-fill">
              <img src={imgUrl} alt={name} className="" />
            </div>
          </Link>
        </div>
        <div className="p-4 bg-white h-[180px] rounded-lg">
          <h3 className="text-lg font-semibold mb-1">{name}</h3>
          <div className="flex items-center mb-2">
            <span className="text-yellow-400">⭐</span>
            <span className="ml-2 text-sm text-gray-600">{rating}</span>
          </div>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          <div className="flex items-center justify-between -my-2">
            <span className="text-xl font-bold text-pink-500">${price}</span>
            <button
              className="bg-purple-500 text-white p-2  rounded-3xl flex justify-center hover:bg-purple-600"
              onClick={() => {
                addToCart(product);
              }}
            >
              {isItemAdded(product.id) ? (
                <Badge content={isItemAdded(product.id).quantity}>
                  <FaShoppingCart size={25} />
                </Badge>
              ) : (
                <FaShoppingCart size={25} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
