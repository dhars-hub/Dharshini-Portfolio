export interface Education {
  id: string;
  degree: string;
  period: string;
  institution: string;
  location: string;
  cgpa: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: { name: string; color?: string; highlighted?: boolean }[];
}

export interface Internship {
  id: string;
  role: string;
  company: string;
  period?: string;
  description?: string;
  skills?: string[];
}

export interface Workshop {
  id: string;
  title: string;
  type: 'Seminar' | 'Webinar' | 'Summit' | 'Workshop';
  year?: string;
  organizer?: string;
}

export interface HighlightItem {
  id: string;
  title: string;
  issuer?: string;
  type: 'certification' | 'achievement';
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  badge: string;
  description: string;
  fullDescription?: string;
  tech: string[];
  githubUrl?: string;
  demoUrl?: string;
  figmaUrl?: string;
  image: string;
  highlights?: string[];
  features?: string[];
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}
