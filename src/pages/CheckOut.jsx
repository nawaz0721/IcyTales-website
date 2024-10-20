import React, { useContext, useState } from "react";
import TopSlider from "../components/TopSlider";
import heading1 from "../images/Heading 1 → Checkout.png";
import heading2 from "../images/Background+Shadow(checkout).png";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { fireDB } from "../utils/firebase";

const CheckoutForm = () => {
  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    address: "",
  });
  const neg = useNavigate();

  function sendToWhatsapp(e) {
    e.preventDefault(); // Prevent form from submitting
    const { firstName, lastName, email, address, city } = billingInfo;

    const itemsDetails = cartItems
      .map((item) => `${item.quantity} x ${item.name} @ $${item.price}`)
      .join("%0a");

    const url =
      "https://wa.me/" +
      "+923201223272" +
      "?text=" +
      "First Name: " +
      firstName +
      "%0a" +
      "Last Name: " +
      lastName +
      "%0a" +
      "Email: " +
      email +
      "%0a" +
      "Address: " +
      address +
      "%0a" +
      "City: " +
      city +
      "%0a" +
      "Items Quantity: " +
      itemsQuantity +
      "%0a" +
      "Items: %0a" +
      itemsDetails +
      "%0a" +
      "Shipping Cost: " +
      shippingCost +
      "%0a" +
      "Total Price: $" +
      (itemsPrice + shippingCost).toFixed(2);

    // Send message to WhatsApp
    window.open(url, "_blank").focus();

    // Submit order to Firebase
    submitOrderToFirebase();

    // Redirect and reset cart
    neg("/thankyou");
    setCartItems([]);
  }

  const submitOrderToFirebase = async () => {
    const orderInfo = {
      cartItems,
      billingInfo,
      email: user.email,
      userid: user.uid,
      status: "confirmed",
      time: Timestamp.now(),
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    try {
      const orderRef = collection(fireDB, "order");
      await addDoc(orderRef, orderInfo);
      setBillingInfo({
        name: "",
        address: "",
        email: "",
        city: "",
      });
      toast.success("Order Placed Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const user = JSON.parse(localStorage.getItem("users"));
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const {
    cartItems,
    addToCart,
    lessQuantityToCart,
    removeItemFromCart,
    setCartItems,
  } = useContext(CartContext);

  const shippingCost = 20.0;
  const itemsPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const itemsQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <TopSlider image1={"CheckOut"} image2={heading2} />
      <div className="flex flex-col lg:flex-row p-4 md:p-6 w-[90%] m-auto gap-6 rounded-lg">
        <div className="bg-[#7272] w-full lg:w-2/3 p-4 md:p-6 shadow-md rounded-large">
          <form onSubmit={sendToWhatsapp}>
            <h2 className="font-bold text-lg mb-4">Billing Address:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="firstName" className="block font-medium mb-1">
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={billingInfo.firstName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block font-medium mb-1">
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={billingInfo.lastName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-medium mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={billingInfo.email}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div>
                <label htmlFor="city" className="block font-medium mb-1">
                  City
                </label>
                <select
                  name="city"
                  required
                  value={billingInfo.city}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                >
                  <option value="">Select City</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Faisalabad">Faisalabad</option>
                  <option value="Peshawar">Peshawar</option>
                  <option value="Quetta">Quetta</option>
                  <option value="Multan">Multan</option>
                  <option value="Sialkot">Sialkot</option>
                  <option value="Hyderabad">Hyderabad</option>
                </select>
              </div>
              <div>
                <label htmlFor="Address" className="block font-medium mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={billingInfo.address}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 w-[200%] max-sm:w-full max-md:w-full "
                />
              </div>
            </div>
            <h2 className="font-bold text-lg mb-4">Payment Method:</h2>
            <div className="mb-6">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  required
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="mr-2"
                />
                <label className="font-medium">Cash on Delivery</label>
              </div>
            </div>
            <div className="text-xs text-center mb-4">
              By clicking the button, you agree to the{" "}
              <a href="/terms" className="text-pink-600">
                Terms and Conditions
              </a>
              <button
                type="submit"
                className="bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-full my-4 w-full font-semibold flex justify-center items-center"
              >
                Place Order Now <span className="ml-2">→</span>
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary Section */}
        <div className="shadow-md rounded-large p-6 w-full lg:w-1/3 mx-auto h-full">
          <div className="flex justify-between">
            <h3 className="font-bold text-lg mb-4">Items</h3>
            <span className="font-semibold">Price</span>
          </div>

          <hr className="mb-4" />

          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between mb-3">
              <h4 className="font-bold text-lg">
                {item.quantity} x {item.title}
              </h4>
              <p className="text-gray-500 text-sm">${item.price}</p>
            </div>
          ))}

          <hr className="mb-4" />

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

          <Link to={"/cart"}>
            <span className="text-red-700 font-bold">← Back to Cart</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;

