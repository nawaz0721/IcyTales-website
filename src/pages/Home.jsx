import React from "react";
import { Image } from "@nextui-org/react";
import banner1 from "../images/Section.png";
import banner2 from "../images/Section 2.png";
import ProductSlider from "../components/ProductSlider";
import GelatoCategories from "../components/GelatoCategories";
import SignUpForm from "../components/SignUpForm";

const Home = () => {
  return (
    <>
      <div>
        <Image
          className="image"
          // width={1920}
          // height={800}
          alt="NextUI hero Image"
          src={banner1}
        />
      </div>
      <ProductSlider
        mainheading={"Our Popular Vegan Treats"}
        subtext={"Discover our most-loved vegan ice cream treats!"}
      />
      <GelatoCategories />
      <div>
        <Image
          className="image1"
          // width={1920}
          // height={696}
          alt="NextUI hero Image"
          src={banner2}
        />
      </div>
      <SignUpForm />
    </>
  );
};

export default Home;
