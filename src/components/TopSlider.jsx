import { Button } from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";

function TopSlider({ image1, pagename, link1, link2, pagename2 }) {
  return (
    <div className="h-80 bg-[#f7f7f7] flex flex-col gap-y-4 justify-center items-center">
      {/* Heading for the page name */}
      <h1 className="text-8xl font-bold text-center max-sm:text-6xl">
        {image1}
      </h1>

      {/* Breadcrumb navigation */}
      <Button className="inline-flex items-center bg-white rounded-full px-8 py-6 m-4">
        <Link to="/" className="text-pink-500 text-2xl font-normal mr-1">
          Home /
        </Link>
        <Link to={link1} className="text-black text-2xl font-normal ml-1">
          {pagename}
        </Link>
        <Link to={link2} className="text-black text-2xl font-normal ml-1">
          {pagename2}
        </Link>
      </Button>
    </div>
  );
}

export default TopSlider;
