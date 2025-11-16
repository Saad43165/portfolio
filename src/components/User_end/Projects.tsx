import React, { useEffect, useRef, useState } from 'react';
import { useData } from '../../context/DataContext';
import { ExternalLink, Github, Zap, Shield, Smartphone, Globe, X } from 'lucide-react';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { projects } = useData();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);

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
    switch (category.toLowerCase()) {
      case 'mobile':
      case 'mobile app':
        return Smartphone;
      case 'web app':
      case 'full stack':
        return Globe;
      case 'frontend':
        return Zap;
      case 'backend':
      case 'api':
        return Shield;
      default:
        return Globe;
    }
  };

  const handleViewVideo = (videoUrl: string) => {
    setSelectedVideoUrl(videoUrl);
    setVideoModalOpen(true);
  };

  const handleCloseVideoModal = () => {
    setVideoModalOpen(false);
    setSelectedVideoUrl(null);
  };

  return (
    <section id="projects" ref={sectionRef} className="py-16 bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Add custom scrollbar CSS */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .scrollable-section {
            scrollbar-width: thin;
            scrollbar-color: #cbd5e1 #f1f5f9;
          }
          .scrollable-section::-webkit-scrollbar {
            width: 6px;
          }
          .scrollable-section::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 3px;
          }
          .scrollable-section::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 3px;
          }
          .scrollable-section::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }
        `
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 mx-auto">
            <Globe size={32} className="text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Projects</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A showcase of my work and contributions to various projects
          </p>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const ProjectIcon = getProjectIcon(project.category);
              return (
                <div
                  key={project.title}
                  className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1 flex flex-col overflow-hidden h-[550px] ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Project Image - Fixed */}
                  <div className="relative h-44 overflow-hidden bg-gray-50 flex-shrink-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex space-x-3">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white rounded-full text-gray-800 hover:bg-gray-100 transition-colors duration-200 transform hover:scale-110"
                          >
                            <Github size={20} />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors duration-200 transform hover:scale-110"
                          >
                            <ExternalLink size={20} />
                          </a>
                        )}
                        {project.videoUrl && (
                          <button
                            onClick={() => handleViewVideo(project.videoUrl!)}
                            className="p-3 bg-red-600 rounded-full text-white hover:bg-red-700 transition-colors duration-200 transform hover:scale-110"
                          >
                            <Zap size={20} />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full font-medium">
                        {project.category}
                      </span>
                    </div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        project.status === 'completed' ? 'bg-green-100 text-green-800' :
                        project.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Scrollable Content Area */}
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="p-6 pb-0">
                      {/* Title - Fixed */}
                      <div className="flex items-center mb-4">
                        <div className="p-2 bg-blue-100 rounded-lg mr-3">
                          <ProjectIcon size={20} className="text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                      </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto scrollable-section px-6">
                      {/* Description - Scrollable */}
                      <div className="mb-6">
                        <div className="text-gray-600 leading-relaxed">
                          {project.description}
                        </div>
                      </div>

                      {/* Technologies - Scrollable */}
                      {project.technologies.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-sm font-medium text-gray-500 mb-3 sticky top-0 bg-white py-1">
                            Technologies ({project.technologies.length})
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Features - Scrollable */}
                      {project.features.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-sm font-medium text-gray-500 mb-3 sticky top-0 bg-white py-1">
                            Key Features ({project.features.length})
                          </h4>
                          <div className="space-y-2">
                            {project.features.map((feature, idx) => (
                              <div key={idx} className="flex items-start text-sm text-gray-600">
                                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                                <span className="leading-relaxed">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons - Fixed at bottom */}
                    <div className="p-6 pt-4 bg-white border-t border-gray-100">
                      <div className="flex space-x-3">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-gray-900 text-white py-3 px-4 rounded-lg text-center text-sm font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-2"
                          >
                            <Github size={16} />
                            <span>Code</span>
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg text-center text-sm font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                          >
                            <ExternalLink size={16} />
                            <span>Live</span>
                          </a>
                        )}
                        {!project.githubUrl && !project.liveUrl && project.videoUrl && (
                          <button
                            onClick={() => handleViewVideo(project.videoUrl!)}
                            className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg text-center text-sm font-medium hover:bg-red-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                          >
                            <Zap size={16} />
                            <span>View Demo</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <p className="text-gray-500">No projects data available yet.</p>
          </div>
        )}

        {/* Video Modal */}
        {videoModalOpen && selectedVideoUrl && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[95vh] flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Project Demo</h2>
                <button
                  onClick={handleCloseVideoModal}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-6 flex-grow flex items-center justify-center">
                <video 
                  src={selectedVideoUrl}
                  className="w-full h-auto max-h-[75vh] rounded-lg shadow-lg"
                  controls
                  autoPlay
                />
              </div>
              <div className="p-6 bg-gray-50 flex justify-end border-t border-gray-200">
                <button
                  onClick={handleCloseVideoModal}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;