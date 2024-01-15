import { createAction, props } from '@ngrx/store';
import { UserData } from '../module/user.module';

export const GET_DATA = '[Get Data] Get user data';
export const LOAD_DATA = '[Load Data] Load user data';
export const UPDATE_DATA = '[Update Data] Update user data';

export const getUserDataAction = createAction(GET_DATA);

export const loadUserData = createAction(
  LOAD_DATA,
  props<{ user: UserData }>()
);

export const updateUserData = createAction(
  UPDATE_DATA,
  props<{
    id: Number;
    firstName: string;
    lastName: string;
    age: Number;
    gender: string;
  }>()
);
