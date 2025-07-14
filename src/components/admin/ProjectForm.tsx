import React, { useState, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { Project } from '../../types';
import { X, Upload, Video, Github, ExternalLink } from 'lucide-react';

interface ProjectFormProps {
  project?: Project | null;
  onClose: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onClose }) => {
  const { addProject, updateProject } = useData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    longDescription: project?.longDescription || '',
    image: project?.image || '',
    videoUrl: project?.videoUrl || '',
    technologies: project?.technologies || [],
    features: project?.features || [],
    githubUrl: project?.githubUrl || '',
    liveUrl: project?.liveUrl || '',
    category: project?.category || '',
    status: project?.status || 'planned' as const,
    startDate: project?.startDate || '',
    endDate: project?.endDate || '',
  });
  const [newTechnology, setNewTechnology] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [imagePreview, setImagePreview] = useState(project?.image || '');
  const [videoUrl, setVideoUrl] = useState<string | null>(project?.videoUrl || null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setVideoUrl(videoUrl);
      setFormData(prev => ({ ...prev, videoUrl }));
    }
  };

  const addTechnology = () => {
    if (newTechnology.trim() && !formData.technologies.includes(newTechnology.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()],
      }));
      setNewTechnology('');
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech),
    }));
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature),
    }));
  };

  const validateFormData = (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!data.title.trim()) throw new Error('Project Title is required');
    if (!data.description.trim()) throw new Error('Short Description is required');
    if (!data.category.trim()) throw new Error('Category is required');
    if (!data.githubUrl.trim()) throw new Error('GitHub URL is required');
    if (!data.startDate) throw new Error('Start Date is required');
    return data;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedData = validateFormData(formData);
      if (project) {
        updateProject(project.id, validatedData);
      } else {
        addProject(validatedData);
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save project');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">
            {project ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
            aria-label="Close form"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 text-red-800 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Portfolio Website"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
                  required
                  aria-required="true"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Category *
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="e.g., Web App, Mobile App, API"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
                  required
                  aria-required="true"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                >
                  <option value="planned">Planned</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Project Image
                </label>
                <div className="space-y-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 text-gray-900"
                  >
                    <Upload size={20} className="text-gray-600" />
                    <span>Upload Image</span>
                  </button>
                  {imagePreview && (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Project preview"
                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview('');
                          setFormData(prev => ({ ...prev, image: '' }));
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                        aria-label="Remove image"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Demo Video (Admin Only)
                </label>
                <div className="space-y-2">
                  <input
                    type="file"
                    ref={videoInputRef}
                    onChange={handleVideoUpload}
                    accept="video/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => videoInputRef.current?.click()}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 text-gray-900"
                  >
                    <Video size={20} className="text-gray-600" />
                    <span>Upload Video</span>
                  </button>
                  {videoUrl && (
                    <div className="relative">
                      <video
                        src={videoUrl}
                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                        controls
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setVideoUrl(null);
                          setFormData(prev => ({ ...prev, videoUrl: '' }));
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                        aria-label="Remove video"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setVideoModalOpen(true)}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 font-medium"
                    disabled={!videoUrl}
                    aria-label="View video"
                  >
                    View Video
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Short Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              placeholder="Briefly describe the project..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
              required
              aria-required="true"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Detailed Description
            </label>
            <textarea
              name="longDescription"
              value={formData.longDescription}
              onChange={handleInputChange}
              rows={5}
              placeholder="Provide a detailed description of the project, its goals, and outcomes..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                GitHub URL *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Github size={20} className="text-gray-600" />
                </div>
                <input
                  type="url"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleInputChange}
                  placeholder="https://github.com/username/repo"
                  className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
                  required
                  aria-required="true"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Live Demo URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ExternalLink size={20} className="text-gray-600" />
                </div>
                <input
                  type="url"
                  name="liveUrl"
                  value={formData.liveUrl}
                  onChange={handleInputChange}
                  placeholder="https://your-project.com"
                  className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Technologies Used
            </label>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newTechnology}
                  onChange={e => setNewTechnology(e.target.value)}
                  placeholder="Add technology"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
                  onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                />
                <button
                  type="button"
                  onClick={addTechnology}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 font-medium"
                  aria-label="Add technology"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map(tech => (
                  <span
                    key={tech}
                    className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-50 text-blue-800 rounded-lg border border-blue-200"
                  >
                    <span>{tech}</span>
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                      aria-label={`Remove technology: ${tech}`}
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Key Features
            </label>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={e => setNewFeature(e.target.value)}
                  placeholder="Add feature"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
                  onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 font-medium"
                  aria-label="Add feature"
                >
                  Add
                </button>
              </div>
              <div className="space-y-1">
                {formData.features.map(feature => (
                  <div
                    key={feature}
                    className="flex items-center justify-between p-2 bg-blue-50 rounded-lg border border-blue-200"
                  >
                    <span className="text-blue-800 text-sm">{feature}</span>
                    <button
                      type="button"
                      onClick={() => removeFeature(feature)}
                      className="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                      aria-label={`Remove feature: ${feature}`}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Preview</h3>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-start space-x-3 mb-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Upload size={16} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{formData.title || 'Project Title'}</h4>
                  <p className="text-blue-600 font-medium">{formData.category || 'Category'}</p>
                  <p className="text-sm text-gray-600">{formData.status}</p>
                </div>
              </div>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Project preview"
                  className="w-full h-32 object-cover rounded-lg mb-3 border border-gray-200"
                />
              )}
              {formData.description && (
                <p className="text-gray-900 text-sm mb-3">{formData.description}</p>
              )}
              {formData.technologies.length > 0 && (
                <div className="mb-3">
                  <h5 className="text-sm font-medium text-gray-900 mb-1">Technologies:</h5>
                  <div className="flex flex-wrap gap-2">
                    {formData.technologies.map(tech => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-blue-50 text-blue-800 rounded-lg text-sm border border-blue-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {formData.features.length > 0 && (
                <div>
                  <h5 className="text-sm font-medium text-gray-900 mb-1">Features:</h5>
                  <ul className="space-y-1">
                    {formData.features.map(feature => (
                      <li key={feature} className="flex items-start space-x-2 text-sm text-gray-900">
                        <div className="w-1 h-1 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 font-medium"
              aria-label="Cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 font-medium"
              aria-label={project ? 'Update project' : 'Add project'}
            >
              {project ? 'Update Project' : 'Add Project'}
            </button>
          </div>
        </form>

        {videoModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 max-w-2xl w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-900">Project Video</h2>
                <button
                  onClick={() => setVideoModalOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                  aria-label="Close video modal"
                >
                  <X size={20} />
                </button>
              </div>
              {videoUrl ? (
                <video src={videoUrl} controls className="w-full rounded-lg border border-gray-200" autoPlay />
              ) : (
                <div className="text-center py-8 text-gray-600">
                  <p>No video available for this project</p>
                </div>
              )}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setVideoModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 font-medium"
                  aria-label="Close"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectForm;
