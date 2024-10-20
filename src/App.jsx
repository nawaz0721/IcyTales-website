import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import AboutUs from "./pages/About";
import Team from "./pages/Team";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Review from "./pages/Review";
import Shop from "./pages/Shop";
import ShoppingCart from "./pages/ShoppingCart";
import CheckOut from "./pages/CheckOut";
import Thankyou from "./pages/Thankyou";
import WishList from "./pages/WishList";
import NotFound from "./pages/NotFound";
import Policy from "./pages/Policy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import Blogs from "./pages/Blogs";
import BlogsDetails from "./pages/BlogsDetails";
import ScrollToTop from "./components/ScrollToTop.js";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import AdminDashboard from "./pages/Admin/Admin.jsx";
import AddProducts from "./pages/Admin/AddProducts.jsx";
import UpdateProduct from "./pages/Admin/UpdateProduct.jsx";
import { Toaster } from "react-hot-toast";
import ProtectedRouteForAdmin from "./protectedRoutes/ProtectedRouteForAdmin.jsx";
import ProtectedRouteForUser from "./protectedRoutes/ProtectedRouteForUser.jsx";
import MyState from "./context/MyState.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";

function App() {
  return (
    <MyState>
      <BrowserRouter>
        <MainApp />
      </BrowserRouter>
    </MyState>
  );
}

// New MainApp component to handle routes and conditional rendering
const MainApp = () => {
  const location = useLocation();

  // Define the routes where you want to hide the navbar and/or footer
  const hideNavbarRoutes = ["/login", "/signup"];
  const hideFooterRoutes = [
    "/login",
    "/signup",
    "/user-dashboard",
    "/admin-dashboard",
  ];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/team" element={<Team />} />
        <Route path="/review" element={<Review />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogsDetails />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/thankyou" element={<Thankyou />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRouteForUser>
              <UserDashboard />
            </ProtectedRouteForUser>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRouteForAdmin>
              <AdminDashboard />
            </ProtectedRouteForAdmin>
          }
        />
        <Route
          path="/addproduct"
          element={
            <ProtectedRouteForAdmin>
              <AddProducts />
            </ProtectedRouteForAdmin>
          }
        />
        <Route
          path="/updateproduct/:id"
          element={
            <ProtectedRouteForAdmin>
              <UpdateProduct />
            </ProtectedRouteForAdmin>
          }
        />
      </Routes>
      {!shouldHideFooter && <Footer />}
      <Toaster />
    </>
  );
};

export default App;
