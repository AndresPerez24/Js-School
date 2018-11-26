import React, { Component } from "react";
import styled from "styled-components";
import Books from "./Book";
import { Container, Device } from "../styles/index";
import { Popup } from "../components";

class MainContent extends Component {
  state = {
    selectedBook: {},
    isModalOpen: false
  };

  onSelectBook = book => {
    this.setState({ selectedBook: book, isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { selectedBook, isModalOpen } = this.state
    const { books } = this.props
    return (
      <Content>
        <Container padding="10px 50px 0 20px">
          <Container flex justifyContent="space-between" alignItems="center">
            <Title>New Releaseas</Title>
          </Container>
          <ContainerBooks>
            {books.map(book => (
              <Books
                onSelectBook={this.onSelectBook}
                book={book}
                key={book._id}
              />
            ))}
          </ContainerBooks>
          <Popup
            closeModal={this.closeModal}
            selectedBook={selectedBook}
            isModalOpen={isModalOpen}
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

export default MainContent;
