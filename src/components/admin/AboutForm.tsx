import { useState } from 'react';
import { Save } from 'lucide-react';

interface AboutData {
  heading: string;
  paragraphs: string[];
  highlights: string[];
  stats: { label: string; value: string }[];
}

const defaultAbout: AboutData = {
  heading: "I'm a passionate Software Engineering student who loves creating digital experiences",
  paragraphs: [
    "Currently pursuing my degree in Software Engineering at Pak Austria Fachhochschule Institute of Applied Sciences and Technology, Haripur. I specialize in creating modern, responsive, and user-friendly applications.",
    "I believe in writing clean, maintainable code and staying up-to-date with the latest technologies. Whether it's a simple web application or a complex system, I approach each project with dedication, creativity, and attention to detail.",
  ],
  highlights: ['Computer Science', 'Web Development', 'Software Engineering', 'Problem Solving'],
  stats: [
    { label: 'Projects Completed', value: '10+' },
    { label: 'Team Projects', value: '5+' },
    { label: 'Years Learning', value: '2+' },
  ],
};

const AboutForm = () => {
  const [about, setAbout] = useState<AboutData>(() => {
    const saved = localStorage.getItem('portfolio_about');
    return saved ? JSON.parse(saved) : defaultAbout;
  });

  const [saved, setSaved] = useState(false);

  const saveAbout = () => {
    localStorage.setItem('portfolio_about', JSON.stringify(about));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateParagraph = (index: number, value: string) => {
    const updated = [...about.paragraphs];
    updated[index] = value;
    setAbout({ ...about, paragraphs: updated });
  };

  const updateStat = (index: number, field: 'label' | 'value', value: string) => {
    const updated = [...about.stats];
    updated[index] = { ...updated[index], [field]: value };
    setAbout({ ...about, stats: updated });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">About Section</h2>
          <p className="text-gray-600">Update your bio, highlights, and experience stats</p>
        </div>
        <button
          onClick={saveAbout}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          <Save size={20} />
          <span>Save</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
          <input
            type="text"
            value={about.heading}
            onChange={(e) => setAbout({ ...about, heading: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Paragraphs</label>
          {about.paragraphs.map((p, i) => (
            <textarea
              key={i}
              value={p}
              onChange={(e) => updateParagraph(i, e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
              rows={3}
            />
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Highlights</label>
          <input
            type="text"
            value={about.highlights.join(', ')}
            onChange={(e) =>
              setAbout({ ...about, highlights: e.target.value.split(',').map((h) => h.trim()) })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="e.g. React, Firebase, TFLite"
          />
        </div>

        <div>
          <h4 className="text-lg font-medium text-gray-800 mb-2">Stats</h4>
          {about.stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-4 mb-2">
              <input
                type="text"
                value={stat.label}
                onChange={(e) => updateStat(i, 'label', e.target.value)}
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Label"
              />
              <input
                type="text"
                value={stat.value}
                onChange={(e) => updateStat(i, 'value', e.target.value)}
                className="w-1/3 px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Value"
              />
            </div>
          ))}
        </div>

        {saved && (
          <div className="bg-green-100 text-green-800 px-4 py-3 rounded-md text-sm">
            Changes saved successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutForm;
