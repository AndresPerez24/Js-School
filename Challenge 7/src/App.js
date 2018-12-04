import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import lodash from 'lodash';
import {
  Header, MainContent, SideBarLeft, SideBarRight,
} from './components';
import { Container, Device } from './styles/index';
import axios from './lib/axios';
import { getToken } from './util/auth';

class App extends Component {
  state = {
    sideBarRightOpen: false,
    sideBarLeftOpen: false,
    books: [],
    bookshelfTypes: [],
    selectedBookshelf: '',
  };

  componentDidMount = () => {
    const {
      match: {
        params: { book },
      },
    } = this.props;
    this.filterBooksByBookshelf({ bookshelf: book || '' });
    axios.get('books', {
      headers: { Authorization: `Bearer ${getToken()}` },
    }).then((response) => {
      const { books } = response.data;
      this.setState({ books });
      const bookshelfTypes = this.getBookshelfTypes(books);
      this.setState({ bookshelfTypes });
    });
  };

  toggleSideBarRight = () => {
    this.setState(previousState => ({ sideBarRightOpen: !previousState.sideBarRightOpen }));
  };

  toggleSideBarLeft = () => {
    this.setSearch(previousState => ({ sideBarLeftOpen: !previousState.sideBarLeftOpen }));
  };

  getBookshelfTypes = books => lodash.uniq(books.map(book => book.bookshelf)).sort();

  filterBooksByBookshelf = (params = {}) => {
    const { bookshelf } = params;
    axios
      .get('books', {
        headers: { Authorization: `Bearer ${getToken()}` },
        params,
      })
      .then((response) => {
        const { books } = response.data;
        this.setState({ books, selectedBookshelf: bookshelf });
      });
  };

  setSearch = (value) => {
    const { selectedBookshelf } = this.state;
    const DebounceSearchBooks = lodash.debounce(
      () => {
        this.filterBooksByBookshelf({
          bookshelf: selectedBookshelf,
          search: value,
        });
      },
      500,
      { maxWait: 3000 },
    );
    DebounceSearchBooks();
  };

  render() {
    const {
      books,
      sideBarRightOpen,
      sideBarLeftOpen,
      bookshelfTypes,
      selectedBookshelf,
    } = this.state;
    return (
      <div className="App">
        <Header setSearch={this.setSearch} />
        <Container flex justifyContent="space-between" padding="0 20px">
          <Button onClick={this.toggleSideBarLeft}>SideBar Left</Button>
          <Button onClick={this.toggleSideBarRight}>SideBar Right</Button>
        </Container>
        <Content>
          <SideBarLeft
            isOpen={sideBarLeftOpen}
            toggleSideBarLeft={this.toggleSideBarLeft}
            bookshelfTypes={bookshelfTypes}
            filterBooksByBookshelf={this.filterBooksByBookshelf}
          />
          <MainContent selectedBookshelf={selectedBookshelf} books={books} />
          <SideBarRight
            isOpen={sideBarRightOpen}
            toggleSideBarRight={this.toggleSideBarRight}
            books={books}
          />
        </Content>
      </div>
    );
  }
}

const Content = styled.div`
  position: relative;

  @media ${Device.laptop} {
    padding: 0 250px;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  line-height: 1.5;
  font: 700 1.2rem 'Roboto Slab', sans-serif;
  padding: 10px 10px;
  font-size: 12px;
  letter-spacing: 0.05rem;

  @media ${Device.laptop} {
    display: none;
  }
`;

App.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      books: PropTypes.string,
    }),
  }).isRequired,
};

export default App;
