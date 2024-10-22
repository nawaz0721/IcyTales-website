import React, { useContext } from "react";
import Slider from "react-slick";
import {
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import product2 from "../images/Figure → classic-image2.png.png";
import product4 from "../images/Figure → classic-image4.png.png";
import product6 from "../images/Figure → seller-image2.png.png";
import product14 from "../images/popular-image2.png.png";
import product16 from "../images/flover-image1.png.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "./Button";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { auth } from "../utils/firebase";
import toast from "react-hot-toast";
import { MyContext } from "../context/MyState";

const NextArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-pink-500 p-2 rounded-full shadow-lg hover:bg-pink-600 transition"
    onClick={onClick}
  >
    <FaChevronRight size={20} color="white" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 left-2 z-10 transform -translate-y-1/2 bg-pink-500 p-2 rounded-full shadow-lg hover:bg-pink-600 transition"
    onClick={onClick}
  >
    <FaChevronLeft size={20} color="white" />
  </button>
);

const ProductSlider = ({ mainheading, subtext }) => {
  const settings = {
    dots: false, // Removed dots
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />, // Custom Next Arrow
    prevArrow: <PrevArrow />, // Custom Prev Arrow
    responsive: [
      {
        breakpoint: 1024, // For tablets and desktops
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // For small tablets and large phones
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // For mobile devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false, // Hide arrows on mobile for better UX
        },
      },
    ],
  };

  const { addToCart, isItemAdded, addToWishList, isItemAddedToWishList } =
    useContext(CartContext);

  const context = useContext(MyContext);
  const { getAllProduct, loading } = context;

  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className=" ">
      <div className="text-center mb-12">
        <h1 className="text-7xl text-center max-sm:text-4xl my-4">
          {mainheading}
        </h1>
        <p className="text-gray-600 text-lg">{subtext}</p>
      </div>

      <div className="">
        <Slider {...settings}>
          {getAllProduct.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg transition-transform hover:scale-105 duration-300 mx-4 p-6"
            >
              <div className="relative bg-pink-200 border border-pink-200 h-60 rounded-lg overflow-hidden mb-6">
                <button
                  className="absolute top-2 right-2 p-2 rounded-full "
                  onClick={() => {
                    {
                      if (auth.currentUser) {
                        if (auth.currentUser.email !== "admin@gmail.com") {
                          addToWishList(product);
                        } else {
                          toast.error("Admin can not to add washlist");
                        }
                      } else {
                        toast.error("Please login to add to wishlist");
                        navigate("/login");
                      }
                    }
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
                <Link to={`/shop/${product.id}`}>
                  <div className="flex justify-center items-center h-full">
                    <img
                      src={product.productImageUrl}
                      alt={product.name}
                      className="h-full object-cover"
                    />
                  </div>
                </Link>
              </div>

              {/* Product Info Section */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={`text-lg ${
                          index < Math.floor(4.2)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">(4.2/5)</span>
                  </div>

                  {/* Price */}
                  <p className="text-pink-500 text-xl font-semibold">
                    ${product.price}
                  </p>
                </div>

                {/* Add to Cart Button */}
                <div className="w-auto m-auto flex justify-center mt-4">
                  <button
                    className="w-1/2 py-3 bg-pink-500 text-white rounded-lg mb-4"
                    onClick={() => {
                      {
                        if (auth.currentUser) {
                          if (auth.currentUser.email !== "admin@gmail.com") {
                            addToCart(product);
                          } else {
                            toast.error("Admin can not to add cart");
                          }
                        } else {
                          toast.error("Please login to add to cart");
                          navigate("/login");
                        }
                      }
                    }}
                  >
                    {isItemAdded(product.id)
                      ? `Added (${isItemAdded(product.id).quantity})`
                      : `Add to Cart`}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductSlider;
