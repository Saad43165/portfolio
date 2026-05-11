import { useData } from '../../context/DataContext';
import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { useState, useEffect, useRef, useContext } from 'react';
import { ThemeContext } from './PortfolioLayout';

const Experience = () => {
  const { experiences } = useData();
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
      transition: { staggerChildren: 0.2 },
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
      id="experience"
      ref={sectionRef}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={`py-12 sm:py-16 transition-colors duration-500 relative overflow-hidden ${
        theme.theme === 'light' ? 'bg-white' : 'bg-gray-950'
      }`}
    >
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div className="mb-10" variants={itemVariants}>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-blue-600" />
            <span className="text-xs font-black uppercase tracking-[0.4em] text-blue-600">Career Path</span>
          </div>
          <h2 className={`text-4xl sm:text-6xl font-bold tracking-tight leading-[1.1] ${
              theme.theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}
          >
            Professional <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Trajectory</span>
          </h2>
        </motion.div>

        {experiences.length > 0 ? (
          <div className="relative space-y-12">
            {/* Timeline Center Line (Desktop) */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gray-100 dark:bg-gray-900 transform md:-translate-x-1/2 rounded-full"></div>

            {experiences.map((exp, index) => (
              <motion.div 
                key={exp.id || index} 
                variants={itemVariants}
                className={`relative flex flex-col md:flex-row items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Timeline Node */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-blue-600 rounded-full z-10 transform -translate-x-1/2 mt-12 shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                  <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-20" />
                </div>

                <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                  <div className={`p-6 sm:p-8 rounded-2xl transition-all duration-500 border group ${
                    theme.theme === 'light' 
                      ? 'bg-white border-gray-100 shadow-lg shadow-gray-200/30 hover:shadow-blue-500/10' 
                      : 'bg-gray-900/50 backdrop-blur-xl border-white/5 hover:bg-gray-800/80'
                  }`}>
                    <div className="flex flex-col mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Calendar size={14} className="text-blue-600" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
                          {new Date(exp.startDate).getFullYear()} — {exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}
                        </span>
                      </div>
                      
                      <h3 className={`text-2xl sm:text-3xl font-bold transition-colors duration-300 ${
                        theme.theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {exp.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 mt-2 text-sm font-bold text-gray-500 dark:text-gray-400">
                        <MapPin size={14} />
                        {exp.company}
                      </div>
                    </div>

                    <p className={`leading-relaxed mb-8 text-base font-medium ${
                      theme.theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {exp.description}
                    </p>

                    {exp.achievements.length > 0 && (
                      <div className="space-y-3 mb-8">
                        {exp.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="mt-1 flex-shrink-0">
                              <CheckCircle2 size={16} className="text-green-500" />
                            </div>
                            <span className={`text-sm font-medium ${
                              theme.theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                            }`}>
                              {achievement}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl border ${
                          theme.theme === 'light' 
                            ? 'bg-gray-50 border-gray-100 text-gray-500' 
                            : 'bg-gray-800 border-white/5 text-gray-400'
                        }`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className={`text-center py-24 rounded-[3.5rem] border-2 border-dashed ${
            theme.theme === 'light' ? 'border-gray-100 bg-gray-50' : 'border-white/5 bg-gray-900'
          }`}>
            <p className="text-xl font-black text-gray-300 uppercase tracking-widest">Assembling History...</p>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default Experience;