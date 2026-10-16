import { CONTACTS, PROFILE } from '../data/profile.js';
import { ansi } from '../utils/ansi.js';

export function contact() {
  const rawFields = [
    ['name', PROFILE.name],
    ['email', CONTACTS.email],
    ['phone', CONTACTS.phone],
    ['github', CONTACTS.github],
    ['linkedin', CONTACTS.linkedin],
    ['website', CONTACTS.website],
    ['status', PROFILE.status],
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

  // totalWidth is the inner space between the outer vertical borders
  const totalWidth = Math.max(66, maxJsonLen + 8);

  const topBorder = ansi.gray(`╭${'─'.repeat(totalWidth)}╮`);
  const midBorder = ansi.gray(`├${'─'.repeat(totalWidth)}┤`);
  const splitBorder = ansi.gray(`├────┬${'─'.repeat(totalWidth - 5)}┤`);
  const bottomBorder = ansi.gray(`╰────┴${'─'.repeat(totalWidth - 5)}╯`);

  const title = 'contact.json';
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

  // Line 1: blank spacer
  lines.push(`${ansi.gray('│')} ${ansi.gray(' 1 │')}${' '.repeat(Math.max(0, totalWidth - 5))}${ansi.gray('│')}`);

  // Line 2: opening brace
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
  lines.push(`${ansi.dim('💡 Quick Action: Type')} ${ansi.brightYellow('open linkedin')}${ansi.dim(',')} ${ansi.brightYellow('open github')}${ansi.dim(', or')} ${ansi.brightYellow('open website')} ${ansi.dim('to launch in browser.')}`);

  return lines.join('\n');
}
