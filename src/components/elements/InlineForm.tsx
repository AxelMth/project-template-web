// eslint-disable-next-line no-use-before-define
import React from 'react';
import { Input } from './Input';
import { Size } from '../../types/size.type';
import { Color } from '../../types/color.type';

interface InlineFormProps {
  isLoading: boolean;
  value: string;
  submitButtonLabel: string;
  handleChange: (v: string) => void;
  handleSubmit: () => void;
  handleCancel: () => void;
  color?: Color;
  size?: Size;
}

const InlineForm: React.FC<InlineFormProps> = ({
  isLoading,
  color,
  handleChange,
  handleSubmit,
  handleCancel,
  size,
  submitButtonLabel,
  value,
}: InlineFormProps) => {
  return (
    <div className="columns is-mobile is-vcentered">
      <div className="column is-narrow">
        <Input
          inputAttributes={{
            type: 'text',
            value,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(e.target.value);
            },
          }}
          size={size}
        />
      </div>
      <div className="column is-narrow">
        <button
          type="submit"
          className={`button ${size ? `is-${size}` : ''} ${
            color ? `is-${color}` : ''
          } ${isLoading ? 'is-loading' : ''}`}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {submitButtonLabel}
        </button>
      </div>
      <div className="column is-narrow">
        <span
          aria-hidden="true"
          className={`icon ${size ? `is-${size}` : ''}`}
          onClick={handleCancel}
        >
          <i className="fas fa-times fa-2x" />
        </span>
      </div>
    </div>
  );
};
InlineForm.defaultProps = {
  color: undefined,
  size: undefined,
};
export default InlineForm;
