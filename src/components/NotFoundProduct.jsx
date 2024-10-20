import React from "react";
import heading2 from "../images/Product Not Available.png";

const NotFoundProduct = () => {
  return (
    <div>
      <div className="bg-[#7272] flex flex-col justify-center items-center w-full h-full p-5 gap-y-6">
        <h1 className="text-8xl text-center max-sm:text-6xl">Sorry</h1>
        <img src={heading2} alt="Thank you image" />
      </div>
    </div>
  );
};

export default NotFoundProduct;
