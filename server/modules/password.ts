import * as Bcrypt from 'bcryptjs';

function getAllValidCharactersForPassword(): string[] {
  const chars = [];
  for (let i = 32; i <= 126; i += 1) {
    chars.push(String.fromCharCode(i));
  }
  return chars;
}

function getRandomInt(min: number, max: number): number {
  const minimum = Math.ceil(min);
  const maximum = Math.floor(max);
  return Math.floor(Math.random() * (maximum - minimum) + minimum);
}

function generateRandomPassword(length): string {
  const chars = getAllValidCharactersForPassword();
  let password = '';
  for (let i = 0; i < length; i += 1) {
    password += chars[getRandomInt(0, chars.length)];
  }
  return password;
}

export function getHashedRandomPassword(
  length = 8,
): { salt: string; password: string; encryptedPassword: string } {
  const salt = Bcrypt.genSaltSync(8);
  const password = generateRandomPassword(length);
  const encryptedPassword = Bcrypt.hashSync(password, salt);
  return { salt, password, encryptedPassword };
}
