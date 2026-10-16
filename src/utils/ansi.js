const ESC = '\u001b[';
const RESET = `${ESC}0m`;

function wrap(code, text) {
  if (text === undefined || text === null) return '';
  return `${ESC}${code}m${text}${RESET}`;
}

export const ansi = {
  // Reset
  reset: text => `${RESET}${text || ''}`,

  // Styles
  bold: text => wrap('1', text),
  dim: text => wrap('2', text),
  italic: text => wrap('3', text),
  underline: text => wrap('4', text),
  inverse: text => wrap('7', text),
  strikethrough: text => wrap('9', text),

  // Standard Colors (30-37)
  black: text => wrap('30', text),
  red: text => wrap('31', text),
  green: text => wrap('32', text),
  yellow: text => wrap('33', text),
  blue: text => wrap('34', text),
  magenta: text => wrap('35', text),
  cyan: text => wrap('36', text),
  white: text => wrap('37', text),

  // Bright / High-Intensity Colors (90-97)
  gray: text => wrap('90', text),
  brightBlack: text => wrap('90', text),
  brightRed: text => wrap('91', text),
  brightGreen: text => wrap('92', text),
  brightYellow: text => wrap('93', text),
  brightBlue: text => wrap('94', text),
  brightMagenta: text => wrap('95', text),
  brightCyan: text => wrap('96', text),
  brightWhite: text => wrap('97', text),

  // Background Colors (40-47, 100-107)
  bgBlack: text => wrap('40', text),
  bgRed: text => wrap('41', text),
  bgGreen: text => wrap('42', text),
  bgYellow: text => wrap('43', text),
  bgBlue: text => wrap('44', text),
  bgMagenta: text => wrap('45', text),
  bgCyan: text => wrap('46', text),
  bgWhite: text => wrap('47', text),
  bgGray: text => wrap('100', text),

  // 256 Colors & TrueColor
  color256: (code, text) => wrap(`38;5;${code}`, text),
  bgColor256: (code, text) => wrap(`48;5;${code}`, text),
  rgb: (r, g, b, text) => wrap(`38;2;${r};${g};${b}`, text),

  // Utility helpers
  stripAnsi: text => (text || '').replace(/\u001b\[[0-9;]*m/g, ''),

  visibleLength(text) {
    return ansi.stripAnsi(text).length;
  },

  padEnd(text, targetLength, padChar = ' ') {
    const visibleLen = ansi.visibleLength(text);
    if (visibleLen >= targetLength) return text;
    return `${text}${padChar.repeat(targetLength - visibleLen)}`;
  },

  badge(text, bg = '44', fg = '97') {
    return `${ESC}${bg}m${ESC}${fg}m ${text} ${RESET}`;
  },

  progressBar(percent, width = 20, fillChar = '█', emptyChar = '░') {
    const clamped = Math.max(0, Math.min(100, percent));
    const filledCount = Math.round((clamped / 100) * width);
    const emptyCount = width - filledCount;
    const bar = `${ansi.brightCyan(fillChar.repeat(filledCount))}${ansi.gray(emptyChar.repeat(emptyCount))}`;
    return `[${bar}] ${ansi.bold(clamped.toString().padStart(3))}%`;
  },

  box(contentLines, { title = '', width = 64, borderColor = 'gray', titleColor = 'brightWhite' } = {}) {
    const colorFn = ansi[borderColor] || ansi.gray;
    const titleColorFn = ansi[titleColor] || ansi.brightWhite;

    const innerWidth = width - 4; // account for "│ " and " │"
    const topBorder = title
      ? `${colorFn('╭─ ')}${titleColorFn(title)} ${colorFn('─'.repeat(Math.max(0, width - 5 - ansi.visibleLength(title))))}${colorFn('╮')}`
      : `${colorFn('╭' + '─'.repeat(width - 2) + '╮')}`;

    const bottomBorder = colorFn('╰' + '─'.repeat(width - 2) + '╯');

    const formattedLines = contentLines.map(line => {
      const vLen = ansi.visibleLength(line);
      const padding = ' '.repeat(Math.max(0, innerWidth - vLen));
      return `${colorFn('│')} ${line}${padding} ${colorFn('│')}`;
    });

    return [topBorder, ...formattedLines, bottomBorder].join('\n');
  },
};

