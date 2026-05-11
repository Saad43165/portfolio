import { useEffect, useRef, useState, useContext } from 'react';
import { useData } from '../../context/DataContext';
import { Code, Palette, Database, Smartphone, Zap, CheckCircle2, Cpu, Cloud, Terminal } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { ThemeContext } from './PortfolioLayout';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { skills } = useData();
  const theme = useContext(ThemeContext);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skillCategories = skills.reduce((acc, skill) => {
    const category = skill.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const getCategoryIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('frontend')) return Code;
    if (cat.includes('backend')) return Terminal;
    if (cat.includes('database')) return Database;
    if (cat.includes('mobile')) return Smartphone;
    if (cat.includes('design')) return Palette;
    if (cat.includes('devops') || cat.includes('cloud')) return Cloud;
    if (cat.includes('languages') || cat.includes('core')) return Cpu;
    return Zap;
  };

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
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.section
      id="skills"
      ref={sectionRef}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={`py-8 sm:py-16 transition-colors duration-500 relative overflow-hidden ${
        theme.theme === 'light' ? 'bg-white' : 'bg-gray-950'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div className="mb-10" variants={itemVariants}>
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
            <div className="h-[2px] w-12 bg-blue-600 rounded-full" />
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-blue-600">Technical Arsenal</span>
          </div>
          <h2 className={`text-4xl sm:text-6xl font-bold tracking-tight leading-[1.1] text-center lg:text-left ${
              theme.theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}
          >
            Empowering Vision <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Through Technology</span>
          </h2>
        </motion.div>

        {skills.length > 0 ? (
          <div className="space-y-6 sm:space-y-10">
            {Object.entries(skillCategories).map(([categoryName, categorySkills]) => {
              const Icon = getCategoryIcon(categoryName);
              return (
                <motion.div 
                  key={categoryName}
                  variants={itemVariants}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-lg relative group ${
                      theme.theme === 'light' 
                        ? 'bg-blue-50 border-blue-100/50 text-blue-600' 
                        : 'bg-gray-800 border-white/10 text-blue-400 shadow-blue-500/10'
                    }`}>
                      <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                      <Icon size={22} className="relative z-10" />
                    </div>
                    <h3 className={`text-2xl font-bold tracking-tight ${
                      theme.theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      {categoryName}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {categorySkills.map((skill) => (
                      <motion.div 
                        key={skill.id}
                        whileHover={{ y: -3, scale: 1.02 }}
                        className={`p-4 rounded-2xl border transition-all duration-500 group/skill relative overflow-hidden ${
                          theme.theme === 'light' 
                            ? 'bg-white border-gray-200 shadow-sm hover:shadow-md' 
                            : 'bg-gray-900 border-white/10 hover:border-blue-500/50 shadow-2xl'
                        }`}
                      >
                        {/* Interactive Hover Accent */}
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-600 to-purple-600 transform scale-y-0 group-hover/skill:scale-y-100 transition-transform duration-500" />
                        
                        <div className="flex justify-between items-center mb-4">
                          <span className={`font-bold text-base tracking-tight ${
                            theme.theme === 'light' ? 'text-gray-900' : 'text-white'
                          }`}>
                            {skill.name}
                          </span>
                          <span className="text-[9px] font-black text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                            {skill.level}%
                          </span>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={isVisible ? { width: `${skill.level}%` } : {}}
                              transition={{ duration: 1.5, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full"
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-[9px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                              <CheckCircle2 size={12} className="mr-1 text-blue-500" />
                              {skill.yearsOfExperience > 0 ? `${skill.yearsOfExperience}Y Mastery` : 'Expertise'}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className={`text-center py-24 rounded-[3.5rem] border-2 border-dashed ${
            theme.theme === 'light' ? 'border-gray-100 bg-gray-50' : 'border-white/5 bg-gray-900'
          }`}>
            <p className="text-xl font-black text-gray-300 uppercase tracking-widest">Synchronizing Arsenal...</p>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default Skills;