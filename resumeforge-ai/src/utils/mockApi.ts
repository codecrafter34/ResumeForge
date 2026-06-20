// Mock API for local generation

export const generateResumeBullets = async (projectName: string, tech: string, desc: string) => {
  await new Promise((r) => setTimeout(r, 1200));
  return {
    bullets: [
      `Engineered and deployed a robust ${projectName || "application"} using ${tech || "modern frameworks"}, reducing latency by 20%.`,
      `Architected scalable backend services that improved data processing efficiency by 35%.`,
      `Collaborated with cross-functional teams to integrate ${tech || "third-party APIs"}, enhancing overall user experience.`,
      `Optimized database queries, resulting in a 50% decrease in average response time for complex operations.`,
      `Implemented automated testing pipelines, increasing code coverage to 90% and reducing production bugs.`
    ],
    summary: `Developed a responsive ${projectName || "platform"} using ${tech || "various technologies"}, improving user experience and performance. ${desc.slice(0, 50)}...`,
    impactStatements: [
      "Reduced page load time by 40%",
      "Increased user engagement by 25%",
      "Scaled to handle 10,000+ concurrent users"
    ]
  };
};

export const generateKeywords = async (role: string) => {
  await new Promise((r) => setTimeout(r, 1000));
  const baseSkills = ["Agile Methodology", "Git", "REST APIs", "CI/CD"];
  let specificSkills: string[] = [];
  
  if (role.toLowerCase().includes("frontend")) {
    specificSkills = ["React", "TypeScript", "Tailwind CSS", "Redux", "Webpack"];
  } else if (role.toLowerCase().includes("backend")) {
    specificSkills = ["Node.js", "Python", "PostgreSQL", "Docker", "AWS"];
  } else if (role.toLowerCase().includes("data")) {
    specificSkills = ["Python", "SQL", "Pandas", "Machine Learning", "Tableau"];
  } else {
    specificSkills = ["JavaScript", "HTML/CSS", "Problem Solving", "System Design"];
  }

  return {
    keywords: [...specificSkills, ...baseSkills, "Optimization", "Scalability", "Architecture"],
    skills: specificSkills,
    tools: ["VS Code", "Jira", "GitHub", "Figma"],
    frameworks: specificSkills.slice(0, 2)
  };
};

export const generateSummary = async (skills: string, level: string, goal: string) => {
  await new Promise((r) => setTimeout(r, 1100));
  return {
    professional: `Results-driven ${level} professional with expertise in ${skills || "various technologies"}. Proven track record of delivering scalable solutions. Seeking a ${goal || "challenging role"} to leverage technical acumen and drive innovation.`,
    fresher: `Highly motivated and detail-oriented graduate with foundational knowledge in ${skills || "software development"}. Eager to apply academic learning and personal project experience to a ${goal || "dynamic role"} and contribute to team success.`,
    experienced: `Accomplished senior technologist with extensive experience in ${skills || "system architecture and team leadership"}. Demonstrated ability to lead cross-functional teams and deliver high-impact projects. Looking to transition into ${goal || "leadership"} to drive strategic technical initiatives.`
  };
};

export const enhanceBullet = async (bullet: string) => {
  await new Promise((r) => setTimeout(r, 800));
  return `Developed and deployed a highly responsive solution related to "${bullet}", utilizing modern frontend technologies to improve usability and overall system performance by 30%.`;
};

export const generateActionVerbs = async (_word: string) => {
  await new Promise((r) => setTimeout(r, 600));
  return [
    "Engineered",
    "Architected",
    "Spearheaded",
    "Orchestrated",
    "Optimized",
    "Pioneered",
    "Transformed",
    "Revitalized"
  ];
};

export const analyzeATS = async (_text: string) => {
  await new Promise((r) => setTimeout(r, 1500));
  return {
    score: Math.floor(Math.random() * 20) + 70, // 70-90
    missingKeywords: ["Cloud Computing", "CI/CD", "Unit Testing"],
    weakVerbs: ["Worked", "Helped", "Made"],
    suggestions: [
      "Add quantifiable metrics to your achievements (e.g., 'improved by X%').",
      "Replace weak verbs with strong action words like 'Spearheaded' or 'Engineered'.",
      "Ensure all relevant technical skills are explicitly listed in the skills section."
    ],
    strength: "Good"
  };
};
