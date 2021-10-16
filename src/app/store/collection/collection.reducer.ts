import { createReducer, on } from '@ngrx/store';
import { addBook, removeBook } from '../book/book.actions';
import { collectionState } from './collection.state';
 
export const collectionReducer = createReducer(
  collectionState,
  on(removeBook, (state, { bookId }) => ({
    ...state,
    collections: state.collections.filter((id) => id !== bookId)
  })),
  on(addBook, (state, { bookId }) => {
    if (state.collections.indexOf(bookId) > -1) return state;
 
    return {
      ...state,
      collections: [...state.collections, bookId]
    };
  })
);