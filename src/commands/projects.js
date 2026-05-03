import { PROJECTS } from '../data/profile.js';

export function projects() {
  return PROJECTS.map(project => `${project.name}\n  ${project.stack}\n  ${project.link}`).join('\n\n');
}
