import React from "react";

function TopSlider({ image1, image2 }) {
  return (
    <div className="h-80 bg-[#f7f7f7] flex flex-col gap-y-2 justify-center align-center">
      <h1 className="text-8xl text-center max-sm:text-7xl">{image1}</h1>
      <img
        src={image2}
        alt="button"
        className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto"
      />
    </div>
  );
}

export default TopSlider;
