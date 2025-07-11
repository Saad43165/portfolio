import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Instagram, ChevronUp, Mail } from 'lucide-react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

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
      color: 'hover:text-gray-300'
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/saadikram',
      label: 'LinkedIn',
      color: 'hover:text-blue-400'
    },
    {
      icon: Instagram,
      href: 'https://www.instagram.com/the__bluesss',
      label: 'Instagram',
      color: 'hover:text-pink-500'
    },
    {
      icon: Mail,
      href: 'mailto:your.email@example.com',
      label: 'Email',
      color: 'hover:text-red-400'
    }
  ];

  const quickLinks = [
    { label: 'Home', to: 'home' },
    { label: 'About', to: 'about' },
    { label: 'Skills', to: 'skills' },
    { label: 'Experience', to: 'experience' },
    { label: 'Education', to: 'education' },
    { label: 'Projects', to: 'projects' },
    { label: 'Contact', to: 'contact' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white pt-16 pb-8 px-6">
      <motion.div 
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Left: Profile */}
        <motion.div className="space-y-4" variants={itemVariants}>
          <h3 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Saad Ikram
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Passionate Flutter Developer, deeply focused on performance, UI/UX, and problem solving.
          </p>
       
        </motion.div>

        {/* Middle: Quick Links */}
        <motion.div className="space-y-4" variants={itemVariants}>
          <h4 className="text-xl font-semibold">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            {quickLinks.map((link) => (
              <motion.li key={link.to} variants={itemVariants}>
                <Link
                  to={link.to}
                  smooth={true}
                  duration={500}
                  spy={true}
                  offset={-80}
                  className="hover:text-white transition-colors duration-200 cursor-pointer flex items-center gap-1"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Right: Social Icons */}
        <motion.div className="space-y-4" variants={itemVariants}>
          <h4 className="text-xl font-semibold">Connect with Me</h4>
          <div className="flex justify-center md:justify-start gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300 ${social.color}`}
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>

          {/* Email Contact */}
          <div className="mt-6">
            <h5 className="text-sm font-medium text-gray-300 mb-2">Email Me</h5>
            <a 
              href="mailto:your.email@example.com" 
              className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
            >
              saadnaz43165@gmail.com
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Section */}
      <motion.div 
        className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-500 text-sm border-t border-gray-800 pt-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <p>© {year} Saad Ikram. All rights reserved.</p>

        {/* Back to top button */}
        <motion.button
          onClick={scrollToTop}
          className={`flex items-center space-x-1 hover:text-white transition-colors ${
            isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronUp size={18} />
          <span>Back to Top</span>
        </motion.button>
      </motion.div>
    </footer>
  );
};

export default Footer;