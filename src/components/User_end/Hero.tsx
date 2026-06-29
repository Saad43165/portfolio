import React, { useEffect, useState, useContext } from 'react';
import { Github, Linkedin, Download, Mail, Code, Instagram, Twitter, Facebook, Youtube, Globe } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { ThemeContext } from './PortfolioLayout';

const Hero = () => {
  const { portfolioInfo } = useData();
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
                className="min-h-[80px] sm:min-h-[96px] lg:min-h-[80px] flex flex-col justify-end"
              >
                <h2 className={`text-2xl sm:text-3xl lg:text-2xl font-bold tracking-tight leading-relaxed ${theme.theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                  Crafting Digital Excellence through <br className="hidden sm:block" />
                  <span className="text-blue-500 font-black italic">{displayText || '\u00A0'}</span>
                  <span className="animate-pulse inline-block w-1.5 h-8 lg:h-6 bg-blue-500 ml-1 align-middle" />
                </h2>
              </motion.div>
            </div>

            <motion.p variants={itemVariants} className={`text-base sm:text-xl lg:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-semibold ${theme.theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
              {portfolioInfo.tagline || "Focused on architecting high-performance Web & Mobile Applications."}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 sm:gap-6 pt-2 lg:pt-1">
              <motion.button
                onClick={handleExploreClick}
                whileHover={{ y: -8, scale: 1.05, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
                whileTap={{ scale: 0.95 }}
                className={`px-10 py-4 sm:px-10 sm:py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl transition-all ${theme.theme === 'light' ? 'bg-gray-950 text-white shadow-gray-200' : 'bg-white text-gray-950 shadow-blue-500/20'
                  }`}
              >
                Explore Works
                <Code size={20} />
              </motion.button>

              <motion.a
                href={portfolioInfo.resumeUrl}
                download
                whileHover={{ y: -8, scale: 1.05, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
                whileTap={{ scale: 0.95 }}
                className={`px-10 py-4 sm:px-10 sm:py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] border flex items-center justify-center gap-3 transition-all ${theme.theme === 'light'
                    ? 'bg-gray-50 border-gray-200 text-gray-900 hover:bg-gray-100 hover:border-gray-300 shadow-md'
                    : 'bg-white/5 border-white/10 text-white hover:bg-white/10 shadow-xl'
                  }`}
              >
                <Download size={20} />
                Download CV
              </motion.a>
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
            className="flex-1 relative order-1 lg:order-2 mb-12 lg:mb-0 w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[340px] mx-auto"
          >
            {/* Soft Ambient Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-[80px] lg:blur-[100px] opacity-60 mix-blend-screen" />

            {/* Premium 3D Floating Frame */}
            <motion.div
              whileHover={{
                y: -12,
                rotateY: 8,
                rotateX: -4,
                scale: 1.02,
                transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
              }}
              className="relative aspect-[4/5] rounded-[2.5rem] sm:rounded-[3rem] p-3 sm:p-4 z-10 transition-all duration-700 mx-auto"
            >
              {/* Animated Border Gradient */}
              <div className={`absolute inset-0 rounded-[2.8rem] sm:rounded-[3.2rem] opacity-70 ${
                theme.theme === 'light' 
                  ? 'bg-gradient-to-b from-blue-100 via-transparent to-blue-50' 
                  : 'bg-gradient-to-b from-white/10 via-transparent to-white/5'
              }`} />
              
              {/* Inner Image Container */}
              <div className={`relative w-full h-full rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden group shadow-2xl ${
                theme.theme === 'light' ? 'bg-gray-100 shadow-blue-500/10' : 'bg-gray-900 shadow-black/50'
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

            {/* Floating Badge 1 */}
            <motion.div
              variants={itemVariants}
              className={`absolute -left-6 top-1/4 px-4 py-2.5 rounded-2xl border shadow-xl z-20 flex items-center gap-2.5 backdrop-blur-md ${
                theme.theme === 'light' ? 'bg-white/90 border-gray-100' : 'bg-gray-950/90 border-white/10'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Code size={14} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className={`text-[10px] font-black uppercase tracking-widest ${theme.theme === 'light' ? 'text-gray-950' : 'text-white'}`}>Software</p>
                <p className="text-[9px] font-semibold text-gray-500 uppercase tracking-widest">Engineer</p>
              </div>
            </motion.div>

            {/* Floating Badge 2 */}
            <motion.div
              variants={itemVariants}
              className={`absolute -right-6 bottom-1/4 px-4 py-2.5 rounded-2xl border shadow-xl z-20 flex items-center gap-2.5 backdrop-blur-md ${
                theme.theme === 'light' ? 'bg-white/90 border-gray-100' : 'bg-gray-950/90 border-white/10'
              }`}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse" />
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${theme.theme === 'light' ? 'text-gray-950' : 'text-white'}`}>
                Available
              </span>
            </motion.div>

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