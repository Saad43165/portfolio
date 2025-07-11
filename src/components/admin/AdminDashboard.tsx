import React, { useState, useEffect } from 'react';
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
  Menu,
  X,
  ChevronRight,
  Bell,
  Search,
  Moon,
  Sun,
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, description: 'Dashboard summary' },
    { id: 'projects', label: 'Projects', icon: FolderOpen, description: 'Manage your projects' },
    { id: 'skills', label: 'Skills', icon: Code, description: 'Technical skills' },
    { id: 'experience', label: 'Experience', icon: Briefcase, description: 'Work history' },
    { id: 'education', label: 'Education', icon: GraduationCap, description: 'Academic background' },
    { id: 'about', label: 'About', icon: User, description: 'Personal information' },
    { id: 'settings', label: 'Settings', icon: Settings, description: 'Account settings' },
  ];

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarOpen && window.innerWidth < 768) {
        const target = event.target as HTMLElement;
        if (!target.closest('aside') && !target.closest('[data-sidebar-trigger]')) {
          setSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen]);

  const filteredTabs = tabs.filter(tab =>
    tab.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tab.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewManager />;
      case 'projects': return <ProjectManager />;
      case 'skills': return <SkillManager />;
      case 'experience': return <ExperienceManager />;
      case 'education': return <EducationManager />;
      case 'about': return <AboutManager />;
      case 'settings': return <SettingsScreen />;
      default: return null;
    }
  };

  const currentTab = tabs.find(tab => tab.id === activeTab);

  return (
    <div className={`flex flex-col md:flex-row min-h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Enhanced Topbar for mobile */}
      <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            data-sidebar-trigger
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-2 transition-colors"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{activeTab}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Notifications">
            <Bell size={20} />
          </button>
        </div>
      </div>

      {/* Enhanced Sidebar */}
      <aside
        className={`w-full md:w-72 bg-white dark:bg-gray-900 shadow-xl flex-col p-6 space-y-6 z-50 fixed md:relative transition-all duration-300 ease-in-out border-r border-gray-200 dark:border-gray-700 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } h-full md:h-auto overflow-y-auto`}
      >
        {/* Header */}
        <div className="space-y-4">
          <div className="hidden md:flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Welcome back, {user?.username}</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3">
            Navigation
          </p>
          {filteredTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as TabType);
                setSidebarOpen(false);
              }}
              className={`w-full group flex items-center justify-between p-3 text-left rounded-xl transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              }`}
              aria-label={`Go to ${tab.label}`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  activeTab === tab.id
                    ? 'bg-white bg-opacity-20'
                    : 'bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700'
                }`}>
                  <tab.icon size={18} />
                </div>
                <div>
                  <span className="font-medium">{tab.label}</span>
                  <p className={`text-xs ${
                    activeTab === tab.id
                      ? 'text-white text-opacity-80'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {tab.description}
                  </p>
                </div>
              </div>
              {activeTab === tab.id && (
                <ChevronRight size={16} className="text-white" />
              )}
            </button>
          ))}
          
          {filteredTabs.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Search size={48} className="mx-auto mb-2 opacity-50" />
              <p>No menu items found</p>
            </div>
          )}
        </nav>

        {/* User Profile & Logout */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{user?.username}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
            </div>
          </div>
          
          <button
            onClick={logout}
            className="w-full p-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:bg-opacity-20 flex items-center justify-center space-x-2 rounded-lg transition-all duration-200 font-medium"
            aria-label="Sign out"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Enhanced Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors">
        {/* Content Header */}
        <div className="hidden md:block bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                {currentTab && <currentTab.icon size={20} className="text-blue-600 dark:text-blue-400" />}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
                  {activeTab}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">{currentTab?.description}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" aria-label="Notifications">
                <Bell size={20} />
              </button>
              <div className="h-8 w-px bg-gray-200 dark:bg-gray-700"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{user?.username}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
