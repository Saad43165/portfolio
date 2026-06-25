import { useEffect, useRef, useState, useContext } from 'react';
import { useData } from '../../context/DataContext';
import { ExternalLink, Github, Zap, Shield, Smartphone, Globe, X, Play, Code as CodeIcon, Cpu, Layers, Calendar, User } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ThemeContext } from './PortfolioLayout';

const ProjectCard = ({ 
  project, 
  index, 
  theme, 
  itemVariants, 
  getProjectIcon, 
  handleViewVideo, 
  setSelectedProject, 
  setDetailModalOpen 
}: {
  project: any;
  index: number;
  theme: any;
  itemVariants: any;
  getProjectIcon: (cat: string) => any;
  handleViewVideo: (url: string) => void;
  setSelectedProject: (proj: any) => void;
  setDetailModalOpen: (open: boolean) => void;
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
      x: ((mouseY / height) - 0.5) * -12,
      y: ((mouseX / width) - 0.5) * 12
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

  const ProjectIcon = getProjectIcon(project.category);
  const isMobileApp = 
    project.category.toLowerCase().includes('mobile') || 
    ['project-signbridge', 'project-agriguard', 'project-vaxguard', 'project-runquest', 'project-naheed'].includes(project.id);

  return (
    <motion.div
      ref={cardRef}
      layout
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: hovered 
          ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translate3d(0, -6px, 0)` 
          : `perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)`,
        transition: hovered ? 'none' : 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
      }}
      className={`group relative rounded-2xl p-5 transition-all duration-700 border flex flex-col h-full overflow-hidden card-gpu-accelerate cursor-pointer ${
        theme.theme === 'light'
          ? 'bg-white border-gray-200 shadow-sm hover:shadow-md'
          : 'bg-gray-900 border-white/10 hover:border-blue-500/30 shadow-2xl'
      }`}
    >
      {/* Dynamic Hover Glow */}
      {hovered && (
        <div 
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(250px circle at ${coords.x}px ${coords.y}px, rgba(59, 130, 246, 0.12), transparent 80%)`
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
      
      <div className="relative z-10 flex flex-col h-full pointer-events-auto">
        {/* Media Container */}
        <div className={`relative rounded-[2rem] overflow-hidden mb-8 transition-all duration-700 ${
          isMobileApp ? 'aspect-[9/16] max-w-[240px] mx-auto border-[6px] border-gray-900 shadow-2xl' : 'aspect-video'
        }`}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4 z-20">
            {project.videoUrl && (
              <motion.button 
                whileHover={{ scale: 1.1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewVideo(project.videoUrl!);
                }}
                className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white cursor-pointer"
              >
                <Play size={24} fill="currentColor" />
              </motion.button>
            )}
            {project.githubUrl && (
              <motion.a 
                whileHover={{ scale: 1.1 }}
                href={project.githubUrl}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white cursor-pointer"
              >
                <Github size={24} />
              </motion.a>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-3 rounded-xl ${
              theme.theme === 'light' ? 'bg-blue-50 text-blue-600' : 'bg-blue-900/30 text-blue-400'
            }`}>
              <ProjectIcon size={20} />
            </div>
            <h3 className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
              theme.theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              {project.title}
            </h3>
          </div>

          <p className={`text-base font-medium leading-relaxed mb-8 line-clamp-3 group-hover:line-clamp-none transition-all duration-500 ${
            theme.theme === 'light' ? 'text-gray-500' : 'text-gray-400'
          }`}>
            {project.description}
          </p>

          <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5 space-y-6">
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map((tech: string) => (
                <span key={tech} className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-xl border ${
                  theme.theme === 'light' ? 'bg-gray-50 border-gray-100 text-gray-500' : 'bg-gray-800 border-white/5 text-gray-400'
                }`}>
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${project.status === 'completed' ? 'bg-green-500' : 'bg-blue-500 animate-pulse'}`} />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{project.status}</span>
              </div>
              <motion.button 
                whileHover={{ x: 5 }}
                onClick={() => {
                  setSelectedProject(project);
                  setDetailModalOpen(true);
                }}
                className="flex items-center gap-2 text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest cursor-pointer hover:underline z-20"
              >
                Details <ExternalLink size={14} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { projects } = useData();
  const theme = useContext(ThemeContext);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const categories = ['All', ...new Set(projects.map(p => p.category))];
  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

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

  const getProjectIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('mobile')) return Smartphone;
    if (cat.includes('web') || cat.includes('full stack')) return Globe;
    if (cat.includes('frontend')) return Zap;
    if (cat.includes('backend') || cat.includes('api')) return Shield;
    return CodeIcon;
  };

  const handleViewVideo = (videoUrl: string) => {
    setSelectedVideoUrl(videoUrl);
    setVideoModalOpen(true);
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
      id="projects"
      ref={sectionRef}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={`py-8 sm:py-16 transition-colors duration-500 relative overflow-hidden ${
        theme.theme === 'light' ? 'bg-gray-50/50' : 'bg-gray-950'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div className="mb-12" variants={itemVariants}>
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
            <div className="h-[2px] w-8 bg-blue-600 rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Selected Works</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] text-center lg:text-left ${
              theme.theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}
          >
            Digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Masterpieces</span>
          </h2>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mt-8">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all duration-300 border ${
                  activeCategory === cat 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20' 
                    : theme.theme === 'light'
                      ? 'bg-white border-gray-100 text-gray-500 hover:border-gray-200 shadow-sm'
                      : 'bg-gray-900 border-white/5 text-gray-400 hover:border-white/10'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {filteredProjects.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id || index}
                  project={project}
                  index={index}
                  theme={theme}
                  itemVariants={itemVariants}
                  getProjectIcon={getProjectIcon}
                  handleViewVideo={handleViewVideo}
                  setSelectedProject={setSelectedProject}
                  setDetailModalOpen={setDetailModalOpen}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className={`text-center py-24 rounded-[3.5rem] border-2 border-dashed ${
            theme.theme === 'light' ? 'border-gray-100 bg-gray-50' : 'border-white/5 bg-gray-900'
          }`}>
            <CodeIcon size={48} className="mx-auto text-gray-300 mb-6" />
            <p className="text-xl font-black text-gray-300 uppercase tracking-widest">Assembling Portfolio...</p>
          </div>
        )}

        {/* Video Modal */}
        <AnimatePresence>
          {videoModalOpen && selectedVideoUrl && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gray-950/90 backdrop-blur-xl" 
                onClick={() => setVideoModalOpen(false)}
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-5xl aspect-video bg-black rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10"
              >
                <button
                  onClick={() => setVideoModalOpen(false)}
                  className="absolute top-6 right-6 z-50 p-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl backdrop-blur-md transition-colors"
                >
                  <X size={24} />
                </button>
                <video src={selectedVideoUrl} className="w-full h-full object-contain" controls autoPlay />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Project Details Modal */}
        <AnimatePresence>
          {detailModalOpen && selectedProject && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-gray-950/80 backdrop-blur-md" 
                onClick={() => setDetailModalOpen(false)}
              />
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className={`relative w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border my-8 flex flex-col ${
                  theme.theme === 'light' 
                    ? 'bg-white border-gray-200 text-gray-900' 
                    : 'bg-gray-900 border-white/10 text-white'
                }`}
                style={{ maxHeight: 'calc(100vh - 3rem)' }}
              >
                {/* Header/Close Button */}
                <button
                  onClick={() => setDetailModalOpen(false)}
                  className={`absolute top-4 right-4 z-50 p-2.5 rounded-xl border backdrop-blur-md transition-all ${
                    theme.theme === 'light'
                      ? 'bg-white/80 border-gray-200 text-gray-700 hover:bg-gray-100'
                      : 'bg-gray-800/80 border-white/10 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <X size={18} />
                </button>

                <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
                  {/* Hero Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    {/* Media */}
                    <div className={`md:col-span-5 relative rounded-2xl overflow-hidden border ${
                      theme.theme === 'light' ? 'border-gray-200 bg-gray-50' : 'border-white/10 bg-gray-950'
                    } ${
                      (selectedProject.category.toLowerCase().includes('mobile') ||
                       ['project-signbridge', 'project-agriguard', 'project-vaxguard', 'project-runquest', 'project-naheed'].includes(selectedProject.id)) 
                        ? 'aspect-[9/16] max-w-[220px] mx-auto' 
                        : 'aspect-video w-full'
                    }`}>
                      <img 
                        src={selectedProject.image} 
                        alt={selectedProject.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Meta info */}
                    <div className="md:col-span-7 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-600/20">
                          {selectedProject.category}
                        </span>
                        <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg border ${
                          selectedProject.status === 'completed' 
                            ? 'bg-green-600/10 text-green-600 dark:text-green-400 border-green-600/20' 
                            : 'bg-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-600/20'
                        }`}>
                          {selectedProject.status}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                        {selectedProject.title}
                      </h3>

                      {selectedProject.role && (
                        <div className="flex items-center gap-2 text-sm font-semibold">
                          <User size={16} className="text-blue-600 dark:text-blue-400" />
                          <span className={theme.theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>
                            Role: <span className="font-bold">{selectedProject.role}</span>
                          </span>
                        </div>
                      )}

                      {selectedProject.platforms && selectedProject.platforms.length > 0 && (
                        <div className="flex items-center gap-2 text-sm font-semibold">
                          <Layers size={16} className="text-blue-600 dark:text-blue-400" />
                          <span className={theme.theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>
                            Platforms: <span className="font-bold">{selectedProject.platforms.join(', ')}</span>
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <Calendar size={16} className="text-blue-600 dark:text-blue-400" />
                        <span className={theme.theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>
                          Timeline: <span className="font-bold">{selectedProject.startDate} {selectedProject.endDate ? `to ${selectedProject.endDate}` : ''}</span>
                        </span>
                      </div>

                      {/* External Links */}
                      <div className="flex flex-wrap gap-3 pt-2">
                        {selectedProject.githubUrl && (
                          <a 
                            href={selectedProject.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4.5 py-2 rounded-xl text-xs font-black uppercase tracking-widest border transition-colors bg-black border-black text-white hover:bg-gray-900"
                          >
                            <Github size={14} /> View Code
                          </a>
                        )}
                        {selectedProject.liveUrl && (
                          <a 
                            href={selectedProject.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4.5 py-2 rounded-xl text-xs font-black uppercase tracking-widest border transition-colors bg-blue-600 border-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/10"
                          >
                            <Globe size={14} /> Live Project
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className={`h-[1px] w-full ${theme.theme === 'light' ? 'bg-gray-100' : 'bg-white/5'}`} />

                  {/* Tabs/Sections */}
                  <div className="space-y-6">
                    {/* Long description */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">Project Overview</h4>
                      <p className={`text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium ${
                        theme.theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                      }`}>
                        {selectedProject.longDescription || selectedProject.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">Key Features</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedProject.features.map((feature: string, i: number) => (
                          <div 
                            key={i} 
                            className={`flex items-start gap-2.5 p-3 rounded-xl border ${
                              theme.theme === 'light' 
                                ? 'bg-gray-50 border-gray-100 text-gray-700' 
                                : 'bg-gray-800/40 border-white/5 text-gray-300'
                            }`}
                          >
                            <div className="h-5 w-5 rounded-md bg-blue-600/10 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5">
                              <Zap size={12} fill="currentColor" />
                            </div>
                            <span className="text-xs font-semibold leading-normal">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech: string) => (
                          <span 
                            key={tech} 
                            className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-lg border ${
                              theme.theme === 'light' 
                                ? 'bg-gray-50 border-gray-100 text-gray-600' 
                                : 'bg-gray-800 border-white/5 text-gray-400'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Complex Problems Solved */}
                    {selectedProject.problemsSolved && selectedProject.problemsSolved.length > 0 && (
                      <div className="space-y-4 pt-2">
                        <h4 className="text-sm font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                          <Cpu size={16} /> Complex Engineering Problems Solved
                        </h4>
                        <div className="space-y-3">
                          {selectedProject.problemsSolved.map((problem: { title: string; description: string }, i: number) => (
                            <div 
                              key={i} 
                              className={`p-4.5 rounded-2xl border transition-all duration-300 ${
                                theme.theme === 'light' 
                                  ? 'bg-blue-50/30 border-blue-100 hover:bg-blue-50/50' 
                                  : 'bg-blue-950/10 border-blue-500/10 hover:border-blue-500/20 hover:bg-blue-950/20'
                              }`}
                            >
                              <h5 className="text-sm font-extrabold text-blue-700 dark:text-blue-300 flex items-center gap-2 mb-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:text-blue-400" />
                                {problem.title}
                              </h5>
                              <p className={`text-xs sm:text-sm leading-relaxed font-medium ${
                                theme.theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                              }`}>
                                {problem.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default Projects;