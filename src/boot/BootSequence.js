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
  '  ___  __  __   _   ____',
  ' / _ \\|  \\/  | /_\\ |  _ \\',
  '| (_) | |\\/| |/ _ \\| |_) |',
  ' \\___/|_|  |_/_/ \\_\\____/',
].join('\n');

function sleep(ms) {
  return new Promise(resolve => window.setTimeout(resolve, ms));
}

export async function renderBootSequence(terminal) {
  for (const line of BOOT_LINES) {
    terminal.writeln(line);
    await sleep(70);
  }

  terminal.writeln('');
  terminal.writeln(ASCII_BANNER);
  terminal.writeln('Type \'help\' to see available commands.');
}
