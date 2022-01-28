// eslint-disable-next-line no-use-before-define
import React from 'react';
import { Error } from '../../toolbox/check';
import { Size } from '../../types/size.type';

interface InputProps {
  label?: string;
  inputAttributes: React.InputHTMLAttributes<HTMLInputElement>;
  iconLeft?: string;
  iconRight?: string;
  size?: Size;
  error?: Error | null;
}
export type InputType =
  | 'text'
  | 'date'
  | 'number'
  | 'checkbox'
  | 'email'
  | 'password'
  | 'tel'
  | 'file';
export type InputFileValue = FileList | null;
export type InputValue = string | number | Date | InputFileValue;

const Input: React.FC<InputProps> = ({
  iconLeft,
  iconRight,
  inputAttributes,
  error,
  label,
  size,
}: InputProps) => {
  if (inputAttributes.type === 'file') {
    return (
      <>
        <div className="file has-name is-fullwidth">
          <label
            className={`file-label ${size ? `is-${size}` : ''}`}
            htmlFor="file-input"
          >
            <input
              id="file-input"
              className={`file-input ${error ? 'is-danger' : ''} ${
                size ? `is-${size}` : ''
              }`}
              type="file"
              name={inputAttributes.name}
              onChange={inputAttributes.onChange}
            />
            <span className="file-cta">
              <span className="file-icon">
                <i className="fas fa-upload" />
              </span>
              <span className="file-label">{label}</span>
            </span>
            <span className="file-name">{inputAttributes.value}</span>
          </label>
        </div>
        {error && <span className="error">{error.message}</span>}
      </>
    );
  }
  return (
    <div className="field">
      <div
        className={`control ${iconLeft ? 'has-icons-left' : ''} ${
          iconRight ? 'has-icons-right' : ''
        }`}
      >
        {label && (
          <label
            className={`label ${size ? `is-${size}` : ''}`}
            htmlFor={label}
          >
            {label}
          </label>
        )}
        <input
          id={label}
          className={`input ${error ? 'is-danger' : ''} ${
            size ? `is-${size}` : ''
          }`}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...inputAttributes}
        />
        {iconLeft && (
          <span className={`icon ${size ? `is-${size}` : ''} is-left`}>
            <i className={`fas fa-${iconLeft}`} />
          </span>
        )}
        {iconRight && (
          <span className={`icon ${size ? `is-${size}` : ''} is-right`}>
            <i className={`fas fa-${iconRight}`} />
          </span>
        )}
        {error && <span className="error">{error.message}</span>}
      </div>
    </div>
  );
};
Input.defaultProps = {
  label: undefined,
  iconLeft: undefined,
  iconRight: undefined,
  size: undefined,
  error: null,
};
export { Input };
