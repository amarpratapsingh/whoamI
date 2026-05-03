import { PROFILE } from '../data/profile.js';

export function whoami() {
  return [
    PROFILE.name,
    PROFILE.title,
    PROFILE.university,
    PROFILE.status,
  ].join('\n');
}
