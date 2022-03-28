/**
 * Created by jason on 2022/3/12.
 */
import React from 'react';
import styled from '@emotion/styled';
import {Row} from '../components/lib';
import {useAuth} from '../context/auth-context';
import {ReactComponent as Software} from 'assets/software-logo.svg';
import {Button, Dropdown, Menu} from 'antd';
import {ProjectListScreen} from '../screens/project-list';
import {BrowserRouter as Router} from 'react-router-dom';
import {Route, Routes} from 'react-router';
import {ProjectScreen} from '../screens/project';
import {resetRoute} from '../utils';
import {ProjectPopover} from '../components/project-popover';
import {ProjectModal} from '../screens/project-list/project-modal';

export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader/>
      <Main>
        <Router>
          <Routes>
            <Route path={'projects'} element={<ProjectListScreen/>}/>
            <Route path={'projects/:projectId/*'} element={<ProjectScreen/>}/>
            <Route index element={<ProjectListScreen/>}/>
          </Routes>
        </Router>
      </Main>
      <ProjectModal/>
    </Container>
  );
};

const PageHeader = () => {
  return <Header between={true}>
    <HeaderLeft gap={true}>
      <Button type={'link'} onClick={resetRoute}>
        <Software width={'18rem'} color={'rgb(38, 132, 255)'}/>
      </Button>
      <ProjectPopover/>
      <span>用户</span>
    </HeaderLeft>
    <HeaderRight>
      <User/>
    </HeaderRight>
  </Header>;
};

const User = () => {
  const {logout, user} = useAuth();
  return <Dropdown overlay={
    <Menu>
      <Menu.Item key={'logout'}>
        <Button onClick={logout} type={'link'}>
          登出
        </Button>
      </Menu.Item>
    </Menu>
  }>
    <Button type={'link'} onClick={e => e.preventDefault()}>
      Hi, {user?.name}
    </Button>
  </Dropdown>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main``;
