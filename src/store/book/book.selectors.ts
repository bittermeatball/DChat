import { createSelector, createFeatureSelector } from "@ngrx/store";
import { Book } from 'src/types/book.interface';
import { AppState } from '../app.state';
 
export const selectBooks = createSelector(
  (state: AppState) => state.books,
  (books: Array<Book>) => books
);
 
export const selectCollectionState = createFeatureSelector<AppState, Array<string>>("collection");
 
export const selectBookCollection = createSelector(
  selectBooks,
  selectCollectionState,
  (books: Array<Book>, collection: Array<string>) => collection.map((id) => books.find((book) => book.id === id))
);