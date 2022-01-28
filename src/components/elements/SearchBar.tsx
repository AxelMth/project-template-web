// eslint-disable-next-line no-use-before-define
import React from 'react';
import { Input } from './Input';

interface SearchBarProps {
  searchInput: string;
  placeholder: string;
  handleChange: (search: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
  const { handleChange, placeholder, searchInput } = props;
  return (
    <Input
      inputAttributes={{
        type: 'text',
        value: searchInput,
        placeholder,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(e.target.value);
        },
      }}
      iconLeft="search"
    />
  );
};
export default SearchBar;
