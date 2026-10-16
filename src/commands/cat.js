import { FS } from '../filesystem/fs.js';
import { getNodeAtPath, isDirectoryNode, readFile, resolvePath } from '../filesystem/navigation.js';
import { ansi } from '../utils/ansi.js';

function colorizeContent(filename, text) {
  if (filename.endsWith('.json')) {
    return text.replace(/("[\w-]+")(\s*:)/g, `${ansi.brightCyan('$1')}$2`)
               .replace(/:\s*(".*?")/g, `: ${ansi.brightGreen('$1')}`)
               .replace(/:\s*(\d+|true|false|null)/g, `: ${ansi.brightYellow('$1')}`);
  }

  if (filename.endsWith('.md')) {
    return text.split('\n').map(line => {
      if (line.startsWith('# ')) return ansi.bold(ansi.brightCyan(line));
      if (line.startsWith('## ')) return ansi.bold(ansi.brightYellow(line));
      if (line.startsWith('### ')) return ansi.bold(ansi.brightWhite(line));
      if (line.startsWith('- ') || line.startsWith('• ') || line.startsWith('* ')) {
        return `  ${ansi.brightGreen('•')} ${line.replace(/^[-•*]\s*/, '')}`;
      }
      if (line.startsWith('```')) return ansi.gray(line);
      return line;
    }).join('\n');
  }

  if (filename.endsWith('.sh') || filename.includes('bashrc')) {
    return text.split('\n').map(line => {
      if (line.trim().startsWith('#')) return ansi.gray(line);
      return line.replace(/\b(echo|export|alias|source)\b/g, ansi.brightCyan('$1'));
    }).join('\n');
  }

  return text;
}

export function cat({ args, state }) {
  let showLineNumbers = false;
  let targetArg = null;

  for (const arg of args) {
    if (arg === '-n') {
      showLineNumbers = true;
    } else if (!targetArg) {
      targetArg = arg;
    }
  }

  if (!targetArg) {
    return `${ansi.brightRed('cat:')} missing file operand\nTry 'cat <file>' or 'ls' to see available files.`;
  }

  const resolvedPath = resolvePath(state.cwd, targetArg);
  const node = getNodeAtPath(FS, resolvedPath);

  if (node === undefined) {
    return `${ansi.brightRed('cat:')} ${targetArg}: No such file or directory`;
  }

  if (isDirectoryNode(node)) {
    return `${ansi.brightRed('cat:')} ${targetArg}: Is a directory`;
  }

  const content = readFile(FS, resolvedPath);
  if (content === null) {
    return `${ansi.brightRed('cat:')} ${targetArg}: No such file or directory`;
  }

  const filename = resolvedPath.split('/').pop() || '';
  const colorized = colorizeContent(filename, content);

  if (showLineNumbers) {
    return colorized.split('\n').map((line, idx) => {
      const num = String(idx + 1).padStart(4, ' ');
      return `${ansi.gray(num + ' │')} ${line}`;
    }).join('\n');
  }

  return colorized;
}
