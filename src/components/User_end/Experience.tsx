import React from 'react';

import { useData } from '../../context/DataContext';

import { Briefcase, ChevronRight } from 'lucide-react';

const Experience = () => {
  const { experiences } = useData();

  return (
    <section id="experience" className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 mx-auto">
            <Briefcase size={32} className="text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Experience</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            My career journey and the roles that shaped my professional growth
          </p>
        </div>

        {experiences.length > 0 ? (
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/20 via-purple-500/50 to-blue-500/20 transform -translate-x-1/2"></div>
            
            <div className="space-y-8 md:space-y-12">
              {experiences.map((exp, index) => (
                <div 
                  key={exp.id} 
                  className={`relative group ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  {/* Timeline dot */}
                  <div className={`hidden md:flex absolute top-6 ${index % 2 === 0 ? '-right-1' : '-left-1'} items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg transform group-hover:scale-125 transition-transform duration-300`}>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>

                  <div className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 p-3 bg-blue-50 rounded-lg text-blue-600">
                        <Briefcase size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                          <div className="text-sm text-gray-500">
                            {new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present'}
                          </div>
                        </div>
                        
                        <p className="text-blue-600 font-medium mb-3">{exp.company} • {exp.location}</p>
                        
                        <p className="text-gray-700 mb-4">{exp.description}</p>
                        
                        {exp.technologies.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Technologies Used</h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech, techIndex) => (
                                <span 
                                  key={techIndex} 
                                  className="px-3 py-1 bg-gradient-to-br from-blue-50 to-purple-50 text-blue-800 rounded-full text-sm font-medium border border-blue-100"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {exp.achievements.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Key Achievements</h4>
                            <ul className="space-y-2">
                              {exp.achievements.map((achievement, achievementIndex) => (
                                <li key={achievementIndex} className="flex items-start">
                                  <span className="flex-shrink-0 mt-1 mr-2 text-blue-500">
                                    <ChevronRight size={16} className="text-blue-500" />
                                  </span>
                                  <span className="text-gray-700">{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <p className="text-gray-500">No experience data available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;