/**
 * Created by jason on 2022/3/20.
 */
import React from 'react';
import {IdSelect} from './id-select';
import {useUsers} from '../utils/user';

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const {data: users} = useUsers();
  return <IdSelect options={users || []} {...props} />;
};
