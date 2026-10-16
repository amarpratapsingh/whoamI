import { CONTACTS } from '../data/profile.js';
import { ansi } from '../utils/ansi.js';

const TARGETS = {
  github: CONTACTS.github,
  linkedin: CONTACTS.linkedin,
  email: `mailto:${CONTACTS.email}`,
  website: CONTACTS.website,
  resume: './resume.pdf',
  threadtrace: 'https://github.com/amarpratapsingh/ThreadTrace',
  airsocket: 'https://github.com/amarpratapsingh/AirSocket',
  bitgit: 'https://github.com/amarpratapsingh/BitGit',
};

export function open({ args }) {
  const rawTarget = (args[0] || '').trim();
  const lowerTarget = rawTarget.toLowerCase();

  if (!rawTarget) {
    const targetList = Object.keys(TARGETS)
      .map(t => ansi.brightCyan(t))
      .join(', ');
    return `${ansi.brightRed('open:')} missing target\n${ansi.dim('Usage:')} ${ansi.brightGreen('open <target | url>')}\n${ansi.dim('Available targets:')} ${targetList}`;
  }

  let url = TARGETS[lowerTarget];

  if (!url) {
    if (/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(rawTarget) || rawTarget.startsWith('mailto:')) {
      url = rawTarget;
    } else if (rawTarget.includes('.') && !rawTarget.includes(' ')) {
      url = `https://${rawTarget}`;
    }
  }

  if (!url) {
    const targetList = Object.keys(TARGETS)
      .map(t => ansi.brightCyan(t))
      .join(', ');
    return `${ansi.brightRed('open:')} unknown target "${rawTarget}"\n${ansi.dim('Available targets:')} ${targetList}\n${ansi.dim('Or provide a full URL (e.g. open https://example.com)')}`;
  }

  return {
    output: `${ansi.brightGreen('Opening')} ${ansi.underline(ansi.brightCyan(url))}...`,
    openUrl: url,
  };
}
