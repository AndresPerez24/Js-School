import { takeLatest } from 'redux-saga/effects';

import { call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as types from '../actions/types';
import * as BooksApi from '../Services/Book';

import * as actions from '../actions';
/* import * as api from "../../../api"; */

function* fetchBook(action) {
  const response = yield call(BooksApi.fetchBooks);
  yield put(actions.fetchBooksSuccess(response.data));
  /*   try {
    const { data } = yield call(api.Book.fetchBook);
    console.log({ data });
    yield put(actions.fetchBookSuccess(data || false)); */
  /*   } catch (error) {
    console.log(error);
  } */
}

export default function* rootBooks() {
  yield takeLatest(types.FETCH_BOOK, fetchBook);
}
