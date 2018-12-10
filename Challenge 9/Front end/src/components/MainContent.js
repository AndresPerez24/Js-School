import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Books from './Book';
import { Container, Device } from '../styles/index';
import { Popup } from '.';
import axios from '../lib/axios';
import { getToken } from '../util/auth';

class MainContent extends Component {
  state = {
    selectedBook: {},
    isModalOpen: false,
  };

  lendBooks = (event, params) => {
    const { selectedBook } = this.state;
    const book = selectedBook;
    axios
      .put(`books/${book._id}/lend`, {
        headers: { Authorization: `Bearer ${getToken()}` },
        params,
      })
      .then((response) => {
        console.log(response);
      });
  };

  onSelectBook = (book) => {
    this.setState({ selectedBook: book, isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleClickPage = (e) => {
    const { fetchBooks, selectedBookshelf } = this.props;
    fetchBooks({ page: e.target.id, bookshelf: selectedBookshelf });
  };

  render() {
    const { selectedBook, isModalOpen } = this.state;
    const { books, pagination } = this.props;
    const pagesArray = Array.from(Array(pagination.pages).keys()).map(number => number + 1);
    return (
      <Content>
        <Container padding="10px 50px 0 20px">
          <Container flex justifyContent="space-between" alignItems="center">
            <Title>New Releaseas</Title>
          </Container>
          <ButtonsPage>
            {pagesArray.map(page => (
              <Button key={page} type="button" onClick={this.handleClickPage} id={page}>
                {page}
              </Button>
            ))}
          </ButtonsPage>
          <ContainerBooks>
            {books.map(book => (
              <Books onSelectBook={this.onSelectBook} book={book} key={book._id} />
            ))}
          </ContainerBooks>
          <Popup
            closeModal={this.closeModal}
            selectedBook={selectedBook}
            isModalOpen={isModalOpen}
            lendBooks={this.lendBooks}
          />
        </Container>
      </Content>
    );
  }
}

const Content = styled.div`
  height: calc(100vh - 80px);
  overflow: scroll;
`;

const ContainerBooks = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: center;

  @media ${Device.tablet} {
    text-align: left;
  }
`;

const Title = styled.h2`
  font-size: 25px;

  @media ${Device.tablet} {
    font-size: 20px;
  }
`;

const ButtonsPage = styled.div`
  margin: 10px 0;
  text-align: center;
`;

const Button = styled.button`
  transition: 0.3s;
  font-size: 15px;
  cursor: pointer;
  padding: 5px 12px;
  color: #6ec1e4;
  border: 1px solid #6ec1e4;
  margin: 0 5px;
  border-radius: 50%;
`;

MainContent.propTypes = {
  selectedBookshelf: PropTypes.string.isRequired,
  pagination: PropTypes.shape({
    page: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
  }).isRequired,
  fetchBooks: PropTypes.func.isRequired,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default MainContent;
