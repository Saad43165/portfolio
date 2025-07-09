import React, { useEffect, useState } from 'react';
import { ChevronDown, Github, Linkedin, Download } from 'lucide-react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const titles = [
    'Software Engineering Student',
    'Android Developer',
    'Flutter Developer',
    'Java Developer',
    'Full Stack Developer'
  ];

  useEffect(() => {
    const currentTitle = titles[currentIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentTitle.length) {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
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
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-5 h-5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Profile Image */}
      <div className="mb-8 animate-fadeInUp">
  <div className="relative inline-block">
    {/* Gradient Border */}
    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-1 shadow-xl">
      <div className="w-full h-full bg-gray-200 rounded-full overflow-hidden">
        <img
          src="/image.png" // ✅ Ensure this path is correct and image is inside public/
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
    </div>

    {/* Glowing background - no animation now */}
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-20"></div>
  </div>
</div>



        {/* Main Content */}
        <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Saad Ikram
            </span>
          </h1>
          
          <div className="h-16 mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-700">
              I'm a{' '}
              <span className="text-blue-600 border-r-2 border-blue-600 animate-pulse">
                {displayText}
              </span>
            </h2>
          </div>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Software Engineering student at Pak Austria Fachhochschule Institute of Applied Sciences and Technology, Haripur. 
            Passionate about creating innovative digital solutions and bringing ideas to life through code.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="#projects">
    <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
      <span>View My Work</span>
      <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform duration-300" />
    </button>
  </a>
            
<a
  href="/Saad_Ikram_Resume.pdf"
  download="Saad_Ikram_Resume.pdf"
  className="group bg-white text-gray-800 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-gray-200 hover:border-blue-300 flex items-center justify-center space-x-2"
>
  <Download size={20} className="group-hover:translate-y-1 transition-transform duration-300" />
  <span>Download Resume</span>
</a>

          </div>

         {/* Social Links */}
<div className="flex justify-center space-x-6">
  {[
    {
      Icon: Github,
      href: 'https://github.com/Saad43165',
      label: 'GitHub',
    },
    {
      Icon: Linkedin,
      href: 'https://linkedin.com/in/saadikram',
      label: 'LinkedIn',
    },
  
    {
      Icon: () => (
        <img
          src="/instagram.svg" // ✅ Place an Instagram SVG or icon in public/ folder
          alt="Instagram"
          className="w-6 h-6"
        />
      ),
      href: 'https://www.instagram.com/the__bluesss',
      label: 'Instagram',
    },
  ].map(({ Icon, href, label }) => (
    <a
      key={label}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group p-3 bg-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 text-gray-600 hover:text-blue-600"
      aria-label={label}
    >
      <Icon />
    </a>
  ))}
</div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown size={32} className="text-gray-400" />
      </div>
    </section>
  );
};

export default Hero;