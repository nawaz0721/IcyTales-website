import React from "react";
import TopSlider from "../components/TopSlider";
import heading2 from "../images/Background+Shadow(review).png";
import TestimonialCard from "../components/TestimonialCard ";

const Review = () => {
  return (
    <div>
      <TopSlider image1={"Review"} image2={heading2} />
      <div>
        <div className="flex flex-col items-center justify-center my-4">
          <h1 className="text-7xl text-center max-sm:text-6xl">
            Hear From Our <span className="text-pink-500">Gelato</span>{" "}
            Enthusiasts
          </h1>
          <p className="font-semibold my-4">
            Read testimonials from those who have enjoyed our artisan gelato.
          </p>
        </div>
        <TestimonialCard />
      </div>
    </div>
  );
};

export default Review;
