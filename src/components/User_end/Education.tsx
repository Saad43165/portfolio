import { useData } from '../../context/DataContext';
import { Calendar, MapPin, Award } from 'lucide-react';
import { useState, useEffect, useRef, useContext } from 'react';
import { motion, Variants } from 'framer-motion';
import { ThemeContext } from './PortfolioLayout';

const Education = () => {
  const { education } = useData();
  const theme = useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
      id="education"
      ref={sectionRef}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={`py-8 sm:py-16 transition-colors duration-500 relative overflow-hidden ${
        theme.theme === 'light' ? 'bg-gray-50/50' : 'bg-gray-900/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div className="mb-12" variants={itemVariants}>
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
            <div className="h-[2px] w-8 bg-purple-600 rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-600">Learning Path</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] text-center lg:text-left ${
              theme.theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}
          >
            Academic <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Foundation</span>
          </h2>
        </motion.div>

        {education.length > 0 ? (
          <div className={`grid gap-6 lg:gap-10 ${
            education.length === 1 ? 'max-w-4xl mx-auto grid-cols-1 w-full' : 'grid-cols-1 md:grid-cols-2'
          }`}>
            {education.map((edu, index) => (
              <motion.div 
                key={edu.id || index} 
                variants={itemVariants}
                whileHover={{ y: -3, scale: 1.005 }}
                className={`p-6 sm:p-8 rounded-3xl transition-all duration-500 border group flex flex-col relative overflow-hidden ${
                  theme.theme === 'light' 
                    ? 'bg-white border-purple-100 shadow-lg shadow-purple-500/5' 
                    : 'bg-gray-900 border-white/5 hover:border-purple-500/30 shadow-2xl'
                }`}
              >
                {/* Magical Academic Glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/5 blur-[80px] rounded-full -mr-24 -mt-24 group-hover:bg-purple-600/10 transition-all duration-700" />
                
                <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-8 relative z-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20">
                        <span className="text-[9px] font-black uppercase tracking-[0.1em] text-purple-600 dark:text-purple-400">
                          {new Date(edu.startDate).getFullYear()} — {edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present'}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className={`text-2xl sm:text-3xl font-black leading-tight tracking-tight transition-colors duration-300 ${
                      theme.theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      {edu.degree}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-gray-400">
                      <MapPin size={16} className="text-purple-500" />
                      <span className="tracking-tight">{edu.institution}</span>
                    </div>
                  </div>
                  
                  {edu.gpa && (
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className={`relative px-6 py-4 rounded-2xl border flex flex-col items-center justify-center shadow-xl ${
                        theme.theme === 'light' 
                          ? 'bg-gradient-to-br from-purple-50 to-white border-purple-100' 
                          : 'bg-gradient-to-br from-gray-800 to-gray-950 border-purple-500/20'
                      }`}
                    >
                      <span className="text-[8px] font-black text-purple-600 dark:text-purple-400 uppercase tracking-[0.2em] mb-1">GPA</span>
                      <span className={`text-2xl font-black ${theme.theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                        {edu.gpa}
                      </span>
                    </motion.div>
                  )}
                </div>

                <div className="space-y-6 flex-grow relative z-10">
                  <div className={`p-5 rounded-2xl border border-dashed ${
                    theme.theme === 'light' ? 'border-purple-100 bg-purple-50/30' : 'border-white/5 bg-white/5'
                  }`}>
                    <p className={`text-base font-medium leading-relaxed ${
                      theme.theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {edu.description}
                    </p>
                  </div>

                  {edu.achievements.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {edu.achievements.map((achievement, i) => (
                        <div key={i} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest border transition-all ${
                          theme.theme === 'light' 
                            ? 'bg-white border-gray-100 text-gray-500 hover:border-purple-400 hover:text-purple-600 shadow-sm' 
                            : 'bg-gray-800/80 border-white/10 text-gray-400 hover:border-purple-500 hover:text-purple-400'
                        }`}>
                          <Award size={12} className="text-purple-500" />
                          {achievement}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className={`text-center py-24 rounded-[3.5rem] border-2 border-dashed ${
            theme.theme === 'light' ? 'border-gray-100 bg-gray-50' : 'border-white/5 bg-gray-900'
          }`}>
            <p className="text-xl font-black text-gray-300 uppercase tracking-widest">Archiving Journey...</p>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default Education;