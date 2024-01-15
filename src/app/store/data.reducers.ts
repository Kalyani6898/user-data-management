import { createReducer, on } from '@ngrx/store';
import { loadUserData, updateUserData } from './data.actions';
import { User, UserData } from '../module/user.module';

export const initialState: UserData = {
  users: [],
  total: 0,
  skip: 0,
  limit: 0,
};
export const userReducer = createReducer(
  initialState,
  on(
    loadUserData,
    (state, action): UserData => ({
      users: action.user.users,
      total: action.user.total,
      limit: action.user.limit,
      skip: action.user.skip,
    })
  ),
  on(updateUserData, (state, action): UserData => {
    return {
      ...state,
      users: state.users
        .map((element) => {
          if (element.id === action.id) {
            return {
              ...element,
              firstName: action.firstName,
              lastName: action.lastName,
              age: action.age,
              gender: action.gender,
            };
          } else {
            return element;
          }
        }),
    };
  })
);
