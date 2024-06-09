import { useState, useEffect, useCallback } from 'react';



//custom usedebounce hook to input the changes, one needs to make while editing the user info for debouncing
const useDebounce = (callback, delay) => {
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const debouncedFunction = useCallback((...args) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(() => {
      callback(...args);
    }, delay);
    setDebounceTimeout(timeout);
  }, [callback, delay, debounceTimeout]);

  useEffect(() => {
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

  return debouncedFunction;
};

export default useDebounce;