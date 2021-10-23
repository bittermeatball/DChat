import { createAction, props } from '@ngrx/store';
import { Auth } from 'src/app/core/models/auth.model';
 
export const getCurrentUser = createAction(
  '[Auth/API] Get current user',
  props<{ id: string }>()
);

export const setCurrentUser = createAction(
  '[Auth/API] Login',
  props<{ currentUser: Auth }>()
);

export const login = createAction(
  '[Auth/API] Login',
  props<{ id: string }>()
);
