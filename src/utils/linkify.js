export function linkify(text, url = text) {
  // OSC 8 terminal hyperlink format: ESC ] 8 ; ; URL ESC \ TEXT ESC ] 8 ; ; ESC \
  return `\u001b]8;;${url}\u001b\\${text}\u001b]8;;\u001b\\`;
}
