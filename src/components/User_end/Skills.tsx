import { useEffect, useRef, useState, useContext } from 'react';
import { useData } from '../../context/DataContext';
import { Code, Palette, Database, Smartphone, Zap, CheckCircle2, Cpu, Cloud, Terminal } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { ThemeContext } from './PortfolioLayout';

const SkillCard = ({ skill, index, theme, isVisible }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`p-5 sm:p-6 rounded-3xl border transition-all duration-300 group ${
        theme.theme === 'light' 
          ? 'bg-white border-gray-100 shadow-xl shadow-blue-500/5 hover:border-blue-200 hover:shadow-blue-500/10' 
          : 'bg-[#0f172a]/50 border-white/5 hover:border-blue-500/30 hover:bg-[#1e293b]/50 shadow-2xl'
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <span className={`font-black text-base tracking-tight ${
          theme.theme === 'light' ? 'text-gray-900' : 'text-white'
        }`}>
          {skill.name}
        </span>
        <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-full border border-blue-100 dark:border-blue-800/50">
          {skill.level}%
        </span>
      </div>
      
      <div className="space-y-4">
        <div className="w-full bg-gray-100 dark:bg-gray-800 h-2.5 rounded-full overflow-hidden relative">
          <motion.div 
            initial={{ width: 0 }}
            animate={isVisible ? { width: `${skill.level}%` } : {}}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
            <CheckCircle2 size={14} className="mr-1.5 text-blue-500" />
            {skill.yearsOfExperience > 0 ? `${skill.yearsOfExperience}Y Experience` : 'Expertise'}
          </div>
          <Zap size={14} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </motion.div>
  );
};

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
      { threshold: 0.1 }
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

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.section
      id="skills"
      ref={sectionRef}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
      }}
      className={`py-16 sm:py-24 transition-colors duration-500 relative overflow-hidden ${
        theme.theme === 'light' ? 'bg-zinc-50/50' : 'bg-transparent'
      }`}
    >
      {/* Dynamic Background Elements - Emerald Theme */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[130px] translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div className="mb-16 text-center lg:text-left" variants={itemVariants}>
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
            <div className="h-[2px] w-8 bg-blue-600 rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Technical Arsenal</span>
            <div className="h-[2px] w-8 bg-blue-600 rounded-full lg:hidden" />
          </div>
          <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none ${
              theme.theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}
          >
            Core <br className="hidden sm:block lg:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Competencies</span>
          </h2>
        </motion.div>

        {skills.length > 0 ? (
          <div className="space-y-16 sm:space-y-20">
            {Object.entries(skillCategories).map(([categoryName, categorySkills]) => {
              const Icon = getCategoryIcon(categoryName);
              return (
                <motion.div key={categoryName} variants={itemVariants} className="space-y-8">
                  {/* Category Header */}
                  <div className="flex items-center gap-4 border-b pb-4 border-gray-200 dark:border-gray-800">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm ${
                      theme.theme === 'light' 
                        ? 'bg-blue-50 border-blue-100 text-blue-600' 
                        : 'bg-blue-900/20 border-blue-800/50 text-blue-400'
                    }`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className={`text-2xl font-black tracking-tight ${
                        theme.theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {categoryName}
                      </h3>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                        {categorySkills.length} Technologies
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {categorySkills.map((skill, index) => (
                      <SkillCard
                        key={skill.id}
                        skill={skill}
                        index={index}
                        theme={theme}
                        isVisible={isVisible}
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <Code size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-lg font-bold text-gray-400">Skills loading...</p>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default Skills;