/**
 * Created by jason on 2022/3/19.
 */

import {URLSearchParamsInit, useSearchParams} from 'react-router-dom';
import {useMemo} from 'react';
import {cleanObject} from './index';

/**
 * 返回页面url中，指定参数值
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return [
    useMemo(() =>
        keys.reduce((prev, key) => (
          {...prev, [key]: searchParams.get(key) || ''}
        ), {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]),
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = cleanObject({...Object.fromEntries(searchParams), ...params}) as URLSearchParamsInit;
      return setSearchParams(o)
    }
  ] as const;
};
