/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB, storage } from "../utils/firebase"; // Import storage from Firebase
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase Storage methods
import { GoogleAuthProvider } from "firebase/auth";

const Signup = () => {
  const navigate = useNavigate();

  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    profile: null, // Store the file object here
    password: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);
  const [loadingWithGoogle, setLoadingWithGoogle] = useState(false);

  const userSignupFunction = async () => {
    if (
      userSignup.name === "" ||
      userSignup.email === "" ||
      userSignup.password === "" ||
      !userSignup.profile // Ensure profile image is selected
    ) {
      toast.error("All Fields are required");
      return;
    }

    try {
      setLoading(true);

      // Create user with email and password
      const users = await createUserWithEmailAndPassword(
        auth,
        userSignup.email,
        userSignup.password
      );

      if (!users?.user?.uid) {
        throw new Error("User UID not found");
      }

      // Upload profile image to Firebase Storage
      const profileRef = ref(storage, `profiles/${users.user.uid}`); // Create a storage reference with the user ID

      // Make sure profile image exists before uploading
      if (userSignup.profile) {
        await uploadBytes(profileRef, userSignup.profile); // Upload the file
      } else {
        throw new Error("Profile file not found");
      }

      const profileUrl = await getDownloadURL(profileRef); // Get the download URL

      // Create user object with profile URL
      const user = {
        name: userSignup.name,
        email: users.user.email,
        profileUrl, // Store the profile image URL
        uid: users.user.uid,
        role: userSignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      // Add user to Firestore
      const userReference = collection(fireDB, "user");
      await addDoc(userReference, user);

      // Reset the form
      setUserSignup({
        name: "",
        email: "",
        profile: null,
        password: "",
      });

      toast.success("Signup Successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Signup failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

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
      <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
        <div className="mb-5">
          <h2 className="text-center text-2xl font-bold text-pink-500 ">
            Signup
          </h2>
        </div>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Full Name"
            value={userSignup.name}
            onChange={(e) => {
              setUserSignup({
                ...userSignup,
                name: e.target.value,
              });
            }}
            className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
          />
        </div>
        <div className="mb-3">
          <input
            type="file"
            accept="image/*" // Ensure only images are accepted
            onChange={(e) => {
              setUserSignup({
                ...userSignup,
                profile: e.target.files[0], // Capture the first selected file
              });
            }}
            className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            placeholder="Email Address"
            value={userSignup.email}
            onChange={(e) => {
              setUserSignup({
                ...userSignup,
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
            value={userSignup.password}
            onChange={(e) => {
              setUserSignup({
                ...userSignup,
                password: e.target.value,
              });
            }}
            className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
          />
        </div>

        <div className="mb-5">
          <button
            type="button"
            onClick={userSignupFunction}
            className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md "
            disabled={loading}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
          <h2 className="text-center text-2xl my-2 mb-2">OR</h2>
          <button
            type="button"
            onClick={handleSignInWithGoogle}
            disabled={loadingWithGoogle} // Disable the button while loading
            className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md "
          >
            {loadingWithGoogle
              ? "Signing up with Google..."
              : "Signup with Google"}
          </button>
        </div>

        <div>
          <h2 className="text-black">
            Have an account{" "}
            <Link className=" text-pink-500 font-bold" to={"/login"}>
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Signup;
