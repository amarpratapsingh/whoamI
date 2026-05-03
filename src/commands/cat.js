import { FS } from '../filesystem/fs.js';
import { readFile, resolvePath } from '../filesystem/navigation.js';

export function cat({ args, state }) {
  const target = args[0];

  if (!target) {
    return 'cat: missing file operand';
  }

  const resolvedPath = resolvePath(state.cwd, target);
  const content = readFile(FS, resolvedPath);

  if (content === null) {
    return `cat: ${target}: No such file or directory`;
  }

  return content;
}
