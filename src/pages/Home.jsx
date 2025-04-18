import { useState, useEffect } from "react";
import { getHouses } from "../services/api";
import HouseCard from "../components/HouseCard";

const Home = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHouses()
      .then((res) => {
        setHouses(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className=" py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold">Find Your Dream Home</h1>
          <p className="mt-4 text-lg">Explore our listings for buying, renting, or selling properties.</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : houses.length === 0 ? (
          <p className="text-gray-600">No listings available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {houses.map((house) => (
              <HouseCard key={house._id} house={house} />
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Home;