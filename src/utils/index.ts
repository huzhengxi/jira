import {useEffect, useState} from 'react';

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) => value === undefined || value === null || value === '';

export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = {...object};
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    //每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    //每次在上一个useEffect处理完以后在执行
    return () => clearTimeout(timeout);
  });
  return debouncedValue;
};


export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};
