export function man({ args }) {
  if ((args[0] || '').toLowerCase() !== 'amar') {
    return 'No manual entry for that topic.';
  }

  return [
    'AMAR(1)                     Terminal Portfolio                    AMAR(1)',
    '',
    'NAME',
    '  amar - CS engineer building Linux-flavored browser experiences',
    '',
    'SYNOPSIS',
    '  man amar',
    '',
    'DESCRIPTION',
    '  Simulated man page for recruiters who enjoy terminal culture.',
    '',
    'BUGS',
    '  Recruiter attention span may be finite.',
    '',
    'SEE ALSO',
    '  whoami(1), projects(1), contact(1)',
  ].join('\n');
}
