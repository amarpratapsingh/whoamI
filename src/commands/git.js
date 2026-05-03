export function git({ args }) {
  if ((args[0] || '').toLowerCase() !== 'log') {
    return 'git: only `git log` is supported here';
  }

  return [
    'commit a1b2c3d fix: stop procrastinating, ship portfolio',
    'commit 4d5e6f7 feat: wire terminal shell',
    'commit 8a9b0c1 docs: write the README',
  ].join('\n');
}
