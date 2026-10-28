import { ansi } from '../utils/ansi.js';

export function skills() {
  const categories = [
    {
      title: 'Languages',
      color: 'brightCyan',
      items: [
        { name: 'Java', pct: 95, tag: 'Java 21+, Virtual Threads (Loom), Concurrency, Memory Optimization' },
        { name: 'C', pct: 85, tag: 'Pointers, Manual Memory Management, POSIX Syscalls, Structs' },
        { name: 'C++', pct: 85, tag: 'STL Containers, RAII, Object-Oriented Programming, Low-Level I/O' },
        { name: 'Python', pct: 88, tag: 'Automation, Scripting, Data Analysis, Fast Prototyping' },
      ],
    },
    {
      title: 'Frontend',
      color: 'brightMagenta',
      items: [
        { name: 'React.js', pct: 92, tag: 'Hooks, Functional Components, State Management, Virtual DOM' },
        { name: 'Next.js', pct: 88, tag: 'Server-Side Rendering (SSR), App Router, Static Site Generation' },
        { name: 'HTML5', pct: 95, tag: 'Semantic Markup, Accessibility (a11y), DOM, Canvas API' },
        { name: 'CSS3', pct: 92, tag: 'Flexbox, CSS Grid, Responsive Design, CRT / Scanline Effects' },
        { name: 'Tailwind CSS', pct: 94, tag: 'Utility-First Styling, Responsive Breakpoints, Custom Design Systems' },
        { name: 'JavaScript / TypeScript', pct: 92, tag: 'Modern ES2024+, Async/Await, Strict Typing, DOM APIs' },
        { name: 'Vite', pct: 90, tag: 'HMR, Fast Bundling, Asset Optimization, Tree Shaking' },
      ],
    },
    {
      title: 'Backend',
      color: 'brightGreen',
      items: [
        { name: 'Spring Boot', pct: 90, tag: 'RESTful APIs, Dependency Injection, Spring Security, Hibernate/JPA' },
        { name: 'Node.js & Express', pct: 88, tag: 'Event-Driven Async I/O, REST APIs, Middleware Architecture' },
        { name: 'RESTful APIs', pct: 92, tag: 'API Design, JSON Schemas, Authentication & Middleware' },
        { name: 'Concurrency & Multi-Threading', pct: 94, tag: 'Virtual Threads (Project Loom), Work-Stealing Pools, Thread Safety' },
        { name: 'Microservices Architecture', pct: 86, tag: 'Service Decoupling, Inter-Service Communication, Resilience' },
      ],
    },
    {
      title: 'Databases',
      color: 'brightYellow',
      items: [
        { name: 'PostgreSQL', pct: 90, tag: 'Relational Modeling, Indexing, ACID Compliance, Complex Queries' },
        { name: 'MySQL / SQL', pct: 88, tag: 'Schema Design, Joins, Aggregations, Stored Procedures, Views' },
        { name: 'MongoDB', pct: 85, tag: 'NoSQL Document Store, Aggregation Pipelines, Collections' },
        { name: 'SQLite', pct: 92, tag: 'Embedded/Edge Storage, Zero-Config, Fast Local Persistence' },
        { name: 'Redis', pct: 84, tag: 'In-Memory Data Store, Caching Strategies, Pub/Sub, Fast Lookups' },
      ],
    },
    {
      title: 'Tools',
      color: 'brightBlue',
      items: [
        { name: 'Git & GitHub', pct: 94, tag: 'Version Control, Branching Strategies, PRs, Merge Conflicts' },
        { name: 'Docker & Containers', pct: 88, tag: 'Containerization, Multi-Stage Builds, Distroless Images' },
        { name: 'Linux / Bash Shell', pct: 92, tag: 'POSIX Shell Scripting, Arch/Debian, System Administration' },
        { name: 'GitHub Actions CI/CD', pct: 88, tag: 'Automated Testing, Continuous Integration, Multi-OS Matrix' },
        { name: 'Maven Build System', pct: 90, tag: 'Dependency Management, Build Automation, Plugins' },
        { name: 'Neovim & Tmux', pct: 90, tag: 'Terminal Productivity, Modal Editing, Session Multiplexing' },
      ],
    },
    {
      title: 'Conceptual Concepts',
      color: 'brightRed',
      items: [
        { name: 'Data Structures & Algorithms', pct: 92, tag: 'Arrays, Trees, Graphs, Hash Maps, DP, Complexity Analysis' },
        { name: 'Operating Systems (OS)', pct: 90, tag: 'Process Scheduling, Concurrency & Deadlocks, Virtual Memory, Syscalls' },
        { name: 'Computer Networks (CN)', pct: 92, tag: 'TCP/IP, UDP Sockets, OSI Layers, DNS, HTTP/HTTPS Handshakes' },
        { name: 'DBMS & Relational Theory', pct: 90, tag: 'ACID Properties, Normalization, Indexing, Transactions, Concurrency' },
        { name: 'Object-Oriented Design (OOP)', pct: 94, tag: 'Encapsulation, Inheritance, Polymorphism, Abstraction, SOLID' },
        { name: 'System Design & Distributed', pct: 86, tag: 'Scalability, Load Balancing, Caching, P2P Architecture, Fault Tolerance' },
      ],
    },
    {
      title: 'Systems & Architecture',
      color: 'brightWhite',
      items: [
        { name: 'Raw Sockets (TCP/UDP)', pct: 94, tag: 'Socket Tuning, Buffer Sizing, Nagle Algorithm, RTT Telemetry' },
        { name: 'Binary Framing Protocols', pct: 92, tag: 'Fixed Headers, Network Byte Order (Big-Endian), Custom Frame Types' },
        { name: 'GraalVM Native Image (AOT)', pct: 90, tag: 'Ahead-of-Time Compilation, <8ms Cold Startup, Substrate VM' },
        { name: 'Applied Cryptography', pct: 88, tag: 'AES-256-GCM AEAD, PBKDF2 (100k rounds), Anti-Tamper Verification' },
        { name: 'Zero-Allocation Parsing', pct: 94, tag: 'Positional Scanner, Regex NFA Bypass, Flyweight Pattern' },
        { name: 'Memory-Mapped I/O (Mmap)', pct: 88, tag: 'Boundary-Aligned Partitioning, Zero-Copy Stream Processing' },
      ],
    },
  ];

  const lines = [
    ansi.bold(ansi.brightWhite('TECHNICAL SKILLS & PROFICIENCIES')),
    ansi.gray('═'.repeat(70)),
    ansi.dim('Languages, full-stack technologies, developer tooling, core CS concepts, and systems architecture.'),
    '',
  ];

  for (const cat of categories) {
    lines.push(ansi.bold(ansi[cat.color](`[ ${cat.title} ]`)));
    lines.push(ansi.gray('─'.repeat(70)));

    for (const item of cat.items) {
      const nameCol = ansi.padEnd(ansi.bold(item.name), 30);
      const bar = ansi.progressBar(item.pct, 14);
      const tag = ansi.dim(` ${item.tag}`);
      lines.push(`  ${nameCol} ${bar} ${tag}`);
    }

    lines.push('');
  }

  lines.push(ansi.gray('Run `cat skills.json` for the raw structured JSON data.'));

  return lines.join('\n');
}
