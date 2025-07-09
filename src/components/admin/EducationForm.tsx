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
    
    // Ensure all required fields are filled
    if (!formData.degree.trim() || !formData.institution.trim() || !formData.location.trim() || !formData.startDate) {
      alert('Please fill in all required fields');
      return;
    }
    
    const submitData = {
      ...formData,
      endDate: isCurrentlyStudying ? '' : formData.endDate
    };
    
    if (education) {
      updateEducation(education.id, submitData);
    } else {
      addEducation(submitData);
    }
    
    // Small delay to ensure data is saved
    setTimeout(() => {
      onClose();
    }, 100);
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
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {education ? 'Edit Education' : 'Add New Education'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Degree/Qualification *
              </label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleInputChange}
                placeholder="e.g., Bachelor of Computer Science"
                list="degree-suggestions"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <datalist id="degree-suggestions">
                {degreeTypes.map((degree) => (
                  <option key={degree} value={degree} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Institution *
              </label>
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleInputChange}
                placeholder="e.g., Pak Austria Fachhochschule"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g., Haripur, Pakistan"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date *
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <div className="space-y-2">
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  disabled={isCurrentlyStudying}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={isCurrentlyStudying}
                    onChange={handleCurrentlyStudyingChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Currently studying</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GPA/Grade
              </label>
              <input
                type="text"
                name="gpa"
                value={formData.gpa}
                onChange={handleInputChange}
                placeholder="e.g., 3.8/4.0 or A"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Describe your studies, major subjects, thesis topic, or any relevant details..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Achievements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Achievements & Activities
            </label>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newAchievement}
                  onChange={(e) => setNewAchievement(e.target.value)}
                  placeholder="Add achievement, award, or activity"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAchievement())}
                />
                <button
                  type="button"
                  onClick={addAchievement}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                >
                  Add
                </button>
              </div>
              <div className="space-y-1">
                {formData.achievements.map((achievement) => (
                  <div
                    key={achievement}
                    className="flex items-center justify-between p-2 bg-purple-50 rounded-lg"
                  >
                    <span className="text-purple-800 text-sm">{achievement}</span>
                    <button
                      type="button"
                      onClick={() => removeAchievement(achievement)}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Preview</h3>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <GraduationCap size={20} className="text-purple-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{formData.degree || 'Degree'}</h4>
                  <p className="text-purple-600 font-semibold">{formData.institution || 'Institution'}</p>
                  <p className="text-sm text-gray-600">{formData.location || 'Location'}</p>
                  {formData.gpa && (
                    <p className="text-sm text-gray-600">GPA: <span className="font-semibold">{formData.gpa}</span></p>
                  )}
                </div>
              </div>
              
              {formData.description && (
                <p className="text-gray-700 mt-3">{formData.description}</p>
              )}
              
              {formData.achievements.length > 0 && (
                <div className="mt-3">
                  <h5 className="text-sm font-semibold text-gray-900 mb-1">Achievements:</h5>
                  <ul className="space-y-1">
                    {formData.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                        <div className="w-1 h-1 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
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