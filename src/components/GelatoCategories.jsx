import images1 from "../images/perfect-image1.jpg.png";
import images2 from "../images/perfect-image2.jpg.png";
import images3 from "../images/perfect-image3.jpg.png";
import images4 from "../images/perfect-image4.jpg.png";

const GelatoCategories = () => {
  const categories = [
    {
      id: 7,
      name: "Classic Flavors",
      image: images1,
    },
    {
      id: 8,
      name: "Seasonal Specials",
      image: images2,
    },
    {
      id: 9,
      name: "Gelato Cakes",
      image: images3,
    },
    {
      id: 10,
      name: "Gelato Pints",
      image: images4,
    },
  ];

  return (
    <div className="gelato-categories">
      <div className="title">
        <h1 className="text-7xl text-center max-sm:text-6xl">
          Find Your Perfect <span className="text-pink-500">Gelato</span>
        </h1>
      </div>
      <p className="subtitle my-4">
        Browse through our different gelato offerings to find your favorite.
      </p>
      <div className="categories-grid">
        {categories.map((category, index) => (
          <div className="category-card my-4" key={index}>
            <img
              src={category.image}
              alt={category.name}
              className="category-image"
            />
            <div className="category-info">
              <h2>{category.name}</h2>
              <span className="category-button">&#10132;</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GelatoCategories;
