// src/types.ts
import { LucideIcon } from 'lucide-react';

export type TabType = 'overview' | 'projects' | 'skills' | 'experience' | 'education' | 'about' | 'settings';

export interface ActivityItem {
  id: string;
  type: 'project' | 'skill' | 'experience' | 'education';
  title: string;
  action: string;
  timestamp: Date;
  status: 'completed' | 'pending' | 'in-progress';
}

export interface Stat {
  label: string;
  value: number;
  icon: LucideIcon;
  color: 'blue' | 'purple' | 'green' | 'orange';
  trend: string;
  trendUp: boolean;
}

export interface PerformanceStat {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: 'blue' | 'purple' | 'green' | 'orange';
  subtitle: string;
}

export interface Goal {
  id: number;
  text: string;
  target: number;
  current: number;
}

export interface QuickStatsType {
  totalViews: number;
  thisWeekViews: number;
  avgViewTime: string;
  bounceRate: string;
}

export interface CustomMetrics {
  targetViews: number;
}

export interface ColorMap {
  [key: string]: {
    bg: string;
    text: string;
    border: string;
    gradient: string;
  };
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
}

// Add the User interface that was missing
export interface User {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
  name?: string;
  role?: string;
  // Add any other user properties you need
}