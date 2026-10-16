import { ansi } from '../utils/ansi.js';

export function skills() {
  const categories = [
    {
      title: 'SYSTEMS PROGRAMMING & CONCURRENCY',
      color: 'brightCyan',
      items: [
        { name: 'Java 21+ (java.base)', pct: 95, tag: 'Virtual Threads (Loom), Sealed Types, Zero-Alloc' },
        { name: 'GraalVM Native Image', pct: 90, tag: 'AOT Compilation, <8ms Cold Startup, Substrate VM' },
        { name: 'C / C++', pct: 82, tag: 'Memory Management, Pointers, POSIX Syscalls' },
        { name: 'Bash / Linux Shell', pct: 90, tag: 'POSIX Shell, Kernel Traffic Control (tc), Systemd' },
        { name: 'Python', pct: 88, tag: 'Automation, System Tooling, Test Orchestration' },
      ],
    },
    {
      title: 'NETWORKING & PROTOCOL DESIGN',
      color: 'brightYellow',
      items: [
        { name: 'Raw Sockets (TCP/UDP)', pct: 94, tag: 'SO_SNDBUF/RCVBUF Tuning, Nagle, RTT Ping Telemetry' },
        { name: 'Binary Framing Protocols', pct: 92, tag: '28-Byte Fixed Headers, Big-Endian, Frame Types' },
        { name: 'Applied Cryptography', pct: 88, tag: 'AES-256-GCM AEAD, PBKDF2 (100k rounds), Anti-Tamper' },
        { name: 'Deterministic State Machines', pct: 90, tag: 'FSM Session Lifecycles, Binary Crash Journals' },
      ],
    },
    {
      title: 'HIGH-PERFORMANCE ARCHITECTURE & OBSERVABILITY',
      color: 'brightGreen',
      items: [
        { name: 'Zero-Allocation Parsing', pct: 95, tag: 'Positional Scanner, Regex NFA Bypass (10x speedup)' },
        { name: 'Memory-Mapped I/O (Mmap)', pct: 88, tag: 'Boundary-Aligned Partitioning, GZIP Streams' },
        { name: 'Linux Traffic Simulation', pct: 86, tag: 'Kernel tc/netem Latency, Jitter & Loss Emulation' },
        { name: 'Observability & Dashboards', pct: 88, tag: 'Embedded Web Servers, Multi-Format Exporters' },
      ],
    },
    {
      title: 'FRONTEND CRAFT & TERMINAL INTERFACES',
      color: 'brightMagenta',
      items: [
        { name: 'xterm.js & Terminal UX', pct: 92, tag: 'VT100, ANSI Escape Codes, WebGL GPU Rendering' },
        { name: 'HTML5 / CSS3 / Canvas', pct: 94, tag: 'CRT Scanlines, CRT Phosphor Glow, Responsive' },
        { name: 'JavaScript / TypeScript', pct: 92, tag: 'Modern ES2024, Node.js, Event Loops, DOM APIs' },
        { name: 'Vite & Build Tooling', pct: 90, tag: 'HMR, Plugins, Tree-Shaking, Static Bundling' },
      ],
    },
    {
      title: 'ENGINEERING RIGOR, VERIFICATION & DEVOPS',
      color: 'brightBlue',
      items: [
        { name: 'Git & GitHub Actions CI/CD', pct: 92, tag: 'Multi-OS Matrix (Ubuntu, macOS, Windows)' },
        { name: 'Static & Bytecode Analysis', pct: 90, tag: 'SpotBugs Leak Analysis, Checkstyle (0 violations)' },
        { name: 'Code Coverage & Profiling', pct: 88, tag: 'JaCoCo Coverage, Heap/GC Pause System Profiling' },
        { name: 'Docker & Distroless', pct: 86, tag: 'Minimal <32MB Native Containers, Multi-Stage Builds' },
      ],
    },
  ];

  const lines = [
    ansi.bold(ansi.brightWhite('TECHNICAL SKILLS & PROFICIENCIES')),
    ansi.gray('═'.repeat(70)),
    ansi.dim('Mastery across systems-level software, networking protocols, and terminal user experiences.'),
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
