import React from "react";
import TopSlider from "../components/TopSlider";
import heading1 from "../images/Heading 1 → Blog Detail.png";
import heading2 from "../images/Background+Shadow(blogDetail).png";
import image1 from "../images/Figure → single-blog-tab-img1.jpg.png";
import image2 from "../images/Figure → single-blog-tab-img2.jpg.png";
import image3 from "../images/Figure → single-blog-tab-img3.jpg.png";
import image4 from "../images/Figure → single-blog-tab-img4.jpg.png";
import image5 from "../images/Figure → single-blog-tab-img5.jpg.png";
import image6 from "../images/Figure → single-blog-tab-img6.jpg.png";
import image7 from "../images/Figure → single-blog-tab-img7.jpg.png";
import image8 from "../images/Figure → single-blog-tab-img8.jpg.png";
import { useParams } from "react-router";
import NotFound from "./NotFound";
import BlogDetailCompo from "../components/BlogsDetails";

const BlogsDetails = () => {
  const blogPosts = [
    {
      id: 11,
      title: "Indulge in Our Creamy Vanilla Delight",
      image: image1,
      description:
        "Experience the classic taste of our premium vanilla ice cream made with real vanilla beans.",
      date: "October 14, 2024",
      postBy: "Admin",
      content:
        "Our creamy vanilla delight is crafted from the finest ingredients, ensuring a rich and smooth texture that melts in your mouth. Each scoop is made with real vanilla beans, giving it an authentic flavor that reminds you of homemade ice cream. Perfect as a standalone treat or as a complement to pies, cakes, and other desserts. Whether you're enjoying a summer evening or a cozy winter night, our vanilla ice cream is the ultimate indulgence.",
      quote:
        "Vanilla is the essence of sweetness, a classic flavor loved by everyone.",
    },
    {
      id: 12,
      title: "Refreshing Strawberry Bliss",
      image: image2,
      description:
        "Savor the freshness of ripe strawberries blended into our smooth and creamy strawberry ice cream.",
      date: "October 12, 2024",
      postBy: "Admin",
      content:
        "Made with fresh, hand-picked strawberries, our strawberry bliss ice cream delivers an invigorating taste experience. We blend the strawberries directly into the ice cream base to maintain their vibrant flavor and color. This delightful treat is perfect for warm weather and brings a taste of summer to your every bite. Pair it with our vanilla delight for a refreshing sundae or enjoy it on its own.",
      quote: "Nothing beats the refreshing taste of strawberries on a hot day.",
    },
    {
      id: 13,
      title: "Chocolate Heaven Awaits",
      image: image3,
      description:
        "Dive into our rich and velvety chocolate ice cream, made with the finest cocoa and dark chocolate.",
      date: "October 10, 2024",
      postBy: "Guest",
      content:
        "Our chocolate ice cream is a dream come true for chocolate lovers. Made with high-quality cocoa and dark chocolate, it offers a deep, satisfying flavor that will keep you coming back for more. With its creamy texture and indulgent taste, this ice cream is perfect for satisfying your sweet cravings. Try it in a cone, or make a decadent hot fudge sundae that will elevate your dessert experience.",
      quote: "Chocolate is happiness that you can eat.",
    },
    {
      id: 14,
      title: "Mint Chocolate Chip Perfection",
      image: image4,
      description:
        "Enjoy the cool mint flavor combined with chunks of rich chocolate in every scoop.",
      date: "October 15, 2024",
      postBy: "Admin",
      content:
        "Our mint chocolate chip ice cream features a refreshing mint base loaded with delicious chocolate chunks. We use natural mint extract to ensure an invigorating flavor that is both refreshing and satisfying. Each scoop is a delightful balance of cool mint and rich chocolate, making it a favorite for both kids and adults. Enjoy it as is, or blend it into a milkshake for a minty twist!",
      quote: "Mint and chocolate are the perfect pairing!",
    },
    {
      id: 15,
      title: "Exotic Mango Sorbet",
      image: image5,
      description:
        "Treat yourself to a refreshing mango sorbet, bursting with tropical flavors and made with real fruit.",
      date: "October 13, 2024",
      postBy: "Editor",
      content:
        "Our mango sorbet is made with ripe, juicy mangoes, delivering a vibrant tropical taste in every bite. This dairy-free treat is perfect for those seeking a lighter option without sacrificing flavor. Each scoop is packed with pure mango goodness, making it a refreshing option on a hot summer day. Serve it with fresh fruit or as a palate cleanser between courses for a gourmet touch.",
      quote: "Indulge in the taste of the tropics with our mango sorbet.",
    },
    {
      id: 16,
      title: "Cookies and Cream Extravaganza",
      image: image6,
      description:
        "Indulge in our cookies and cream ice cream, featuring crushed chocolate cookies in a creamy vanilla base.",
      date: "October 18, 2024",
      postBy: "Admin",
      content:
        "Our cookies and cream ice cream is a crowd-pleaser. With chunks of rich chocolate cookies folded into a smooth vanilla base, it's the perfect dessert for any occasion. Each bite offers a satisfying crunch and a sweet, creamy flavor that brings back nostalgic memories of childhood. Enjoy it in a cup, cone, or as a filling for an ice cream sandwich. It's a classic favorite that never disappoints.",
      quote:
        "Cookies and cream is a timeless classic that never goes out of style.",
    },
    {
      id: 17,
      title: "Classic Rocky Road Adventure",
      image: image7,
      description:
        "Enjoy a delightful mix of chocolate ice cream with marshmallows and crunchy almonds in our Rocky Road.",
      date: "October 12, 2024",
      postBy: "Guest",
      content:
        "Our Rocky Road ice cream combines rich chocolate ice cream with fluffy marshmallows and crunchy almonds for a delightful adventure of flavors and textures in every scoop. It’s the perfect combination of creamy, chewy, and crunchy that appeals to ice cream lovers of all ages. Enjoy it as is, or create an epic sundae with whipped cream and a cherry on top.",
      quote:
        "Rocky Road: A classic combination of flavors that brings joy with every bite.",
    },
    {
      id: 18,
      title: "Salted Caramel Indulgence",
      image: image8,
      description:
        "Treat yourself to our salted caramel ice cream, a perfect blend of sweet and salty in every bite.",
      date: "October 06, 2024",
      postBy: "Admin",
      content:
        "Our salted caramel ice cream is a luxurious treat that combines sweet caramel with a hint of salt, creating a perfectly balanced flavor that will satisfy your sweet tooth. Each scoop is rich and creamy, making it an ideal dessert for any occasion. Pair it with a slice of chocolate cake for a truly decadent experience, or enjoy it straight from the tub!",
      quote: "Sweet and salty—a perfect match in every scoop.",
    },
  ];
  const params = useParams();
  const { id } = params;
  const blog = blogPosts.find((p) => p.id === parseInt(id));

  if (!blog) {
    return <NotFound />;
  }

  return (
    <div>
      <TopSlider image1={heading1} image2={heading2} />
      <BlogDetailCompo blog={blog} />
    </div>
  );
};

export default BlogsDetails;
