import { CiSearch } from "react-icons/ci";
import { BsBag } from "react-icons/bs";
import { FiMenu } from "react-icons/fi"; // Icon for hamburger menu
import logo from "../images/Link.png";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { CartContext } from "../context/CartContext";
import { Avatar, Badge } from "@nextui-org/react";
import { FaHeart, FaUser } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isPagesDropdownOpen, setIsPagesDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user } = useContext(AuthContext);
  const { cartItems, wishListItems } = useContext(CartContext);

  const togglePagesDropdown = () => {
    setIsPagesDropdownOpen(!isPagesDropdownOpen);
  };
  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigate = useNavigate();

  const handleLogoutUser = async () => {
    try {
      await signOut(auth); // Sign out user from Firebase
      console.log("User logged out successfully");
      toast.success("User logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="header my-2">
      <div className="logo">
        <Link to={"/"}>
          <img src={logo} alt="IcyTales Logo" />
        </Link>
      </div>

      <div className="hamburger-menu" onClick={toggleMenu}>
        <FiMenu />
      </div>

      <div className={`nav-container ${isMenuOpen ? "active" : ""}`}>
        <nav className="nav-links">
          <div className="nav-item dropdown">
            <Link to={"/home"}>Home</Link>
          </div>
          <div className="nav-item">
            <Link to={"/aboutus"}>About Us</Link>
          </div>

          <div
            className="nav-item dropdown"
            onMouseEnter={togglePagesDropdown}
            onMouseLeave={togglePagesDropdown}
          >
            Pages <span className="dropdown-icon">▼</span>
            {isPagesDropdownOpen && (
              <div className="dropdown-menu">
                <Link to={"/team"}>
                  <div className="dropdown-item">Team</div>
                </Link>
                <Link to={"/review"}>
                  <div className="dropdown-item">Review</div>
                </Link>
                <Link to={"/shop"}>
                  <div className="dropdown-item">Shop</div>
                </Link>
                <Link to={"/terms"}>
                  <div className="dropdown-item">Terms & Condition</div>
                </Link>
                <Link to={"/policy"}>
                  <div className="dropdown-item">Privacy Policy</div>
                </Link>
              </div>
            )}
          </div>
          <Link to={"/blogs"}>
            <div className="nav-item dropdown">Blog</div>
          </Link>
          <Link to={"/contact"}>
            <div className="nav-item dropdown">Contact Us</div>
          </Link>
          {/* <div className="nav-item">FAQ's</div> */}
        </nav>

        <div className="icons">
          <div className="cart-icon-wrapper">
            {wishListItems.length == 1 ? (
              <Link to={"/wishList"}>
                <Badge content={wishListItems.length}>
                  <FaHeart className=" text-red-600" size={25} />
                </Badge>
              </Link>
            ) : (
              <Link to={"/wishList"}>
                <FaHeart className=" text-red-600" size={25} />
              </Link>
            )}
          </div>

          <div className="cart-icon-wrapper">
            {!cartItems.length == 0 ? (
              <Link to={"/cart"}>
                <Badge content={cartItems.length}>
                  <BsBag className="cart-icon" />
                </Badge>
              </Link>
            ) : (
              <BsBag className="cart-icon" />
            )}
          </div>
        </div>

        {user?.isLogin ? (
          <div className="nav-item dropdown" onClick={toggleUserDropdown}>
            <Avatar src={user?.userInfo?.photoURL} size="md" />
            {isUserDropdownOpen && (
              <div className="dropdown-menu">
                <Link to={"/user-dashboard"}>
                  <div className="dropdown-item">User Dashboard</div>
                </Link>
                <Link to={"/admin-dashboard"}>
                  <div className="dropdown-item">Admin Dashboard</div>
                </Link>
                <Link>
                  <div onClick={handleLogoutUser} className="dropdown-item">
                    Log Out
                  </div>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="nav-item dropdown" onClick={toggleUserDropdown}>
            <Avatar showFallback src="https://images.unsplash.com/broken" />
            {isUserDropdownOpen && (
              <div className="dropdown-menu">
                <Link to={"/login"}>
                  <div className="dropdown-item">Log In</div>
                </Link>
                <Link to={"/admin-dashboard"}>
                  <div className="dropdown-item">Admin Dashboard</div>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
