import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Send, Twitter, Instagram, Linkedin } from 'lucide-react';
import logo from '../assets/logo.png'; // Adjust if your logo has a different name

const Footer = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);


  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email); // Replace with POST to /newsletter
    setEmail('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };


  return (
    <footer className="bg-black text-gray-200 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-8"> */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-8 sm:space-y-0 sm:space-x-8">
          {/* Logo and About */}
          <div>
            <Link to="/">
              <img src={logo} alt="Dream Homes Realty" className="h-16 w-auto mb-4" />
            </Link>
            <p className="text-sm">
              Dream Homes Realty helps you find, buy, sell, or rent your perfect property with expert guidance.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-200 hover:text-blue-400 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-200 hover:text-blue-400 transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-200 hover:text-blue-400 transition-colors duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-200 hover:text-blue-400 transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-200 hover:text-blue-400 transition-colors duration-300">
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Sub-Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/services/sell"
                  className="text-gray-200 hover:text-blue-400 transition-colors duration-300"
                >
                  Sell
                </Link>
              </li>
              <li>
                <Link
                  to="/services/purchase"
                  className="text-gray-200 hover:text-blue-400 transition-colors duration-300"
                >
                  Purchase
                </Link>
              </li>
              <li>
                <Link
                  to="/services/rental"
                  className="text-gray-200 hover:text-blue-400 transition-colors duration-300"
                >
                  Rental
                </Link>
              </li>
              <li>
                <Link
                  to="/services/management"
                  className="text-gray-200 hover:text-blue-400 transition-colors duration-300"
                >
                  Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact and Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Get in Touch</h3>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>123 Realty St, City, State 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <a href="tel:+1234567890" className="hover:text-blue-400 transition-colors duration-300">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <a
                  href="mailto:info@dreamhomesrealty.com"
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  info@dreamhomesrealty.com
                </a>
              </li>
            </ul>
            <h3 className="text-lg font-semibold text-white mb-2">Newsletter</h3>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors duration-300 flex items-center justify-center"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
            {submitted && (
              <p className="text-blue-400 mt-2 text-sm">
                Thank you for subscribing!
              </p>
            )}
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 sm:mb-0">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-blue-400 transition-transform duration-300 hover:scale-110"
            >
              <Twitter className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-blue-400 transition-transform duration-300 hover:scale-110"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-blue-400 transition-transform duration-300 hover:scale-110"
            >
              <Instagram className="h-6 w-6" />
            </a>
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} Dream Homes Realty. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;