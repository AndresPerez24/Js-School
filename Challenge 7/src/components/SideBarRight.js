import React, { Component } from "react";
import styled, { css } from "styled-components";
import { Container, Device } from "../styles/index";

class SideBarRight extends Component {
  render() {
    const { books } = this.props;
    return (
      <SideBar isOpen={this.props.isOpen}>
        <Container>
        {/*  <button onClick={this.props.toggleSideBarRight}>X</button>  */}
          <Title>Most read books</Title>
          <List>
            {books.slice(0, 5).map(book => (
                <ListItem
                  key={book.title}
                >
                {book.title}
                </ListItem>
              ))}
          </List>
        </Container>
      </SideBar>
    );
  }
}

const SideBar = styled.div`
    background-color: #353132;
    height: calc(100vh - 80px);
    padding-top: 30px;
    margin: 0;
    position: absolute; 
    top: 0;
    right: -200px;
    width: 200px;
    transition: 0.3s;
    ${props => (props.isOpen && Open)}

    @media ${Device.laptop} {
        right: 0;
        width: 250px;
  }
`;

const Open = css`
  right: 0;
`;

const Title = styled.h3`
  color: white;
  font-size: 13px;
  margin-left: 30px;
  text-transform: uppercase;
`;
const List = styled.ul`
  padding-inline-start: 0;
  margin-left: 30px;
`;

const ListItem = styled.li`
  color: #6ec1e4;
  font-size: 14px;
  list-style: none;
  margin-top: 30px;
  font-size: 13px;
`;

export default SideBarRight;
