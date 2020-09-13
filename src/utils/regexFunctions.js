export function escapeSpecialCharacters(regex) {
  let escapedRegex = regex
    .replace(/\\/g, '\\\\')
    .replace(/\?/g, '\\?')
    .replace(/\[/g, '\\[')
    .replace(/\./g, '\\.')
    .replace(/\*/g, '\\*')
    .replace(/\+/g, '\\+')
    .replace(/\$/g, '\\$')
    .replace(/\^/g, '\\^')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
  return escapedRegex;
}
