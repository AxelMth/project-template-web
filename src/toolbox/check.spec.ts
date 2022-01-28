import { isDateValid, isElementNotNullAndNotUndefined } from './check';

test('isDateValid function should return true for a valid date', () => {
  expect(isDateValid(new Date())).toBe(true);
});
test('isDateValid function should return false for a non valid date', () => {
  expect(isDateValid(new Date(''))).toStrictEqual({ message: 'Date invalide' });
});
test('isElementNotNullAndNotUndefined function should return false for a null or undefined value', () => {
  let isValid = isElementNotNullAndNotUndefined(null);
  expect(isValid).toStrictEqual({ message: 'Veuillez renseignez ce champ' });
  isValid = isElementNotNullAndNotUndefined(undefined);
  expect(isValid).toStrictEqual({ message: 'Veuillez renseignez ce champ' });
});
test('isElementNotNullAndNotUndefined function should return true for a not null or undefined value', () => {
  expect(isElementNotNullAndNotUndefined({})).toBe(true);
  expect(isElementNotNullAndNotUndefined([])).toBe(true);
});
