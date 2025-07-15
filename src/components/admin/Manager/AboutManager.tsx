import React, { useState, useContext } from 'react';
import { FileText, User, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import AboutForm1 from '../Forms/AboutForm1';
import AboutForm2 from '../Forms/AboutForm2';
import { ThemeContext } from '../../User_end/PortfolioLayout';

const AboutManager = () => {
  const theme = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('basic');

  const tabs = [
    {
      id: 'basic',
      label: 'Basic Info',
      icon: User,
      component: AboutForm1
    },
    {
      id: 'highlights',
      label: 'Highlights & Stats',
      icon: Star,
      component: AboutForm2
    }
  ];

  const themeClasses = {
    title: theme === 'light' ? 'text-gray-900' : 'text-white',
    subtitle: theme === 'light' ? 'text-gray-600' : 'text-gray-400',
    iconBg: theme === 'light' ? 'bg-blue-100' : 'bg-blue-900',
    iconColor: theme === 'light' ? 'text-blue-600' : 'text-blue-400',
    tabActive: theme === 'light' 
      ? 'bg-blue-100 text-blue-700 border-blue-300' 
      : 'bg-blue-900 text-blue-300 border-blue-600',
    tabInactive: theme === 'light'
      ? 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
      : 'bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700',
    container: theme === 'light' ? 'bg-white/10' : 'bg-gray-800/10'
  };

  return (
    <motion.div
      className="container space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold mb-1 transition-colors duration-300 ${themeClasses.title}`}>
            About Section
          </h2>
          <p className={`text-base transition-colors duration-300 ${themeClasses.subtitle}`}>
            Manage your personal introduction, stats, and highlights
          </p>
        </div>
        <div className={`p-3 rounded-lg transition-colors duration-300 ${themeClasses.iconBg} hover-glow`}>
          <FileText size={24} className={themeClasses.iconColor} />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-2 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                isActive ? themeClasses.tabActive : themeClasses.tabInactive
              }`}
              aria-pressed={isActive}
              aria-label={`Switch to ${tab.label} tab`}
            >
              <Icon size={18} />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className={`glass-effect rounded-lg transition-colors duration-300 ${themeClasses.container}`}>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6"
        >
          {activeTab === 'basic' && <AboutForm1 />}
          {activeTab === 'highlights' && <AboutForm2 />}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutManager;