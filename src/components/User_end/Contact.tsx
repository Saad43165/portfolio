import { useEffect, useRef, useState, useContext } from 'react';
import { useData } from '../../context/DataContext';
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  MessageCircle
} from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { ThemeContext } from './PortfolioLayout';

const Contact = () => {
  const { portfolioInfo } = useData();
  const theme = useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState(false);
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

  const getSocialLink = (platform: string) => {
    return portfolioInfo.socialLinks.find(link => link.platform.toLowerCase() === platform.toLowerCase())?.url || '#';
  };

  const phoneStr = portfolioInfo.phone || '+923145459961';
  const whatsappNumber = phoneStr.replace(/[^0-9+]/g, '');
  const whatsappMessage = encodeURIComponent("Hello! I'd like to connect with you regarding a project.");

  const contactOptions = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: 'Message Me',
      href: `https://wa.me/${whatsappNumber.replace('+', '')}?text=${whatsappMessage}`,
      color: theme.theme === 'light' ? 'bg-green-50 text-green-600' : 'bg-green-900/30 text-green-400',
      borderColor: 'hover:border-green-500/50'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Connect with me',
      href: getSocialLink('linkedin'),
      color: theme.theme === 'light' ? 'bg-blue-50 text-blue-600' : 'bg-blue-900/30 text-blue-400',
      borderColor: 'hover:border-blue-500/50'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: phoneStr,
      href: `tel:${phoneStr}`,
      color: theme.theme === 'light' ? 'bg-purple-50 text-purple-600' : 'bg-purple-900/30 text-purple-400',
      borderColor: 'hover:border-purple-500/50'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'View my work',
      href: getSocialLink('github'),
      color: theme.theme === 'light' ? 'bg-gray-100 text-gray-800' : 'bg-gray-800 text-white',
      borderColor: 'hover:border-gray-500/50'
    },
    {
      icon: Mail,
      label: 'Email',
      value: portfolioInfo.email,
      href: `mailto:${portfolioInfo.email}`,
      color: theme.theme === 'light' ? 'bg-red-50 text-red-600' : 'bg-red-900/30 text-red-400',
      borderColor: 'hover:border-red-500/50'
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.98, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.section
      id="contact"
      ref={sectionRef}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={`py-10 sm:py-16 transition-colors duration-500 relative overflow-hidden ${
        theme.theme === 'light' ? 'bg-[#f8f9ff]/50' : 'bg-transparent'
      }`}
    >
      {/* Dynamic Background Elements - Indigo Theme */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[140px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[120px] translate-y-1/3 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div className="mb-12 text-center" variants={itemVariants}>
          <div className="flex items-center gap-2 mb-4 justify-center">
            <div className="h-[2px] w-6 bg-blue-600 rounded-full" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-600">Let's Connect</span>
            <div className="h-[2px] w-6 bg-blue-600 rounded-full" />
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] mb-4 ${
              theme.theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}
          >
            Ready to <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Forge Something Great?</span>
          </h2>
          <p className={`text-base font-medium leading-relaxed max-w-xl mx-auto ${
            theme.theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            Forms are a thing of the past. Reach out directly via your preferred platform and let's start a conversation.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 justify-center"
          variants={containerVariants}
        >
          {contactOptions.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.label !== 'Phone' && item.label !== 'Email' ? '_blank' : '_self'}
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex flex-col items-center p-5 sm:p-6 rounded-2xl border transition-all duration-500 group relative overflow-hidden text-center ${
                theme.theme === 'light' 
                  ? 'bg-white border-blue-50 shadow-lg shadow-blue-500/5 hover:shadow-xl' 
                  : 'bg-gray-900/40 backdrop-blur-xl border-white/5'
              } ${item.borderColor}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${item.color} shadow-inner`}>
                <item.icon size={24} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-1">{item.label}</span>
              <span className={`text-xs sm:text-sm lg:text-xs xl:text-sm font-bold transition-colors w-full px-2 truncate ${
                theme.theme === 'light' ? 'text-gray-900' : 'text-white'
              }`} title={item.value}>
                {item.value}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;