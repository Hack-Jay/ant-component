import { useState, useEffect, RefObject } from "react";

export const useDebounce = (value: any, delay = 300) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceValue;
};

export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: Function
) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      // 判断点击的地方是否是ref的后代节点
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
};
