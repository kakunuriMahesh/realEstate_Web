
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-blue-300 w-[calc(100%-1rem)] xs:w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] mx-2 xs:mx-3 sm:mx-4 my-2 xs:my-3 sm:my-4 mb-[30px] p-3 xs:p-4 sm:p-[15px] opacity-[0.8] rounded-[12px] shadow-2xl ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <Link to="/services" className="text-gray-600 hover:text-gray-900 text-sm md:text-base lg:text-lg">Services</Link>
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
            <Link to="/services" className="block px-3 py-2 text-gray-600 hover:text-gray-900" onClick={toggleMobileMenu}>Services</Link>
            <Link to="/contact" className="block px-3 py-2 text-gray-600 hover:text-gray-900" onClick={toggleMobileMenu}>Contact Us</Link>
            <Link to="/testimonials" className="block px-3 py-2 text-gray-600 hover:text-gray-900" onClick={toggleMobileMenu}>Testimonials</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;