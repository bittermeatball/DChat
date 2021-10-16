import { createReducer, on } from '@ngrx/store';
import { retrievedBookList } from './book.actions';
import { bookState } from './book.state';

export const booksReducer = createReducer(
  bookState,
  on(retrievedBookList, (state, { books }) => ({ ...state, books }))
);