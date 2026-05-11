import React, { useState, useEffect } from 'react';
import { useData } from '../../../context/DataContext';
import { Save, Plus, Trash2, Link as LinkIcon, User, Image as ImageIcon, FileText, MapPin, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const PortfolioInfoForm = () => {
  const { portfolioInfo, updatePortfolioInfo } = useData();
  const [formData, setFormData] = useState(portfolioInfo);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    setFormData(portfolioInfo);
  }, [portfolioInfo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (index: number, value: string) => {
    const newRoles = [...formData.roles];
    newRoles[index] = value;
    setFormData(prev => ({ ...prev, roles: newRoles }));
  };

  const addRole = () => {
    setFormData(prev => ({ ...prev, roles: [...prev.roles, ''] }));
  };

  const removeRole = (index: number) => {
    setFormData(prev => ({ ...prev, roles: prev.roles.filter((_, i) => i !== index) }));
  };

  const handleSocialChange = (index: number, field: 'platform' | 'url', value: string) => {
    const newSocialLinks = [...formData.socialLinks];
    newSocialLinks[index] = { ...newSocialLinks[index], [field]: value };
    setFormData(prev => ({ ...prev, socialLinks: newSocialLinks }));
  };

  const addSocial = () => {
    setFormData(prev => ({ ...prev, socialLinks: [...prev.socialLinks, { platform: '', url: '' }] }));
  };

  const removeSocial = (index: number) => {
    setFormData(prev => ({ ...prev, socialLinks: prev.socialLinks.filter((_, i) => i !== index) }));
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData(prev => ({ ...prev, profileImage: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    try {
      await updatePortfolioInfo(formData);
      setMessage({ type: 'success', text: 'Portfolio information updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update portfolio information.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <User size={16} /> Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <ImageIcon size={16} /> Profile Image
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              name="profileImage"
              value={formData.profileImage}
              onChange={handleInputChange}
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="URL or upload an image"
            />
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
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 font-bold text-sm"
            >
              <Plus size={16} /> Upload
            </button>
          </div>
          {formData.profileImage && (
            <div className="mt-2 relative inline-block">
              <img src={formData.profileImage} alt="Profile Preview" className="w-20 h-20 rounded-full object-cover border-2 border-blue-500" />
              <button 
                type="button" 
                onClick={() => setFormData(prev => ({ ...prev, profileImage: '' }))}
                className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 shadow-lg"
              >
                <Trash2 size={12} />
              </button>
            </div>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <FileText size={16} /> Resume PDF URL
          </label>
          <input
            type="text"
            name="resumeUrl"
            value={formData.resumeUrl}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="/resume.pdf or external URL"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <MapPin size={16} /> Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <Mail size={16} /> Contact Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <Phone size={16} /> Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Roles Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-gray-700">Display Roles (Typing Animation)</label>
          <button
            type="button"
            onClick={addRole}
            className="flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Plus size={14} /> Add Role
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {formData.roles.map((role, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={role}
                onChange={(e) => handleRoleChange(index, e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. Flutter Developer"
              />
              <button
                type="button"
                onClick={() => removeRole(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Social Links Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-gray-700">Social Links</label>
          <button
            type="button"
            onClick={addSocial}
            className="flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Plus size={14} /> Add Social
          </button>
        </div>
        <div className="space-y-4">
          {formData.socialLinks.map((social, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={social.platform}
                  onChange={(e) => handleSocialChange(index, 'platform', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  placeholder="Platform (e.g. Github)"
                />
              </div>
              <div className="flex-[2] space-y-2">
                <input
                  type="url"
                  value={social.url}
                  onChange={(e) => handleSocialChange(index, 'url', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  placeholder="URL"
                />
              </div>
              <button
                type="button"
                onClick={() => removeSocial(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors self-end sm:self-center"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl font-bold ${
            message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}
        >
          {message.text}
        </motion.div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-3"
      >
        {isSubmitting ? 'Saving...' : (
          <>
            <Save size={20} />
            Save Changes
          </>
        )}
      </button>
    </form>
  );
};

export default PortfolioInfoForm;
