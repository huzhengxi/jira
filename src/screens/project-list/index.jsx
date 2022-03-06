import React, {useEffect, useState} from 'react';
import {SearchPanel} from './search-panel';
import {List} from './list';
import qs from 'qs';
import {cleanObject, useDebounce} from '../../utils';

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: '',
    personId: ''
  });
  const [list, setList] = useState([]);
  const debouncedValue = useDebounce(param, 1000);
  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, []);

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debouncedValue]);

  return <div>
    <SearchPanel users={users} param={param} setParam={setParam}/>
    <List users={users} list={list}/>
  </div>;
};
