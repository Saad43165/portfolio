import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, Skill, Experience, Education, AboutData } from '../types';
import portfolioData from '../data/portfolioData.json';

interface DataContextType {
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  education: Education[];
  aboutData: AboutData;
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
  updateAboutData: (about: Partial<AboutData>) => void;
  resetAboutData: () => void;
  isLoading: boolean;
}

const defaultAbout: AboutData = {
  heading: "I'm a passionate Software Engineering student who loves creating digital experiences",
  paragraphs: [
    "Currently pursuing my degree in Software Engineering at Pak Austria Fachhochschule Institute of Applied Sciences and Technology, Haripur. I specialize in creating modern, responsive, and user-friendly applications.",
    "I believe in writing clean, maintainable code and staying up-to-date with the latest technologies. Whether it's a simple web application or a complex system, I approach each project with dedication, creativity, and attention to detail.",
  ],
  highlights: ['Computer Science', 'Web Development', 'Software Engineering', 'Problem Solving'],
  stats: [
    { label: 'Projects Completed', value: '10+' },
    { label: 'Team Projects', value: '5+' },
    { label: 'Years Learning', value: '2+' },
  ],
};

const defaultProjects: Project[] = [];
const defaultSkills: Skill[] = [];
const defaultExperiences: Experience[] = [];
const defaultEducation: Education[] = [];

export const DataContext = createContext<DataContextType | undefined>(undefined);

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

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('portfolioProjects');
      return saved ? JSON.parse(saved) : portfolioData?.projects ?? defaultProjects;
    } catch (error) {
      console.error('Error loading portfolioProjects from localStorage:', error);
      return portfolioData?.projects ?? defaultProjects;
    }
  });
  const [skills, setSkills] = useState<Skill[]>(() => {
    try {
      const saved = localStorage.getItem('portfolioSkills');
      return saved ? JSON.parse(saved) : portfolioData?.skills ?? defaultSkills;
    } catch (error) {
      console.error('Error loading portfolioSkills from localStorage:', error);
      return portfolioData?.skills ?? defaultSkills;
    }
  });
  const [experiences, setExperiences] = useState<Experience[]>(() => {
    try {
      const saved = localStorage.getItem('portfolioExperiences');
      return saved ? JSON.parse(saved) : portfolioData?.experiences ?? defaultExperiences;
    } catch (error) {
      console.error('Error loading portfolioExperiences from localStorage:', error);
      return portfolioData?.experiences ?? defaultExperiences;
    }
  });
  const [education, setEducation] = useState<Education[]>(() => {
    try {
      const saved = localStorage.getItem('portfolioEducation');
      return saved ? JSON.parse(saved) : portfolioData?.education ?? defaultEducation;
    } catch (error) {
      console.error('Error loading portfolioEducation from localStorage:', error);
      return portfolioData?.education ?? defaultEducation;
    }
  });
  const [aboutData, setAboutData] = useState<AboutData>(() => {
    try {
      const saved = localStorage.getItem('portfolioAbout');
      return saved ? JSON.parse(saved) : portfolioData?.about ?? defaultAbout;
    } catch (error) {
      console.error('Error loading portfolioAbout from localStorage:', error);
      return portfolioData?.about ?? defaultAbout;
    }
  });

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('portfolioProjects', JSON.stringify(projects));
    } catch (error) {
      console.error('Error saving portfolioProjects to localStorage:', error);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem('portfolioSkills', JSON.stringify(skills));
    } catch (error) {
      console.error('Error saving portfolioSkills to localStorage:', error);
    }
  }, [skills]);

  useEffect(() => {
    try {
      localStorage.setItem('portfolioExperiences', JSON.stringify(experiences));
    } catch (error) {
      console.error('Error saving portfolioExperiences to localStorage:', error);
    }
  }, [experiences]);

  useEffect(() => {
    try {
      localStorage.setItem('portfolioEducation', JSON.stringify(education));
    } catch (error) {
      console.error('Error saving portfolioEducation to localStorage:', error);
    }
  }, [education]);

  useEffect(() => {
    try {
      localStorage.setItem('portfolioAbout', JSON.stringify(aboutData));
    } catch (error) {
      console.error('Error saving portfolioAbout to localStorage:', error);
    }
  }, [aboutData]);

  const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

  const validateExperience = (data: Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>) => {
    const requiredFields = ['title', 'company', 'location', 'startDate', 'description'];
    for (const field of requiredFields) {
      if (!data[field as keyof typeof data]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
    return data;
  };

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProjects((prev) => [...prev, newProject]);
  };

  const updateProject = (id: string, projectData: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id
          ? { ...project, ...projectData, updatedAt: new Date().toISOString() }
          : project
      )
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  const addSkill = (skillData: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newSkill: Skill = {
      ...skillData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSkills((prev) => [...prev, newSkill]);
  };

  const updateSkill = (id: string, skillData: Partial<Skill>) => {
    setSkills((prev) =>
      prev.map((skill) =>
        skill.id === id
          ? { ...skill, ...skillData, updatedAt: new Date().toISOString() }
          : skill
      )
    );
  };

  const deleteSkill = (id: string) => {
    setSkills((prev) => prev.filter((skill) => skill.id !== id));
  };

  const addExperience = (experienceData: Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>) => {
    const validatedData = validateExperience(experienceData);
    const newExperience: Experience = {
      ...validatedData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      endDate: validatedData.endDate || '', // Ensure endDate is string or ''
      technologies: validatedData.technologies || [],
      achievements: validatedData.achievements || [],
    };
    setExperiences((prev) => [...prev, newExperience]);
  };

  const updateExperience = (id: string, experienceData: Partial<Experience>) => {
    setExperiences((prev) =>
      prev.map((experience) =>
        experience.id === id
          ? {
              ...experience,
              ...experienceData,
              updatedAt: new Date().toISOString(),
              endDate: experienceData.endDate !== undefined ? experienceData.endDate : experience.endDate,
              technologies: experienceData.technologies || experience.technologies,
              achievements: experienceData.achievements || experience.achievements,
            }
          : experience
      )
    );
  };

  const deleteExperience = (id: string) => {
    setExperiences((prev) => prev.filter((experience) => experience.id !== id));
  };

  const addEducation = (educationData: Omit<Education, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newEducation: Education = {
      ...educationData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      endDate: educationData.endDate || '',
      gpa: educationData.gpa || '',
      achievements: educationData.achievements || [],
    };
    setEducation((prev) => [...prev, newEducation]);
  };

  const updateEducation = (id: string, educationData: Partial<Education>) => {
    setEducation((prev) =>
      prev.map((edu) =>
        edu.id === id
          ? {
              ...edu,
              ...educationData,
              updatedAt: new Date().toISOString(),
              endDate: educationData.endDate !== undefined ? educationData.endDate : edu.endDate,
              gpa: educationData.gpa !== undefined ? educationData.gpa : edu.gpa,
              achievements: educationData.achievements || edu.achievements,
            }
          : edu
      )
    );
  };

  const deleteEducation = (id: string) => {
    setEducation((prev) => prev.filter((edu) => edu.id !== id));
  };

  const updateAboutData = (about: Partial<AboutData>) => {
    setAboutData((prev) => ({ ...prev, ...about }));
  };

  const resetAboutData = () => {
    setAboutData(defaultAbout);
  };

  return (
    <DataContext.Provider
      value={{
        projects,
        skills,
        experiences,
        education,
        aboutData,
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
        updateAboutData,
        resetAboutData,
        isLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
