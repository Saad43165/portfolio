import { useState, useEffect, useContext } from 'react';
import { Github, Linkedin, Instagram, ChevronUp, Mail, MapPin, Twitter, ExternalLink } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from './PortfolioLayout';

const Footer = () => {
  const { portfolioInfo } = useData();
  const theme = useContext(ThemeContext);
  const year = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github': return Github;
      case 'linkedin': return Linkedin;
      case 'instagram': return Instagram;
      case 'twitter': return Twitter;
      default: return Mail;
    }
  };

  const quickLinks = [
    { label: 'Home', to: 'home' },
    { label: 'About', to: 'about' },
    { label: 'Experience', to: 'experience' },
    { label: 'Education', to: 'education' },
    { label: 'Skills', to: 'skills' },
    { label: 'Projects', to: 'projects' },
    { label: 'Contact', to: 'contact' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const target = element.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  };

  return (
    <footer className={`relative overflow-hidden transition-colors duration-500 border-t ${
      theme.theme === 'light' 
        ? 'bg-white border-gray-100' 
        : 'bg-gray-950 border-white/5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className={`text-3xl font-black tracking-tight ${
                theme.theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                {portfolioInfo.name}
              </h3>
              <p className={`text-lg font-medium leading-relaxed max-w-md ${
                theme.theme === 'light' ? 'text-gray-500' : 'text-gray-400'
              }`}>
                {portfolioInfo.roles[0] || 'Software Engineer'} focused on crafting exceptional digital experiences with high performance and elegant design.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {portfolioInfo.socialLinks.map((social) => {
                const Icon = getSocialIcon(social.platform);
                return (
                  <motion.a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    whileHover={{ y: -5 }}
                    className={`p-4 rounded-2xl border transition-all ${
                      theme.theme === 'light'
                        ? 'bg-gray-50 border-gray-100 text-gray-600 hover:text-blue-600 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-500/5'
                        : 'bg-gray-900 border-white/5 text-gray-400 hover:text-blue-400 hover:border-white/10'
                    }`}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div className="space-y-8">
              <h4 className={`text-xs font-black uppercase tracking-[0.3em] ${
                theme.theme === 'light' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Navigation
              </h4>
              <ul className="space-y-4">
                {quickLinks.slice(0, 4).map((link) => (
                  <li key={link.to}>
                    <button
                      onClick={() => scrollToSection(link.to)}
                      className={`text-sm font-black uppercase tracking-widest transition-colors ${
                        theme.theme === 'light' ? 'text-gray-600 hover:text-blue-600' : 'text-gray-400 hover:text-blue-400'
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-8 pt-12">
              <ul className="space-y-4">
                {quickLinks.slice(4).map((link) => (
                  <li key={link.to}>
                    <button
                      onClick={() => scrollToSection(link.to)}
                      className={`text-sm font-black uppercase tracking-widest transition-colors ${
                        theme.theme === 'light' ? 'text-gray-600 hover:text-blue-600' : 'text-gray-400 hover:text-blue-400'
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA Column */}
          <div className="lg:col-span-3 space-y-8">
            <h4 className={`text-xs font-black uppercase tracking-[0.3em] ${
              theme.theme === 'light' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Office
            </h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-blue-600 mt-1" />
                <p className={`text-sm font-black uppercase tracking-widest leading-loose ${
                  theme.theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {portfolioInfo.location}
                </p>
              </div>
              <motion.a
                whileHover={{ x: 5 }}
                href={`mailto:${portfolioInfo.email}`}
                className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-blue-600"
              >
                Let's Talk <ExternalLink size={14} />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-12 border-t flex flex-col md:flex-row justify-between items-center gap-8 ${
          theme.theme === 'light' ? 'border-gray-100' : 'border-white/5'
        }`}>
          <div className={`text-[10px] font-black uppercase tracking-[0.2em] ${
            theme.theme === 'light' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            © {year} {portfolioInfo.name}. All Rights Reserved.
          </div>

          <AnimatePresence>
            {isVisible && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                onClick={scrollToTop}
                className={`flex items-center gap-3 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  theme.theme === 'light'
                    ? 'bg-gray-100 text-gray-900 hover:bg-gray-200 shadow-sm'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                Back To Top <ChevronUp size={16} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </footer>
  );
};

export default Footer;