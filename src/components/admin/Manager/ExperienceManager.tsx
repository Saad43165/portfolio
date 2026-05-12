import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../../context/DataContext';
import { Experience } from '../../../types';
import { Plus, Edit, Trash2, Briefcase, Calendar, MapPin } from 'lucide-react';
import ExperienceForm from '../Forms/ExperienceForm';

const ExperienceManager = () => {
  const { experiences, deleteExperience } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      deleteExperience(id);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingExperience(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const calculateDuration = (startDate: string, endDate?: string) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    } else if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    } else {
      return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
  };

  if (showForm) {
    return (
      <ExperienceForm
        experience={editingExperience}
        onClose={handleCloseForm}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Experience Management</h2>
          <p className="text-gray-600 text-sm">Work history and professional roles</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 sm:py-2 rounded-xl shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
        >
          <Plus size={20} />
          <span>Add Experience</span>
        </button>
      </div>

      {/* Experience Timeline */}
      <motion.div 
        layout
        className="space-y-6"
      >
        <AnimatePresence mode="popLayout">
          {experiences
            .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
            .map((experience) => (
              <motion.div 
                key={experience.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-100 rounded-xl flex-shrink-0">
                      <Briefcase size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-gray-950 leading-tight">{experience.title}</h3>
                      <p className="text-base text-blue-600 font-bold mt-0.5">{experience.company}</p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center space-x-1">
                          <MapPin size={12} />
                          <span>{experience.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar size={12} />
                          <span>
                            {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : 'Present'}
                          </span>
                        </div>
                        <span className="text-blue-600 font-bold">
                          {calculateDuration(experience.startDate, experience.endDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-4 sm:pt-0">
                    <button
                      onClick={() => handleEdit(experience)}
                      className="flex-1 sm:flex-none flex items-center justify-center p-2 text-blue-600 bg-blue-50 sm:bg-transparent rounded-lg transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(experience.id)}
                      className="flex-1 sm:flex-none flex items-center justify-center p-2 text-red-600 bg-red-50 sm:bg-transparent rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

              <div className="mb-4">
                <p className="text-gray-700 leading-relaxed">{experience.description}</p>
              </div>

              {experience.achievements.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Achievements:</h4>
                  <ul className="space-y-1">
                    {experience.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex} className="flex items-start space-x-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {experience.technologies.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Added {new Date(experience.createdAt).toLocaleDateString()}</span>
                  {experience.updatedAt !== experience.createdAt && (
                    <span>Updated {new Date(experience.updatedAt).toLocaleDateString()}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {experiences.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Briefcase size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No experience added yet</h3>
          <p className="text-gray-600 mb-4">
            Add your work experience, internships, and professional roles.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Add Your First Experience
          </button>
        </div>
      )}
    </div>
  );
};

export default ExperienceManager;