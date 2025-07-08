import React, { useEffect, useRef, useState } from 'react';
import { Award, Coffee, Users, Calendar } from 'lucide-react';

const About = () => {
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

  const stats = [
    { icon: Award, value: '10+', label: 'Projects Completed' },
    { icon: Coffee, value: '500+', label: 'Cups of Coffee' },
    { icon: Users, value: '5+', label: 'Team Projects' },
    { icon: Calendar, value: '2+', label: 'Years Learning' },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              About <span className="text-blue-600">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className={`space-y-6 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                I'm a passionate Computer Science student who loves creating digital experiences
              </h3>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Currently pursuing my degree in Computer Science at Pak Austria Fachhochschule Institute of Applied Sciences and Technology, Haripur. 
                I specialize in creating modern, responsive, and user-friendly applications. My journey started with a 
                curiosity about how technology works, and it has evolved into a passion for crafting innovative digital solutions.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                I believe in writing clean, maintainable code and staying up-to-date with the latest technologies. 
                Whether it's a simple web application or a complex system, I approach each project with dedication, 
                creativity, and attention to detail.
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                {['Computer Science', 'Web Development', 'Software Engineering', 'Problem Solving', 'Team Collaboration', 'Continuous Learning'].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column - Image and Stats */}
            <div className={`transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              {/* Profile Image */}
              <div className="relative mb-8">
                <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-1 shadow-2xl">
                  <div className="w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center">
                    <span className="text-6xl font-bold text-gray-600">SI</span>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 opacity-20 animate-pulse"></div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${600 + index * 100}ms` }}
                  >
                    <div className="flex justify-center mb-3">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <stat.icon size={24} className="text-blue-600" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;