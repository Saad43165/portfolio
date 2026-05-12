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
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.98, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.section
      id="about"
      ref={sectionRef}
      className={`py-6 sm:py-10 transition-colors duration-500 overflow-hidden relative ${theme.theme === 'light' ? 'bg-gray-50/50' : 'bg-gray-950'}`}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {/* Subtle Background Accent */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div className="mb-12" variants={itemVariants}>
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
            <div className="h-[2px] w-8 bg-blue-600 rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">The Genesis</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] text-center lg:text-left ${
              theme.theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}
          >
            A Glimpse Into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">My Creative Journey</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-start">
          <div className="lg:col-span-5 space-y-12 order-2 lg:order-1 w-full">
            <motion.div className="relative group max-w-[260px] mx-auto lg:mx-0" variants={itemVariants}>
              <div className="absolute -inset-2 bg-gradient-to-br from-blue-600/30 to-indigo-600/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <motion.div 
                whileHover={{ rotateY: 5, rotateX: -5, scale: 1.02 }}
                className={`relative aspect-[5/6] rounded-3xl overflow-hidden border-2 p-1.5 transition-all duration-500 ${
                  theme.theme === 'light' ? 'bg-white border-blue-200 shadow-2xl' : 'bg-gray-900 border-white/10'
                }`}
              >
                <img
                  src={aboutData.aboutImage || "/saad_pic.JPG"}
                  alt="Saad Ikram"
                  className="w-full h-full object-cover rounded-[1.4rem] transition-all duration-1000 transform group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Magical Experience Float */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-[10px]">
                      SI
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">Mastery Level</span>
                      <span className="text-[9px] font-bold text-blue-300 uppercase tracking-tighter">Elite Developer</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  className={`p-6 rounded-2xl transition-all duration-500 border ${
                    theme.theme === 'light' 
                      ? 'bg-white border-gray-100 shadow-lg shadow-gray-200/40 hover:shadow-blue-500/10' 
                      : 'bg-gray-900 border-white/5 hover:bg-gray-800'
                  }`}
                  variants={itemVariants}
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      theme.theme === 'light' ? 'bg-blue-50 text-blue-600' : 'bg-blue-950 text-blue-400'
                    }`}>
                      <stat.Icon size={28} />
                    </div>
                    <div>
                      <div className={`text-3xl font-black tracking-tight leading-none mb-1 ${
                        theme.theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {stat.value}
                      </div>
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div className="lg:col-span-7 space-y-6 order-1 lg:order-2" variants={itemVariants}>
            <div className="space-y-4">
              <h3 className={`text-2xl sm:text-4xl font-bold leading-tight ${
                  theme.theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}
              >
                {aboutData.heading}
              </h3>
              <div className="space-y-6">
                {aboutData.paragraphs.map((para, i) => (
                  <p key={i} className={`text-lg sm:text-xl leading-relaxed font-medium ${
                      theme.theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-[0.4em] text-blue-600">Core Expertise</p>
              <div className="flex flex-wrap gap-3">
                {aboutData.highlights.map((highlight) => (
                  <motion.span 
                    key={highlight} 
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`px-6 py-3 rounded-2xl text-xs font-bold tracking-widest uppercase border transition-all ${
                      theme.theme === 'light'
                        ? 'bg-white border-gray-200 text-gray-700 shadow-sm hover:border-blue-600 hover:text-blue-600'
                        : 'bg-gray-900 border-white/10 text-gray-300 hover:border-blue-500 hover:text-blue-500'
                    }`}
                  >
                    {highlight}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Visual Callout - Compact */}
            <div className={`p-6 rounded-3xl border-2 border-dashed ${
              theme.theme === 'light' ? 'border-blue-100 bg-blue-50/30' : 'border-blue-900/30 bg-blue-900/5'
            }`}>
                <p className={`text-base font-bold italic ${
                  theme.theme === 'light' ? 'text-blue-900/70' : 'text-blue-400/70'
                }`}>
                  "{aboutData.missionStatement || "My mission is to translate complex problems into intuitive digital solutions that empower users and scale businesses."}"
                </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;