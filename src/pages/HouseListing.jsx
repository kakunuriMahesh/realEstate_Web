import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getHouses } from "../services/api";
import HouseCard from "../Components/HouseCardItems";
import ScrollAnimation from "../Components/ScrollAnimatSmooth";
import handleScrollToTop from "../Components/handleScrollToTop";
import ShimmerHouseCard from "../Components/ShimmerHouseCard";

const HouseListing = () => {
  const [houses, setHouses] = useState([]);
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All Properties");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await getHouses();
        setHouses(response.data);
        setFilteredHouses(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load houses.");
        setLoading(false);
      }
    };
    fetchHouses();
  }, []);

  useEffect(() => {
    if (statusFilter === "All Properties") {
      setFilteredHouses(houses);
    } else if (statusFilter === "For Sale") {
      setFilteredHouses(houses.filter((house) => house.status === "Sale"));
    } else if (statusFilter === "For Rent") {
      setFilteredHouses(houses.filter((house) => house.status === "Rent"));
    }
  }, [statusFilter, houses]);

  const handleStatusChange = (status) => {
    setStatusFilter(status);
  };

  console.log(
    filteredHouses[0]?.coverImg.url,
    "filteredHouses[3].coverImg.url"
  );

  return (
    <div className="bg-green-950 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <h1 className="text-3xl font-bold text-white mb-6">Properties</h1>
          <div className="flex justify-start md:justify-end-safe gap-4 mb-8">
            {["All Properties", "For Sale", "For Rent"].map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className={`px-2 py-1 text-sm rounded-md font-semibold ${
                  statusFilter === status
                    ? "bg-green-900 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </ScrollAnimation>

        {/* {loading ? (
          <div className="flex flex-wrap gap-4">
            {Array(4)
              .fill()
              .map((_, i) => (
                <ShimmerHouseCard key={i} />
              ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-4">
            {houses.map((house) => (
              <HouseCard key={house._id} house={house} />
            ))}
          </div>
        )} */}

        {loading ? (
          // <p className="text-gray-600 text-center">Loading...</p>
          <div className="flex flex-wrap gap-4">
            {Array(4)
              .fill()
              .map((_, i) => (
                <ShimmerHouseCard key={i} />
              ))}
          </div>
        ) : error ? (
          <p className="text-red-600 text-center">{error}</p>
        ) : filteredHouses.length === 0 ? (
          <p className="text-gray-600 text-center">No properties found.</p>
        ) : (
          <div className="flex">
            <div className="flex flex-wrap justify-start items-start gap-2 ">
              {filteredHouses.slice(0, 3).map((house) => (
                <HouseCard
                  key={house._id}
                  house={house}
                  filteredHouses={filteredHouses}
                />
              ))}

              {/* {filteredHouses.length > 3 && (
                  <div className="relative h-[400px] w-fit overflow-hidden rounded-lg">
                    <div
                      className="relative object-cover hover:scale-150 duration-300 bg-cover bg-center flex items-center justify-center rounded-lg shadow-md overflow-hidden h-[400px] w-[250px] sm:w-[280px] lg:w-[300px] cursor-pointer group"
                      style={{
                        backgroundImage: `url(${filteredHouses[3]?.coverImg.url})`,
                      }}
                      onClick={() => navigate("/search")}
                    >
                      <div className="absolute inset-0 bg-black opacity-[0.5] group-hover:bg-opacity-50 transition-all duration-300"></div>

                      <div className=" text-white text-xl font-semibold z-40">
                        View All Properties
                      </div>
                    </div>
                  </div>
                )} */}

              {filteredHouses.length > 3 && (
                <div className="h-[330px] w-fit  overflow-hidden rounded-lg">
                  <div
                    className="relative h-[400px]  w-[250px] sm:w-[280px] lg:w-[300px] cursor-pointer group rounded-lg shadow-md overflow-hidden"
                    onClick={() => {
                      navigate("/properties");
                      handleScrollToTop();
                    }}
                  >
                    {/* Background Image with Scaling */}
                    <div
                      className="absolute  inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-150"
                      style={{
                        backgroundImage: `url(${filteredHouses[3]?.coverImg.url})`,
                      }}
                    ></div>
                    {/* Darkening Overlay */}
                    <div className="absolute inset-0 bg-black opacity-[0.5] group-hover:bg-opacity-50 transition-all duration-300"></div>
                    {/* Stable Text */}
                    <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-semibold z-40">
                      <span className="p-3 bg-green-900 rounded-md">
                        View All
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HouseListing;

// import { useState, useEffect } from 'react';
// import { getHouses } from '../services/api';
// import HouseCard from '../components/HouseCard';
// import ScrollAnimation from '../components/ScrollAnimation';

// const HouseListing = () => {
//   const [houses, setHouses] = useState([]);
//   const [filteredHouses, setFilteredHouses] = useState([]);
//   const [statusFilter, setStatusFilter] = useState('All Properties');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchHouses = async () => {
//       try {
//         const response = await getHouses();
//         setHouses(response.data);
//         setFilteredHouses(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load houses.');
//         setLoading(false);
//       }
//     };
//     fetchHouses();
//   }, []);

//   useEffect(() => {
//     if (statusFilter === 'All Properties') {
//       setFilteredHouses(houses);
//     } else if (statusFilter === 'For Sale') {
//       setFilteredHouses(houses.filter((house) => house.status === 'Sale'));
//     } else if (statusFilter === 'For Rent') {
//       setFilteredHouses(houses.filter((house) => house.status === 'Rent'));
//     }
//   }, [statusFilter, houses]);

//   const handleStatusChange = (status) => {
//     setStatusFilter(status);
//   };

//   return (
//     <div className="bg-gray-100 py-8">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <ScrollAnimation>
//           <h1 className="text-3xl font-bold text-gray-800 mb-6">Properties</h1>
//           <div className="flex gap-4 mb-8">
//             {['All Properties', 'For Sale', 'For Rent'].map((status) => (
//               <button
//                 key={status}
//                 onClick={() => handleStatusChange(status)}
//                 className={`px-4 py-2 rounded-md font-semibold ${
//                   statusFilter === status
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
//                 }`}
//               >
//                 {status}
//               </button>
//             ))}
//           </div>
//         </ScrollAnimation>
//         <ScrollAnimation>
//           {loading ? (
//             <p className="text-gray-600 text-center">Loading...</p>
//           ) : error ? (
//             <p className="text-red-600 text-center">{error}</p>
//           ) : filteredHouses.length === 0 ? (
//             <p className="text-gray-600 text-center">No properties found.</p>
//           ) : (
//             <div className="flex gap-2">
//               {filteredHouses.map((house) => (
//                 <HouseCard key={house._id} house={house} />
//               ))}
//             </div>
//           )}
//         </ScrollAnimation>
//       </div>
//     </div>
//   );
// };

// export default HouseListing;
