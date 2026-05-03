export function curl({ args }) {
  if ((args[0] || '').toLowerCase() !== 'amarpratap.dev') {
    return 'curl: try `curl amarpratap.dev`';
  }

  return 'Run this from a real terminal to see the ANSI resume endpoint.';
}
