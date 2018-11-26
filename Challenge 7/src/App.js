import React, { Component } from "react";
import { Header, MainContent, SideBarLeft, SideBarRight } from "./components";
import styled from "styled-components";
import { Container, Device } from "./styles/index";
import axios from "./lib/axios";
import lodash from "lodash";

class App extends Component {
  state = {
    sideBarRightOpen: false,
    sideBarLeftOpen: false,
    books: [],
    bookshelfTypes: [],
    selectedBookshelf: "",
    search: ""
  };

  componentDidMount() {
    axios
      .get("books")
      .then(response => {
        const books = response.data.books;
        const bookshelfTypes = this.getBookshelfTypes(books);
        this.setState({ books, bookshelfTypes });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      }); 
  }

  toggleSideBarRight = () => {
    this.setState({ sideBarRightOpen: !this.state.sideBarRightOpen });
  };

  toggleSideBarLeft = () => {
    this.setState({ sideBarLeftOpen: !this.state.sideBarLeftOpen });
  };

  getBookshelfTypes = books => {
    return lodash.uniq(books.map(book => book.bookshelf)).sort();
  };

  filterBooksByBookshelf = (params = {}) => {
    const { bookshelf } = params;
    axios
      .get("books", {
        params
      })
      .then(response => {
        const books = response.data.books;
        this.setState({ books, selectedBookshelf: bookshelf });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };

  setSearch = value => {
    const DebounceSearchBooks = 
    lodash.debounce(() => {
      this.filterBooksByBookshelf({
        bookshelf: this.state.selectedBookshelf,
        search: value
      })
    } , 500, { 'maxWait': 3000 });
      DebounceSearchBooks();
  };

  render() {
    const {
      books,
      sideBarRightOpen,
      sideBarLeftOpen,
      bookshelfTypes,
      selectedBookshelf
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
            selectedBookshelf={selectedBookshelf}
          />
          <MainContent books={books} />
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
  font: 700 1.2rem "Roboto Slab", sans-serif;
  padding: 10px 10px;
  font-size: 12px;
  letter-spacing: 0.05rem;

  @media ${Device.laptop} {
    display: none;
  }
`;

export default App;
