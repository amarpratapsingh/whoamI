import { SKILLS } from '../data/profile.js';

export function skills() {
  return [
    `languages: ${SKILLS.languages.join(', ')}`,
    `frontend: ${SKILLS.frontend.join(', ')}`,
    `backend: ${SKILLS.backend.join(', ')}`,
    `tools: ${SKILLS.tools.join(', ')}`,
  ].join('\n');
}
