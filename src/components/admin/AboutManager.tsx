import React from 'react';
import AboutForm from './AboutForm';
import { FileText } from 'lucide-react';

const AboutManager = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">About Section</h2>
          <p className="text-gray-600">Manage your personal introduction, stats, and highlights</p>
        </div>
        <div className="p-3 bg-blue-100 rounded-lg">
          <FileText size={24} className="text-blue-600" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <AboutForm />
      </div>
    </div>
  );
};

export default AboutManager;
