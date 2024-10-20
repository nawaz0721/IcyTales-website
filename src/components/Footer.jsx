import { CiLocationOn } from "react-icons/ci";
import logo from "../images/Link.png";
import { HiOutlineMailOpen } from "react-icons/hi";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { GoMoveToTop } from "react-icons/go";
import { Button } from "@nextui-org/react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll effect
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <Button
          className="fixed bottom-9 left-4 z-20 text-white text-3xl bg-pink-500 p-2 rounded"
          onClick={scrollToTop}
        >
          <GoMoveToTop />
        </Button>
        <div className="footer-section logo-section">
          <img src={logo} alt="Icy Tales Logo" className="footer-logo" />
        </div>

        <div className="footer-section navigation">
          <h2 className="font-bold text-center">Navigation</h2>
          <div className="nav-columns">
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/aboutus"}>About</Link>
              </li>
              <li>
                <Link to={"/team"}>Team</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to={"/shop"}>Shop</Link>
              </li>
              <li>
                <Link to={"/blogs"}>Blog</Link>
              </li>
              <li>
                <Link to={"/contact"}>Contact</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-section contact-info">
          <h4 className="flex gap-4 items-center justify-center my-2">
            <CiLocationOn size={30} />
            <span className="font-bold">Address</span>
          </h4>
          <p className="text-center">Shah Faisal Colony, Karachi</p>
          <p className="text-center">Phone: +923201223272</p>
          <h4 className="flex gap-4 items-center justify-center my-2">
            <HiOutlineMailOpen size={30} />
            <span className="font-bold">Email</span>
          </h4>
          <p className="text-center">icetales@gmail.com</p>
        </div>

        <div className="footer-section social-media text-center">
          <h2 className="font-bold">Follow Us</h2>
          <div className="social-icons my-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook size={30} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <AiFillInstagram size={30} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaXTwitter size={30} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright © 2024 Ice Cream Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
