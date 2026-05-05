import { hideBootOverlay, getBootOutput, typeText, startCounter } from './BootOverlay.js';

const BOOT_LINES = [
  '[ 0.000] BIOS v2.4.1 - Amar OS',
  '[ 0.012] Detecting hardware...',
  '[ 0.034] CPU: Brain @ 3.2GHz (caffeine-cooled)',
  '[ 0.067] RAM: 8GB ideas, 2GB regrets',
  '[ 0.089] Storage: GitHub (unlimited)',
  '[ 0.210] Loading kernel modules: python3, linux, git, ollama...',
  '[ 0.450] Mounting filesystems: /projects /skills /contact',
  '[ 1.200] Starting services: portfolio.service [ OK ]',
  '[ 2.800] Boot complete. Welcome.',
];

const ASCII_BANNER = [
  '  ___    __  __    _    ____ ',
  ' / _ \\  |  \\/  |  / \\  |  _ \\',
  '| | | | | |\\/| | / _ \\ | | | |',
  '| |_| | | |  | |/ ___ \\| |_| |',
  ' \\___/  |_|  |_|_/   \\_\\____/',
].join('\n');

const BOOT_TEXT_SPEEDS = {
  headline: 10,
  lines: 12,
  linePause: 80,
  help: 10,
  finalPause: 1200,
};

function estimateBootDuration() {
  const headline = "\nInitializing Amar's Portfolio...\n\n";

  const typedTextMs =
    headline.length * BOOT_TEXT_SPEEDS.headline +
    BOOT_LINES.reduce((total, line) => total + line.length * BOOT_TEXT_SPEEDS.lines, 0);

  const pausesMs = BOOT_LINES.length * BOOT_TEXT_SPEEDS.linePause + BOOT_TEXT_SPEEDS.finalPause;

  return typedTextMs + pausesMs;
}

function sleep(ms) {
  return new Promise(resolve => window.setTimeout(resolve, ms));
}

export async function renderBootSequence(terminal) {
  const bootOutput = getBootOutput();
  const target = bootOutput || terminal;

  if (bootOutput) {
    const bootDuration = estimateBootDuration();
    const bootOverlay = document.querySelector('#boot-overlay');
    bootOverlay?.style.setProperty('--boot-progress-duration', `${bootDuration}ms`);

    // Start the counter animation using the same calculated boot duration
    startCounter(bootDuration);

    // show a short banner headline using the typewriter helper
    // headline
    await typeText('\nInitializing Amar\'s Portfolio...\n\n', BOOT_TEXT_SPEEDS.headline);

    // main boot lines with slight pauses for rhythm
    for (const line of BOOT_LINES) {
      await typeText(line + '\n', BOOT_TEXT_SPEEDS.lines);
      await sleep(BOOT_TEXT_SPEEDS.linePause);
    }

    // render a blocky ASCII-style SVG banner
    const asciiEl = document.querySelector('#boot-ascii');
    if (asciiEl) {
      asciiEl.innerHTML = `
        <svg class="boot-overlay__svg" viewBox="0 0 1400 280" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="AMAR">
          <defs>
            <linearGradient id="g" x1="0" x2="1">
              <stop offset="0%" stop-color="#ffffff" />
              <stop offset="50%" stop-color="#d0d0d0" />
              <stop offset="100%" stop-color="#ffffff" />
            </linearGradient>
          </defs>
          <!-- A -->
          <rect x="80" y="60" width="20" height="180" fill="url(#g)" />
          <rect x="80" y="130" width="100" height="20" fill="url(#g)" />
          <rect x="160" y="60" width="20" height="180" fill="url(#g)" />
          <!-- M -->
          <rect x="240" y="60" width="20" height="180" fill="url(#g)" />
          <rect x="240" y="60" width="70" height="20" fill="url(#g)" />
          <rect x="290" y="80" width="20" height="100" fill="url(#g)" />
          <rect x="310" y="60" width="70" height="20" fill="url(#g)" />
          <rect x="360" y="60" width="20" height="180" fill="url(#g)" />
          <!-- A -->
          <rect x="440" y="60" width="20" height="180" fill="url(#g)" />
          <rect x="440" y="130" width="100" height="20" fill="url(#g)" />
          <rect x="520" y="60" width="20" height="180" fill="url(#g)" />
          <!-- R -->
          <rect x="600" y="60" width="20" height="180" fill="url(#g)" />
          <rect x="600" y="60" width="100" height="20" fill="url(#g)" />
          <rect x="680" y="60" width="20" height="80" fill="url(#g)" />
          <rect x="600" y="140" width="100" height="20" fill="url(#g)" />
          <rect x="680" y="160" width="40" height="80" fill="url(#g)" />
        </svg>
      `;
    } else {
      await typeText('\n' + ASCII_BANNER + '\n\n', 4);
    }

    // allow progress animation to reach end before hiding overlay
    await sleep(BOOT_TEXT_SPEEDS.finalPause);
    hideBootOverlay();
  } else {
    for (const line of BOOT_LINES) {
      terminal.writeln(line);
      await sleep(70);
    }

    terminal.writeln('');
    terminal.writeln(ASCII_BANNER);
    terminal.writeln('Type \'help\' to see available commands.');
  }
}
