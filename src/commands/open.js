import { CONTACTS } from '../data/profile.js';

const TARGETS = {
  github: CONTACTS.github,
  linkedin: CONTACTS.linkedin,
  email: `mailto:${CONTACTS.email}`,
  website: CONTACTS.website,
};

export function open({ args }) {
  const target = (args[0] || '').toLowerCase();
  const url = TARGETS[target] ?? args[0];

  if (!url) {
    return 'open: missing target';
  }

  return {
    output: `Opening ${url}`,
    openUrl: url,
  };
}
