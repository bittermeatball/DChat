import { createReducer, on } from '@ngrx/store';
import { setCurrentUser } from './auth.actions';
import { authState } from './auth.state';

export const authReducer = createReducer(
  authState,
  on(setCurrentUser, (state, { currentUser }) => ({
    ...state,
    currentUser
  })),
);
