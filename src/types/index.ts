export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  videoUrl?: string;
  technologies: string[];
  features: string[];
  githubUrl: string;
  liveUrl?: string;
  category: string;
  status: 'completed' | 'in-progress' | 'planned';
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
  icon?: string;
  description?: string;
  yearsOfExperience?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
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
  endDate?: string;
  gpa?: string;
  description?: string;
  achievements: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
}