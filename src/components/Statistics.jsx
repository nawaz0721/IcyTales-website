import heading from "../images/Our Statistics.png";

const Statistics = () => {
  const stats = [
    { number: "91", label: "Awards Win", sign: "+" },
    { number: "95", label: "Satisfied Clients", sign: "%" },
    { number: "48", label: "Years of Experience", sign: "+" },
    { number: "143", label: "Employees Working", sign: "+" },
  ];

  return (
    <div className="w-full py-16 bg-white">
      <div className="text-center mb-12">
        <div className="text-center">
          <h1 className="text-7xl text-center max-sm:text-6xl">
            Our <span className="text-pink-500">Statistics</span>
          </h1>
        </div>

        <p className="text-gray-500 mt-4">
          What makes us special through our impressive statistics.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-12">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-lg shadow-lg p-8 text-center"
          >
            <h3 className="text-5xl font-bold text-black mb-4">
              {stat.number}
              <span className="text-pink-500">{stat.sign}</span>
            </h3>
            <p className="text-lg font-medium text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
