import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {
  Project,
  Skill,
  Experience,
  Education,
  AboutData,
} from '../types';
import { db } from '../components/firebase';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

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
    'Currently pursuing my degree in Software Engineering...',
    'I believe in writing clean, maintainable code...',
  ],
  highlights: ['Computer Science', 'Web Development', 'Software Engineering', 'Problem Solving'],
  stats: [
    { label: 'Projects Completed', value: '10+' },
    { label: 'Team Projects', value: '5+' },
    { label: 'Years Learning', value: '2+' },
  ],
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
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [aboutData, setAboutData] = useState<AboutData>(defaultAbout);
  const [isLoading, setIsLoading] = useState(true);

  // Utility
  const timestamp = () => new Date().toISOString();

  // FETCH ALL DATA
 useEffect(() => {
  const fetchAll = async () => {
    try {
      const fetchCollection = async <T,>(name: string): Promise<T[]> => {
        const snap = await getDocs(collection(db, name));
        return snap.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() } as T));
      };

      const [fetchedProjects, fetchedSkills, fetchedExperiences, fetchedEducation] =
        await Promise.all([
          fetchCollection<Project>('projects'),
          fetchCollection<Skill>('skills'),
          fetchCollection<Experience>('experiences'),
          fetchCollection<Education>('education'),
        ]);

      setProjects(fetchedProjects);
      setSkills(fetchedSkills);
      setExperiences(fetchedExperiences);
      setEducation(fetchedEducation);

      const aboutSnap = await getDoc(doc(db, 'about', 'aboutData'));
      if (aboutSnap.exists()) {
        setAboutData(aboutSnap.data() as AboutData);
      }
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  fetchAll();
}, []);


  // --------- CRUD HELPERS ----------
 const addDocTo = async <T extends { id?: string }>(
  col: string,
  data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>,
  setter: React.Dispatch<React.SetStateAction<T[]>>
): Promise<void> => {
  const payload: T = {
    ...(data as T),
    createdAt: timestamp(),
    updatedAt: timestamp(),
  };
  const ref = await addDoc(collection(db, col), payload);
  setter((prev) => [...prev, { ...payload, id: ref.id }]);
};

const updateDocIn = async <T extends { id: string }>(
  col: string,
  id: string,
  data: Partial<T>,
  setter: React.Dispatch<React.SetStateAction<T[]>>
): Promise<void> => {
  const ref = doc(db, col, id);
  const updatedAtTime = timestamp();
  await updateDoc(ref, { ...data, updatedAt: updatedAtTime });

  setter((prev) =>
    prev.map((item) =>
      item.id === id ? { ...item, ...data, updatedAt: updatedAtTime } : item
    )
  );
};

const deleteDocFrom = async <T extends { id: string }>(
  col: string,
  id: string,
  setter: React.Dispatch<React.SetStateAction<T[]>>
): Promise<void> => {
  await deleteDoc(doc(db, col, id));
  setter((prev) => prev.filter((item) => item.id !== id));
};

  // --------- PROJECT ----------
  const addProject = (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) =>
    addDocTo<Project>('projects', data, setProjects);
  const updateProject = (id: string, data: Partial<Project>) =>
    updateDocIn<Project>('projects', id, data, setProjects);
  const deleteProject = (id: string) => deleteDocFrom<Project>('projects', id, setProjects);

  // --------- SKILL ----------
  const addSkill = (data: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>) =>
    addDocTo<Skill>('skills', data, setSkills);
  const updateSkill = (id: string, data: Partial<Skill>) =>
    updateDocIn<Skill>('skills', id, data, setSkills);
  const deleteSkill = (id: string) => deleteDocFrom<Skill>('skills', id, setSkills);

  // --------- EXPERIENCE ----------
  const addExperience = (data: Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>) =>
    addDocTo<Experience>('experiences', data, setExperiences);
  const updateExperience = (id: string, data: Partial<Experience>) =>
    updateDocIn<Experience>('experiences', id, data, setExperiences);
  const deleteExperience = (id: string) => deleteDocFrom<Experience>('experiences', id, setExperiences);

  // --------- EDUCATION ----------
  const addEducation = (data: Omit<Education, 'id' | 'createdAt' | 'updatedAt'>) =>
    addDocTo<Education>('education', data, setEducation);
  const updateEducation = (id: string, data: Partial<Education>) =>
    updateDocIn<Education>('education', id, data, setEducation);
  const deleteEducation = (id: string) => deleteDocFrom<Education>('education', id, setEducation);

  // --------- ABOUT DATA ----------
  const updateAboutData = async (data: Partial<AboutData>) => {
    const ref = doc(db, 'about', 'aboutData');
    await setDoc(ref, { ...aboutData, ...data }, { merge: true });
    setAboutData(prev => ({ ...prev, ...data }));
  };

  const resetAboutData = async () => {
    const ref = doc(db, 'about', 'aboutData');
    await setDoc(ref, defaultAbout);
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
