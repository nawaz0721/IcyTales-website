import React, { Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop.js";
import { Toaster } from "react-hot-toast";
import ProtectedRouteForAdmin from "./protectedRoutes/ProtectedRouteForAdmin.jsx";
import ProtectedRouteForUser from "./protectedRoutes/ProtectedRouteForUser.jsx";
import MyState from "./context/MyState.jsx";

// Lazy load the components
const Home = lazy(() => import("./pages/Home"));
const AboutUs = lazy(() => import("./pages/About"));
const Team = lazy(() => import("./pages/Team"));
const Review = lazy(() => import("./pages/Review"));
const Shop = lazy(() => import("./pages/Shop"));
const ShoppingCart = lazy(() => import("./pages/ShoppingCart"));
const CheckOut = lazy(() => import("./pages/CheckOut"));
const Thankyou = lazy(() => import("./pages/Thankyou"));
const WishList = lazy(() => import("./pages/WishList"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Policy = lazy(() => import("./pages/Policy"));
const Terms = lazy(() => import("./pages/Terms"));
const Contact = lazy(() => import("./pages/Contact"));
const Blogs = lazy(() => import("./pages/Blogs"));
const BlogsDetails = lazy(() => import("./pages/BlogsDetails"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Signup = lazy(() => import("./pages/Signup.jsx"));
const UserDashboard = lazy(() => import("./pages/UserDashboard.jsx"));
const AdminDashboard = lazy(() => import("./pages/Admin/Admin.jsx"));
const AddProducts = lazy(() => import("./pages/Admin/AddProducts.jsx"));
const UpdateProduct = lazy(() => import("./pages/Admin/UpdateProduct.jsx"));
const ProductDetail = lazy(() => import("./pages/ProductDetail.jsx"));

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
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
      {!shouldHideFooter && <Footer />}
      <Toaster />
    </>
  );
};

export default App;
