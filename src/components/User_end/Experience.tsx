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
      className={`py-8 sm:py-16 transition-colors duration-500 relative overflow-hidden ${
        theme.theme === 'light' ? 'bg-white' : 'bg-gray-950'
      }`}
    >
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div className="mb-12" variants={itemVariants}>
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
            <div className="h-[2px] w-8 bg-blue-600 rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Professional Journey</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] text-center lg:text-left ${
              theme.theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}
          >
            Career <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Trajectory</span>
          </h2>
        </motion.div>

        {experiences.length > 0 ? (
        <div className="relative">
          {/* Magical Timeline Path */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2.5px] bg-gradient-to-b from-blue-600 via-indigo-500 to-blue-600 opacity-20 hidden md:block" />
          
          <div className="space-y-12 sm:space-y-24 relative">
            {experiences.map((exp, index) => (
              <motion.div 
                key={exp.id || index} 
                variants={itemVariants}
                className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Magical Trajectory Node */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-blue-600 rounded-full z-20 transform -translate-x-1/2 shadow-[0_0_20px_rgba(37,99,235,0.6)] border-4 border-white dark:border-gray-950 transition-transform duration-500 hover:scale-125">
                  <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-30" />
                </div>

                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <motion.div 
                    whileHover={{ rotateY: index % 2 === 0 ? 2 : -2, scale: 1.005 }}
                    className={`p-5 sm:p-6 rounded-2xl transition-all duration-700 border group relative overflow-hidden ${
                      theme.theme === 'light' 
                        ? 'bg-white border-blue-50 shadow-lg shadow-blue-500/5' 
                        : 'bg-gray-900/40 backdrop-blur-2xl border-white/5 hover:border-blue-500/20 shadow-xl'
                    }`}
                  >
                    {/* Aurora Background Accent */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/5 blur-[80px] rounded-full -mr-24 -mt-24 group-hover:bg-blue-600/10 transition-all duration-700" />
                    
                    <div className="flex flex-col mb-5 relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20">
                          <span className="text-[8px] font-black uppercase tracking-[0.1em] text-blue-600 dark:text-blue-400">
                            {new Date(exp.startDate).getFullYear()} — {exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}
                          </span>
                        </div>
                        <div className="h-[1px] w-6 bg-blue-200 dark:bg-white/10" />
                        <div className="flex items-center gap-2 text-[8px] font-bold text-gray-400 uppercase tracking-widest">
                          {exp.company}
                        </div>
                      </div>
                      
                      <h3 className={`text-xl sm:text-2xl font-black tracking-tight leading-[1.2] transition-colors duration-300 ${
                        theme.theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {exp.title}
                      </h3>
                    </div>

                    <div className={`p-5 rounded-2xl border border-dashed mb-8 relative z-10 ${
                      theme.theme === 'light' ? 'border-blue-100 bg-blue-50/30' : 'border-white/5 bg-white/5'
                    }`}>
                      <p className={`text-base font-medium leading-relaxed ${
                        theme.theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {exp.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 relative z-10">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className={`px-4 py-2 text-[9px] font-black uppercase tracking-[0.1em] rounded-xl border transition-all ${
                          theme.theme === 'light' 
                            ? 'bg-white border-blue-100 text-blue-600 shadow-sm' 
                            : 'bg-gray-800/80 border-white/10 text-gray-300 hover:border-blue-500/40'
                        }`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
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