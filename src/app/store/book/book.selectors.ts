import { createSelector, createFeatureSelector } from "@ngrx/store";
import { Book } from 'src/app/core/models/book.model';
import { BookState } from './book.state';
 
export const selectBooks = createSelector(
  (state: BookState) => state.books,
  (books: Array<Book>) => books
);
 
export const selectCollectionState = createFeatureSelector<BookState, Array<string>>("collection");
 
export const selectBookCollection = createSelector(
  selectBooks,
  selectCollectionState,
  (books: Array<Book>, collection: Array<string>) => collection.map((id) => books.find((book) => book.id === id))
);