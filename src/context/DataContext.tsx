import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';
import {
  Project,
  Skill,
  Experience,
  Education,
  AboutData,
  PortfolioInfo,
} from '../types';

import portfolioData from '../data/portfolioData.json';

interface DataContextType {
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  education: Education[];
  aboutData: AboutData;
  portfolioInfo: PortfolioInfo;
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
  updatePortfolioInfo: (info: Partial<PortfolioInfo>) => void;
  isLoading: boolean;
}

const defaultAbout: AboutData = {
  ...portfolioData.about,
  aboutImage: '/saad_pic.JPG',
  missionStatement: 'My mission is to translate complex problems into intuitive digital solutions that empower users and scale businesses.',
} as AboutData;

const defaultInfo: PortfolioInfo = {
  name: 'Saad Ikram',
  roles: ['Flutter Developer', 'Mobile App Development', 'AI Integration'],
  profileImage: '/main_image.png',
  resumeUrl: '/Saad_Ikram_CV_.pdf',
  socialLinks: [
    { platform: 'Github', url: 'https://github.com/saad43165' },
    { platform: 'Linkedin', url: 'https://linkedin.com/in/saadikram' },
    { platform: 'Instagram', url: 'https://instagram.com/the__bluesss' },
  ],
  email: 'saadnaz43165@gmail.com',
  location: 'Chakwal, Punjab, Pakistan',
  phone: '+92-314-5459961',
  tagline: 'Flutter Developer | Mobile App Development | AI Integration',
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(portfolioData.projects as any);
  const [skills, setSkills] = useState<Skill[]>(portfolioData.skills as any);
  const [experiences, setExperiences] = useState<Experience[]>(portfolioData.experiences as any);
  const [education, setEducation] = useState<Education[]>(portfolioData.education as any);
  const [aboutData, setAboutData] = useState<AboutData>(defaultAbout);
  const [portfolioInfo, setPortfolioInfo] = useState<PortfolioInfo>(defaultInfo);
  const [isLoading, setIsLoading] = useState(false); // Data is hardcoded

  // Utility
  const timestamp = () => new Date().toISOString();

  // --------- CRUD HELPERS (LOCAL ONLY) ----------
  const addDocTo = <T extends { id?: string }>(
    data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>,
    setter: React.Dispatch<React.SetStateAction<T[]>>
  ): void => {
    const payload = {
      ...(data as T),
      id: Math.random().toString(36).substr(2, 9),
      createdAt: timestamp(),
      updatedAt: timestamp(),
    };
    setter((prev) => [...prev, payload as unknown as T]);
  };

  const updateDocIn = <T extends { id: string }>(
    id: string,
    data: Partial<T>,
    setter: React.Dispatch<React.SetStateAction<T[]>>
  ): void => {
    const updatedAtTime = timestamp();
    setter((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...data, updatedAt: updatedAtTime } : item
      )
    );
  };

  const deleteDocFrom = <T extends { id: string }>(
    id: string,
    setter: React.Dispatch<React.SetStateAction<T[]>>
  ): void => {
    setter((prev) => prev.filter((item) => item.id !== id));
  };

  // --------- PROJECT ----------
  const addProject = (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) =>
    addDocTo<Project>(data, setProjects);
  const updateProject = (id: string, data: Partial<Project>) =>
    updateDocIn<Project>(id, data, setProjects);
  const deleteProject = (id: string) => deleteDocFrom<Project>(id, setProjects);

  // --------- SKILL ----------
  const addSkill = (data: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>) =>
    addDocTo<Skill>(data, setSkills);
  const updateSkill = (id: string, data: Partial<Skill>) =>
    updateDocIn<Skill>(id, data, setSkills);
  const deleteSkill = (id: string) => deleteDocFrom<Skill>(id, setSkills);

  // --------- EXPERIENCE ----------
  const addExperience = (data: Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>) =>
    addDocTo<Experience>(data, setExperiences);
  const updateExperience = (id: string, data: Partial<Experience>) =>
    updateDocIn<Experience>(id, data, setExperiences);
  const deleteExperience = (id: string) => deleteDocFrom<Experience>(id, setExperiences);

  // --------- EDUCATION ----------
  const addEducation = (data: Omit<Education, 'id' | 'createdAt' | 'updatedAt'>) =>
    addDocTo<Education>(data, setEducation);
  const updateEducation = (id: string, data: Partial<Education>) =>
    updateDocIn<Education>(id, data, setEducation);
  const deleteEducation = (id: string) => deleteDocFrom<Education>(id, setEducation);

  // --------- ABOUT DATA ----------
  const updateAboutData = (data: Partial<AboutData>) => {
    setAboutData(prev => ({ ...prev, ...data }));
  };

  const resetAboutData = () => {
    setAboutData(defaultAbout);
  };

  // --------- PORTFOLIO INFO ----------
  const updatePortfolioInfo = (data: Partial<PortfolioInfo>) => {
    setPortfolioInfo(prev => ({ ...prev, ...data }));
  };

  return (
    <DataContext.Provider
      value={{
        projects,
        skills,
        experiences,
        education,
        aboutData,
        portfolioInfo,
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
        updatePortfolioInfo,
        isLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
