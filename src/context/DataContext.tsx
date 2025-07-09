import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, Skill, Experience, Education } from '../types';

interface DataContextType {
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  education: Education[];
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addSkill: (skill: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
  addExperience: (experience: Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  addEducation: (education: Omit<Education, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  deleteEducation: (id: string) => void;
  refreshData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

// Default sample data to demonstrate the portfolio
const defaultProjects: Project[] = [
  {
    id: 'sample-1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration.',
    longDescription: 'This comprehensive e-commerce platform demonstrates modern web development practices with a focus on user experience and scalability. Built using the MERN stack, it includes advanced features like real-time inventory management, order tracking, and admin dashboard.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'JWT'],
    features: ['User Authentication', 'Product Management', 'Shopping Cart', 'Payment Integration', 'Order Tracking', 'Admin Dashboard'],
    githubUrl: 'https://github.com/saadikram/ecommerce-platform',
    liveUrl: 'https://ecommerce-demo.netlify.app',
    category: 'Full Stack',
    status: 'completed',
    startDate: '2024-01-15',
    endDate: '2024-03-20',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'sample-2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    longDescription: 'This task management application showcases real-time collaboration features using WebSocket technology. Users can create projects, assign tasks, track progress, and communicate with team members in real-time.',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React', 'TypeScript', 'Socket.io', 'Node.js', 'PostgreSQL'],
    features: ['Real-time Updates', 'Drag & Drop', 'Team Collaboration', 'Progress Tracking', 'File Sharing'],
    githubUrl: 'https://github.com/saadikram/task-manager',
    liveUrl: 'https://taskmanager-demo.netlify.app',
    category: 'Web App',
    status: 'completed',
    startDate: '2024-02-01',
    endDate: '2024-04-15',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'sample-3',
    title: 'Weather Dashboard',
    description: 'A responsive weather dashboard that provides current weather conditions, forecasts, and interactive maps using weather APIs.',
    longDescription: 'This weather dashboard integrates multiple weather APIs to provide comprehensive weather information. Features include location-based weather, interactive maps, weather alerts, and historical data visualization.',
    image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React', 'Chart.js', 'Weather API', 'Geolocation', 'CSS3'],
    features: ['Current Weather', '7-Day Forecast', 'Interactive Maps', 'Weather Alerts', 'Location Search'],
    githubUrl: 'https://github.com/saadikram/weather-dashboard',
    liveUrl: 'https://weather-dashboard-demo.netlify.app',
    category: 'Frontend',
    status: 'completed',
    startDate: '2024-03-01',
    endDate: '2024-03-25',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const defaultSkills: Skill[] = [
  {
    id: 'skill-1',
    name: 'React',
    level: 85,
    category: 'Frontend Development',
    description: 'Experienced in building modern web applications with React, including hooks, context API, and state management.',
    yearsOfExperience: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'skill-2',
    name: 'JavaScript',
    level: 90,
    category: 'Frontend Development',
    description: 'Strong foundation in JavaScript ES6+, including async/await, destructuring, and modern JavaScript features.',
    yearsOfExperience: 2.5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'skill-3',
    name: 'Node.js',
    level: 75,
    category: 'Backend Development',
    description: 'Experience building RESTful APIs and server-side applications with Node.js and Express.',
    yearsOfExperience: 1.5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'skill-4',
    name: 'MongoDB',
    level: 70,
    category: 'Database',
    description: 'Proficient in NoSQL database design, queries, and integration with Node.js applications.',
    yearsOfExperience: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'skill-5',
    name: 'TypeScript',
    level: 80,
    category: 'Frontend Development',
    description: 'Strong typing skills with TypeScript for building scalable and maintainable applications.',
    yearsOfExperience: 1.5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'skill-6',
    name: 'Tailwind CSS',
    level: 85,
    category: 'Frontend Development',
    description: 'Expert in utility-first CSS framework for rapid UI development and responsive design.',
    yearsOfExperience: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const defaultExperiences: Experience[] = [
  {
    id: 'exp-1',
    title: 'Frontend Developer Intern',
    company: 'Tech Solutions Inc.',
    location: 'Remote',
    startDate: '2023-06-01',
    endDate: '2023-08-31',
    description: 'Worked on developing responsive web applications using React and TypeScript. Collaborated with the design team to implement pixel-perfect UI components and improved application performance by 30%.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Git', 'Figma'],
    achievements: [
      'Improved application loading speed by 30%',
      'Implemented responsive design for mobile devices',
      'Collaborated with cross-functional teams',
      'Delivered 5 major features on time'
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const defaultEducation: Education[] = [
  {
    id: 'edu-1',
    degree: 'Bachelor of Computer Science',
    institution: 'Pak Austria Fachhochschule Institute of Applied Sciences and Technology',
    location: 'Haripur, Pakistan',
    startDate: '2022-09-01',
    endDate: '',
    gpa: '3.7/4.0',
    description: 'Currently pursuing a comprehensive Computer Science degree with focus on software engineering, web development, and data structures. Active participant in coding competitions and tech societies.',
    achievements: [
      'Dean\'s List for academic excellence',
      'Winner of University Coding Competition 2023',
      'President of Computer Science Society',
      'Completed advanced courses in Data Structures and Algorithms'
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize data from localStorage or use defaults
  const initializeData = () => {
    try {
      const savedProjects = localStorage.getItem('portfolio_projects');
      const savedSkills = localStorage.getItem('portfolio_skills');
      const savedExperiences = localStorage.getItem('portfolio_experiences');
      const savedEducation = localStorage.getItem('portfolio_education');

      // Use saved data if available, otherwise use defaults
      setProjects(savedProjects ? JSON.parse(savedProjects) : defaultProjects);
      setSkills(savedSkills ? JSON.parse(savedSkills) : defaultSkills);
      setExperiences(savedExperiences ? JSON.parse(savedExperiences) : defaultExperiences);
      setEducation(savedEducation ? JSON.parse(savedEducation) : defaultEducation);

      // If no saved data exists, save the defaults
      if (!savedProjects) localStorage.setItem('portfolio_projects', JSON.stringify(defaultProjects));
      if (!savedSkills) localStorage.setItem('portfolio_skills', JSON.stringify(defaultSkills));
      if (!savedExperiences) localStorage.setItem('portfolio_experiences', JSON.stringify(defaultExperiences));
      if (!savedEducation) localStorage.setItem('portfolio_education', JSON.stringify(defaultEducation));

      setIsInitialized(true);
    } catch (error) {
      console.error('Error initializing data:', error);
      // Fallback to defaults if localStorage is corrupted
      setProjects(defaultProjects);
      setSkills(defaultSkills);
      setExperiences(defaultExperiences);
      setEducation(defaultEducation);
      setIsInitialized(true);
    }
  };

  // Load data on mount
  useEffect(() => {
    initializeData();
  }, []);

  // Save to localStorage whenever data changes (only after initialization)
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('portfolio_projects', JSON.stringify(projects));
      } catch (error) {
        console.error('Error saving projects:', error);
      }
    }
  }, [projects, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('portfolio_skills', JSON.stringify(skills));
      } catch (error) {
        console.error('Error saving skills:', error);
      }
    }
  }, [skills, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('portfolio_experiences', JSON.stringify(experiences));
      } catch (error) {
        console.error('Error saving experiences:', error);
      }
    }
  }, [experiences, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('portfolio_education', JSON.stringify(education));
      } catch (error) {
        console.error('Error saving education:', error);
      }
    }
  }, [education, isInitialized]);

  const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

  const refreshData = () => {
    initializeData();
  };

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProjects(prev => {
      const updated = [...prev, newProject];
      return updated;
    });
  };

  const updateProject = (id: string, projectData: Partial<Project>) => {
    setProjects(prev => {
      const updated = prev.map(project => 
        project.id === id 
          ? { ...project, ...projectData, updatedAt: new Date().toISOString() }
          : project
      );
      return updated;
    });
  };

  const deleteProject = (id: string) => {
    setProjects(prev => {
      const updated = prev.filter(project => project.id !== id);
      return updated;
    });
  };

  const addSkill = (skillData: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newSkill: Skill = {
      ...skillData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSkills(prev => {
      const updated = [...prev, newSkill];
      return updated;
    });
  };

  const updateSkill = (id: string, skillData: Partial<Skill>) => {
    setSkills(prev => {
      const updated = prev.map(skill => 
        skill.id === id 
          ? { ...skill, ...skillData, updatedAt: new Date().toISOString() }
          : skill
      );
      return updated;
    });
  };

  const deleteSkill = (id: string) => {
    setSkills(prev => {
      const updated = prev.filter(skill => skill.id !== id);
      return updated;
    });
  };

  const addExperience = (experienceData: Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newExperience: Experience = {
      ...experienceData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setExperiences(prev => {
      const updated = [...prev, newExperience];
      return updated;
    });
  };

  const updateExperience = (id: string, experienceData: Partial<Experience>) => {
    setExperiences(prev => {
      const updated = prev.map(experience => 
        experience.id === id 
          ? { ...experience, ...experienceData, updatedAt: new Date().toISOString() }
          : experience
      );
      return updated;
    });
  };

  const deleteExperience = (id: string) => {
    setExperiences(prev => {
      const updated = prev.filter(experience => experience.id !== id);
      return updated;
    });
  };

  const addEducation = (educationData: Omit<Education, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newEducation: Education = {
      ...educationData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setEducation(prev => {
      const updated = [...prev, newEducation];
      return updated;
    });
  };

  const updateEducation = (id: string, educationData: Partial<Education>) => {
    setEducation(prev => {
      const updated = prev.map(edu => 
        edu.id === id 
          ? { ...edu, ...educationData, updatedAt: new Date().toISOString() }
          : edu
      );
      return updated;
    });
  };

  const deleteEducation = (id: string) => {
    setEducation(prev => {
      const updated = prev.filter(edu => edu.id !== id);
      return updated;
    });
  };

  return (
    <DataContext.Provider value={{
      projects,
      skills,
      experiences,
      education,
      addProject,
      updateProject,
      deleteProject,
      addSkill,
      updateSkill,
      deleteSkill,
      addExperience,
      updateExperience,
      deleteExperience,
      addEducation,
      updateEducation,
      deleteEducation,
      refreshData,
    }}>
      {children}
    </DataContext.Provider>
  );
};