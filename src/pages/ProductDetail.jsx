import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import NotFound from "./NotFound";
import myContext from "../context/myContext";
import { CartContext } from "../context/CartContext";
import heading1 from "../images/Heading 1 → Single Product Layout 01.png";
import heading2 from "../images/Background+Shadow(product detail).png";
import heading from "../images/Related Products.png";
import ProductsTabs from "../components/ProductsTabs";
import ProductSlider from "../components/ProductSlider";
import TopSlider from "../components/TopSlider";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { getAllProduct, loading, setLoading } = useContext(myContext);
  const {
    addToCart,
    isItemAdded,
    lessQuantityToCart,
    addToWishList,
    isItemAddedToWishList,
    cartItems,
  } = useContext(CartContext);

  const [product, setProduct] = useState("");
  console.log(product);

  const { id } = useParams();

  console.log(product);

  // getProductData
  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));
      // console.log({...productTemp.data(), id : productTemp.id})
      setProduct({ ...productTemp.data(), id: productTemp.id });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    console.log("Product ID from URL:", id);
    console.log("All Products:", getAllProduct);
  }, [getAllProduct, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!getAllProduct || getAllProduct.length === 0) {
    return <div>No products found</div>;
  }

  const icecreamproduct = getAllProduct.find((p) => p.id === id);

  if (!icecreamproduct) {
    return <NotFound />;
  }

  const { title, productImageUrl, price, description } = icecreamproduct;
  const productInCart = isItemAdded(icecreamproduct.id) || { quantity: 0 };
  const quantity = productInCart.quantity;

  const increaseQuantity = () => {
    addToCart(icecreamproduct);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      lessQuantityToCart(icecreamproduct.id);
    }
  };

  return (
    <div>
      <TopSlider image1={"Product Detail"} image2={heading2} />

      <div className="w-[75%] m-auto bg-[#dddddd86] rounded-large my-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="inline-flex justify-center items-center md:w-1/2 bg-pink-200 rounded-large">
            <img
              src={productImageUrl}
              alt={title}
              className="w-[35%] h-[60%] m-auto"
            />
          </div>

          <div className="w-full md:w-1/2 p-6 my-4">
            <h2 className="text-3xl font-semibold mb-2">{title}aa</h2>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-500 text-lg">
                {"★".repeat(Math.floor(4.2))} {/* Simulate rating stars */}
              </span>
              <span className="text-gray-500">(4.2/5)</span>
            </div>

            <p className="text-xl font-semibold mb-4">${price}</p>
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

            {quantity == 1 ? (
              <Link to={"/cart"}>
                <button className="w-1/2 py-3 bg-pink-500 text-white rounded-lg mb-4">
                  Buy Now
                </button>
              </Link>
            ) : (
              <button
                disabled
                className="w-1/2 py-3 bg-gray-700 text-white rounded-lg mb-4 "
              >
                Buy Now
              </button>
            )}

            <div className="flex justify-between text-pink-500">
              <button
                className="underline"
                onClick={() => {
                  addToWishList(icecreamproduct);
                }}
              >
                {isItemAddedToWishList(icecreamproduct.id) ? (
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

      <ProductsTabs />
      <div className="py-6">
        <ProductSlider
          mainheading={heading}
          subtext={"Choose from some of related products!"}
        />
      </div>
    </div>
  );
};

export default ProductDetail;