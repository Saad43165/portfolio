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
  id: string;
  title: string;
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
  aboutImage?: string;
  missionStatement?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface PortfolioInfo {
  name: string;
  roles: string[];
  profileImage: string;
  resumeUrl: string;
  socialLinks: SocialLink[];
  email: string;
  location: string;
  phone?: string;
  tagline?: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
}
