import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  Home,
  User,
  Code,
  Briefcase,
  Mail,
  GraduationCap,
  Layout,
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { ThemeContext } from './PortfolioLayout';

const Navigation = () => {
  const { portfolioInfo } = useData();
  const theme = React.useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  const navItems = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Experience', href: '#experience', icon: Briefcase },
    { name: 'Education', href: '#education', icon: GraduationCap },
    { name: 'Skills', href: '#skills', icon: Code },
    { name: 'Projects', href: '#projects', icon: Layout },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Scrolled state
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    // Hidden state (Smart Header)
    // Only hide if we've scrolled down a bit and are continuing to scroll down
    if (latest > 100 && latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      // Improved active section detection
      const sections = navItems.map(item => ({
        id: item.href,
        element: document.querySelector(item.href)
      }));

      const scrollPosition = window.scrollY + 300;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element instanceof HTMLElement) {
          const offsetTop = section.element.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id);
            break;
          }
        }
      }
      
      if (window.scrollY < 100) {
        setActiveSection('#home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
  };

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: hidden ? "-100%" : 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 40 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? 'bg-white/95 dark:bg-gray-950/95 shadow-xl shadow-gray-200/50 dark:shadow-none backdrop-blur-2xl border-b border-gray-100 dark:border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0 cursor-pointer group"
            onClick={() => handleNavClick('#home')}
          >
            <span className={`text-2xl sm:text-3xl font-black transition-all duration-500 ${
              theme.theme === 'light' 
                ? 'text-gray-900' 
                : 'bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent'
            }`}>
              {portfolioInfo.name}
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex space-x-1 items-center bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest flex items-center space-x-2 transition-all duration-300 overflow-hidden group ${
                    activeSection === item.href
                      ? 'text-white'
                      : 'text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {activeSection === item.href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
                      transition={{ type: 'spring', duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <item.icon size={14} />
                    {item.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Theme Toggle Button - Compact */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={theme.toggleTheme}
              className={`p-2.5 rounded-xl border transition-all ${
                theme.theme === 'light'
                  ? 'bg-white border-gray-200 text-gray-900 shadow-sm'
                  : 'bg-gray-900 border-gray-800 text-yellow-400 shadow-xl'
              }`}
            >
              {theme.theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="18.36" x2="5.64" y2="19.78"></line><line x1="18.36" y1="4.22" x2="19.78" y2="5.64"></line></svg>
              )}
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={theme.toggleTheme}
              className={`p-3 rounded-2xl border transition-all ${
                theme.theme === 'light'
                  ? 'bg-white border-gray-200 text-gray-900 shadow-sm'
                  : 'bg-gray-900 border-gray-800 text-yellow-400'
              }`}
            >
              {theme.theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="18.36" x2="5.64" y2="19.78"></line><line x1="18.36" y1="4.22" x2="19.78" y2="5.64"></line></svg>
              )}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 rounded-2xl bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors shadow-sm"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-gray-950/95 backdrop-blur-2xl border-t border-gray-100 dark:border-gray-800 shadow-2xl overflow-hidden"
          >
            <div className="px-4 py-8 space-y-3">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleNavClick(item.href)}
                  className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl text-lg font-black transition-all duration-300 ${
                    activeSection === item.href
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/20'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900'
                  }`}
                >
                  <span className="flex items-center gap-4">
                    <item.icon size={22} />
                    {item.name}
                  </span>
                  {activeSection === item.href && <motion.div layoutId="mobileArrow" className="w-2 h-2 bg-white rounded-full" />}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;