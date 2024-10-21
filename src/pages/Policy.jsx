import React from "react";
import TopSlider from "../components/TopSlider";
import heading2 from "../images/Background+Shadow(policy).png";

const Policy = () => {
  return (
    <div>
      <TopSlider
        image1={"Privacy Policy"}
        pagename={"Privacy Policy"}
        link1={"/policy"}
      />
      <div
        style={{
          padding: "20px",
          width: "80%",
          margin: "auto",
        }}
      >
        <h2 className="font-bold text-lg">Privacy Policy:</h2>
        <p className="text-gray-500 text-[17px]">
          Protecting your privacy is important to us. This Privacy Policy
          outlines how we collect, use, and disclose personal information when
          you use our website.
        </p>

        <h3 className="font-bold text-lg">1. Information We Collect:</h3>
        <p className="text-gray-500 text-[17px]">
          We collect personal information such as your name, email address, and
          payment details when you create an account or make a purchase. We also
          collect usage data such as IP address, browser type, and pages
          visited.
        </p>

        <h3 className="font-bold text-lg">2. How We Use Your Information:</h3>
        <p className="text-gray-500 text-[17px]">
          We use your personal information to provide and improve our services.
          Your information may also be used for communication purposes, such as
          sending newsletters or updates.
        </p>

        <h3 className="font-bold text-lg">3. Information Sharing:</h3>
        <p className="text-gray-500 text-[17px]">
          We do not sell, trade, or otherwise transfer your personal information
          to third parties without your consent. We may share your information
          with trusted third- party service providers who assist us in operating
          our website.
        </p>

        <h3 className="font-bold text-lg">4. Security:</h3>
        <p className="text-gray-500 text-[17px]">
          We implement security measures to protect your personal information
          against unauthorized access or alteration. However, no method of
          transmission over the Internet or electronic storage is 100% secure.
        </p>

        <h3 className="font-bold text-lg">5. Your Choices:</h3>
        <p className="text-gray-500 text-[17px]">
          You have the right to access, update, or delete your personal
          information at any time. You can opt out of receiving promotional
          emails by following the instructions provided in the email. By using
          our website, you consent to the terms of this Privacy Policy. If you
          have any questions or concerns, please contact us. By using our
          website, you consent to the terms of this Privacy Policy. If you have
          any questions or concerns, please contact us.
        </p>
      </div>
    </div>
  );
};

export default Policy;
