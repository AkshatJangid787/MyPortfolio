
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Mail, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-orange-500/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-500">
                Akshat Jangid
              </h2>
            </div>
            <p className="text-gray-300 max-w-md">
              Full Stack Developer
            </p>
            <div className="flex space-x-4 pt-2">
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-medium mb-4 pb-2 border-b border-orange-500/10">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <NavLink 
                  to="/" 
                  className="text-gray-300 hover:text-orange-400 transition-colors"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/services" 
                  className="text-gray-300 hover:text-orange-400 transition-colors"
                >
                  Skills
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/references" 
                  className="text-gray-300 hover:text-orange-400 transition-colors"
                >
                  Projects
                </NavLink>
              </li>
              <li>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-medium mb-4 pb-2 border-b border-orange-500/10">
              Contact Me
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-gray-300 hover:text-psyco-orange-light transition-colors">
                <Mail size={16} className="text-orange-500 " />
                <span >akshatjangid14@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-300">
                <Linkedin size={16} className="text-orange-500" />
                <a 
                  href="https://www.linkedin.com/in/akshatjangid/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-orange-500/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Akshat Jangid. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
