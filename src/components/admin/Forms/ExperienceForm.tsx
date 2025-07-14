
import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';

import {Experience} from '../../../types';
import { X, Briefcase } from 'lucide-react';

interface ExperienceFormProps {
  experience?: Experience | null;
  onClose: () => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ experience, onClose }) => {
  const { addExperience, updateExperience } = useData();

  const [formData, setFormData] = useState({
    title: experience?.title || '',
    company: experience?.company || '',
    location: experience?.location || '',
    startDate: experience?.startDate || '',
    endDate: experience?.endDate || '',
    description: experience?.description || '',
    technologies: experience?.technologies || [],
    achievements: experience?.achievements || [],
  });

  const [newTechnology, setNewTechnology] = useState('');
  const [newAchievement, setNewAchievement] = useState('');
  const [isCurrentRole, setIsCurrentRole] = useState(!experience?.endDate);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCurrentRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCurrentRole(e.target.checked);
    if (e.target.checked) {
      setFormData(prev => ({ ...prev, endDate: '' }));
    }
  };

  const addTechnology = () => {
    if (newTechnology.trim() && !formData.technologies.includes(newTechnology.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()]
      }));
      setNewTechnology('');
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const addAchievement = () => {
    if (newAchievement.trim() && !formData.achievements.includes(newAchievement.trim())) {
      setFormData(prev => ({
        ...prev,
        achievements: [...prev.achievements, newAchievement.trim()]
      }));
      setNewAchievement('');
    }
  };

  const removeAchievement = (achievement: string) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter(a => a !== achievement)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = {
      ...formData,
      endDate: isCurrentRole ? '' : formData.endDate,
      position: formData.title // Map 'title' to 'position' as required by Experience type
    };
    
    if (experience) {
      updateExperience(experience.id, submitData);
    } else {
      addExperience(submitData);
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">
            {experience ? 'Edit Experience' : 'Add New Experience'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
            aria-label="Close form"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Job Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Software Engineer, Frontend Developer"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
                required
                aria-required="true"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Company *
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="e.g., Google, Microsoft, Startup Inc."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
                required
                aria-required="true"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g., San Francisco, CA or Remote"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
              required
              aria-required="true"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Start Date *
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                required
                aria-required="true"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                End Date
              </label>
              <div className="space-y-2">
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  disabled={isCurrentRole}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={isCurrentRole}
                    onChange={handleCurrentRoleChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-900">I currently work here</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Job Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Describe your role, responsibilities, and what you accomplished in this position..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
              required
              aria-required="true"
            />
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Technologies Used
            </label>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newTechnology}
                  onChange={(e) => setNewTechnology(e.target.value)}
                  placeholder="Add technology"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                />
                <button
                  type="button"
                  onClick={addTechnology}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 font-medium"
                  aria-label="Add technology"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-50 text-blue-800 rounded-lg border border-blue-200"
                  >
                    <span>{tech}</span>
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                      aria-label={`Remove technology: ${tech}`}
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Key Achievements
            </label>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newAchievement}
                  onChange={(e) => setNewAchievement(e.target.value)}
                  placeholder="Add achievement"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAchievement())}
                />
                <button
                  type="button"
                  onClick={addAchievement}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 font-medium"
                  aria-label="Add achievement"
                >
                  Add
                </button>
              </div>
              <div className="space-y-1">
                {formData.achievements.map((achievement) => (
                  <div
                    key={achievement}
                    className="flex items-center justify-between p-2 bg-blue-50 rounded-lg border border-blue-200"
                  >
                    <span className="text-blue-800 text-sm">{achievement}</span>
                    <button
                      type="button"
                      onClick={() => removeAchievement(achievement)}
                      className="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                      aria-label={`Remove achievement: ${achievement}`}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Preview</h3>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Briefcase size={20} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{formData.title || 'Job Title'}</h4>
                  <p className="text-blue-600 font-medium">{formData.company || 'Company'}</p>
                  <p className="text-sm text-gray-600">{formData.location || 'Location'}</p>
                </div>
              </div>
              
              {formData.description && (
                <p className="text-gray-900 text-sm mt-3">{formData.description}</p>
              )}
              
              {formData.technologies.length > 0 && (
                <div className="mt-3">
                  <h5 className="text-sm font-medium text-gray-900 mb-1">Technologies:</h5>
                  <div className="flex flex-wrap gap-2">
                    {formData.technologies.map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-50 text-blue-800 rounded-lg text-sm border border-blue-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {formData.achievements.length > 0 && (
                <div className="mt-3">
                  <h5 className="text-sm font-medium text-gray-900 mb-1">Achievements:</h5>
                  <ul className="space-y-1">
                    {formData.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-gray-900">
                        <div className="w-1 h-1 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 font-medium"
              aria-label="Cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 font-medium"
              aria-label={experience ? 'Update experience' : 'Add experience'}
            >
              {experience ? 'Update Experience' : 'Add Experience'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ExperienceForm;