import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
import { Skill } from '../../../types';
import { Plus, Edit, Trash2, Code } from 'lucide-react';
import SkillForm from '../Forms/SkillForm';

const SkillManager = () => {
  const { skills, deleteSkill } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(skills.map(s => s.category)))];
  const filteredSkills = filter === 'all' ? skills : skills.filter(s => s.category === filter);

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      deleteSkill(id);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingSkill(null);
  };

  const getLevelColor = (level: number) => {
    if (level >= 90) return 'text-green-600 bg-green-100';
    if (level >= 70) return 'text-blue-600 bg-blue-100';
    if (level >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getLevelText = (level: number) => {
    if (level >= 90) return 'Expert';
    if (level >= 70) return 'Advanced';
    if (level >= 50) return 'Intermediate';
    return 'Beginner';
  };

  if (showForm) {
    return (
      <SkillForm
        skill={editingSkill}
        onClose={handleCloseForm}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Skill Management</h2>
          <p className="text-gray-600">Manage your technical skills and expertise</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          <Plus size={20} />
          <span>Add Skill</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-700">Filter by category:</span>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                filter === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? 'All' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill) => (
          <div key={skill.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Code size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{skill.name}</h3>
                  <span className="text-sm text-blue-600 font-medium">{skill.category}</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleEdit(skill)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(skill.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {skill.description && (
              <p className="text-gray-600 text-sm mb-4">{skill.description}</p>
            )}

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Proficiency</span>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${getLevelColor(skill.level)}`}>
                    {getLevelText(skill.level)}
                  </span>
                  <span className="text-sm font-bold text-gray-900">{skill.level}%</span>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>

              {skill.yearsOfExperience && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-medium text-gray-900">
                    {skill.yearsOfExperience} year{skill.yearsOfExperience !== 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Added {new Date(skill.createdAt).toLocaleDateString()}</span>
                {skill.updatedAt !== skill.createdAt && (
                  <span>Updated {new Date(skill.updatedAt).toLocaleDateString()}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Code size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No skills found</h3>
          <p className="text-gray-600 mb-4">
            {filter === 'all' 
              ? "You haven't added any skills yet." 
              : `No skills found in the "${filter}" category.`
            }
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Add Your First Skill
          </button>
        </div>
      )}
    </div>
  );
};

export default SkillManager;