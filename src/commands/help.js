import { commandMetadata } from './metadata.js';

export function help() {
  const lines = ['Available commands:'];

  for (const [commandName, description] of Object.entries(commandMetadata)) {
    lines.push(`${commandName} - ${description}`);
  }

  return lines.join('\n');
}
