import { CONTACTS, PROJECTS, PROFILE, SKILLS } from '../data/profile.js';

export const FS = {
  'about.txt': `${PROFILE.name}\n${PROFILE.title} at ${PROFILE.university}\n${PROFILE.status}`,
  'skills.json': JSON.stringify(SKILLS, null, 2),
  'resume.txt': `${PROFILE.name}\n${PROFILE.title} | ${PROFILE.university}\n${PROFILE.resumeText}`,
  projects: PROJECTS.reduce((entries, project) => {
    entries[`${project.name}.md`] = `# ${project.name}\n\n${project.stack}\n\n${project.link}`;
    return entries;
  }, {}),
  contact: {
    'github.txt': CONTACTS.github,
    'linkedin.txt': CONTACTS.linkedin,
    'email.txt': CONTACTS.email,
    'website.txt': CONTACTS.website,
  },
};
