import React from 'react';
import { useData } from '../context/DataContext';

const Education = () => {
  const { education } = useData();

  return (
    <section id="education" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Education <span className="text-blue-600">Journey</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {education.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {education.map((edu) => (
              <div key={edu.id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-gray-600">{edu.institution}, {edu.location}</p>
                <p className="text-sm text-gray-500">
                  {new Date(edu.startDate).toLocaleDateString()} - {edu.endDate ? new Date(edu.endDate).toLocaleDateString() : 'Present'}
                </p>
                {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                {edu.description && <p className="text-gray-700 mt-2">{edu.description}</p>}
                {edu.achievements.length > 0 && (
                  <ul className="mt-3 space-y-1 text-gray-600">
                    {edu.achievements.map((achievement, index) => (
                      <li key={index}>- {achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No education data available yet.</p>
        )}
      </div>
    </section>
  );
};

export default Education;