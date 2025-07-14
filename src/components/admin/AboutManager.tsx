import React, { useContext } from 'react';
import { FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import AboutForm from './AboutForm';
import { ThemeContext } from '../User_end/PortfolioLayout';

const AboutManager = () => {
  const theme = useContext(ThemeContext);

  return (
    <motion.div
      className="container space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2
            className={`text-2xl font-bold mb-1 transition-colors duration-300 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}
          >
            About Section
          </h2>
          <p
            className={`text-base transition-colors duration-300 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}
          >
            Manage your personal introduction, stats, and highlights
          </p>
        </div>
        <div
          className={`p-3 rounded-lg transition-colors duration-300 ${
            theme === 'light' ? 'bg-blue-100' : 'bg-blue-900'
          } hover-glow`}
        >
          <FileText
            size={24}
            className={theme === 'light' ? 'text-blue-600' : 'text-blue-400'}
          />
        </div>
      </div>

      <div
        className={`glass-effect rounded-lg p-6 transition-colors duration-300 ${
          theme === 'light' ? 'bg-white/10' : 'bg-gray-800/10'
        }`}
      >
        <AboutForm />
      </div>
    </motion.div>
  );
};

export default AboutManager;