import React, { useEffect, useRef, useState } from 'react';
import { useData } from '../context/DataContext';
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
    <section id="projects" ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const ProjectIcon = getProjectIcon(project.category);
              return (
                <div
                  key={project.title}
                  className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden rounded-t-xl">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex space-x-3">
                        <a
                          href={project.githubUrl}
                          className="p-3 bg-white rounded-full text-gray-800 hover:bg-gray-100 transition-colors duration-200 transform hover:scale-110"
                        >
                          <Github size={20} />
                        </a>
                        <a
                          href={project.liveUrl}
                          className="p-3 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors duration-200 transform hover:scale-110"
                        >
                          <ExternalLink size={20} />
                        </a>
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

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-blue-100 rounded-lg mr-3">
                        <ProjectIcon size={20} className="text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Features */}
                    <div className="space-y-2 mb-4">
                      {project.features.slice(0, 2).map((feature) => (
                        <div key={feature} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <a
                        href={project.githubUrl}
                        className="flex-1 bg-gray-900 text-white py-2 px-4 rounded-lg text-center text-sm font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <Github size={16} />
                        <span>Code</span>
                      </a>
                      <a
                        href={project.liveUrl}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-center text-sm font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <ExternalLink size={16} />
                        <span>Live</span>
                      </a>
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Project Video</h2>
                <button
                  onClick={handleCloseVideoModal}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="mt-4">
                <video 
                  src={selectedVideoUrl}
                  className="w-full rounded-lg"
                  controls
                  autoPlay
                />
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleCloseVideoModal}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
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