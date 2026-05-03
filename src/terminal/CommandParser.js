export class CommandParser {
  parseInput(input) {
    return input
      .trim()
      .match(/"[^"]*"|'[^']*'|\S+/g)
      ?.map(token => token.replace(/^['"]|['"]$/g, '')) ?? [];
  }

  getCommandName(input) {
    const [commandName = ''] = this.parseInput(input);
    return commandName.toLowerCase();
  }
}
