import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Education } from '../../types';
import { X, GraduationCap } from 'lucide-react';

interface EducationFormProps {
  education?: Education | null;
  onClose: () => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ education, onClose }) => {
  const { addEducation, updateEducation } = useData();

  const [formData, setFormData] = useState({
    degree: education?.degree || '',
    institution: education?.institution || '',
    location: education?.location || '',
    startDate: education?.startDate || '',
    endDate: education?.endDate || '',
    gpa: education?.gpa || '',
    description: education?.description || '',
    achievements: education?.achievements || [],
  });

  const [newAchievement, setNewAchievement] = useState('');
  const [isCurrentlyStudying, setIsCurrentlyStudying] = useState(!education?.endDate);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCurrentlyStudyingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCurrentlyStudying(e.target.checked);
    if (e.target.checked) {
      setFormData(prev => ({ ...prev, endDate: '' }));
    }
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
      endDate: isCurrentlyStudying ? '' : formData.endDate
    };
    
    if (education) {
      updateEducation(education.id, submitData);
    } else {
      addEducation(submitData);
    }
    
    onClose();
  };

  const degreeTypes = [
    'Bachelor of Science (BS)',
    'Bachelor of Arts (BA)',
    'Bachelor of Engineering (BE)',
    'Bachelor of Technology (BTech)',
    'Master of Science (MS)',
    'Master of Arts (MA)',
    'Master of Engineering (ME)',
    'Master of Technology (MTech)',
    'Master of Business Administration (MBA)',
    'Doctor of Philosophy (PhD)',
    'Associate Degree',
    'Diploma',
    'Certificate',
    'High School Diploma',
    'Other'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">
            {education ? 'Edit Education' : 'Add New Education'}
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
                Degree/Qualification *
              </label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleInputChange}
                placeholder="e.g., Bachelor of Computer Science"
                list="degree-suggestions"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
                required
                aria-required="true"
              />
              <datalist id="degree-suggestions">
                {degreeTypes.map((degree) => (
                  <option key={degree} value={degree} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Institution *
              </label>
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleInputChange}
                placeholder="e.g., Pak Austria Fachhochschule"
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
              placeholder="e.g., Haripur, Pakistan"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
              required
              aria-required="true"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  disabled={isCurrentlyStudying}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={isCurrentlyStudying}
                    onChange={handleCurrentlyStudyingChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-900">Currently studying</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                GPA/Grade
              </label>
              <input
                type="text"
                name="gpa"
                value={formData.gpa}
                onChange={handleInputChange}
                placeholder="e.g., 3.8/4.0 or A"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Describe your studies, major subjects, thesis topic, or any relevant details..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
            />
          </div>

          {/* Achievements */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Achievements & Activities
            </label>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newAchievement}
                  onChange={(e) => setNewAchievement(e.target.value)}
                  placeholder="Add achievement, award, or activity"
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
                  <GraduationCap size={20} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{formData.degree || 'Degree'}</h4>
                  <p className="text-blue-600 font-medium">{formData.institution || 'Institution'}</p>
                  <p className="text-sm text-gray-600">{formData.location || 'Location'}</p>
                  {formData.gpa && (
                    <p className="text-sm text-gray-600">GPA: <span className="font-medium">{formData.gpa}</span></p>
                  )}
                </div>
              </div>
              
              {formData.description && (
                <p className="text-gray-900 text-sm mt-3">{formData.description}</p>
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
              aria-label={education ? 'Update education' : 'Add education'}
            >
              {education ? 'Update Education' : 'Add Education'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EducationForm;
