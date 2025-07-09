import React from 'react';
import { useData } from '../context/DataContext';

const Experience = () => {
  const { experiences } = useData();

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Experience <span className="text-blue-600">Highlights</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {experiences.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experiences.map((exp) => (
              <div key={exp.id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
                <p className="text-gray-600">{exp.company}, {exp.location}</p>
                <p className="text-sm text-gray-500">
                  {new Date(exp.startDate).toLocaleDateString()} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}
                </p>
                <p className="mt-2 text-gray-700">{exp.description}</p>
                {exp.technologies.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {exp.technologies.map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {exp.achievements.length > 0 && (
                  <ul className="mt-3 space-y-1 text-gray-600">
                    {exp.achievements.map((achievement, index) => (
                      <li key={index}>- {achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No experience data available yet.</p>
        )}
      </div>
    </section>
  );
};

export default Experience;