import { ansi } from '../utils/ansi.js';

const MAN_PAGES = {
  amar: {
    title: 'AMAR(1)',
    synopsis: 'man amar',
    description: 'A Computer Science undergraduate at KIIT specializing in high-performance Java systems, low-level networking protocols, Project Loom virtual threads, GraalVM AOT native compilation, and terminal user experiences.',
    bugs: 'Recruiter response time may be throttled by high volume.',
    seeAlso: 'whoami(1), projects(1), skills(1), threadtrace(1), airsocket(1)',
  },
  whoami: {
    title: 'WHOAMI(1)',
    synopsis: 'whoami',
    description: 'Print the active persona, university affiliation, current technical focus, and primary contact channels.',
    bugs: 'None reported.',
    seeAlso: 'amar(1), neofetch(1)',
  },
  projects: {
    title: 'PROJECTS(1)',
    synopsis: 'projects [threadtrace | airsocket]',
    description: 'Display cards for featured engineering builds. When passed an optional project name (e.g. threadtrace or airsocket), outputs an in-depth architectural breakdown.',
    bugs: 'Too many side projects in backlog.',
    seeAlso: 'cat(1), open(1), threadtrace(1), airsocket(1)',
  },
  threadtrace: {
    title: 'THREADTRACE(1)',
    synopsis: 'threadtrace [options] [files...]',
    description: 'High-performance multi-threaded CLI log parser & observability engine in Java 21+ and GraalVM AOT. Processes logs in parallel with zero-allocation scanning, achieving 1.34 GB/s peak throughput, <8ms cold startup, and universal format auto-sniffing.',
    bugs: 'Zero regex backtracking bottlenecks; heap allocations minimized via static flyweights.',
    seeAlso: 'airsocket(1), bitgit(1), projects(1)',
  },
  airsocket: {
    title: 'AIRSOCKET(1)',
    synopsis: 'airsocket [discover | send | receive | benchmark] [options]',
    description: 'Zero-runtime-dependency P2P file transfer engine and low-level networking laboratory built purely on java.base (Java 21+). Features UDP broadcast discovery (42069/UDP), fixed 28-byte binary framing (V4), AES-256-GCM AEAD encryption, deterministic crash recovery, and 10-suite TCP socket buffer tuning.',
    bugs: 'Zero external runtime dependencies; zero transitive CVE vulnerabilities.',
    seeAlso: 'threadtrace(1), bitgit(1), projects(1)',
  },
  bitgit: {
    title: 'BITGIT(1)',
    synopsis: 'bitgit [init | add | commit | status | diff | log | branch | checkout]',
    description: 'A distributed Git-compatible version control system implemented from scratch in JavaScript (Node.js). Implements content-addressable storage using SHA-1 hashing, two-character directory fan-out (.bg/objects/), index staging area (.bg/index.json), tree generation, branch heads, and commit history.',
    bugs: 'None. Automated unit test suite verifies hashing and plumbing commands.',
    seeAlso: 'threadtrace(1), airsocket(1), projects(1)',
  },
  skills: {
    title: 'SKILLS(1)',
    synopsis: 'skills',
    description: 'Render an interactive dashboard of systems programming, networking protocols, high-performance architecture, and frontend terminal proficiencies.',
    bugs: 'Continuous learning causes numbers to increase.',
    seeAlso: 'neofetch(1)',
  },
  theme: {
    title: 'THEME(1)',
    synopsis: 'theme [list | <name>]',
    description: 'Switch between terminal color schemes (default, matrix, cyberpunk, dracula, amber, solarized).',
    bugs: 'May induce intense nostalgia for cathode-ray tubes.',
    seeAlso: 'clear(1)',
  },
  neofetch: {
    title: 'NEOFETCH(1)',
    synopsis: 'neofetch',
    description: 'Display an authentic CLI hardware card mapping developer competencies to Linux system specifications, paired with 16-color test blocks.',
    bugs: 'Caffeine CPU operates at near-thermal limit.',
    seeAlso: 'whoami(1), skills(1)',
  },
};

export function man({ args }) {
  const rawTarget = (args[0] || '').toLowerCase().replace(/[-_\s]/g, '');

  if (!rawTarget) {
    return `${ansi.brightRed('What manual page do you want?')}\nTry 'man amar', 'man whoami', 'man projects', 'man threadtrace', or 'man airsocket'.`;
  }

  const matchKey = Object.keys(MAN_PAGES).find(
    key => key.toLowerCase().replace(/[-_\s]/g, '') === rawTarget
  );

  const page = matchKey ? MAN_PAGES[matchKey] : null;
  if (!page) {
    return `${ansi.brightRed('No manual entry for')} ${args[0]}.\nAvailable man pages: ${Object.keys(MAN_PAGES).join(', ')}`;
  }

  return [
    `${ansi.bold(page.title)}                    Terminal Portfolio Manual                    ${ansi.bold(page.title)}`,
    '',
    ansi.bold(ansi.brightYellow('NAME')),
    `  ${matchKey} - manual page documentation`,
    '',
    ansi.bold(ansi.brightYellow('SYNOPSIS')),
    `  ${ansi.brightCyan(page.synopsis)}`,
    '',
    ansi.bold(ansi.brightYellow('DESCRIPTION')),
    `  ${page.description}`,
    '',
    ansi.bold(ansi.brightYellow('BUGS')),
    `  ${page.bugs}`,
    '',
    ansi.bold(ansi.brightYellow('SEE ALSO')),
    `  ${page.seeAlso}`,
  ].join('\n');
}
