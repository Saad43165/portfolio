import { useData } from '../../context/DataContext';
import { Calendar, MapPin, Briefcase } from 'lucide-react';
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

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
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
      className={`py-20 sm:py-32 transition-colors duration-500 relative overflow-hidden ${
        theme.theme === 'light' ? 'bg-[#f8fafc]' : 'bg-[#020617]'
      }`}
    >
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[140px] translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
        <motion.div className="max-w-3xl mb-16 lg:mb-24" variants={itemVariants}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[2px] w-12 bg-blue-600 rounded-full" />
            <span className="text-[12px] font-black uppercase tracking-[0.4em] text-blue-600">The Path to Excellence</span>
          </div>
          <h2 className={`text-4xl sm:text-6xl font-black tracking-tighter leading-[0.9] mb-8 ${
              theme.theme === 'light' ? 'text-gray-950' : 'text-white'
            }`}
          >
            Career <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">Trajectory</span>
          </h2>
          <p className={`text-lg font-medium leading-relaxed max-w-xl ${
            theme.theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            A timeline of professional growth, technical mastery, and impactful digital solutions across various industries.
          </p>
        </motion.div>

        {experiences.length > 0 ? (
        <div className="relative">
          {/* Enhanced Vertical Path */}
          <div className="absolute left-0 sm:left-10 top-2 bottom-2 w-[2px] bg-gradient-to-b from-blue-600/40 via-purple-500/40 to-indigo-600/40" />
          
          <div className="space-y-12 sm:space-y-20 relative">
            {experiences.map((exp, index) => (
              <motion.div 
                key={exp.id || index} 
                variants={itemVariants}
                className="relative pl-8 sm:pl-24"
              >
                {/* Visual Trajectory Node */}
                <div className="absolute left-[-5px] sm:left-[35px] top-4 w-3 h-3 bg-white border-2 border-blue-600 rounded-full z-20 shadow-[0_0_15px_rgba(37,99,235,0.4)]" />
                
                <div className={`group relative p-6 sm:p-10 rounded-[2.5rem] border transition-all duration-700 ${
                  theme.theme === 'light' 
                    ? 'bg-white border-gray-100 shadow-xl shadow-blue-500/5 hover:border-blue-200' 
                    : 'bg-white/5 border-white/5 backdrop-blur-3xl hover:border-blue-500/20'
                }`}>
                  {/* Decorative Gradient Accent */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full -mr-32 -mt-32 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 relative z-10">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-4">
                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                          theme.theme === 'light' 
                            ? 'bg-blue-50 border-blue-100 text-blue-600' 
                            : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                        }`}>
                          {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                        </div>
                        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100/50 dark:bg-white/5 border border-transparent dark:border-white/5">
                           <MapPin size={12} className="text-blue-500" />
                           <span className={`text-[10px] font-bold uppercase tracking-widest ${
                             theme.theme === 'light' ? 'text-gray-800' : 'text-gray-300'
                           }`}>
                             {exp.location}
                           </span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className={`text-2xl sm:text-3xl font-black tracking-tight leading-tight ${
                          theme.theme === 'light' ? 'text-gray-950' : 'text-white'
                        }`}>
                          {exp.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Briefcase size={16} className="text-blue-500" />
                          <span className={`text-base font-bold tracking-wide ${
                            theme.theme === 'light' ? 'text-blue-700' : 'text-blue-400'
                          }`}>
                            {exp.company}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:max-w-md">
                       <p className={`text-base font-medium leading-relaxed mb-6 ${
                         theme.theme === 'light' ? 'text-gray-700' : 'text-gray-400'
                       }`}>
                         {exp.description}
                       </p>
                       
                       <div className="flex flex-wrap gap-2">
                         {exp.technologies.map((tech) => (
                           <span key={tech} className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.1em] rounded-lg border transition-all ${
                             theme.theme === 'light' 
                               ? 'bg-gray-50 border-gray-200 text-gray-700' 
                               : 'bg-white/5 border-white/5 text-gray-400 hover:border-blue-500/40 hover:text-white'
                           }`}>
                             {tech}
                           </span>
                         ))}
                       </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        ) : (
          <div className={`text-center py-24 rounded-[3.5rem] border-2 border-dashed ${
            theme.theme === 'light' ? 'border-gray-200 bg-gray-50' : 'border-white/5 bg-gray-900'
          }`}>
            <p className="text-xl font-black text-gray-300 uppercase tracking-widest">Architecting History...</p>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default Experience;