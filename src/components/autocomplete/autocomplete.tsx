import React, { FC, ChangeEvent, useState } from "react";
import Input, { InputProps } from "../input/input";

interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (keyword: string) => string[];
  onSelect?: (keyword: string) => void;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { value, fetchSuggestions, onSelect, ...restProps } = props;
  const [inputValue, setValue] = useState<string>(value as string);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  console.log("value", inputValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    console.log("e", value);
    setValue(value);
    if (value) {
      const result = fetchSuggestions(value);
      setSuggestions(result);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (item: string) => {
    setValue(item);
    onSelect && onSelect(item);
  };

  const renderSuggestions = () => {
    return (
      <>
        {suggestions.map((item, index) => (
          <li key={index} onClick={() => handleSelect(item)}>
            {item}
          </li>
        ))}
      </>
    );
  };

  return (
    <div>
      <Input value={inputValue} onChange={handleChange} {...restProps} />
      {suggestions.length > 0 && renderSuggestions()}
    </div>
  );
};

export default AutoComplete;
