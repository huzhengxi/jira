import React, {useState} from 'react';
import {useDebounce} from '../../utils';
import {SearchPanel} from './search-panel';
import {List} from './list';
import styled from '@emotion/styled';
import {Typography} from 'antd';
import {useProjects} from '../../utils/project';
import {useUsers} from '../../utils/user';
import {useDocumentTitle} from '../../components/lib';
import {useUrlQueryParam} from '../../utils/url';
import {useProjectSearchParams} from './util';


export const ProjectListScreen = () => {
  useDocumentTitle('项目列表');
  const [param, setParam] = useProjectSearchParams();
  const debouncedParam = useDebounce(param, 200);
  const {error, isLoading, data: list, retry} = useProjects(debouncedParam);
  const {data: users} = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam}/>
      {error ? <Typography.Text style={{marginBottom: 10}} type={'danger'}>{error.message}</Typography.Text> : null}
      <List refresh={retry} loading={isLoading} dataSource={list || []} users={users || []}/>
    </Container>
  );
};

// ProjectListScreen.whyDidYouRender = true

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3.2rem;
`;
