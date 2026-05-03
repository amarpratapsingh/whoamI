export function rm({ args }) {
  if (args.join(' ') !== '-rf /') {
    return 'rm: missing operands';
  }

  return 'rm: cannot remove "/": just kidding. Phew.';
}
