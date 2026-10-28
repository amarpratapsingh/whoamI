export const PROFILE = {
  name: 'Amar Pratap Singh',
  handle: 'amarpratapsingh',
  title: 'Systems & Software Engineer | CS Undergrad',
  university: 'KIIT Bhubaneswar (CGPA: 7.97/10)',
  status: 'Open to opportunities',
  phone: '+91 6370550534',
  email: 'amar.p.s.1509@gmail.com',
  github: 'https://github.com/amarpratapsingh',
  linkedin: 'https://linkedin.com/in/amar-pratap-singh',
  website: 'https://amarpratap.dev',
  resumeText: 'Use `curl amarpratap.dev` in a real terminal for the ANSI resume.',
};

export const SKILLS = {
  languages: ['Java', 'C', 'C++', 'Python'],
  frontend: [
    'React.js',
    'Next.js',
    'HTML5',
    'CSS3',
    'Tailwind CSS',
    'JavaScript / TypeScript',
    'Vite',
  ],
  backend: [
    'Spring Boot',
    'Node.js & Express',
    'RESTful APIs',
    'Concurrency & Multi-Threading',
    'Microservices Architecture',
  ],
  databases: ['PostgreSQL', 'MySQL / SQL', 'MongoDB', 'SQLite', 'Redis'],
  tools: [
    'Git & GitHub',
    'Docker & Containers',
    'Linux / Bash Shell',
    'GitHub Actions CI/CD',
    'Maven Build System',
    'Neovim & Tmux',
  ],
  conceptual_concepts: [
    'Data Structures & Algorithms (DSA)',
    'Operating Systems (OS)',
    'Computer Networks (CN)',
    'Database Management Systems (DBMS)',
    'Object-Oriented Programming (OOP / SOLID)',
    'System Design & Distributed Systems',
  ],
  systems_architecture: [
    'Raw TCP/UDP Sockets',
    'Binary Framing Protocols',
    'GraalVM Native Image (AOT)',
    'AES-256-GCM / PBKDF2 Cryptography',
    'Zero-Allocation Parsing',
    'Memory-Mapped Files (Mmap)',
  ],
};

Object.defineProperty(SKILLS, 'database', {
  get() {
    return this.databases;
  },
  enumerable: false,
});

Object.defineProperty(SKILLS, 'systems_networking', {
  get() {
    return this.systems_architecture;
  },
  enumerable: false,
});

export const PROJECTS = [
  {
    name: 'ThreadTrace',
    desc: 'Multi-threaded CLI log analyzer in Java 21 & GraalVM AOT with <8ms startup and 1.34 GB/s throughput',
    stack: 'Java 21, GraalVM AOT, Virtual Threads, Zero-Allocation Positional Scanner, Mmap, Web Dashboard',
    link: 'https://github.com/amarpratapsingh/ThreadTrace',
  },
  {
    name: 'AirSocket',
    desc: 'Zero-runtime-dependency P2P file transfer engine and low-level networking lab built purely on java.base',
    stack: 'Java 21 (java.base), Raw TCP/UDP Sockets, AES-256-GCM AEAD, PBKDF2, Project Loom, Binary Framing V4',
    link: 'https://github.com/amarpratapsingh/AirSocket',
  },
  {
    name: 'BitGit',
    desc: 'Distributed Git-compatible version control system from scratch with SHA-1 content-addressable storage',
    stack: 'Node.js, SHA-1 Hashing, Custom Object Database, Plumbing/Porcelain Commands',
    link: 'https://github.com/amarpratapsingh/BitGit',
  },
];

export const RESEARCH = [
  {
    title: 'Explainable Artificial Intelligence for Transparent Medical Diagnosis',
    role: 'Research Co-author & Presenter',
    venue: 'ComSIA-2026 (International Conference on Computing and Communication Systems)',
    date: 'Mar. 2026',
    highlights: [
      'Conducted literature analysis of XAI techniques in healthcare, including SHAP, LIME, and Grad-CAM, and their application to clinical decision-making.',
      'Analyzed research on AI transparency, clinical trust, algorithmic bias, interpretability, and challenges in healthcare diagnostics.',
      'Co-authored and presented the peer-reviewed research paper at ComSIA-2026.',
    ],
  },
];

export const CERTIFICATIONS = [
  {
    title: 'Java Development Certification',
    issuer: 'Udemy',
    date: 'Jan 2025',
    topics: 'Core Java, OOP, Multithreading, File I/O, Collections Framework',
  },
];

export const CONTACTS = {
  github: PROFILE.github,
  linkedin: PROFILE.linkedin,
  email: PROFILE.email,
  phone: PROFILE.phone,
  website: PROFILE.website,
};
