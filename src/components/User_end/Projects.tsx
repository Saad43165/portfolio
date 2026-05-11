import { useEffect, useRef, useState, useContext } from 'react';
import { useData } from '../../context/DataContext';
import { ExternalLink, Github, Zap, Shield, Smartphone, Globe, X, Play, Code as CodeIcon } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ThemeContext } from './PortfolioLayout';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { projects } = useData();
  const theme = useContext(ThemeContext);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

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
      className={`py-12 sm:py-16 transition-colors duration-500 relative overflow-hidden ${
        theme.theme === 'light' ? 'bg-gray-50/50' : 'bg-gray-950'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div className="mb-10" variants={itemVariants}>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-blue-600" />
            <span className="text-xs font-black uppercase tracking-[0.4em] text-blue-600">Selected Works</span>
          </div>
          <h2 className={`text-4xl sm:text-6xl font-bold tracking-tight leading-[1.1] ${
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
              {filteredProjects.map((project, index) => {
                const ProjectIcon = getProjectIcon(project.category);
                const isMobileApp = project.category.toLowerCase().includes('mobile');
                
                return (
                  <motion.div
                    key={project.id || index}
                    layout
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className={`group relative rounded-2xl p-5 transition-all duration-700 border flex flex-col h-full ${
                      theme.theme === 'light'
                        ? 'bg-white border-gray-200 shadow-sm hover:shadow-md'
                        : 'bg-gray-900 border-white/10 hover:border-blue-500/30 shadow-2xl'
                    }`}
                  >
                    {/* Media Container */}
                    <div className={`relative rounded-[2rem] overflow-hidden mb-8 transition-all duration-700 ${
                      isMobileApp ? 'aspect-[9/16] max-w-[240px] mx-auto border-[6px] border-gray-900 shadow-2xl' : 'aspect-video'
                    }`}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                        {project.videoUrl && (
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            onClick={() => handleViewVideo(project.videoUrl!)}
                            className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white"
                          >
                            <Play size={24} fill="currentColor" />
                          </motion.button>
                        )}
                        {project.githubUrl && (
                          <motion.a 
                            whileHover={{ scale: 1.1 }}
                            href={project.githubUrl}
                            target="_blank"
                            className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white"
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
                          {project.technologies.slice(0, 4).map((tech) => (
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
                            onClick={() => project.videoUrl && handleViewVideo(project.videoUrl)}
                            className="flex items-center gap-2 text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest"
                          >
                            Details <ExternalLink size={14} />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
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
      </div>
    </motion.section>
  );
};

export default Projects;