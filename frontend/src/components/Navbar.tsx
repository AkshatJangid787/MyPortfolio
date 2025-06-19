
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Skills', path: '/services' },
    { name: 'Projects', path: '/references' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 px-6 md:px-12',
        scrolled ? 'glassmorphism bg-opacity-90 shadow-lg shadow-orange-500/10' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <NavLink to="/" className="flex items-center group">
          <div className="flex items-center space-x-3 transition-all duration-300 group-hover:scale-105">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 p-3 rounded-lg">
                <Code2 className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-500 group-hover:from-orange-300 group-hover:to-orange-400 transition-all duration-300">
              DevPortfolio
            </div>
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  'text-white hover:text-orange-400 transition-all duration-300 link-hover text-sm font-medium tracking-wide relative group',
                  isActive && 'text-orange-500 after:w-full',
                  'hover:scale-105'
                )
              }
            >
              <span className="relative z-10">{link.name}</span>
              <div className="absolute inset-0 bg-orange-500/10 rounded-md scale-0 group-hover:scale-100 transition-transform duration-300 -z-0"></div>
            </NavLink>
          ))}
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden text-white hover:text-orange-400 transition-all duration-300 hover:scale-110 relative group"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="absolute inset-0 bg-orange-500/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
          {isOpen ? <X size={24} className="relative z-10" /> : <Menu size={24} className="relative z-10" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 glassmorphism pt-24 px-8 transition-all duration-500 ease-in-out transform md:hidden backdrop-blur-xl',
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        )}
      >
        <div className="flex flex-col space-y-6">
          {navLinks.map((link, index) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  'text-white hover:text-orange-400 py-3 px-4 text-xl transition-all duration-300 rounded-lg hover:bg-orange-500/10 hover:translate-x-2',
                  isActive && 'text-orange-500 bg-orange-500/20'
                )
              }
              style={{ 
                animationDelay: `${index * 100}ms`,
                animation: isOpen ? 'slide-in 0.5s ease-out forwards' : undefined
              }}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Background overlay for mobile menu */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
