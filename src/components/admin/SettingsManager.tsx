// src/components/admin/SettingsScreen.tsx
import React from 'react';

const SettingsScreen: React.FC = () => {
  const handleExport = () => {
    const data = {
      projects: JSON.parse(localStorage.getItem('portfolioProjects') || '[]'),
      skills: JSON.parse(localStorage.getItem('portfolioSkills') || '[]'),
      experiences: JSON.parse(localStorage.getItem('portfolioExperiences') || '[]'),
      education: JSON.parse(localStorage.getItem('portfolioEducation') || '[]'),
      about: JSON.parse(localStorage.getItem('about_data') || '""'),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    if (window.confirm('⚠️ This will permanently delete all your portfolio data. Continue?')) {
      [
        'portfolioProjects',
        'portfolioSkills',
        'portfolioExperiences',
        'portfolioEducation',
        'about_data',
      ].forEach(localStorage.removeItem);

      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">⚙️ Settings</h2>

      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Export Portfolio Data</h3>
          <p className="text-sm text-gray-600 mb-3">
            Download all your data as a JSON backup.
          </p>
          <button onClick={handleExport} className="btn-blue">
            Export Data
          </button>
        </div>

        <hr className="border-gray-200" />

        <div>
          <h3 className="text-lg font-semibold mb-2 text-red-600">Reset Portfolio</h3>
          <p className="text-sm text-gray-600 mb-3">
            This action will remove all your projects, skills, experiences, education, and about info.
          </p>
          <button onClick={handleReset} className="btn-red">
            Reset All Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
