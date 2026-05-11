import { useEffect, useRef, useState, useContext } from 'react';
import { useData } from '../../context/DataContext';
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { ThemeContext } from './PortfolioLayout';

const Contact = () => {
  const { portfolioInfo } = useData();
  const theme = useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('idle');

    if (!formData.name.trim() || !formData.email.trim() || formData.message.length < 10) {
      setFormStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      await emailjs.send(
        'service_ltxmaof',
        'template_c5cgcqd',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        '9zVe-12Cv7X-mbwHq'
      );

      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setFormStatus('error');
    }

    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: portfolioInfo.email,
      href: `mailto:${portfolioInfo.email}`,
      color: theme.theme === 'light' ? 'bg-blue-50 text-blue-600' : 'bg-blue-900/30 text-blue-400'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: portfolioInfo.phone || '03414279749',
      href: `tel:${portfolioInfo.phone || '03414279749'}`,
      color: theme.theme === 'light' ? 'bg-purple-50 text-purple-600' : 'bg-purple-900/30 text-purple-400'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: portfolioInfo.location,
      href: '#',
      color: theme.theme === 'light' ? 'bg-pink-50 text-pink-600' : 'bg-pink-900/30 text-pink-400'
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.98, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.section
      id="contact"
      ref={sectionRef}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={`py-8 sm:py-12 transition-colors duration-500 relative overflow-hidden ${
        theme.theme === 'light' ? 'bg-white' : 'bg-gray-950'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div className="mb-12" variants={itemVariants}>
          <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
            <div className="h-[2px] w-8 bg-blue-600 rounded-full" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600">Digital Gateway</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-black tracking-tight leading-[1.05] text-center lg:text-left ${
              theme.theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}
          >
            Ready to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Forge Something Great?</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column: Premium Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div className="space-y-6 text-center lg:text-left" variants={itemVariants}>
              <p className={`text-lg font-medium leading-relaxed max-w-lg mx-auto lg:mx-0 ${
                theme.theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                Whether you have a breakthrough idea or a complex engineering challenge, I'm ready to help you build the future.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-4">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  variants={itemVariants}
                  whileHover={{ x: 5, scale: 1.01 }}
                  className={`flex items-center p-5 rounded-3xl border transition-all duration-500 group relative overflow-hidden ${
                    theme.theme === 'light' 
                      ? 'bg-white border-blue-50 shadow-lg shadow-blue-500/5 hover:border-blue-200' 
                      : 'bg-gray-900/40 backdrop-blur-xl border-white/5 hover:border-blue-500/20'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mr-5 transition-all duration-500 group-hover:rotate-6 ${item.color} shadow-inner`}>
                    <item.icon size={24} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-blue-600 opacity-60 mb-1">{item.label}</span>
                    <span className={`text-base font-black transition-colors ${
                      theme.theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      {item.value}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Column: High-End Form */}
          <motion.div className="lg:col-span-7" variants={itemVariants}>
            <div className={`p-6 sm:p-10 rounded-3xl border relative overflow-hidden group/form ${
              theme.theme === 'light'
                ? 'bg-white border-blue-50 shadow-xl shadow-blue-500/10'
                : 'bg-gray-900/40 backdrop-blur-3xl border-white/5 shadow-2xl'
            }`}>
              {/* Atmospheric Background Glow */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-600/5 blur-[80px] rounded-full group-hover/form:bg-blue-600/10 transition-all duration-1000" />
              
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={`text-[9px] font-black uppercase tracking-[0.2em] ml-2 ${
                      theme.theme === 'light' ? 'text-gray-400' : 'text-gray-500'
                    }`}>Identity</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Full Name"
                      className={`w-full px-6 py-4 rounded-xl border-2 transition-all outline-none font-bold text-sm ${
                        theme.theme === 'light' 
                          ? 'bg-gray-50 border-transparent focus:bg-white focus:border-blue-600' 
                          : 'bg-white/5 border-transparent focus:bg-white/10 focus:border-blue-500 text-white'
                      }`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-[9px] font-black uppercase tracking-[0.2em] ml-2 ${
                      theme.theme === 'light' ? 'text-gray-400' : 'text-gray-500'
                    }`}>Communication</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className={`w-full px-6 py-4 rounded-xl border-2 transition-all outline-none font-bold text-sm ${
                        theme.theme === 'light' 
                          ? 'bg-gray-50 border-transparent focus:bg-white focus:border-blue-600' 
                          : 'bg-white/5 border-transparent focus:bg-white/10 focus:border-blue-500 text-white'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={`text-[9px] font-black uppercase tracking-[0.2em] ml-2 ${
                    theme.theme === 'light' ? 'text-gray-400' : 'text-gray-500'
                  }`}>Objective</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Describe your vision..."
                    className={`w-full px-6 py-4 rounded-xl border-2 transition-all outline-none font-bold text-sm resize-none ${
                      theme.theme === 'light' 
                        ? 'bg-gray-50 border-transparent focus:bg-white focus:border-blue-600' 
                        : 'bg-white/5 border-transparent focus:bg-white/10 focus:border-blue-500 text-white'
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {formStatus === 'success' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-3 text-green-600 font-bold text-sm overflow-hidden">
                      <CheckCircle size={20} />
                      <p>Transmission Complete.</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  whileHover={{ scale: 1.01, y: -1 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black uppercase tracking-[0.3em] shadow-xl shadow-blue-600/20 flex items-center justify-center gap-4 group disabled:opacity-50 transition-all"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span className="text-[11px] sm:text-xs">Transmit Message</span>
                      <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;