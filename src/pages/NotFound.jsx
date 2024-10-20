import React from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <div className="bg-[#7272] flex flex-col justify-center items-center h-screen gap-y-6">
        <h1 className="text-9xl text-center max-sm:text-6xl">404</h1>
        <h2 className="text-5xl text-center max-sm:text-3xl">
          Sorry! Page Not Found
        </h2>
        <Link to={"/"}>
          <Button text={"← Back to Home"} css={"contact-btn"} />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
