export function firstLetterToUppercase(s: string): string {
  if (s.trim() === '') {
    return s;
  }
  return `${s[0].toUpperCase()}${s.substr(1, s.length)}`;
}

export function cleanStringForSearch(s: string): string {
  return s.trim().toLowerCase();
}
