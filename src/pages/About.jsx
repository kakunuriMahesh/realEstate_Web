import React from "react";
import aboutImg from "../assets/about_img.jpg";
import { useLocation } from "react-router-dom";
import teamImg from "../assets/LanaPict.jpg";
import StatsCounter from "../Components/StatsCounter";
import AnimatedSection from "../Components/AnimatedSection";
import SearchHouses from "../Components/SearchHouses";
import handleScrollToTop from "../Components/handleScrollToTop";
import { useDispatch } from "react-redux";
import { setServiceState } from "../store/stateManage";

const About = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const dispatch = useDispatch()

  return (
    <div onClick={() => dispatch(setServiceState(false))}>
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8  shadow-md p-6">
          {path === "about" ? (
            <></>
          ) : (
            <h1 className="text-3xl font-bold text-white">About Us</h1>
          )}
          <div className="lg:flex gap-4">
            <div className="flex gap-4 w-full">
              <div className="w-full flex gap-4">
                <div className="mt-6">
                  <AnimatedSection animationClass="slide-in-left">
                    <h2 className="text-2xl font-semibold mt-4 ">Our Expertise</h2>
                  </AnimatedSection>
                  <AnimatedSection animationClass="slide-in-left">
                    <p className="mb-2 text-justify">
                      {/*  */}
                      In addition to residential real estate, Lana brings
                      valuable experience in investment properties. She has
                      managed a 28-unit commercial building and other
                      portfolios, giving her a sharp eye for identifying
                      profitable opportunities in the NEO region, which is rich
                      with historic buildings and diverse communities. Whether
                      you're a first-time investor or experienced, Lana will
                      guide you through: Tax implications Utility costs Building
                      upkeep estimates, and more — ensuring you're fully
                      informed every step of the way. She also teaches Property
                      Management for the Youngstown Association of Realtors,
                      further showcasing her commitment to educating and
                      empowering others.
                    </p>
                  </AnimatedSection>
                </div>
                <AnimatedSection animationClass="zoom-out">
                  <img
                    className="border-2 mt-4 border-amber-50 max-md:hidden rounded-lg lg:w-[2750px] w-[2500px] md:h-[300px] object-left"
                    src={teamImg}
                    alt="about-team"
                  />
                </AnimatedSection>
              </div>
            </div>
          </div>
          <AnimatedSection animationClass="slide-up">
            <div className="">
              <h2 className="text-2xl font-semibold mt-4 ">Our Commitment</h2>
              <p className="text-justify mb-2">
                Before launching Heights Realty, Lana worked in leasing for a
                local management company. There, she helped countless
                individuals and families — from students to professionals — find
                the right home near University Circle, the hospitals, and CWRU.
                Whether you're from out of town or already local, Lana’s
                experience ensures a smooth and personalized rental search
                tailored to your unique needs.
              </p>
            </div>
          </AnimatedSection>
          <div>
            <AnimatedSection animationClass="zoom-out">
              <div className="">
                <img
                  className="sm:hidden rounded-lg w-[1750px] h-[300px] object-fill mt-4 "
                  src={teamImg}
                  alt="about-team"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection animationClass="slide-up">
              <div className="mt-6">
                <h2 className="text-2xl font-semibold mt-4 ">Our Vision</h2>
                <p className="mb-2 text-justify">
                  Heights Realty was founded by Lana Radl, a Northeastern Ohio
                  (NEO) native with a deep-rooted passion for architecture and
                  city planning. Her journey began when she bought her first
                  home in Cleveland Heights, fulfilling her dream of owning
                  backyard chickens, installing solar panels, and enjoying a
                  great view. Now living in Shaker Heights, she enjoys the space
                  and yard she always wanted. Lana’s goal is to help you find
                  the same — whether it’s your starter home, an upgrade, or a
                  move toward simplifying your lifestyle.
                </p>
              </div>
            </AnimatedSection>
          </div>
          {path === "about" && <StatsCounter />}
        </div>
      </div>
      {/* <SearchHouses/> */}
    </div>
  );
};

export default About;
