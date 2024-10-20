import React from "react";

const BlogDetailCompo = ({ blog }) => {
  const { title, image, postBy, date, content, quote, description } = blog;

  return (
    <div>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          <img src={image} alt="Blog" className="w-full h-60 object-cover" />
          <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
            <h2 className="text-xl font-bold">{title}</h2>
            <div className="flex items-center text-sm mt-1">
              <span className="mr-2">By: {postBy}</span>
              <span>{date}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-700 mb-4">{content}</p>
          <p className="text-gray-700 mb-4">{description}</p>
          <p className="text-gray-700 mb-4">{content}</p>

          <blockquote className="border-l-4 border-pink-500 pl-4 italic text-gray-600 mb-4">
            "{quote}"
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailCompo;
