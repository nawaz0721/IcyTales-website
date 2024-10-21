import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, fireDB } from "../utils/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [loadingWithGoogle, setLoadingWithGoogle] = useState(false);
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  // User Login Function
  const userLoginFunction = async () => {
    if (userLogin.email === "" || userLogin.password === "") {
      toast.error("All Fields are required");
      return;
    }

    try {
      setLoading(true);
      // Authenticate user with Firebase Authentication
      const users = await signInWithEmailAndPassword(
        auth,
        userLogin.email,
        userLogin.password
      );
      toast.success("Login Successfully");

      console.log("Firebase Auth UID:", users?.user?.uid);

      // Firestore query to find user document with matching uid
      const q = query(
        collection(fireDB, "user"),
        where("uid", "==", users?.user?.uid)
      ); // Change 'user' to 'users' if needed

      const data = onSnapshot(q, (QuerySnapshot) => {
        if (QuerySnapshot.empty) {
          toast.error("No user found in Firestore.");
          setLoading(false);
          return;
        }

        let user;
        QuerySnapshot.forEach((doc) => (user = doc.data()));

        if (user) {
          localStorage.setItem("users", JSON.stringify(user)); // Store user data in localStorage
          console.log("User data from Firestore:", user);

          // Clear the form inputs
          setUserLogin({
            email: "",
            password: "",
          });

          if (user.role === "user") {
            navigate("/shop");
          } else if (user.role === "admin") {
            navigate("/admin-dashboard");
            console.log(user.role);
          } else {
            toast.error("Invalid role.");
          }
        } else {
          toast.error("User data is undefined.");
        }
      });

      return () => data; // Cleanup listener
    } catch (error) {
      console.error("Login Failed:", error);
      toast.error("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-In Function
  const handleSignInWithGoogle = async () => {
    setLoadingWithGoogle(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("User signed in with Google:", user);

      // Optional: Add user to Firestore or handle Google user info

      navigate("/"); // Redirect after successful sign-in
    } catch (error) {
      console.error("Google Sign-In Error:", error.code, error.message);
      toast.error(`Sign-In failed: ${error.message}`);
    } finally {
      setLoadingWithGoogle(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Login Form */}
      <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
        <div className="mb-5">
          <h2 className="text-center text-2xl font-bold text-pink-500">
            Login
          </h2>
        </div>

        {/* Email Input */}
        <div className="mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={userLogin.email}
            onChange={(e) =>
              setUserLogin({ ...userLogin, email: e.target.value })
            }
            className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
          />
        </div>

        {/* Password Input */}
        <div className="mb-5">
          <input
            type="password"
            placeholder="Password"
            value={userLogin.password}
            onChange={(e) =>
              setUserLogin({ ...userLogin, password: e.target.value })
            }
            className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
          />
        </div>

        {/* Login Button */}
        <div className="mb-5">
          <button
            type="button"
            onClick={userLoginFunction}
            disabled={loading}
            className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <h2 className="text-center text-2xl my-2">OR</h2>

        {/* Google Login Button */}
        <div className="mb-5">
          <button
            type="button"
            onClick={handleSignInWithGoogle}
            disabled={loadingWithGoogle}
            className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md"
          >
            {loadingWithGoogle
              ? "Logging in with Google..."
              : "Login with Google"}
          </button>
        </div>

        {/* Signup Link */}
        <div>
          <h2 className="text-black">
            Don't have an account?
            <Link className="text-pink-500 font-bold" to={"/signup"}>
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
