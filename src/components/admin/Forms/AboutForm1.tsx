import { useState, useContext, useCallback, useMemo, useRef } from 'react';
import { Save, Plus, Trash2, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useData } from '../../../context/DataContext';
import { ThemeContext } from '../../User_end/PortfolioLayout';

// Debounce utility function
const debounce = <T extends unknown[]>(func: (...args: T) => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: T) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const AboutForm1 = () => {
  const theme = useContext(ThemeContext);
  const { aboutData, updateAboutData, resetAboutData } = useData();
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<{ heading?: string; paragraphs?: string[] }>({});

  // Debounced validation to prevent excessive re-renders
  const validateBasicInfo = useCallback((heading: string, paragraphs: string[]) => {
    const newErrors: { heading?: string; paragraphs?: string[] } = {};

    if (!heading.trim()) {
      newErrors.heading = 'Heading is required';
    } else if (heading.length > 100) {
      newErrors.heading = 'Heading must be 100 characters or less';
    }

    const paragraphErrors = paragraphs.map((p) => {
      if (!p.trim()) return 'Paragraph cannot be empty';
      if (p.length > 500) return 'Paragraph must be 500 characters or less';
      return '';
    });
    if (paragraphErrors.some((e) => e)) {
      newErrors.paragraphs = paragraphErrors;
    }

    return newErrors;
  }, []);

  const saveBasicInfo = useCallback(() => {
    const validationErrors = validateBasicInfo(aboutData.heading, aboutData.paragraphs);

    if (Object.keys(validationErrors).length === 0) {
      updateAboutData({ ...aboutData });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      setErrors({});
    } else {
      setErrors(validationErrors);
      setTimeout(() => setErrors({}), 3000);
    }
  }, [aboutData, updateAboutData, validateBasicInfo]);

  // Debounced input handlers
  const handleHeadingChange = useCallback(
    debounce((value: string) => {
      updateAboutData({ heading: value });

      if (errors.heading && value.trim() && value.length <= 100) {
        setErrors(prev => ({ ...prev, heading: undefined }));
      }
    }, 300),
    [updateAboutData, errors.heading]
  );

  const updateParagraph = useCallback(
    debounce((index: number, value: string) => {
      const updated = [...aboutData.paragraphs];
      updated[index] = value;
      updateAboutData({ paragraphs: updated });

      if (errors.paragraphs?.[index] && value.trim() && value.length <= 500) {
        setErrors(prev => {
          const newErrors = { ...prev };
          if (newErrors.paragraphs) {
            newErrors.paragraphs[index] = '';
            if (newErrors.paragraphs.every(e => !e)) {
              delete newErrors.paragraphs;
            }
          }
          return newErrors;
        });
      }
    }, 300),
    [aboutData.paragraphs, updateAboutData, errors.paragraphs]
  );

  const addParagraph = useCallback(() => {
    if (aboutData.paragraphs.length < 5) {
      updateAboutData({ paragraphs: [...aboutData.paragraphs, ''] });
    }
  }, [aboutData.paragraphs, updateAboutData]);

  const removeParagraph = useCallback((index: number) => {
    if (aboutData.paragraphs.length > 1) {
      updateAboutData({ paragraphs: aboutData.paragraphs.filter((_, i) => i !== index) });
    }
  }, [aboutData.paragraphs, updateAboutData]);

  const resetData = useCallback(() => {
    resetAboutData();
    setErrors({});
    setSaved(false);
  }, [resetAboutData]);

  const themeClasses = useMemo(() => ({
    title: theme.theme === 'light' ? 'text-gray-900' : 'text-white',
    subtitle: theme.theme === 'light' ? 'text-gray-600' : 'text-gray-400',
    label: theme.theme === 'light' ? 'text-gray-700' : 'text-gray-300',
    input: theme.theme === 'light'
      ? 'border-gray-300 bg-white text-gray-900'
      : 'border-gray-700 bg-gray-800 text-gray-200',
    container: theme.theme === 'light' ? 'bg-white/10' : 'bg-gray-800/10'
  }), [theme]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        updateAboutData({ aboutImage: result });
      };
      reader.readAsDataURL(file);
    }
  }, [updateAboutData]);

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
            Basic Information
          </h2>
          <p className={`text-base transition-colors duration-300 ${themeClasses.subtitle}`}>
            Update your heading and about paragraphs
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={resetData}
            className="btn btn-secondary flex items-center space-x-2"
            aria-label="Reset basic info to default"
          >
            <RotateCcw size={20} />
            <span>Reset</span>
          </button>
          <button
            onClick={saveBasicInfo}
            className="btn btn-primary flex items-center space-x-2"
            aria-label="Save basic info changes"
          >
            <Save size={20} />
            <span>Save</span>
          </button>
        </div>
      </div>

      <div className={`glass-effect rounded-lg p-6 space-y-6 transition-colors duration-300 ${themeClasses.container}`}>
        <div>
          <label className={`block text-sm font-medium mb-1 transition-colors duration-300 ${themeClasses.label}`}>
            Heading
          </label>
          <input
            type="text"
            value={aboutData.heading}
            onChange={(e) => handleHeadingChange(e.target.value)}
            className={`w-full px-4 py-2 border rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors duration-300 ${themeClasses.input} ${errors.heading ? 'border-red-500' : ''}`}
            aria-invalid={errors.heading ? 'true' : 'false'}
            aria-describedby={errors.heading ? 'heading-error' : undefined}
            maxLength={100}
            placeholder="Enter your main heading"
          />
          {errors.heading && (
            <p id="heading-error" className="text-red-500 text-sm mt-1">
              {errors.heading}
            </p>
          )}
          <p className={`text-xs mt-1 transition-colors duration-300 ${themeClasses.subtitle}`}>
            {aboutData.heading.length}/100 characters
          </p>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-1 transition-colors duration-300 ${themeClasses.label}`}>
            Mission Statement
          </label>
          <textarea
            value={aboutData.missionStatement || ''}
            onChange={(e) => updateAboutData({ missionStatement: e.target.value })}
            className={`w-full px-4 py-2 border rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors duration-300 ${themeClasses.input}`}
            rows={2}
            placeholder="Your professional mission..."
          />
          <p className={`text-xs mt-1 transition-colors duration-300 ${themeClasses.subtitle}`}>
            Displayed at the bottom of the About section.
          </p>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-1 transition-colors duration-300 ${themeClasses.label}`}>
            About Image
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={aboutData.aboutImage}
              onChange={(e) => updateAboutData({ aboutImage: e.target.value })}
              className={`flex-1 px-4 py-2 border rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors duration-300 ${themeClasses.input}`}
              placeholder="URL or upload an image"
            />
            <input
              type="file"
              ref={inputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 font-bold text-sm"
            >
              <Plus size={16} /> Upload
            </button>
          </div>
          <p className={`text-xs mt-1 transition-colors duration-300 ${themeClasses.subtitle}`}>
            Displayed in the About section alongside your bio.
          </p>
          {aboutData.aboutImage && (
            <div className="mt-2 relative inline-block">
              <img src={aboutData.aboutImage} alt="About Preview" className="w-32 h-32 rounded-lg object-cover border-2 border-blue-500" />
              <button
                type="button"
                onClick={() => updateAboutData({ aboutImage: '' })}
                className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 shadow-lg"
              >
                <Trash2 size={12} />
              </button>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className={`block text-sm font-medium transition-colors duration-300 ${themeClasses.label}`}>
              Highlights (Quick skills)
            </label>
            <button
              onClick={() => updateAboutData({ highlights: [...aboutData.highlights, ''] })}
              className="btn btn-secondary flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Add</span>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {aboutData.highlights.map((h, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={h}
                  onChange={(e) => {
                    const newHighlights = [...aboutData.highlights];
                    newHighlights[i] = e.target.value;
                    updateAboutData({ highlights: newHighlights });
                  }}
                  className={`flex-1 px-4 py-2 border rounded-md transition-colors duration-300 ${themeClasses.input}`}
                  placeholder="e.g. Flutter"
                />
                <button
                  onClick={() => updateAboutData({ highlights: aboutData.highlights.filter((_, idx) => idx !== i) })}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-4 transition-colors duration-300 ${themeClasses.label}`}>
            Stats Counter
          </label>
          <div className="space-y-4">
            {aboutData.stats.map((s, i) => (
              <div key={i} className="grid grid-cols-2 gap-4 p-4 rounded-xl border border-dashed border-gray-300">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-400">Label</label>
                  <input
                    type="text"
                    value={s.label}
                    onChange={(e) => {
                      const newStats = [...aboutData.stats];
                      newStats[i] = { ...newStats[i], label: e.target.value };
                      updateAboutData({ stats: newStats });
                    }}
                    className={`w-full px-4 py-2 border rounded-md transition-colors duration-300 ${themeClasses.input}`}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-400">Value</label>
                  <input
                    type="text"
                    value={s.value}
                    onChange={(e) => {
                      const newStats = [...aboutData.stats];
                      newStats[i] = { ...newStats[i], value: e.target.value };
                      updateAboutData({ stats: newStats });
                    }}
                    className={`w-full px-4 py-2 border rounded-md transition-colors duration-300 ${themeClasses.input}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className={`block text-sm font-medium transition-colors duration-300 ${themeClasses.label}`}>
              About Paragraphs (max 5)
            </label>
            <button
              onClick={addParagraph}
              className={`btn btn-secondary flex items-center space-x-2 ${aboutData.paragraphs.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              aria-label="Add new paragraph"
              disabled={aboutData.paragraphs.length >= 5}
            >
              <Plus size={16} />
              <span>Add</span>
            </button>
          </div>

          {aboutData.paragraphs.map((p, i) => (
            <div key={i} className="relative mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-medium ${themeClasses.label}`}>
                  Paragraph {i + 1}
                </span>
                <span className={`text-xs ${themeClasses.subtitle}`}>
                  {p.length}/500 characters
                </span>
              </div>
              <textarea
                value={p}
                onChange={(e) => updateParagraph(i, e.target.value)}
                className={`w-full px-4 py-2 border rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors duration-300 ${themeClasses.input} ${errors.paragraphs?.[i] ? 'border-red-500' : ''}`}
                rows={3}
                aria-invalid={errors.paragraphs?.[i] ? 'true' : 'false'}
                aria-describedby={errors.paragraphs?.[i] ? `paragraph-error-${i}` : undefined}
                maxLength={500}
                placeholder={`Enter paragraph ${i + 1} content...`}
              />
              {aboutData.paragraphs.length > 1 && (
                <button
                  onClick={() => removeParagraph(i)}
                  className="absolute top-8 right-2 p-1 text-red-500 hover:text-red-600 hover-glow"
                  aria-label={`Remove paragraph ${i + 1}`}
                >
                  <Trash2 size={16} />
                </button>
              )}
              {errors.paragraphs?.[i] && (
                <p id={`paragraph-error-${i}`} className="text-red-500 text-sm mt-1">
                  {errors.paragraphs[i]}
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
            Basic information saved successfully!
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AboutForm1;