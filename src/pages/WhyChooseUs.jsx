import React from "react";

const WhyChooseUs = () => {
  const services = [
    {
      icon: "🏠",
      title: "Property Sales",
      description:
        "Expertly promoting and selling your property to attract qualified buyers.",
    },
    {
      icon: "💬",
      title: "Buyer Representation",
      description:
        "Guiding you through the home-buying process, prioritizing your interests.",
    },
    {
      icon: "📄",
      title: "Rental Management",
      description:
        "Managing tenant relations, maintenance, and finances to maximize rental returns.",
    },
    {
      icon: "📊",
      title: "Investment Consulting",
      description:
        "Providing strategic advice to help you capitalize on real estate opportunities.",
    },
    {
      icon: "🔍",
      title: "Property Valuation",
      description:
        "Accurately assessing your property’s value for sales, purchases, or investments.",
    },
    {
      icon: "🤝",
      title: "Tailored Solutions",
      description:
        "Delivering customized real estate services aligned with your specific goals.",
    },
  ];

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="text-center mb-8">
        <a
          href="#"
          className="text-sm text-gray-500 hover:underline mb-2 inline-block"
        >
          Why Choose Us
        </a>
        <h1 className="text-3xl font-bold text-gray-900">
          EXPLORE OUR RANGE OF EXPERT REAL ESTATE SERVICES
        </h1>
      </div>
      <div className="flex flex-wrap justify-center md:justify-start items-center ">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-gray-100 w-[350px] m-4  p-6 rounded-xl border border-gray-200 text-center shadow-xl"
          >
            <div className="text-3xl text-left text-gray-600 mb-4">
              {service.icon}
            </div>
            <div className="  text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
