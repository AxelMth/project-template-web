import { useState } from 'react';
import { InputType, InputValue } from '../components/elements/Input';
import CheckType from '../constants/CheckType';
import { FormInput } from '../components/elements/Form';
import { useInput } from './useInput.hook';

export interface Input {
  name: string;
  type: InputType;
  initialValue: InputValue;
  validationChecks: CheckType[];
}

export function useForm(
  inputs: Input[],
  submitSuccessCallback: () => void,
): [FormInput[], () => void] {
  const [hasSubmittedFormOnce, setHasSubmittedFormOnce] = useState<boolean>(
    false,
  );
  const formInputs = inputs.map(
    (input): FormInput => {
      const [value, setter, isValid] = useInput(
        input.initialValue,
        input.validationChecks,
      );
      return {
        name: `${input.name} ${input.validationChecks.length > 0 ? '*' : ''}`,
        type: input.type,
        value,
        setter,
        shouldDisplayErrorMessage: hasSubmittedFormOnce,
        isValid,
      };
    },
  );
  const isFormValid = formInputs.reduce(
    (_isFormValid, formInput) => _isFormValid && formInput.isValid === true,
    true,
  );
  function handleSubmit(): void {
    if (isFormValid === true) {
      submitSuccessCallback();
    }
    if (!hasSubmittedFormOnce) {
      setHasSubmittedFormOnce(true);
    }
  }
  return [formInputs, handleSubmit];
}
