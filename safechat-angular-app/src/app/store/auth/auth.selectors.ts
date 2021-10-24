import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from './auth.state';

const featureSelector = createFeatureSelector<AuthState>("auth");
 
export const selectCurrentUser = createSelector(
  featureSelector,
  (state: AuthState) => state.currentUser,
);
