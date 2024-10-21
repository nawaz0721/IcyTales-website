import React from "react";
import TopSlider from "../components/TopSlider";
import heading2 from "../images/Background+Shadow(team).png";
import image1 from "../images/Figure → team-image1.jpg.png";
import image2 from "../images/Figure → team-image2.jpg.png";
import image3 from "../images/Figure → team-image3.jpg.png";
import image4 from "../images/team-image4.jpg.png";
import image5 from "../images/team-image5.jpg.png";
import image6 from "../images/team-image6.jpg.png";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const Team = () => {
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
  return (
    <div className="Team">
      <TopSlider image1={"Team"} pagename={"Team"} link1={"/team"}  />
      <div className="w-[85%] m-auto p-10">
        <div className="w-full m-auto">
          <h1 className="text-7xl text-center max-sm:text-6xl">
            Our <span className="text-pink-500">Team</span> Members
          </h1>
          <span className="flex justify-center my-4">
            Get to know the friendly faces behind your favorite flavors.
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-4">
          {team.map((member, index) => (
            <div key={index} className="text-center">
              <img
                className="w-45 h-45 rounded-full mx-auto object-cover"
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
      </div>
    </div>
  );
};
export default Team;
