import { FS } from '../filesystem/fs.js';
import { listEntries, resolvePath } from '../filesystem/navigation.js';

export function ls({ args, state }) {
  const targetPath = resolvePath(state.cwd, args[0] ?? '.');
  const entries = listEntries(FS, targetPath);

  if (!entries) {
    return `ls: cannot access ${args[0] ?? state.cwd}: No such directory`;
  }

  return entries.join('  ');
}
