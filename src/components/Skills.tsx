import { useEffect, useRef, useState } from 'react';
import { useData } from '../context/DataContext';
import { Code, Palette, Database, Globe, Smartphone, Zap } from 'lucide-react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
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
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              My <span className="text-blue-600">Skills</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
              Here are the technologies and tools I work with to bring ideas to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skillCategories).map(([categoryName, categorySkills], categoryIndex) => {
              const CategoryIcon = getCategoryIcon(categoryName);
              const color = getCategoryColor(categoryIndex);
              const colorClasses = getColorClasses(color);
              
              return (
                <div
                  key={categoryName}
                  className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 border border-gray-100 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${categoryIndex * 200}ms` }}
                >
                  <div className="flex items-center mb-6">
                    <div className={`p-3 ${colorClasses.bg} rounded-lg mr-4`}>
                      <CategoryIcon size={24} className={colorClasses.text} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{categoryName}</h3>
                  </div>

                  <div className="space-y-4">
                    {categorySkills.map((skill, skillIndex) => (
                      <div key={skill.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                          <span className="text-sm font-bold text-gray-900">{skill.level}%</span>
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
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {skills.length > 0 && (
            <div className={`mt-16 text-center transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
              
            </div>
          )}
          
          {skills.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Code size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No skills added yet</h3>
              <p className="text-gray-600 mb-4">
                Skills will appear here once they are added through the admin panel.
              </p>
              
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;