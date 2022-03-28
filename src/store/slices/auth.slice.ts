/**
 * Created by jason on 2022/3/28.
 */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../../screens/project-list/search-panel';
import {AppDispatch, RootState} from '../index';
import * as auth from 'auth-provider';
import {AuthForm, bootstrapUser} from '../../context/auth-context';


interface State {
  user: User | null;
}

const initialState: State = {
  user: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    }
  }
});

const {setUser} = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export const login = (form: AuthForm) => (dispatch: AppDispatch) => {
  return auth.login(form).then(user => dispatch(setUser(user)));
};
export const register = (form: AuthForm) => (dispatch: AppDispatch) => {
  return auth.register(form).then(user => dispatch(setUser(user)));
};

export const logout = () => (dispatch: AppDispatch) => {
  return auth.logout().then(() => dispatch(setUser(null)));
};
export const bootstrap = () => (dispatch: AppDispatch) => {
  return bootstrapUser().then(user => setUser(user));
};
