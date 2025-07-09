import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, Skill, Experience, Education } from '../types';
import portfolioData from '../data/portfolioData.json';

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

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(portfolioData.projects as Project[]);
  const [skills, setSkills] = useState<Skill[]>(portfolioData.skills as Skill[]);
  const [experiences, setExperiences] = useState<Experience[]>(portfolioData.experiences as Experience[]);
  const [education, setEducation] = useState<Education[]>(portfolioData.education as Education[]);
  const [isLoading, setIsLoading] = useState(false);

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