import { useState } from 'react';
import CheckType from '../constants/CheckType';
import { Error, getChecks } from '../toolbox/check';

export type InputError = boolean | Error;
export function useInput<T>(
  initialValue: T,
  checkTypes: CheckType[] = [],
): [T, (val: T) => void, InputError] {
  const [input, setInput] = useState<T>(initialValue);
  return [input, setInput, isInputValid<T>(input, checkTypes)];
}

function isInputValid<T>(input: T, checkTypes: CheckType[]): InputError {
  const checks = getChecks(checkTypes);
  return checks.reduce((isValid: InputError, checkFunction): InputError => {
    if (isValid !== true) {
      return isValid;
    }
    return isValid && checkFunction(input);
  }, true);
}
