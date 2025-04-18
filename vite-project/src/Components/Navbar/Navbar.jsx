

import React, { useState } from 'react';
import NavbarLogo from "../../assets/Logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleServicesMenu = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  return (
    <nav className="bg-blue-300 fixed top-0 w-[calc(100%-1rem)] xs:w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] mx-2 xs:mx-3 sm:mx-4 my-2 xs:my-3 sm:my-4 z-50 p-3 xs:p-4 sm:p-[15px] opacity-[0.8] rounded-[12px] shadow-2xl">
      <div className="max-w-screen-xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between h-12 xs:h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl xs:text-2xl font-bold text-gray-800">
              <img
                className="h-[80px] xs:h-[100px] sm:h-[120px] w-[120px] xs:w-[160px] sm:w-[200px]"
                src={NavbarLogo}
                alt="logo"
              />
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm md:text-base lg:text-lg">Home</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm md:text-base lg:text-lg">Search Listings</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm md:text-base lg:text-lg">About Us</a>
            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={toggleServicesMenu}
                className="text-gray-600 hover:text-gray-900 flex items-center text-sm md:text-base lg:text-lg"
              >
                Services
                <svg
                  className="ml-1 xs:ml-2 h-4 xs:h-5 w-4 xs:w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isServicesOpen && (
                <div className="absolute mt-2 w-40 xs:w-44 sm:w-48 bg-white shadow-lg rounded-md py-2">
                  <a href="#" className="block px-3 xs:px-4 py-1 xs:py-2 text-gray-600 hover:bg-gray-100 text-sm xs:text-base">Go Green</a>
                  <a href="#" className="block px-3 xs:px-4 py-1 xs:py-2 text-gray-600 hover:bg-gray-100 text-sm xs:text-base">Sell</a>
                  <a href="#" className="block px-3 xs:px-4 py-1 xs:py-2 text-gray-600 hover:bg-gray-100 text-sm xs:text-base">Rental</a>
                  <a href="#" className="block px-3 xs:px-4 py-1 xs:py-2 text-gray-600 hover:text-gray-900 text-sm xs:text-base">Purchase</a>
                  <a href="#" className="block px-3 xs:px-4 py-1 xs:py-2 text-gray-600 hover:bg-gray-100 text-sm xs:text-base">Management</a>
                </div>
              )}
            </div>
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm md:text-base lg:text-lg">Contact Us</a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <svg
                className="h-5 xs:h-6 w-5 xs:w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 xs:px-3 pt-2 pb-3 space-y-1">
            <a href="#" className="block px-3 py-2 text-gray-600 hover:text-gray-900 text-sm xs:text-base">Home</a>
            <a href="#" className="block px-3 py-2 text-gray-600 hover:text-gray-900 text-sm xs:text-base">Search Listings</a>
            <a href="#" className="block px-3 py-2 text-gray-600 hover:text-gray-900 text-sm xs:text-base">About Us</a>
            {/* Services Dropdown for Mobile */}
            <div>
              <button
                onClick={toggleServicesMenu}
                className="w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 flex justify-between items-center text-sm xs:text-base"
              >
                Services
                <svg
                  className="h-4 xs:h-5 w-4 xs:w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isServicesOpen && (
                <div className="pl-4 xs:pl-6 space-y-1">
                  <a href="#" className="block px-3 py-1 xs:py-2 text-gray-600 hover:text-gray-900 text-sm xs:text-base">Go Green</a>
                  <a href="#" className="block px-3 py-1 xs:py-2 text-gray-600 hover:text-gray-900 text-sm xs:text-base">Sell</a>
                  <a href="#" className="block px-3 py-1 xs:py-2 text-gray-600 hover:text-gray-900 text-sm xs:text-base">Rental</a>
                  <a href="#" className="block px-3 py-1 xs:py-2 text-gray-600 hover:text-gray-900 text-sm xs:text-base">Purchase</a>
                  <a href="#" className="block px-3 py-1 xs:py-2 text-gray-600 hover:text-gray-900 text-sm xs:text-base">Management</a>
                </div>
              )}
            </div>
            <a href="#" className="block px-3 py-2 text-gray-600 hover:text-gray-900 text-sm xs:text-base">Contact Us</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;