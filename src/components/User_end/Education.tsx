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
        <motion.div className="mb-6 sm:mb-10" variants={itemVariants}>
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
            <div className="h-[2px] w-12 bg-purple-600 rounded-full" />
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-purple-600">Learning Path</span>
          </div>
          <h2 className={`text-4xl sm:text-6xl font-bold tracking-tight leading-[1.1] text-center lg:text-left ${
              theme.theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}
          >
            Academic <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Foundation</span>
          </h2>
        </motion.div>

        {education.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {education.map((edu, index) => (
              <motion.div 
                key={edu.id || index} 
                variants={itemVariants}
                whileHover={{ y: -3 }}
                className={`p-6 sm:p-8 rounded-2xl transition-all duration-500 border group flex flex-col relative overflow-hidden ${
                  theme.theme === 'light' 
                    ? 'bg-white border-gray-200 shadow-sm hover:shadow-md' 
                    : 'bg-gray-900 border-white/10 hover:border-purple-500/50 shadow-2xl'
                }`}
              >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[60px] rounded-full -mr-16 -mt-16 group-hover:bg-purple-500/10 transition-all duration-700" />
                
                <div className="flex flex-col sm:flex-row justify-between items-start gap-8 mb-12 relative z-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-500/10">
                        <Calendar size={14} className="text-purple-600 dark:text-purple-400" />
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400">
                        {new Date(edu.startDate).getFullYear()} — {edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present'}
                      </span>
                    </div>
                    
                    <h3 className={`text-2xl sm:text-3xl font-bold leading-[1.2] transition-colors duration-300 ${
                      theme.theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      {edu.degree}
                    </h3>
                    
                    <div className="flex items-center gap-3 text-sm font-bold text-gray-500 dark:text-gray-400">
                      <div className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <MapPin size={12} />
                      </div>
                      {edu.institution}
                    </div>
                  </div>
                  
                  {edu.gpa && (
                    <div className={`px-5 py-3 rounded-2xl border flex flex-col items-center justify-center shadow-md ${
                      theme.theme === 'light' ? 'bg-purple-50/50 border-purple-100' : 'bg-gray-800 border-purple-500/20'
                    }`}>
                      <span className="text-[8px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">GPA</span>
                      <span className={`text-xl font-bold ${theme.theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                        {edu.gpa}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-8 flex-grow relative z-10">
                  <p className={`text-lg font-medium leading-relaxed ${
                    theme.theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {edu.description}
                  </p>

                  {edu.achievements.length > 0 && (
                    <div className="flex flex-wrap gap-3 pt-8 border-t border-gray-100 dark:border-white/10">
                      {edu.achievements.map((achievement, i) => (
                        <div key={i} className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                          theme.theme === 'light' 
                            ? 'bg-gray-50 border-gray-100 text-gray-500 hover:border-purple-200 hover:text-purple-600' 
                            : 'bg-gray-800/50 border-white/5 text-gray-400 hover:border-purple-500/30 hover:text-purple-400'
                        }`}>
                          <Award size={14} className="text-purple-500" />
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