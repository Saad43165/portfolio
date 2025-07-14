import React, { useEffect, useState } from 'react';
import { ChevronDown, Github, Linkedin, Download, Instagram, Mail, Code } from 'lucide-react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const titles = [
    'Software Engineering Student',
    'Android Developer',
    'Flutter Developer',
    'Java Developer',
    'Full Stack Developer'
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const currentTitle = titles[currentIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentTitle.length) {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        {/* Primary gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        
        {/* Gradient overlay without pulse */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-purple-100/20 to-pink-100/20"></div>
        
        {/* Dot pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.03%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-60"></div>
        
        {/* Enhanced floating elements */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-5 h-5 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 left-1/6 w-2 h-2 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/5 right-1/5 w-4 h-4 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '2.5s' }}></div>
      </div>

      <div className={`relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Enhanced Profile Image */}
        <div className="mb-8 animate-fadeInUp">
          <div className="relative inline-block">
            {/* Animated gradient border */}
            <div className="w-36 h-36 mx-auto bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full p-1 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-full overflow-hidden relative">
                <img
                  src="/image.png"
                  alt="Saad Ikram - Software Engineering Student"
                  className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const nextSibling = (e.target as HTMLImageElement).nextElementSibling as HTMLElement | null;
                    if (nextSibling) {
                      nextSibling.style.display = 'flex';
                    }
                  }}
                />
                {/* Fallback if image fails to load */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full hidden items-center justify-center">
                  <Code size={48} className="text-white" />
                </div>
              </div>
            </div>

            {/* Glowing background without pulse */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-20"></div>
            
            {/* Rotating ring */}
            <div className="absolute -inset-2 rounded-full border-2 border-gradient-to-r from-blue-500 to-purple-600 opacity-30 animate-spin" style={{ animationDuration: '3s' }}></div>
          </div>
        </div>

        {/* Enhanced Main Content */}
        <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Saad Ikram
            </span>
          </h1>
          
          <div className="h-16 mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-medium text-gray-700">
              I'm a{' '}
              <span className="text-blue-600 border-r-2 border-blue-600 min-h-[1.2em] inline-block">
                {displayText}
              </span>
            </h2>
          </div>

          <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Software Engineering student at{' '}
            <span className="font-semibold text-gray-700">Pak Austria Fachhochschule Institute of Applied Sciences and Technology</span>, Haripur. 
            Passionate about creating innovative digital solutions and bringing ideas to life through code.
          </p>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="#projects" className="group">
              <button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 hover:from-blue-700 hover:to-purple-700">
                <span>View My Work</span>
                <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform duration-300" />
              </button>
            </a>
            
            <a
              href="/Saad_Ikram_Resume.pdf"
              download="Saad_Ikram_Resume.pdf"
              className="group w-full sm:w-auto"
            >
              <button className="w-full bg-white text-gray-800 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-gray-200 hover:border-blue-300 flex items-center justify-center space-x-2 hover:bg-gray-50">
                <Download size={20} className="group-hover:translate-y-1 transition-transform duration-300" />
                <span>Download Resume</span>
              </button>
            </a>
          </div>

          {/* Enhanced Social Links */}
          <div className="flex justify-center space-x-4 sm:space-x-6">
            {[
              {
                Icon: Github,
                href: 'https://github.com/Saad43165',
                label: 'GitHub',
                color: 'hover:text-gray-800 hover:bg-gray-100'
              },
              {
                Icon: Linkedin,
                href: 'https://linkedin.com/in/saadikram',
                label: 'LinkedIn',
                color: 'hover:text-blue-600 hover:bg-blue-50'
              },
              {
                Icon: Instagram,
                href: 'https://www.instagram.com/the__bluesss',
                label: 'Instagram',
                color: 'hover:text-pink-600 hover:bg-pink-50'
              },
              {
                Icon: Mail,
                href: 'mailto:saadikram@example.com',
                label: 'Email',
                color: 'hover:text-green-600 hover:bg-green-50'
              }
            ].map(({ Icon, href, label, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group p-3 bg-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 text-gray-600 ${color}`}
                aria-label={label}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm text-gray-500 font-medium">Scroll to explore</span>
          <ChevronDown size={24} className="text-gray-400" />
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Hero;