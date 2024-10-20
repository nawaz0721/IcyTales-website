import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { Link } from "react-router-dom";

const BlogCard = ({ image, title, date, description, id, author, link }) => {
  return (
    <div className="flex flex-wrap w-[45%] max-md:w-full rounded-lg shadow-lg overflow-hidden bg-white">
      <div className="relative w-[100%] rounded-lg ">
        <img src={image} alt="blog" className="w-[100%] h-48 object-fill" />
      </div>

      <div className="p-4">
        <div className="text-gray-600 text-sm mb-2 flex items-center justify-between">
          <span className="mr-2 flex  items-center">
            <IoPerson className="text-pink-500" />
            <span className="ml-1">Posted by {author}</span>
          </span>
          <span className="flex items-center">
            <FaCalendarAlt className="text-pink-500" />
            <span className="ml-1">{date}</span>
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>

        <p className="text-gray-600 text-sm mb-4">{description}</p>

        <Link to={link}>
          <a
            href="#"
            className="text-pink-500 hover:text-pink-600 font-semibold hover:underline"
          >
            Read More
          </a>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
