import { RoleType, RoleProfile } from './types';
import { Palette, BarChart2, TrendingUp, Target } from 'lucide-react';

export const SOCIAL_LINKS = {
  github: "https://github.com/AshrafMorningstar",
  linkedin: "https://www.linkedin.com/in/ashrafmorningstar",
  email: "mailto:contact@ashrafmorningstar.com"
};

export const PROFILES: Record<RoleType, RoleProfile> = {
  [RoleType.WEB_DESIGNER]: {
    id: RoleType.WEB_DESIGNER,
    title: "Web Designer & Developer",
    shortTitle: "Design",
    tagline: "Crafting immersive digital experiences.",
    description: "Specializing in modern UI/UX principles, React ecosystems, and 3D web interactions. I build responsive, accessible, and performant web applications.",
    color: "cyan",
    icon: Palette,
    skills: [
      { name: "React / Next.js", level: 95, category: "technical" },
      { name: "Tailwind CSS", level: 90, category: "technical" },
      { name: "Three.js / R3F", level: 75, category: "technical" },
      { name: "Figma", level: 85, category: "tool" },
      { name: "UI/UX Design", level: 80, category: "technical" }
    ],
    projects: [
      {
        id: "p1",
        title: "Nexus Portfolio V1",
        description: "A 3D interactive portfolio built with React and Framer Motion.",
        techStack: ["React", "TypeScript", "Motion"],
        metric: "100ms Load Time"
      },
      {
        id: "p2",
        title: "E-Commerce Dashboard",
        description: "Modern admin panel with dark mode and real-time data updates.",
        techStack: ["Next.js", "Tailwind", "Supabase"],
        metric: "50% UX Improvement"
      }
    ],
    experience: [
      {
        company: "TechFlow Solutions",
        role: "Senior Frontend Engineer",
        period: "2021 - Present",
        description: "Leading the frontend team in migrating legacy apps to modern React architectures."
      }
    ],
    certifications: [
      {
        name: "Meta Front-End Developer Professional Certificate",
        issuer: "Meta",
        date: "2023"
      },
      {
        name: "Google UX Design Professional Certificate",
        issuer: "Google",
        date: "2022"
      }
    ]
  },
  [RoleType.DATA_ANALYST]: {
    id: RoleType.DATA_ANALYST,
    title: "Data Analyst",
    shortTitle: "Data",
    tagline: "Turning raw data into actionable insights.",
    description: "Expert in Python data stacks, SQL querying, and visualization. I uncover hidden trends to drive decision-making processes.",
    color: "emerald",
    icon: BarChart2,
    skills: [
      { name: "Python (Pandas/NumPy)", level: 90, category: "technical" },
      { name: "SQL / PostgreSQL", level: 85, category: "technical" },
      { name: "PowerBI / Tableau", level: 80, category: "tool" },
      { name: "Machine Learning", level: 65, category: "technical" },
      { name: "Statistical Analysis", level: 85, category: "technical" }
    ],
    projects: [
      {
        id: "d1",
        title: "Customer Churn Prediction",
        description: "ML model predicting user churn with 85% accuracy using random forests.",
        techStack: ["Python", "Scikit-Learn", "SQL"],
        metric: "85% Accuracy"
      },
      {
        id: "d2",
        title: "Market Trend Visualizer",
        description: "Interactive dashboard for tracking global stock trends in real-time.",
        techStack: ["Python", "Streamlit", "Plotly"],
        metric: "1M+ Rows Processed"
      }
    ],
    experience: [
      {
        company: "DataCorp",
        role: "Data Analyst Intern",
        period: "2020 - 2021",
        description: "Analyzed extensive datasets to optimize marketing spend allocation."
      }
    ],
    certifications: [
      {
        name: "Google Data Analytics Professional Certificate",
        issuer: "Google",
        date: "2022"
      },
      {
        name: "IBM Data Science Professional Certificate",
        issuer: "IBM",
        date: "2021"
      }
    ]
  },
  [RoleType.MARKETING_PLANNER]: {
    id: RoleType.MARKETING_PLANNER,
    title: "Marketing Planner",
    shortTitle: "Marketing",
    tagline: "Strategizing growth and brand presence.",
    description: "Bridging the gap between creative vision and market metrics. I plan campaigns that resonate with audiences and convert leads.",
    color: "purple",
    icon: TrendingUp,
    skills: [
      { name: "SEO / SEM", level: 85, category: "technical" },
      { name: "Content Strategy", level: 90, category: "soft" },
      { name: "Google Analytics", level: 80, category: "tool" },
      { name: "Social Media Mgmt", level: 85, category: "tool" },
      { name: "Copywriting", level: 75, category: "soft" }
    ],
    projects: [
      {
        id: "m1",
        title: "Q4 Brand Campaign",
        description: "Integrated omnichannel campaign increasing brand awareness by 40%.",
        techStack: ["Google Ads", "Social Media", "CRM"],
        metric: "+40% Awareness"
      },
      {
        id: "m2",
        title: "SEO Overhaul",
        description: "Optimized landing pages to rank #1 for key industry terms.",
        techStack: ["SEMrush", "Ahrefs", "WordPress"],
        metric: "3x Organic Traffic"
      }
    ],
    experience: [
      {
        company: "Creative Agency",
        role: "Marketing Strategist",
        period: "2019 - 2020",
        description: "Developed go-to-market strategies for emerging tech startups."
      }
    ],
    certifications: [
      {
        name: "Google Digital Marketing & E-commerce",
        issuer: "Google",
        date: "2023"
      },
      {
        name: "HubSpot Content Marketing",
        issuer: "HubSpot",
        date: "2021"
      }
    ]
  },
  [RoleType.SALES_ANALYST]: {
    id: RoleType.SALES_ANALYST,
    title: "Sales Analyst",
    shortTitle: "Sales",
    tagline: "Optimizing pipelines and revenue streams.",
    description: "Focusing on sales performance metrics, forecasting, and CRM optimization to maximize revenue efficiency.",
    color: "amber",
    icon: Target,
    skills: [
      { name: "CRM (Salesforce/HubSpot)", level: 90, category: "tool" },
      { name: "Revenue Forecasting", level: 85, category: "technical" },
      { name: "Excel / Spreadsheets", level: 95, category: "tool" },
      { name: "Pipeline Management", level: 80, category: "soft" },
      { name: "Negotiation", level: 70, category: "soft" }
    ],
    projects: [
      {
        id: "s1",
        title: "Sales Funnel Optimization",
        description: "Redesigned the lead qualification process, reducing drop-off.",
        techStack: ["Salesforce", "Excel", "Automation"],
        metric: "+15% Conversion"
      },
      {
        id: "s2",
        title: "Quarterly Revenue Forecast",
        description: "Automated reporting system for executive leadership reviews.",
        techStack: ["Tableau", "SQL", "Python"],
        metric: "98% Forecast Accuracy"
      }
    ],
    experience: [
      {
        company: "Global Sales Inc",
        role: "Junior Sales Analyst",
        period: "2018 - 2019",
        description: "Supported regional sales directors with weekly performance reports."
      }
    ],
    certifications: [
      {
        name: "Salesforce Certified Administrator",
        issuer: "Salesforce",
        date: "2022"
      },
      {
        name: "Certified Sales Professional (CSP)",
        issuer: "CPSA",
        date: "2020"
      }
    ]
  }
};