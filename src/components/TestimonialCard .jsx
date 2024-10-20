import image1 from "../images/Figure → testimonial3-personimage1.jpg.png";
import image2 from "../images/Figure → testimonial3-personimage2.jpg.png";
import image3 from "../images/Figure → testimonial3-personimage3.jpg.png";
import image4 from "../images/Figure → testimonial3-personimage4.jpg.png";

import { FaQuoteLeft, FaStar } from "react-icons/fa";

const TestimonialCard = () => {
  const info = [
    {
      id: 1,
      name: "John Doe",
      image: image1,
      testimonial:
        "Quisuam est rui dolorem ipsum rui do sitamet, consectetur, adipise velit seu nonnumquam eiusm temora incidunt autlabore siner...",
    },
    {
      id: 2,
      name: "Jane Smith",
      image: image2,
      testimonial:
        "Ruisuam est rui dolorem ipsum rui do sitamet, consectetur, adipise velit seu nonnumquam eiusm temora incidunt aut labore sinr...",
    },
    {
      id: 3,
      name: "Michael Johnson",
      image: image3,
      testimonial:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione...",
    },
    {
      id: 4,
      name: "Emily Brown",
      image: image4,
      testimonial:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur...",
    },
  ];

  return (
    <div className="p-6 mx-auto my-6 max-w-screen-lg">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {info.map((person) => (
          <div
            key={person.id}
            className="shadow-lg rounded-lg p-6 flex flex-col"
          >
            <FaQuoteLeft className="text-pink-500 text-3xl mb-4" />
            <p className="text-gray-600 text-sm">{person.testimonial}</p>
            <div className="flex items-center mt-6">
              <img
                src={person.image}
                alt={person.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div className="flex flex-col">
                <div className="flex items-center space-x-1 text-yellow-400">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <h4 className="text-pink-500 font-bold text-lg">
                  {person.name}
                </h4>
                <p className="text-gray-500 text-sm">Happy Client</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCard;
