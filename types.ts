import { LucideIcon } from 'lucide-react';

export enum RoleType {
  WEB_DESIGNER = 'WEB_DESIGNER',
  DATA_ANALYST = 'DATA_ANALYST',
  MARKETING_PLANNER = 'MARKETING_PLANNER',
  SALES_ANALYST = 'SALES_ANALYST',
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  metric?: string; // e.g., "20% Growth" or "10k Users"
}

export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'technical' | 'soft' | 'tool';
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

export interface RoleProfile {
  id: RoleType;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  color: string; // Tailwind color class prefix e.g., "cyan"
  icon: LucideIcon;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  certifications: Certification[];
}