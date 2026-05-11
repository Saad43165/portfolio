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
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 w-full z-[80] transition-all duration-500 ease-in-out ${
        scrolled || isOpen
          ? 'bg-white/80 dark:bg-[#020617]/80 backdrop-blur-2xl border-b border-gray-100 dark:border-white/5 shadow-xl shadow-blue-500/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex justify-between items-center transition-all duration-500 ${
          scrolled ? 'h-16' : 'h-20 sm:h-24'
        }`}>
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0 cursor-pointer group z-[70]"
            onClick={() => handleNavClick('#home')}
          >
            <span className={`text-xl sm:text-2xl font-bold transition-all duration-500 ${
              theme.theme === 'light' 
                ? 'text-gray-900' 
                : 'bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent'
            }`}>
              <span className="hidden sm:inline">{portfolioInfo.name}</span>
              <span className="sm:hidden">{portfolioInfo.name.split(' ')[0]}</span>
            </span>
          </motion.div>

          {/* Desktop Menu - Aggressive Hiding */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex space-x-1 items-center bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-widest flex items-center space-x-2 transition-all duration-300 overflow-hidden group ${
                    activeSection === item.href
                      ? 'text-white'
                      : 'text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {activeSection === item.href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-blue-600 dark:bg-blue-500 shadow-md"
                      transition={{ type: 'spring', duration: 0.5 }}
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

      {/* Full Screen Mobile Overlay - BENCHMARK STYLE */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed inset-0 z-[100] md:hidden backdrop-blur-3xl flex flex-col items-center justify-center space-y-8 ${
              theme.theme === 'light' ? 'bg-white/95' : 'bg-[#020617]/95'
            }`}
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 p-2 text-gray-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div className="w-full max-w-sm px-8 pt-32 pb-12 overflow-y-auto">
              <div className="flex flex-col space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    onClick={() => handleNavClick(item.href)}
                    className={`w-full py-6 flex items-center justify-between border-b transition-all ${
                      activeSection === item.href 
                        ? 'border-blue-600 text-blue-600' 
                        : theme.theme === 'light' ? 'border-gray-100 text-gray-900' : 'border-white/5 text-white/70'
                    }`}
                  >
                    <div className="flex items-center gap-6">
                      <div className={`p-2 rounded-xl ${
                        activeSection === item.href ? 'bg-blue-600/10' : 'bg-gray-500/5'
                      }`}>
                        <item.icon size={20} strokeWidth={2} />
                      </div>
                      <span className="text-xl font-bold tracking-tight">{item.name}</span>
                    </div>
                    <div className={`w-1.5 h-1.5 rounded-full transition-all ${
                      activeSection === item.href ? 'bg-blue-600' : 'bg-transparent'
                    }`} />
                  </motion.button>
                ))}
              </div>

              <div className="mt-12 space-y-8">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  onClick={() => handleNavClick('#contact')}
                  className="w-full py-5 bg-blue-600 text-white rounded-2xl text-base font-bold uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/20"
                >
                  Start a Project
                </motion.button>
                
                <div className="flex justify-center gap-10 pt-4">
                  {portfolioInfo.socialLinks.map((social) => {
                    const Icon = getSocialIcon(social.platform);
                    return (
                      <a key={social.platform} href={social.url} target="_blank" className="text-gray-400 hover:text-blue-500 transition-colors">
                        <Icon size={22} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-white dark:bg-gray-950 z-[65] flex flex-col justify-center px-8 sm:px-12"
          >
            {/* Background Orbs for Menu */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
              <div className="absolute bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 space-y-4">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  variants={menuItemVariants}
                  onClick={() => handleNavClick(item.href)}
                  className={`group w-full flex items-center justify-between py-4 text-3xl sm:text-4xl font-bold tracking-tight transition-all ${
                    activeSection === item.href
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <span className={`text-sm font-black uppercase tracking-[0.3em] ${
                      activeSection === item.href ? 'text-blue-600' : 'text-gray-300 dark:text-gray-700'
                    }`}>
                      0{navItems.indexOf(item) + 1}
                    </span>
                    <span className="relative">
                      {item.name}
                      {activeSection === item.href && (
                        <motion.div 
                          layoutId="activeIndicator"
                          className="absolute -right-8 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full"
                        />
                      )}
                    </span>
                  </div>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className={`transition-all ${
                      activeSection === item.href 
                        ? 'text-blue-600' 
                        : 'text-gray-300 dark:text-gray-800'
                    }`}
                  >
                    <item.icon size={28} strokeWidth={1.5} />
                  </motion.div>
                </motion.button>
              ))}
            </div>

            <motion.div 
              variants={menuItemVariants}
              className="mt-16 pt-8 border-t border-gray-100 dark:border-white/5 flex justify-between items-center"
            >
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Get in touch</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{portfolioInfo.email}</p>
              </div>
              <div className="flex gap-4">
                {portfolioInfo.socialLinks.slice(0, 3).map((social, i) => (
                  <a key={i} href={social.url} className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-500 hover:text-blue-600 transition-colors">
                    <div className="w-5 h-5 bg-current mask-icon" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;