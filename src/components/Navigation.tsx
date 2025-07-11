import React, { useState, useEffect } from 'react';
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
  const [activeSection, setActiveSection] = useState<string>('#home');

  const navItems: { name: string; href: string; icon: React.ElementType }[] = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Skills', href: '#skills', icon: Code },
    { name: 'Experience', href: '#experience', icon: Briefcase },
    { name: 'Education', href: '#education', icon: User },
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
        (element as HTMLElement).getBoundingClientRect().top +
        window.scrollY -
        headerHeight;
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
    setIsOpen(false); // close mobile menu
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 shadow-md backdrop-blur-md'
          : 'bg-white/90 backdrop-blur-md'
      } ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Saad Ikram
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors duration-200 ${
                  activeSection === item.href
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                <item.icon size={16} />
                <span>{item.name}</span>
              </button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none transition duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } bg-white/95 backdrop-blur-md border-t border-gray-200`}
      >
        <div className="px-4 py-4 space-y-2">
          {navItems.map((item, index) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.href)}
              className={`w-full flex items-center space-x-2 px-4 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                activeSection === item.href
                  ? 'text-blue-600 bg-gray-100'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
              }`}
              style={{ transitionDelay: `${index * 0.05}s` }}
            >
              <item.icon size={18} />
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
