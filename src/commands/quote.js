import { ansi } from '../utils/ansi.js';

const FALLBACK_QUOTES = [
  { text: 'Talk is cheap. Show me the code.', author: 'Linus Torvalds' },
  { text: 'Simplicity is prerequisite for reliability.', author: 'Edsger W. Dijkstra' },
  { text: 'Premature optimization is the root of all evil.', author: 'Donald Knuth' },
  { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', author: 'Martin Fowler' },
  { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
  { text: 'The most dangerous phrase in the language is, "We’ve always done it this way."', author: 'Grace Hopper' },
  { text: 'Computers are fast; programmers keep them slow.', author: 'Anon' },
];

export async function quote() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3500);

  let q;
  try {
    const res = await fetch('https://dummyjson.com/quotes/random', {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }

    const data = await res.json();
    q = {
      text: data.quote,
      author: data.author || 'Anonymous',
    };
  } catch {
    clearTimeout(timeoutId);
    q = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
  }

  return [
    ansi.italic(`"${q.text}"`),
    `  — ${ansi.bold(ansi.brightCyan(q.author))}`,
  ].join('\n');
}
