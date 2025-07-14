import React, { useState, useRef, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { Project, Skill, Experience, Education, AboutData, } from '../../types';
import { Download, Upload, X } from 'lucide-react';

interface ImportData {
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  education: Education[];
  about: AboutData;
}

const SettingsScreen: React.FC = () => {
  const { projects, skills, experiences, education, aboutData, resetAboutData } = useData();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isImportPreviewOpen, setIsImportPreviewOpen] = useState(false);
  const [importPreviewData, setImportPreviewData] = useState<ImportData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resetModalRef = useRef<HTMLDivElement>(null);
  const importModalRef = useRef<HTMLDivElement>(null);

  // Mock admin user data (replace with auth context in production)
 

  // Focus trap and Escape key handling for modals
  useEffect(() => {
    const handleModalFocus = (modalRef: React.RefObject<HTMLDivElement>, isOpen: boolean) => {
      if (!isOpen || !modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      firstElement?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          if (modalRef === resetModalRef) setIsResetModalOpen(false);
          else if (modalRef === importModalRef) setIsImportPreviewOpen(false);
        }
        if (e.key === 'Tab') {
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
          const firstElement = focusableElements[0] as HTMLElement;
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    };

    handleModalFocus(resetModalRef, isResetModalOpen);
    handleModalFocus(importModalRef, isImportPreviewOpen);
  }, [isResetModalOpen, isImportPreviewOpen]);

  // Calculate last updated timestamp for portfolio statistics
  const getLastUpdated = () => {
    const timestamps = [
      ...projects.map(p => new Date(p.updatedAt).getTime()),
      ...skills.map(s => new Date(s.updatedAt).getTime()),
      ...experiences.map(e => new Date(e.updatedAt).getTime()),
      ...education.map(e => new Date(e.updatedAt).getTime()),
    ];
    const latest = Math.max(...timestamps, 0);
    return latest ? new Date(latest).toLocaleDateString() : 'Never';
  };

  const handleExport = () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const data = { projects, skills, experiences, education, about: aboutData };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'portfolio-data.json';
      a.click();
      URL.revokeObjectURL(url);
      setSuccess('Data exported successfully');
    } catch (err) {
      console.error('Export error:', err);
      setError('Failed to export data: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  const validateProject = (p: unknown): p is Project =>
    typeof p === 'object' &&
    p !== null &&
    typeof (p as Project).id === 'string' &&
    typeof (p as Project).title === 'string' &&
    (p as Project).title !== '' &&
    typeof (p as Project).description === 'string' &&
    (p as Project).description !== '' &&
    typeof (p as Project).category === 'string' &&
    (p as Project).category !== '' &&
    typeof (p as Project).startDate === 'string' &&
    (p as Project).startDate !== '' &&
    ((p as Project).endDate === '' || typeof (p as Project).endDate === 'string') &&
    Array.isArray((p as Project).technologies) &&
    Array.isArray((p as Project).features) &&
    ((p as Project).image === '' || typeof (p as Project).image === 'string') &&
    ((p as Project).liveUrl === '' || typeof (p as Project).liveUrl === 'string') &&
    ((p as Project).longDescription === '' || typeof (p as Project).longDescription === 'string') &&
    ((p as Project).videoUrl === undefined || (p as Project).videoUrl === '' || typeof (p as Project).videoUrl === 'string') &&
    typeof (p as Project).createdAt === 'string' &&
    typeof (p as Project).updatedAt === 'string';

  const validateSkill = (s: unknown): s is Skill =>
    typeof s === 'object' &&
    s !== null &&
    typeof (s as Skill).id === 'string' &&
    typeof (s as Skill).name === 'string' &&
    (s as Skill).name !== '' &&
    typeof (s as Skill).category === 'string' &&
    (s as Skill).category !== '' &&
    typeof (s as Skill).level === 'number' &&
    (s as Skill).level >= 0 &&
    (s as Skill).level <= 100 &&
    ((s as Skill).description === '' || typeof (s as Skill).description === 'string') &&
    typeof (s as Skill).yearsOfExperience === 'number' &&
    (s as Skill).yearsOfExperience >= 0 &&
    typeof (s as Skill).createdAt === 'string' &&
    typeof (s as Skill).updatedAt === 'string';

  const validateExperience = (e: unknown): e is Experience =>
    typeof e === 'object' &&
    e !== null &&
    typeof (e as Experience).id === 'string' &&
    typeof (e as Experience).title === 'string' &&
    (e as Experience).title !== '' &&
    typeof (e as Experience).company === 'string' &&
    (e as Experience).company !== '' &&
    typeof (e as Experience).location === 'string' &&
    (e as Experience).location !== '' &&
    typeof (e as Experience).startDate === 'string' &&
    (e as Experience).startDate !== '' &&
    ((e as Experience).endDate === '' || typeof (e as Experience).endDate === 'string') &&
    typeof (e as Experience).description === 'string' &&
    (e as Experience).description !== '' &&
    Array.isArray((e as Experience).technologies) &&
    Array.isArray((e as Experience).achievements) &&
    typeof (e as Experience).createdAt === 'string' &&
    typeof (e as Experience).updatedAt === 'string';

  const validateEducation = (e: unknown): e is Education =>
    typeof e === 'object' &&
    e !== null &&
    typeof (e as Education).id === 'string' &&
    typeof (e as Education).degree === 'string' &&
    (e as Education).degree !== '' &&
    typeof (e as Education).institution === 'string' &&
    (e as Education).institution !== '' &&
    typeof (e as Education).location === 'string' &&
    (e as Education).location !== '' &&
    typeof (e as Education).startDate === 'string' &&
    (e as Education).startDate !== '' &&
    ((e as Education).endDate === '' || typeof (e as Education).endDate === 'string') &&
    ((e as Education).gpa === '' || typeof (e as Education).gpa === 'string') &&
    typeof (e as Education).description === 'string' &&
    (e as Education).description !== '' &&
    Array.isArray((e as Education).achievements) &&
    typeof (e as Education).createdAt === 'string' &&
    typeof (e as Education).updatedAt === 'string';

  const validateAbout = (a: unknown): a is AboutData =>
    typeof a === 'object' &&
    a !== null &&
    typeof (a as AboutData).heading === 'string' &&
    (a as AboutData).heading !== '' &&
    Array.isArray((a as AboutData).paragraphs) &&
    (a as AboutData).paragraphs.every((p: unknown) => typeof p === 'string') &&
    Array.isArray((a as AboutData).highlights) &&
    (a as AboutData).highlights.every((h: unknown) => typeof h === 'string') &&
    Array.isArray((a as AboutData).stats) &&
    (a as AboutData).stats.every((s: unknown) =>
      typeof s === 'object' && s !== null && typeof (s as { label: string; value: string }).label === 'string' && typeof (s as { label: string; value: string }).value === 'string'
    );

  const validateImportedData = (data: unknown): data is ImportData => {
    if (!data || typeof data !== 'object') return false;
    const d = data as Record<string, unknown>;
    if (
      !Array.isArray(d.projects) ||
      !Array.isArray(d.skills) ||
      !Array.isArray(d.experiences) ||
      !Array.isArray(d.education) ||
      !d.about
    ) {
      return false;
    }
    return (
      d.projects.every(validateProject) &&
      d.skills.every(validateSkill) &&
      d.experiences.every(validateExperience) &&
      d.education.every(validateEducation) &&
      validateAbout(d.about)
    );
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const result = event.target?.result;
        if (typeof result !== 'string') {
          throw new Error('Failed to read file content');
        }
        const json = JSON.parse(result);
        if (!validateImportedData(json)) {
          throw new Error('Invalid portfolio data format. Ensure all required fields are present.');
        }
        setImportPreviewData(json);
        setIsImportPreviewOpen(true);
      } catch (err) {
        console.error('Import error:', err);
        setError(err instanceof Error ? err.message : 'Failed to import data');
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
      setError('Failed to read file');
      setIsLoading(false);
    };
    reader.readAsText(file);
  };

  const handleConfirmImport = () => {
    if (!importPreviewData) return;

    setIsLoading(true);
    try {
      localStorage.setItem('portfolioProjects', JSON.stringify(importPreviewData.projects));
      localStorage.setItem('portfolioSkills', JSON.stringify(importPreviewData.skills));
      localStorage.setItem('portfolioExperiences', JSON.stringify(importPreviewData.experiences));
      localStorage.setItem('portfolioEducation', JSON.stringify(importPreviewData.education));
      localStorage.setItem('portfolioAbout', JSON.stringify(importPreviewData.about));
      setSuccess('Data imported successfully');
      setIsImportPreviewOpen(false);
      setImportPreviewData(null);
      window.location.reload();
    } catch (err) {
      console.error('Import save error:', err);
      setError('Failed to save imported data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      ['portfolioProjects', 'portfolioSkills', 'portfolioExperiences', 'portfolioEducation', 'portfolioAbout'].forEach(
        key => localStorage.removeItem(key)
      );
      resetAboutData();
      setSuccess('Portfolio data reset successfully');
      setIsResetModalOpen(false);
      window.location.reload();
    } catch (err) {
      console.error('Reset error:', err);
      setError('Failed to reset data: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  

  

  return (
    <div className="space-y-6 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-900">Settings</h2>

      {(error || success) && (
        <div
          className={`p-4 rounded-lg border transition-opacity duration-300 ${
            error ? 'bg-red-50 text-red-800 border-red-200' : 'bg-blue-50 text-blue-800 border-blue-200'
          }`}
        >
          {error || success}
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center p-4">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Portfolio Statistics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Portfolio Statistics</h3>
          <p className="text-sm text-gray-600 mb-3">Overview of your current portfolio data.</p>
          <div className="space-y-2">
            <p className="text-sm text-gray-900">
              Projects: <span className="font-medium">{projects.length}</span>
            </p>
            <p className="text-sm text-gray-900">
              Skills: <span className="font-medium">{skills.length}</span>
            </p>
            <p className="text-sm text-gray-900">
              Experiences: <span className="font-medium">{experiences.length}</span>
            </p>
            <p className="text-sm text-gray-900">
              Education Entries: <span className="font-medium">{education.length}</span>
            </p>
            <p className="text-sm text-gray-900">
              Last Updated: <span className="font-medium">{getLastUpdated()}</span>
            </p>
          </div>
        </div>

        {/* Export Portfolio Data */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Export Portfolio Data</h3>
          <p id="export-desc" className="text-sm text-gray-600 mb-3">
            Download all your portfolio data as a JSON file.
          </p>
          <button
            onClick={handleExport}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 font-medium flex items-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            aria-label="Export portfolio data"
            aria-describedby="export-desc"
          >
            <Download size={20} />
            <span>Export Data</span>
          </button>
        </div>

        {/* Import Portfolio Data */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Import Portfolio Data</h3>
          <p id="import-desc" className="text-sm text-gray-600 mb-3">
            Upload a JSON file to restore your portfolio data. Ensure the file matches the portfolio data structure.
          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImport}
            accept="application/json"
            className="hidden"
            aria-describedby="import-desc"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 font-medium flex items-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            aria-label="Import portfolio data"
          >
            <Upload size={20} />
            <span>Import Data</span>
          </button>
        </div>

       

        {/* Reset Portfolio */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-red-600 mb-2">Reset Portfolio</h3>
          <p className="text-sm text-gray-600 mb-3">
            Permanently delete all portfolio data (projects, skills, experiences, education, about). This action cannot be undone.
          </p>
          <button
            onClick={() => setIsResetModalOpen(true)}
            disabled={isLoading}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            aria-label="Reset all portfolio data"
          >
            Reset All Data
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {isResetModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
          <div
            ref={resetModalRef}
            className="bg-white rounded-lg shadow-sm border border-gray-200 max-w-md w-full p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Confirm Reset</h2>
              <button
                onClick={() => setIsResetModalOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                aria-label="Close reset modal"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to reset all portfolio data? This action will permanently delete all projects, skills, experiences, education, and about information. This cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsResetModalOpen(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 font-medium"
                aria-label="Cancel reset"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200 font-medium"
                aria-label="Confirm reset"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Preview Modal */}
      {isImportPreviewOpen && importPreviewData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
          <div ref={importModalRef} className="bg-white rounded-lg shadow-sm border border-gray-200 max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Import Preview</h2>
              <button
                onClick={() => setIsImportPreviewOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                aria-label="Close import preview"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Review the data to be imported. This will overwrite existing portfolio data.
            </p>
            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-900">
                Projects: <span className="font-medium">{importPreviewData.projects.length}</span>
              </p>
              <p className="text-sm text-gray-900">
                Skills: <span className="font-medium">{importPreviewData.skills.length}</span>
              </p>
              <p className="text-sm text-gray-900">
                Experiences: <span className="font-medium">{importPreviewData.experiences.length}</span>
              </p>
              <p className="text-sm text-gray-900">
                Education Entries: <span className="font-medium">{importPreviewData.education.length}</span>
              </p>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsImportPreviewOpen(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 font-medium"
                aria-label="Cancel import"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmImport}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 font-medium"
                aria-label="Confirm import"
              >
                Confirm Import
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsScreen;