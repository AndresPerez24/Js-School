import * as types from './types';

export const fetchBooks = () => ({
  type: types.FETCH_BOOK,
});

export const fetchBooksSuccess = data => ({
  type: types.FETCH_BOOK_SUCCESS,
  payload: {
    data,
  },
});
