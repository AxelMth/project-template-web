// eslint-disable-next-line no-use-before-define
import React from 'react';

export type SelectOption = {
  label: string;
  value: string | number;
};
interface SelectProps {
  options: SelectOption[];
  onChange: (value: string | number) => void;
  value?: string | number;
}
const Select: React.FC<SelectProps> = (props: SelectProps) => {
  const { options, value } = props;
  return (
    <div className="select">
      <select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          props.onChange(e.target.value);
        }}
        value={value}
      >
        {options.map((option) => (
          <option value={option.value} key={`${option.label}__${option.value}`}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
Select.defaultProps = {
  value: undefined,
};
export { Select };
