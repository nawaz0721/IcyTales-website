/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
const ProtectedRouteForAdmin = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("users"));

  // Check if the user exists and has the required role
  if (user && user.role === "admin") {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default ProtectedRouteForAdmin;
