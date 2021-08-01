import React, {
  FC,
  ReactElement,
  KeyboardEvent,
  ChangeEvent,
  useState,
  useEffect,
  useRef,
} from "react";
import classNames from "classnames";
import Icon from "../icon";
import Input, { InputProps } from "../input/input";
import Transition from "../transition/transition";
import { useClickOutside, useDebounce } from "../../hooks";
interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (
    keyword: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (keyword: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    value,
    fetchSuggestions,
    onSelect,
    renderOption,
    ...restProps
  } = props;
  const [inputValue, setValue] = useState<string>(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [hightLightIndex, setHightLightIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceValue = useDebounce(inputValue);
  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);

  useClickOutside(componentRef, () => setSuggestions([]));

  useEffect(() => {
    if (debounceValue && triggerSearch.current) {
      setSuggestions([]);
      const result = fetchSuggestions(debounceValue);
      if (result instanceof Promise) {
        setLoading(true);
        result.then((data) => {
          setLoading(false);
          setSuggestions(data);
          if (data.length > 0) setShowDropdown(true);
        });
      } else {
        setSuggestions(result);
        if (result.length > 0) setShowDropdown(true);
      }
    } else {
      setShowDropdown(false);
    }

    setHightLightIndex(-1);
  }, [debounceValue, fetchSuggestions]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setValue(value);
    triggerSearch.current = true;
  };

  const handleSelect = (item: DataSourceType) => {
    setValue(item.value);
    setShowDropdown(false);
    onSelect && onSelect(item);
    triggerSearch.current = false;
  };

  const highlight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) index = suggestions.length - 1;
    setHightLightIndex(index);
  };

  console.log("loading", loading);
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.code) {
      case "Enter":
        if (suggestions[hightLightIndex]) {
          handleSelect(suggestions[hightLightIndex]);
        }
        break;
      case "ArrowUp":
        highlight(hightLightIndex - 1);
        break;
      case "ArrowDown":
        highlight(hightLightIndex + 1);
        break;
      case "Escape":
        setSuggestions([]);
        break;
      default:
        break;
    }
  };

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };

  const renderDropdown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        animation="zoom-in-top"
        timeout={300}
        onExit={() => setSuggestions([])}
      >
        <ul className="ant-suggestion-list">
          {loading && (
            <div className="suggstions-loading-icon">
              <Icon icon="spinner" spin />
            </div>
          )}
          {suggestions.map((item, index) => {
            const cnames = classNames("suggestion-item", {
              "is-active": hightLightIndex === index,
            });
            return (
              <li
                key={index}
                className={cnames}
                onClick={() => handleSelect(item)}
              >
                {renderTemplate(item)}
              </li>
            );
          })}
        </ul>
      </Transition>
    );
  };

  return (
    <div className="ant-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />

      {renderDropdown()}
    </div>
  );
};

export default AutoComplete;
