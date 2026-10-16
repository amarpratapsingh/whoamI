import { FS } from '../filesystem/fs.js';
import { HOME_PATH, getNodeAtPath, isDirectoryNode, resolvePath } from '../filesystem/navigation.js';
import { ansi } from '../utils/ansi.js';

export function cd({ args, state }) {
  const target = (args[0] || '').trim();

  let nextPath;
  let printNewPath = false;

  if (!target || target === '~') {
    nextPath = HOME_PATH;
  } else if (target === '-') {
    nextPath = state.prevCwd || HOME_PATH;
    printNewPath = true;
  } else {
    nextPath = resolvePath(state.cwd, target);
  }

  const node = getNodeAtPath(FS, nextPath);

  if (node === undefined) {
    return `${ansi.brightRed('cd:')} ${target}: No such file or directory`;
  }

  if (!isDirectoryNode(node)) {
    return `${ansi.brightRed('cd:')} ${target}: Not a directory`;
  }

  state.prevCwd = state.cwd;

  return {
    cwd: nextPath,
    output: printNewPath ? nextPath : '',
  };
}
