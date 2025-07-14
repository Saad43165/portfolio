import { useState, useContext } from 'react';
import { Save, Plus, Trash2, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { ThemeContext } from '../User_end/PortfolioLayout';

const AboutForm = () => {
  const theme = useContext(ThemeContext);
  const { aboutData, updateAboutData, resetAboutData } = useData();
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<{
    heading?: string;
    paragraphs?: string[];
    highlights?: string;
    stats?: string[];
  }>({});

  const validateForm = () => {
    const newErrors: { heading?: string; paragraphs?: string[]; highlights?: string; stats?: string[] } = {};
    
    // Heading validation
    if (!aboutData.heading.trim()) {
      newErrors.heading = 'Heading is required';
    } else if (aboutData.heading.length > 100) {
      newErrors.heading = 'Heading must be 100 characters or less';
    }

    // Paragraphs validation
    const paragraphErrors = aboutData.paragraphs.map((p) => {
      if (!p.trim()) return 'Paragraph cannot be empty';
      if (p.length > 500) return 'Paragraph must be 500 characters or less';
      return '';
    });
    if (paragraphErrors.some((e) => e)) {
      newErrors.paragraphs = paragraphErrors;
    }

    // Highlights validation
    if (aboutData.highlights.some((h) => h.length > 50)) {
      newErrors.highlights = 'Each highlight must be 50 characters or less';
    }

    // Stats validation
    const statErrors = aboutData.stats.map((s) => {
      if (!s.label.trim() || !s.value.trim()) return 'Both label and value are required';
      if (s.label.length > 50) return 'Label must be 50 characters or less';
      if (s.value.length > 20) return 'Value must be 20 characters or less';
      return '';
    });
    if (statErrors.some((e) => e)) {
      newErrors.stats = statErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveAbout = () => {
    if (validateForm()) {
      updateAboutData({ ...aboutData }); // Trigger context update
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } else {
      setTimeout(() => setErrors({}), 3000);
    }
  };

  const updateParagraph = (index: number, value: string) => {
    const updated = [...aboutData.paragraphs];
    updated[index] = value;
    updateAboutData({ paragraphs: updated });
  };

  const addParagraph = () => {
    if (aboutData.paragraphs.length < 5) {
      updateAboutData({ paragraphs: [...aboutData.paragraphs, ''] });
    }
  };

  const removeParagraph = (index: number) => {
    if (aboutData.paragraphs.length > 1) {
      updateAboutData({ paragraphs: aboutData.paragraphs.filter((_, i) => i !== index) });
    }
  };

  const updateStat = (index: number, field: 'label' | 'value', value: string) => {
    const updated = [...aboutData.stats];
    updated[index] = { ...updated[index], [field]: value };
    updateAboutData({ stats: updated });
  };

  const addStat = () => {
    if (aboutData.stats.length < 6) {
      updateAboutData({ stats: [...aboutData.stats, { label: '', value: '' }] });
    }
  };

  const removeStat = (index: number) => {
    if (aboutData.stats.length > 1) {
      updateAboutData({ stats: aboutData.stats.filter((_, i) => i !== index) });
    }
  };

  return (
    <motion.div
      className="space-y-6"
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
            Update your bio, highlights, and experience stats
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={resetAboutData}
            className="btn btn-secondary flex items-center space-x-2"
            aria-label="Reset about section to default"
          >
            <RotateCcw size={20} />
            <span>Reset</span>
          </button>
          <button
            onClick={saveAbout}
            className="btn btn-primary flex items-center space-x-2"
            aria-label="Save about section changes"
          >
            <Save size={20} />
            <span>Save</span>
          </button>
        </div>
      </div>

      <div
        className={`glass-effect rounded-lg p-6 space-y-6 transition-colors duration-300 ${
          theme === 'light' ? 'bg-white/10' : 'bg-gray-800/10'
        }`}
      >
        <div>
          <label
            className={`block text-sm font-medium mb-1 transition-colors duration-300 ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}
          >
            Heading
          </label>
          <input
            type="text"
            value={aboutData.heading}
            onChange={(e) => updateAboutData({ heading: e.target.value })}
            className={`w-full px-4 py-2 border rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors duration-300 ${
              theme === 'light' ? 'border-gray-300 bg-white text-gray-900' : 'border-gray-700 bg-gray-800 text-gray-200'
            } ${errors.heading ? 'border-red-500' : ''}`}
            aria-invalid={errors.heading ? 'true' : 'false'}
            aria-describedby={errors.heading ? 'heading-error' : undefined}
            maxLength={100}
          />
          {errors.heading && (
            <p id="heading-error" className="text-red-500 text-sm mt-1">
              {errors.heading}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              className={`block text-sm font-medium transition-colors duration-300 ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}
            >
              Paragraphs (max 5)
            </label>
            <button
              onClick={addParagraph}
              className={`btn btn-secondary flex items-center space-x-2 ${
                aboutData.paragraphs.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              aria-label="Add new paragraph"
              disabled={aboutData.paragraphs.length >= 5}
            >
              <Plus size={16} />
              <span>Add</span>
            </button>
          </div>
          {aboutData.paragraphs.map((p, i) => (
            <div key={i} className="relative mb-2">
              <textarea
                value={p}
                onChange={(e) => updateParagraph(i, e.target.value)}
                className={`w-full px-4 py-2 border rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors duration-300 ${
                  theme === 'light' ? 'border-gray-300 bg-white text-gray-900' : 'border-gray-700 bg-gray-800 text-gray-200'
                } ${errors.paragraphs?.[i] ? 'border-red-500' : ''}`}
                rows={3}
                aria-invalid={errors.paragraphs?.[i] ? 'true' : 'false'}
                aria-describedby={errors.paragraphs?.[i] ? `paragraph-error-${i}` : undefined}
                maxLength={500}
              />
              {aboutData.paragraphs.length > 1 && (
                <button
                  onClick={() => removeParagraph(i)}
                  className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-600 hover-glow"
                  aria-label={`Remove paragraph ${i + 1}`}
                >
                  <Trash2 size={16} />
                </button>
              )}
              {errors.paragraphs?.[i] && (
                <p id={`paragraph-error-${i}`} className="text-red-500 text-sm mt-1">
                  {errors.paragraphs[i]
 } </p>
              )}
            </div>
          ))}
        </div>

        <div>
          <label
            className={`block text-sm font-medium mb-1 transition-colors duration-300 ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}
          >
            Highlights (comma-separated, max 50 chars each)
          </label>
          <input
            type="text"
            value={aboutData.highlights.join(', ')}
            onChange={(e) =>
              updateAboutData({ highlights: e.target.value.split(',').map((h) => h.trim()) })
            }
            className={`w-full px-4 py-2 border rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors duration-300 ${
              theme === 'light' ? 'border-gray-300 bg-white text-gray-900' : 'border-gray-700 bg-gray-800 text-gray-200'
            } ${errors.highlights ? 'border-red-500' : ''}`}
            placeholder="e.g. React, Firebase, TFLite"
            aria-invalid={errors.highlights ? 'true' : 'false'}
            aria-describedby={errors.highlights ? 'highlights-error' : 'highlights-description'}
          />
          <p
            id="highlights-description"
            className={`text-sm mt-1 transition-colors duration-300 ${
              theme === 'light' ? 'text-gray-500' : 'text-gray-400'
            }`}
          >
            Enter highlights separated by commas
          </p>
          {errors.highlights && (
            <p id="highlights-error" className="text-red-500 text-sm mt-1">
              {errors.highlights}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h4
              className={`text-lg font-medium transition-colors duration-300 ${
                theme === 'light' ? 'text-gray-800' : 'text-gray-200'
              }`}
            >
              Stats (max 6)
            </h4>
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
            <div key={i} className="flex items-center gap-4 mb-2 relative">
              <input
                type="text"
                value={stat.label}
                onChange={(e) => updateStat(i, 'label', e.target.value)}
                className={`w-1/2 px-4 py-2 border rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors duration-300 ${
                  theme === 'light' ? 'border-gray-300 bg-white text-gray-900' : 'border-gray-700 bg-gray-800 text-gray-200'
                } ${errors.stats?.[i] ? 'border-red-500' : ''}`}
                placeholder="Label"
                aria-invalid={errors.stats?.[i] ? 'true' : 'false'}
                aria-describedby={errors.stats?.[i] ? `stat-error-${i}` : undefined}
                maxLength={50}
              />
              <input
                type="text"
                value={stat.value}
                onChange={(e) => updateStat(i, 'value', e.target.value)}
                className={`w-1/3 px-4 py-2 border rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors duration-300 ${
                  theme === 'light' ? 'border-gray-300 bg-white text-gray-900' : 'border-gray-700 bg-gray-800 text-gray-200'
                } ${errors.stats?.[i] ? 'border-red-500' : ''}`}
                placeholder="Value"
                aria-invalid={errors.stats?.[i] ? 'true' : 'false'}
                aria-describedby={errors.stats?.[i] ? `stat-error-${i}` : undefined}
                maxLength={20}
              />
              {aboutData.stats.length > 1 && (
                <button
                  onClick={() => removeStat(i)}
                  className="p-1 text-red-500 hover:text-red-600 hover-glow"
                  aria-label={`Remove stat ${i + 1}`}
                >
                  <Trash2 size={16} />
                </button>
              )}
              {errors.stats?.[i] && (
                <p id={`stat-error-${i}`} className="text-red-500 text-sm mt-1 absolute -bottom-6 left-0">
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
            Changes saved successfully!
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AboutForm;