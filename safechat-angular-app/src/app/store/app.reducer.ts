import { createReducer, on } from '@ngrx/store';
import { handleErrorAction } from './app.actions';
import { appState } from './app.state';

export const appReducer = createReducer(
  appState,
  on(handleErrorAction, (state) => {
    console.log('Error')

    return state
  }),
);
