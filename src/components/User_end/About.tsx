import { useEffect, useRef, useContext, useState } from 'react';
import { Award, Users, Calendar } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { ThemeContext } from './PortfolioLayout';

const About = () => {
  const theme = useContext(ThemeContext);
  const { aboutData } = useData();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = aboutData.stats.map((stat, index) => ({
    Icon: [Award, Users, Calendar][index % 3],
    value: stat.value,
    label: stat.label,
  }));

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.98, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.section
      id="about"
      ref={sectionRef}
      className={`py-10 sm:py-16 transition-colors duration-500 overflow-hidden relative ${theme.theme === 'light' ? 'bg-slate-50/50' : 'bg-transparent'}`}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {/* Dynamic Background Elements - Cyan Theme */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div className="mb-10 text-center lg:text-left" variants={itemVariants}>
          <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
            <div className="h-[2px] w-6 bg-blue-600 rounded-full" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-600">The Genesis</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] ${
              theme.theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}
          >
            A Glimpse Into <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">My Creative Journey</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          
          {/* Main Content Area */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <div className="space-y-4">
              <h3 className={`text-2xl sm:text-3xl font-bold leading-tight ${
                  theme.theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}
              >
                {aboutData.heading}
              </h3>
              <div className="space-y-4 pr-0 lg:pr-8">
                {aboutData.paragraphs.slice(0, 1).map((para, i) => (
                  <p key={i} className={`text-base sm:text-lg leading-relaxed font-medium ${
                      theme.theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
            
            <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-white/10">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-600">Core Expertise</p>
              <div className="flex flex-wrap gap-2 sm:gap-3 pr-0 lg:pr-8">
                {aboutData.highlights.map((highlight) => (
                  <motion.span 
                    key={highlight} 
                    whileHover={{ scale: 1.02, y: -1 }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold tracking-widest uppercase border transition-all ${
                      theme.theme === 'light'
                        ? 'bg-white border-blue-100 text-gray-700 shadow-sm hover:border-blue-600 hover:text-blue-600'
                        : 'bg-gray-900 border-white/10 text-gray-300 shadow-lg hover:border-blue-500 hover:text-blue-500'
                    }`}
                  >
                    {highlight}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Stats & Mission Statement */}
          <div className="space-y-4">
            
            {/* Visual Callout - Mission */}
            <motion.div variants={itemVariants} className={`p-4 sm:p-5 rounded-2xl border-2 border-dashed relative overflow-hidden group ${
              theme.theme === 'light' ? 'border-blue-200 bg-blue-50/50' : 'border-blue-900/30 bg-blue-900/10'
            }`}>
                <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110">
                   <Award size={80} className="text-blue-600" />
                </div>
                <p className={`text-sm font-bold italic relative z-10 leading-relaxed ${
                  theme.theme === 'light' ? 'text-blue-900/80' : 'text-blue-400/80'
                }`}>
                  "{aboutData.missionStatement || "My mission is to translate complex problems into intuitive digital solutions that empower users and scale businesses."}"
                </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  className={`p-4 rounded-xl transition-all duration-500 border relative overflow-hidden group ${
                    theme.theme === 'light' 
                      ? 'bg-white border-gray-100 shadow-sm hover:border-blue-300' 
                      : 'bg-gray-900 border-white/5 hover:bg-gray-800 hover:border-blue-500/30'
                  }`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="absolute -right-2 -bottom-2 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110">
                      <stat.Icon size={60} className="text-blue-600" />
                  </div>
                  <div className="flex items-center gap-3 relative z-10">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                      theme.theme === 'light' ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' : 'bg-blue-950 text-blue-400 group-hover:bg-blue-600 group-hover:text-white'
                    }`}>
                      <stat.Icon size={16} />
                    </div>
                    <div>
                      <div className={`text-xl sm:text-2xl font-black tracking-tight leading-none mb-1 ${
                        theme.theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {stat.value}
                      </div>
                      <div className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;