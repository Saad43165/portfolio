import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Skill } from '../../types';
import { X, Code, Star } from 'lucide-react';

interface SkillFormProps {
  skill?: Skill | null;
  onClose: () => void;
}

const SkillForm: React.FC<SkillFormProps> = ({ skill, onClose }) => {
  const { addSkill, updateSkill } = useData();

  const [formData, setFormData] = useState({
    name: skill?.name || '',
    level: skill?.level || 50,
    category: skill?.category || '',
    description: skill?.description || '',
    yearsOfExperience: skill?.yearsOfExperience || 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure all required fields are filled
    if (!formData.name.trim() || !formData.category.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (skill) {
      updateSkill(skill.id, formData);
    } else {
      addSkill(formData);
    }
    
    // Small delay to ensure data is saved
    setTimeout(() => {
      onClose();
    }, 100);
  };

  const getLevelText = (level: number) => {
    if (level >= 90) return 'Expert';
    if (level >= 70) return 'Advanced';
    if (level >= 50) return 'Intermediate';
    return 'Beginner';
  };

  const getLevelColor = (level: number) => {
    if (level >= 90) return 'text-green-600';
    if (level >= 70) return 'text-blue-600';
    if (level >= 50) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const commonCategories = [
    'Frontend Development',
    'Backend Development',
    'Database',
    'DevOps',
    'Mobile Development',
    'Design',
    'Tools & Others'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {skill ? 'Edit Skill' : 'Add New Skill'}
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
                Skill Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., React, Python, Figma"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a category</option>
                {commonCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Proficiency Level: {formData.level}% 
              <span className={`ml-2 font-semibold ${getLevelColor(formData.level)}`}>
                ({getLevelText(formData.level)})
              </span>
            </label>
            <div className="space-y-2">
              <input
                type="range"
                name="level"
                min="0"
                max="100"
                value={formData.level}
                onChange={handleInputChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Beginner (0-49%)</span>
                <span>Intermediate (50-69%)</span>
                <span>Advanced (70-89%)</span>
                <span>Expert (90-100%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${formData.level}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Years of Experience
            </label>
            <input
              type="number"
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleInputChange}
              min="0"
              max="50"
              step="0.5"
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
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
              placeholder="Describe your experience with this skill, projects you've used it in, or any certifications..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Preview */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Preview</h3>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Code size={16} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{formData.name || 'Skill Name'}</h4>
                  <span className="text-sm text-blue-600 font-medium">{formData.category || 'Category'}</span>
                </div>
              </div>
              
              {formData.description && (
                <p className="text-gray-600 text-sm mb-3">{formData.description}</p>
              )}
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Proficiency</span>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      formData.level >= 90 ? 'bg-green-100 text-green-800' :
                      formData.level >= 70 ? 'bg-blue-100 text-blue-800' :
                      formData.level >= 50 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {getLevelText(formData.level)}
                    </span>
                    <span className="text-sm font-bold text-gray-900">{formData.level}%</span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    style={{ width: `${formData.level}%` }}
                  ></div>
                </div>

                {formData.yearsOfExperience > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Experience</span>
                    <span className="font-medium text-gray-900">
                      {formData.yearsOfExperience} year{formData.yearsOfExperience !== 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </div>
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
              {skill ? 'Update Skill' : 'Add Skill'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkillForm;