import React, {ReactNode, useCallback, useState} from 'react';
import * as auth from 'auth-provider';
import {User} from 'screens/project-list/search-panel';
import {useMount} from 'utils';
import {http} from 'utils/http';
import {useAsync} from '../utils/use-async';
import {FullPageError, FullPageLoading} from '../components/lib';
import {useDispatch, useSelector} from 'react-redux';
import {authSlice, bootstrap, selectUser} from '../store/slices/auth.slice';
import * as authStore from '../store/slices/auth.slice';

export interface AuthForm {
  username: string;
  password: string;
}

export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http('me', {token});
    user = data.user;
  }
  return user;
};


export const AuthProvider = ({children}: { children: ReactNode }) => {
  const {error, isLoading, isIdle, isError, run} = useAsync<User | null>();
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  useMount(() => {
    run(dispatch(bootstrap()));
  });

  if (isIdle || isLoading) {
    return <FullPageLoading/>;
  }
  if (isError) {
    return <FullPageError error={error}/>;
  }

  return (
    <div>{children}</div>
  );
};

export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  const user = useSelector(selectUser);
  const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)), [dispatch]);
  const register = useCallback((form: AuthForm) => dispatch(authStore.register(form)), [dispatch]);
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);

  return {
    user,
    login,
    logout,
    register
  };
};
