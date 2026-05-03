import { CONTACTS } from '../data/profile.js';

export function contact() {
  return [
    `email: ${CONTACTS.email}`,
    `github: ${CONTACTS.github}`,
    `linkedin: ${CONTACTS.linkedin}`,
    `website: ${CONTACTS.website}`,
  ].join('\n');
}
