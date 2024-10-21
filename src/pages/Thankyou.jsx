import React from "react";
import heading1 from "../images/thankyou-image.png.png";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const Thankyou = () => {
  return (
    <div className="bg-[#f5f5f5] flex flex-col justify-center h-screen items-center gap-y-6 p-4 text-center">
      <img src={heading1} alt="Thank you image" />

      <h1 className="text-black text-9xl max-sm:text-8xl">Thank You!</h1>

      <p className="text-gray-600 px-4 sm:px-6 md:px-8 lg:px-12 max-w-lg leading-relaxed">
        We're delighted you've decided to treat yourself to our delectable ice
        creams. Your order has been received and is now being prepared with
        care.
      </p>
      <Link to={"/"}>
        <Button text={"← Back to Home"} css={"contact-btn"} />
      </Link>
    </div>
  );
};

export default Thankyou;
