import React, { useEffect, useState, useContext } from 'react';
import { Github, Linkedin, Download, Mail, Code, Instagram, Twitter } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { ThemeContext } from './PortfolioLayout';

const Hero = () => {
  const { portfolioInfo, projects } = useData();
  const theme = useContext(ThemeContext);
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const titles = portfolioInfo.roles || [
    'Software Engineer',
    'Android Developer',
    'Flutter Developer',
    'Java Developer',
  ];

  useEffect(() => {
    if (titles.length === 0) return;
    const currentTitle = titles[currentIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentTitle.length) {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, titles]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github': return Github;
      case 'linkedin': return Linkedin;
      case 'instagram': return Instagram;
      case 'twitter': return Twitter;
      default: return Mail;
    }
  };

  const handleExploreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector('#projects');
    if (element) {
      const headerHeight = 80;
      const target = element.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-500 pt-10 sm:pt-20 ${
      theme.theme === 'light' ? 'bg-[#fcfdfe]' : 'bg-[#020617]'
    }`}>
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tl from-indigo-500/20 to-cyan-500/20 blur-[120px]"
        />
        {/* Subtle Grid Pattern */}
        <div className={`absolute inset-0 opacity-[0.03] ${theme.theme === 'light' ? 'invert' : ''}`} 
          style={{ backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
        />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto w-full -mt-10 sm:mt-0"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20">
          
          {/* Content Left */}
          <div className="flex-1 space-y-6 sm:space-y-10 text-center lg:text-left order-2 lg:order-1">
            <div className="space-y-6 sm:space-y-8">
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                </span>
                <span className="text-[12px] font-black uppercase tracking-[0.3em] text-blue-500">Available for Innovation</span>
              </motion.div>
              
              <div className="space-y-3 sm:space-y-4">
                <motion.h1 
                  variants={itemVariants} 
                  className={`text-6xl sm:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter ${
                    theme.theme === 'light' ? 'text-gray-950' : 'text-white'
                  }`}
                >
                  Saad <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">Ikram</span>
                </motion.h1>
                
                <motion.div variants={itemVariants} className="h-1.5 w-32 bg-gradient-to-r from-blue-600 to-transparent rounded-full mx-auto lg:mx-0" />
              </div>

              <motion.div variants={itemVariants}>
                <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight leading-relaxed ${
                  theme.theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  Crafting Digital Excellence through <br className="hidden sm:block" />
                  <span className="text-blue-500 font-black italic">{displayText}</span>
                  <span className="animate-pulse inline-block w-1.5 h-10 bg-blue-500 ml-1 align-middle" />
                </h2>
              </motion.div>
            </div>

            <motion.p variants={itemVariants} className={`text-base sm:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed font-semibold ${
              theme.theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              {portfolioInfo.tagline || "Focused on architecting high-performance Web & Mobile Applications."}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 sm:gap-6 pt-4 sm:pt-6">
              <motion.button 
                onClick={handleExploreClick}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl transition-all ${
                  theme.theme === 'light' ? 'bg-gray-950 text-white' : 'bg-white text-gray-950'
                }`}
              >
                Explore Works
                <Code size={20} />
              </motion.button>
              
              <motion.a 
                href={portfolioInfo.resumeUrl} 
                download
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] border flex items-center justify-center gap-3 transition-all ${
                  theme.theme === 'light' 
                    ? 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50' 
                    : 'bg-white/5 border-white/10 text-white hover:bg-white/10 shadow-xl'
                }`}
              >
                <Download size={20} />
                Download CV
              </motion.a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-center lg:justify-start gap-8 pt-10 sm:pt-12">
              {portfolioInfo.socialLinks.map((social) => {
                const Icon = getSocialIcon(social.platform);
                return (
                  <motion.a
                    key={social.url}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.3, y: -5, color: '#3b82f6' }}
                    className={`${theme.theme === 'light' ? 'text-gray-400' : 'text-gray-600'} transition-all`}
                  >
                    <Icon size={24} />
                  </motion.a>
                );
              })}
            </motion.div>
          </div>

          {/* Visual Right */}
          <motion.div 
            variants={itemVariants}
            className="flex-1 relative order-1 lg:order-2 mb-6 lg:mb-0"
          >
            <div className="relative w-full max-w-[200px] sm:max-w-[320px] lg:max-w-[380px] mx-auto">
              {/* Complex Architectural Background */}
              <div className="absolute inset-0 bg-blue-600/10 rounded-[4rem] sm:rounded-[5rem] blur-[50px] sm:blur-[80px] animate-pulse" />
              
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-6 border border-dashed border-blue-500/20 rounded-full"
              />
              
              <div className={`relative aspect-square rounded-[3rem] sm:rounded-[4rem] lg:rounded-[5rem] overflow-hidden border-2 p-2 ${
                theme.theme === 'light' ? 'border-gray-200 bg-white shadow-2xl' : 'border-white/10 bg-white/5 backdrop-blur-2xl shadow-blue-500/10'
              }`}>
                <div className="w-full h-full rounded-[2.8rem] sm:rounded-[3.8rem] lg:rounded-[4.8rem] overflow-hidden relative group">
                  <img
                    src={portfolioInfo.profileImage || "/image.png"}
                    alt={portfolioInfo.name}
                    className="w-full h-full object-cover transition-all duration-1000 transform group-hover:scale-105 grayscale-[10%] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      {/* Modern Scroll Indicator - Hidden on mobile to prevent overlap */}
      <div className="hidden sm:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-3 pointer-events-none">
        <span className={`text-[10px] font-bold uppercase tracking-[0.4em] ${theme.theme === 'light' ? 'text-gray-400' : 'text-gray-600'}`}>Scroll</span>
        <div className={`w-px h-16 relative overflow-hidden ${theme.theme === 'light' ? 'bg-gray-200' : 'bg-gray-800'}`}>
          <motion.div 
            animate={{ y: [-64, 64] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-blue-500"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;