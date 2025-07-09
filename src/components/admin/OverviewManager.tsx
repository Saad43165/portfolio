// src/components/admin/OverviewManager.tsx
import React from 'react';
import { useData } from '../../context/DataContext';
import {
  FolderOpen,
  Code,
  Briefcase,
  GraduationCap,
  Eye,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const OverviewManager = () => {
  const { projects, skills, experiences, education } = useData();
  const { user } = useAuth();

  const stats = [
    { label: 'Total Projects', value: projects.length, icon: FolderOpen, color: 'blue' },
    { label: 'Skills', value: skills.length, icon: Code, color: 'purple' },
    { label: 'Experience', value: experiences.length, icon: Briefcase, color: 'green' },
    { label: 'Education', value: education.length, icon: GraduationCap, color: 'orange' },
  ];

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-600">Welcome back, {user?.username}! Here’s your portfolio summary:</p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
        >
          <Eye size={16} />
          View Portfolio
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex justify-between items-center"
          >
            <div>
              <p className="text-sm text-gray-600">{s.label}</p>
              <p className="text-3xl font-bold text-gray-900">{s.value}</p>
            </div>
            <div className={`${colorMap[s.color]} p-3 rounded-full`}>
              <s.icon size={24} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewManager;
