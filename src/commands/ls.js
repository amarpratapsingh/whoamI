import { FS } from '../filesystem/fs.js';
import { getNodeAtPath, isDirectoryNode, resolvePath } from '../filesystem/navigation.js';
import { ansi } from '../utils/ansi.js';

function colorizeEntry(name, isDir) {
  if (isDir) {
    return ansi.bold(ansi.brightCyan(`${name}/`));
  }
  if (name.endsWith('.sh')) {
    return ansi.bold(ansi.brightGreen(`${name}*`));
  }
  if (name.endsWith('.json')) {
    return ansi.brightYellow(name);
  }
  if (name.endsWith('.md')) {
    return ansi.brightWhite(name);
  }
  if (name.startsWith('.')) {
    return ansi.gray(name);
  }
  return ansi.white(name);
}

export function ls({ args, state }) {
  let showLong = false;
  let showHidden = false;
  let targetArg = null;

  for (const arg of args) {
    if (arg.startsWith('-')) {
      if (arg.includes('l')) showLong = true;
      if (arg.includes('a')) showHidden = true;
    } else if (!targetArg) {
      targetArg = arg;
    }
  }

  const targetPath = resolvePath(state.cwd, targetArg ?? '.');
  const node = getNodeAtPath(FS, targetPath);

  if (!node) {
    return `${ansi.brightRed('ls: cannot access')} '${targetArg ?? state.cwd}': No such file or directory`;
  }

  if (!isDirectoryNode(node)) {
    // If it's a file, just list the file itself
    const fileName = targetPath.split('/').pop() || targetPath;
    return colorizeEntry(fileName, false);
  }

  let entries = Object.keys(node).sort((a, b) => a.localeCompare(b));

  if (!showHidden) {
    entries = entries.filter(e => !e.startsWith('.'));
  }

  if (entries.length === 0) {
    return '';
  }

  if (showLong) {
    const lines = [`total ${entries.length * 4}`];
    const dateStr = 'Sep 05 12:00';

    for (const name of entries) {
      const childNode = node[name];
      const isDir = isDirectoryNode(childNode);
      const perms = isDir ? 'drwxr-xr-x' : name.endsWith('.sh') ? '-rwxr-xr-x' : '-rw-r--r--';
      const links = isDir ? '2' : '1';
      const size = isDir ? '4096' : String((typeof childNode === 'string' ? childNode.length : 1024));
      const paddedSize = size.padStart(6, ' ');
      const coloredName = colorizeEntry(name, isDir);

      lines.push(`${ansi.gray(perms)} ${ansi.gray(links)} ${ansi.brightCyan('amar')} ${ansi.gray('amar')} ${ansi.brightYellow(paddedSize)} ${ansi.gray(dateStr)} ${coloredName}`);
    }

    return lines.join('\n');
  }

  // Short horizontal listing
  const coloredEntries = entries.map(name => colorizeEntry(name, isDirectoryNode(node[name])));
  return coloredEntries.join('  ');
}
