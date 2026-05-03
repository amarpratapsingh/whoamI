export function sudo({ args }) {
  if ((args[0] || '').toLowerCase() !== 'hire-me') {
    return 'sudo: command not found';
  }

  return 'Password: ****\nPermission granted. Let\'s talk.';
}
