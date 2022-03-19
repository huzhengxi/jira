/**
 * Created by jason on 2022/3/20.
 */
import {useUrlQueryParam} from '../../utils/url';
import {useMemo} from 'react';

export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId']);
  return [
    useMemo(() => {
      return {...param, personId: Number(param.personId) || undefined};
    }, [param]),
    setParam
  ] as const;
};
