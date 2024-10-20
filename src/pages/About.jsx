import TopSlider from "../components/TopSlider";
import heading from "../images/Heading 1 → About Us.png";
import button from "../images/Background+Shadow.png";
import image1 from "../images/Figure → journey-image.jpg.png";
import heading1 from "../images/Our Journey Began With a Simple Dream.png";
import heading2 from "../images/Our Mission is to Create Moments.png";
import image2 from "../images/Figure → special-rightimage.png.png";
import image3 from "../images/Image(1).png";
import Button from "../components/Button";
import SignUpForm from "../components/SignUpForm";
import Footer from "../components/Footer";
import Statistics from "../components/Statistics";
import TeamSlider from "../components/TeamSlider";

const AboutUs = () => {
  return (
    <div className="about-us">
      <TopSlider image1={"About Us"} image2={button} />
      <div className="flex flex-wrap justify-center items-center w-full h-auto min-h-[600px]">
        <div className="w-full md:w-1/2">
          <img className="w-3/4 mx-auto" src={image1} alt="Ice cream image 1" />
        </div>
        <div className="w-full md:w-1/2 px-4">
          <h1 className="text-black text-6xl text-center max-sm:text-6xl">
            Our <span className="text-pink-500">Journey</span> Began With a
            Simple Dream
          </h1>
          <div className="my-4 w-full md:w-3/4 mx-auto relative">
            <img
              src={image2}
              className="absolute right-0 w-1/4 max-w-full"
              alt="Ice cream image 2"
            />
            <p className="text-sm md:text-base my-4">
              Our goal is to make the best ice cream using only the finest,
              natural ingredients. From rich, creamy classics to adventurous new
              creations, every flavor is meticulously crafted in-house to ensure
              the highest quality and freshness.
            </p>
            <p className="text-sm md:text-base my-4">
              We take pride in offering a diverse range of options, including
              dairy-free, vegan, and gluten-free choices, so everyone can find
              their perfect scoop.
            </p>
            <Button className="my-4" text={"Read more"} css={"contact-btn"} />
          </div>
        </div>
      </div>

      <div className="w-full h-auto min-h-[600px] bg-[#683292] flex flex-wrap justify-end items-center">
        <div className="w-[50%]  m-auto md:px-14">
          <h1 className="text-black text-7xl text-center max-sm:text-6xl">
            Our <span className="text-pink-500">Mission</span> is to Create
            Moments
          </h1>
          <p className="my-7 text-white text-center text-sm md:text-base">
            We strive to foster a welcoming and joyful environment where
            customers of all ages can gather, celebrate, and make lasting
            memories. Our commitment extends beyond serving great ice cream.
          </p>
          <Button className="my-4" text={"Read more"} css={"contact-btn"} />
        </div>
        <img
          src={image3}
          className="w-full md:w-1/2 h-auto relative right-1"
          alt="Ice cream image 3"
        />
      </div>
      <Statistics />
      <TeamSlider />
      <SignUpForm />
    </div>
  );
};
export default AboutUs;
