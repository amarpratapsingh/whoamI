export const commandMetadata = {
  whoami: {
    desc: 'show identity card and status',
    usage: 'whoami',
    example: 'whoami',
  },
  help: {
    desc: 'list available commands or detailed command help',
    usage: 'help [command]',
    example: 'help projects',
  },
  clear: {
    desc: 'reset the terminal output',
    usage: 'clear',
    example: 'clear',
  },
  ls: {
    desc: 'list virtual files and directories',
    usage: 'ls [-l] [-a] [path]',
    example: 'ls -la projects',
  },
  cat: {
    desc: 'display virtual file content with syntax colors',
    usage: 'cat [-n] <file>',
    example: 'cat about.txt',
  },
  cd: {
    desc: 'change current working directory',
    usage: 'cd [path | ~ | - | ..]',
    example: 'cd projects',
  },
  pwd: {
    desc: 'print current fake working path',
    usage: 'pwd',
    example: 'pwd',
  },
  projects: {
    desc: 'show featured engineering builds or deep-dive inspection',
    usage: 'projects [threadtrace | airsocket | bitgit]',
    example: 'projects threadtrace',
  },
  skills: {
    desc: 'visual dashboard of technical proficiencies and progress bars',
    usage: 'skills',
    example: 'skills',
  },
  neofetch: {
    desc: 'system info spoof with skills presented as hardware specs',
    usage: 'neofetch',
    example: 'neofetch',
  },
  resume: {
    desc: 'display complete structured text resume',
    usage: 'resume',
    example: 'resume',
  },
  contact: {
    desc: 'show contact channels and social profiles',
    usage: 'contact',
    example: 'contact',
  },
  open: {
    desc: 'open a social link, project repo, or resume PDF in a new tab',
    usage: 'open <target | url>',
    example: 'open resume',
  },
  man: {
    desc: 'display formatted manual entry for a command',
    usage: 'man <topic>',
    example: 'man whoami',
  },
  sudo: {
    desc: 'play the hire-me root access easter egg',
    usage: 'sudo hire-me',
    example: 'sudo hire-me',
  },
  git: {
    desc: 'show simulated git history',
    usage: 'git log',
    example: 'git log',
  },
  ping: {
    desc: 'ping recruiter network endpoint',
    usage: 'ping recruiter',
    example: 'ping recruiter',
  },
  rm: {
    desc: 'safe removal command joke',
    usage: 'rm -rf /',
    example: 'rm -rf /',
  },
  curl: {
    desc: 'describe the curl endpoint for terminal resume',
    usage: 'curl amarpratap.dev',
    example: 'curl amarpratap.dev',
  },
  hack: {
    desc: 'cinematic Hollywood penetration test simulation',
    usage: 'hack',
    example: 'hack',
  },
  theme: {
    desc: 'switch terminal color scheme',
    usage: 'theme [list | <name>]',
    example: 'theme matrix',
  },
  matrix: {
    desc: 'full-screen digital rain animation',
    usage: 'matrix',
    example: 'matrix',
  },
  date: {
    desc: 'print system date and time',
    usage: 'date',
    example: 'date',
  },
  cowsay: {
    desc: 'classic ASCII cow speaking a message',
    usage: 'cowsay [message]',
    example: 'cowsay Hello World',
  },
  quote: {
    desc: 'display inspiring programming and hacker quote',
    usage: 'quote',
    example: 'quote',
  },
  history: {
    desc: 'show list of entered commands in this session',
    usage: 'history [-c]',
    example: 'history',
  },
};
