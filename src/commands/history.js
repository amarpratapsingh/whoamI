import { ansi } from '../utils/ansi.js';

export function history({ history: historyInstance, args }) {
  if (args[0] === '-c') {
    return 'History cleared (session reset).';
  }

  const items = historyInstance?.getEntries ? historyInstance.getEntries() : [];

  if (items.length === 0) {
    return ansi.dim('No history recorded yet in this session.');
  }

  return items.map((cmd, idx) => {
    const num = String(idx + 1).padStart(4, ' ');
    return `${ansi.gray(num)}  ${ansi.brightWhite(cmd)}`;
  }).join('\n');
}
