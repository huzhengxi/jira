/**
 * Created by jason on 2022/3/16.
 */
import {Project} from '../screens/project-list/list';
import {useHttp} from './http';
import {useAsync} from './use-async';
import {useEffect} from 'react';
import {cleanObject} from './index';

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const {run, ...result} = useAsync<Project[]>();
  const fetchProjects = () => client('projects', {data: cleanObject(param || {})});
  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects
    });
  }, [param]);

  return result;
};
export const useEditProject = () => {
  const {run, ...asyncResult} = useAsync();
  const client = useHttp();
  const mutate = (param: Partial<Project>) => {
    return run(
      client(`projects/${param.id}`, {
        data: param,
        method: 'PATCH'
      })
    );
  };
  return {
    mutate,
    ...asyncResult
  };
};

export const useAddProject = () => {
  const {run, ...asyncResult} = useAsync();
  const client = useHttp();
  const mutate = (param: Partial<Project>) => {
    return run(
      client(`projects/${param.id}`, {
        data: param,
        method: 'POST'
      })
    );
  };
  return {
    mutate,
    ...asyncResult
  };
};
