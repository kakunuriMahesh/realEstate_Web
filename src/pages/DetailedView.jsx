import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getHouses } from "../services/api";
import ScrollAnimation from "../components/ScrollAnimation";
import RelatedHouses from "../components/RelatedHouses";
import ContactForm from "../pages/ContactForm";
import {
  MapPin,
  Mail,
  Phone,
  Flame,
  Warehouse,
  TreeDeciduous,
  Utensils,
  Fan,
  Shirt,
  Waves,
  Dumbbell,
  Car,
  ArrowUpDown,
  Shield,
  Users,
  Star,
  Gem,
  Key,
  Paintbrush,
  Leaf,
  Mountain,
  Tag,
  ChevronLeft,
  ChevronRight,
  X,
  Contact,
  Bed,
  Bath,
  Ratio,
} from "lucide-react";
import MortgageCalculator from "../Components/MortgageCalculator";
import AnimatedSection from "../Components/AnimatedSection";
import handleScrollToTop from "../Components/handleScrollToTop";

const iconMap = {
  Fireplace: Flame,
  Garage: Warehouse,
  "Hardwood Floors": TreeDeciduous,
  "Updated Kitchen": Utensils,
  "Central AC": Fan,
  "Walk-in Closet": Shirt,
  Pool: Waves,
  Gym: Dumbbell,
  Parking: Car,
  Elevator: ArrowUpDown,
  Security: Shield,
  Clubhouse: Users,
  New: Star,
  Luxury: Gem,
  "Move-in Ready": Key,
  Renovated: Paintbrush,
  "Eco-Friendly": Leaf,
  "Great View": Mountain,
};

const DetailedView = () => {
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalImageIndex, setModalImageIndex] = useState(null);

   

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const response = await getHouses();
        const house = response.data.find((h) => h._id === id);
        if (!house) throw new Error("House not found");
        setHouse(house);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching house:", err);
        setError("Failed to load house details.");
        setLoading(false);
      }
    };
    fetchHouse();
  }, [id]);

  if (loading)
    return <p className="text-gray-600 text-center py-8">Loading...</p>;
  if (error) return <p className="text-red-600 text-center py-8">{error}</p>;
  if (!house)
    return <p className="text-gray-600 text-center py-8">House not found.</p>;

  const images = (house.images || []).map((img) => img.url);
  const allImages = [house.coverImg.url, ...images];

  const openModal = (url) => {
    const index = allImages.indexOf(url);
    setModalImageIndex(index);
  };

  const closeModal = () => {
    setModalImageIndex(null);
  };

  const handlePrevImage = () => {
    setModalImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setModalImageIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  const agent = {
    name: "James Callahan",
    role: "Luxury Property Specialist",
    email: "james@premierhomes.com",
    phone: "(972) 555-9302",
    image: "https://via.placeholder.com/48",
  };

  return (
    <>
      <ScrollAnimation>
        <div className="property-container gap-5 p-8 pl-14 pr-14 mt-[40px]">
          <div className="row-span-4 min-w-[40%]">
            <AnimatedSection animationClass="zoom-in">
              <img
                className="rounded-[30px] h-[550px] w-full object-cover cursor-pointer"
                src={house.coverImg.url}
                alt={house.title}
                onClick={() => openModal(house.coverImg.url)}
              />
            </AnimatedSection>
          </div>
          <div className="row-span-2 house-detail-images min-w-[60%] grid md:grid-cols-2 sm:grid-cols-2 gap-4 justify-center">
            {images.map((image, index) => (
              <AnimatedSection animationClass="zoom-in">
                <img
                  key={index}
                  className=" detail_image rounded-[30px] h-[268px] w-[500px] object-cover cursor-pointer zoom-in"
                  src={image}
                  alt={`${house.title} ${index + 1}`}
                  onClick={() => openModal(image)}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </ScrollAnimation>

      {modalImageIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-gray-800 bg-opacity-50 hover:bg-opacity-75"
          >
            <X size={24} />
          </button>
          <button
            onClick={handlePrevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-gray-800 bg-opacity-50 hover:bg-opacity-75"
          >
            <ChevronLeft size={24} />
          </button>
          <img
            className="max-w-[90%] max-h-[90vh] object-contain"
            src={allImages[modalImageIndex]}
            alt={`${house.title} ${modalImageIndex + 1}`}
          />
          <button
            onClick={handleNextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-gray-800 bg-opacity-50 hover:bg-opacity-75"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      <div>
        <div className="flex flex-col md:flex-row gap-6 p-6 property-container">
          {/* Left Section */}

          <div className="w-full md:w-2/3 space-y-6">
            <AnimatedSection animationClass="slide-in-right">
              <h1 className="text-3xl font-bold">{house.title}</h1>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={16} />
                {house.address.street}, {house.address.city},{" "}
                {house.address.state} {house.address.zip}
              </div>
              <div className="flex gap-4 text-sm text-gray-700 mt-2">
                <div className="flex items-center gap-1">
                  <Bed size={16} /> {house.bedrooms} Beds
                </div>
                <div className="flex items-center gap-1">
                  <Bath size={16} /> {house.bathrooms} Baths
                </div>
                <div className="flex items-center gap-1">
                  <Ratio size={16} /> {house.squareFootage} sq.ft
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection animationClass="slide-in-right">
              <div>
                <h2
                  style={{ color: "black" }}
                  className="text-xl font-semibold mt-4 mb-2"
                >
                  Overview
                </h2>
                <p style={{ color: "gray" }} className="">
                  {house.overview}
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection animationClass="slide-in-right">
              <div>
                <h2
                  style={{ color: "black" }}
                  className="text-xl font-semibold mt-4 mb-2"
                >
                  Desctiption
                </h2>
                <p style={{ color: "gray" }} className="">
                  {house.description}
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection animationClass="slide-in-right">
              <div>
                <h2
                  style={{ color: "black" }}
                  className="text-xl font-semibold mt-4 mb-2"
                >
                  Features
                </h2>
                <ul className="text-gray-700 list-disc list-inside space-y-1">
                  {house.features.map((feature, index) => {
                    const Icon = iconMap[feature] || Tag;
                    return (
                      <li key={index} className="flex items-center gap-2">
                        <Icon size={16} /> {feature}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </AnimatedSection>
            <AnimatedSection animationClass="slide-in-right">
              <div>
                <h2
                  style={{ color: "black" }}
                  className="text-xl font-semibold mt-4 mb-2"
                >
                  Amenities
                </h2>
                <div className="flex flex-wrap gap-2 text-sm text-gray-700">
                  {house.amenities.map((amenity, index) => {
                    const Icon = iconMap[amenity] || Tag;
                    return (
                      <span
                        key={index}
                        className="flex items-center gap-1 border rounded-full px-3 py-1"
                      >
                        <Icon size={16} /> {amenity}
                      </span>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection animationClass="slide-in-right">
              <div>
                <h2
                  style={{ color: "black" }}
                  className="text-xl font-semibold mt-4 mb-2"
                >
                  Labels
                </h2>
                <div className="flex flex-wrap gap-2 text-sm text-gray-700">
                  {house.labels.map((label, index) => {
                    const Icon = iconMap[label] || Tag;
                    return (
                      <span
                        key={index}
                        className="flex items-center gap-1 border rounded-full px-3 py-1"
                      >
                        <Icon size={16} /> {label}
                      </span>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Section */}
          <div className="md:w-1/3 ">
          <AnimatedSection animationClass="zoom-in  right-section">
            <section className="p-6 space-y-4 shadow-lg bg-white rounded-2xl">
              <div className="text-center">
                <h2
                  style={{ color: "black" }}
                  className="text-lg font-semibold text-gray-700"
                >
                  Property for {house.status}
                </h2>
                <div className="text-3xl font-bold mt-2">
                  ${house.price.toLocaleString()} {house.priceUnit}/
                  {house.priceFrequency}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Get in touch for more about this property
                </p>
              </div>
              <button className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none">
                Request Info
              </button>
              <hr />
              <div className="flex items-center gap-4">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-semibold">{agent.name}</div>
                  <div className="text-xs text-gray-500">{agent.role}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail size={16} /> {agent.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone size={16} /> {agent.phone}
              </div>
            </section>
            </AnimatedSection>
          </div>
        </div>
      </div>
      <MortgageCalculator />
      <RelatedHouses
        currentHouseId={house._id}
        propertyType={house.propertyType}
        price={house.price}
      />
      <ContactForm />
    </>
  );
};

export default DetailedView;

// TODO: fix coverimage openmodel

// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { getHouses } from "../services/api";
// import ScrollAnimation from "../components/ScrollAnimation";
// import RelatedHouses from "../components/RelatedHouses";
// import ContactForm from "../pages/ContactForm";
// import {
//   MapPin,
//   Mail,
//   Phone,
//   Flame,
//   Warehouse,
//   TreeDeciduous,
//   Utensils,
//   Fan,
//   Shirt,
//   Waves,
//   Dumbbell,
//   Car,
//   ArrowUpDown,
//   Shield,
//   Users,
//   Star,
//   Gem,
//   Key,
//   Paintbrush,
//   Leaf,
//   Mountain,
//   Tag,
//   ChevronLeft,
//   ChevronRight,
//   X,
//   Contact,
//   Bed,
//   Bath,
//   Ratio,
// } from "lucide-react";
// import MortgageCalculator from "../Components/MortgageCalculator";

// const iconMap = {
//   Fireplace: Flame,
//   Garage: Warehouse,
//   "Hardwood Floors": TreeDeciduous,
//   "Updated Kitchen": Utensils,
//   "Central AC": Fan,
//   "Walk-in Closet": Shirt,
//   Pool: Waves,
//   Gym: Dumbbell,
//   Parking: Car,
//   Elevator: ArrowUpDown,
//   Security: Shield,
//   Clubhouse: Users,
//   New: Star,
//   Luxury: Gem,
//   "Move-in Ready": Key,
//   Renovated: Paintbrush,
//   "Eco-Friendly": Leaf,
//   "Great View": Mountain,
// };

// const DetailedView = () => {
//   const { id } = useParams();
//   const [house, setHouse] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [modalImageIndex, setModalImageIndex] = useState(null);

//   useEffect(() => {
//     const fetchHouse = async () => {
//       try {
//         const response = await getHouses();
//         const house = response.data.find((h) => h._id === id);
//         if (!house) throw new Error("House not found");
//         setHouse(house);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching house:", err);
//         setError("Failed to load house details.");
//         setLoading(false);
//       }
//     };
//     fetchHouse();
//   }, [id]);

//   if (loading)
//     return <p className="text-gray-600 text-center py-8">Loading...</p>;
//   if (error) return <p className="text-red-600 text-center py-8">{error}</p>;
//   if (!house)
//     return <p className="text-gray-600 text-center py-8">House not found.</p>;

//   const images = [
//     // house.coverImg.url,
//     ...(house.images || []).map((img) => img.url),
//   ];

//   const openModal = (index) => {
//     setModalImageIndex(index);
//   };

//   const closeModal = () => {
//     setModalImageIndex(null);
//   };

//   const handlePrevImage = () => {
//     setModalImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//   };

//   const handleNextImage = () => {
//     setModalImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//   };

//   const agent = {
//     name: "James Callahan",
//     role: "Luxury Property Specialist",
//     email: "james@premierhomes.com",
//     phone: "(972) 555-9302",
//     image: "https://via.placeholder.com/48",
//   };

//   return (
//     <>
//       <ScrollAnimation>
//         <div className="flex gap-5 p-8 pl-14 pr-14 mt-[40px]">
//           <div className="row-span-4 min-w-[40%]">
//             <img
//               className="rounded-[30px] h-[550px] w-full object-cover cursor-pointer"
//               src={house.coverImg.url}
//               alt={house.title}
//               onClick={() => openModal()}
//             />
//           </div>
//           <div className="row-span-2 min-w-[60%] grid md:grid-cols-2 sm:grid-cols-2 gap-4 justify-center">
//             {images.map((image, index) => (
//               <img
//                 key={index}
//                 className="rounded-[30px] h-[268px] w-[500px] object-cover cursor-pointer zoom-in"
//                 src={image}
//                 alt={`${house.title} ${index + 1}`}
//                 onClick={() => openModal(index)}
//               />
//             ))}
//           </div>
//         </div>
//       </ScrollAnimation>

//       {modalImageIndex !== null && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
//           <button
//             onClick={closeModal}
//             className="absolute top-4 right-4 text-white p-2 rounded-full bg-gray-800 bg-opacity-50 hover:bg-opacity-75"
//           >
//             <X size={24} />
//           </button>
//           <button
//             onClick={handlePrevImage}
//             className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-gray-800 bg-opacity-50 hover:bg-opacity-75"
//           >
//             <ChevronLeft size={24} />
//           </button>
//           <img
//             className="max-w-[90%] max-h-[90vh] object-contain"
//             src={images[modalImageIndex]}
//             alt={`${house.title} ${modalImageIndex + 1}`}
//           />
//           <button
//             onClick={handleNextImage}
//             className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-gray-800 bg-opacity-50 hover:bg-opacity-75"
//           >
//             <ChevronRight size={24} />
//           </button>
//         </div>
//       )}

//       <ScrollAnimation>
//         <div>
//           <div className="flex md:flex-row gap-6 p-6">
//             {/* Left Section */}
//             <div className="w-full md:w-2/3 space-y-6">
//               <h1 className="text-3xl font-bold">{house.title}</h1>
//               <div className="flex items-center gap-2 text-gray-600">
//                 <MapPin size={16} />
//                 {house.address.street}, {house.address.city},{" "}
//                 {house.address.state} {house.address.zip}
//               </div>
//               <div className="flex gap-4 text-sm text-gray-700 mt-2">
//                 <div className="flex items-center gap-1">
//                   <Bed size={16} /> {house.bedrooms} Beds
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <Bath size={16} /> {house.bathrooms} Baths
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <Ratio size={16} /> {house.squareFootage} sq.ft
//                 </div>
//               </div>

//               <div>
//                 <h2 className="text-xl font-semibold mt-4 mb-2">Overview</h2>
//                 <p className="text-gray-600">{house.overview}</p>
//               </div>

//               <div>
//                 <h2 className="text-xl font-semibold mt-4 mb-2">Features</h2>
//                 <ul className="text-gray-700 list-disc list-inside space-y-1">
//                   {house.features.map((feature, index) => {
//                     const Icon = iconMap[feature] || Tag;
//                     return (
//                       <li key={index} className="flex items-center gap-2">
//                         <Icon size={16} /> {feature}
//                       </li>
//                     );
//                   })}
//                 </ul>
//               </div>

//               <div>
//                 <h2 className="text-xl font-semibold mt-4 mb-2">Amenities</h2>
//                 <div className="flex flex-wrap gap-2 text-sm text-gray-700">
//                   {house.amenities.map((amenity, index) => {
//                     const Icon = iconMap[amenity] || Tag;
//                     return (
//                       <span
//                         key={index}
//                         className="flex items-center gap-1 border rounded-full px-3 py-1"
//                       >
//                         <Icon size={16} /> {amenity}
//                       </span>
//                     );
//                   })}
//                 </div>
//               </div>

//               <div>
//                 <h2 className="text-xl font-semibold mt-4 mb-2">Labels</h2>
//                 <div className="flex flex-wrap gap-2 text-sm text-gray-700">
//                   {house.labels.map((label, index) => {
//                     const Icon = iconMap[label] || Tag;
//                     return (
//                       <span
//                         key={index}
//                         className="flex items-center gap-1 border rounded-full px-3 py-1"
//                       >
//                         <Icon size={16} /> {label}
//                       </span>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>

//             {/* Right Section */}
//             <div className="md:w-[20%]">
//               <section className="p-6 space-y-4 shadow-lg bg-white rounded-2xl">
//                 <div className="text-center">
//                   <h2 className="text-lg font-semibold text-gray-700">
//                     Property for {house.status}
//                   </h2>
//                   <div className="text-3xl font-bold mt-2">
//                     ${house.price.toLocaleString()} {house.priceUnit}/
//                     {house.priceFrequency}
//                   </div>
//                   <p className="text-sm text-gray-500 mt-1">
//                     Get in touch for more about this property
//                   </p>
//                 </div>
//                 <button className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none">
//                   Request Info
//                 </button>
//                 <hr />
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={agent.image}
//                     alt={agent.name}
//                     className="w-12 h-12 rounded-full"
//                   />
//                   <div>
//                     <div className="font-semibold">{agent.name}</div>
//                     <div className="text-xs text-gray-500">{agent.role}</div>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-gray-600">
//                   <Mail size={16} /> {agent.email}
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-gray-600">
//                   <Phone size={16} /> {agent.phone}
//                 </div>
//               </section>
//             </div>
//           </div>
//         </div>
//       </ScrollAnimation>
//       <MortgageCalculator/>

//       <RelatedHouses
//         currentHouseId={house._id}
//         propertyType={house.propertyType}
//         price={house.price}
//       />
//       <ContactForm />

//       {/* add review form */}
//     </>
//   );
// };

// export default DetailedView;
