import { createSelector } from "@ngrx/store";
import { Auth } from 'src/app/core/models/auth.model';
import { AuthState } from './auth.state';
 
export const selectCurrentUser = createSelector(
  (state: AuthState) => state.currentUser,
  (currentUser: Auth) => currentUser
);
