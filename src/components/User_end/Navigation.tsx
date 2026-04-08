import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  Home,
  User,
  Code,
  Briefcase,
  Mail,
} from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('#home');
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const navItems = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Experience', href: '#experience', icon: Briefcase },
    { name: 'Education', href: '#education', icon: User },
    { name: 'Skills', href: '#skills', icon: Code },
    { name: 'Projects', href: '#projects', icon: Briefcase },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Handle navbar visibility
      if (currentScrollY > 100) {
        setScrolled(true);
        setHidden(currentScrollY > lastScrollY && currentScrollY > 200);
      } else {
        setScrolled(false);
        setHidden(false);
      }
      setLastScrollY(currentScrollY);

      // Detect which section is active
      for (const item of navItems) {
        const section = document.querySelector(item.href);
        if (section) {
          const top = (section as HTMLElement).offsetTop - 100;
          const bottom = top + (section as HTMLElement).offsetHeight;
          if (currentScrollY >= top && currentScrollY < bottom) {
            setActiveSection(item.href);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const headerHeight = 80;
      const target =
        element.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
    setIsOpen(false);
    // Return focus to the menu button when closing the mobile menu
    menuButtonRef.current?.focus();
  };

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? 'bg-white/80 shadow-2xl backdrop-blur-xl border-b border-gray-200/50'
          : 'bg-white/70 backdrop-blur-xl'
      } ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 transform hover:scale-105 transition-transform duration-300">
            <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent hover:from-purple-600 hover:via-blue-600 hover:to-teal-600 transition-all duration-300 cursor-pointer">
              Saad Ikram
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  aria-current={activeSection === item.href ? 'page' : undefined}
                  className={`relative px-4 py-2.5 rounded-xl text-sm font-medium flex items-center space-x-2 transition-all duration-300 group ${
                    activeSection === item.href
                      ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/25 scale-105'
                      : 'text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105'
                  }`}
                >
                  <IconComponent size={16} className="transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                  <span className="relative">
                    {item.name}
                    {activeSection !== item.href && (
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              ref={menuButtonRef}
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="relative p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all duration-300 hover:scale-110 hover:shadow-lg"
            >
              {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        role="region"
        aria-label="Mobile navigation"
        className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } bg-white/90 backdrop-blur-xl border-t border-gray-200/50 shadow-2xl`}
      >
        <div className="px-4 py-4 space-y-2">
          {navItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                aria-current={activeSection === item.href ? 'page' : undefined}
                className={`w-full flex items-center space-x-3 px-4 py-3 min-h-[44px] rounded-xl text-base font-medium transition-all duration-300 group ${
                  activeSection === item.href
                    ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/25'
                    : 'text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:shadow-lg hover:shadow-blue-500/20'
                }`}
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                <IconComponent size={20} className="transition-transform duration-300 group-hover:scale-110 flex-shrink-0" aria-hidden="true" />
                <span className="flex-1 text-left">{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;