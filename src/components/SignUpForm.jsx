import React, { useState } from "react";
import heading from "../images/Sign up For Exclusive Deals and Updates.png";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) {
      alert("Please agree to the Privacy Policy.");
      return;
    }
    // Handle form submission logic here
    alert(`Email: ${email} has been subscribed!`);
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <h1 className="text-7xl text-black text-center max-sm:text-6xl">
          Sign up For <span className="text-pink-500">Exclusive Deals </span>
          and Updates
        </h1>
      </div>
      <p className="signup-subtext">
        Get 10% off your next order and stay updated with our latest offers.
      </p>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="email"
          placeholder="Enter Your Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="signup-input"
          required
        />
        <button type="submit" className="signup-button">
          Subscribe
        </button>
      </form>
      <div className="signup-privacy-policy">
        <input
          type="checkbox"
          checked={agreed}
          onChange={() => setAgreed(!agreed)}
        />
        <span>
          I agree to the{" "}
          <a href="/privacy-policy" className="signup-link">
            Privacy Policy
          </a>
          .
        </span>
      </div>
    </div>
  );
};

export default SignUpForm;
