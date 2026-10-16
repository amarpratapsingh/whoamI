import 'xterm/css/xterm.css';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebglAddon } from 'xterm-addon-webgl';
import { createCommandRegistry } from '../commands/index.js';
import { commandMetadata } from '../commands/metadata.js';
import { THEMES } from '../commands/theme.js';
import { CommandParser } from './CommandParser.js';
import { CommandHistory } from './History.js';
import { renderBootSequence } from '../boot/BootSequence.js';
import { formatDisplayPath, getNodeAtPath, isDirectoryNode, listEntries, resolvePath } from '../filesystem/navigation.js';
import { FS } from '../filesystem/fs.js';
import { getFullNameAscii } from '../utils/ascii.js';
import { ansi } from '../utils/ansi.js';

const PATH_ARG_COMMANDS = new Set(['cd', 'ls', 'cat']);
const OPEN_TARGETS = ['github', 'linkedin', 'email', 'website', 'resume', 'threadtrace', 'airsocket', 'bitgit'];
const THEME_NAMES = ['default', 'matrix', 'cyberpunk', 'dracula', 'amber', 'solarized', 'list'];
const PROJECT_NAMES = ['threadtrace', 'airsocket', 'bitgit', 'ThreadTrace', 'AirSocket', 'BitGit'];

function getResponsiveFontSize() {
  if (typeof window !== 'undefined') {
    if (window.innerWidth < 480) return 11;
    if (window.innerWidth < 768) return 13;
  }
  return 15;
}

function getInitialTheme() {
  try {
    const saved = localStorage.getItem('amar_terminal_theme');
    if (saved && THEMES[saved]) {
      return THEMES[saved].termTheme;
    }
  } catch {
    // LocalStorage may fail in restricted/sandboxed environments
  }
  return THEMES.default.termTheme;
}

function createTermOptions() {
  return {
    cursorBlink: true,
    convertEol: true,
    fontFamily: "'IBM Plex Mono', 'SFMono-Regular', Consolas, monospace",
    fontSize: getResponsiveFontSize(),
    lineHeight: 1.35,
    scrollback: 5000,
    theme: getInitialTheme(),
  };
}

function normalizeResult(result) {
  if (typeof result === 'string') {
    return { output: result };
  }

  return result ?? { output: '' };
}

function writeBlock(term, text = '') {
  const normalized = text.replace(/\n/g, '\r\n');
  term.write(`${normalized}\r\n`);
}

function formatPrompt(cwd) {
  return `amar@portfolio:${formatDisplayPath(cwd)}$ `;
}

function sanitizePaste(value) {
  return value.replace(/[\u0000-\u001f\u007f]/g, '');
}

function findPrevWordIndex(str, pos) {
  if (pos <= 0) return 0;
  let idx = pos;
  while (idx > 0 && /\s/.test(str[idx - 1])) {
    idx--;
  }
  while (idx > 0 && !/\s/.test(str[idx - 1])) {
    idx--;
  }
  return idx;
}

function findNextWordIndex(str, pos) {
  if (pos >= str.length) return str.length;
  let idx = pos;
  while (idx < str.length && !/\s/.test(str[idx])) {
    idx++;
  }
  while (idx < str.length && /\s/.test(str[idx])) {
    idx++;
  }
  return idx;
}

function splitInputForCompletion(input) {
  const endsWithSpace = /\s$/.test(input);
  const tokens = input.trim().length === 0 ? [] : input.trim().split(/\s+/);

  if (tokens.length === 0) {
    return {
      commandName: '',
      currentToken: '',
      baseInput: '',
      tokenIndex: 0,
    };
  }

  const tokenIndex = endsWithSpace ? tokens.length : tokens.length - 1;
  const currentToken = endsWithSpace ? '' : tokens[tokens.length - 1];
  const baseInput = endsWithSpace ? input : input.slice(0, Math.max(0, input.length - currentToken.length));

  return {
    commandName: tokens[0] ?? '',
    currentToken,
    baseInput,
    tokenIndex,
  };
}

function getPathCompletions(partialPath, cwd, filesystem) {
  const slashIndex = partialPath.lastIndexOf('/');
  const hasParent = slashIndex >= 0;
  const parentInput = hasParent ? partialPath.slice(0, slashIndex) : '';
  const currentSegment = hasParent ? partialPath.slice(slashIndex + 1) : partialPath;
  const parentPath = resolvePath(cwd, parentInput || '.');
  const entries = listEntries(filesystem, parentPath);

  if (!entries) {
    return [];
  }

  return entries
    .filter(entry => entry.startsWith(currentSegment))
    .map(entry => {
      const absoluteEntryPath = resolvePath(parentPath, entry);
      const node = getNodeAtPath(filesystem, absoluteEntryPath);
      const suffix = isDirectoryNode(node) ? '/' : '';
      return hasParent ? `${parentInput}/${entry}${suffix}` : `${entry}${suffix}`;
    });
}

function getCompletionCandidates(input, commandNames, cwd, filesystem) {
  const parsed = splitInputForCompletion(input);

  if (parsed.tokenIndex === 0) {
    return {
      baseInput: parsed.baseInput,
      candidates: commandNames.filter(name => name.startsWith(parsed.currentToken)),
    };
  }

  if (parsed.commandName === 'open') {
    return {
      baseInput: parsed.baseInput,
      candidates: OPEN_TARGETS.filter(name => name.startsWith(parsed.currentToken)),
    };
  }

  if (['theme', 'themes'].includes(parsed.commandName)) {
    return {
      baseInput: parsed.baseInput,
      candidates: THEME_NAMES.filter(name => name.startsWith(parsed.currentToken)),
    };
  }

  if (parsed.commandName === 'projects') {
    return {
      baseInput: parsed.baseInput,
      candidates: PROJECT_NAMES.filter(name => name.startsWith(parsed.currentToken)),
    };
  }

  if (['help', 'man'].includes(parsed.commandName)) {
    return {
      baseInput: parsed.baseInput,
      candidates: commandNames.filter(name => name.startsWith(parsed.currentToken)),
    };
  }

  if (PATH_ARG_COMMANDS.has(parsed.commandName)) {
    return {
      baseInput: parsed.baseInput,
      candidates: getPathCompletions(parsed.currentToken, cwd, filesystem),
    };
  }

  return {
    baseInput: parsed.baseInput,
    candidates: [],
  };
}

export function createTerminalApp(rootElement) {
  rootElement.innerHTML = `
    <main class="terminal-shell">
      <section class="terminal-card" aria-label="Terminal portfolio">
        <header class="terminal-header">
          <div class="terminal-dots" aria-hidden="true">
            <span class="terminal-dot terminal-dot--red"></span>
            <span class="terminal-dot terminal-dot--amber"></span>
            <span class="terminal-dot terminal-dot--green"></span>
          </div>
          <div class="terminal-title-container">
            <span class="terminal-title">amar@portfolio: ~</span>
          </div>
          <div class="terminal-header-spacer" aria-hidden="true"></div>
        </header>
        <div class="terminal-body">
          <div class="terminal-xterm" id="terminal-output"></div>
        </div>
      </section>
    </main>
  `;

  const outputElement = rootElement.querySelector('#terminal-output');

  if (!outputElement) {
    throw new Error('Terminal output element not found.');
  }

  const parser = new CommandParser();
  const history = new CommandHistory();
  const commands = createCommandRegistry();
  const state = {
    cwd: '/home/amar',
    prevCwd: '/home/amar',
  };

  const term = new Terminal(createTermOptions());
  const fitAddon = new FitAddon();

  term.loadAddon(fitAddon);
  term.open(outputElement);
  fitAddon.fit();
  term.focus();

  try {
    const webglAddon = new WebglAddon();
    webglAddon.onContextLoss(() => {
      webglAddon.dispose();
    });
    term.loadAddon(webglAddon);
  } catch {
    // WebGL can fail on some GPUs or browser contexts, so fall back cleanly to default renderer.
  }

  outputElement.addEventListener('click', () => {
    term.focus();
  });

  rootElement.addEventListener('click', () => {
    term.focus();
  });

  let currentInput = '';
  let cursorIndex = 0;
  let promptText = formatPrompt(state.cwd);
  let bootComplete = false;
  let bootUnlocked = false;
  let completionState = null;
  let isExecuting = false;

  function redrawInput() {
    const offset = currentInput.length - cursorIndex;
    const moveBack = offset > 0 ? `\x1b[${offset}D` : '';
    term.write(`\r\x1b[2K${promptText}${currentInput}${moveBack}`);
  }

  function printPrompt() {
    promptText = formatPrompt(state.cwd);
    const titleEl = rootElement.querySelector('.terminal-title');
    if (titleEl) {
      titleEl.textContent = `amar@portfolio: ${formatDisplayPath(state.cwd)}`;
    }
    term.write(promptText);
  }

  function unlockBoot() {
    if (bootUnlocked) {
      return;
    }

    bootUnlocked = true;
    bootComplete = true;

    const banner = getFullNameAscii(term.cols);
    writeBlock(term, banner);
    term.writeln(
      `  ${ansi.dim("Type '")}${ansi.brightGreen('help')}${ansi.dim("' to see available commands, or '")}${ansi.brightGreen('whoami')}${ansi.dim("' for profile.\r\n")}`
    );
    printPrompt();
    term.focus();
  }

  async function runCommand(input) {
    const [commandName, ...args] = parser.parseInput(input);
    const command = commands[commandName] ?? commands.help;
    try {
      const rawResult = await command({
        args,
        cwd: state.cwd,
        state,
        filesystem: FS,
        commands,
        commandMetadata,
        history,
        openExternal: url => window.open(url, '_blank', 'noopener,noreferrer'),
        resolvePath,
      });
      const result = normalizeResult(rawResult);

      if (result.clearScreen) {
        term.clear();
      }

      if (result.theme) {
        term.options.theme = result.theme;
        if (result.themeName) {
          try {
            localStorage.setItem('amar_terminal_theme', result.themeName);
          } catch {
            // LocalStorage might be disabled in private browsing
          }
        }
      }

      if (result.cwd) {
        state.cwd = result.cwd;
      }

      if (result.output) {
        writeBlock(term, result.output);
      }

      if (result.openUrl) {
        window.open(result.openUrl, '_blank', 'noopener,noreferrer');
      }
    } catch (err) {
      writeBlock(term, `${ansi.brightRed('amar-sh:')} ${err?.message || 'Error executing command'}`);
    }
  }

  function resetCompletionState() {
    completionState = null;
  }

  function applyAutocomplete() {
    const commandNames = Object.keys(commands);
    const completion = getCompletionCandidates(currentInput, commandNames, state.cwd, FS);
    const matches = completion.candidates;

    if (matches.length === 0) {
      term.write('\u0007');
      return;
    }

    if (
      completionState &&
      completionState.baseInput === completion.baseInput &&
      completionState.matches.join('\u0000') === matches.join('\u0000')
    ) {
      completionState.index = (completionState.index + 1) % matches.length;
    } else {
      completionState = {
        baseInput: completion.baseInput,
        matches,
        index: 0,
      };
    }

    currentInput = `${completion.baseInput}${matches[completionState.index]}`;
    cursorIndex = currentInput.length;
    redrawInput();
  }

  async function handleData(data) {
    if (!bootComplete || isExecuting) {
      return;
    }

    // Enter
    if (data === '\r') {
      term.write('\r\n');
      const input = currentInput.trim();

      currentInput = '';
      cursorIndex = 0;
      resetCompletionState();
      history.reset();

      if (input) {
        history.push(input);
        isExecuting = true;
        try {
          await runCommand(input);
        } finally {
          isExecuting = false;
        }
      }

      printPrompt();
      return;
    }

    // Backspace (single or rapid key repeat)
    if (/^[\u007f\b]+$/.test(data)) {
      if (cursorIndex === 0) {
        return;
      }

      const count = Math.min(cursorIndex, data.length);
      currentInput = currentInput.slice(0, cursorIndex - count) + currentInput.slice(cursorIndex);
      cursorIndex -= count;
      resetCompletionState();

      if (promptText.length + currentInput.length + count < term.cols) {
        const moveLeft = count === 1 ? '\x1b[D' : `\x1b[${count}D`;
        const deleteChars = count === 1 ? '\x1b[P' : `\x1b[${count}P`;
        term.write(`${moveLeft}${deleteChars}`);
      } else {
        redrawInput();
      }
      return;
    }

    // Delete (single or rapid key repeat)
    if (/^(?:\u001b\[3~)+$/.test(data) || data === '\u0004') {
      if (cursorIndex >= currentInput.length) {
        return;
      }
      const count = data === '\u0004' ? 1 : Math.min(currentInput.length - cursorIndex, data.length / 4);
      currentInput = currentInput.slice(0, cursorIndex) + currentInput.slice(cursorIndex + count);
      resetCompletionState();

      if (promptText.length + currentInput.length + count < term.cols) {
        term.write(count === 1 ? '\x1b[P' : `\x1b[${count}P`);
      } else {
        redrawInput();
      }
      return;
    }

    // Left arrow (single or rapid repeat)
    if (/^(?:\u001b\[D)+$/.test(data)) {
      const count = data.length / 3;
      const steps = Math.min(cursorIndex, count);
      if (steps > 0) {
        cursorIndex -= steps;
        term.write(steps === 1 ? '\x1b[D' : `\x1b[${steps}D`);
      }
      resetCompletionState();
      return;
    }

    // Right arrow (single or rapid repeat)
    if (/^(?:\u001b\[C)+$/.test(data)) {
      const count = data.length / 3;
      const steps = Math.min(currentInput.length - cursorIndex, count);
      if (steps > 0) {
        cursorIndex += steps;
        term.write(steps === 1 ? '\x1b[C' : `\x1b[${steps}C`);
      }
      resetCompletionState();
      return;
    }

    // Word jump left (Ctrl+Left, Alt+Left, Esc+B)
    if (
      data === '\u001b[1;5D' ||
      data === '\u001b[1;3D' ||
      data === '\u001b[5D' ||
      data === '\u001bOD' ||
      data === '\u001bb'
    ) {
      if (cursorIndex > 0) {
        const target = findPrevWordIndex(currentInput, cursorIndex);
        const steps = cursorIndex - target;
        if (steps > 0) {
          cursorIndex = target;
          term.write(steps === 1 ? '\x1b[D' : `\x1b[${steps}D`);
        }
      }
      resetCompletionState();
      return;
    }

    // Word jump right (Ctrl+Right, Alt+Right, Esc+F)
    if (
      data === '\u001b[1;5C' ||
      data === '\u001b[1;3C' ||
      data === '\u001b[5C' ||
      data === '\u001bOC' ||
      data === '\u001bf'
    ) {
      if (cursorIndex < currentInput.length) {
        const target = findNextWordIndex(currentInput, cursorIndex);
        const steps = target - cursorIndex;
        if (steps > 0) {
          cursorIndex = target;
          term.write(steps === 1 ? '\x1b[C' : `\x1b[${steps}C`);
        }
      }
      resetCompletionState();
      return;
    }

    // Up arrow
    if (/^(?:\u001b\[A)+$/.test(data)) {
      resetCompletionState();
      const count = data.length / 3;
      for (let i = 0; i < count; i++) {
        currentInput = history.previous();
      }
      cursorIndex = currentInput.length;
      redrawInput();
      return;
    }

    // Down arrow
    if (/^(?:\u001b\[B)+$/.test(data)) {
      resetCompletionState();
      const count = data.length / 3;
      for (let i = 0; i < count; i++) {
        currentInput = history.next();
      }
      cursorIndex = currentInput.length;
      redrawInput();
      return;
    }

    // Home / Ctrl+A
    if (
      data === '\u001b[H' ||
      data === '\u001b[1~' ||
      data === '\u001bOH' ||
      data === '\u001b[7~' ||
      data === '\u0001'
    ) {
      if (cursorIndex > 0) {
        term.write(cursorIndex === 1 ? '\x1b[D' : `\x1b[${cursorIndex}D`);
        cursorIndex = 0;
      }
      resetCompletionState();
      return;
    }

    // End / Ctrl+E
    if (
      data === '\u001b[F' ||
      data === '\u001b[4~' ||
      data === '\u001bOF' ||
      data === '\u001b[8~' ||
      data === '\u0005'
    ) {
      const steps = currentInput.length - cursorIndex;
      if (steps > 0) {
        term.write(steps === 1 ? '\x1b[C' : `\x1b[${steps}C`);
        cursorIndex = currentInput.length;
      }
      resetCompletionState();
      return;
    }

    // Ctrl+W (delete previous word)
    if (data === '\u0017') {
      if (cursorIndex === 0) return;
      const before = currentInput.slice(0, cursorIndex);
      const after = currentInput.slice(cursorIndex);
      const trimmedBefore = before.replace(/\S+\s*$/, '');
      const count = cursorIndex - trimmedBefore.length;
      cursorIndex = trimmedBefore.length;
      currentInput = trimmedBefore + after;
      resetCompletionState();

      if (count > 0 && promptText.length + currentInput.length + count < term.cols) {
        const moveLeft = count === 1 ? '\x1b[D' : `\x1b[${count}D`;
        const deleteChars = count === 1 ? '\x1b[P' : `\x1b[${count}P`;
        term.write(`${moveLeft}${deleteChars}`);
      } else {
        redrawInput();
      }
      return;
    }

    // Ctrl+U (delete before cursor)
    if (data === '\u0015') {
      if (cursorIndex === 0) return;
      const count = cursorIndex;
      currentInput = currentInput.slice(cursorIndex);
      cursorIndex = 0;
      resetCompletionState();

      if (count > 0 && promptText.length + currentInput.length + count < term.cols) {
        const moveLeft = count === 1 ? '\x1b[D' : `\x1b[${count}D`;
        const deleteChars = count === 1 ? '\x1b[P' : `\x1b[${count}P`;
        term.write(`${moveLeft}${deleteChars}`);
      } else {
        redrawInput();
      }
      return;
    }

    // Ctrl+K (delete after cursor)
    if (data === '\u000b') {
      if (cursorIndex >= currentInput.length) return;
      currentInput = currentInput.slice(0, cursorIndex);
      resetCompletionState();
      term.write('\x1b[K');
      return;
    }

    // Tab
    if (data === '\t') {
      applyAutocomplete();
      return;
    }

    // Ctrl+C
    if (data === '\u0003') {
      currentInput = '';
      cursorIndex = 0;
      resetCompletionState();
      term.write('^C\r\n');
      printPrompt();
      return;
    }

    // Ctrl+L
    if (data === '\u000c') {
      term.clear();
      redrawInput();
      return;
    }

    // Discard any unrecognized escape sequence to prevent control characters leaking
    if (data.startsWith('\u001b')) {
      return;
    }

    // Regular typed text or paste
    const clean = sanitizePaste(data);
    if (clean) {
      if (
        cursorIndex === currentInput.length &&
        promptText.length + currentInput.length + clean.length < term.cols
      ) {
        currentInput += clean;
        cursorIndex = currentInput.length;
        resetCompletionState();
        term.write(clean);
      } else {
        currentInput = currentInput.slice(0, cursorIndex) + clean + currentInput.slice(cursorIndex);
        cursorIndex += clean.length;
        resetCompletionState();
        redrawInput();
      }
    }
  }

  term.onData(handleData);

  const handleResize = () => {
    try {
      const targetSize = getResponsiveFontSize();
      if (term.options.fontSize !== targetSize) {
        term.options.fontSize = targetSize;
      }
      fitAddon.fit();
    } catch {
      // fit may throw if element is temporarily detached or hidden
    }
  };

  window.addEventListener('resize', handleResize);
  if (typeof ResizeObserver !== 'undefined' && outputElement) {
    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(outputElement);
  }

  const bootWatchdog = window.setTimeout(() => {
    term.writeln('Boot watchdog: interactive shell enabled.');
    unlockBoot();
  }, 12000);

  void renderBootSequence(term)
    .catch(error => {
      term.writeln('Boot warning: fallback mode enabled.');

      if (error instanceof Error && error.message) {
        term.writeln(error.message);
      }
    })
    .finally(() => {
      window.clearTimeout(bootWatchdog);
      unlockBoot();
      document.querySelector('#app')?.classList.add('visible');
    });

  return {
    commands,
    history,
    parser,
    terminal: term,
    state,
  };
}
