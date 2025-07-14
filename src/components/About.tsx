import React, { useEffect, useRef, useContext, useState } from 'react';
import { Award, Users, Calendar, User } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { useData } from '../context/DataContext';
import { ThemeContext } from './PortfolioLayout';

const About = () => {
  const theme = useContext(ThemeContext);
  const { aboutData } = useData();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  const stats = aboutData.stats.map((stat, index) => ({
    Icon: [Award, Users, Calendar][index % 3],
    value: stat.value,
    label: stat.label,
  }));

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <motion.section
      id="about"
      ref={sectionRef}
      className={`py-20 transition-colors duration-300 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={containerVariants}
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 mx-auto">
            <User size={32} className="text-white" />
          </div>
          <h2
            id="about-heading"
            className={`text-4xl sm:text-5xl font-bold mb-4 transition-colors duration-300 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}
          >
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Me</span>
          </h2>
          <p className={`text-lg transition-colors duration-300 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
            Get to know me better
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div className="space-y-6" variants={itemVariants}>
            <h3
              className={`text-3xl font-bold transition-colors duration-300 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}
            >
              {aboutData.heading}
            </h3>
            {aboutData.paragraphs.map((para, i) => (
              <p
                key={i}
                className={`text-lg leading-relaxed transition-colors duration-300 ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                }`}
              >
                {para}
              </p>
            ))}
            <div className="flex flex-wrap gap-3 mt-8">
              {aboutData.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    theme === 'light'
                      ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                      : 'bg-blue-900/50 text-blue-200 hover:bg-blue-800/50'
                  }`}
                >
                  {highlight}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div className="space-y-8" variants={itemVariants}>
            <div className="relative w-80 h-80 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-[2px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                <div
                  className={`relative w-full h-full rounded-2xl overflow-hidden transition-colors duration-300 ${
                    theme === 'light' ? 'bg-white' : 'bg-gray-800'
                  }`}
                >
                  <img
                    src="/saad_pic.JPG"
                    alt="Profile picture of Saad Ikram"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className={`p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.03] ${
                    theme === 'light' ? 'bg-white' : 'bg-gray-800'
                  }`}
                  variants={itemVariants}
                  custom={index}
                >
                  <div className="flex justify-center mb-3">
                    <div
                      className={`p-3 rounded-full ${
                        theme === 'light' ? 'bg-blue-100' : 'bg-blue-900/50'
                      }`}
                    >
                      <stat.Icon
                        size={24}
                        className={theme === 'light' ? 'text-blue-600' : 'text-blue-400'}
                      />
                    </div>
                  </div>
                  <div
                    className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}
                  >
                    {stat.value}
                  </div>
                  <div
                    className={`text-sm transition-colors duration-300 ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;