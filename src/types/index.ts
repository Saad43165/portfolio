export type ProjectStatus = 'in-progress' | 'completed' | 'planned';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  features: string[];
  githubUrl: string;
  liveUrl: string;
  category: string;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  videoUrl?: string;
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
  endDate: string;
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
  endDate: string;
  gpa: string;
  description: string;
  achievements: string[];
  createdAt: string;
  updatedAt: string;
}

// Optional: Interface for "About Me" if it becomes more complex
export interface About {
  id?: string; // Optional if tied to a specific record
  content: string; // Current string data
  createdAt?: string; // Optional for tracking
  updatedAt?: string; // Optional for tracking
  // Add more fields as needed (e.g., bio, contact, imageUrl)
}
export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer'; // Adjust roles as needed
}
export interface AboutData {
  heading: string;
  paragraphs: string[];
  highlights: string[];
  stats: { label: string; value: string }[];
  projectsCompleted: number;
  teamProjects: number;
  learningYears: number;
}

