import { firstLetterToUppercase, cleanStringForSearch } from './string';

test('firstLetterToUppercase function should return empty string when argument is an empty string', () => {
  expect(firstLetterToUppercase('')).toBe('');
  expect(firstLetterToUppercase(' ')).toBe(' ');
});
test('firstLetterToUppercase function should put a capital letter at the beginning of the string', () => {
  expect(firstLetterToUppercase('axel')).toBe('Axel');
});
test('firstLetterToUppercase function should return empty string when argument is an string with space char in it', () => {
  expect(cleanStringForSearch(' ')).toBe('');
});
test('firstLetterToUppercase function should put the word in lower case and remove all spaces', () => {
  expect(cleanStringForSearch('WORD ')).toBe('word');
});
