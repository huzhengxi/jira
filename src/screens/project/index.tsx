/**
 * Created by jason on 2022/3/19.
 */
import {Link} from 'react-router-dom';
import {Route, Routes} from 'react-router';
import {KanbanScreen} from '../kanban';
import {EpicScreen} from '../epic';

export const ProjectScreen = () => {
  return <div>
    <h1>ProjectScreen</h1>
    <Link to={'kanban'}>看板</Link>
    <Link to={'epic'}>任务组</Link>
    <Routes>
      <Route path={'/kanban'} element={<KanbanScreen/>}/>
      <Route path={'/epic'} element={<EpicScreen/>}/>
      <Route index element={<KanbanScreen/>}/>
    </Routes>
  </div>;
};
