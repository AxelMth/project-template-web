// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react';
import { ApolloError } from '@apollo/client';
import { Input, InputType, InputValue } from './Input';
import { InputError } from '../../toolbox/check';
import { firstLetterToUppercase } from '../../toolbox/string';
import formatDateYYYMMDD from '../../toolbox/date';

export type FormInput = {
  name: string;
  value: InputValue;
  type: InputType;
  setter: (arg: InputValue) => void;
  shouldDisplayErrorMessage: boolean;
  isValid: InputError;
};

interface FormProps {
  title: string;
  inputs: FormInput[];
  handleSubmit: () => void;
  submitButtonLabel: string;
  isLoading?: boolean;
  error?: InputError | ApolloError;
}

const Form: React.FC<FormProps> = ({
  title,
  inputs,
  handleSubmit,
  submitButtonLabel,
  isLoading,
  error,
}: FormProps) => {
  const [shouldDisplayError, setShouldDisplayError] = useState(true);
  useEffect(() => {
    setShouldDisplayError(true);
  }, [error]);
  function getInputValue(value: InputValue): string | number {
    if (value instanceof Date) {
      return formatDateYYYMMDD(value);
    }
    return value as string;
  }
  function getModelValue(
    value: string | number,
    type: InputType,
  ): string | number | Date {
    if (type === 'date') {
      return new Date(value);
    }
    return value;
  }
  return (
    <div className="columns is-marginless is-multiline is-centered">
      <div className="column is-four-fifths">
        <div className="card has-background-link-light">
          <form
            className="form"
            onSubmit={(e: React.FormEvent) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="block">
              <span className="title is-4">{title}</span>
            </div>
            {inputs
              .filter((e) => e.type !== 'file')
              .map((input) => (
                <Input
                  key={`${input.name}__${input.type}`}
                  label={firstLetterToUppercase(input.name)}
                  inputAttributes={{
                    name: input.name,
                    type: input.type,
                    value: getInputValue(input.value),
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      if (input.type === 'file') {
                        input.setter(e.target.files);
                      } else {
                        input.setter(getModelValue(e.target.value, input.type));
                      }
                    },
                  }}
                  size="small"
                  error={
                    typeof input.isValid === 'object' &&
                    input.shouldDisplayErrorMessage
                      ? input.isValid
                      : null
                  }
                />
              ))}
            {inputs
              .filter((e) => e.type === 'file')
              .map((input) => (
                <Input
                  key={`${input.name}__${input.type}`}
                  label={firstLetterToUppercase(input.name)}
                  inputAttributes={{
                    name: input.name,
                    type: input.type,
                    value:
                      ((input.value as FileList) &&
                        (input.value as FileList)[0] &&
                        (input.value as FileList)[0].name) ||
                      '',
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      input.setter(e.target.files);
                    },
                  }}
                  error={
                    typeof input.isValid === 'object' &&
                    input.shouldDisplayErrorMessage
                      ? input.isValid
                      : null
                  }
                />
              ))}
            {typeof error === 'object' && error?.message && shouldDisplayError && (
              <div className="notification is-danger is-light mb-0">
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  arria-hidden="true"
                  className="delete"
                  onClick={() => {
                    setShouldDisplayError(!shouldDisplayError);
                  }}
                />
                <strong>{error?.message}</strong>
              </div>
            )}
            <div className="block mt-5" style={{ float: 'right' }}>
              <button
                type="submit"
                className={`button is-primary ${isLoading ? 'is-loading' : ''}`}
                disabled={isLoading}
              >
                {submitButtonLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
Form.defaultProps = {
  isLoading: false,
  error: undefined,
};
export default Form;
