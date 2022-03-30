/**
 * Created by jason on 2022/3/20.
 */
import {useUrlQueryParam} from '../../utils/url';
import {useMemo} from 'react';
import {useSearchParams} from 'react-router-dom';
import {useProject} from '../../utils/project';

export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId']);
  return [
    useMemo(() => {
      return {...param, personId: Number(param.personId) || undefined};
    }, [param]),
    setParam
  ] as const;
};

export const useProjectModal = () => {
  const [{projectCreate}, setProjectCreate] = useUrlQueryParam([
    'projectCreate'
  ]);
  const [{editingProjectId}, setEditingProjectId] = useUrlQueryParam(['editingProjectId']);
  const [_, setUrlParams] = useSearchParams();
  const {data: editingProject, isLoading} = useProject(Number(editingProjectId));

  const open = () => setProjectCreate({projectCreate: true});
  const close = () => setUrlParams({projectCreate: '', editingProjectId: ''});
  const startEdit = (id: number) => setEditingProjectId({editingProjectId: id});

  return {
    projectModalOpen: projectCreate === 'true' || !!editingProjectId,
    open,
    close,
    startEdit,
    editingProject,
    isLoading
  };
};
