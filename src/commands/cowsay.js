import { ansi } from '../utils/ansi.js';

export function cowsay({ args }) {
  const text = args.length > 0 ? args.join(' ') : 'hire amar, he writes exceptional software!';
  const len = text.length;
  const border = '─'.repeat(len + 2);

  return [
    ` ${border}`,
    `< ${ansi.bold(text)} >`,
    ` ${border}`,
    '        \\   ^__^',
    '         \\  (oo)\\_______',
    '            (__)\\       )\\/\\',
    '                ||----w |',
    '                ||     ||',
  ].join('\n');
}
