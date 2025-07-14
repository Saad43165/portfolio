export type ProjectStatus = 'in-progress' | 'completed' | 'planned';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  videoUrl?: string;
  technologies: string[];
  features: string[];
  githubUrl: string;
  liveUrl?: string;
  category: string;
  status: 'planned' | 'in-progress' | 'completed';
  startDate: string;
  endDate?: string;
  createdAt?: string;
  updatedAt?: string;
}


export interface Skill {
  id: string;
  name: string;
  level: number; // 0-100
  category: string;
  description: string;
  yearsOfExperience: number;
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  position: string;
  id: string;
  title: string; // Changed from 'position' to align with ExperienceForm
  company: string;
  location: string;
  startDate: string;
  endDate: string | '';
  description: string;
  technologies: string[];
  achievements: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string | '';
  gpa: string | '';
  description: string;
  achievements: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AboutData {
  heading: string;
  paragraphs: string[];
  highlights: string[];
  stats: { label: string; value: string }[];
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
}
