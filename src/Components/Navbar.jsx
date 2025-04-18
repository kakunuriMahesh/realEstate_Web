
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

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isServicesOpen) setIsServicesOpen(false);
  };

  const toggleServicesMenu = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  return (
    <nav className="bg-blue-300 fixed top-0 w-[calc(100%-1rem)] xs:w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] mx-2 xs:mx-3 sm:mx-4 my-2 xs:my-3 sm:my-4 z-50 p-3 xs:p-4 sm:p-[15px] opacity-[0.8] rounded-[12px] shadow-2xl">
      <div className="max-w-screen-xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between h-12 xs:h-14 sm:h-16">
          <div className="flex items-center">
            <Link to="/">
              <img
                className="h-[80px] xs:h-[100px] sm:h-[120px] w-[120px] xs:w-[160px] sm:w-[200px]"
                src={logo}
                alt="Real Estate Logo"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden custom-md-flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900 text-sm md:text-base lg:text-lg">Home</Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900 text-sm md:text-base lg:text-lg">About Us</Link>

            <div className="relative">
              <button
                onClick={toggleServicesMenu}
                className="text-gray-600 hover:text-gray-900 flex items-center text-sm md:text-base lg:text-lg"
              >
                Services
                <ChevronDown className="ml-1 xs:ml-2 h-4 xs:h-5 w-4 xs:w-5" />
              </button>
              {isServicesOpen && (
                <div className="absolute mt-2 w-40 xs:w-44 sm:w-48 bg-white shadow-lg rounded-md py-2">
                  <Link to="/services/sell" className="block px-4 py-2 text-gray-600 hover:bg-gray-100" onClick={() => setIsServicesOpen(false)}>Sell</Link>
                  <Link to="/services/rental" className="block px-4 py-2 text-gray-600 hover:bg-gray-100" onClick={() => setIsServicesOpen(false)}>Rental</Link>
                  <Link to="/services/purchase" className="block px-4 py-2 text-gray-600 hover:bg-gray-100" onClick={() => setIsServicesOpen(false)}>Purchase</Link>
                  <Link to="/services/management" className="block px-4 py-2 text-gray-600 hover:bg-gray-100" onClick={() => setIsServicesOpen(false)}>Management</Link>
                </div>
              )}
            </div>

            <Link to="/contact" className="text-gray-600 hover:text-gray-900 text-sm md:text-base lg:text-lg">Contact Us</Link>
            <Link to="/testimonials" className="text-gray-600 hover:text-gray-900 text-sm md:text-base lg:text-lg">Testimonials</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center custom-md-hidden">
            <button onClick={toggleMobileMenu} className="text-gray-600 hover:text-gray-900 focus:outline-none">
              {isMobileMenuOpen ? (
                <X className="h-5 xs:h-6 w-5 xs:w-6" />
              ) : (
                <Menu className="h-5 xs:h-6 w-5 xs:w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="custom-md-hidden">
          <div className="px-2 xs:px-3 pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 text-gray-600 hover:text-gray-900" onClick={toggleMobileMenu}>Home</Link>
            <Link to="/about" className="block px-3 py-2 text-gray-600 hover:text-gray-900" onClick={toggleMobileMenu}>About Us</Link>
            <div>
              <button
                onClick={toggleServicesMenu}
                className="w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 flex justify-between items-center"
              >
                Services
                <ChevronDown className="h-4 xs:h-5 w-4 xs:w-5" />
              </button>
              {isServicesOpen && (
                <div className="pl-4 xs:pl-6 space-y-1">
                  <Link to="/services/sell" className="block px-3 py-2 text-gray-600 hover:text-gray-900" onClick={toggleMobileMenu}>Sell</Link>
                  <Link to="/services/rental" className="block px-3 py-2 text-gray-600 hover:text-gray-900" onClick={toggleMobileMenu}>Rental</Link>
                  <Link to="/services/purchase" className="block px-3 py-2 text-gray-600 hover:text-gray-900" onClick={toggleMobileMenu}>Purchase</Link>
                  <Link to="/services/management" className="block px-3 py-2 text-gray-600 hover:text-gray-900" onClick={toggleMobileMenu}>Management</Link>
                </div>
              )}
            </div>
            <Link to="/contact" className="block px-3 py-2 text-gray-600 hover:text-gray-900" onClick={toggleMobileMenu}>Contact Us</Link>
            <Link to="/testimonials" className="block px-3 py-2 text-gray-600 hover:text-gray-900" onClick={toggleMobileMenu}>Testimonials</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
