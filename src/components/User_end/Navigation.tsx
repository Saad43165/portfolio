import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Instagram, Twitter, Mail, Layout, User, Briefcase, GraduationCap, Home, Code } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, Variants } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { ThemeContext } from './PortfolioLayout';

const Navigation = () => {
  const { portfolioInfo } = useData();
  const theme = React.useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
  
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github': return Github;
      case 'linkedin': return Linkedin;
      case 'instagram': return Instagram;
      case 'twitter': return Twitter;
      default: return Mail;
    }
  };

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Scrolled state
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  useEffect(() => {
    const handleScroll = () => {
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

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const menuItemVariants: Variants = {
    closed: { opacity: 0, y: 15 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed top-0 left-0 w-full z-[80] transition-all duration-500 ease-in-out ${
          scrolled || isOpen
            ? 'border-b border-gray-100 dark:border-white/5 shadow-lg shadow-blue-500/5'
            : ''
        }`}
        style={{ 
          backgroundColor: (scrolled || isOpen) 
            ? (theme.theme === 'light' ? '#ffffff' : '#020617') 
            : 'transparent' 
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className={`flex justify-between items-center transition-all duration-500 ${
            scrolled ? 'h-14' : 'h-16 lg:h-20'
          }`}>
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-shrink-0 cursor-pointer group z-[70] flex items-center gap-3"
              onClick={() => handleNavClick('#home')}
            >
              {/* Architectural Monogram - No Box */}
              <div className="relative flex items-center justify-center py-2">
                <div className="relative">
                  <span className={`text-4xl font-black tracking-tighter transition-all duration-500 group-hover:scale-110 block ${
                    theme.theme === 'light' ? 'text-gray-950' : 'text-white'
                  }`}>
                    S
                    <span className="text-blue-600">.</span>
                  </span>
                  {/* Premium Glow Aura */}
                  <div className="absolute -inset-2 bg-blue-600/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              </div>

              <div className="flex flex-col justify-center border-l-2 border-gray-100 dark:border-white/10 pl-3">
                <span className="text-sm font-black tracking-[0.2em] leading-none">
                  <span style={{ color: theme.theme === 'light' ? '#000000' : '#ffffff' }}>
                    SAAD
                  </span>
                </span>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.5em] mt-1 leading-none">
                  IKRAM
                </span>
              </div>
            </motion.div>

            {/* Desktop Menu - Aggressive Hiding */}
            <div className="hidden md:flex items-center gap-6">
            <div className="flex space-x-1 items-center bg-white dark:bg-gray-900 p-1.5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                  className={`relative px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-widest flex items-center space-x-2 transition-all duration-300 overflow-hidden group ${
                    activeSection === item.href
                      ? 'text-white'
                      : 'text-gray-950 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                  >
                    {activeSection === item.href && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20"
                        transition={{ 
                          type: 'spring', 
                          stiffness: 400, 
                          damping: 30,
                          mass: 0.8
                        }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <item.icon size={14} />
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>

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

            {/* Mobile Actions - Aggressive Visibility */}
            <div className="md:hidden flex items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={theme.toggleTheme}
                className={`p-2.5 rounded-xl border transition-all ${
                  theme.theme === 'light'
                    ? 'bg-gray-50 border-gray-100 text-gray-900 shadow-sm'
                    : 'bg-gray-900 border-white/5 text-yellow-400'
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
                className={`p-2.5 rounded-xl transition-all ${
                  theme.theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}
              >
                {isOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed inset-0 z-[120] md:hidden flex flex-col items-center justify-start overflow-y-auto ${
              theme.theme === 'light' ? 'bg-white' : 'bg-[#020617]'
            }`}
            style={{ backgroundColor: theme.theme === 'light' ? '#ffffff' : '#020617' }}
          >
            {/* Header Area */}
            <div className="w-full flex items-center justify-between p-8 border-b border-gray-100 dark:border-white/5 relative z-[130] bg-inherit">
              <span className={`text-sm font-black uppercase tracking-[0.3em] ${
                theme.theme === 'light' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Navigation
              </span>
              <button 
                onClick={() => setIsOpen(false)}
                className={`p-2 rounded-xl border transition-all ${
                  theme.theme === 'light' ? 'bg-gray-50 border-gray-100 text-gray-900' : 'bg-gray-900 border-white/5 text-white'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* Menu List - FORCED VISIBILITY */}
            <div className="w-full max-w-sm px-8 pt-12 pb-20 relative z-[120]">
              <ul className="flex flex-col w-full space-y-4">
                {navItems.map((item) => (
                  <li key={item.name} className="w-full">
                    <button
                      onClick={() => {
                        handleNavClick(item.href);
                        setIsOpen(false);
                      }}
                      className={`w-full py-6 flex items-center justify-between border-b transition-all ${
                        activeSection === item.href 
                          ? 'border-blue-600 text-blue-600' 
                          : theme.theme === 'light' ? 'border-gray-200 text-gray-900' : 'border-white/10 text-white'
                      }`}
                    >
                      <div className="flex items-center gap-6">
                        <div className={`p-3 rounded-2xl ${
                          activeSection === item.href ? 'bg-blue-600/10' : 'bg-gray-500/10'
                        }`}>
                          <item.icon size={24} strokeWidth={2} />
                        </div>
                        <span className="text-2xl font-black tracking-tight">{item.name}</span>
                      </div>
                      <div className={`w-3 h-3 rounded-full transition-all ${
                        activeSection === item.href ? 'bg-blue-600' : 'bg-transparent'
                      }`} />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-16 space-y-10">
                <button
                  onClick={() => {
                    handleNavClick('#contact');
                    setIsOpen(false);
                  }}
                  className="w-full py-6 bg-blue-600 text-white rounded-3xl text-lg font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/40"
                >
                  Start a Project
                </button>
                
                <div className="flex justify-center gap-12">
                  {portfolioInfo.socialLinks.map((social) => {
                    const Icon = getSocialIcon(social.platform);
                    return (
                      <a key={social.platform} href={social.url} target="_blank" className="text-gray-400 hover:text-blue-500 transition-all hover:scale-110">
                        <Icon size={28} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;