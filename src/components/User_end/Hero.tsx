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
    <section id="home" className={`h-dvh min-h-[600px] flex items-center justify-center relative overflow-hidden transition-colors duration-500 ${
      theme.theme === 'light' ? 'bg-white' : 'bg-gray-950'
    }`}>
      {/* Background Decor - Refined */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.05, 1],
            x: [0, 20, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-0 -left-1/4 w-[600px] h-[600px] rounded-full blur-[100px] ${
            theme.theme === 'light' ? 'bg-blue-100/30' : 'bg-blue-900/5'
          }`}
        />
        <motion.div 
          animate={{ 
            scale: [1.05, 1, 1.05],
            x: [0, -20, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute bottom-0 -right-1/4 w-[600px] h-[600px] rounded-full blur-[100px] ${
            theme.theme === 'light' ? 'bg-blue-50/50' : 'bg-purple-900/5'
          }`}
        />
        <div 
          className={`absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] ${
            theme.theme === 'light' ? 'bg-indigo-50/40' : 'bg-blue-900/5'
          }`}
        />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pt-24 sm:pt-32 lg:pt-0"
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Main Info Section */}
          <div className="order-2 lg:order-1 space-y-4 sm:space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-4 mb-2">
                <div className="h-[2px] w-8 bg-blue-600 rounded-full" />
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-blue-600">Personal Overview</span>
              </motion.div>
              
              <motion.h1 variants={itemVariants} className={`text-6xl sm:text-7xl xl:text-9xl font-bold leading-[0.9] tracking-tighter text-center lg:text-left ${
                theme.theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                {portfolioInfo.name.split(' ')[0]} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 uppercase">
                  {portfolioInfo.name.split(' ')[1]}
                </span>
              </motion.h1>
              
              <motion.div 
                variants={itemVariants} 
                className="flex items-center justify-center lg:justify-start gap-4"
              >
                <div className="h-[2px] w-8 bg-blue-600 rounded-full" />
                <p className={`text-lg sm:text-xl font-bold tracking-widest uppercase ${
                  theme.theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {portfolioInfo.roles[0]}
                </p>
              </motion.div>
            </div>

            <motion.p variants={itemVariants} className={`text-base sm:text-xl leading-relaxed font-medium max-w-xl mx-auto lg:mx-0 text-center lg:text-left ${
              theme.theme === 'light' ? 'text-gray-700' : 'text-gray-400'
            }`}>
              Engineering high-performance applications with a focus on seamless user experiences. 
              Currently based in <span className={`font-bold ${theme.theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{portfolioInfo.location}</span>.
            </motion.p>

            {/* Benchmark Skill Tags */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2">
              {['React', 'Node.js', 'TypeScript', 'Tailwind'].map((skill) => (
                <span key={skill} className="px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border border-blue-500/20 bg-blue-500/5 text-blue-400">
                  {skill}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons - More compact */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
              <motion.button 
                onClick={handleExploreClick}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg transition-all ${
                  theme.theme === 'light' ? 'bg-gray-950 text-white' : 'bg-white text-gray-950'
                }`}
              >
                Explore Work
                <Code size={16} />
              </motion.button>
              
              {portfolioInfo.resumeUrl && (
                <a href={portfolioInfo.resumeUrl} download>
                  <motion.button 
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest border flex items-center justify-center gap-3 transition-all ${
                      theme.theme === 'light' 
                        ? 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50' 
                        : 'bg-gray-900 border-white/10 text-white hover:bg-gray-800'
                    }`}
                  >
                    <Download size={16} />
                    Resume
                  </motion.button>
                </a>
              )}
            </motion.div>

            {/* Socials - More subtle */}
            <div className="pt-6 flex justify-center lg:justify-start gap-6">
              {portfolioInfo.socialLinks.map((social) => {
                const Icon = getSocialIcon(social.platform);
                return (
                  <motion.a
                    key={social.url}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    className={`${theme.theme === 'light' ? 'text-gray-400 hover:text-blue-600' : 'text-gray-600 hover:text-white'} transition-all`}
                  >
                    <Icon size={22} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Profile Visual Section - MATCH BENCHMARK */}
          <motion.div 
            variants={itemVariants}
            className="order-1 flex justify-center w-full"
          >
            <div className="relative group max-w-[200px] sm:max-w-[340px] lg:max-w-[480px] w-full">
              {/* Massive Background Glow */}
              <div className="absolute -inset-10 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-1000" />
              
              <div className={`relative aspect-square rounded-[2rem] sm:rounded-[3rem] lg:rounded-[4rem] overflow-hidden border-2 shadow-2xl transition-all duration-700 ${
                theme.theme === 'light' 
                  ? 'bg-white border-gray-100 shadow-blue-500/5' 
                  : 'bg-gray-900 border-white/5 group-hover:border-blue-500/20'
              }`}>
                <img
                  src={portfolioInfo.profileImage || "/image.png"}
                  alt={portfolioInfo.name}
                  className="w-full h-full object-cover rounded-2xl transition-all duration-1000 transform group-hover:scale-105"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.style.display = 'none';
                    img.parentElement?.classList.add('bg-gradient-to-br', 'from-blue-600', 'to-purple-600');
                  }}
                />
              </div>
              
              {/* Floating Element - Subtle */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 hidden sm:block"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                    <Code size={16} />
                  </div>
                  <div className="text-left">
                    <p className="text-[8px] font-bold uppercase tracking-widest text-gray-400">Works</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white leading-none">{projects.length}+</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator - Refined */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <div className="w-0.5 h-10 bg-gray-100 dark:bg-gray-900 rounded-full overflow-hidden relative">
          <motion.div 
            animate={{ y: [-40, 40] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute top-0 left-0 w-full h-1/2 bg-blue-500"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;