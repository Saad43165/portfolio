// src/components/admin/AdminDashboard.tsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

import {
  LayoutDashboard,
  FolderOpen,
  Code,
  GraduationCap,
  Briefcase,
  Settings,
  LogOut,
  User,
} from 'lucide-react';

import ProjectManager from './ProjectManager';
import SkillManager from './SkillManager';
import ExperienceManager from './ExperienceManager';
import EducationManager from './EducationManager';
import AboutManager from './AboutManager';
import SettingsScreen from './SettingsManager';
import OverviewManager from './OverviewManager';

type TabType =
  | 'overview'
  | 'projects'
  | 'skills'
  | 'experience'
  | 'education'
  | 'about'
  | 'settings';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const { user, logout } = useAuth();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'about', label: 'About', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewManager />;
      case 'projects':
        return <ProjectManager />;
      case 'skills':
        return <SkillManager />;
      case 'experience':
        return <ExperienceManager />;
      case 'education':
        return <EducationManager />;
      case 'about':
        return <AboutManager />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-sm text-gray-600">Welcome, {user?.username}</p>
        </div>

        <nav className="flex-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`w-full flex items-center p-4 space-x-2 text-left transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <tab.icon size={20} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <button
          onClick={logout}
          className="p-4 text-red-600 hover:bg-red-50 flex items-center space-x-2 transition-colors duration-200"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto bg-gray-50">{renderContent()}</main>
    </div>
  );
};

export default AdminDashboard;
