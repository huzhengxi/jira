import React, {useState} from 'react';
import {useDebounce} from '../../utils';
import {SearchPanel} from './search-panel';
import {List} from './list';
import styled from '@emotion/styled';
import {Typography} from 'antd';
import {useProjects} from '../../utils/project';
import {useUsers} from '../../utils/user';


export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
  const debouncedParam = useDebounce(param, 200);
  const {error, isLoading, data: list} = useProjects(debouncedParam);
  const {data: users} = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam}/>
      {error ? <Typography.Text style={{marginBottom: 10}} type={'danger'}>{error.message}</Typography.Text> : null}
      <List loading={isLoading} dataSource={list || []} users={users || []}/>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3.2rem;
`;
