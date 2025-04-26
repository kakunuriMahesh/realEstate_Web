// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { Menu, X } from "lucide-react";
// import logo from "../assets/logo.png";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           {/* Logo */}
//           <Link to="/" className="flex items-center">
//             <img src={logo} alt="Real Estate Logo" className="h-10 w-auto" />
//           </Link>
//           {/* Desktop Menu */}
//           <div className="desktop-nav items-center space-x-4">
//             <Link
//               to="/"
//               className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
//             >
//               Home
//             </Link>
//             <Link
//               to="/about"
//               className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
//             >
//               About
//             </Link>
//             <Link
//               to="/services"
//               className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
//             >
//               Services
//             </Link>
//             <Link
//               to="/contact"
//               className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
//             >
//               Contact Us
//             </Link>
//             <Link
//               to="/testimonials"
//               className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
//             >
//               Testimonials
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-gray-700 hover:text-blue-600 focus:outline-none"
//             >
//               {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu Items */}
//       {isOpen && (
//         <div className="md:hidden bg-white shadow-md">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//             <Link
//               to="/"
//               className="block text-gray-700 hover:bg-blue-100 px-3 py-2 rounded-md text-base font-medium"
//               onClick={() => setIsOpen(false)}
//             >
//               Home
//             </Link>
//             <Link
//               to="/about"
//               className="block text-gray-700 hover:bg-blue-100 px-3 py-2 rounded-md text-base font-medium"
//               onClick={() => setIsOpen(false)}
//             >
//               About
//             </Link>
//             <Link
//               to="/services"
//               className="block text-gray-700 hover:bg-blue-100 px-3 py-2 rounded-md text-base font-medium"
//               onClick={() => setIsOpen(false)}
//             >
//               Services
//             </Link>
//             <Link
//               to="/contact"
//               className="block text-gray-700 hover:bg-blue-100 px-3 py-2 rounded-md text-base font-medium"
//               onClick={() => setIsOpen(false)}
//             >
//               Contact Us
//             </Link>
//             <Link
//               to="/testimonials"
//               className="block text-gray-700 hover:bg-blue-100 px-3 py-2 rounded-md text-base font-medium"
//               onClick={() => setIsOpen(false)}
//             >
//               Testimonials
//             </Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

// TODO: anna code

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Menu, X, ChevronDown } from "lucide-react";
// import logo from "../assets/logo.png";
// import { useDispatch, useSelector } from "react-redux";
// import { setMenuState } from "../store/stateManage";

// const Navbar = () => {
//   const [isServicesOpen, setIsServicesOpen] = useState(false);
//   const menustate = useSelector((state) => state.stateManage.menuState);

//   // TODO: bharatTheme
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [showNavbar, setShowNavbar] = useState(true);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;

//       // Show navbar if scrolling up or at top
//       if (currentScrollY < lastScrollY || currentScrollY <= 100) {
//         setShowNavbar(true);
//       }
//       // Hide navbar if scrolling down past navbar height (100px)
//       else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
//         setShowNavbar(false);
//       }

//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollY]);

//   // TODO: bharatTheme
//   // TODO: high-end theme
//   const [scrollPos, setScrollPos] = useState(0);
//   const [scrollDir, setScrollDir] = useState("up");
//   const [atTop, setAtTop] = useState(true);

//   useEffect(() => {
//     let lastScroll = window.scrollY;

//     const handleScroll = () => {
//       const currentScroll = window.scrollY;

//       setScrollDir(currentScroll > lastScroll ? "down" : "up");
//       setScrollPos(currentScroll);
//       setAtTop(currentScroll <= 10); // near top

//       lastScroll = currentScroll;
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);
//   // TODO: high-end theme

//   const toggleServicesMenu = () => {
//     setIsServicesOpen(!isServicesOpen);
//   };

//   const dispatch = useDispatch();

//   const toggleMobileMenu = () => {
//     dispatch(setMenuState(!menustate));
//     if (isServicesOpen) setIsServicesOpen(false);
//   };

//   return (
//     <>
//       {/* High-end theme */}
//       <nav
//         className={`w-full fixed top-0 left-0 z-40 transition-all duration-500 ${
//           !atTop ? "opacity-0 pointer-events-none" : "opacity-100"
//         } text-white`}
//       >
//         <div className="max-w-screen-xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8">
//           <div className="flex justify-between h-12 xs:h-14 sm:h-16">
//             <div className="flex items-center">
//               <Link to="/">
//                 <img
//                   className="h-[80px] xs:h-[100px] sm:h-[120px] w-[120px] xs:w-[160px] sm:w-[200px]"
//                   src={logo}
//                   alt="Real Estate Logo"
//                 />
//               </Link>
//             </div>

//             {/* Desktop Menu */}
//             <div className="hidden custom-md-flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
//               <Link
//                 to="/"
//                 className="text-gray-600  font-semibold  hover:text-gray-900 text-sm md:text-base lg:text-lg"
//               >
//                 Home
//               </Link>
//               <Link
//                 to="/about"
//                 className="text-gray-600  font-semibold  hover:text-gray-900 text-sm md:text-base lg:text-lg"
//               >
//                 About Us
//               </Link>

//               <div className="relative">
//                 <button
//                   onClick={toggleServicesMenu}
//                   className="text-gray-600  font-semibold  hover:text-gray-900 flex items-center text-sm md:text-base lg:text-lg"
//                 >
//                   Services
//                   <ChevronDown className="ml-1 xs:ml-2 h-4 xs:h-5 w-4 xs:w-5" />
//                 </button>
//                 {isServicesOpen && (
//                   <div className="absolute mt-2 w-40 xs:w-44 sm:w-48 bg-white shadow-lg rounded-md py-2">
//                     <Link
//                       to="/services/sell"
//                       className="block px-4 py-2 text-gray-600  font-semibold  hover:bg-gray-100"
//                       onClick={() => setIsServicesOpen(false)}
//                     >
//                       Sell
//                     </Link>
//                     <Link
//                       to="/services/rental"
//                       className="block px-4 py-2 text-gray-600  font-semibold  hover:bg-gray-100"
//                       onClick={() => setIsServicesOpen(false)}
//                     >
//                       Rental
//                     </Link>
//                     <Link
//                       to="/services/purchase"
//                       className="block px-4 py-2 text-gray-600  font-semibold  hover:bg-gray-100"
//                       onClick={() => setIsServicesOpen(false)}
//                     >
//                       Purchase
//                     </Link>
//                     <Link
//                       to="/services/management"
//                       className="block px-4 py-2 text-gray-600  font-semibold  hover:bg-gray-100"
//                       onClick={() => setIsServicesOpen(false)}
//                     >
//                       Management
//                     </Link>
//                   </div>
//                 )}
//               </div>

//               <Link
//                 to="/contact"
//                 className="text-gray-600  font-semibold  hover:text-gray-900 text-sm md:text-base lg:text-lg"
//               >
//                 Contact Us
//               </Link>
//               <Link
//                 to="/testimonials"
//                 className="text-gray-600  font-semibold  hover:text-gray-900 text-sm md:text-base lg:text-lg"
//               >
//                 Testimonials
//               </Link>
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="flex items-center custom-md-hidden">
//               <button
//                 onClick={toggleMobileMenu}
//                 className="text-gray-600  font-semibold  hover:text-gray-900 focus:outline-none"
//               >
//                 {menustate ? (
//                   <X className="h-5 xs:h-6 w-5 xs:w-6" />
//                 ) : (
//                   <Menu className="h-5 xs:h-6 w-5 xs:w-6" />
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {menustate && (
//           <div className="custom-md-hidden">
//             <div className="px-2 xs:px-3 pt-2 pb-3 space-y-1">
//               <Link
//                 to="/"
//                 className="block px-3 py-2 text-gray-600  font-semibold  hover:text-gray-900"
//                 onClick={toggleMobileMenu}
//               >
//                 Home
//               </Link>
//               <Link
//                 to="/about"
//                 className="block px-3 py-2 text-gray-600  font-semibold  hover:text-gray-900"
//                 onClick={toggleMobileMenu}
//               >
//                 About Us
//               </Link>
//               <div>
//                 <button
//                   onClick={toggleServicesMenu}
//                   className="w-full text-left px-3 py-2 text-gray-600  font-semibold  hover:text-gray-900 flex justify-between items-center"
//                 >
//                   Services
//                   <ChevronDown className="h-4 xs:h-5 w-4 xs:w-5" />
//                 </button>
//                 {isServicesOpen && (
//                   <div className="pl-4 xs:pl-6 space-y-1">
//                     <Link
//                       to="/services/sell"
//                       className="block px-3 py-2 text-gray-600  font-semibold  hover:text-gray-900"
//                       onClick={toggleMobileMenu}
//                     >
//                       Sell
//                     </Link>
//                     <Link
//                       to="/services/rental"
//                       className="block px-3 py-2 text-gray-600  font-semibold  hover:text-gray-900"
//                       onClick={toggleMobileMenu}
//                     >
//                       Rental
//                     </Link>
//                     <Link
//                       to="/services/purchase"
//                       className="block px-3 py-2 text-gray-600  font-semibold  hover:text-gray-900"
//                       onClick={toggleMobileMenu}
//                     >
//                       Purchase
//                     </Link>
//                     <Link
//                       to="/services/management"
//                       className="block px-3 py-2 text-gray-600  font-semibold  hover:text-gray-900"
//                       onClick={toggleMobileMenu}
//                     >
//                       Management
//                     </Link>
//                   </div>
//                 )}
//               </div>
//               <Link
//                 to="/contact"
//                 className="block px-3 py-2 text-gray-600  font-semibold  hover:text-gray-900"
//                 onClick={toggleMobileMenu}
//               >
//                 Contact Us
//               </Link>
//               <Link
//                 to="/testimonials"
//                 className="block px-3 py-2 text-gray-600  font-semibold  hover:text-gray-900"
//                 onClick={toggleMobileMenu}
//               >
//                 Testimonials
//               </Link>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Background Navbar - appears on scroll up */}
//       <nav
//         className={`w-full  shadow-2xl fixed top-0 left-0 z-50 transition-all duration-500 ${
//           !atTop && scrollDir === "up" ? "translate-y-0" : "-translate-y-full"
//         } bg-white shadow-lg`}
//       >
//         <div className="max-w-screen-xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8">
//           <div className="flex justify-between h-12 xs:h-14 sm:h-16">
//             <div className="flex items-center">
//               <Link to="/">
//                 <img
//                   className="h-[80px] xs:h-[100px] sm:h-[120px] w-[120px] xs:w-[160px] sm:w-[200px]"
//                   src={logo}
//                   alt="Real Estate Logo"
//                 />
//               </Link>
//             </div>

//             {/* Desktop Menu */}
//             <div className="hidden custom-md-flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
//               <Link
//                 to="/"
//                 className="text-gray-600  font-semibold  hover:text-gray-900 text-sm md:text-base lg:text-lg"
//               >
//                 Home
//               </Link>
//               <Link
//                 to="/about"
//                 className="text-gray-600  font-semibold  hover:text-gray-900 text-sm md:text-base lg:text-lg"
//               >
//                 About Us
//               </Link>

//               <div className="relative">
//                 <button
//                   onClick={toggleServicesMenu}
//                   className="text-gray-600  font-semibold  hover:text-gray-900 flex items-center text-sm md:text-base lg:text-lg"
//                 >
//                   Services
//                   <ChevronDown className="ml-1 xs:ml-2 h-4 xs:h-5 w-4 xs:w-5" />
//                 </button>
//                 {isServicesOpen && (
//                   <div className="absolute mt-2 w-40 xs:w-44 sm:w-48 bg-white shadow-lg rounded-md py-2">
//                     <Link
//                       to="/services/sell"
//                       className="block px-4 py-2 text-gray-600  font-semibold  hover:bg-gray-100"
//                       onClick={() => setIsServicesOpen(false)}
//                     >
//                       Sell
//                     </Link>
//                     <Link
//                       to="/services/rental"
//                       className="block px-4 py-2 text-gray-600  font-semibold  hover:bg-gray-100"
//                       onClick={() => setIsServicesOpen(false)}
//                     >
//                       Rental
//                     </Link>
//                     <Link
//                       to="/services/purchase"
//                       className="block px-4 py-2 text-gray-600  font-semibold  hover:bg-gray-100"
//                       onClick={() => setIsServicesOpen(false)}
//                     >
//                       Purchase
//                     </Link>
//                     <Link
//                       to="/services/management"
//                       className="block px-4 py-2 text-gray-600  font-semibold  hover:bg-gray-100"
//                       onClick={() => setIsServicesOpen(false)}
//                     >
//                       Management
//                     </Link>
//                   </div>
//                 )}
//               </div>

//               <Link
//                 to="/contact"
//                 className="text-gray-600  font-semibold  hover:text-gray-900 text-sm md:text-base lg:text-lg"
//               >
//                 Contact Us
//               </Link>
//               <Link
//                 to="/testimonials"
//                 className="text-gray-600  font-semibold  hover:text-gray-900 text-sm md:text-base lg:text-lg"
//               >
//                 Testimonials
//               </Link>
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="flex items-center custom-md-hidden">
//               <button
//                 onClick={toggleMobileMenu}
//                 className="text-gray-600  font-semibold  hover:text-gray-900 focus:outline-none"
//               >
//                 {menustate ? (
//                   <X className="h-5 xs:h-6 w-5 xs:w-6" />
//                 ) : (
//                   <Menu className="h-5 xs:h-6 w-5 xs:w-6" />
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {menustate && (
//           <div className="custom-md-hidden">
//             <div className="px-2 xs:px-3 pt-2 pb-3 space-y-1">
//               <Link
//                 to="/"
//                 className="block px-3 py-2 text-gray-600  font-semibold  hover:text-gray-900"
//                 onClick={toggleMobileMenu}
//               >
//                 Home
//               </Link>
//               <Link
//                 to="/about"
//                 className="block px-3 py-2 text-gray-600  font-semibold  hover:text-gray-900"
//                 onClick={toggleMobileMenu}
//               >
//                 About Us
//               </Link>
//               <div>
//                 <button
//                   onClick={toggleServicesMenu}
//                   className="w-full text-left px-3 py-2 text-gray-600  font-semibold  hover:text-gray-900 flex justify-between items-center"
//                 >
//                   Services
//                   <ChevronDown className="h-4 xs:h-5 w-4 xs:w-5" />
//                 </button>
//                 {isServicesOpen && (
//                   <div className="pl-4 xs:pl-6 space-y-1">
//                     <Link
//                       to="/services/sell"
//                       className="block px-3 py-2 text-gray-600  font-semibold  hover:text-gray-900"
//                       onClick={toggleMobileMenu}
//                     >
//                       Sell
//                     </Link>
//                     <Link
//                       to="/services/rental"
//                       className="block px-3 py-2 text-gray-600  font-semibold  hover:text-gray-900"
//                       onClick={toggleMobileMenu}
//                     >
//                       Rental
//                     </Link>
//                     <Link
//                       to="/services/purchase"
//                       className="block px-3 py-2 text-gray-600  font-semibold  hover:text-gray-900"
//                       onClick={toggleMobileMenu}
//                     >
//                       Purchase
//                     </Link>
//                     <Link
//                       to="/services/management"
//                       className="block px-3 py-2 text-gray-600  font-semibold  hover:text-gray-900"
//                       onClick={toggleMobileMenu}
//                     >
//                       Management
//                     </Link>
//                   </div>
//                 )}
//               </div>
//               <Link
//                 to="/contact"
//                 className="block px-3 py-2 text-gray-600  font-semibold  hover:text-gray-900"
//                 onClick={toggleMobileMenu}
//               >
//                 Contact Us
//               </Link>
//               <Link
//                 to="/testimonials"
//                 className="block px-3 py-2 text-gray-600  font-semibold  hover:text-gray-900"
//                 onClick={toggleMobileMenu}
//               >
//                 Testimonials
//               </Link>
//             </div>
//           </div>
//         )}
//       </nav>
//     </>
//   );
// };

// export default Navbar;

// TODO: fixed the search page nav tab

import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../assets/Cloverrealitylogo.png";
import { useDispatch, useSelector } from "react-redux";
import { setMenuState } from "../store/stateManage";

const Navbar = () => {
  const [isDesktopServicesOpen, setIsDesktopServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const menustate = useSelector((state) => state.stateManage.menuState);
  const desktopServicesRef = useRef(null);
  const mobileServicesRef = useRef(null);

  // bharatTheme
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar if scrolling up or at top
      if (currentScrollY < lastScrollY || currentScrollY <= 100) {
        setShowNavbar(true);
      }
      // Hide navbar if scrolling down past navbar height (100px)
      else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setShowNavbar(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // high-end theme
  const [scrollPos, setScrollPos] = useState(0);
  const [scrollDir, setScrollDir] = useState("up");
  const [atTop, setAtTop] = useState(true);
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  useEffect(() => {
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      setScrollDir(currentScroll > lastScroll ? "down" : "up");
      setScrollPos(currentScroll);
      setAtTop(currentScroll <= 10); // near top

      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [path]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        desktopServicesRef.current &&
        !desktopServicesRef.current.contains(e.target) &&
        mobileServicesRef.current &&
        !mobileServicesRef.current.contains(e.target)
      ) {
        setIsDesktopServicesOpen(false);
        setIsMobileServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDesktopServicesMenu = () => {
    setIsDesktopServicesOpen(!isDesktopServicesOpen);
    setIsMobileServicesOpen(false);
  };

  const toggleMobileServicesMenu = () => {
    setIsMobileServicesOpen(!isMobileServicesOpen);
    setIsDesktopServicesOpen(false);
  };

  const dispatch = useDispatch();

  const toggleMobileMenu = () => {
    dispatch(setMenuState(!menustate));
    setIsDesktopServicesOpen(false);
    setIsMobileServicesOpen(false);
  };

  const handleServiceItemClick = () => {
    setIsDesktopServicesOpen(false);
    setIsMobileServicesOpen(false);
    if (menustate) {
      dispatch(setMenuState(!menustate));
    }
  };

 

  return (
    <>
      {/* High-end theme */}
      {path != "properties" && (
        <nav
          className={`w-full fixed top-0 left-0 z-40 transition-all duration-500 ${
            !atTop ? "opacity-0 pointer-events-none" : "opacity-100"
          } text-white`}
        >
          <div className="max-w-screen-xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="flex justify-between h-12 xs:h-14 sm:h-16">
              <div className="flex items-center">
                <Link to="/">
                  <img
                    className="h-[50px] xs:h-[50px] sm:h-[50px] w-[50px] xs:w-[50px] sm:w-[50px]"
                    src={logo}
                    alt="Real Estate Logo"
                  />
                </Link>
              </div>

              {/* Desktop Menu */}
              <div className="hidden custom-md-flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
                <Link
                  to="/"
                  className="text-gray-600  font-semibold hover:text-gray-900 text-sm md:text-base lg:text-lg"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="text-gray-600  font-semibold  hover:text-gray-900 text-sm md:text-base lg:text-lg"
                >
                  About Us
                </Link>

                <div className="relative" ref={desktopServicesRef}>
                  <button
                    onClick={toggleDesktopServicesMenu}
                    className="text-gray-600  font-semibold  hover:text-gray-900 flex items-center text-sm md:text-base lg:text-lg"
                  >
                    Services
                    <ChevronDown className="ml-1 xs:ml-2 h-4 xs:h-5 w-4 xs:w-5" />
                  </button>
                  {isDesktopServicesOpen && atTop && (
                    <div className="absolute mt-2 w-40 xs:w-44 sm:w-48 bg-gradient-to-t from-white to-100%  shadow-lg rounded-md py-2">
                      <Link
                        to="/services/sell"
                        className="block px-4 py-2 text-gray-600  font-semibold  hover:bg-gray-100"
                        onClick={handleServiceItemClick}
                      >
                        Sell
                      </Link>
                      <Link
                        to="/services/rental"
                        className="block px-4 py-2 text-gray-600  font-semibold  hover:bg-gray-100"
                        onClick={handleServiceItemClick}
                      >
                        Rental
                      </Link>
                      <Link
                        to="/services/purchase"
                        className="block px-4 py-2 text-gray-600  font-semibold  hover:bg-gray-100"
                        onClick={handleServiceItemClick}
                      >
                        Purchase
                      </Link>
                      <Link
                        to="/services/management"
                        className="block px-4 py-2 text-gray-600  font-semibold  hover:bg-gray-100"
                        onClick={handleServiceItemClick}
                      >
                        Management
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  to="/properties"
                  className="text-gray-600  font-semibold  hover:text-gray-900 text-sm md:text-base lg:text-lg"
                >
                  Properties
                </Link>

                <Link
                  to="/contact"
                  className="text-gray-600  font-semibold  hover:text-gray-900 text-sm md:text-base lg:text-lg"
                >
                  Contact Us
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <div className="flex items-center custom-md-hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="text-gray-600  font-semibold  hover:text-gray-900 focus:outline-none"
                >
                  {menustate ? (
                    <X className="h-5 xs:h-6 w-5 xs:w-6" />
                  ) : (
                    <Menu className="h-5 xs:h-6 w-5 xs:w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {menustate && (
            <div className="custom-md-hidden bg-gradient-to-t from-white to-120% rounded-br-lg rounded-bl-lg">
              <div className="px-2 xs:px-3 pt-2 pb-3 space-y-1">
                <Link
                  to="/"
                  className="block px-3 py-2 text-gray-600  font-semibold  hover:text-gray-900"
                  onClick={toggleMobileMenu}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="block px-3 py-2 text-gray-600  font-semibold  hover:text-gray-900"
                  onClick={toggleMobileMenu}
                >
                  About Us
                </Link>
                <div ref={mobileServicesRef}>
                  <button
                    onClick={toggleMobileServicesMenu}
                    className="w-full text-left px-3 py-2 text-gray-600  font-semibold  hover:text-gray-900 flex justify-between items-center"
                  >
                    Services
                    <ChevronDown className="h-4 xs:h-5 w-4 xs:w-5" />
                  </button>
                  {isMobileServicesOpen && atTop && (
                    <div className="pl-4 xs:pl-6 space-y-1">
                      <Link
                        to="/services/sell"
                        className="block px-3 py-2 text-gray-600  font-semibold  hover:bg-gray-100"
                        onClick={handleServiceItemClick}
                      >
                        Sell
                      </Link>
                      <Link
                        to="/services/rental"
                        className="block px-3 py-2 text-gray-600  font-semibold  hover:bg-gray-100"
                        onClick={handleServiceItemClick}
                      >
                        Rental
                      </Link>
                      <Link
                        to="/services/purchase"
                        className="block px-3 py-2 text-gray-600  font-semibold  hover:bg-gray-100"
                        onClick={handleServiceItemClick}
                      >
                        Purchase
                      </Link>
                      <Link
                        to="/services/management"
                        className="block px-3 py-2 text-gray-600  font-semibold  hover:bg-gray-100"
                        onClick={handleServiceItemClick}
                      >
                        Management
                      </Link>
                    </div>
                  )}
                </div>
                <Link
                  to="/properties"
                  className="block px-3 py-2 text-gray-600  font-semibold  hover:text-gray-900"
                  onClick={toggleMobileMenu}
                >
                  Properties
                </Link>
                <Link
                  to="/contact"
                  className="block px-3 py-2 text-gray-600  font-semibold  hover:text-gray-900"
                  onClick={toggleMobileMenu}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          )}
        </nav>
      )}

      {/* Background Navbar - appears on scroll up */}
      <nav
        className={`w-full shadow-2xl fixed top-0 left-0 z-50 transition-all duration-500 ${
          !atTop && scrollDir === "up" ? "translate-y-0" : "-translate-y-full"
        } bg-white shadow-lg`}
      >
        <div className="max-w-screen-xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between h-12 xs:h-14 sm:h-16">
            <div className="flex items-center">
              <Link to="/">
                <img
                  className="h-[50px] xs:h-[50px] sm:h-[50px] w-[50px] xs:w-[50px] sm:w-[50px]"
                  src={logo}
                  alt="Real Estate Logo"
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden custom-md-flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
              <Link
                to="/"
                className="text-gray-600  font-semibold  hover:text-gray-900 text-sm md:text-base lg:text-lg"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-600  font-semibold  hover:text-gray-900 text-sm md:text-base lg:text-lg"
              >
                About Us
              </Link>

              <div className="relative" ref={desktopServicesRef}>
                <button
                  onClick={toggleDesktopServicesMenu}
                  className="text-gray-600  font-semibold  hover:text-gray-900 flex items-center text-sm md:text-base lg:text-lg"
                >
                  Services
                  <ChevronDown className="ml-1 xs:ml-2 h-4 xs:h-5 w-4 xs:w-5" />
                </button>
                {isDesktopServicesOpen && !atTop && scrollDir === "up" && (
                  <div className="absolute mt-2 w-40 xs:w-44 sm:w-48 bg-white shadow-lg rounded-md py-2">
                    <Link
                      to="/services/sell"
                      className="block px-4 py-2 text-gray-600  font-semibold  hover:bg-gray-100"
                      onClick={handleServiceItemClick}
                    >
                      Sell
                    </Link>
                    <Link
                      to="/services/rental"
                      className="block px-4 py-2 text-gray-600  font-semibold  hover:bg-gray-100"
                      onClick={handleServiceItemClick}
                    >
                      Rental
                    </Link>
                    <Link
                      to="/services/purchase"
                      className="block px-4 py-2 text-gray-600  font-semibold  hover:bg-gray-100"
                      onClick={handleServiceItemClick}
                    >
                      Purchase
                    </Link>
                    <Link
                      to="/services/management"
                      className="block px-4 py-2 text-gray-600  font-semibold  hover:bg-gray-100"
                      onClick={handleServiceItemClick}
                    >
                      Management
                    </Link>
                  </div>
                )}
              </div>
              <Link
                to="/properties"
                className="text-gray-600  font-semibold  hover:text-gray-900 text-sm md:text-base lg:text-lg"
              >
                Properties
              </Link>
              <Link
                to="/contact"
                className="text-gray-600  font-semibold  hover:text-gray-900 text-sm md:text-base lg:text-lg"
              >
                Contact Us
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center custom-md-hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-600  font-semibold  hover:text-gray-900 focus:outline-none"
              >
                {menustate ? (
                  <X className="h-5 xs:h-6 w-5 xs:w-6" />
                ) : (
                  <Menu className="h-5 xs:h-6 w-5 xs:w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menustate && (
          <div className="custom-md-hidden">
            <div className="px-2 xs:px-3 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-600  font-semibold  hover:text-gray-900"
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-gray-600  font-semibold  hover:text-gray-900"
                onClick={toggleMobileMenu}
              >
                About Us
              </Link>
              <div ref={mobileServicesRef}>
                <button
                  onClick={toggleMobileServicesMenu}
                  className="w-full text-left px-3 py-2 text-gray-600  font-semibold  hover:text-gray-900 flex justify-between items-center"
                >
                  Services
                  <ChevronDown className="h-4 xs:h-5 w-4 xs:w-5" />
                </button>
                {isMobileServicesOpen && !atTop && scrollDir === "up" && (
                  <div className="pl-4 xs:pl-6 space-y-1">
                    <Link
                      to="/services/sell"
                      className="block px-3 py-2 text-gray-600  font-semibold  hover:bg-gray-100"
                      onClick={handleServiceItemClick}
                    >
                      Sell
                    </Link>
                    <Link
                      to="/services/rental"
                      className="block px-3 py-2 text-gray-600  font-semibold  hover:bg-gray-100"
                      onClick={handleServiceItemClick}
                    >
                      Rental
                    </Link>
                    <Link
                      to="/services/purchase"
                      className="block px-3 py-2 text-gray-600  font-semibold  hover:bg-gray-100"
                      onClick={handleServiceItemClick}
                    >
                      Purchase
                    </Link>
                    <Link
                      to="/services/management"
                      className="block px-3 py-2 text-gray-600  font-semibold  hover:bg-gray-100"
                      onClick={handleServiceItemClick}
                    >
                      Management
                    </Link>
                  </div>
                )}
              </div>
              <Link
                to="/properties"
                className="block px-3 py-2 text-gray-600  font-semibold  hover:text-gray-900"
                onClick={toggleMobileMenu}
              >
                Properties
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-600  font-semibold  hover:text-gray-900"
                onClick={toggleMobileMenu}
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </nav>

      {path === "properties" && (
        <nav
          className={`w-full shadow-2xl fixed top-0 left-0 z-50 transition-all duration-500
             ${
            !atTop ? "opacity-0 pointer-events-none" : "opacity-100"
          }
           bg-white shadow-lg`}
        >
          <div className="max-w-screen-xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="flex justify-between h-12 xs:h-14 sm:h-16">
              <div className="flex items-center">
                <Link to="/">
                  <img
                    className="h-[50px] xs:h-[50px] sm:h-[50px] w-[50px] xs:w-[50px] sm:w-[50px]"
                    src={logo}
                    alt="Real Estate Logo"
                  />
                </Link>
              </div>

              {/* Desktop Menu */}
              <div className="hidden custom-md-flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
                <Link
                  to="/"
                  className="text-gray-600  font-semibold  hover:text-gray-900 text-sm md:text-base lg:text-lg"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="text-gray-600  font-semibold  hover:text-gray-900 text-sm md:text-base lg:text-lg"
                >
                  About Us
                </Link>

                <div className="relative" ref={desktopServicesRef}>
                  <button
                    onClick={toggleDesktopServicesMenu}
                    className="text-gray-600  font-semibold  hover:text-gray-900 flex items-center text-sm md:text-base lg:text-lg"
                  >
                    Services
                    <ChevronDown className="ml-1 xs:ml-2 h-4 xs:h-5 w-4 xs:w-5" />
                  </button>
                  {isDesktopServicesOpen && !atTop && scrollDir === "up" && (
                    <div className="absolute mt-2 w-40 xs:w-44 sm:w-48 bg-white shadow-lg rounded-md py-2">
                      <Link
                        to="/services/sell"
                        className="block px-4 py-2 text-gray-600  font-semibold  hover:bg-gray-100"
                        onClick={handleServiceItemClick}
                      >
                        Sell
                      </Link>
                      <Link
                        to="/services/rental"
                        className="block px-4 py-2 text-gray-600  font-semibold  hover:bg-gray-100"
                        onClick={handleServiceItemClick}
                      >
                        Rental
                      </Link>
                      <Link
                        to="/services/purchase"
                        className="block px-4 py-2 text-gray-600  font-semibold  hover:bg-gray-100"
                        onClick={handleServiceItemClick}
                      >
                        Purchase
                      </Link>
                      <Link
                        to="/services/management"
                        className="block px-4 py-2 text-gray-600  font-semibold  hover:bg-gray-100"
                        onClick={handleServiceItemClick}
                      >
                        Management
                      </Link>
                    </div>
                  )}
                </div>
                <Link
                  to="/properties"
                  className="text-gray-600  font-semibold  hover:text-gray-900 text-sm md:text-base lg:text-lg"
                >
                  Properties
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-600  font-semibold  hover:text-gray-900 text-sm md:text-base lg:text-lg"
                >
                  Contact Us
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <div className="flex items-center custom-md-hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="text-gray-600  font-semibold  hover:text-gray-900 focus:outline-none"
                >
                  {menustate ? (
                    <X className="h-5 xs:h-6 w-5 xs:w-6" />
                  ) : (
                    <Menu className="h-5 xs:h-6 w-5 xs:w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {menustate && (
            <div className="custom-md-hidden">
              <div className="px-2 xs:px-3 pt-2 pb-3 space-y-1">
                <Link
                  to="/"
                  className="block px-3 py-2 text-gray-600  font-semibold  hover:text-gray-900"
                  onClick={toggleMobileMenu}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="block px-3 py-2 text-gray-600  font-semibold  hover:text-gray-900"
                  onClick={toggleMobileMenu}
                >
                  About Us
                </Link>
                <div ref={mobileServicesRef}>
                  <button
                    onClick={toggleMobileServicesMenu}
                    className="w-full text-left px-3 py-2 text-gray-600  font-semibold  hover:text-gray-900 flex justify-between items-center"
                  >
                    Services
                    <ChevronDown className="h-4 xs:h-5 w-4 xs:w-5" />
                  </button>
                  {isMobileServicesOpen && !atTop && scrollDir === "up" && (
                    <div className="pl-4 xs:pl-6 space-y-1">
                      <Link
                        to="/services/sell"
                        className="block px-3 py-2 text-gray-600  font-semibold  hover:bg-gray-100"
                        onClick={handleServiceItemClick}
                      >
                        Sell
                      </Link>
                      <Link
                        to="/services/rental"
                        className="block px-3 py-2 text-gray-600  font-semibold  hover:bg-gray-100"
                        onClick={handleServiceItemClick}
                      >
                        Rental
                      </Link>
                      <Link
                        to="/services/purchase"
                        className="block px-3 py-2 text-gray-600  font-semibold  hover:bg-gray-100"
                        onClick={handleServiceItemClick}
                      >
                        Purchase
                      </Link>
                      <Link
                        to="/services/management"
                        className="block px-3 py-2 text-gray-600  font-semibold  hover:bg-gray-100"
                        onClick={handleServiceItemClick}
                      >
                        Management
                      </Link>
                    </div>
                  )}
                </div>
                <Link
                  to="/properties"
                  className="block px-3 py-2 text-gray-600  font-semibold  hover:text-gray-900"
                  onClick={toggleMobileMenu}
                >
                  Properties
                </Link>
                <Link
                  to="/contact"
                  className="block px-3 py-2 text-gray-600  font-semibold  hover:text-gray-900"
                  onClick={toggleMobileMenu}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          )}
        </nav>
      )}
    </>
  );
};

export default Navbar;

// fiex the store states properly

