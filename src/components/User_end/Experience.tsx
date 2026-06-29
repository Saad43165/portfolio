import { useData } from '../../context/DataContext';
import { Briefcase, MapPin, Calendar, ArrowRight } from 'lucide-react';
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
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.section
      id="experience"
      ref={sectionRef}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={`py-16 sm:py-24 transition-colors duration-500 relative overflow-hidden ${
        theme.theme === 'light' ? 'bg-[#fefaf7]/50' : 'bg-transparent'
      }`}
    >
      {/* Dynamic Background Elements - Amber Theme */}
      <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] translate-x-1/4 -translate-y-1/4 pointer-events-none ${
        theme.theme === 'light' ? 'bg-amber-400/20' : 'bg-amber-500/5'
      }`} />
      <div className={`absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full blur-[100px] -translate-x-1/3 pointer-events-none ${
        theme.theme === 'light' ? 'bg-orange-500/20' : 'bg-orange-600/5'
      }`} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div className="mb-16 text-center lg:text-left" variants={itemVariants}>
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
            <div className="h-[2px] w-8 bg-blue-600 rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Professional Journey</span>
            <div className="h-[2px] w-8 bg-blue-600 rounded-full lg:hidden" />
          </div>
          <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none ${
              theme.theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}
          >
            My <br className="hidden sm:block lg:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Experience</span>
          </h2>
        </motion.div>

        {experiences.length > 0 ? (
          <div className="space-y-12 relative">
            {/* Minimal Line */}
            <div className="hidden lg:block absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-blue-600/50 via-blue-600/20 to-transparent" />

            {experiences.map((exp, index) => {
              const isCurrent = !exp.endDate;
              return (
                <motion.div 
                  key={exp.id || index} 
                  variants={itemVariants}
                  className="relative lg:pl-20 group"
                >
                  {/* Timeline Dot */}
                  <div className={`hidden lg:flex absolute left-[27px] top-8 w-3.5 h-3.5 rounded-full border-[3px] transition-colors z-10 ${
                    isCurrent 
                      ? 'bg-white border-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]' 
                      : theme.theme === 'light' ? 'bg-white border-gray-300' : 'bg-gray-900 border-gray-700'
                  }`} />

                  <div className={`relative p-6 sm:p-8 rounded-3xl border transition-all duration-300 overflow-hidden group ${
                    theme.theme === 'light' 
                      ? 'bg-white border-gray-100 shadow-xl shadow-blue-500/5 hover:border-blue-200' 
                      : 'bg-[#0f172a]/50 border-white/5 shadow-2xl hover:border-blue-500/30'
                  }`}>
                    {/* Background Watermark Icon */}
                    <div className={`absolute -right-10 -bottom-10 transition-opacity duration-500 pointer-events-none ${
                      theme.theme === 'light' ? 'text-blue-600 opacity-[0.04] group-hover:opacity-[0.08]' : 'text-blue-200 opacity-[0.02] group-hover:opacity-[0.05]'
                    }`}>
                      <Briefcase size={200} />
                    </div>

                    <div className="relative z-10 flex flex-col lg:flex-row gap-6 lg:gap-10">
                      
                      {/* Left: Meta Info */}
                      <div className="flex flex-col gap-3 lg:w-64 flex-shrink-0">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-blue-500" />
                          <span className={`text-sm font-bold uppercase tracking-widest ${
                            theme.theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-gray-400" />
                          <span className={`text-sm font-semibold ${
                            theme.theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                          }`}>
                            {exp.location}
                          </span>
                        </div>
                        {isCurrent && (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest w-fit mt-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                            Present
                          </div>
                        )}
                      </div>

                      {/* Right: Content */}
                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className={`text-2xl sm:text-3xl font-black tracking-tight mb-2 ${
                            theme.theme === 'light' ? 'text-gray-900' : 'text-white'
                          }`}>
                            {exp.title}
                          </h3>
                          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-lg">
                            <Briefcase size={18} />
                            {exp.company}
                          </div>
                        </div>

                        <p className={`text-base leading-relaxed ${
                          theme.theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                        }`}>
                          {exp.description}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {exp.technologies.map((tech: string) => (
                            <span key={tech} className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${
                              theme.theme === 'light' 
                                ? 'bg-gray-50 border-gray-200 text-gray-700' 
                                : 'bg-white/5 border-white/5 text-gray-300'
                            }`}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <Briefcase size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-lg font-bold text-gray-400">Experience loading...</p>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default Experience;