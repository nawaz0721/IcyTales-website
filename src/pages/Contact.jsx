import React, { useState } from "react";
import TopSlider from "../components/TopSlider";
import heading2 from "../images/Background+Shadow(contact).png";
import { CiLocationOn } from "react-icons/ci";
import { HiOutlineMailOpen } from "react-icons/hi";
import { FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
  };
  return (
    <div>
      <TopSlider image1={"Contact Us"} pagename={"Contact Us"} link1={"/contact"}/>
      <div>
        <div className="w-full lg:w-[70%] mx-auto text-center p-4 sm:p-8">
          <h1 className="text-7xl text-center max-sm:text-6xl">
            Get in <span className="text-pink-500">Touch</span> With us
          </h1>
          <p className="text-gray-500 mb-4 sm:mb-8">
            Reach out and connect with us today for any inquiries or assistance!
          </p>

          <div className="flex gap-10 max-sm:flex-wrap p-5 justify-center">
            <div className="flex w-full sm:w-2/3 md:w-1/3 flex-col gap-6 mb-10">
              {/* Location */}
              <div className="flex items-center justify-center p-2 bg-white border rounded-lg shadow-md space-x-4">
                <div className="bg-purple-600 rounded-full p-2 text-white text-3xl">
                  <CiLocationOn size={33} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Our Location</h3>
                  <p className="text-gray-500">
                    Shah Faisal Colony <br /> Karachi
                  </p>
                </div>
              </div>

              {/* Phone Number */}
              <div className="flex items-center justify-center p-2 bg-white border rounded-lg shadow-md space-x-4">
                <div className="bg-purple-600 rounded-full p-2 text-white text-3xl">
                  <FaPhoneAlt size={33} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Phone Number</h3>
                  <p className="text-gray-500">
                    (+92 349 1818593) <br /> (+92 320 1223272)
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center justify-center p-2 bg-white border rounded-lg shadow-md space-x-4">
                <div className="bg-purple-600 rounded-full p-2 text-white text-3xl">
                  <HiOutlineMailOpen size={33} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Email us at</h3>
                  <p className="text-gray-500">
                    info@icetales.com <br /> icetales@gmail.com
                  </p>
                </div>
              </div>
            </div>

            <form
              // onSubmit={handleSubmit}
              className="space-y-6 w-full sm:w-2/3"
              action="https://api.web3forms.com/submit"
              id="contactForm"
              method="POST"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="hidden"
                  name="access_key"
                  value="03e83bf5-699f-4cec-a20d-53ab5ce7591e"
                />
                <div>
                  <label
                    className="block text-start text-sm font-medium text-gray-700"
                    htmlFor="name"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label
                    className="block text-start text-sm font-medium text-gray-700"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-start text-sm font-medium text-gray-700"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label
                    className="block text-start text-sm font-medium text-gray-700"
                    htmlFor="phone"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-start text-sm font-medium text-gray-700"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md h-32 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-pink-600 text-white py-3 px-8 rounded-md hover:bg-pink-700"
              >
                Submit Now
              </button>
            </form>
          </div>
        </div>

        <div className="w-full px-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57915.770873444446!2d67.12094153198326!3d24.872875647483554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb3399d42aef5f1%3A0xa5813c4e620196a7!2sShah%20Faisal%20Colony%2C%20Karachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1729085166692!5m2!1sen!2s"
            width="100%"
            height={450}
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
