/**
 * Created by jason on 2022/3/16.
 */
import {useCallback, useContext, useReducer, useState} from 'react';
import {useMountedRef} from './index';

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: 'idle' | 'loading' | 'error' | 'success';
}

const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null
};

const defaultConfig = {
  throwOnError: false
};

const useSafeDispatch = <T>(dispatch: (...arg: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [mountedRef, dispatch]
  );
};

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {

  const [state, dispatch] = useReducer((state: State<D>, action: Partial<State<D>>) => ({...state, ...action}), {
    ...defaultInitialState,
    ...initialState
  });
  const config = {...defaultConfig, ...initialConfig};

  //useState直接传入函数的含义是：惰性初始化，所以要用useState保存函数，不能直接传入函数
  const [retry, setRetry] = useState(() => () => {
  });

  const safeDispatch = useSafeDispatch(dispatch);

  const setData = useCallback(
    (data: D) => safeDispatch({
      data,
      stat: 'success',
      error: null
    }), [safeDispatch]);
  const setError = useCallback(
    (error: Error) => safeDispatch({
      data: null,
      error: error,
      stat: 'error'
    }), [safeDispatch]);

  const run = useCallback((promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
    if (!promise || !promise.then) {
      throw new Error('请传入 Promise 类型数据');
    }
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig.retry(), runConfig);
      }
    });
    safeDispatch({stat: 'loading'});
    return promise
      .then(data => {
        setData(data);
        return data;
      })
      .catch(error => {
        setError(error);
        if (config.throwOnError) {
          return Promise.reject(error);
        }
      });
  }, [config.throwOnError, safeDispatch, setData, setError]);

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    retry,
    setData,
    setError,
    ...state
  };
};
