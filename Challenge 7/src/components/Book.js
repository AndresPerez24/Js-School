import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Device } from '../styles/index';

function Books(props) {
  const { book, onSelectBook } = props;
  return (
    <Book onClick={() => onSelectBook(book)}>
      <ImgContainer>
        <BookImage src={book.imageLink} alt="" />
      </ImgContainer>
      <Title>{book.title}</Title>
      <SubTitle>{book.authors.join(', ')}</SubTitle>
    </Book>
  );
}

const Book = styled.div`
  width: 100%;
  margin-bottom: 30px;
  padding-right: 10px;

  @media ${Device.mobileM} {
    width: 50%;
  }

  @media ${Device.mobileL} {
    width: 33.33%;
  }

  @media ${Device.tablet} {
    width: 20%;
  }

  @media ${Device.laptop} {
    width: 33.33%;
  }

  @media ${Device.laptopM} {
    width: 20%;
  }
`;

const ImgContainer = styled.div`
  max-width: 140px;
  max-height: 160px;
  width: 100%;
  height: 100%;
  margin: 0 auto;

  @media ${Device.tablet} {
    margin: 0;
  }

  @media ${Device.laptop} {
    max-width: 180px;
    max-height: 180px;
  }

  @media ${Device.laptopL} {
    max-height: 250px;
  }
`;

const BookImage = styled.img`
  width: 100%;
  height: 100%;
`;

const Title = styled.p`
  font-size: 15px;
  color: #484848;
  margin: 15px 0 5px;
  max-width: 170px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SubTitle = styled.h3`
  font-size: 13px;
  color: #aeaeae;
`;

Books.propTypes = {
  onSelectBook: PropTypes.func.isRequired,
  book: PropTypes.shape({
    imageLink: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
};

export default Books;
