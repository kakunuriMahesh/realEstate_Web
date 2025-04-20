import React from "react";
import aboutImg from "../assets/about_img.jpg";
import { useLocation } from "react-router-dom";
import teamImg from "../assets/team_img.jpg";

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
          <div className="flex md:flex-row justify-between mt-8">
            <div className="">
              <h2 className="text-2xl font-semibold text-gray-800">
                Our Vision
              </h2>
              <p className="mt-4 text-gray-600">
                Heights Realty was founded by Lana Radl, a Northeastern Ohio
                (NEO) native with a deep-rooted passion for architecture and
                city planning. Her journey began when she bought her first home
                in Cleveland Heights, fulfilling her dream of owning backyard
                chickens, installing solar panels, and enjoying a great view.
                Now living in Shaker Heights, she enjoys the space and yard she
                always wanted. Lana’s goal is to help you find the same —
                whether it’s your starter home, an upgrade, or a move toward
                simplifying your lifestyle.
              </p>
            </div>
            <div className="">
              <img
                className="max-sm:hidden rounded-lg w-[1750px] md:h-[300px] object-cover"
                src={teamImg}
                alt="about-team"
              />
            </div>
            <div className="min-sm:hidden lg:block ">
              <h2 className="text-2xl font-semibold text-gray-800">
                Our Expertise
              </h2>
              <p className="text-gray-600">
                In addition to residential real estate, Lana brings valuable
                experience in investment properties. She has managed a 28-unit
                commercial building and other portfolios, giving her a sharp eye
                for identifying profitable opportunities in the NEO region,
                which is rich with historic buildings and diverse communities.
                Whether you're a first-time investor or experienced, Lana will
                guide you through: Tax implications Utility costs Building
                upkeep estimates, and more — ensuring you're fully informed
                every step of the way. She also teaches Property Management for
                the Youngstown Association of Realtors, further showcasing her
                commitment to educating and empowering others.
              </p>
            </div>
          </div>
          <div>
            <div className="mx-4">
              <img
                className="min-sm:hidden rounded-lg w-[1750px] h-[300px] object-cover"
                src={teamImg}
                alt="about-team"
              />
            </div>
            <div className="sm:block lg:hidden mt-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Our Expertise
              </h2>
              <p className="text-gray-600">
                In addition to residential real estate, Lana brings valuable
                experience in investment properties. She has managed a 28-unit
                commercial building and other portfolios, giving her a sharp eye
                for identifying profitable opportunities in the NEO region,
                which is rich with historic buildings and diverse communities.
                Whether you're a first-time investor or experienced, Lana will
                guide you through: Tax implications Utility costs Building
                upkeep estimates, and more — ensuring you're fully informed
                every step of the way. She also teaches Property Management for
                the Youngstown Association of Realtors, further showcasing her
                commitment to educating and empowering others.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mt-8">
                Our Commitment
              </h2>
              <p className="mt-4 text-gray-600">
                Before launching Heights Realty, Lana worked in leasing for a
                local management company. There, she helped countless
                individuals and families — from students to professionals — find
                the right home near University Circle, the hospitals, and CWRU.
                Whether you're from out of town or already local, Lana’s
                experience ensures a smooth and personalized rental search
                tailored to your unique needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
