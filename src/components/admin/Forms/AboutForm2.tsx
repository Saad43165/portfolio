/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useContext, useCallback, useMemo } from 'react';
import { Save, Plus, Trash2, RotateCcw, Star, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useData } from '../../../context/DataContext';
import { ThemeContext } from '../../User_end/PortfolioLayout';

// Debounce utility function
const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: unknown[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const AboutForm2 = () => {
  const theme = useContext(ThemeContext);
  const { aboutData, updateAboutData, resetAboutData } = useData();
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<{ highlights?: string; stats?: string[] }>({});

  // Debounced validation for highlights and stats
  const validateHighlightsAndStats = useCallback(
    (highlights: string[], stats: { label: string; value: string }[]) => {
      const newErrors: { highlights?: string; stats?: string[] } = {};
      
      if (highlights.some((h) => h.length > 50)) {
        newErrors.highlights = 'Each highlight must be 50 characters or less';
      }

      const statErrors = stats.map((s) => {
        if (!s.label.trim() || !s.value.trim()) return 'Both label and value are required';
        if (s.label.length > 50) return 'Label must be 50 characters or less';
        if (s.value.length > 20) return 'Value must be 20 characters or less';
        return '';
      });
      if (statErrors.some((e) => e)) {
        newErrors.stats = statErrors;
      }

      return newErrors;
    },
    []
  );

  const saveHighlightsAndStats = useCallback(() => {
    const validationErrors = validateHighlightsAndStats(aboutData.highlights, aboutData.stats);
    
    if (Object.keys(validationErrors).length === 0) {
      updateAboutData({ ...aboutData });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      setErrors({});
    } else {
      setErrors(validationErrors);
      setTimeout(() => setErrors({}), 3000);
    }
  }, [aboutData, updateAboutData, validateHighlightsAndStats]);

  // Debounced input handlers
  const handleHighlightsChange = useCallback(
    debounce((value: string) => {
      const highlights = value.split(',').map((h) => h.trim()).filter(h => h);
      updateAboutData({ highlights });
      
      if (errors.highlights && highlights.every(h => h.length <= 50)) {
        setErrors(prev => ({ ...prev, highlights: undefined }));
      }
    }, 300),
    [updateAboutData, errors.highlights]
  );

  const updateStat = useCallback(
    debounce((index: number, field: string, value: string) => {
      const updated = [...aboutData.stats];
      updated[index] = { ...updated[index], [field]: value };
      updateAboutData({ stats: updated });
      
      if (errors.stats?.[index]) {
        const stat = { ...updated[index] };
        if (stat.label.trim() && stat.value.trim() && 
            stat.label.length <= 50 && stat.value.length <= 20) {
          setErrors(prev => {
            const newErrors = { ...prev };
            if (newErrors.stats) {
              newErrors.stats[index] = '';
              if (newErrors.stats.every(e => !e)) {
                delete newErrors.stats;
              }
            }
            return newErrors;
          });
        }
      }
    }, 300),
    [aboutData.stats, updateAboutData, errors.stats]
  );

  const addStat = useCallback(() => {
    if (aboutData.stats.length < 6) {
      updateAboutData({ stats: [...aboutData.stats, { label: '', value: '' }] });
    }
  }, [aboutData.stats, updateAboutData]);

  const removeStat = useCallback((index: number) => {
    if (aboutData.stats.length > 1) {
      updateAboutData({ stats: aboutData.stats.filter((_, i) => i !== index) });
    }
  }, [aboutData.stats, updateAboutData]);

  const resetData = useCallback(() => {
    resetAboutData();
    setErrors({});
    setSaved(false);
  }, [resetAboutData]);

  const themeClasses = useMemo(() => ({
    title: theme === 'light' ? 'text-gray-900' : 'text-white',
    subtitle: theme === 'light' ? 'text-gray-600' : 'text-gray-400',
    label: theme === 'light' ? 'text-gray-700' : 'text-gray-300',
    input: theme === 'light' 
      ? 'border-gray-300 bg-white text-gray-900' 
      : 'border-gray-700 bg-gray-800 text-gray-200',
    container: theme === 'light' ? 'bg-white/10' : 'bg-gray-800/10',
    sectionHeader: theme === 'light' ? 'text-gray-800' : 'text-gray-200'
  }), [theme]);

  const highlightsValue = useMemo(() => {
    return aboutData.highlights.join(', ');
  }, [aboutData.highlights]);

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold mb-1 transition-colors duration-300 ${themeClasses.title}`}>
            Highlights & Stats
          </h2>
          <p className={`text-base transition-colors duration-300 ${themeClasses.subtitle}`}>
            Manage your key highlights and achievement statistics
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={resetData}
            className="btn btn-secondary flex items-center space-x-2"
            aria-label="Reset highlights and stats to default"
          >
            <RotateCcw size={20} />
            <span>Reset</span>
          </button>
          <button
            onClick={saveHighlightsAndStats}
            className="btn btn-primary flex items-center space-x-2"
            aria-label="Save highlights and stats changes"
          >
            <Save size={20} />
            <span>Save</span>
          </button>
        </div>
      </div>

      <div className={`glass-effect rounded-lg p-6 space-y-6 transition-colors duration-300 ${themeClasses.container}`}>
        <div>
          <div className="flex items-center mb-2">
            <Star className={`mr-2 ${theme === 'light' ? 'text-yellow-600' : 'text-yellow-400'}`} size={20} />
            <label className={`block text-sm font-medium transition-colors duration-300 ${themeClasses.label}`}>
              Highlights (comma-separated, max 50 chars each)
            </label>
          </div>
          <input
            type="text"
            defaultValue={highlightsValue}
            onChange={(e) => handleHighlightsChange(e.target.value)}
            className={`w-full px-4 py-2 border rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors duration-300 ${themeClasses.input} ${errors.highlights ? 'border-red-500' : ''}`}
            placeholder="e.g. React, Firebase, TFLite, Node.js"
            aria-invalid={errors.highlights ? 'true' : 'false'}
            aria-describedby={errors.highlights ? 'highlights-error' : 'highlights-description'}
          />
          <p
            id="highlights-description"
            className={`text-sm mt-1 transition-colors duration-300 ${themeClasses.subtitle}`}
          >
            Enter highlights separated by commas. {aboutData.highlights.length} highlights added.
          </p>
          {errors.highlights && (
            <p id="highlights-error" className="text-red-500 text-sm mt-1">
              {errors.highlights}
            </p>
          )}
          
          {aboutData.highlights.length > 0 && (
            <div className="mt-3">
              <p className={`text-xs font-medium mb-2 ${themeClasses.label}`}>Preview:</p>
              <div className="flex flex-wrap gap-2">
                {aboutData.highlights.map((highlight, i) => (
                  <span
                    key={i}
                    className={`px-2 py-1 rounded-full text-xs ${
                      theme === 'light' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-blue-900 text-blue-200'
                    } ${highlight.length > 50 ? 'bg-red-100 text-red-800' : ''}`}
                  >
                    {highlight} {highlight.length > 50 && '⚠️'}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <BarChart3 className={`mr-2 ${theme === 'light' ? 'text-green-600' : 'text-green-400'}`} size={20} />
              <h4 className={`text-lg font-medium transition-colors duration-300 ${themeClasses.sectionHeader}`}>
                Achievement Stats (max 6)
              </h4>
            </div>
            <button
              onClick={addStat}
              className={`btn btn-secondary flex items-center space-x-2 ${
                aboutData.stats.length >= 6 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              aria-label="Add new stat"
              disabled={aboutData.stats.length >= 6}
            >
              <Plus size={16} />
              <span>Add</span>
            </button>
          </div>
          
          {aboutData.stats.map((stat, i) => (
            <div key={i} className="bg-white/5 rounded-lg p-4 mb-3 relative">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium ${themeClasses.label}`}>
                  Stat {i + 1}
                </span>
                {aboutData.stats.length > 1 && (
                  <button
                    onClick={() => removeStat(i)}
                    className="p-1 text-red-500 hover:text-red-600 hover-glow"
                    aria-label={`Remove stat ${i + 1}`}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-medium mb-1 ${themeClasses.label}`}>
                    Label
                  </label>
                  <input
                    type="text"
                    defaultValue={stat.label}
                    onChange={(e) => updateStat(i, 'label', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors duration-300 ${themeClasses.input} ${errors.stats?.[i] ? 'border-red-500' : ''}`}
                    placeholder="e.g. Projects Completed"
                    aria-invalid={errors.stats?.[i] ? 'true' : 'false'}
                    aria-describedby={errors.stats?.[i] ? `stat-error-${i}` : undefined}
                    maxLength={50}
                  />
                  <p className={`text-xs mt-1 ${themeClasses.subtitle}`}>
                    {stat.label.length}/50 characters
                  </p>
                </div>
                
                <div>
                  <label className={`block text-xs font-medium mb-1 ${themeClasses.label}`}>
                    Value
                  </label>
                  <input
                    type="text"
                    defaultValue={stat.value}
                    onChange={(e) => updateStat(i, 'value', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors duration-300 ${themeClasses.input} ${errors.stats?.[i] ? 'border-red-500' : ''}`}
                    placeholder="e.g. 25+"
                    aria-invalid={errors.stats?.[i] ? 'true' : 'false'}
                    aria-describedby={errors.stats?.[i] ? `stat-error-${i}` : undefined}
                    maxLength={20}
                  />
                  <p className={`text-xs mt-1 ${themeClasses.subtitle}`}>
                    {stat.value.length}/20 characters
                  </p>
                </div>
              </div>
              
              {errors.stats?.[i] && (
                <p id={`stat-error-${i}`} className="text-red-500 text-sm mt-2">
                  {errors.stats[i]}
                </p>
              )}
            </div>
          ))}
        </div>

        {saved && (
          <motion.div
            className="bg-green-100 text-green-800 px-4 py-3 rounded-md text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            Highlights and stats saved successfully!
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AboutForm2;