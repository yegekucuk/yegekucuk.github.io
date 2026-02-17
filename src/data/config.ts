// Types for the portfolio configuration
export interface PersonalInfo {
  name: string;
  greeting: string;
  tagline: string;
  avatarUrl: string;
  about: string;
}

export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  logoUrl: string;
  href?: string;
  badges?: string[];
  description?: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  logoUrl: string;
  href?: string;
  badges?: string[];
}

export interface ProjectLink {
  type: 'website' | 'source' | 'demo' | 'gitops' | 'stars';
  label: string;
  url: string;
  count?: number;
}

export interface Project {
  title: string;
  period?: string;
  description: string;
  technologies: string[];
  href?: string;
  videoUrl?: string;
  imageUrl?: string;
  links?: ProjectLink[];
}

export interface SocialLink {
  name: string;
  url: string;
}

export interface ContactInfo {
  message: string;
  socialLink: {
    text: string;
    url: string;
  };
  disclaimer: string;
}

export interface PortfolioConfig {
  personalInfo: PersonalInfo;
  skills: string[];
  workExperience: WorkExperience[];
  education: Education[];
  projects: Project[];
  socials: SocialLink[];
  contact: ContactInfo;
}

// Sample configuration - replace with your own data
export const portfolioConfig: PortfolioConfig = {
  personalInfo: {
    name: 'Ege',
    greeting: "Hi, I'm Ege",
    tagline: 'Software Engineer, 23',
    avatarUrl: '/logo.jpeg',
    about: "Welcome to my world. \n\nI am Ege, a 23 year old Software Engineer. I'm a tech guy who loves building systems to solve real problems, also for fun sometimes. I have experience in web applications and AI projects.\n\nIn my free time, I like to learn new things and find new challenges to solve. Enjoy your experience in my computer!",
  },

  skills: ['Machine Learning', 'Web Development', 'Software Development', 'Python', 'TypeScript', 'JavaScript', 'Postgres', 'Git', 'Docker', 'Linux', 'Next.js'],

  workExperience: [
    {
      company: 'Qimia',
      role: 'Web Developer',
      period: 'Sept 2025 - Jan 2026',
      logoUrl: '/qimia.png',
      href: 'https://www.qimia.io/',
      badges: ["Internship", "Remote"],
      description: '',
    },
    {
      company: 'Universitatea Politehnica din Timisoara',
      role: 'Machine Learning Summer Trainee',
      period: 'July 2025 - Sept 2025',
      logoUrl: '/upt.png',
      href: 'https://www.upt.ro/',
      badges: ["Internship", "Erasmus"],
      description: '',
    },
    {
      company: 'Ticimax',
      role: 'DevOps Engineer',
      period: 'July 2024 - Sept 2024',
      logoUrl: '/ticimax.png',
      href: 'https://www.ticimax.com/',
      badges: ["Internship", "On-site"],
      description: '',
    },
    {
      company: 'Municipality of Atasehir',
      role: 'IT Help Desk',
      period: 'Aug 2023 - Oct 2023',
      logoUrl: '/atasehir.png',
      href: 'https://www.atasehir.bel.tr/',
      badges: ["Internship", "On-site"],
      description: '',
    },
  ],

  education: [
    {
      institution: 'Marmara University',
      degree: 'BSc. Computer Engineering (Honors)',
      period: 'Oct 2021 - Jan 2026',
      logoUrl: '/marmara.png',
      href: 'https://www.marmara.edu.tr/',
    },
    {
      institution: 'Universitatea de Vest din Timisoara',
      degree: 'Computer Science',
      period: 'Feb 2024 - July 2024',
      logoUrl: '/uvt.png',
      href: 'http://uvt.ro/',
      badges: ['Erasmus'],
    },
  ],

  projects: [
    {
      title: 'memoria / memoria-cli',
      description:
        'Memoria is a web application to track your working hours and sessions. Transform your daily sessions into actionable insights. Manage, filter and grow with detailed analytics.',
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Supabase', 'JWT', 'Node.js', 'CLI'],
      href: 'https://memoria-track.vercel.app',
      imageUrl: '/memoria.png',
      links: [
        { type: 'demo', label: 'Start using', url: 'https://memoria-track.vercel.app' },
        { type: 'source', label: 'Source CLI', url: 'https://github.com/yegekucuk/memoria-cli' },
      ],
    },
    {
      title: 'tria, Turn repositories into AI-friendly format',
      description:
        'Tria scans a git repository, analyzes commits, branches, and contributors, extracts and chunks files intelligently, and produces summaries that are ready for LLM consumption. Perfect for onboarding and documentation generation.',
      technologies: ['Python', 'CLI'],
      href: 'https://github.com/yegekucuk/tria',
      videoUrl: '/Tria.mp4',
      links: [
        { type: 'demo', label: 'Try it out', url: 'https://tria-nrgp.onrender.com' },
        { type: 'source', label: 'Source', url: 'https://github.com/yegekucuk/tria' },
        { type: 'demo', label: 'PyPI', url: 'https://pypi.org/project/tria/' },
      ],
    },
    {
      title: 'ATS Resume Scorer',
      description:
        'ATS Resume Scorer is an AI-powered resume scoring application that evaluates resumes using OpenRouter API and provides actionable feedback.',
      technologies: ['Next.js', 'TypeScript', 'OpenRouter', 'Ollama'],
      href: 'https://github.com/yegekucuk/ats-scorer',
      videoUrl: '/ATS-Resume-Scorer.mp4',
      links: [
        { type: 'source', label: 'Source', url: 'https://github.com/yegekucuk/ats-scorer' },
      ],
    },
    {
      title: 'HackUPC Barcelona (International Hackathon)',
      description:
        'HackUPC project that uses face recognition to control the game character. The goal of the game is to collect as many flowers as you can in the given time.',
      technologies: ['Python', 'OpenCV', 'Pygame'],
      href: 'https://github.com/yegekucuk/HackUPC2024',
      imageUrl: '/HackUPC.jpg',
      links: [
        { type: 'website', label: 'DevPost', url: 'https://devpost.com/software/biene-flower-hunt-game' },
        { type: 'source', label: 'Source', url: 'https://github.com/yegekucuk/HackUPC2024' },
      ],
    },
    {
      title: 'Smart Invoice Analyzer',
      description:
        'Smart Invoice Analyzer is an AI-powered OCR web application that automates invoice processing by extracting data from QR codes.',
      technologies: ['Python', 'OCR', 'Machine Learning', 'Scikit-learn'],
      href: 'https://github.com/Azturkos/smart-invoice-analyzer',
      links: [
        { type: 'source', label: 'Source', url: 'https://github.com/Azturkos/smart-invoice-analyzer' },
      ],
    },
    {
      title: 'Human and Wild Animal Classifier',
      description:
        'Human and Wild Animal Classifier is a CNN image classification model that is deployed end-to-end with a Django web interface for live environment operation.',
      technologies: ['Python', 'CNN', 'Django', 'PyTorch'],
      href: 'https://github.com/yegekucuk/classifier1',
      links: [
        { type: 'source', label: 'Source', url: 'https://github.com/yegekucuk/classifier1' },
      ],
    },
  ],

  socials: [
    { name: 'GitHub', url: 'https://github.com/yegekucuk' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/yegekucuk/' },
    { name: 'X', url: 'https://x.com/yegekucuk' },
  ],

  contact: {
    message: 'Want to chat? ',
    socialLink: {
      text: 'Just shoot me an email',
      url: 'mailto:eegekucuk@gmail.com',
    },
    disclaimer: "and I'll get back to you.",
  },
};
