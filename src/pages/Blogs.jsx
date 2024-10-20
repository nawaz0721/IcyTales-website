import React from "react";
import TopSlider from "../components/TopSlider";
import heading2 from "../images/Background+Shadow(blog).png";
import image1 from "../images/Figure → single-blog-tab-img1.jpg.png";
import image2 from "../images/Figure → single-blog-tab-img2.jpg.png";
import image3 from "../images/Figure → single-blog-tab-img3.jpg.png";
import image4 from "../images/Figure → single-blog-tab-img4.jpg.png";
import image5 from "../images/Figure → single-blog-tab-img5.jpg.png";
import image6 from "../images/Figure → single-blog-tab-img6.jpg.png";
import image7 from "../images/Figure → single-blog-tab-img7.jpg.png";
import image8 from "../images/Figure → single-blog-tab-img8.jpg.png";
import BlogCard from "../components/BlogCard";
import { Link } from "react-router-dom";

const Blogs = () => {
  const blogPosts = [
    {
      id: 11,
      title: "Indulge in Our Creamy Vanilla Delight",
      image: image1,
      description:
        "Experience the classic taste of our premium vanilla ice cream made with real vanilla beans.",
      date: "October 14, 2024",
      author: "Admin",
    },
    {
      id: 12,
      title: "Refreshing Strawberry Bliss",
      image: image2,
      description:
        "Savor the freshness of ripe strawberries blended into our smooth and creamy strawberry ice cream.",
      date: "October 12, 2024",
      author: "Admin",
    },
    {
      id: 13,
      title: "Chocolate Heaven Awaits",
      image: image3,
      description:
        "Dive into our rich and velvety chocolate ice cream, made with the finest cocoa and dark chocolate.",
      date: "October 10, 2024",
      author: "Guest",
    },
    {
      id: 14,
      title: "Mint Chocolate Chip Perfection",
      image: image4,
      description:
        "Enjoy the cool mint flavor combined with chunks of rich chocolate in every scoop.",
      date: "October 15, 2024",
      author: "Admin",
    },
    {
      id: 15,
      title: "Exotic Mango Sorbet",
      image: image5,
      description:
        "Treat yourself to a refreshing mango sorbet, bursting with tropical flavors and made with real fruit.",
      date: "October 13, 2024",
      author: "Editor",
    },
    {
      id: 16,
      title: "Cookies and Cream Extravaganza",
      image: image6,
      description:
        "Indulge in our cookies and cream ice cream, featuring crushed chocolate cookies in a creamy vanilla base.",
      date: "October 18, 2024",
      author: "Admin",
    },
    {
      id: 17,
      title: "Classic Rocky Road Adventure",
      image: image7,
      description:
        "Enjoy a delightful mix of chocolate ice cream with marshmallows and crunchy almonds in our Rocky Road.",
      date: "October 12, 2024",
      author: "Guest",
    },
    {
      id: 18,
      title: "Salted Caramel Indulgence",
      image: image8,
      description:
        "Treat yourself to our salted caramel ice cream, a perfect blend of sweet and salty in every bite.",
      date: "October 06, 2024",
      author: "Admin",
    },
  ];

  return (
    <div>
      <TopSlider image1={"Blogs"} image2={heading2} />
      <div className="flex flex-wrap max-md:flex-wrap gap-10 my-5 rounded-lg p-5 justify-center items-center w-[80%] m-auto min-h-screen bg-gray-100">
        {blogPosts.map((post) => {
          return (
            <BlogCard
              image={post.image}
              title={post.title}
              date={post.date}
              author={post.author}
              description={post.description}
              key={post.id}
              link={`/blogs/${post.id}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;
