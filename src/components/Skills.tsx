import React, { useEffect, useRef, useState } from 'react';
import { useData } from '../context/DataContext';
import { Code, Palette, Database, Globe, Smartphone, Zap, Clock } from 'lucide-react';

const Skills = () => {
  const [, setIsVisible] = useState(false);
  const [animatedBars, setAnimatedBars] = useState(false);
  const { skills } = useData();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setAnimatedBars(true), 500);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Group skills by category
  const skillCategories = skills.reduce((acc, skill) => {
    const category = skill.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'frontend development':
      case 'frontend':
        return Code;
      case 'backend development':
      case 'backend':
      case 'database':
        return Database;
      case 'mobile development':
      case 'mobile':
        return Smartphone;
      case 'design':
        return Palette;
      case 'devops':
        return Globe;
      default:
        return Zap;
    }
  };

  const getCategoryColor = (index: number) => {
    const colors = ['blue', 'purple', 'green', 'orange', 'pink', 'indigo'];
    return colors[index % colors.length];
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        gradient: 'from-blue-500 to-blue-600',
        ring: 'ring-blue-100'
      },
      purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-600',
        gradient: 'from-purple-500 to-purple-600',
        ring: 'ring-purple-100'
      },
      green: {
        bg: 'bg-green-100',
        text: 'text-green-600',
        gradient: 'from-green-500 to-green-600',
        ring: 'ring-green-100'
      },
      orange: {
        bg: 'bg-orange-100',
        text: 'text-orange-600',
        gradient: 'from-orange-500 to-orange-600',
        ring: 'ring-orange-100'
      },
      pink: {
        bg: 'bg-pink-100',
        text: 'text-pink-600',
        gradient: 'from-pink-500 to-pink-600',
        ring: 'ring-pink-100'
      },
      indigo: {
        bg: 'bg-indigo-100',
        text: 'text-indigo-600',
        gradient: 'from-indigo-500 to-indigo-600',
        ring: 'ring-indigo-100'
      }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getLevelText = (level: number) => {
    if (level >= 90) return 'Expert';
    if (level >= 70) return 'Advanced';
    if (level >= 50) return 'Intermediate';
    return 'Beginner';
  };

  const getLevelColor = (level: number) => {
    if (level >= 90) return 'bg-green-100 text-green-800';
    if (level >= 70) return 'bg-blue-100 text-blue-800';
    if (level >= 50) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 mx-auto">
            <Code size={32} className="text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Skills</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            My expertise across different technologies and programming domains
          </p>
        </div>

        {skills.length > 0 ? (
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/20 via-purple-500/50 to-blue-500/20 transform -translate-x-1/2"></div>
            
            <div className="space-y-8 md:space-y-12">
              {Object.entries(skillCategories).map(([categoryName, categorySkills], categoryIndex) => {
                const CategoryIcon = getCategoryIcon(categoryName);
                const color = getCategoryColor(categoryIndex);
                const colorClasses = getColorClasses(color);

                return (
                  <div 
                    key={categoryName} 
                    className={`relative group ${categoryIndex % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}
                    data-aos="fade-up"
                    data-aos-delay={categoryIndex * 100}
                  >
                    {/* Timeline dot */}
                    <div className={`hidden md:flex absolute top-6 ${categoryIndex % 2 === 0 ? '-right-1' : '-left-1'} items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg transform group-hover:scale-125 transition-transform duration-300`}>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>

                    <div className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1 ${categoryIndex % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 p-3 bg-blue-50 rounded-lg text-blue-600">
                          <CategoryIcon size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900">{categoryName}</h3>
                          
                          <div className="mt-4 space-y-4">
                            {categorySkills.map((skill, skillIndex) => (
                              <div key={skill.id} className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                                  <div className="flex items-center space-x-2">
                                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${getLevelColor(skill.level)}`}>
                                      {getLevelText(skill.level)}
                                    </span>
                                    <span className="text-sm font-bold text-gray-900">{skill.level}%</span>
                                  </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full bg-gradient-to-r ${colorClasses.gradient} transition-all duration-1000 ease-out`}
                                    style={{
                                      width: animatedBars ? `${skill.level}%` : '0%',
                                      transitionDelay: `${(categoryIndex * 200) + (skillIndex * 100) + 600}ms`
                                    }}
                                  ></div>
                                </div>
                                
                                {skill.yearsOfExperience > 0 && (
                                  <div className="flex items-center text-sm text-gray-600">
                                    <Clock size={14} className="mr-1" />
                                    <span>
                                      {skill.yearsOfExperience} year{skill.yearsOfExperience !== 1 ? 's' : ''} of experience
                                    </span>
                                  </div>
                                )}
                                
                                {skill.description && (
                                  <p className="text-sm text-gray-600 mt-1">{skill.description}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              )})}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <p className="text-gray-500">No skills data available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;