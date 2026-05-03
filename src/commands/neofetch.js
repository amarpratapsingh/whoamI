import { PROFILE, SKILLS } from '../data/profile.js';

export function neofetch() {
  return [
    `${PROFILE.name}@portfolio`,
    '-------------------------',
    `OS: Linux-ish browser shell`,
    `Host: ${PROFILE.university}`,
    `Shell: terminal-portfolio`,
    `Languages: ${SKILLS.languages.length}`,
    `Tools: ${SKILLS.tools.join(', ')}`,
  ].join('\n');
}
