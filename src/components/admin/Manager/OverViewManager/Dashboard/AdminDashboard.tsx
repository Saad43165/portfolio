import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../../context/AuthContext';
import {
  LayoutDashboard,
  FolderOpen,
  Code,
  Briefcase,
  GraduationCap,
  Settings,
  LogOut,
  User,
  Menu,
  X,
  ChevronRight,
  Bell,
  Search,
} from 'lucide-react';

import ProjectManager from '../../ProjectManager';
import SkillManager from '../../SkillManager';
import ExperienceManager from '../../ExperienceManager';
import EducationManager from '../../EducationManager';
import AboutManager from '../../AboutManager';
import SettingsScreen from './SettingsManager';
import OverviewManager from '../components/OverViewManager';

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

  const filteredTabs = tabs.filter(
    (tab) =>
      tab.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tab.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewManager setActiveTab={setActiveTab} />;
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
        return (
          <div className="text-center py-8 text-gray-500">
            <p>No content available for this tab.</p>
          </div>
        );
    }
  };

  const currentTab = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Topbar for Mobile */}
      <header className="md:hidden bg-white shadow-md border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center space-x-3">
          <button
            data-sidebar-trigger
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Admin Panel</h1>
            <p className="text-sm text-gray-500 capitalize">{activeTab}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            aria-label="View notifications"
          >
            <Bell size={20} />
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`w-72 bg-white shadow-lg border-r border-gray-200 fixed md:static h-full z-50 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } flex flex-col overflow-y-auto`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="hidden md:flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
              <p className="text-sm text-gray-500">Welcome, {user?.username || 'Admin'}</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-6 py-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-2 space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-2 mb-2">
            Menu
          </p>
          {filteredTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as TabType);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-label={`Navigate to ${tab.label}`}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-lg ${
                    activeTab === tab.id ? 'bg-white bg-opacity-20' : 'bg-gray-100'
                  }`}
                >
                  <tab.icon
                    size={18}
                    className={activeTab === tab.id ? 'text-white' : 'text-gray-600'}
                  />
                </div>
                <div>
                  <span className="font-medium">{tab.label}</span>
                  <p
                    className={`text-xs ${
                      activeTab === tab.id ? 'text-white/80' : 'text-gray-500'
                    }`}
                  >
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
            <div className="text-center py-6 text-gray-500">
              <Search size={40} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No menu items found</p>
            </div>
          )}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg mb-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.username?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {user?.username || 'Admin'}
              </p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center space-x-2 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium"
            aria-label="Sign out"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-100">
        {/* Content Header */}
        <header className="hidden md:block bg-white shadow-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                {currentTab && (
                  <currentTab.icon size={20} className="text-blue-600" />
                )}
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 capitalize">
                  {activeTab}
                </h1>
                <p className="text-sm text-gray-500">{currentTab?.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                aria-label="View notifications"
              >
                <Bell size={20} />
              </button>
              <div className="h-6 w-px bg-gray-200"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {user?.username?.charAt(0).toUpperCase() || 'A'}
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {user?.username || 'Admin'}
                </span>
              </div>
            </div>
          </div>
        </header>

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