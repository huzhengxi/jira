/**
 * Created by jason on 2022/3/26.
 */
import {Button, Drawer} from 'antd';

interface ProjectModalProps {
  projectModalOpen: boolean;
  onClose: () => void;
}

export const ProjectModal = (props: ProjectModalProps) => {
  return (
    <Drawer
      onClose={props.onClose}
      visible={props.projectModalOpen}
      width={'100%'}
    >
      <h1>Project Modal</h1>
      <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
  );
};
