import CheckType from '../constants/CheckType';

export type Error = {
  message: string;
} | null;
export type InputError = boolean | Error;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getChecks(checkTypes: CheckType[]): ((v: any) => InputError)[] {
  if (checkTypes.length === 0) {
    return [isElementNotNullAndNotUndefined];
  }
  const checks = [];
  for (let c = 0; c < checkTypes.length; c += 1) {
    const checkType = checkTypes[c];
    switch (checkType) {
      case CheckType.NotEmptyString:
        checks.push(isStringNotEmpty);
        break;
      case CheckType.ValidDate:
        checks.push(isDateValid);
        break;
      case CheckType.ValidEmail:
        checks.push(isEmailValid);
        break;
      case CheckType.ValidPhone:
        checks.push(isPhoneValid);
        break;
      case CheckType.ValidPassword:
        checks.push(isPasswordValid);
        break;
      case CheckType.ValidFile:
        checks.push(isFileValid);
        break;
      default:
        checks.push(isElementNotNullAndNotUndefined);
        break;
    }
  }
  return checks;
}

export function isStringNotEmpty(s: string): InputError {
  return s.trim() !== '' ? true : { message: 'Veuillez renseignez ce champ' };
}

export function isFileValid(f: FileList | string): InputError {
  if (typeof f === 'string' && f.trim() === '') {
    return { message: 'Veuillez renseignez ce champ' };
  }
  return f ? true : { message: 'Veuillez renseignez ce champ' };
}

export function isDateValid(d: Date): InputError {
  return !Number.isNaN(d.getTime()) ? true : { message: 'Date invalide' };
}

export function isEmailValid(e: string): InputError {
  const regMatchs = e.match(
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
  return regMatchs !== null && regMatchs.length > 0
    ? true
    : { message: 'Email invalide' };
}

export function isPhoneValid(p: string): InputError {
  return !!p;
}

export function isPasswordValid(p: string): InputError {
  return p.length >= 8 ? true : { message: 'Mot de passe trop court' };
}

export function arePasswordsIdentical(p1: string, p2: string): InputError {
  return p1 === p2
    ? true
    : { message: 'Les mots de passe ne sont pas identiques' };
}

export function isElementNotNullAndNotUndefined<T>(e: T): InputError {
  return e !== null && e !== undefined
    ? true
    : { message: 'Veuillez renseignez ce champ' };
}
