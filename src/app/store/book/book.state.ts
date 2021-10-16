import { Book } from 'src/app/core/models/book.model';

export const bookState = {
  books: [] as Book[],
  collection: [] as string[],
};

export type BookState = typeof bookState;