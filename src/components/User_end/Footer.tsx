import { useState, useEffect } from 'react';
import { Github, Linkedin, Instagram, ChevronUp, Mail, MapPin,  } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
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

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/Saad43165',
      label: 'GitHub',
      color: 'hover:text-gray-300 hover:bg-gray-700'
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/saadikram',
      label: 'LinkedIn',
      color: 'hover:text-blue-400 hover:bg-blue-500/10'
    },
    {
      icon: Instagram,
      href: 'https://www.instagram.com/the__bluesss',
      label: 'Instagram',
      color: 'hover:text-pink-500 hover:bg-pink-500/10'
    },
    {
      icon: Mail,
      href: 'mailto:saadnaz43165@gmail.com',
      label: 'Email',
      color: 'hover:text-emerald-400 hover:bg-emerald-500/10'
    }
  ];

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
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_35%,rgba(255,255,255,0.01)_50%,transparent_65%)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Profile Section - Takes more space */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Saad Ikram
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              <p className="text-lg text-slate-300 leading-relaxed max-w-md">
                Passionate Flutter Developer focused on crafting exceptional mobile experiences with performance and elegant design.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-400 group">
                <div className="p-2 rounded-lg bg-slate-800/50 group-hover:bg-slate-700/50 transition-colors">
                  <Mail size={16} className="text-emerald-400" />
                </div>
                <a 
                  href="mailto:saadnaz43165@gmail.com" 
                  className="hover:text-emerald-400 transition-colors"
                >
                  saadnaz43165@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <div className="p-2 rounded-lg bg-slate-800/50">
                  <MapPin size={16} className="text-blue-400" />
                </div>
                <span>Chakwal, Punjab, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h4 className="text-xl font-semibold mb-6 text-slate-200">Quick Navigation</h4>
              <div className="grid grid-cols-2 gap-2">
                {quickLinks.map((link) => (
                  <button
                    key={link.to}
                    onClick={() => scrollToSection(link.to)}
                    className="group text-left p-3 rounded-lg hover:bg-slate-800/50 transition-all duration-200 text-slate-400 hover:text-white"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <span className="text-sm font-medium">{link.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h4 className="text-xl font-semibold mb-6 text-slate-200">Let's Connect</h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`group relative p-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 ${social.color}`}
                  >
                    <social.icon size={20} className="transition-transform group-hover:scale-110" />
                    
                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {social.label}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
              <h5 className="text-sm font-semibold text-blue-400 mb-2">Ready to collaborate?</h5>
              <p className="text-xs text-slate-400 mb-3">Let's build something amazing together!</p>
              <a 
                href="mailto:saadnaz43165@gmail.com"
                className="inline-flex items-center gap-2 text-xs font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-1.5 rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all"
              >
                <Mail size={12} />
                Get in Touch
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-slate-700/50">
          <div className="flex items-center gap-4 text-slate-400 text-sm">
            <p>© {year} Saad Ikram. All rights reserved.</p>
            <div className="hidden sm:block w-1 h-1 bg-slate-600 rounded-full"></div>
            <p className="hidden sm:block">Built with React & Tailwind</p>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className={`group flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 hover:text-white transition-all duration-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
            }`}
          >
            <ChevronUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
            <span className="text-sm font-medium">Back to Top</span>
          </button>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
    </footer>
  );
};

export default Footer;