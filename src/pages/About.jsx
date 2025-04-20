import React from "react";
import aboutImg from "../assets/about_img.jpg";
import { useLocation } from "react-router-dom";

const About = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  return (
    <div>
      {path === "about" && (
        <div
          style={{
            backgroundImage: `url(${aboutImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
          }}
        >
          <div className="py-16 pt-[140px] bg-gradient-to-t from-black to-transparent">
            <div className="max-w-6xl p-4 text-white slide-in-text">
              <h1 className="text-4xl font-semibold md:text-7xl">About Us</h1>
              <p className="mt-4 text-lg">
                Explore our listings for buying, renting, or selling properties.
              </p>
            </div>
          </div>
        </div>
      )}
      <div className=" bg-green-950 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-lg shadow-md p-6">
          {path === "about" ? (
            <></>
          ) : (
            <h1 className="text-3xl font-bold text-black">About Us</h1>
          )}
          <p className="mt-4 text-gray-600">
            We are a leading real estate company dedicated to helping you find
            the perfect home or investment property. With years of experience,
            our team provides expert guidance in buying, selling, renting, and
            property management.
          </p>
          <p className="mt-4 text-gray-600">
            Our mission is to make your real estate journey seamless and
            stress-free. Contact us today to learn more!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
