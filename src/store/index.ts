/**
 * Created by jason on 2022/3/28.
 */
import {configureStore} from '@reduxjs/toolkit';
import {projectListSlice} from './slices/project-list.slice';
import {authSlice} from './slices/auth.slice';

export const rootReducer = {
  projectList: projectListSlice.reducer,
  auth: authSlice.reducer
};

export const store = configureStore({
  reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
