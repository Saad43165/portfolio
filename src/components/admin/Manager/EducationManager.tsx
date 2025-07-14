import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
import { Education } from '../../../types';
import { Plus, Edit, Trash2, GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import EducationForm from '../Forms/EducationForm';

const EducationManager = () => {
  const { education, deleteEducation } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);

  const handleEdit = (edu: Education) => {
    setEditingEducation(edu);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this education record?')) {
      deleteEducation(id);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEducation(null);
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
    
    if (years === 0) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    } else {
      return `${years} year${years !== 1 ? 's' : ''}`;
    }
  };

  if (showForm) {
    return (
      <EducationForm
        education={editingEducation}
        onClose={handleCloseForm}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Education Management</h2>
          <p className="text-gray-600">Manage your educational background and qualifications</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          <Plus size={20} />
          <span>Add Education</span>
        </button>
      </div>

      {/* Education Timeline */}
      <div className="space-y-6">
        {education
          .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
          .map((edu) => (
            <div key={edu.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <GraduationCap size={24} className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-lg text-purple-600 font-semibold">{edu.institution}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin size={14} />
                        <span>{edu.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>
                          {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                        </span>
                      </div>
                      <span className="text-purple-600 font-medium">
                        {calculateDuration(edu.startDate, edu.endDate)}
                      </span>
                    </div>
                    {edu.gpa && (
                      <div className="flex items-center space-x-1 mt-1">
                        <Award size={14} className="text-yellow-600" />
                        <span className="text-sm text-gray-600">GPA: <span className="font-semibold">{edu.gpa}</span></span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(edu)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(edu.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {edu.description && (
                <div className="mb-4">
                  <p className="text-gray-700 leading-relaxed">{edu.description}</p>
                </div>
              )}

              {edu.achievements.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Achievements & Activities:</h4>
                  <ul className="space-y-1">
                    {edu.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex} className="flex items-start space-x-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Added {new Date(edu.createdAt).toLocaleDateString()}</span>
                  {edu.updatedAt !== edu.createdAt && (
                    <span>Updated {new Date(edu.updatedAt).toLocaleDateString()}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

      {education.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <GraduationCap size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No education records yet</h3>
          <p className="text-gray-600 mb-4">
            Add your educational background, degrees, and certifications.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Add Your First Education Record
          </button>
        </div>
      )}
    </div>
  );
};

export default EducationManager;