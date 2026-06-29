import { useEffect, useRef, useState, useContext } from 'react';
import { useData } from '../../context/DataContext';
import { ExternalLink, Github, Zap, Shield, Smartphone, Globe, X, Play, Code as CodeIcon, Cpu, Layers, Calendar, User, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ThemeContext } from './PortfolioLayout';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { projects } = useData();
  const theme = useContext(ThemeContext);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  
  // For mobile view modal
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const categories = ['All', ...new Set(projects.map(p => p.category))];
  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  // Initialize first project as selected on mount or category change
  useEffect(() => {
    if (filteredProjects.length > 0) {
      // Only auto-select if nothing is selected, or if the current selection is filtered out
      if (!selectedProject || !filteredProjects.find(p => p.id === selectedProject.id)) {
        setSelectedProject(filteredProjects[0]);
      }
    } else {
      setSelectedProject(null);
    }
  }, [activeCategory, projects]);

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

  const handleProjectSelect = (project: any) => {
    setSelectedProject(project);
    // On small screens, open the modal
    if (window.innerWidth < 1024) {
      setIsMobileModalOpen(true);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const ProjectDetailsContent = ({ project }: { project: any }) => {
    if (!project) return null;
    const isMobileApp = project.category.toLowerCase().includes('mobile') || 
      ['project-signbridge', 'project-agriguard', 'project-vaxguard', 'project-runquest', 'project-naheed'].includes(project.id);

    return (
      <div className="flex flex-col h-full w-full overflow-y-auto custom-scrollbar p-5 sm:p-8">
        
        {/* Header Block */}
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-[9px] font-black uppercase tracking-widest rounded bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-600/20">
              {project.category}
            </span>
            <span className={`px-2 py-1 text-[9px] font-black uppercase tracking-widest rounded border ${
              project.status === 'completed' ? 'bg-green-600/10 text-green-600 dark:text-green-400 border-green-600/20' : 'bg-amber-600/10 text-amber-600 dark:text-amber-400 border-amber-600/20'
            }`}>
              {project.status}
            </span>
          </div>
          <h3 className={`text-2xl sm:text-3xl font-black tracking-tight leading-tight ${theme.theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            {project.title}
          </h3>
          
          <div className="flex flex-wrap gap-4 pt-1">
            {project.role && (
              <div className="flex items-center gap-1.5 text-xs">
                <User size={14} className="text-blue-500" />
                <span className={theme.theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>Role: <strong className={theme.theme === 'light' ? 'text-gray-900' : 'text-white'}>{project.role}</strong></span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-xs">
              <Calendar size={14} className="text-blue-500" />
              <span className={theme.theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>Timeline: <strong className={theme.theme === 'light' ? 'text-gray-900' : 'text-white'}>{project.startDate} {project.endDate ? `— ${project.endDate}` : ''}</strong></span>
            </div>
          </div>
        </div>

        {/* Content Split: Image & Details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Media Column */}
          <div className={`md:col-span-5 relative rounded-2xl overflow-hidden border flex items-center justify-center p-4 ${
            theme.theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-gray-950 border-white/10'
          } ${isMobileApp ? 'aspect-[9/16] max-w-[240px] mx-auto' : 'aspect-video w-full'}`}>
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-contain drop-shadow-xl"
            />
            {project.videoUrl && (
              <button 
                onClick={() => setVideoModalOpen(true)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all shadow-xl"
              >
                <Play size={20} fill="currentColor" />
              </button>
            )}
          </div>

          {/* Details Column */}
          <div className="md:col-span-7 space-y-6">
            
            {/* Action Links */}
            <div className="flex flex-wrap gap-2 pb-2">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">
                  <Github size={14} /> Source Code
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors bg-blue-600 text-white hover:bg-blue-700 shadow-sm">
                  <Globe size={14} /> Live Project
                </a>
              )}
            </div>

            {/* Overview */}
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">Project Overview</h4>
              <p className={`text-sm leading-relaxed whitespace-pre-line font-medium ${
                theme.theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Features Grid */}
            {project.features && project.features.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">Key Features</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.features.map((feature: string, i: number) => (
                    <div key={i} className={`flex items-start gap-2 p-2.5 rounded-lg border ${
                      theme.theme === 'light' ? 'bg-gray-50 border-gray-100' : 'bg-gray-800/40 border-white/5'
                    }`}>
                      <Zap size={12} className="text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" />
                      <span className={`text-xs font-semibold ${theme.theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">Tech Stack</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech: string) => (
                  <span key={tech} className={`px-2 py-1 text-[9px] font-bold uppercase rounded border ${
                    theme.theme === 'light' ? 'bg-white border-gray-200 text-gray-700' : 'bg-gray-900 border-white/10 text-gray-300'
                  }`}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Engineering Problems */}
            {project.problemsSolved && project.problemsSolved.length > 0 && (
              <div className="space-y-3 pt-2 border-t border-gray-200 dark:border-white/10 mt-6">
                <h4 className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Cpu size={14} /> Engineering Challenges Solved
                </h4>
                <div className="space-y-2">
                  {project.problemsSolved.map((problem: any, i: number) => (
                    <div key={i} className={`p-3.5 rounded-xl border transition-all ${
                      theme.theme === 'light' ? 'bg-blue-50/30 border-blue-100' : 'bg-blue-900/10 border-blue-500/10'
                    }`}>
                      <h5 className="text-[11px] font-extrabold text-blue-700 dark:text-blue-400 mb-1 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-blue-600" /> {problem.title}
                      </h5>
                      <p className={`text-xs leading-relaxed ${theme.theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                        {problem.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.section
      id="projects"
      ref={sectionRef}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={`py-12 sm:py-20 transition-colors duration-500 relative overflow-hidden ${
        theme.theme === 'light' ? 'bg-[#fff5f7]/50' : 'bg-transparent'
      }`}
    >
      {/* Dynamic Background Elements - Rose Theme */}
      <div className={`absolute top-1/3 left-0 w-[550px] h-[550px] rounded-full blur-[140px] -translate-x-1/2 pointer-events-none ${
        theme.theme === 'light' ? 'bg-rose-400/20' : 'bg-rose-500/5'
      }`} />
      <div className={`absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full blur-[120px] translate-x-1/4 translate-y-1/4 pointer-events-none ${
        theme.theme === 'light' ? 'bg-pink-500/20' : 'bg-pink-600/5'
      }`} />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-[2px] w-6 bg-blue-600 rounded-full" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-600">Selected Works</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className={`text-4xl sm:text-5xl font-black tracking-tight leading-none ${
                theme.theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}
            >
              Digital <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Masterpieces</span>
            </h2>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border ${
                    activeCategory === cat 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                      : theme.theme === 'light'
                        ? 'bg-gray-50 border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600'
                        : 'bg-gray-900 border-white/10 text-gray-400 hover:border-blue-500/50 hover:text-blue-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Dashboard Split Layout */}
        <div className={`h-[800px] max-h-[85vh] flex flex-col lg:flex-row rounded-3xl border overflow-hidden shadow-2xl ${
          theme.theme === 'light' ? 'border-gray-200 bg-white' : 'border-white/10 bg-gray-900/50'
        }`}>
          
          {/* Left Column: Project List */}
          <div className={`w-full lg:w-[400px] flex-shrink-0 flex flex-col h-full border-b lg:border-b-0 lg:border-r ${
            theme.theme === 'light' ? 'border-gray-200 bg-gray-50/50' : 'border-white/10 bg-gray-900/80'
          }`}>
            <div className="p-5 border-b border-inherit">
              <h3 className={`text-sm font-black uppercase tracking-widest ${theme.theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>
                Project Explorer ({filteredProjects.length})
              </h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => {
                  const Icon = getProjectIcon(project.category);
                  const isSelected = selectedProject?.id === project.id;
                  
                  return (
                    <button
                      key={project.id}
                      onClick={() => handleProjectSelect(project)}
                      className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-start gap-4 group ${
                        isSelected 
                          ? theme.theme === 'light' ? 'bg-white shadow-md border border-blue-100' : 'bg-gray-800 border border-blue-500/30'
                          : theme.theme === 'light' ? 'hover:bg-white/60 border border-transparent' : 'hover:bg-gray-800/50 border border-transparent'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl flex-shrink-0 transition-colors ${
                        isSelected 
                          ? 'bg-blue-600 text-white'
                          : theme.theme === 'light' ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-100' : 'bg-gray-700 text-blue-400'
                      }`}>
                        <Icon size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-sm font-bold truncate mb-1 transition-colors ${
                          isSelected ? (theme.theme === 'light' ? 'text-gray-900' : 'text-white') : (theme.theme === 'light' ? 'text-gray-600' : 'text-gray-400')
                        }`}>
                          {project.title}
                        </h4>
                        <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 truncate">
                          {project.category}
                        </p>
                      </div>
                      <div className={`mt-2 transition-transform ${isSelected ? 'translate-x-1 text-blue-500' : 'text-gray-300 dark:text-gray-600 group-hover:text-gray-400'}`}>
                        <ChevronRight size={16} />
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="text-center p-8 text-gray-500">
                  <CodeIcon size={32} className="mx-auto mb-3 opacity-20" />
                  <p className="text-sm font-bold">No projects found.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Detailed Preview (Hidden on Mobile) */}
          <div className="hidden lg:flex flex-1 h-full bg-inherit relative">
            {selectedProject ? (
              <ProjectDetailsContent project={selectedProject} />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                <CodeIcon size={64} className="mb-4 opacity-10" />
                <p className="text-lg font-bold uppercase tracking-widest">Select a project to view details</p>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Detail Modal */}
        <AnimatePresence>
          {isMobileModalOpen && selectedProject && (
            <div className="fixed inset-0 z-[9999] flex flex-col lg:hidden overflow-hidden bg-gray-950">
              <div className={`flex-shrink-0 flex items-center justify-between p-4 pt-6 sm:pt-4 border-b shadow-md z-10 relative ${
                theme.theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-900 border-white/10'
              }`}>
                <span className="text-xs font-black uppercase tracking-widest text-blue-500">Back to Projects</span>
                <button 
                  onClick={() => setIsMobileModalOpen(false)}
                  className={`p-3 rounded-xl border ${theme.theme === 'light' ? 'bg-gray-100 border-gray-200 text-gray-900 hover:bg-gray-200' : 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700'} shadow-sm`}
                >
                  <X size={24} />
                </button>
              </div>
              <div className={`flex-1 overflow-y-auto relative z-0 ${theme.theme === 'light' ? 'bg-white' : 'bg-gray-950'}`}>
                <ProjectDetailsContent project={selectedProject} />
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* Video Modal (Shared) */}
        <AnimatePresence>
          {videoModalOpen && selectedProject?.videoUrl && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/90 backdrop-blur-xl" 
                onClick={() => setVideoModalOpen(false)}
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              >
                <button
                  onClick={() => setVideoModalOpen(false)}
                  className="absolute top-4 right-4 z-50 p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl backdrop-blur-md transition-colors"
                >
                  <X size={20} />
                </button>
                <video src={selectedProject.videoUrl} className="w-full h-full object-contain" controls autoPlay />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </motion.section>
  );
};

export default Projects;