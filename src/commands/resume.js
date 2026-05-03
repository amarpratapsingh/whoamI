import { PROFILE } from '../data/profile.js';

export function resume() {
  return [
    `${PROFILE.name}`,
    `${PROFILE.title} | ${PROFILE.university}`,
    '',
    PROFILE.resumeText,
  ].join('\n');
}
