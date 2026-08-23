import { Education, SkillCategory, Internship, Workshop, HighlightItem, Project } from '../types';

import profileImg from '../assets/images/dharshini_profile_1786213140409.jpg';
import tollImg from '../assets/images/toll_system_thumb_1786213110029.jpg';
import fitnessImg from '../assets/images/fitness_app_thumb_1786213125009.jpg';
import smileStepsImg from '../assets/images/smile_steps_banner_1787381865125.jpg';
import movieAppImg from '../assets/images/movie_app_ui_banner_1787381883066.jpg';

export const PERSONAL_INFO = {
  name: "Dharshini B",
  title: "Full Stack Developer & UI/UX Designer Enthusiast",
  subtitle: "MCA Student | Problem Solver | Tech Enthusiast",
  bio: "Passionate Full Stack Developer & UI/UX Designer Enthusiast with expertise in Python, Java, SQL, modern Web Development, and human-centered design. Experienced in building scalable applications and intuitive user experiences with strong analytical and problem-solving skills.",
  email: "dharshinib89@gmail.com",
  location: "Trichy, Tamil Nadu, India",
  profileImage: profileImg,
  github: "https://github.com/dhars-hub",
  linkedin: "https://www.linkedin.com/in/dharshini-b-44a34124a/",
};

export const EDUCATION_LIST: Education[] = [
  {
    id: "edu-1",
    degree: "MCA (2025-2027)",
    period: "2025 - 2027",
    institution: "Holy Cross College (Autonomous)",
    location: "Trichy",
    cgpa: "9.00"
  },
  {
    id: "edu-2",
    degree: "BCA (2022-2025)",
    period: "2022 - 2025",
    institution: "Holy Cross College (Autonomous)",
    location: "Trichy",
    cgpa: "8.51"
  },
  {
    id: "edu-3",
    degree: "Higher Secondary (2021-2022)",
    period: "2021 - 2022",
    institution: "Holy Cross Girl's Hr.Sec.School",
    location: "Trichy",
    cgpa: "9.17"
  },
  {
    id: "edu-4",
    degree: "SSLC (2020-2021)",
    period: "2020 - 2021",
    institution: "Holy Cross Girl's Hr.Sec.School",
    location: "Trichy",
    cgpa: "8.82"
  }
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    title: "Programming & Backend",
    iconName: "Code",
    skills: [
      { name: "Node.js", color: "bg-emerald-600/30 text-emerald-300 border-emerald-500/30", highlighted: true },
      { name: "Express.js", color: "bg-sky-600/30 text-sky-300 border-sky-500/30", highlighted: true },
      { name: "REST APIs", color: "bg-indigo-600/30 text-indigo-300 border-indigo-500/30", highlighted: true },
      { name: "Python", color: "bg-purple-600/30 text-purple-300 border-purple-500/30", highlighted: true },
      { name: "Java", color: "bg-blue-600/30 text-blue-300 border-blue-500/30", highlighted: true },
      { name: "JavaScript (JS)", color: "bg-amber-600/30 text-amber-300 border-amber-500/30", highlighted: true },
      { name: "SQL", color: "bg-sky-600/30 text-sky-300 border-sky-500/30" },
      { name: "MySQL", color: "bg-cyan-600/30 text-cyan-300 border-cyan-500/30" },
      { name: "PHP", color: "bg-violet-600/30 text-violet-300 border-violet-500/30" },
      { name: "C", color: "bg-indigo-600/30 text-indigo-300 border-indigo-500/30" },
      { name: "HTML/CSS", color: "bg-fuchsia-600/30 text-fuchsia-300 border-fuchsia-500/30" }
    ]
  },
  {
    title: "Domain",
    iconName: "Layers",
    skills: [
      { name: "Software Developer", color: "bg-indigo-600/30 text-indigo-300 border-indigo-500/30", highlighted: true },
      { name: "Web Development", color: "bg-purple-600/30 text-purple-300 border-purple-500/30", highlighted: true }
    ]
  },
  {
    title: "Tools",
    iconName: "Wrench",
    skills: [
      { name: "Canva", color: "bg-purple-600/30 text-purple-300 border-purple-500/30" },
      { name: "Figma", color: "bg-pink-600/30 text-pink-300 border-pink-500/30", highlighted: true },
      { name: "Power BI", color: "bg-amber-600/30 text-amber-300 border-amber-500/30", highlighted: true },
      { name: "VS Code", color: "bg-blue-600/30 text-blue-300 border-blue-500/30" },
      { name: "Advanced Excel", color: "bg-emerald-600/30 text-emerald-300 border-emerald-500/30", highlighted: true },
      { name: "Git & GitHub", color: "bg-orange-600/30 text-orange-300 border-orange-500/30", highlighted: true },
      { name: "Claude", color: "bg-orange-600/30 text-orange-300 border-orange-500/30", highlighted: true },
      { name: "Gemini", color: "bg-sky-600/30 text-sky-300 border-sky-500/30", highlighted: true }
    ]
  }
];

export const INTERNSHIPS: Internship[] = [
  {
    id: "int-1",
    role: "Php with Mysql",
    company: "Esoft IT Solution",
    description: "Built dynamic web applications with relational database integration, session management, user authentication, and server-side processing.",
    skills: ["PHP", "MySQL", "Web Development", "Database Management"]
  },
  {
    id: "int-2",
    role: "Data Visualization using PowerBI",
    company: "T4TEQ Software Solution",
    description: "Engineered interactive analytics dashboards, custom visualizations, KPI metric tracking cards, and dynamic reports.",
    skills: ["Power BI", "Data Visualization", "Analytics", "DAX"]
  },
  {
    id: "int-3",
    role: "Data Analytics (Advanced Excel, PowerBI, Python & Libraries)",
    company: "T4TEQ Software Solution",
    description: "Performed end-to-end data cleansing, exploratory data analysis using Pandas and NumPy, statistical modeling, and advanced Excel pivot reports.",
    skills: ["Python", "Advanced Excel", "Power BI", "Pandas", "NumPy", "Data Analytics"]
  },
  {
    id: "int-4",
    role: "Sensor Technology",
    company: "HCIICT (Holy Cross College)",
    description: "Explored sensor data acquisition, IoT hardware-software interfacing, microcontroller telemetry, and real-time data capture.",
    skills: ["Sensor Tech", "IoT", "Embedded Systems", "Hardware Interfacing"]
  },
  {
    id: "int-5",
    role: "Core Java",
    company: "IAFC",
    description: "Developed object-oriented Java software solutions utilizing multithreading, event handling, data structures, and swing interfaces.",
    skills: ["Java", "OOP", "Data Structures", "Software Engineering"]
  },
  {
    id: "int-6",
    role: "Full Stack Web Development",
    company: "HCIICT (Holy Cross College)",
    description: "Engineered responsive full-stack web applications featuring customized frontend user interfaces, backend APIs, and database persistence.",
    skills: ["Full Stack", "HTML/CSS", "JavaScript", "PHP", "MySQL"]
  },
  {
    id: "int-7",
    role: "Implant Training",
    company: "Hitakey Tech Solution PVT LTD",
    description: "Gained practical corporate IT industry exposure in software development workflows, version control, database maintenance, and live project implementation.",
    skills: ["Software Engineering", "System Architecture", "Git", "SDLC"]
  }
];

export const WORKSHOPS: Workshop[] = [
  {
    id: "ws-1",
    title: "Futuristic Trends in Computational Sciences '24",
    type: "Seminar",
    year: "2024"
  },
  {
    id: "ws-2",
    title: "Filmmaking in SHORT-24",
    type: "Seminar",
    year: "2024"
  },
  {
    id: "ws-3",
    title: "Futuristic Trends in Computational Sciences ICFTCS-2023",
    type: "Seminar",
    year: "2023"
  },
  {
    id: "ws-4",
    title: "Overview of Securities Market and Career Growth",
    type: "Webinar",
    year: "2023"
  },
  {
    id: "ws-5",
    title: "Overview of Securities Market and Latest Development",
    type: "Webinar",
    year: "2023"
  },
  {
    id: "ws-6",
    title: "Next-Gen AI: Innovations and impacts",
    type: "Seminar",
    year: "2024"
  },
  {
    id: "ws-7",
    title: "International Digital Innovation Summit",
    type: "Summit",
    year: "2024"
  },
  {
    id: "ws-mern",
    title: 'Two-Day National Workshop on "MERN Stack Development"',
    type: "Workshop",
    year: "2024"
  },
  {
    id: "ws-8",
    title: "International Workshop on Full stack web development",
    type: "Workshop",
    year: "2024"
  }
];

export const CERTIFICATIONS: HighlightItem[] = [
  {
    id: "cert-1",
    title: "Introduction to Psychology",
    issuer: "NPTEL",
    type: "certification",
    icon: "Award"
  },
  {
    id: "cert-2",
    title: "Basics of Health Promotion and Education Intervention",
    issuer: "NPTEL",
    type: "certification",
    icon: "Award"
  },
  {
    id: "cert-3",
    title: "Core Java",
    issuer: "TNCSC",
    type: "certification",
    icon: "Award"
  },
  {
    id: "cert-4",
    title: "Adolescent Health and Well-Being",
    issuer: "NPTEL",
    type: "certification",
    icon: "Award"
  },
  {
    id: "cert-5",
    title: "Developing Soft Skills and Personality",
    issuer: "NPTEL",
    type: "certification",
    icon: "Award"
  }
];

export const ACHIEVEMENTS: HighlightItem[] = [
  {
    id: "ach-1",
    title: "Sports Club - Leadership Achievement",
    issuer: "Holy Cross College",
    type: "achievement",
    icon: "Trophy"
  },
  {
    id: "ach-2",
    title: "General Proficiency in Computer Application – Second Prize",
    issuer: "Holy Cross College",
    type: "achievement",
    icon: "Trophy"
  },
  {
    id: "ach-3",
    title: "ADZAP Runner-Up",
    issuer: "College Tech Fest",
    type: "achievement",
    icon: "Trophy"
  },
  {
    id: "ach-4",
    title: "Organized DumShards Event in WebFest",
    issuer: "Department of Computer Applications",
    type: "achievement",
    icon: "Trophy"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "Streamline Toll Crossing Systems",
    badge: "LEAD DEVELOPER",
    description: "A comprehensive web-based system designed to optimize and automate toll booth operations. Developed using PHP and MySQL to ensure reliable data management and swift transaction processing.",
    fullDescription: "Streamline Toll Crossing Systems simplifies vehicle classification, fast-pass lane authorization, and automated toll receipt generation. Built with a robust PHP backend and relational MySQL schema, it provides toll plaza managers real-time lane analytics, transaction logging, and swift queue handling.",
    tech: ["PHP", "MySQL"],
    githubUrl: "https://github.com",
    image: tollImg,
    highlights: [
      "Automated Toll Payment Processing with receipt generation",
      "Real-time vehicle classification & RFID tag reader simulator",
      "Admin dashboard with daily revenue analytics and lane traffic monitoring",
      "High concurrency queue handler using relational MySQL procedures"
    ],
    features: [
      "Instant Electronic Toll Collection (ETC) verification",
      "Exemption and monthly pass management for local commuters",
      "Transaction audit trails with exportable reports",
      "Low-latency response design optimized for high traffic lanes"
    ]
  },
  {
    id: "proj-2",
    title: "Ideas That Can Boost Fitness Activities",
    badge: "RESEARCH & SURVEY LEAD",
    description: "A comprehensive Google Form survey initiative designed to gather community ideas, fitness habit tracking metrics, and actionable lifestyle feedback to boost daily workout engagement.",
    fullDescription: "Built and deployed as a structured Google Form survey platform to collect community responses on daily exercise habits, barriers to active living, and innovative fitness suggestions. Aggregated responses provide valuable analytical insights to formulate technology-driven health interventions.",
    tech: ["Google Forms", "Survey Analytics", "Data Collection"],
    image: fitnessImg,
    highlights: [
      "Structured Google Form data collection for community fitness preferences",
      "Survey response analytics on daily workout habit barriers",
      "Actionable health idea aggregation & feedback categorization",
      "Data-driven insights to boost daily physical activities"
    ],
    features: [
      "Comprehensive Google Form questionnaire for user engagement",
      "Automated response aggregation & metric categorization",
      "Community suggestion box for lifestyle improvement ideas",
      "Analytics summary of user exercise frequency & preferences"
    ]
  },
  {
    id: "proj-3",
    title: "Smile Steps",
    badge: "WEB APPLICATION",
    description: "An engaging digital pediatric and dental wellness web application designed to encourage consistent oral hygiene routines, healthy habit streaks, and milestone achievements.",
    fullDescription: "Smile Steps is a specialized health and dental care tracking platform built to transform daily dental routines for children and young adults into fun, rewarding experiences. Includes interactive brushing timers, smile wellness checklists, milestone badges, and direct clinic coordination.",
    tech: ["React", "JavaScript", "HTML5", "CSS3", "HealthTech"],
    githubUrl: "https://github.com/dhars-hub/smileSteps",
    demoUrl: "https://github.com/dhars-hub/smileSteps",
    image: smileStepsImg,
    highlights: [
      "Interactive 2-Minute Tooth Brushing coach with audio visual cues",
      "Smile milestone achievement rewards & dental streak tracker",
      "Oral hygiene tips & pediatric dental health guides",
      "Family profile management and routine logs"
    ],
    features: [
      "Live interactive brushing timer with progress animation",
      "Daily morning & night habit checklist with reward tokens",
      "Dental care progress tracking and symptom self-check guide",
      "Responsive, kid-friendly and family-oriented user interface"
    ]
  },
  {
    id: "proj-4",
    title: "Movie App (UI/UX Design)",
    badge: "UI/UX DESIGN",
    description: "A high-fidelity mobile application UI/UX prototype created in Figma for seamless movie streaming discovery, cinema theater seat booking, and cinematic media consumption.",
    fullDescription: "Designed an immersive, modern dark-themed movie exploration and ticket reservation mobile experience in Figma. Features intuitive navigation with hero trending carousels, categorized genre feeds, rich cast & review details, dynamic seat matrix selection, and streamlined checkout flows.",
    tech: ["Figma", "UI/UX Design", "Wireframing", "Prototyping", "Design System"],
    figmaUrl: "https://www.figma.com/design/12KdwQKedzgIrpYkSK4cMb/Untitled?node-id=11-41&t=2Uf6TAwsGQ3thrHi-0",
    image: movieAppImg,
    highlights: [
      "High-fidelity Figma UI prototype with cinematic dark aesthetics",
      "Interactive cinema hall seat selection matrix and pricing calculator",
      "Rich movie details layout with trailers, cast spotlight, and reviews",
      "User-tested mobile navigation with bottom bar and quick search"
    ],
    features: [
      "Trending movie carousel with immersive backdrop hero cards",
      "Interactive seat reservation system (Standard, VIP, Recliner)",
      "Dark mode visual system with high-contrast accessibility standards",
      "Complete user journey from movie browsing to instant ticket booking"
    ]
  }
];
