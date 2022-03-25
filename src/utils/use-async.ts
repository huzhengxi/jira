/**
 * Created by jason on 2022/3/16.
 */
import {useCallback, useState} from 'react';
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

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  });

  const config = {...defaultConfig, ...initialConfig};
  const [retry, setRetry] = useState(() => () => {
  });
  const mountedRef = useMountedRef();

  const setData = useCallback(
    (data: D) => setState({
      data,
      stat: 'success',
      error: null
    }), []);
  const setError = useCallback(
    (error: Error) => setState({
      data: null,
      error: error,
      stat: 'error'
    }), []);

  const run = useCallback((promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
    if (!promise || !promise.then) {
      throw new Error('请传入 Promise 类型数据');
    }
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig.retry(), runConfig);
      }
    });
    setState({...state, stat: 'loading'});
    return promise
      .then(data => {
        if (mountedRef.current) {
          setData(data);
        }
        return data;
      })
      .catch(error => {
        setError(error);
        if (config.throwOnError) {
          return Promise.reject(error);
        }
      });
  }, [config.throwOnError, mountedRef, setData, setError]);

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
