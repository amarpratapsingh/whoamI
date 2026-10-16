import { ansi } from '../utils/ansi.js';
import { commandMetadata } from './metadata.js';

export function help({ args }) {
  const target = (args[0] || '').toLowerCase();

  if (target) {
    if (commandMetadata[target]) {
      return [
        ansi.bold(ansi.brightCyan(`COMMAND: ${target}`)),
        ansi.gray('─'.repeat(40)),
        `${ansi.bold('Description:')} ${commandMetadata[target].desc || commandMetadata[target]}`,
        commandMetadata[target].usage ? `${ansi.bold('Usage:')}       ${ansi.brightGreen(commandMetadata[target].usage)}` : '',
        commandMetadata[target].example ? `${ansi.bold('Example:')}     ${ansi.brightYellow(commandMetadata[target].example)}` : '',
      ].filter(Boolean).join('\n');
    }
    return `${ansi.brightRed('help:')} no help entry for "${target}". Type ${ansi.brightCyan('help')} for full list.`;
  }

  const categories = [
    {
      title: '📁 VIRTUAL FILESYSTEM & NAVIGATION',
      color: 'brightCyan',
      commands: [
        { name: 'ls', desc: 'List directory entries (supports -l, -a, path)' },
        { name: 'cd', desc: 'Change fake directory (~, .., -, /)' },
        { name: 'pwd', desc: 'Print working directory path' },
        { name: 'cat', desc: 'Display file contents with syntax colors (-n)' },
      ],
    },
    {
      title: '👤 PORTFOLIO & BIOGRAPHY',
      color: 'brightGreen',
      commands: [
        { name: 'whoami', desc: 'Display identity card, role, focus & contacts' },
        { name: 'projects', desc: 'View featured engineering builds (projects <name>)' },
        { name: 'skills', desc: 'Visual proficiencies breakdown & progress bars' },
        { name: 'resume', desc: 'View complete text resume & curl command' },
        { name: 'contact', desc: 'Interactive contact options & social profiles' },
        { name: 'neofetch', desc: 'System information spoof with skills as hardware' },
        { name: 'open', desc: 'Open links in new browser tab (open <target>)' },
      ],
    },
    {
      title: '🛠️ TERMINAL TOOLS & UTILITIES',
      color: 'brightYellow',
      commands: [
        { name: 'clear', desc: 'Reset terminal screen (or Ctrl+L)' },
        { name: 'history', desc: 'Show previous command history' },
        { name: 'theme', desc: 'Switch terminal color scheme (theme list / <name>)' },
        { name: 'date', desc: 'Print current date and local time' },
        { name: 'man', desc: 'Display manual page for any command (man <cmd>)' },
      ],
    },
    {
      title: '🎮 UTILITIES, EASTER EGGS & FUN',
      color: 'brightMagenta',
      commands: [
        { name: 'matrix', desc: 'Launch full-screen digital rain animation' },
        { name: 'hack', desc: 'Simulate high-tech Hollywood penetration test' },
        { name: 'cowsay', desc: 'Classic ASCII talking cow (cowsay <text>)' },
        { name: 'quote', desc: 'Inspiring software engineering / hacker quotes' },
        { name: 'ping', desc: 'Ping recruiter network endpoint' },
        { name: 'sudo', desc: 'Superuser permission easter egg (sudo hire-me)' },
        { name: 'rm', desc: 'Safe file removal joke' },
        { name: 'curl', desc: 'How to fetch the ANSI resume via real curl' },
        { name: 'git', desc: 'Simulated git commit logs (git log)' },
      ],
    },
  ];

  const lines = [
    formatBanner(),
    '',
    ansi.dim('Welcome to Amar\'s interactive terminal. Available commands are grouped below:'),
    '',
  ];

  for (const cat of categories) {
    lines.push(ansi.bold(ansi[cat.color](cat.title)));
    lines.push(ansi.gray('─'.repeat(66)));

    for (const cmd of cat.commands) {
      const nameCol = ansi.padEnd(ansi.bold(ansi.brightWhite(cmd.name)), 14);
      lines.push(`  ${nameCol} ${ansi.gray(cmd.desc)}`);
    }

    lines.push('');
  }

  lines.push(ansi.gray('💡 Shortcuts: [Tab] Autocomplete | [↑/↓] History | [Ctrl+C] Cancel | [Ctrl+L] Clear'));
  lines.push(ansi.gray('💡 Run `help <command>` or `man <command>` for deeper documentation.'));

  return lines.join('\n');
}

function formatBanner() {
  return [
    ansi.brightCyan('╔══════════════════════════════════════════════════════════════════╗'),
    ansi.brightCyan('║') + '  ' + ansi.bold(ansi.brightYellow('COMMAND DIRECTORY • AMAR OS v2.4.1'.padEnd(62))) + ansi.brightCyan('║'),
    ansi.brightCyan('╚══════════════════════════════════════════════════════════════════╝'),
  ].join('\n');
}
