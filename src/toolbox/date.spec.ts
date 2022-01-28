import formatDateYYYMMDD from './date';

test('formatDateYYYMMDD function should format the date in a good way', () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(formatDateYYYMMDD(new Date('1970-01-01'))).toBe('1970-01-01');
});
