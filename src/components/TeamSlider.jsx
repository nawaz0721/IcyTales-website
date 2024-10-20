import React, { useState } from "react";
import image1 from "../images/Figure → team-image1.jpg.png";
import image2 from "../images/Figure → team-image2.jpg.png";
import image3 from "../images/Figure → team-image3.jpg.png";
import image4 from "../images/team-image4.jpg.png";
import image5 from "../images/team-image5.jpg.png";
import image6 from "../images/team-image6.jpg.png";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const TeamSlider = () => {
  const team = [
    {
      name: "Marvin Joner",
      position: "Bakery Worker",
      image: image1,
      social: {
        facebook: "#",
        instagram: "#",
        youtube: "#",
      },
    },
    {
      name: "Patricia Woodrum",
      position: "Staff Worker",
      image: image2,
      social: {
        facebook: "#",
        instagram: "#",
        youtube: "#",
      },
    },
    {
      name: "Hannaz Stone",
      position: "Shop Worker",
      image: image3,
      social: {
        facebook: "#",
        instagram: "#",
        youtube: "#",
      },
    },
    {
      name: "Elina James",
      position: "Bakery Worker",
      image: image4,
      social: {
        facebook: "#",
        instagram: "#",
        youtube: "#",
      },
    },
    {
      name: "Kevin Andrew",
      position: "Staff Worker",
      image: image5,
      social: {
        facebook: "#",
        instagram: "#",
        youtube: "#",
      },
    },
    {
      name: "Lauren Trout",
      position: "Shop Worker",
      image: image6,
      social: {
        facebook: "#",
        instagram: "#",
        youtube: "#",
      },
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const totalMembers = team.length;

  const handleNext = () => {
    if (currentIndex + 3 < totalMembers) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const visibleMembers = team.slice(currentIndex, currentIndex + 3);

  return (
    <div className="w-full py-16 bg-gradient-to-r from-pink-50 to-white">
      <div className="text-center mb-12">
        <div className="text-center">
          <h1 className="text-7xl text-center max-sm:text-6xl">
            Our <span className="text-pink-500">Team</span> Members
          </h1>
        </div>

        <p className="text-gray-500 mt-4">
          Get to know the friendly faces behind your favorite flavors.
        </p>
      </div>

      <div className="flex justify-center items-center space-x-6 px-4">
        {/* Left Arrow */}
        <button
          className={`lg:block ${currentIndex === 0 ? "invisible" : ""}`}
          onClick={handlePrev}
        >
          <span className="text-2xl text-gray-400 hover:text-pink-500">←</span>
        </button>

        {/* Team Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleMembers.map((member, index) => (
            <div key={index} className="text-center">
              <img
                className="w-40 h-40 rounded-full mx-auto object-cover"
                src={member.image}
                alt={member.name}
              />
              <h3 className="mt-4 text-xl font-semibold text-black">
                {member.name}
              </h3>
              <p className="text-gray-500">{member.position}</p>
              {/* Social Icons */}
              <div className="flex justify-center space-x-4 mt-4">
                <a
                  href={member.social.facebook}
                  className="text-white bg-pink-500 border p-1 rounded-full hover:text-blue-700 hover:bg-white"
                >
                  <FaFacebook size={22} />
                </a>
                <a
                  href={member.social.instagram}
                  className="text-white bg-pink-500 border p-1 rounded-full hover:text-orange-500 hover:bg-white"
                >
                  <FaInstagram size={22} />
                </a>
                <a
                  href={member.social.youtube}
                  className="text-white bg-pink-500 border p-1 rounded-full hover:text-red-700 hover:bg-white"
                >
                  <FaYoutube size={22} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          className={`lg:block ${
            currentIndex + 3 >= totalMembers ? "invisible" : ""
          }`}
          onClick={handleNext}
        >
          <span className="text-2xl text-gray-400 hover:text-pink-500">→</span>
        </button>
      </div>
    </div>
  );
};

export default TeamSlider;
