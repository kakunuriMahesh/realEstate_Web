import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getHouses, searchHouses } from "../services/api";
import HouseCard from "../components/HouseCard";
import ScrollAnimation from "../components/ScrollAnimation";
import CustomDropdown from "../components/CustomDropdown";
import { Search, SlidersHorizontal, X } from "lucide-react";
 
const SearchHouses = () => {
  const [filters, setFilters] = useState({
    city: "",
    state: "",
    zip: "",
    country: "",
    minPrice: "",
    maxPrice: "",
    minBedrooms: "",
    maxBedrooms: "",
    minBathrooms: "",
    maxBathrooms: "",
    minArea: "",
    maxArea: "",
    status: null,
    propertyType: null,
    isFeatured: null,
    isActive: null,
  });
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

   

  useEffect(() => {
    const fetchAllHouses = async () => {
      try {
        const response = await getHouses();
        setHouses(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load houses.");
        setLoading(false);
      }
    };
    fetchAllHouses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleDropdownChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setIsFilterOpen(false); // Close modal on submit
    try {
      const searchFilters = Object.fromEntries(
        Object.entries(filters).filter(
          ([_, value]) => value !== "" && value !== null
        )
      );
      const response = await searchHouses(searchFilters);
      setHouses(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to search houses.");
      setLoading(false);
    }
  };

  const handleClearFilters = async () => {
    setFilters({
      city: "",
      state: "",
      zip: "",
      country: "",
      minPrice: "",
      maxPrice: "",
      minBedrooms: "",
      maxBedrooms: "",
      minBathrooms: "",
      maxBathrooms: "",
      minArea: "",
      maxArea: "",
      status: null,
      propertyType: null,
      isFeatured: null,
      isActive: null,
    });
    setLoading(true);
    setError(null);
    try {
      const response = await getHouses();
      setHouses(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load houses.");
      setLoading(false);
    }
  };

  const activeFilterCount = Object.values(filters).filter(
    (value) => value !== "" && value !== null
  ).length;

  const statusOptions = ["Any", "Rent", "Sale", "Pending", "Sold/Rented"];
  const propertyTypeOptions = [
    "Any",
    "Townhouse",
    "Apartment",
    "Single Family",
    "Condo",
    "Villa",
    "Other",
  ];
  const booleanOptions = ["Any", "true", "false"];

  const FilterForm = () => (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-wrap gap-4">
        {/* Status */}
        <div className="flex flex-wrap gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <CustomDropdown
              options={statusOptions}
              value={filters.status || "Any"}
              onChange={(value) => handleDropdownChange("status", value)}
              placeholder="Any Status"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Property Type
            </label>
            <CustomDropdown
              options={propertyTypeOptions}
              value={filters.propertyType || "Any"}
              onChange={(value) => handleDropdownChange("propertyType", value)}
              placeholder="Any Type"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Featured
            </label>
            <CustomDropdown
              options={booleanOptions}
              value={
                filters.isFeatured === null
                  ? "Any"
                  : filters.isFeatured.toString()
              }
              onChange={(value) =>
                handleDropdownChange(
                  "isFeatured",
                  value === "true" ? true : value === "false" ? false : null
                )
              }
              placeholder="Any"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Active
            </label>
            <CustomDropdown
              options={booleanOptions}
              value={
                filters.isActive === null ? "Any" : filters.isActive.toString()
              }
              onChange={(value) =>
                handleDropdownChange(
                  "isActive",
                  value === "true" ? true : value === "false" ? false : null
                )
              }
              placeholder="Any"
            />
          </div>
        </div>
        {/* Area */}
        <div className="flex gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              value={filters.city}
              onChange={handleInputChange}
              placeholder="e.g., Nalgonda"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              type="text"
              name="state"
              value={filters.state}
              onChange={handleInputChange}
              placeholder="e.g., Telangana"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Zip
            </label>
            <input
              type="text"
              name="zip"
              value={filters.zip}
              onChange={handleInputChange}
              placeholder="e.g., 508001"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={filters.country}
              onChange={handleInputChange}
              placeholder="e.g., USA"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
        {/* Price */}
        <div className="flex gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Min Price
            </label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleInputChange}
              placeholder="e.g., 10000"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Max Price
            </label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleInputChange}
              placeholder="e.g., 1000000"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
        {/* Room */}
        <div className="flex max-sm:flex-wrap gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Min Bedrooms
            </label>
            <input
              type="number"
              name="minBedrooms"
              value={filters.minBedrooms}
              onChange={handleInputChange}
              placeholder="e.g., 2"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Max Bedrooms
            </label>
            <input
              type="number"
              name="maxBedrooms"
              value={filters.maxBedrooms}
              onChange={handleInputChange}
              placeholder="e.g., 5"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Min Bathrooms
            </label>
            <input
              type="number"
              name="minBathrooms"
              value={filters.minBathrooms}
              onChange={handleInputChange}
              placeholder="e.g., 1"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Max Bathrooms
            </label>
            <input
              type="number"
              name="maxBathrooms"
              value={filters.maxBathrooms}
              onChange={handleInputChange}
              placeholder="e.g., 4"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
        {/* Measure */}
        <div className="flex gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Min Area (sq.ft)
            </label>
            <input
              type="number"
              name="minArea"
              value={filters.minArea}
              onChange={handleInputChange}
              placeholder="e.g., 1000"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Max Area (sq.ft)
            </label>
            <input
              type="number"
              name="maxArea"
              value={filters.maxArea}
              onChange={handleInputChange}
              placeholder="e.g., 5000"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-blue-400"
        >
          <Search className="h-5 w-5 mr-2" />
          {loading ? "Searching..." : "Search Properties"}
        </button>
      </div>
    </form>
  );

  return (
    <div className="bg-green-950 py-8 pt-[100px]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">
            Search Properties
          </h1>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="md:hidden flex items-center px-3 py-2 bg-green-800 text-white rounded-md hover:bg-green-900"
            aria-label="Open filters"
          >
            <SlidersHorizontal className="h-5 w-5 mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-2 bg-blue-800 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
        {/* Desktop Form */}
        {/* <div className="hidden md:block mb-8">
            <FilterForm />
          </div> */}

        {/* Mobile/Tablet Modal */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              onClick={() => setIsFilterOpen(false)}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="absolute bottom-0 left-0 w-full max-h-[90vh] bg-white rounded-t-lg shadow-lg overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                  <h2 style={{color:"black"}} className="text-lg font-semibold">
                    Filter Properties
                  </h2>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="text-gray-600 hover:text-gray-800"
                    aria-label="Close filters"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <FilterForm />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {activeFilterCount > 0
                ? `${activeFilterCount} Filters Applied`
                : "All Properties"}
            </h2>
            {activeFilterCount > 0 && (
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Clear Filters
              </button>
            )}
          </div>
          {loading ? (
            <p className="text-gray-600 text-center">Loading...</p>
          ) : error ? (
            <p className="text-red-600 text-center">{error}</p>
          ) : houses.length === 0 ? (
            <p className="text-gray-600 text-center">No properties found.</p>
          ) : (
            <div className="flex flex-wrap justify-start gap-4">
              {houses.map((house) => (
                <HouseCard key={house._id} house={house} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchHouses;

// TODO: fix filter opening according to screen

// import { useState, useEffect } from "react";
// import { getHouses, searchHouses } from "../services/api";
// import HouseCard from "../components/HouseCard";
// import ScrollAnimation from "../components/ScrollAnimation";
// import CustomDropdown from "../components/CustomDropdown";
// import { Search } from "lucide-react";

// const SearchHouses = () => {
//   const [filters, setFilters] = useState({
//     city: "",
//     state: "",
//     zip: "",
//     country: "",
//     minPrice: "",
//     maxPrice: "",
//     minBedrooms: "",
//     maxBedrooms: "",
//     minBathrooms: "",
//     maxBathrooms: "",
//     minArea: "",
//     maxArea: "",
//     status: null,
//     propertyType: null,
//     isFeatured: null,
//     isActive: null,
//   });
//   const [houses, setHouses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchAllHouses = async () => {
//       try {
//         const response = await getHouses();
//         setHouses(response.data);
//         setLoading(false);
//       } catch (kremoverr) {
//         setError("Failed to load houses.");
//         setLoading(false);
//       }
//     };
//     fetchAllHouses();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleDropdownChange = (name, value) => {
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     try {
//       const searchFilters = Object.fromEntries(
//         Object.entries(filters).filter(
//           ([_, value]) => value !== "" && value !== null
//         )
//       );
//       const response = await searchHouses(searchFilters);
//       setHouses(response.data);
//       setLoading(false);
//     } catch (err) {
//       setError("Failed to search houses.");
//       setLoading(false);
//     }
//   };

//   const statusOptions = ["Any", "Rent", "Sale", "Pending", "Sold/Rented"];
//   const propertyTypeOptions = [
//     "Any",
//     "Townhouse",
//     "Apartment",
//     "Single Family",
//     "Condo",
//     "Villa",
//     "Other",
//   ];
//   const booleanOptions = ["Any", "true", "false"];

//   return (
//     <div className="bg-gray-100 py-8">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <ScrollAnimation>
//           <h1 className="text-3xl font-bold text-gray-800 mb-6">
//             Search Properties
//           </h1>
//           <form
//             onSubmit={handleSubmit}
//             className="bg-white p-6 rounded-lg shadow-md mb-8"
//           >
//             <div className="flex flex-wrap gap-4">
//               {/* area */}
//               <div className="flex gap-2">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     City
//                   </label>
//                   <input
//                     type="text"
//                     name="city"
//                     value={filters.city}
//                     onChange={handleInputChange}
//                     placeholder="e.g., Nalgonda"
//                     className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     State
//                   </label>
//                   <input
//                     type="text"
//                     name="state"
//                     value={filters.state}
//                     onChange={handleInputChange}
//                     placeholder="e.g., Telangana"
//                     className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Zip
//                   </label>
//                   <input
//                     type="text"
//                     name="zip"
//                     value={filters.zip}
//                     onChange={handleInputChange}
//                     placeholder="e.g., 508001"
//                     className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Country
//                   </label>
//                   <input
//                     type="text"
//                     name="country"
//                     value={filters.country}
//                     onChange={handleInputChange}
//                     placeholder="e.g., USA"
//                     className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   />
//                 </div>
//               </div>
//               {/* price */}
//               <div className="flex gap-2">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Min Price
//                   </label>
//                   <input
//                     type="number"
//                     name="minPrice"
//                     value={filters.minPrice}
//                     onChange={handleInputChange}
//                     placeholder="e.g., 10000"
//                     className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Max Price
//                   </label>
//                   <input
//                     type="number"
//                     name="maxPrice"
//                     value={filters.maxPrice}
//                     onChange={handleInputChange}
//                     placeholder="e.g., 1000000"
//                     className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   />
//                 </div>
//               </div>
//               {/* room */}
//               <div className="flex max-sm:flex-wrap gap-2">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Min Bedrooms
//                   </label>
//                   <input
//                     type="number"
//                     name="minBedrooms"
//                     value={filters.minBedrooms}
//                     onChange={handleInputChange}
//                     placeholder="e.g., 2"
//                     className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Max Bedrooms
//                   </label>
//                   <input
//                     type="number"
//                     name="maxBedrooms"
//                     value={filters.maxBedrooms}
//                     onChange={handleInputChange}
//                     placeholder="e.g., 5"
//                     className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Min Bathrooms
//                   </label>
//                   <input
//                     type="number"
//                     name="minBathrooms"
//                     value={filters.minBathrooms}
//                     onChange={handleInputChange}
//                     placeholder="e.g., 1"
//                     className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Max Bathrooms
//                   </label>
//                   <input
//                     type="number"
//                     name="maxBathrooms"
//                     value={filters.maxBathrooms}
//                     onChange={handleInputChange}
//                     placeholder="e.g., 4"
//                     className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   />
//                 </div>
//               </div>
//               {/* measure */}
//               <div className="flex gap-2">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Min Area (sq.ft)
//                   </label>
//                   <input
//                     type="number"
//                     name="minArea"
//                     value={filters.minArea}
//                     onChange={handleInputChange}
//                     placeholder="e.g., 1000"
//                     className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Max Area (sq.ft)
//                   </label>
//                   <input
//                     type="number"
//                     name="maxArea"
//                     value={filters.maxArea}
//                     onChange={handleInputChange}
//                     placeholder="e.g., 5000"
//                     className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   />
//                 </div>
//               </div>
//               {/* Status */}
//               <div className="flex flex-wrap gap-2">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Status
//                   </label>
//                   <CustomDropdown
//                     options={statusOptions}
//                     value={filters.status || "Any"}
//                     onChange={(value) => handleDropdownChange("status", value)}
//                     placeholder="Any Status"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Property Type
//                   </label>
//                   <CustomDropdown
//                     options={propertyTypeOptions}
//                     value={filters.propertyType || "Any"}
//                     onChange={(value) =>
//                       handleDropdownChange("propertyType", value)
//                     }
//                     placeholder="Any Type"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Featured
//                   </label>
//                   <CustomDropdown
//                     options={booleanOptions}
//                     value={
//                       filters.isFeatured === null
//                         ? "Any"
//                         : filters.isFeatured.toString()
//                     }
//                     onChange={(value) =>
//                       handleDropdownChange(
//                         "isFeatured",
//                         value === "true"
//                           ? true
//                           : value === "false"
//                           ? false
//                           : null
//                       )
//                     }
//                     placeholder="Any"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Active
//                   </label>
//                   <CustomDropdown
//                     options={booleanOptions}
//                     value={
//                       filters.isActive === null
//                         ? "Any"
//                         : filters.isActive.toString()
//                     }
//                     onChange={(value) =>
//                       handleDropdownChange(
//                         "isActive",
//                         value === "true"
//                           ? true
//                           : value === "false"
//                           ? false
//                           : null
//                       )
//                     }
//                     placeholder="Any"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="mt-6 flex justify-center">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-blue-400"
//               >
//                 <Search className="h-5 w-5 mr-2" />
//                 {loading ? "Searching..." : "Search Properties"}
//               </button>
//             </div>
//           </form>
//         </ScrollAnimation>
//         <ScrollAnimation>
//           <div className="mt-8">
//             {loading ? (
//               <p className="text-gray-600 text-center">Loading...</p>
//             ) : error ? (
//               <p className="text-red-600 text-center">{error}</p>
//             ) : houses.length === 0 ? (
//               <p className="text-gray-600 text-center">No properties found.</p>
//             ) : (
//               <div className="flex flex-wrap justify-start gap-4">
//                 {houses.map((house) => (
//                   <HouseCard key={house._id} house={house} />
//                 ))}
//               </div>
//             )}
//           </div>
//         </ScrollAnimation>
//       </div>
//     </div>
//   );
// };

// export default SearchHouses;

// FIXME: check

// import { useState } from "react";
// import { searchHouses } from "../services/api";
// import HouseCard from "../components/HouseCard";
// import ScrollAnimation from "../components/ScrollAnimation";
// import CustomDropdown from "../components/CustomDropdown";
// import { Search } from "lucide-react";

// const SearchHouses = () => {
//   const [filters, setFilters] = useState({
//     city: "",
//     state: "",
//     zip: "",
//     country: "",
//     minPrice: "",
//     maxPrice: "",
//     minBedrooms: "",
//     maxBedrooms: "",
//     minBathrooms: "",
//     maxBathrooms: "",
//     minArea: "",
//     maxArea: "",
//     status: null,
//     propertyType: null,
//     isFeatured: null,
//     isActive: null,
//   });
//   const [houses, setHouses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleDropdownChange = (name, value) => {
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     try {
//       const searchFilters = Object.fromEntries(
//         Object.entries(filters).filter(
//           ([_, value]) => value !== "" && value !== null
//         )
//       );
//       const response = await searchHouses(searchFilters);
//       setHouses(response.data);
//       setLoading(false);
//     } catch (err) {
//       setError("Failed to search houses.");
//       setLoading(false);
//     }
//   };

//   const statusOptions = ["Any", "Rent", "Sale", "Pending", "Sold/Rented"];
//   const propertyTypeOptions = [
//     "Any",
//     "Townhouse",
//     "Apartment",
//     "Single Family",
//     "Condo",
//     "Villa",
//     "Other",
//   ];
//   const booleanOptions = ["Any", "true", "false"];

//   return (
//     <div className="bg-gray-100 py-8">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">
//           Search Properties
//         </h1>
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white p-6 rounded-lg shadow-md mb-8"
//         >
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 City
//               </label>
//               <input
//                 type="text"
//                 name="city"
//                 value={filters.city}
//                 onChange={handleInputChange}
//                 placeholder="e.g., Nalgonda"
//                 className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 State
//               </label>
//               <input
//                 type="text"
//                 name="state"
//                 value={filters.state}
//                 onChange={handleInputChange}
//                 placeholder="e.g., Telangana"
//                 className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Zip
//               </label>
//               <input
//                 type="text"
//                 name="zip"
//                 value={filters.zip}
//                 onChange={handleInputChange}
//                 placeholder="e.g., 508001"
//                 className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Country
//               </label>
//               <input
//                 type="text"
//                 name="country"
//                 value={filters.country}
//                 onChange={handleInputChange}
//                 placeholder="e.g., USA"
//                 className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Min Price
//               </label>
//               <input
//                 type="number"
//                 name="minPrice"
//                 value={filters.minPrice}
//                 onChange={handleInputChange}
//                 placeholder="e.g., 10000"
//                 className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Max Price
//               </label>
//               <input
//                 type="number"
//                 name="maxPrice"
//                 value={filters.maxPrice}
//                 onChange={handleInputChange}
//                 placeholder="e.g., 1000000"
//                 className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Min Bedrooms
//               </label>
//               <input
//                 type="number"
//                 name="minBedrooms"
//                 value={filters.minBedrooms}
//                 onChange={handleInputChange}
//                 placeholder="e.g., 2"
//                 className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Max Bedrooms
//               </label>
//               <input
//                 type="number"
//                 name="maxBedrooms"
//                 value={filters.maxBedrooms}
//                 onChange={handleInputChange}
//                 placeholder="e.g., 5"
//                 className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Min Bathrooms
//               </label>
//               <input
//                 type="number"
//                 name="minBathrooms"
//                 value={filters.minBathrooms}
//                 onChange={handleInputChange}
//                 placeholder="e.g., 1"
//                 className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Max Bathrooms
//               </label>
//               <input
//                 type="number"
//                 name="maxBathrooms"
//                 value={filters.maxBathrooms}
//                 onChange={handleInputChange}
//                 placeholder="e.g., 4"
//                 className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Min Area (sq.ft)
//               </label>
//               <input
//                 type="number"
//                 name="minArea"
//                 value={filters.minArea}
//                 onChange={handleInputChange}
//                 placeholder="e.g., 1000"
//                 className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Max Area (sq.ft)
//               </label>
//               <input
//                 type="number"
//                 name="maxArea"
//                 value={filters.maxArea}
//                 onChange={handleInputChange}
//                 placeholder="e.g., 5000"
//                 className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Status
//               </label>
//               <CustomDropdown
//                 options={statusOptions}
//                 value={filters.status || "Any"}
//                 onChange={(value) => handleDropdownChange("status", value)}
//                 placeholder="Any Status"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Property Type
//               </label>
//               <CustomDropdown
//                 options={propertyTypeOptions}
//                 value={filters.propertyType || "Any"}
//                 onChange={(value) =>
//                   handleDropdownChange("propertyType", value)
//                 }
//                 placeholder="Any Type"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Featured
//               </label>
//               <CustomDropdown
//                 options={booleanOptions}
//                 value={
//                   filters.isFeatured === null
//                     ? "Any"
//                     : filters.isFeatured.toString()
//                 }
//                 onChange={(value) =>
//                   handleDropdownChange(
//                     "isFeatured",
//                     value === "true" ? true : value === "false" ? false : null
//                   )
//                 }
//                 placeholder="Any"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Active
//               </label>
//               <CustomDropdown
//                 options={booleanOptions}
//                 value={
//                   filters.isActive === null
//                     ? "Any"
//                     : filters.isActive.toString()
//                 }
//                 onChange={(value) =>
//                   handleDropdownChange(
//                     "isActive",
//                     value === "true" ? true : value === "false" ? false : null
//                   )
//                 }
//                 placeholder="Any"
//               />
//             </div>
//           </div>
//           <div className="mt-6 flex justify-center">
//             <button
//               type="submit"
//               disabled={loading}
//               className="flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-blue-400"
//             >
//               <Search className="h-5 w-5 mr-2" />
//               {loading ? "Searching..." : "Search Properties"}
//             </button>
//           </div>
//         </form>

//         <div className="mt-8">
//           {loading ? (
//             <p className="text-gray-600 text-center">Searching...</p>
//           ) : error ? (
//             <p className="text-red-600 text-center">{error}</p>
//           ) : houses.length === 0 ? (
//             <p className="text-gray-600 text-center">No properties found.</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {houses.map((house) => (
//                 <HouseCard key={house._id} house={house} />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchHouses;
