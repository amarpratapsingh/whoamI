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
  languages: ['Java (21+)', 'C', 'C++', 'JavaScript (ES2024)', 'TypeScript', 'Python', 'Bash / POSIX'],
  systems_networking: [
    'Raw TCP/UDP Sockets',
    'Project Loom (Virtual Threads)',
    'GraalVM Native Image (AOT)',
    'AES-256-GCM / PBKDF2 Cryptography',
    'Custom Binary Framing Protocols',
    'Socket Buffer & TCP Window Tuning',
    'Linux Traffic Control (tc/netem)',
  ],
  backend: [
    'High-Throughput Concurrency',
    'Zero-Allocation Parsing',
    'Memory-Mapped Files (Mmap)',
    'Spring Boot',
    'Node.js & Express',
  ],
  database: ['PostgreSQL', 'SQL', 'SQLite (Offline/Edge)', 'MongoDB'],
  frontend: ['React.js', 'xterm.js (VT100/WebGL)', 'HTML5 / Canvas', 'Tailwind CSS', 'CSS3 (Scanlines/CRT)', 'Vite'],
  tools: [
    'Linux (Arch/Debian)',
    'Git & GitHub Actions CI/CD',
    'Docker (Distroless Native)',
    'Maven Build System',
    'JaCoCo Code Coverage',
    'SpotBugs & Checkstyle',
    'Neovim & Tmux',
  ],
};

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
