export class CommandHistory {
  constructor() {
    this.entries = [];
    this.cursor = -1;
  }

  push(entry) {
    if (!entry) {
      return;
    }

    this.entries = [...this.entries, entry];
    this.cursor = this.entries.length;
  }

  previous() {
    if (this.entries.length === 0) {
      return '';
    }

    this.cursor = Math.max(0, this.cursor - 1);
    return this.entries[this.cursor] ?? '';
  }

  next() {
    if (this.entries.length === 0) {
      return '';
    }

    this.cursor = Math.min(this.entries.length, this.cursor + 1);
    return this.entries[this.cursor] ?? '';
  }

  reset() {
    this.cursor = this.entries.length;
  }
}
