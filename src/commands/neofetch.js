import { PROFILE, SKILLS, PROJECTS } from '../data/profile.js';
import { ansi } from '../utils/ansi.js';

export function neofetch() {
  const logo = [
    ansi.brightCyan('       /\\        '),
    ansi.brightCyan('      /  \\       '),
    ansi.brightCyan('     / /\\ \\      '),
    ansi.brightCyan('    / /  \\ \\     '),
    ansi.brightCyan('   / / /\\ \\ \\    '),
    ansi.brightCyan('  / / /__\\ \\ \\   '),
    ansi.brightCyan(' / / /____\\ \\ \\  '),
    ansi.brightCyan('/_/_/      \\_\\_\\ '),
  ];

  const info = [
    `${ansi.bold(ansi.brightCyan(PROFILE.handle))}${ansi.gray('@')}${ansi.bold(ansi.brightWhite('portfolio'))}`,
    ansi.gray('─'.repeat(28)),
    `${ansi.bold(ansi.brightCyan('OS:'))}        Amar OS 2.4.1 x86_64 (Linux)`,
    `${ansi.bold(ansi.brightCyan('Host:'))}      ${PROFILE.university}`,
    `${ansi.bold(ansi.brightCyan('Kernel:'))}    6.8.0-zen1-portfolio`,
    `${ansi.bold(ansi.brightCyan('Uptime:'))}    4 years (CS undergrad)`,
    `${ansi.bold(ansi.brightCyan('Packages:'))}  ${Object.values(SKILLS).reduce((acc, arr) => acc + (Array.isArray(arr) ? arr.length : 0), 0)} (skills), ${PROJECTS.length} (flagship projects)`,
    `${ansi.bold(ansi.brightCyan('Shell:'))}     amar-sh v5.3 (xterm.js)`,
    `${ansi.bold(ansi.brightCyan('Terminal:'))}  xterm-256color (WebGL)`,
    `${ansi.bold(ansi.brightCyan('CPU:'))}       Cortex-Brain @ 3.8GHz (caffeine-cooled)`,
    `${ansi.bold(ansi.brightCyan('Memory:'))}    8192MB / 16384MB (50%)`,
    `${ansi.bold(ansi.brightCyan('Status:'))}    ${ansi.brightGreen(PROFILE.status)}`,
  ];

  const maxRows = Math.max(logo.length, info.length);
  const lines = [];

  for (let i = 0; i < maxRows; i++) {
    const left = logo[i] || ' '.repeat(17);
    const right = info[i] || '';
    lines.push(`${left}  ${right}`);
  }

  lines.push('');
  // 16-color test swatches
  const darkRow = [
    ansi.bgBlack('   '),
    ansi.bgRed('   '),
    ansi.bgGreen('   '),
    ansi.bgYellow('   '),
    ansi.bgBlue('   '),
    ansi.bgMagenta('   '),
    ansi.bgCyan('   '),
    ansi.bgWhite('   '),
  ].join('');

  const brightRow = [
    ansi.bgGray('   '),
    ansi.color256(9, ansi.bgColor256(9, '   ')),
    ansi.color256(10, ansi.bgColor256(10, '   ')),
    ansi.color256(11, ansi.bgColor256(11, '   ')),
    ansi.color256(12, ansi.bgColor256(12, '   ')),
    ansi.color256(13, ansi.bgColor256(13, '   ')),
    ansi.color256(14, ansi.bgColor256(14, '   ')),
    ansi.color256(15, ansi.bgColor256(15, '   ')),
  ].join('');

  lines.push(`                   ${darkRow}`);
  lines.push(`                   ${brightRow}`);

  return lines.join('\n');
}
