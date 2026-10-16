import { ansi } from '../utils/ansi.js';

export function hack() {
  const steps = [
    ansi.bold(ansi.brightRed('[*] INITIATING PENETRATION PROTOCOL v4.19.2...')),
    `${ansi.gray('[0.012]')} Probing target gateway 192.168.1.254:22 [OPEN]`,
    `${ansi.gray('[0.045]')} Bypassing quantum firewall... ${ansi.brightGreen('[SUCCESS]')}`,
    `${ansi.gray('[0.089]')} Injecting payload into buffer 0x7FFFDEADBEEF...`,
    `${ansi.gray('[0.142]')} Brute-forcing RSA-4096 private key:`,
    `        ${ansi.brightYellow('progress: [████████████████████] 100%')}`,
    `${ansi.gray('[0.210]')} Escalating privileges: UID 1000 -> UID 0 (root)`,
    '',
    ansi.bold(ansi.brightGreen('╔══════════════════════════════════════════════════════════════════╗')),
    ansi.bold(ansi.brightGreen('║  ACCESS GRANTED: ROOT SHELL ACQUIRED                             ║')),
    ansi.bold(ansi.brightGreen('╚══════════════════════════════════════════════════════════════════╝')),
    '',
    `${ansi.bold('Target System:')} mainframe.hq.corp`,
    `${ansi.bold('Secret Decrypted:')} "Hire Amar Pratap Singh immediately for outstanding engineering."`,
    '',
    ansi.dim('All logs scrubbed. Session clean.'),
  ];

  return steps.join('\n');
}
