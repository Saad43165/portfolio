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
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
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
    <section id="home" className={`min-h-screen flex items-center justify-center relative overflow-hidden pt-32 sm:pt-40 transition-colors duration-500 ${
      theme.theme === 'light' ? 'bg-white' : 'bg-gray-950'
    }`}>
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-0 -left-1/4 w-[800px] h-[800px] rounded-full blur-[120px] ${
            theme.theme === 'light' ? 'bg-blue-50/60' : 'bg-blue-900/10'
          }`}
        />
        <motion.div 
          animate={{ 
            scale: [1.1, 1, 1.1],
            x: [0, -30, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute bottom-0 -right-1/4 w-[800px] h-[800px] rounded-full blur-[120px] ${
            theme.theme === 'light' ? 'bg-purple-50/60' : 'bg-purple-900/10'
          }`}
        />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Main Info Section */}
          <div className="order-2 lg:order-1 space-y-10 text-left">
            <div className="space-y-6">
              <motion.div variants={itemVariants} className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-12 bg-blue-600" />
                <span className="text-xs font-black uppercase tracking-[0.4em] text-blue-600">Personal Overview</span>
              </motion.div>
              
              <motion.h1 variants={itemVariants} className={`text-5xl sm:text-7xl xl:text-8xl font-black leading-[1.1] tracking-tight ${
                theme.theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Digital Mastery</span> <br />
                with {portfolioInfo.name.split(' ')[0]}
              </motion.h1>
              
              <motion.div variants={itemVariants} className="h-8">
                <p className={`text-xl sm:text-2xl font-bold ${
                  theme.theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  Specializing in <span className="text-blue-600 dark:text-blue-400 border-r-4 border-blue-600 dark:border-blue-400 pr-2">{displayText}</span>
                </p>
              </motion.div>
            </div>

            <motion.p variants={itemVariants} className={`text-lg sm:text-2xl leading-relaxed font-medium max-w-2xl ${
              theme.theme === 'light' ? 'text-gray-700' : 'text-gray-400'
            }`}>
              Engineering high-performance applications with a focus on seamless user experiences. 
              Currently based in <span className={`font-black ${theme.theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{portfolioInfo.location}</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-6 pt-4">
              <motion.button 
                onClick={handleExploreClick}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-10 py-5 rounded-2xl text-base font-black uppercase tracking-widest flex items-center justify-center gap-4 shadow-2xl transition-all ${
                  theme.theme === 'light' ? 'bg-gray-950 text-white shadow-gray-400/20' : 'bg-white text-gray-950 shadow-blue-500/10'
                }`}
              >
                Explore Work
                <Code size={20} />
              </motion.button>
              
              {portfolioInfo.resumeUrl && (
                <a href={portfolioInfo.resumeUrl} download>
                  <motion.button 
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-10 py-5 rounded-2xl text-base font-black uppercase tracking-widest border flex items-center justify-center gap-4 transition-all ${
                      theme.theme === 'light' 
                        ? 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50' 
                        : 'bg-gray-900 border-white/10 text-white hover:bg-gray-800'
                    }`}
                  >
                    <Download size={20} />
                    Resume
                  </motion.button>
                </a>
              )}
            </motion.div>

            {/* Socials */}
            <div className="pt-10 flex gap-8">
              {portfolioInfo.socialLinks.map((social) => {
                const Icon = getSocialIcon(social.platform);
                return (
                  <motion.a
                    key={social.url}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -5 }}
                    className={`${theme.theme === 'light' ? 'text-gray-400 hover:text-blue-600' : 'text-gray-600 hover:text-white'} transition-all`}
                  >
                    <Icon size={28} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Profile Visual Section */}
          <motion.div 
            variants={itemVariants}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative group max-w-[320px] sm:max-w-[420px] w-full">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-8 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-[4rem] blur-3xl"
              />
              
              <div className="relative aspect-square rounded-[4rem] bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 p-2 shadow-2xl border border-white/50 dark:border-white/5 overflow-hidden">
                <img
                  src={portfolioInfo.profileImage || "/image.png"}
                  alt={portfolioInfo.name}
                  className="w-full h-full object-cover rounded-[3.5rem] transition-all duration-1000 transform group-hover:scale-105"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.style.display = 'none';
                    img.parentElement?.classList.add('bg-gradient-to-br', 'from-blue-600', 'to-purple-600');
                  }}
                />
                
                {/* Visual Accent */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              
              {/* Floating Element */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 p-6 rounded-[2rem] bg-white dark:bg-gray-800 shadow-2xl border border-gray-100 dark:border-gray-700 hidden sm:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                    <Code size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Projects</p>
                    <p className="text-lg font-black text-gray-900 dark:text-white leading-none">{projects.length}+</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 dark:text-gray-700">Scroll</span>
        <div className="w-0.5 h-12 bg-gradient-to-b from-blue-600 to-transparent rounded-full overflow-hidden">
          <motion.div 
            animate={{ y: [-50, 50] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-full h-1/2 bg-blue-400"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;