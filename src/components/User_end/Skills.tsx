import { useEffect, useRef, useState, useContext } from 'react';
import { useData } from '../../context/DataContext';
import { Code, Palette, Database, Smartphone, Zap, CheckCircle2, Cpu, Cloud, Terminal } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { ThemeContext } from './PortfolioLayout';

const SkillCard = ({ skill, index, theme, isVisible, getSkillVariants }: {
  skill: any;
  index: number;
  theme: { theme: string; toggleTheme: () => void };
  isVisible: boolean;
  getSkillVariants: (idx: number) => any;
}) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [gloss, setGloss] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = () => {
    setHovered(true);
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current && cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
    if (!rectRef.current) return;
    
    const width = rectRef.current.width;
    const height = rectRef.current.height;
    const mouseX = e.clientX - rectRef.current.left;
    const mouseY = e.clientY - rectRef.current.top;

    setCoords({ x: mouseX, y: mouseY });
    setRotate({
      x: ((mouseY / height) - 0.5) * -10,
      y: ((mouseX / width) - 0.5) * 10
    });
    setGloss({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100
    });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    rectRef.current = null;
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div 
      ref={cardRef}
      variants={getSkillVariants(index)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: hovered 
          ? `perspective(800px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translate3d(0, -4px, 0)` 
          : `perspective(800px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)`,
        transition: hovered ? 'none' : 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
      }}
      className={`p-4 rounded-xl border transition-all duration-500 group/skill relative overflow-hidden card-gpu-accelerate cursor-pointer ${
        theme.theme === 'light' 
          ? 'bg-white border-gray-100 shadow-lg shadow-blue-500/5' 
          : 'bg-gray-900 border-white/5 hover:border-blue-500/30 shadow-2xl'
      }`}
    >
      {/* Dynamic Hover Glow */}
      {hovered && (
        <div 
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, rgba(59, 130, 246, 0.12), transparent 80%)`
          }}
        />
      )}

      {/* Gloss Reflection Overlay */}
      {hovered && (
        <div 
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 opacity-20 mix-blend-color-dodge"
          style={{
            background: `radial-gradient(circle at ${gloss.x}% ${gloss.y}%, rgba(255, 255, 255, 0.45) 0%, transparent 60%)`
          }}
        />
      )}
      
      {/* Interactive Aurora Glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 blur-[40px] rounded-full -mr-12 -mt-12 group-hover/skill:bg-blue-600/10 transition-all duration-700 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-3">
          <span className={`font-bold text-sm tracking-tight ${
            theme.theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            {skill.name}
          </span>
          <span className="text-[8px] font-black text-blue-600 bg-blue-500/10 px-1.5 py-0.5 rounded-full border border-blue-500/20">
            {skill.level}%
          </span>
        </div>
        
        <div className="space-y-4">
          <div className="w-full bg-gray-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden relative">
            <motion.div 
              initial={{ width: 0 }}
              animate={isVisible ? { width: `${skill.level}%` } : {}}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-[9px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
              <CheckCircle2 size={12} className="mr-1.5 text-blue-500" />
              {skill.yearsOfExperience > 0 ? `${skill.yearsOfExperience}Y Mastery` : 'Expertise'}
            </div>
            <Zap size={10} className="text-blue-500 opacity-0 group-hover/skill:opacity-100 transition-opacity" />
          </div>
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

  const getSkillVariants = (index: number): Variants => {
    const directions = [
      { x: -30, y: 0 }, // From Left
      { x: 30, y: 0 },  // From Right
      { x: 0, y: -30 }, // From Top
      { x: 0, y: 30 },  // From Bottom
    ];
    const { x, y } = directions[index % directions.length];
    
    return {
      hidden: { opacity: 0, x, y, scale: 0.95 },
      visible: { 
        opacity: 1, 
        x: 0, 
        y: 0, 
        scale: 1,
        transition: { 
          duration: 0.6, 
          ease: [0.22, 1, 0.36, 1],
          delay: (index % 4) * 0.1
        }
      }
    };
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
        <motion.div className="mb-12" variants={itemVariants}>
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
            <div className="h-[2px] w-8 bg-blue-600 rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Technical Arsenal</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] text-center lg:text-left ${
              theme.theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}
          >
            Empowering Vision <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Through Technology</span>
          </h2>
        </motion.div>

        {skills.length > 0 ? (
          <div className="space-y-12 sm:space-y-16">
            {Object.entries(skillCategories).map(([categoryName, categorySkills]) => {
              const Icon = getCategoryIcon(categoryName);
              return (
                <motion.div 
                  key={categoryName}
                  variants={itemVariants}
                  className="space-y-6"
                >
                  {/* Architectural Category Header */}
                  <div className="flex items-center gap-5">
                    <div className={`w-12 h-12 rounded-[1.25rem] flex items-center justify-center border shadow-xl relative group overflow-hidden transition-all duration-500 ${
                      theme.theme === 'light' 
                        ? 'bg-white border-blue-100 text-blue-600' 
                        : 'bg-gray-900 border-white/5 text-blue-400'
                    }`}>
                      <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-blue-600/20 transition-colors" />
                      <Icon size={20} className="relative z-10" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-600 opacity-70">Expertise Area</span>
                      <h3 className={`text-2xl font-black tracking-tight ${
                        theme.theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {categoryName}
                      </h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {categorySkills.map((skill, index) => (
                      <SkillCard
                        key={skill.id}
                        skill={skill}
                        index={index}
                        theme={theme}
                        isVisible={isVisible}
                        getSkillVariants={getSkillVariants}
                      />
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