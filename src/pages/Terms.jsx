import React from "react";
import TopSlider from "../components/TopSlider";
import heading2 from "../images/Background+Shadow(terms).png";

const Terms = () => {
  return (
    <div>
      <TopSlider image1={"Terms & Condition"} pagename={"Terms & Condition"} link1={"/terms"} />
      <div
        style={{
          padding: "20px",
          width: "80%",
          margin: "auto",
        }}
      >
        <h2 className="font-bold text-lg">Terms and Conditions:</h2>
        <p className="text-gray-500 text-[17px]">
          Welcome to IcyTales! Before accessing or using our website, please
          read these Terms and Conditions carefully. By accessing or using any
          part of the site, you agree to be bound by these Terms and Conditions.
        </p>

        <h3 className="font-bold text-lg">1. Use of Website:</h3>
        <p className="text-gray-500 text-[17px]">
          Your use of our website is subject to these Terms and Conditions. You
          must be at least 18 years old to use our services.
        </p>

        <h3 className="font-bold text-lg">2. User Account:</h3>
        <p className="text-gray-500 text-[17px]">
          You are responsible for maintaining the confidentiality of your
          account and password. You agree to provide accurate and complete
          information when creating an account.
        </p>

        <h3 className="font-bold text-lg">3. Intellectual Property:</h3>
        <p className="text-gray-500 text-[17px]">
          All content on this website, including text, graphics, logos, and
          images, is the property of [Your Online Education Platform] and
          protected by copyright laws. You may not reproduce, distribute, or
          transmit any content without prior written consent.
        </p>

        <h3 className="font-bold text-lg">4. Payment and Billing:</h3>
        <p className="text-gray-500 text-[17px]">
          Payment for our services is required in advance. All fees are
          non-refundable.
        </p>

        <h3 className="font-bold text-lg">5. Termination:</h3>
        <p className="text-gray-500 text-[17px]">
          We reserve the right to suspend or terminate your account at any time
          for violation of these Terms and Conditions. Please review our full
          Terms and Conditions for more detailed information. You have the right
          to access, update, or delete your personal information at any time.
          You can opt out of receiving promotional emails by following the
          instructions provided in the email. By using our website, you consent
          to the terms of this Privacy Policy. If you have any questions or
          concerns, please contact us.
        </p>

        <p className="text-gray-500 text-[17px] my-5">
          Please review our full Terms and Conditions for more detailed
          information.
        </p>
      </div>
    </div>
  );
};

export default Terms;
