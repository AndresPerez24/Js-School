import { connect } from 'react-redux';
import get from 'lodash/get';
import App from './App';
import * as actions from './actions';

export default connect(
  (state) => {
    const books = get(state, 'Books.data.books.docs', []);
    return { books };
  },
  { fetchBooks: actions.fetchBooks },
)(App);
