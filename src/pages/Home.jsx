import { useState, useEffect } from "react";
import { getHouses } from "../services/api";
import HouseCard from "../Components/HouseCardItems";
// import bannerImg from "../assets/home_img.jpg";
import bannerImg from "../assets/HomeImage.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setMenuState, setServiceState } from "../store/stateManage";
import ServicesScroll from "./ServicesScroll";
import About from "./About";
import Services from "./Services";
import Testimonials from "./Testimonials";
import ContactForm from "./ContactForm";
import WhyChooseUs from "./WhyChooseUs";
import RelatedHouses from "../Components/RelatedHousesCheck";
import DetailedView from "./DetailedView";
import ScrollAnimation from "../Components/ScrollAnimatSmooth";
import StatsCounter from "../Components/StatsCounter";
import HouseListing from "./HouseListing";

const Home = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const menustate = useSelector((state) => state.stateManage.menuState);
  console.log(menustate, "menustate");

  // const brands = ["Appartment", "Townhouse", "Villa", "Rental", "Sale"];

  // useEffect(() => {
  //   getHouses()
  //     .then((res) => {
  //       setHouses(res.data);
  //       setLoading(false);
  //     })
  //     .catch(() => setLoading(false));
  // }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRelatedHouses = async () => {
      try {
        const response = await getHouses();
        const houses = response.data;

        setHouses(houses);
        // setRelatedHouses(houses.slice(0, 3)); // Limit to 3 houses
        setLoading(false);
      } catch (error) {
        console.error("Error fetching related houses:", error);
        setLoading(false);
      }
    };
    fetchRelatedHouses();
  }, []);

  const setViewOptions = () => {
    dispatch(setMenuState(false));
    dispatch(setServiceState(false));
  };

  return (
    <div>
      <div
        onClick={setViewOptions}
        style={{
          backgroundImage: `url(${bannerImg})`,
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
            <h1 className="text-4xl font-semibold md:text-7xl">
              {/* Find Your Dream Home */}
              Find affordable or luxury homes in Northeastern Ohio with Heights
              Realty!
            </h1>
            <p className="mt-4 text-lg">
              Explore our listings for buying, renting, or selling properties.
            </p>
          </div>
        </div>
      </div>
      <div
        onClick={() => dispatch(setServiceState(false))}
        className="bg-green-950"
      >
        <ServicesScroll />
        <About />
        {/* <Services /> */}
        {/* <div className=" flex flex-wrap justify-center md:justify-start items-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-3">
        {houses.map((house) => (
          <ScrollAnimation key={house._id}>
            <HouseCard house={house} />
          </ScrollAnimation>
        ))}
      </div> */}
        <HouseListing />
        {/* Stats Section */}
        <ScrollAnimation>
          <StatsCounter />
        </ScrollAnimation>
        <WhyChooseUs />
        <Testimonials />
        <ContactForm />
      </div>
    </div>
  );
};

export default Home;
