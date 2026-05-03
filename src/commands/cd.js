import { FS } from '../filesystem/fs.js';
import { getNodeAtPath, isDirectoryNode, resolvePath } from '../filesystem/navigation.js';

export function cd({ args, state }) {
  const target = args[0] ?? '/';
  const nextPath = resolvePath(state.cwd, target);
  const node = getNodeAtPath(FS, nextPath);

  if (!isDirectoryNode(node)) {
    return `cd: ${target}: Not a directory`;
  }

  return {
    cwd: nextPath,
    output: '',
  };
}
