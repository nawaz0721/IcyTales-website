import React from "react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, fireDB } from "../utils/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

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
    }

    try {
      setLoading(true);
      const users = await signInWithEmailAndPassword(
        auth,
        userLogin.email,
        userLogin.password
      );
      toast.success("Login Successfully");

      try {
        const q = query(
          collection(fireDB, "user"),
          where("uid", "==", users?.user?.uid)
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
          let user;
          QuerySnapshot.forEach((doc) => (user = doc.data()));
          localStorage.setItem("users", JSON.stringify(user));
          setUserLogin({
            email: "",
            password: "",
          });
          if (user.role === "user") {
            navigate("/shop");
          } else {
            navigate("/admin-dashboard");
          }
          console.log(user);
        });
        return () => data;
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  // User Login Function With Google
  const handleSignInWithGoogle = async () => {
    setLoadingWithGoogle(true);
    const provider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        
        // Handle the signed-in user info if necessary
        console.log("User signed in: ", user);
        
        // Optional: Add user to Firestore if necessary

        navigate("/"); // Redirect after successful sign-in
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Google Sign-In Error: ", errorCode, errorMessage);
        toast.error(`Sign-In failed: ${errorMessage}`); // Provide feedback to the user
    } finally {
        setLoadingWithGoogle(false);
    }
};

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Login Form  */}
      <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
        <div className="mb-5">
          <h2 className="text-center text-2xl font-bold text-pink-500 ">
            Login
          </h2>
        </div>

        <div className="mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={userLogin.email}
            onChange={(e) => {
              setUserLogin({
                ...userLogin,
                email: e.target.value,
              });
            }}
            className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
          />
        </div>

        <div className="mb-5">
          <input
            type="password"
            placeholder="Password"
            value={userLogin.password}
            onChange={(e) => {
              setUserLogin({
                ...userLogin,
                password: e.target.value,
              });
            }}
            className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
          />
        </div>

        <div className="mb-5">
          <button
            type="button"
            onClick={userLoginFunction}
            disabled={loading}
            className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md "
          >
            {loading ? "Logining..." : "Login"}
          </button>
          <h2 className="text-center text-2xl my-2 mb-2">OR</h2>
          <button
            type="button"
            onClick={handleSignInWithGoogle}
            disabled={loadingWithGoogle}
            className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md "
          >
            {loadingWithGoogle
              ? "Logining with Google...."
              : "Login with Google"}
          </button>
        </div>

        <div>
          <h2 className="text-black">
            Don't Have an account
            <Link className=" text-pink-500 font-bold" to={"/signup"}>
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
