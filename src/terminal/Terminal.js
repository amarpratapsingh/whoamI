import 'xterm/css/xterm.css';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebglAddon } from 'xterm-addon-webgl';
import { createCommandRegistry } from '../commands/index.js';
import { commandMetadata } from '../commands/metadata.js';
import { CommandParser } from './CommandParser.js';
import { CommandHistory } from './History.js';
import { renderBootSequence } from '../boot/BootSequence.js';
import { formatDisplayPath, getNodeAtPath, isDirectoryNode, listEntries, resolvePath } from '../filesystem/navigation.js';
import { FS } from '../filesystem/fs.js';

const PATH_ARG_COMMANDS = new Set(['cd', 'ls', 'cat']);
const OPEN_TARGETS = ['github', 'linkedin', 'email', 'website'];

function createTermOptions() {
  return {
    cursorBlink: true,
    convertEol: true,
    fontFamily: "'IBM Plex Mono', 'SFMono-Regular', Consolas, monospace",
    fontSize: 15,
    lineHeight: 1.35,
    scrollback: 4000,
    theme: {
      background: '#070b12',
      foreground: '#b8ffd7',
      cursor: '#76d2ff',
      cursorAccent: '#070b12',
      selectionBackground: 'rgba(118, 210, 255, 0.24)',
      black: '#121927',
      red: '#ff7a90',
      green: '#7dffbf',
      yellow: '#ffd479',
      blue: '#76d2ff',
      magenta: '#d39cff',
      cyan: '#8df4ff',
      white: '#d6e6ff',
      brightBlack: '#4f6179',
      brightRed: '#ff9db2',
      brightGreen: '#a4ffd1',
      brightYellow: '#ffe19f',
      brightBlue: '#9be1ff',
      brightMagenta: '#e2b8ff',
      brightCyan: '#b1fbff',
      brightWhite: '#f3f8ff',
    },
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
          <span class="terminal-led" aria-hidden="true"></span>
          <span class="terminal-title">amar@portfolio:~</span>
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
    cwd: '/',
  };

  const term = new Terminal(createTermOptions());
  const fitAddon = new FitAddon();

  term.loadAddon(fitAddon);

  try {
    term.loadAddon(new WebglAddon());
  } catch {
    // WebGL can fail on some GPUs or browser contexts, so fall back cleanly.
  }

  term.open(outputElement);
  fitAddon.fit();
  term.focus();

  outputElement.addEventListener('click', () => {
    term.focus();
  });

  rootElement.addEventListener('click', () => {
    term.focus();
  });

  let currentInput = '';
  let promptText = formatPrompt(state.cwd);
  let bootComplete = false;
  let bootUnlocked = false;
  let completionState = null;

  function redrawInput() {
    term.write(`\r\x1b[2K${promptText}${currentInput}`);
  }

  function printPrompt() {
    promptText = formatPrompt(state.cwd);
    term.write(promptText);
  }

  function unlockBoot() {
    if (bootUnlocked) {
      return;
    }

    bootUnlocked = true;
    bootComplete = true;
    printPrompt();
    term.focus();
  }

  function runCommand(input) {
    const [commandName, ...args] = parser.parseInput(input);
    const command = commands[commandName] ?? commands.help;
    const result = normalizeResult(command({
      args,
      cwd: state.cwd,
      state,
      filesystem: FS,
      commands,
      commandMetadata,
      openExternal: url => window.open(url, '_blank', 'noopener,noreferrer'),
      resolvePath: undefined,
    }));

    if (result.clearScreen) {
      term.clear();
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
    redrawInput();
  }

  function handleData(data) {
    if (!bootComplete) {
      return;
    }

    if (data === '\r') {
      term.write('\r\n');
      const input = currentInput.trim();

      if (input) {
        history.push(input);
        runCommand(input);
      }

      currentInput = '';
      resetCompletionState();
      history.reset();
      printPrompt();
      return;
    }

    if (data === '\u007f') {
      if (currentInput.length === 0) {
        return;
      }

      currentInput = currentInput.slice(0, -1);
      resetCompletionState();
      redrawInput();
      return;
    }

    if (data === '\u001b[A') {
      resetCompletionState();
      currentInput = history.previous();
      redrawInput();
      return;
    }

    if (data === '\u001b[B') {
      resetCompletionState();
      currentInput = history.next();
      redrawInput();
      return;
    }

    if (data === '\t') {
      applyAutocomplete();
      return;
    }

    if (data === '\u0003') {
      currentInput = '';
      resetCompletionState();
      term.write('^C\r\n');
      printPrompt();
      return;
    }

    if (data === '\u000c') {
      term.clear();
      redrawInput();
      return;
    }

    currentInput += sanitizePaste(data);
    resetCompletionState();
    term.write(sanitizePaste(data));
  }

  term.onData(handleData);

  window.addEventListener('resize', () => fitAddon.fit());

  const bootWatchdog = window.setTimeout(() => {
    term.writeln('Boot watchdog: interactive shell enabled.');
    unlockBoot();
  }, 4500);

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
    });

  return {
    commands,
    history,
    parser,
    terminal: term,
    state,
  };
}
