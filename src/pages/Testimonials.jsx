import { Star, StarOff } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import AnimatedSection from "../Components/AnimatedSection";
import { Link, useLocation } from "react-router-dom";
import testimonialsImg from "../assets/testimonials.jpg";
import handleScrollToTop from "../Components/handleScrollToTop";
import { getTestimonials } from "../services/api";
import toast, { Toaster } from "react-hot-toast";
import ShimmerTestimonials from "../Components/ShimmerTestimonials";

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<Star key={i} className="h-4 w-4 text-yellow-400 inline" />);
    } else {
      stars.push(<StarOff key={i} className="h-4 w-4 text-gray-300 inline" />);
    }
  }
  return <div className="my-2">{stars}</div>;
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const carouselRef = useRef(null);
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  // Fetch testimonials
  const fetchTestimonials = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getTestimonials();
      // Validate response.data is an array
      const data = Array.isArray(response.data) ? response.data : [];
      setTestimonials(data);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching testimonials:", err);
      const errorMessage = err.response
        ? `Failed to load testimonials: ${err.response.status} ${err.response.statusText}`
        : "Network error: Unable to fetch testimonials.";
      setError(errorMessage);
      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Handle mouse wheel/trackpad scroll
  useEffect(() => {
    const handleWheel = (e) => {
      if (!carouselRef.current) return;
      const delta = e.deltaX || e.deltaY;
      setScrollOffset((prev) => {
        const maxOffset = (testimonials?.length ?? 0) * 300; // Approx card width
        const newOffset = prev + delta * 0.5;
        if (newOffset > maxOffset) return 0;
        if (newOffset < -maxOffset) return 0;
        return newOffset;
      });
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), 3000);
    };

    const carousel = carouselRef.current;
    if (carousel) carousel.addEventListener("wheel", handleWheel);
    return () => {
      if (carousel) carousel.removeEventListener("wheel", handleWheel);
    };
  }, [testimonials?.length]);

  // Touch swipe support
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe || isRightSwipe) {
      setScrollOffset((prev) => {
        const cardWidth = 300;
        const direction = isLeftSwipe ? 1 : -1;
        return prev + direction * cardWidth;
      });
    }
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000);
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Navigation arrows
  const nextTestimonial = () => {
    setScrollOffset((prev) => prev + 300);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000);
  };

  const prevTestimonial = () => {
    setScrollOffset((prev) => prev - 300);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000);
  };

  // Navigation dots
  const goToTestimonial = (index) => {
    setScrollOffset(index * 300);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000);
  };

  // Conditional rendering
  if (isLoading) {
    return (
      <div className="bg-teal-900 py-12 px-4 sm:px-6 lg:px-8">
        <Toaster
          toastOptions={{ style: { background: "#115e59", color: "#fff" } }}
        />
        <ShimmerTestimonials />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-teal-900 py-12 px-4 sm:px-6 lg:px-8 text-center">
        <Toaster
          toastOptions={{ style: { background: "#115e59", color: "#fff" } }}
        />
        <p className="text-red-600 text-lg mb-4">{error}</p>
        <button
          onClick={fetchTestimonials}
          className="bg-teal-700 text-white font-semibold py-2 px-6 rounded-full hover:bg-teal-600 focus:outline-none transition-all duration-200"
        >
          Retry
        </button>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="bg-teal-900 py-12 px-4 sm:px-6 lg:px-8 text-center">
        <Toaster
          toastOptions={{ style: { background: "#115e59", color: "#fff" } }}
        />
        <p className="text-teal-200 text-lg">No testimonials available.</p>
      </div>
    );
  }

  return (
    <div>
      <Toaster
        toastOptions={{ style: { background: "#115e59", color: "#fff" } }}
      />
      {path === "testimonials" && (
        <div
          style={{
            backgroundImage: `url(${testimonialsImg})`,
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
                Testimonials
              </h1>
              <p className="mt-4 text-lg">
                Explore our listings for buying, renting, or selling properties.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-teal-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            What Our Clients Say
          </h1>
          <p className="text-lg text-teal-200 mb-10">
            Hear from our satisfied customers about their experiences.
          </p>

          <div
            className="relative w-full max-w-5xl mx-auto overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Blur Overlays */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-teal-900 to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-teal-900 to-transparent z-10"></div>

            <div
              className="flex"
              style={{
                transform: `translateX(-${scrollOffset}px)`,
                animation:
                  testimonials.length > 0 && !isPaused
                    ? "scroll 40s linear infinite"
                    : "none",
              }}
            >
              {/* Duplicate testimonials for seamless loop */}
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={`${testimonial._id || index}-${index}`}
                  className="flex-shrink-0 w-[280px] sm:w-[300px] mx-2 zoom-in"
                >
                  <div className="bg-white rounded-xl shadow-lg p-6 h-full transform transition-all duration-300 hover:scale-105">
                    <svg
                      className="h-6 w-6 text-teal-400 mb-2 mx-auto"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.708 2.147c-3.897 1.094-6.708 4.692-6.708 8.462h-3v7.391h-3zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.708 2.147c-3.897 1.094-6.708 4.692-6.708 8.462h-3v7.391h-3z" />
                    </svg>
                    <p
                      style={{ color: "gray" }}
                      className="text-base font-serif italic mb-4"
                    >
                      "{testimonial.text}"
                    </p>
                    <StarRating rating={testimonial.rating || 0} />
                    <h3 className="text-lg font-semibold">
                      {testimonial.name || "Anonymous"}
                    </h3>
                    <p className="text-sm">{testimonial.role || "Client"}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            {/* {testimonials.length > 1 && (
              <>
                <button
                  onClick={prevTestimonial}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-gray-800 bg-opacity-50 hover:bg-opacity-75"
                >
                  <BiLeftArrow size={24} />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-gray-800 bg-opacity-50 hover:bg-opacity-75"
                >
                  <BiRightArrow size={24} />
                </button>
              </>
            )} */}

            {/* Navigation Dots */}
            {testimonials.length > 1 && (
              <div className="flex justify-center mt-4 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`w-2 h-2 rounded-full ${
                      Math.round(scrollOffset / 300) % testimonials.length ===
                      index
                        ? "bg-teal-400"
                        : "bg-gray-400"
                    }`}
                  ></button>
                ))}
              </div>
            )}
          </div>

          {/* View All Button */}
          {path != "testimonials" && (
            <div className="mt-8">
              <Link to="/testimonials" onClick={handleScrollToTop}>
                <button className="bg-teal-700 text-white font-semibold py-2 px-6 rounded-full hover:bg-teal-600 focus:outline-none transition-all duration-200">
                  View All
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* CSS for Auto-Scroll Animation */}
        <style>
          {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-${(testimonials?.length ?? 0) * 300}px);
            }
          }
        `}
        </style>
      </div>
    </div>
  );
};

export default Testimonials;

// FIXME:

// import { Star, StarOff } from "lucide-react";
// import { useState, useEffect, useRef } from "react";
// import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
// import AnimatedSection from "../Components/AnimatedSection";
// import { Link, useLocation } from "react-router-dom";
// import testimonialsImg from "../assets/testimonials.jpg";
// import handleScrollToTop from "../Components/handleScrollToTop";

// const testimonials = [
//   {
//     name: "John Doe",
//     text: "The team helped us find our dream home in just two weeks! Their expertise and dedication are unmatched.",
//     role: "Home Buyer",
//     rating: 4,
//   },
//   {
//     name: "Jane Smith",
//     text: "Selling our property was a breeze thanks to their professional marketing and negotiation skills.",
//     role: "Seller",
//     rating: 5,
//   },
//   {
//     name: "Mike Johnson",
//     text: "Their property management services have made owning rental properties stress-free and profitable.",
//     role: "Landlord",
//     rating: 3,
//   },
//   {
//     name: "Sarah Williams",
//     text: "Exceptional service! They went above and beyond to ensure a smooth transaction.",
//     role: "Buyer",
//     rating: 5,
//   },
//   {
//     name: "David Brown",
//     text: "Highly recommend their property management. Very responsive and efficient.",
//     role: "Landlord",
//     rating: 4,
//   },
//   {
//     name: "Emily Davis",
//     text: "Their attention to detail and personalized approach made buying our first home a joy.",
//     role: "First-Time Buyer",
//     rating: 5,
//   },
//   {
//     name: "Chris Lee",
//     text: "The rental process was seamless, with excellent support throughout our lease.",
//     role: "Tenant",
//     rating: 4,
//   },
//   {
//     name: "Laura Wilson",
//     text: "Their market insights helped us secure a great deal on our investment property.",
//     role: "Investor",
//     rating: 4,
//   },
// ];

// const StarRating = ({ rating }) => {
//   const stars = [];
//   for (let i = 1; i <= 5; i++) {
//     if (i <= rating) {
//       stars.push(<Star key={i} className="h-4 w-4 text-yellow-400 inline" />);
//     } else {
//       stars.push(<StarOff key={i} className="h-4 w-4 text-gray-300 inline" />);
//     }
//   }
//   return <div className="my-2">{stars}</div>;
// };

// const Testimonials = () => {
//   const [isPaused, setIsPaused] = useState(false);
//   const [scrollOffset, setScrollOffset] = useState(0);
//   const carouselRef = useRef(null);
//   const location = useLocation();
//   const path = location.pathname.split("/")[1];

//   // Handle mouse wheel/trackpad scroll
//   useEffect(() => {
//     const handleWheel = (e) => {
//       if (!carouselRef.current) return;
//       const delta = e.deltaX || e.deltaY;
//       setScrollOffset((prev) => {
//         const newOffset = prev + delta * 0.5;
//         // Keep offset within bounds (reset for infinite loop)
//         const maxOffset = testimonials.length * 300; // Approx card width
//         if (newOffset > maxOffset) return 0;
//         if (newOffset < -maxOffset) return 0;
//         return newOffset;
//       });
//       setIsPaused(true); // Pause auto-scroll on user interaction
//       // Resume auto-scroll after 3s of inactivity
//       setTimeout(() => setIsPaused(false), 3000);
//     };

//     const carousel = carouselRef.current;
//     if (carousel) carousel.addEventListener("wheel", handleWheel);
//     return () => {
//       if (carousel) carousel.removeEventListener("wheel", handleWheel);
//     };
//   }, []);

//   // Touch swipe support
//   const [touchStart, setTouchStart] = useState(null);
//   const [touchEnd, setTouchEnd] = useState(null);

//   const handleTouchStart = (e) => {
//     setTouchStart(e.targetTouches[0].clientX);
//     setIsPaused(true);
//   };

//   const handleTouchMove = (e) => {
//     setTouchEnd(e.targetTouches[0].clientX);
//   };

//   const handleTouchEnd = () => {
//     if (!touchStart || !touchEnd) return;
//     const distance = touchStart - touchEnd;
//     const isLeftSwipe = distance > 50;
//     const isRightSwipe = distance < -50;
//     if (isLeftSwipe || isRightSwipe) {
//       setScrollOffset((prev) => {
//         const cardWidth = 300; // Approx card width
//         const direction = isLeftSwipe ? 1 : -1;
//         return prev + direction * cardWidth;
//       });
//     }
//     setIsPaused(true);
//     setTimeout(() => setIsPaused(false), 3000);
//     setTouchStart(null);
//     setTouchEnd(null);
//   };

//   // Navigation arrows
//   const nextTestimonial = () => {
//     setScrollOffset((prev) => prev + 300); // Move one card width
//     setIsPaused(true);
//     setTimeout(() => setIsPaused(false), 3000);
//   };

//   const prevTestimonial = () => {
//     setScrollOffset((prev) => prev - 300); // Move one card width
//     setIsPaused(true);
//     setTimeout(() => setIsPaused(false), 3000);
//   };

//   // Navigation dots
//   const goToTestimonial = (index) => {
//     setScrollOffset(index * 300); // Jump to card
//     setIsPaused(true);
//     setTimeout(() => setIsPaused(false), 3000);
//   };

//   return (
//     <div>
//       {path === "testimonials" && (
//         <div
//           style={{
//             backgroundImage: `url(${testimonialsImg})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             height: "100vh",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "end",
//           }}
//         >
//           <div className="py-16 pt-[140px] bg-gradient-to-t from-black to-transparent">
//             <div className="max-w-6xl p-4 text-white slide-in-text">
//               <h1 className="text-4xl font-semibold md:text-7xl">
//                 Testimonials
//               </h1>
//               <p className="mt-4 text-lg">
//                 Explore our listings for buying, renting, or selling properties.
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="bg-teal-900 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-6xl mx-auto text-center">
//           <h1 className="text-4xl font-bold text-white mb-2">
//             What Our Clients Say
//           </h1>
//           <p className="text-lg text-teal-200 mb-10">
//             Hear from our satisfied customers about their experiences.
//           </p>

//           <div
//             className="relative w-full max-w-5xl mx-auto overflow-hidden"
//             onMouseEnter={() => setIsPaused(true)}
//             onMouseLeave={() => setIsPaused(false)}
//             ref={carouselRef}
//             onTouchStart={handleTouchStart}
//             onTouchMove={handleTouchMove}
//             onTouchEnd={handleTouchEnd}
//           >
//             {/* Blur Overlays */}
//             <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-teal-900 to-transparent z-10"></div>
//             <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-teal-900 to-transparent z-10"></div>

//             <div
//               className="flex"
//               style={{
//                 transform: `translateX(-${scrollOffset}px)`,
//                 animation: isPaused ? "none" : "scroll 40s linear infinite",
//               }}
//             >
//               {/* Duplicate testimonials for seamless loop */}
//               {[...testimonials, ...testimonials].map((testimonial, index) => (
//                 // <AnimatedSection>
//                 // </AnimatedSection>
//                 <div
//                   key={`${testimonial.name}-${index}`}
//                   className="flex-shrink-0 w-[280px] sm:w-[300px] mx-2 zoom-in"
//                 >
//                   <div className="bg-white rounded-xl shadow-lg p-6 h-full transform transition-all duration-300 hover:scale-105">
//                     <svg
//                       className="h-6 w-6 text-teal-400 mb-2 mx-auto"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.708 2.147c-3.897 1.094-6.708 4.692-6.708 8.462h-3v7.391h-3zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.708 2.147c-3.897 1.094-6.708 4.692-6.708 8.462h-3v7.391h-3z" />
//                     </svg>
//                     <p
//                       style={{ color: "gray" }}
//                       className=" text-base font-serif italic mb-4"
//                     >
//                       "{testimonial.text}"
//                     </p>
//                     <StarRating rating={testimonial.rating} />
//                     <h3 className="text-lg font-semibold">
//                       {testimonial.name}
//                     </h3>
//                     <p className="text-sm ">{testimonial.role}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//           </div>

//           {/* View All Button */}
//           <div className="mt-8">
//             <Link to="/testimonials" onClick={handleScrollToTop}>
//               <button className="bg-teal-700 text-white font-semibold py-2 px-6 rounded-full hover:bg-teal-600 focus:outline-none transition-all duration-200">
//                 View All
//               </button>
//             </Link>
//           </div>
//         </div>

//         {/* CSS for Auto-Scroll Animation */}
//         <style>
//           {`
//           @keyframes scroll {
//             0% {
//               transform: translateX(0);
//             }
//             100% {
//               transform: translateX(-${testimonials.length * 300}px);
//             }
//           }
//         `}
//         </style>
//       </div>
//     </div>
//   );
// };

// export default Testimonials;

// TODO: fix the scroll

// import { Star, StarOff } from "lucide-react";
// import { useState, useEffect } from "react";
// import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

// const testimonials = [
//   {
//     name: "John Doe",
//     text: "The team helped us find our dream home in just two weeks! Their expertise and dedication are unmatched.",
//     role: "Home Buyer",
//     rating: 4,
//   },
//   {
//     name: "Jane Smith",
//     text: "Selling our property was a breeze thanks to their professional marketing and negotiation skills.",
//     role: "Seller",
//     rating: 5,
//   },
//   {
//     name: "Mike Johnson",
//     text: "Their property management services have made owning rental properties stress-free and profitable.",
//     role: "Landlord",
//     rating: 3,
//   },
//   {
//     name: "Sarah Williams",
//     text: "Exceptional service! They went above and beyond to ensure a smooth transaction.",
//     role: "Buyer",
//     rating: 5,
//   },
//   {
//     name: "David Brown",
//     text: "Highly recommend their property management. Very responsive and efficient.",
//     role: "Landlord",
//     rating: 4,
//   },
// ];

// const StarRating = ({ rating }) => {
//   const stars = [];
//   for (let i = 1; i <= 5; i++) {
//     if (i <= rating) {
//       stars.push(<Star key={i} className="h-4 w-4 text-yellow-400 inline" />);
//     } else {
//       stars.push(<StarOff key={i} className="h-4 w-4 text-gray-300 inline" />);
//     }
//   }
//   return <div className="my-2">{stars}</div>;
// };

// const Testimonials = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Auto-play (optional, comment out to disable)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
//     }, 5000); // Change every 5 seconds
//     return () => clearInterval(interval);
//   }, []);

//   const nextTestimonial = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
//   };

//   const prevTestimonial = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
//     );
//   };

//   const goToTestimonial = (index) => {
//     setCurrentIndex(index);
//   };

//   // Basic touch swipe support
//   const [touchStart, setTouchStart] = useState(null);
//   const [touchEnd, setTouchEnd] = useState(null);

//   const handleTouchStart = (e) => {
//     setTouchStart(e.targetTouches[0].clientX);
//   };

//   const handleTouchMove = (e) => {
//     setTouchEnd(e.targetTouches[0].clientX);
//   };

//   const handleTouchEnd = () => {
//     if (!touchStart || !touchEnd) return;
//     const distance = touchStart - touchEnd;
//     const isLeftSwipe = distance > 50;
//     const isRightSwipe = distance < -50;
//     if (isLeftSwipe) nextTestimonial();
//     if (isRightSwipe) prevTestimonial();
//     setTouchStart(null);
//     setTouchEnd(null);
//   };

//   return (
//     <div className="bg-teal-900 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto text-center">
//         <h1 className="text-4xl font-bold text-white mb-2">What Our Clients Say</h1>
//         <p className="text-lg text-teal-200 mb-10">Hear from our satisfied customers about their experiences.</p>

//         <div
//           className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-xl"
//           onTouchStart={handleTouchStart}
//           onTouchMove={handleTouchMove}
//           onTouchEnd={handleTouchEnd}
//         >
//           <div
//             className="flex transition-transform duration-500 ease-in-out"
//             style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//           >
//             {testimonials.map((testimonial, index) => (
//               <div
//                 key={index}
//                 className="min-w-full flex items-center justify-center px-4 sm:px-6"
//               >
//                 <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl transform transition-all duration-300 hover:scale-105">
//                   <p className="text-gray-600 text-lg font-serif italic mb-4">"{testimonial.text}"</p>
//                   <StarRating rating={testimonial.rating} />
//                   <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
//                   <p className="text-sm text-gray-500">{testimonial.role}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Navigation Arrows */}
//           <button
//             onClick={prevTestimonial}
//             className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-teal-800 text-white p-3 rounded-full hover:bg-teal-700 focus:outline-none transition-all duration-200 hover:scale-110"
//             aria-label="Previous Testimonial"
//           >
//             <BiLeftArrow className="h-5 w-5" />
//           </button>
//           <button
//             onClick={nextTestimonial}
//             className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-teal-800 text-white p-3 rounded-full hover:bg-teal-700 focus:outline-none transition-all duration-200 hover:scale-110"
//             aria-label="Next Testimonial"
//           >
//             <BiRightArrow className="h-5 w-5" />
//           </button>

//           {/* Navigation Dots */}
//           <div className="flex justify-center space-x-2 mt-6">
//             {testimonials.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToTestimonial(index)}
//                 className={`h-3 w-3 rounded-full transition-all duration-200 ${
//                   currentIndex === index ? "bg-teal-400 scale-125" : "bg-teal-600 hover:bg-teal-500"
//                 }`}
//                 aria-label={`Go to testimonial ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Testimonials;

// TODO: anna

// import { Star, StarOff } from "lucide-react";
// import { useState } from "react";
// import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

// const testimonials = [
//   {
//     name: "John Doe",
//     text: "The team helped us find our dream home in just two weeks! Their expertise and dedication are unmatched.",
//     role: "Home Buyer",
//     rating: 4,
//   },
//   {
//     name: "Jane Smith",
//     text: "Selling our property was a breeze thanks to their professional marketing and negotiation skills.",
//     role: "Seller",
//     rating: 5,
//   },
//   {
//     name: "Mike Johnson",
//     text: "Their property management services have made owning rental properties stress-free and profitable.",
//     role: "Landlord",
//     rating: 3,
//   },
//   {
//     name: "Sarah Williams",
//     text: "Exceptional service! They went above and beyond to ensure a smooth transaction.",
//     role: "Buyer",
//     rating: 5,
//   },
//   {
//     name: "David Brown",
//     text: "Highly recommend their property management. Very responsive and efficient.",
//     role: "Landlord",
//     rating: 4,
//   },
// ];

// const StarRating = ({ rating }) => {
//   const stars = [];
//   for (let i = 1; i <= 5; i++) {
//     if (i <= rating) {
//       stars.push(<Star key={i} className="h-4 w-4 text-yellow-500 inline" />);
//     } else {
//       stars.push(<StarOff key={i} className="h-4 w-4 text-gray-300 inline" />);
//     }
//   }
//   return <div className="my-2">{stars}</div>;
// };

// const Testimonials = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextTestimonial = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
//   };

//   const prevTestimonial = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
//     );
//   };

//   const getCardStyle = (index) => {
//     const diff = Math.abs(index - currentIndex);
//     if (diff === 0) {
//       return {
//         transform: 'translateX(0) rotateY(0deg) scale(1.05)',
//         filter: 'blur(0px)',
//         opacity: 1,
//         zIndex: 10,
//       };
//     } else if (diff === 1) {
//       const direction = (index - currentIndex) > 0 ? 'translateX(150px)' : 'translateX(-150px)';
//       return {
//         transform: `${direction} rotateY(20deg) scale(0.95)`,
//         filter: 'blur(5px)',
//         opacity: 0.7,
//         zIndex: 5,
//       };
//     } else {
//       const direction = (index - currentIndex) > 0 ? 'translateX(300px)' : 'translateX(-300px)';
//       return {
//         transform: `${direction} rotateY(30deg) scale(0.8)`,
//         filter: 'blur(10px)',
//         opacity: 0.5,
//         zIndex: 1,
//       };
//     }
//   };

//   return (
//     <div className="bg-green-950 flex flex-col items-center px-4 sm:px-6 lg:px-8 py-12">
//       <div className="text-center text-gray-100 mb-8">
//         <h1 className="text-3xl font-bold">Testimonials</h1>
//       </div>
//       <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl ">
//         <div className=" m-6 relative flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
//           {testimonials.map((testimonial, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-3xl shadow-md px-6 py-6 pt-10 w-full flex-shrink-0 flex items-center justify-center"
//               style={getCardStyle(index)}
//             >
//               <div className="text-center">
//                 <h3 className=" font-semibold">
//                   {testimonial.name}
//                 </h3>
//                 <p className="text-sm mb-2">{testimonial.role}</p>
//                 <StarRating rating={testimonial.rating} />
//                 <p className="text-sm italic">
//                   "{testimonial.text}"
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="flex justify-center space-x-4 mt-6">
//           <button
//             onClick={prevTestimonial}
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
//           >
//             <BiLeftArrow></BiLeftArrow>
//           </button>
//           <button
//             onClick={nextTestimonial}
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
//           >
//          <BiRightArrow></BiRightArrow>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Testimonials;

// install react-icons

// const testimonials = [
//   {
//     name: "John Doe",
//     text: "The team helped us find our dream home in just two weeks! Their expertise and dedication are unmatched.",
//     role: "Home Buyer",
//   },
//   {
//     name: "Jane Smith",
//     text: "Selling our property was a breeze thanks to their professional marketing and negotiation skills.",
//     role: "Seller",
//   },
//   {
//     name: "Mike Johnson",
//     text: "Their property management services have made owning rental properties stress-free and profitable.",
//     role: "Landlord",
//   },
// ];

// const Testimonials = () => {
//   return (
//     <div className=" bg-green-950 px-4 sm:px-6 lg:px-8 py-8">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h1 className="text-3xl font-bold text-gray-200">Testimonials</h1>
//         <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {testimonials.map((testimonial, index) => (
//             <div key={index} className="bg-white rounded-lg shadow-md p-6">
//               <p className="text-gray-600 italic">"{testimonial.text}"</p>
//               <p className="mt-4 text-gray-800 font-semibold">
//                 {testimonial.name}
//               </p>
//               <p className="text-gray-500 text-sm">{testimonial.role}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Testimonials;
