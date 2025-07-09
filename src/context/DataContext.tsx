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
  isLoading: boolean;
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
const getDefaultProjects = (): Project[] => [
  {
    id: 'sample-project-1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration.',
    longDescription: 'This comprehensive e-commerce platform demonstrates modern web development practices with a focus on user experience and scalability. Built using the MERN stack, it includes advanced features like real-time inventory management, order tracking, and admin dashboard.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'JWT'],
    features: ['User Authentication', 'Product Management', 'Shopping Cart', 'Payment Integration', 'Order Tracking', 'Admin Dashboard'],
    githubUrl: 'https://github.com/saadikram/ecommerce-platform',
    liveUrl: 'https://ecommerce-demo.netlify.app',
    category: 'Full Stack',
    status: 'completed' as const,
    startDate: '2024-01-15',
    endDate: '2024-03-20',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'sample-project-2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    longDescription: 'This task management application showcases real-time collaboration features using WebSocket technology. Users can create projects, assign tasks, track progress, and communicate with team members in real-time.',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React', 'TypeScript', 'Socket.io', 'Node.js', 'PostgreSQL'],
    features: ['Real-time Updates', 'Drag & Drop', 'Team Collaboration', 'Progress Tracking', 'File Sharing'],
    githubUrl: 'https://github.com/saadikram/task-manager',
    liveUrl: 'https://taskmanager-demo.netlify.app',
    category: 'Web App',
    status: 'completed' as const,
    startDate: '2024-02-01',
    endDate: '2024-04-15',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'sample-project-3',
    title: 'Weather Dashboard',
    description: 'A responsive weather dashboard that provides current weather conditions, forecasts, and interactive maps using weather APIs.',
    longDescription: 'This weather dashboard integrates multiple weather APIs to provide comprehensive weather information. Features include location-based weather, interactive maps, weather alerts, and historical data visualization.',
    image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React', 'Chart.js', 'Weather API', 'Geolocation', 'CSS3'],
    features: ['Current Weather', '7-Day Forecast', 'Interactive Maps', 'Weather Alerts', 'Location Search'],
    githubUrl: 'https://github.com/saadikram/weather-dashboard',
    liveUrl: 'https://weather-dashboard-demo.netlify.app',
    category: 'Frontend',
    status: 'completed' as const,
    startDate: '2024-03-01',
    endDate: '2024-03-25',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const getDefaultSkills = (): Skill[] => [
  {
    id: 'sample-skill-1',
    name: 'React',
    level: 85,
    category: 'Frontend Development',
    description: 'Experienced in building modern web applications with React, including hooks, context API, and state management.',
    yearsOfExperience: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'sample-skill-2',
    name: 'JavaScript',
    level: 90,
    category: 'Frontend Development',
    description: 'Strong foundation in JavaScript ES6+, including async/await, destructuring, and modern JavaScript features.',
    yearsOfExperience: 2.5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'sample-skill-3',
    name: 'Node.js',
    level: 75,
    category: 'Backend Development',
    description: 'Experience building RESTful APIs and server-side applications with Node.js and Express.',
    yearsOfExperience: 1.5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'sample-skill-4',
    name: 'MongoDB',
    level: 70,
    category: 'Database',
    description: 'Proficient in NoSQL database design, queries, and integration with Node.js applications.',
    yearsOfExperience: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'sample-skill-5',
    name: 'TypeScript',
    level: 80,
    category: 'Frontend Development',
    description: 'Strong typing skills with TypeScript for building scalable and maintainable applications.',
    yearsOfExperience: 1.5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'sample-skill-6',
    name: 'Tailwind CSS',
    level: 85,
    category: 'Frontend Development',
    description: 'Expert in utility-first CSS framework for rapid UI development and responsive design.',
    yearsOfExperience: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const getDefaultExperiences = (): Experience[] => [
  {
    id: 'sample-exp-1',
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
  },
  {
    id: 'sample-exp-2',
    title: 'Web Development Freelancer',
    company: 'Self-Employed',
    location: 'Haripur, Pakistan',
    startDate: '2023-09-01',
    endDate: '',
    description: 'Providing web development services to local businesses and startups. Specializing in modern web applications using React, Node.js, and cloud deployment.',
    technologies: ['React', 'Node.js', 'MongoDB', 'AWS', 'Netlify'],
    achievements: [
      'Completed 8+ client projects successfully',
      'Maintained 100% client satisfaction rate',
      'Reduced client website loading times by average 40%',
      'Implemented SEO best practices for better search rankings'
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const getDefaultEducation = (): Education[] => [
  {
    id: 'sample-edu-1',
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
  const [isLoading, setIsLoading] = useState(true);

  // Initialize data on mount
  useEffect(() => {
    const initializeData = () => {
      try {
        // Get data from localStorage or use defaults
        const savedProjects = localStorage.getItem('portfolio_projects');
        const savedSkills = localStorage.getItem('portfolio_skills');
        const savedExperiences = localStorage.getItem('portfolio_experiences');
        const savedEducation = localStorage.getItem('portfolio_education');

        // Parse saved data or use defaults
        const projectsData = savedProjects ? JSON.parse(savedProjects) : getDefaultProjects();
        const skillsData = savedSkills ? JSON.parse(savedSkills) : getDefaultSkills();
        const experiencesData = savedExperiences ? JSON.parse(savedExperiences) : getDefaultExperiences();
        const educationData = savedEducation ? JSON.parse(savedEducation) : getDefaultEducation();

        // Set state
        setProjects(projectsData);
        setSkills(skillsData);
        setExperiences(experiencesData);
        setEducation(educationData);

        // Save defaults to localStorage if not already saved
        if (!savedProjects) {
          localStorage.setItem('portfolio_projects', JSON.stringify(projectsData));
        }
        if (!savedSkills) {
          localStorage.setItem('portfolio_skills', JSON.stringify(skillsData));
        }
        if (!savedExperiences) {
          localStorage.setItem('portfolio_experiences', JSON.stringify(experiencesData));
        }
        if (!savedEducation) {
          localStorage.setItem('portfolio_education', JSON.stringify(educationData));
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing data:', error);
        // Fallback to defaults
        setProjects(getDefaultProjects());
        setSkills(getDefaultSkills());
        setExperiences(getDefaultExperiences());
        setEducation(getDefaultEducation());
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('portfolio_projects', JSON.stringify(projects));
    }
  }, [projects, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('portfolio_skills', JSON.stringify(skills));
    }
  }, [skills, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('portfolio_experiences', JSON.stringify(experiences));
    }
  }, [experiences, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('portfolio_education', JSON.stringify(education));
    }
  }, [education, isLoading]);

  const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (id: string, projectData: Partial<Project>) => {
    setProjects(prev => prev.map(project => 
      project.id === id 
        ? { ...project, ...projectData, updatedAt: new Date().toISOString() }
        : project
    ));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  const addSkill = (skillData: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newSkill: Skill = {
      ...skillData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSkills(prev => [...prev, newSkill]);
  };

  const updateSkill = (id: string, skillData: Partial<Skill>) => {
    setSkills(prev => prev.map(skill => 
      skill.id === id 
        ? { ...skill, ...skillData, updatedAt: new Date().toISOString() }
        : skill
    ));
  };

  const deleteSkill = (id: string) => {
    setSkills(prev => prev.filter(skill => skill.id !== id));
  };

  const addExperience = (experienceData: Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newExperience: Experience = {
      ...experienceData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setExperiences(prev => [...prev, newExperience]);
  };

  const updateExperience = (id: string, experienceData: Partial<Experience>) => {
    setExperiences(prev => prev.map(experience => 
      experience.id === id 
        ? { ...experience, ...experienceData, updatedAt: new Date().toISOString() }
        : experience
    ));
  };

  const deleteExperience = (id: string) => {
    setExperiences(prev => prev.filter(experience => experience.id !== id));
  };

  const addEducation = (educationData: Omit<Education, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newEducation: Education = {
      ...educationData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setEducation(prev => [...prev, newEducation]);
  };

  const updateEducation = (id: string, educationData: Partial<Education>) => {
    setEducation(prev => prev.map(edu => 
      edu.id === id 
        ? { ...edu, ...educationData, updatedAt: new Date().toISOString() }
        : edu
    ));
  };

  const deleteEducation = (id: string) => {
    setEducation(prev => prev.filter(edu => edu.id !== id));
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
      isLoading,
    }}>
      {children}
    </DataContext.Provider>
  );
};