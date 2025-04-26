import {
  BadgeDollarSignIcon,
  Heart,
  House,
  SaveAll,
  Search,
} from "lucide-react";
import React from "react";
import { BiPurchaseTag } from "react-icons/bi";
import AnimatedSection from "../Components/AnimatedSection";

const WhyChooseUs = () => {
  const services = [
    {
      icon: <SaveAll />,
      title: "Property Sales",
      description:
        "Expertly promoting and selling your property to attract qualified buyers.",
    },
    {
      icon: <BiPurchaseTag />,
      title: "Buyer Representation",
      description:
        "Guiding you through the home-buying process, prioritizing your interests.",
    },
    {
      icon: <BadgeDollarSignIcon />,
      title: "Rental Management",
      description:
        "Managing tenant relations, maintenance, and finances to maximize rental returns.",
    },
    {
      icon: <House />,
      title: "Investment Consulting",
      description:
        "Providing strategic advice to help you capitalize on real estate opportunities.",
    },
    {
      icon: <Search />,
      title: "Property Valuation",
      description:
        "Accurately assessing your property’s value for sales, purchases, or investments.",
    },
    {
      icon: <Heart />,
      title: "Tailored Solutions",
      description:
        "Delivering customized real estate services aligned with your specific goals.",
    },
  ];

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Why Choose Us</h1>
      </div>
      <div className="flex flex-wrap justify-center md:justify-start items-center ">
        {services.map((service, index) => (
          <AnimatedSection animationClass="zoom-in">
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
                <p style={{ color: "gray" }} className=" text-sm">
                  {service.description}
                </p>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
