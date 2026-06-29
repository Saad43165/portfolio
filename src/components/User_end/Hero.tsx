import React, { useEffect, useState, useContext } from 'react';
import { Github, Linkedin, Download, Mail, Code, Instagram, Twitter, Facebook, Youtube, Globe } from 'lucide-react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { ThemeContext } from './PortfolioLayout';
import { MagneticButton } from './MagneticButton';

const Hero = () => {
  const { portfolioInfo } = useData();
  const theme = useContext(ThemeContext);
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const titles = portfolioInfo.roles || [
    'Software Engineer',
    'Full Stack Developer',
    'Mobile App Development',
    'Website Development',
    'Software Quality Assurance'
  ];

  useEffect(() => {
    if (titles.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 3000); // Change role every 3 seconds
    
    return () => clearInterval(interval);
  }, [titles.length]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github': return Github;
      case 'linkedin': return Linkedin;
      case 'instagram': return Instagram;
      case 'twitter': case 'x': return Twitter;
      case 'facebook': return Facebook;
      case 'youtube': return Youtube;
      case 'mail': case 'email': return Mail;
      default: return Globe;
    }
  };

  const getSocialColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github': return '#333';
      case 'linkedin': return '#0077b5';
      case 'instagram': return '#e4405f';
      case 'twitter': case 'x': return '#1da1f2';
      case 'facebook': return '#1877f2';
      case 'youtube': return '#ff0000';
      default: return '#3b82f6';
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
    <section id="home" className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-500 pt-24 lg:pt-32 ${theme.theme === 'light' ? 'bg-transparent' : 'bg-transparent'
      }`}>
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full blur-[120px] ${
            theme.theme === 'light' ? 'bg-gradient-to-br from-blue-400/30 to-purple-400/30' : 'bg-gradient-to-br from-blue-500/20 to-purple-500/20'
          }`}
        />
        <div
          className={`absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] rounded-full blur-[120px] ${
            theme.theme === 'light' ? 'bg-gradient-to-tl from-indigo-400/30 to-cyan-400/30' : 'bg-gradient-to-tl from-indigo-500/20 to-cyan-500/20'
          }`}
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
        className="relative z-10 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto w-full lg:-mt-16"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12">

          {/* Content Left */}
          <div className="flex-1 space-y-4 lg:space-y-3 text-center lg:text-left order-2 lg:order-1">
            <div className="space-y-4 lg:space-y-2">
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                </span>
                <span className="text-[12px] font-black uppercase tracking-[0.3em] text-blue-500">Available for Innovation</span>
              </motion.div>

              <div className="space-y-1 lg:space-y-0.5">
                <motion.h1
                  variants={itemVariants}
                  className={`text-5xl sm:text-6xl lg:text-6xl font-black leading-[0.9] tracking-tighter ${theme.theme === 'light' ? 'text-gray-950' : 'text-white'
                    }`}
                >
                  Saad <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">Ikram</span>
                </motion.h1>

                <motion.div variants={itemVariants} className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-transparent rounded-full mx-auto lg:mx-0" />
              </div>

              <motion.div 
                variants={itemVariants}
                className="min-h-[60px] sm:min-h-[80px] lg:min-h-[60px] flex flex-col justify-end"
              >
                <h2 className={`text-2xl sm:text-3xl lg:text-2xl font-bold tracking-tight leading-relaxed ${theme.theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                  Crafting Digital Excellence through <br className="hidden sm:block" />
                  <div className="relative h-8 sm:h-10 lg:h-8 overflow-hidden inline-block align-bottom mt-1 w-full max-w-[400px]">
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={currentIndex}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -30, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="text-blue-500 font-black italic absolute left-0 whitespace-nowrap"
                      >
                        {titles[currentIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </h2>
              </motion.div>
            </div>

            <motion.p variants={itemVariants} className={`text-base sm:text-xl lg:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-semibold ${theme.theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
              {portfolioInfo.tagline || "Focused on architecting high-performance Web & Mobile Applications."}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 sm:gap-6 pt-2 lg:pt-1">
              <MagneticButton className="w-full sm:w-auto">
                <motion.button
                  onClick={handleExploreClick}
                  whileHover={{ y: -8, scale: 1.05, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full sm:w-auto px-10 py-4 sm:px-10 sm:py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl transition-all ${theme.theme === 'light' ? 'bg-gray-950 text-white shadow-gray-200' : 'bg-white text-gray-950 shadow-blue-500/20'
                    }`}
                >
                  Explore Works
                  <Code size={20} />
                </motion.button>
              </MagneticButton>

              <MagneticButton className="w-full sm:w-auto">
                <motion.a
                  href={portfolioInfo.resumeUrl}
                  download
                  whileHover={{ y: -8, scale: 1.05, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full sm:w-auto px-10 py-4 sm:px-10 sm:py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] border flex items-center justify-center gap-3 transition-all ${theme.theme === 'light'
                      ? 'bg-gray-50 border-gray-200 text-gray-900 hover:bg-gray-100 hover:border-gray-300 shadow-md'
                      : 'bg-white/5 border-white/10 text-white hover:bg-white/10 shadow-xl'
                    }`}
                >
                  <Download size={20} />
                  Download CV
                </motion.a>
              </MagneticButton>
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-center lg:justify-start gap-8 pt-4 lg:pt-3">
              {portfolioInfo.socialLinks.map((social) => {
                const Icon = getSocialIcon(social.platform);
                const brandColor = getSocialColor(social.platform);
                return (
                  <motion.a
                    key={social.url}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      scale: 1.4,
                      y: -8,
                      color: brandColor,
                      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                    }}
                    className={`${theme.theme === 'light' ? 'text-gray-400' : 'text-gray-600'} transition-all`}
                  >
                    <Icon size={24} />
                  </motion.a>
                );
              })}
            </motion.div>
          </div>

          {/* Visual Right: Improved Profile Presentation */}
          <motion.div
            variants={itemVariants}
            className="flex-1 relative order-1 lg:order-2 mb-16 lg:mb-0 w-full flex justify-center"
          >
            <div className="relative w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[340px]">
              {/* Soft Ambient Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-[80px] lg:blur-[100px] opacity-60 mix-blend-screen" />

              {/* Premium 3D Floating Frame */}
              <MagneticButton className="w-full">
                <motion.div
                  whileHover={{
                    y: -12,
                    rotateY: 8,
                    rotateX: -4,
                    scale: 1.02,
                    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
                  }}
                  className="relative aspect-[4/5] w-full rounded-[2.5rem] sm:rounded-[3rem] p-3 sm:p-4 z-10 transition-all duration-700"
                >
                  {/* Animated Border Gradient */}
                  <div className={`absolute inset-0 rounded-[2.8rem] sm:rounded-[3.2rem] opacity-100 border ${
                    theme.theme === 'light' 
                      ? 'bg-gradient-to-br from-blue-100 via-transparent to-purple-50 border-blue-200/50 shadow-inner' 
                      : 'bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 border-white/10 shadow-inner'
                  }`} />
                  
                  {/* Inner Image Container */}
                  <div className={`relative w-full h-full rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden group shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] ${
                    theme.theme === 'light' ? 'bg-gray-100 shadow-blue-500/20' : 'bg-[#0f172a] shadow-blue-900/30'
                  }`}>
                    <motion.img
                      src={portfolioInfo.profileImage || "/main_image.png"}
                      alt={portfolioInfo.name}
                      className="w-full h-full object-cover transition-all duration-1000 transform group-hover:scale-110"
                      style={{ objectPosition: 'center top' }}
                    />

                    {/* Glassmorphic Overlay on Hover */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ${
                      theme.theme === 'light'
                        ? 'bg-gradient-to-t from-white/40 via-transparent to-transparent'
                        : 'bg-gradient-to-t from-black/60 via-transparent to-transparent'
                    }`} />
                  </div>
                </motion.div>
              </MagneticButton>

              {/* Clean Integrated Badge - Below Image */}
              <motion.div
                variants={itemVariants}
                className={`absolute -bottom-6 left-0 sm:left-1/2 sm:-translate-x-1/2 w-max px-4 py-2.5 rounded-full border shadow-xl z-20 flex items-center justify-center gap-3 backdrop-blur-xl ${
                  theme.theme === 'light' ? 'bg-white/90 border-gray-200' : 'bg-gray-950/80 border-white/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Code size={14} className="text-blue-500" />
                  <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest ${theme.theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    Software Engineer
                  </span>
                </div>
                <div className={`w-px h-4 ${theme.theme === 'light' ? 'bg-gray-300' : 'bg-white/20'}`} />
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
                  <span className={`text-[8px] sm:text-[9px] font-black uppercase tracking-widest ${theme.theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    Available
                  </span>
                </div>
              </motion.div>
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