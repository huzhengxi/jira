/**
 * Created by jason on 2022/3/26.
 */
import styled from '@emotion/styled';
import {useProjects} from '../utils/project';
import {Divider, List, Popover, Typography} from 'antd';
import {ButtonNoPadding} from './lib';
import {useProjectModal} from '../screens/project-list/util';
import {useRef} from 'react';

export const ProjectPopover = () => {
  const {data: projects} = useProjects();
  const pinnedProjects = projects?.filter(project => project.pin);
  const {open: openProjectModal} = useProjectModal();
  const popover = useRef();
  const content = (
    <ContentContainer>
      <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
      <List>
        {
          pinnedProjects?.map(project => (
            <List.Item>
              <List.Item.Meta title={project.name}/>
            </List.Item>
          ))
        }
      </List>
      <Divider/>
      <ButtonNoPadding type={'link'} onClick={openProjectModal}>创建项目</ButtonNoPadding>
    </ContentContainer>
  );
  return (
    <Popover ref={popover} placement={'bottom'} content={content}>
      <span>项目</span>
    </Popover>
  );
};


const ContentContainer = styled.div`
  min-width: 30rem;
`;
