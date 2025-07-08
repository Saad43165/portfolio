import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Zap, Shield, Smartphone, Globe } from 'lucide-react';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
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

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React, Node.js, and Stripe integration. Features include user authentication, product catalog, shopping cart, and payment processing.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
      features: ['User Authentication', 'Payment Processing', 'Admin Dashboard', 'Responsive Design'],
      githubUrl: '#',
      liveUrl: '#',
      category: 'Full Stack',
      icon: Globe
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      image: 'https://images.pexels.com/photos/3194521/pexels-photo-3194521.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'TypeScript', 'Firebase', 'Material-UI'],
      features: ['Real-time Updates', 'Drag & Drop', 'Team Collaboration', 'Mobile Responsive'],
      githubUrl: '#',
      liveUrl: '#',
      category: 'Frontend',
      icon: Zap
    },
    {
      title: 'Crypto Portfolio Tracker',
      description: 'A cryptocurrency portfolio tracking application with real-time price updates, portfolio analytics, and price alerts.',
      image: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'Python', 'FastAPI', 'PostgreSQL', 'Chart.js'],
      features: ['Real-time Prices', 'Portfolio Analytics', 'Price Alerts', 'Market Data'],
      githubUrl: '#',
      liveUrl: '#',
      category: 'Full Stack',
      icon: Shield
    },
    {
      title: 'Weather App',
      description: 'A beautiful weather application with location-based forecasts, interactive maps, and weather alerts.',
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React Native', 'TypeScript', 'OpenWeather API'],
      features: ['Location-based', 'Interactive Maps', 'Weather Alerts', 'Offline Support'],
      githubUrl: '#',
      liveUrl: '#',
      category: 'Mobile',
      icon: Smartphone
    },
    {
      title: 'Social Media Dashboard',
      description: 'A comprehensive social media management dashboard with analytics, scheduling, and multi-platform integration.',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
      features: ['Multi-platform', 'Analytics', 'Post Scheduling', 'Team Management'],
      githubUrl: '#',
      liveUrl: '#',
      category: 'Full Stack',
      icon: Globe
    },
    {
      title: 'Recipe Sharing Platform',
      description: 'A community-driven recipe sharing platform with user profiles, recipe ratings, and advanced search functionality.',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'Node.js', 'MongoDB', 'Cloudinary'],
      features: ['User Profiles', 'Recipe Ratings', 'Advanced Search', 'Image Upload'],
      githubUrl: '#',
      liveUrl: '#',
      category: 'Full Stack',
      icon: Zap
    }
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              My <span className="text-blue-600">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className={`group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl transform hover:scale-105 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
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
                    </div>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg mr-3">
                      <project.icon size={20} className="text-blue-600" />
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
                  <div className="space-y-2 mb-6">
                    {project.features.slice(0, 2).map((feature, featureIndex) => (
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
            ))}
          </div>

          {/* View More Button */}
          <div className={`text-center mt-12 transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <span className="group-hover:mr-2 transition-all duration-300">View More Projects</span>
              <ExternalLink size={16} className="inline ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;