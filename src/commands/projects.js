import { ansi } from '../utils/ansi.js';

function renderCodeWindow(title, codeLines, hintText) {
  const maxLen = Math.max(68, ...codeLines.map(l => l.raw.length));
  const totalWidth = maxLen + 8;
  const topBorder = ansi.gray(`╭${'─'.repeat(totalWidth)}╮`);
  const midBorder = ansi.gray(`├${'─'.repeat(totalWidth)}┤`);
  const splitBorder = ansi.gray(`├────┬${'─'.repeat(totalWidth - 5)}┤`);
  const bottomBorder = ansi.gray(`╰────┴${'─'.repeat(totalWidth - 5)}╯`);

  const dots = `${ansi.brightRed('●')} ${ansi.brightYellow('●')} ${ansi.brightGreen('●')}`;
  const rightDots = ansi.gray('•••');
  const padL = Math.floor((totalWidth - 7 - 5 - title.length) / 2);
  const padR = totalWidth - 7 - 5 - title.length - padL;
  const topBar = `${ansi.gray('│')}  ${dots}${' '.repeat(Math.max(0, padL))}${ansi.bold(ansi.brightWhite(title))}${' '.repeat(Math.max(0, padR))}${rightDots}  ${ansi.gray('│')}`;

  const toolL = '  ⎘  ⧉  ▤  ↓  ( )  { }';
  const toolR = '□  •••  ';
  const toolPad = Math.max(0, totalWidth - toolL.length - toolR.length);
  const toolLine = `${ansi.gray('│')}${ansi.gray(toolL)}${' '.repeat(toolPad)}${ansi.gray(toolR)}${ansi.gray('│')}`;

  const lines = [topBorder, topBar, midBorder, toolLine, splitBorder];

  codeLines.forEach((item, idx) => {
    const lineNum = String(idx + 1).padStart(2, ' ');
    if (!item.raw) {
      lines.push(`${ansi.gray('│')} ${ansi.gray(`${lineNum} │`)}${' '.repeat(Math.max(0, totalWidth - 5))}${ansi.gray('│')}`);
    } else {
      const padLen = Math.max(0, totalWidth - 6 - item.raw.length);
      lines.push(`${ansi.gray('│')} ${ansi.gray(`${lineNum} │`)} ${item.colored}${' '.repeat(padLen)}${ansi.gray('│')}`);
    }
  });

  lines.push(bottomBorder);

  if (hintText) {
    lines.push('');
    lines.push(hintText);
  }

  return lines.join('\n');
}

export function projects({ args }) {
  const rawTarget = (args[0] || '').toLowerCase().replace(/[-_\s]/g, '');

  if (rawTarget === 'threadtrace') {
    const codeLines = [
      { raw: '', colored: '' },
      { raw: '{', colored: ansi.white('{') },
      { raw: '  "name": "ThreadTrace",', colored: `  ${ansi.brightRed('"name"')}: ${ansi.brightYellow('"ThreadTrace"')},` },
      { raw: '  "status": "FEATURED",', colored: `  ${ansi.brightRed('"status"')}: ${ansi.brightGreen('"FEATURED"')},` },
      { raw: '  "type": "High-Throughput CLI Log Analyzer & GraalVM AOT",', colored: `  ${ansi.brightRed('"type"')}: ${ansi.brightYellow('"High-Throughput CLI Log Analyzer & GraalVM AOT"')},` },
      { raw: '  "stack": "Java 21, GraalVM AOT, Virtual Threads, Mmap",', colored: `  ${ansi.brightRed('"stack"')}: ${ansi.brightYellow('"Java 21, GraalVM AOT, Virtual Threads, Mmap"')},` },
      { raw: '  "benchmarks": {', colored: `  ${ansi.brightRed('"benchmarks"')}: ${ansi.white('{')}` },
      { raw: '    "peak_throughput": "1.34 GB/s (1,344.51 MB/s across 8 threads)",', colored: `    ${ansi.brightRed('"peak_throughput"')}: ${ansi.brightYellow('"1.34 GB/s (1,344.51 MB/s across 8 threads)"')},` },
      { raw: '    "dataset": "200MB / 2.18M lines in 148.75 ms (100% consistent)",', colored: `    ${ansi.brightRed('"dataset"')}: ${ansi.brightYellow('"200MB / 2.18M lines in 148.75 ms (100% consistent)"')},` },
      { raw: '    "cold_startup": "<8ms (GraalVM AOT) vs ~160ms (JVM)",', colored: `    ${ansi.brightRed('"cold_startup"')}: ${ansi.brightYellow('"<8ms (GraalVM AOT) vs ~160ms (JVM)"')},` },
      { raw: '    "memory_rss": "~26MB (Native) vs ~140MB (JVM)",', colored: `    ${ansi.brightRed('"memory_rss"')}: ${ansi.brightYellow('"~26MB (Native) vs ~140MB (JVM)"')},` },
      { raw: '    "single_thread": "10x speedup via positional scanning (4,153ms -> 419ms)"', colored: `    ${ansi.brightRed('"single_thread"')}: ${ansi.brightYellow('"10x speedup via positional scanning (4,153ms -> 419ms)"')}` },
      { raw: '  },', colored: `  ${ansi.white('}')},` },
      { raw: '  "key_architectural_highlights": [', colored: `  ${ansi.brightRed('"key_architectural_highlights"')}: ${ansi.white('[')}` },
      { raw: '    "Parallel chunk partitioning with newline boundary alignment",', colored: `    ${ansi.brightGreen('"Parallel chunk partitioning with newline boundary alignment"')},` },
      { raw: '    "Zero-allocation positional scanner bypassing regex NFA engines",', colored: `    ${ansi.brightGreen('"Zero-allocation positional scanner bypassing regex NFA engines"')},` },
      { raw: '    "Signature-guided timestamp parser eliminating exception throws",', colored: `    ${ansi.brightGreen('"Signature-guided timestamp parser eliminating exception throws"')},` },
      { raw: '    "O(1) HashMap accumulators with static flyweights (ONE_ERROR, ONE_WARN)",', colored: `    ${ansi.brightGreen('"O(1) HashMap accumulators with static flyweights (ONE_ERROR, ONE_WARN)"')},` },
      { raw: '    "Sniffs JSON (Bunyan), Docker, Log4j, Syslog, Apache/Nginx, HDFS",', colored: `    ${ansi.brightGreen('"Sniffs JSON (Bunyan), Docker, Log4j, Syslog, Apache/Nginx, HDFS"')},` },
      { raw: '    "Multi-format export (JSON, CSV, MD, HTML) & browser Web Dashboard"', colored: `    ${ansi.brightGreen('"Multi-format export (JSON, CSV, MD, HTML) & browser Web Dashboard"')}` },
      { raw: '  ],', colored: `  ${ansi.white(']')},` },
      { raw: '  "github": "https://github.com/amarpratapsingh/ThreadTrace"', colored: `  ${ansi.brightRed('"github"')}: ${ansi.brightCyan('"https://github.com/amarpratapsingh/ThreadTrace"')}` },
      { raw: '}', colored: ansi.white('}') },
    ];

    const hint = `${ansi.dim('💡 Run')} ${ansi.brightGreen('projects')} ${ansi.dim('for all projects, or')} ${ansi.brightGreen('cat projects/threadtrace.md')} ${ansi.dim('for full markdown documentation.')}`;
    return renderCodeWindow('threadtrace.json', codeLines, hint);
  }

  if (rawTarget === 'airsocket') {
    const codeLines = [
      { raw: '', colored: '' },
      { raw: '{', colored: ansi.white('{') },
      { raw: '  "name": "AirSocket",', colored: `  ${ansi.brightRed('"name"')}: ${ansi.brightYellow('"AirSocket"')},` },
      { raw: '  "status": "FEATURED",', colored: `  ${ansi.brightRed('"status"')}: ${ansi.brightGreen('"FEATURED"')},` },
      { raw: '  "type": "Zero-Dependency P2P File Transfer & Networking Lab",', colored: `  ${ansi.brightRed('"type"')}: ${ansi.brightYellow('"Zero-Dependency P2P File Transfer & Networking Lab"')},` },
      { raw: '  "stack": "Java 21 (java.base), Raw Sockets, AES-256-GCM, Loom, V4 Framing",', colored: `  ${ansi.brightRed('"stack"')}: ${ansi.brightYellow('"Java 21 (java.base), Raw Sockets, AES-256-GCM, Loom, V4 Framing"')},` },
      { raw: '  "benchmarks": {', colored: `  ${ansi.brightRed('"benchmarks"')}: ${ansi.white('{')}` },
      { raw: '    "buffer_scaling": "5.41x leap (163.6 Mbps at 4KB to 886.0 Mbps at 512KB)",', colored: `    ${ansi.brightRed('"buffer_scaling"')}: ${ansi.brightYellow('"5.41x leap (163.6 Mbps at 4KB to 886.0 Mbps at 512KB)"')},` },
      { raw: '    "lan_saturation": "Saturates physical Gigabit LAN at 89.3 MB/s (714.4 Mbps)",', colored: `    ${ansi.brightRed('"lan_saturation"')}: ${ansi.brightYellow('"Saturates physical Gigabit LAN at 89.3 MB/s (714.4 Mbps)"')},` },
      { raw: '    "loopback_streaming": "Up to 16.3 Gbps memory-to-memory throughput",', colored: `    ${ansi.brightRed('"loopback_streaming"')}: ${ansi.brightYellow('"Up to 16.3 Gbps memory-to-memory throughput"')},` },
      { raw: '    "package_size": "50KB standalone executable fat JAR (zero CVE risk)",', colored: `    ${ansi.brightRed('"package_size"')}: ${ansi.brightYellow('"50KB standalone executable fat JAR (zero CVE risk)"')},` },
      { raw: '    "test_suite": "101 automated tests (SpotBugs, JaCoCo, Checkstyle: 0 violations)"', colored: `    ${ansi.brightRed('"test_suite"')}: ${ansi.brightYellow('"101 automated tests (SpotBugs, JaCoCo, Checkstyle: 0 violations)"')}` },
      { raw: '  },', colored: `  ${ansi.white('}')},` },
      { raw: '  "key_architectural_highlights": [', colored: `  ${ansi.brightRed('"key_architectural_highlights"')}: ${ansi.white('[')}` },
      { raw: '    "Zero third-party runtime dependencies (100% standard java.base)",', colored: `    ${ansi.brightGreen('"Zero third-party runtime dependencies (100% standard java.base)"')},` },
      { raw: '    "Zero-config LAN discovery on 42069/UDP with RTT ping telemetry",', colored: `    ${ansi.brightGreen('"Zero-config LAN discovery on 42069/UDP with RTT ping telemetry"')},` },
      { raw: '    "Fixed 28-byte binary framing with monotonic 64-bit sequence counters",', colored: `    ${ansi.brightGreen('"Fixed 28-byte binary framing with monotonic 64-bit sequence counters"')},` },
      { raw: '    "Deterministic state machine lifecycle with immediate invalid state drops",', colored: `    ${ansi.brightGreen('"Deterministic state machine lifecycle with immediate invalid state drops"')},` },
      { raw: '    "AES-256-GCM AEAD encryption with anti-tamper tag verification",', colored: `    ${ansi.brightGreen('"AES-256-GCM AEAD encryption with anti-tamper tag verification"')},` },
      { raw: '    "Deterministic crash recovery with binary journals (.airsocket_journal_*.bin)",', colored: `    ${ansi.brightGreen('"Deterministic crash recovery with binary journals (.airsocket_journal_*.bin)"')},` },
      { raw: '    "10-suite socket tuning lab & Linux kernel netem packet simulation"', colored: `    ${ansi.brightGreen('"10-suite socket tuning lab & Linux kernel netem packet simulation"')}` },
      { raw: '  ],', colored: `  ${ansi.white(']')},` },
      { raw: '  "github": "https://github.com/amarpratapsingh/AirSocket"', colored: `  ${ansi.brightRed('"github"')}: ${ansi.brightCyan('"https://github.com/amarpratapsingh/AirSocket"')}` },
      { raw: '}', colored: ansi.white('}') },
    ];

    const hint = `${ansi.dim('💡 Run')} ${ansi.brightGreen('projects')} ${ansi.dim('for all projects, or')} ${ansi.brightGreen('cat projects/airsocket.md')} ${ansi.dim('for full markdown documentation.')}`;
    return renderCodeWindow('airsocket.json', codeLines, hint);
  }

  if (rawTarget === 'bitgit') {
    const codeLines = [
      { raw: '', colored: '' },
      { raw: '{', colored: ansi.white('{') },
      { raw: '  "name": "BitGit",', colored: `  ${ansi.brightRed('"name"')}: ${ansi.brightYellow('"BitGit"')},` },
      { raw: '  "status": "COMPLETED",', colored: `  ${ansi.brightRed('"status"')}: ${ansi.brightGreen('"COMPLETED"')},` },
      { raw: '  "type": "Distributed Git-Compatible Version Control System from Scratch",', colored: `  ${ansi.brightRed('"type"')}: ${ansi.brightYellow('"Distributed Git-Compatible Version Control System from Scratch"')},` },
      { raw: '  "stack": "Node.js (ES Modules), SHA-1 Hashing, Custom Object Database",', colored: `  ${ansi.brightRed('"stack"')}: ${ansi.brightYellow('"Node.js (ES Modules), SHA-1 Hashing, Custom Object Database"')},` },
      { raw: '  "architecture": {', colored: `  ${ansi.brightRed('"architecture"')}: ${ansi.white('{')}` },
      { raw: '    "storage": "Content-addressable object store (.bg/objects/xx/yyy...)",', colored: `    ${ansi.brightRed('"storage"')}: ${ansi.brightYellow('"Content-addressable object store (.bg/objects/xx/yyy...)"')},` },
      { raw: '    "staging": "JSON-backed staging index (.bg/index.json) mapping path to SHA-1",', colored: `    ${ansi.brightRed('"staging"')}: ${ansi.brightYellow('"JSON-backed staging index (.bg/index.json) mapping path to SHA-1"')},` },
      { raw: '    "references": "Branch heads (.bg/refs/head/<branch>) and HEAD state tracking",', colored: `    ${ansi.brightRed('"references"')}: ${ansi.brightYellow('"Branch heads (.bg/refs/head/<branch>) and HEAD state tracking"')},` },
      { raw: '    "fanout": "Two-character directory sharding for filesystem scalability"', colored: `    ${ansi.brightRed('"fanout"')}: ${ansi.brightYellow('"Two-character directory sharding for filesystem scalability"')}` },
      { raw: '  },', colored: `  ${ansi.white('}')},` },
      { raw: '  "core_commands": [', colored: `  ${ansi.brightRed('"core_commands"')}: ${ansi.white('[')}` },
      { raw: '    "init: Standard repository (.bg/) and bare repository initialization",', colored: `    ${ansi.brightGreen('"init: Standard repository (.bg/) and bare repository initialization"')},` },
      { raw: '    "add: SHA-1 object creation and index staging area synchronization",', colored: `    ${ansi.brightGreen('"add: SHA-1 object creation and index staging area synchronization"')},` },
      { raw: '    "commit: Directed acyclic graph (DAG) snapshot creation with author metadata",', colored: `    ${ansi.brightGreen('"commit: Directed acyclic graph (DAG) snapshot creation with author metadata"')},` },
      { raw: '    "status & diff: Tri-way diffing between working directory, index, and HEAD",', colored: `    ${ansi.brightGreen('"status & diff: Tri-way diffing between working directory, index, and HEAD"')},` },
      { raw: '    "branch & checkout: Reference switching and working tree restoration",', colored: `    ${ansi.brightGreen('"branch & checkout: Reference switching and working tree restoration"')},` },
      { raw: '    "log: Ancestry graph traversal back to initial root commit"', colored: `    ${ansi.brightGreen('"log: Ancestry graph traversal back to initial root commit"')}` },
      { raw: '  ],', colored: `  ${ansi.white(']')},` },
      { raw: '  "github": "https://github.com/amarpratapsingh/BitGit"', colored: `  ${ansi.brightRed('"github"')}: ${ansi.brightCyan('"https://github.com/amarpratapsingh/BitGit"')}` },
      { raw: '}', colored: ansi.white('}') },
    ];

    const hint = `${ansi.dim('💡 Run')} ${ansi.brightGreen('projects')} ${ansi.dim('for all projects, or')} ${ansi.brightGreen('cat projects/bitgit.md')} ${ansi.dim('for full markdown documentation.')}`;
    return renderCodeWindow('bitgit.json', codeLines, hint);
  }

  if (rawTarget) {
    return `${ansi.brightRed('projects:')} project "${args[0]}" not found.\nAvailable projects: ${ansi.brightCyan('threadtrace')}, ${ansi.brightCyan('airsocket')}, ${ansi.brightCyan('bitgit')}\nRun ${ansi.brightGreen('projects')} to view all builds.`;
  }

  // Default: when user runs `projects` without arguments, render `projects.json` in whoami code-window format!
  const codeLines = [
    { raw: '', colored: '' },
    { raw: '[', colored: ansi.white('[') },
    { raw: '  {', colored: `  ${ansi.white('{')}` },
    { raw: '    "name": "ThreadTrace",', colored: `    ${ansi.brightRed('"name"')}: ${ansi.brightYellow('"ThreadTrace"')},` },
    { raw: '    "status": "FEATURED",', colored: `    ${ansi.brightRed('"status"')}: ${ansi.brightGreen('"FEATURED"')},` },
    { raw: '    "throughput": "1.34 GB/s peak (148ms for 2.18M lines)",', colored: `    ${ansi.brightRed('"throughput"')}: ${ansi.brightYellow('"1.34 GB/s peak (148ms for 2.18M lines)"')},` },
    { raw: '    "startup": "<8ms (GraalVM AOT native binary)",', colored: `    ${ansi.brightRed('"startup"')}: ${ansi.brightYellow('"<8ms (GraalVM AOT native binary)"')},` },
    { raw: '    "stack": "Java 21, GraalVM AOT, Virtual Threads, Mmap",', colored: `    ${ansi.brightRed('"stack"')}: ${ansi.brightYellow('"Java 21, GraalVM AOT, Virtual Threads, Mmap"')},` },
    { raw: '    "highlights": [', colored: `    ${ansi.brightRed('"highlights"')}: ${ansi.white('[')}` },
    { raw: '      "2.82x parallel speedup with 100% data consistency",', colored: `      ${ansi.brightGreen('"2.82x parallel speedup with 100% data consistency"')},` },
    { raw: '      "Zero-allocation positional scanner (10x faster)",', colored: `      ${ansi.brightGreen('"Zero-allocation positional scanner (10x faster)"')},` },
    { raw: '      "O(1) flyweight accumulation (saved 6.5M+ allocs)"', colored: `      ${ansi.brightGreen('"O(1) flyweight accumulation (saved 6.5M+ allocs)"')}` },
    { raw: '    ],', colored: `    ${ansi.white(']')},` },
    { raw: '    "github": "https://github.com/amarpratapsingh/ThreadTrace"', colored: `    ${ansi.brightRed('"github"')}: ${ansi.brightCyan('"https://github.com/amarpratapsingh/ThreadTrace"')}` },
    { raw: '  },', colored: `  ${ansi.white('}')},` },
    { raw: '  {', colored: `  ${ansi.white('{')}` },
    { raw: '    "name": "AirSocket",', colored: `    ${ansi.brightRed('"name"')}: ${ansi.brightYellow('"AirSocket"')},` },
    { raw: '    "status": "FEATURED",', colored: `    ${ansi.brightRed('"status"')}: ${ansi.brightGreen('"FEATURED"')},` },
    { raw: '    "throughput": "886 Mbps (Gigabit LAN) / 16.3 Gbps loopback",', colored: `    ${ansi.brightRed('"throughput"')}: ${ansi.brightYellow('"886 Mbps (Gigabit LAN) / 16.3 Gbps loopback"')},` },
    { raw: '    "dependencies": "Zero (100% java.base standard library)",', colored: `    ${ansi.brightRed('"dependencies"')}: ${ansi.brightYellow('"Zero (100% java.base standard library)"')},` },
    { raw: '    "stack": "Java 21, Raw Sockets, AES-256-GCM, Loom, V4 Framing",', colored: `    ${ansi.brightRed('"stack"')}: ${ansi.brightYellow('"Java 21, Raw Sockets, AES-256-GCM, Loom, V4 Framing"')},` },
    { raw: '    "highlights": [', colored: `    ${ansi.brightRed('"highlights"')}: ${ansi.white('[')}` },
    { raw: '      "28-byte binary framing protocol & UDP discovery",', colored: `      ${ansi.brightGreen('"28-byte binary framing protocol & UDP discovery"')},` },
    { raw: '      "Deterministic crash journal recovery & exponential backoff",', colored: `      ${ansi.brightGreen('"Deterministic crash journal recovery & exponential backoff"')},` },
    { raw: '      "5.41x socket buffer scaling with 101 automated tests"', colored: `      ${ansi.brightGreen('"5.41x socket buffer scaling with 101 automated tests"')}` },
    { raw: '    ],', colored: `    ${ansi.white(']')},` },
    { raw: '    "github": "https://github.com/amarpratapsingh/AirSocket"', colored: `    ${ansi.brightRed('"github"')}: ${ansi.brightCyan('"https://github.com/amarpratapsingh/AirSocket"')}` },
    { raw: '  },', colored: `  ${ansi.white('}')},` },
    { raw: '  {', colored: `  ${ansi.white('{')}` },
    { raw: '    "name": "BitGit",', colored: `    ${ansi.brightRed('"name"')}: ${ansi.brightYellow('"BitGit"')},` },
    { raw: '    "status": "COMPLETED",', colored: `    ${ansi.brightRed('"status"')}: ${ansi.brightGreen('"COMPLETED"')},` },
    { raw: '    "type": "Git-Compatible VCS from Scratch",', colored: `    ${ansi.brightRed('"type"')}: ${ansi.brightYellow('"Git-Compatible VCS from Scratch"')},` },
    { raw: '    "storage": "SHA-1 Content-Addressable Object Database",', colored: `    ${ansi.brightRed('"storage"')}: ${ansi.brightYellow('"SHA-1 Content-Addressable Object Database"')},` },
    { raw: '    "stack": "Node.js (ES Modules), SHA-1 Hashing, Custom Object DB",', colored: `    ${ansi.brightRed('"stack"')}: ${ansi.brightYellow('"Node.js (ES Modules), SHA-1 Hashing, Custom Object DB"')},` },
    { raw: '    "highlights": [', colored: `    ${ansi.brightRed('"highlights"')}: ${ansi.white('[')}` },
    { raw: '      "2-character directory fan-out (.bg/objects/xx/yyy...)",', colored: `      ${ansi.brightGreen('"2-character directory fan-out (.bg/objects/xx/yyy...)"')},` },
    { raw: '      "Core plumbing & porcelain: init, add, commit, diff, checkout",', colored: `      ${ansi.brightGreen('"Core plumbing & porcelain: init, add, commit, diff, checkout"')},` },
    { raw: '      "Index staging area (.bg/index.json) & branch HEAD tracking"', colored: `      ${ansi.brightGreen('"Index staging area (.bg/index.json) & branch HEAD tracking"')}` },
    { raw: '    ],', colored: `    ${ansi.white(']')},` },
    { raw: '    "github": "https://github.com/amarpratapsingh/BitGit"', colored: `    ${ansi.brightRed('"github"')}: ${ansi.brightCyan('"https://github.com/amarpratapsingh/BitGit"')}` },
    { raw: '  }', colored: `  ${ansi.white('}')}` },
    { raw: ']', colored: ansi.white(']') },
  ];

  const hint = `${ansi.dim('💡 Run')} ${ansi.brightGreen('projects threadtrace')}${ansi.dim(',')} ${ansi.brightGreen('projects airsocket')}${ansi.dim(', or')} ${ansi.brightGreen('projects bitgit')} ${ansi.dim('for in-depth architecture, or')} ${ansi.brightGreen('cat projects/<name>.md')}${ansi.dim('.')}`;

  return renderCodeWindow('projects.json', codeLines, hint);
}
