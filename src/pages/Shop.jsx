import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import TopSlider from "../components/TopSlider";
import heading2 from "../images/Background+Shadow(shop).png";
import NotFoundProduct from "../components/NotFoundProduct";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { Badge } from "@nextui-org/react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import toast from "react-hot-toast";
import myContext from "../context/myContext.jsx";

const categories = [
  { name: "All" },
  { name: "Canned Ice Cream" },
  { name: "Ice Cream Pints" },
  { name: "Ice Cream Cake" },
  { name: "Sundaes" },
  { name: "Ice Cream Gelato" },
  { name: "Kulfi" },
  { name: "Sherbet" },
  { name: "Frozen Yogurt" },
  { name: "Frozen Custard" },
  { name: "Soft Serve" },
];

const ITEMS_PER_PAGE = 6;

const IceCreamShop = () => {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { getAllProduct, loading } = context;

  const {
    addToCart,
    isItemAdded,
    addToWishList,
    isItemAddedToWishList,
    cartItems,
    setCartItems, // Ensure you have a setCartItems function in your CartContext
  } = useContext(CartContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([5, 20]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCartItems = localStorage.getItem("cart");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  // Sync cartItems to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (getAllProduct.length > 0) {
      filterProducts();
    }
  }, [getAllProduct, searchTerm, selectedCategory, priceRange]);

  const filterProducts = () => {
    const filtered = getAllProduct.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearchTerm = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesPriceRange =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesCategory && matchesSearchTerm && matchesPriceRange;
    });
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to page 1 after filtering.
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleCategoryClick = (category) => setSelectedCategory(category);
  const handlePriceChange = (e) =>
    setPriceRange([Number(e.target.value), priceRange[1]]);
  const handlePageChange = (page) => setCurrentPage(page);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log("User is signed In");
      // ...
    } else {
      // User is signed out
      console.log("User is signed out");
      // ...
    }
  });
  console.log(auth.currentUser?.email);

  return (
    <>
      <TopSlider image1={"Shop"} pagename={"Shop"} link1={"/shop"} />
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4 ">
            <div className="mb-8 ">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Categories Filter */}
            <h2 className="text-2xl font-semibold mb-4">Categories</h2>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.name}>
                  <button
                    onClick={() => handleCategoryClick(category.name)}
                    className={`w-full text-left px-4 py-2 rounded-lg ${
                      selectedCategory === category.name
                        ? "bg-pink-500 text-white"
                        : "bg-gray-100 text-gray-800"
                    } hover:bg-pink-400 hover:text-white`}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>

            {/* Price Filter */}
            <h2 className="text-2xl font-semibold mt-6 mb-4">
              Filter By Price
            </h2>
            <div className="flex items-center justify-between">
              <span>${priceRange[0]}</span>
              <input
                type="range"
                min="5"
                max="20"
                value={priceRange[0]}
                onChange={handlePriceChange}
                className="mx-4"
              />
              <span>${priceRange[1]}</span>
            </div>
          </div>

          <div className="w-full md:w-3/4">
            {loading ? (
              <div className="text-center py-10">Loading products...</div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedProducts.length > 0 ? (
                    displayedProducts.map((data) => {
                      const { title, price, productImageUrl, description, id } =
                        data;
                      return (
                        <div
                          key={id} // Use id as key
                          className="rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
                        >
                          <div className="h-auto">
                            <div className="relative flex justify-center bg-pink-200 border-solid border-2 border-pink-500 h-[220px] rounded-lg">
                              <button
                                className="absolute top-2 right-2 p-2 rounded-full "
                                onClick={() => {
                                  {
                                    if (auth.currentUser) {
                                      if (
                                        auth.currentUser.email !==
                                        "admin@gmail.com"
                                      ) {
                                        addToWishList(data);
                                      } else {
                                        toast.error(
                                          "Admin can not to add washlist"
                                        );
                                      }
                                    } else {
                                      toast.error(
                                        "Please login to add to wishlist"
                                      );
                                      navigate("/login");
                                    }
                                  }
                                }}
                              >
                                {isItemAddedToWishList(data.id) ? (
                                  <FaHeart
                                    size={30}
                                    className="absolute top-2 right-2 text-red-600"
                                  />
                                ) : (
                                  <FaHeart
                                    size={30}
                                    className="absolute top-2 right-2 text-slate-500"
                                  />
                                )}
                              </button>
                              <Link to={`/shop/${id}`}>
                                <img
                                  src={productImageUrl}
                                  alt={title}
                                  className="h-[200px] object-cover "
                                />
                              </Link>
                            </div>

                            <div className="p-4 bg-white">
                              <h3 className="text-lg font-semibold mb-1">
                                {title}
                              </h3>
                              <p className="text-gray-600 text-sm mb-4">
                                {description}
                              </p>
                              <div className="flex justify-between">
                                <span className="text-xl font-bold text-pink-500">
                                  ${price}
                                </span>

                                <button
                                  className="bg-purple-500 text-white p-2 rounded-3xl flex justify-center hover:bg-purple-600"
                                  onClick={() => {
                                    if (auth.currentUser) {
                                      if (
                                        auth.currentUser.email !==
                                        "admin@gmail.com"
                                      ) {
                                        addToCart(data);
                                      } else {
                                        toast.error(
                                          "Admin can not to add cart"
                                        );
                                      }
                                    } else {
                                      toast.error(
                                        "Please login to add to cart"
                                      );
                                      navigate("/login");
                                    }
                                  }}
                                >
                                  {isItemAdded(data.id) ? (
                                    <Badge
                                      content={isItemAdded(data.id).quantity}
                                    >
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
                    })
                  ) : (
                    <div className="w-full h-full p-5">
                      <NotFoundProduct />
                    </div>
                  )}
                </div>
                {/* Pagination */}
                <div className="flex justify-center mt-6 space-x-2">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === index + 1
                          ? "bg-pink-500 text-white"
                          : "bg-gray-100 text-gray-800"
                      } hover:bg-pink-400 hover:text-white`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default IceCreamShop;
