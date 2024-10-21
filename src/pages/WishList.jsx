import React, { useContext } from "react";
import TopSlider from "../components/TopSlider";
import heading2 from "../images/Background+Shadow(wishlist).png";
import { CartContext } from "../context/CartContext";
import { CiCircleRemove } from "react-icons/ci";

const WishList = () => {
  const { wishListItems, removeItemFromWishList, isItemAddedToWishList } =
    useContext(CartContext);

  return (
    <div>
      <TopSlider
        image1={"Wish List"}
        pagename={"Wish List"}
        link1={"/wishlist"}
      />
      <div className="container mx-auto px-4 py-8">
        {wishListItems.length === 0 ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500">
              Browse our shop and add items to your wishlist!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishListItems.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md relative"
              >
                <button
                  className="absolute z-10 top-2 right-2 p-2 rounded-full"
                  onClick={() => removeItemFromWishList(item.id)} // Use item.id here
                >
                  <CiCircleRemove
                    size={30}
                    className={`text-red-600 ${
                      isItemAddedToWishList(item.id) ? "visible" : "hidden"
                    }`}
                  />
                </button>
                <div className="relative bg-pink-200 h-[220px] flex items-center justify-center">
                  <img
                    src={item.productImageUrl}
                    alt={item.title}
                    className="max-w-[60%] max-h-[80%] object-contain"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-400">⭐</span>
                    <span className="ml-2 text-sm text-gray-600">{4.23}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-end">
                    <span className="text-xl font-bold text-pink-500">
                      ${item.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishList;
