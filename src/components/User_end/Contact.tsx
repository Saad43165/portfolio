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
      className={`py-12 sm:py-16 transition-colors duration-500 relative overflow-hidden ${
        theme.theme === 'light' ? 'bg-white' : 'bg-gray-950'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div className="mb-10" variants={itemVariants}>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-blue-600" />
            <span className="text-xs font-black uppercase tracking-[0.4em] text-blue-600">Get In Touch</span>
          </div>
          <h2 className={`text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] ${
              theme.theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}
          >
            Let's Start a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">Conversation</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column: Info */}
          <div className="lg:col-span-5 space-y-12">
            <motion.div className="space-y-6" variants={itemVariants}>
              <h3 className={`text-3xl font-black tracking-tight ${
                theme.theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Contact Details
              </h3>
              <p className={`text-lg font-medium leading-relaxed ${
                theme.theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                Feel free to reach out for collaborations or just a friendly hello. I typically respond within 24 hours.
              </p>
            </motion.div>

            <div className="space-y-6">
              {contactInfo.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  className={`flex items-center p-4 rounded-2xl border transition-all duration-500 group ${
                    theme.theme === 'light' 
                      ? 'bg-gray-50/50 border-gray-100 hover:bg-white hover:shadow-md' 
                      : 'bg-gray-900/50 backdrop-blur-xl border-white/5 hover:bg-gray-800/80'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mr-6 transition-transform duration-500 group-hover:scale-110 ${item.color}`}>
                    <item.icon size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">{item.label}</div>
                    <div className={`text-lg font-black transition-colors ${
                      theme.theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      {item.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Column: Form */}
          <motion.div className="lg:col-span-7" variants={itemVariants}>
            <div className={`p-8 sm:p-10 rounded-3xl border relative overflow-hidden ${
              theme.theme === 'light'
                ? 'bg-white border-gray-100 shadow-2xl shadow-gray-200/40'
                : 'bg-gray-900/40 backdrop-blur-3xl border-white/5 shadow-2xl shadow-black/50'
            }`}>
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={`text-[10px] font-black uppercase tracking-[0.3em] ml-2 ${
                      theme.theme === 'light' ? 'text-gray-400' : 'text-gray-500'
                    }`}>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Full Name"
                      className={`w-full px-6 py-4 rounded-xl border-2 border-transparent transition-all outline-none font-bold ${
                        theme.theme === 'light' ? 'bg-gray-50 focus:bg-white focus:border-blue-600' : 'bg-gray-800/50 focus:bg-gray-800 focus:border-blue-500 text-white'
                      }`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-[10px] font-black uppercase tracking-[0.3em] ml-2 ${
                      theme.theme === 'light' ? 'text-gray-400' : 'text-gray-500'
                    }`}>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className={`w-full px-6 py-4 rounded-xl border-2 border-transparent transition-all outline-none font-bold ${
                        theme.theme === 'light' ? 'bg-gray-50 focus:bg-white focus:border-blue-600' : 'bg-gray-800/50 focus:bg-gray-800 focus:border-blue-500 text-white'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={`text-[10px] font-black uppercase tracking-[0.3em] ml-2 ${
                    theme.theme === 'light' ? 'text-gray-400' : 'text-gray-500'
                  }`}>Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Tell me about your project..."
                    className={`w-full px-6 py-4 rounded-xl border-2 border-transparent transition-all outline-none font-bold resize-none ${
                      theme.theme === 'light' ? 'bg-gray-50 focus:bg-white focus:border-blue-600' : 'bg-gray-800/50 focus:bg-gray-800 focus:border-blue-500 text-white'
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {formStatus === 'success' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-6 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-4 text-green-500 font-bold overflow-hidden">
                      <CheckCircle size={24} />
                      <p>Your message has been successfully transmitted!</p>
                    </motion.div>
                  )}
                  {formStatus === 'error' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4 text-red-500 font-bold overflow-hidden">
                      <AlertCircle size={24} />
                      <p>Validation failed. Please verify your inputs.</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl font-black uppercase tracking-[0.3em] shadow-xl shadow-blue-500/20 flex items-center justify-center gap-4 group disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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