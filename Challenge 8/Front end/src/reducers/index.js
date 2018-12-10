import { combineReducers } from 'redux';
import * as types from '../actions/types';

const Books = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_BOOK_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const entities = combineReducers({
  Books,
});

export default entities;
