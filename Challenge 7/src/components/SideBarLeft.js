import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Container, Device } from '../styles/index';

function SideBarLeft(props) {
  const { bookshelfTypes, filterBooksByBookshelf, isOpen } = props;
  return (
    <SideBar isOpen={isOpen}>
      <Container>
        <Title>Main</Title>
        <List>
          {bookshelfTypes.map(bookshelf => (
            <ListItem
              activeStyle={{ color: 'white' }}
              onClick={() => filterBooksByBookshelf({ bookshelf })}
              key={bookshelf}
              to={`/${bookshelf}`}
            >
              {bookshelf}
            </ListItem>
          ))}
        </List>
      </Container>
    </SideBar>
  );
}

const Open = css`
  left: 0;
`;

const SideBar = styled.div`
    background-color: #353132;
    height: calc(100vh - 80px);
    padding-top: 30px;
    margin: 0;
    position: absolute; 
    top: 0;
    left: -200px;
    width: 200px;
    transition: 0.3s;
    ${props => props.isOpen && Open}

    @media ${Device.laptop} {
        left: 0;
        width: 250px;
  }
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

const ListItem = styled(NavLink)`
  display: list-item;
  text-align: -webkit-match-parent;
  color: #6ec1e4;
  font-size: 14px;
  list-style: none;
  margin-top: 30px;
  font-size: 13px;
  cursor: pointer;
`;

SideBarLeft.propTypes = {
  filterBooksByBookshelf: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  bookshelfTypes: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default SideBarLeft;
