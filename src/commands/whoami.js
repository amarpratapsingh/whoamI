import { PROFILE } from '../data/profile.js';
import { ansi } from '../utils/ansi.js';

export function whoami() {
  const rawFields = [
    ['name', PROFILE.name],
    ['title', PROFILE.title],
    ['university', PROFILE.university],
    ['status', PROFILE.status],
    ['email', PROFILE.email],
    ['link', PROFILE.website],
    ['github', PROFILE.github],
    ['linkedin', PROFILE.linkedin],
  ];

  const fields = rawFields.filter(([, val]) => typeof val === 'string' && val.trim().length > 0);

  // Compute maximum JSON content line length to dynamically adapt card width
  const maxJsonLen = Math.max(
    50,
    ...fields.map(([k, v], idx) => {
      const isLast = idx === fields.length - 1;
      const comma = isLast ? '' : ',';
      return `  "${k}": "${v}"${comma}`.length;
    })
  );

  // totalWidth is the inner space between the outer vertical borders:
  // gutter takes 6 chars (" 10 │ "), plus JSON content, plus right margin of at least 3
  const totalWidth = Math.max(66, maxJsonLen + 8);

  const topBorder = ansi.gray(`╭${'─'.repeat(totalWidth)}╮`);
  const midBorder = ansi.gray(`├${'─'.repeat(totalWidth)}┤`);
  const splitBorder = ansi.gray(`├────┬${'─'.repeat(totalWidth - 5)}┤`);
  const bottomBorder = ansi.gray(`╰────┴${'─'.repeat(totalWidth - 5)}╯`);

  const title = 'whoami.json';
  const dots = `${ansi.brightRed('●')} ${ansi.brightYellow('●')} ${ansi.brightGreen('●')}`;
  const rightDots = ansi.gray('•••');
  const padL = Math.floor((totalWidth - 7 - 5 - title.length) / 2);
  const padR = totalWidth - 7 - 5 - title.length - padL;
  const topBar = `${ansi.gray('│')}  ${dots}${' '.repeat(Math.max(0, padL))}${ansi.bold(ansi.brightWhite(title))}${' '.repeat(Math.max(0, padR))}${rightDots}  ${ansi.gray('│')}`;

  const toolL = '  ⎘  ⧉  ▤  ↓  ( )  { }';
  const toolR = '□  •••  ';
  const toolPad = Math.max(0, totalWidth - toolL.length - toolR.length);
  const toolLine = `${ansi.gray('│')}${ansi.gray(toolL)}${' '.repeat(toolPad)}${ansi.gray(toolR)}${ansi.gray('│')}`;

  const lines = [topBorder, topBar, midBorder, toolLine, splitBorder];

  // Line 1: blank spacer (1 space + 4 chars gutter + spaces = totalWidth)
  lines.push(`${ansi.gray('│')} ${ansi.gray(' 1 │')}${' '.repeat(Math.max(0, totalWidth - 5))}${ansi.gray('│')}`);

  // Line 2: opening brace (1 space + 4 chars gutter + 1 space + 1 char brace + spaces = totalWidth)
  lines.push(`${ansi.gray('│')} ${ansi.gray(' 2 │')} ${ansi.white('{')}${' '.repeat(Math.max(0, totalWidth - 7))}${ansi.gray('│')}`);

  // Lines 3..N: JSON fields
  fields.forEach(([k, v], idx) => {
    const lineNum = String(idx + 3).padStart(2, ' ');
    const isLast = idx === fields.length - 1;
    const comma = isLast ? '' : ',';
    const jsonContent = `  "${k}": "${v}"${comma}`;
    const padLen = Math.max(0, totalWidth - 6 - jsonContent.length);
    const colored = `  ${ansi.brightRed(`"${k}"`)}: ${ansi.brightYellow(`"${v}"`)}${comma}`;
    lines.push(`${ansi.gray('│')} ${ansi.gray(`${lineNum} │`)} ${colored}${' '.repeat(padLen)}${ansi.gray('│')}`);
  });

  // Closing brace
  const endLineNum = String(fields.length + 3).padStart(2, ' ');
  lines.push(`${ansi.gray('│')} ${ansi.gray(`${endLineNum} │`)} ${ansi.white('}')}${' '.repeat(Math.max(0, totalWidth - 7))}${ansi.gray('│')}`);
  lines.push(bottomBorder);

  lines.push('');
  lines.push(`${ansi.dim('💡 Run')} ${ansi.brightGreen('projects')} ${ansi.dim('to inspect my builds, or')} ${ansi.brightGreen('skills')} ${ansi.dim('for technical proficiencies.')}`);

  return lines.join('\n');
}
