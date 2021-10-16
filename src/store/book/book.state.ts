import { Book } from 'src/types/book.interface';

export const bookState = {
  books: [] as Book[],
  collection: [] as string[],
};

export type BookState = typeof bookState;