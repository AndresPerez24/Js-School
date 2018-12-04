import React, { Component } from "react";
import styled, { css } from "styled-components";
import TextTruncate from "react-text-truncate";

class Popup extends Component {
  render() {
    const { closeModal, selectedBook, isModalOpen } = this.props;
    return (
      <PopUp isModalOpen={isModalOpen}>
        <PopupContainer>
          <Button onClick={closeModal}>&#10006;</Button>
          <Title>{selectedBook.title}</Title>
          <Date>{selectedBook.publishedDate}</Date>
          <Novel>Novel by {selectedBook.authors}</Novel>
          <Pages>{selectedBook.pageCount} Pages</Pages>
          <Summary>Summary</Summary>
          <TextTruncateSize
            line={6}
            truncateText="..."
            text={selectedBook.description}
          />
        </PopupContainer>
      </PopUp>
    );
  }
}

const PopUp = styled.div`
  position: absolute;
  top: 30%;
  transform: translateY(-50%);
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  width: 340px;
  opacity: 0;
  visibility: hidden;
  transition: 0.5s;
  ${props => (props.isModalOpen ? modalOpen : "")}
`;

const modalOpen = css`
  opacity: 1;
  visibility: initial;
`;

const PopupContainer = styled.div`
  padding: 30px 20px 20px 50px;
  background-color: #000000bd;
  color: white;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.1);
  height: 340px;
`;

const Button = styled.button`
  transition: all 0.5s ease;
  position: absolute;
  padding: 1.5px 7px;
  right: 5px;
  top: 5px;
  color: white;
  box-shadow: -3px 1px 6px 0px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: white;
    color: black;
  }
`;

const Title = styled.h3`
  display: inline-block;
  max-width: 150px;
  font-family: sans-serif;
  font-weight: 300;
  font-size: 13px;
  text-transform: uppercase;
  color: #6ec1e4;
`;

const Novel = styled.p`
  font-size: 13px;
  margin-bottom: 0;
  ._color {
    color: #979797;
  }
`;
const Pages = styled.p`
  font-size: 13px;
`;

const Summary = styled.p`
  color: #979797;
  text-transform: uppercase;
  font-size: 12px;
  margin: 0;
`;

const Date = styled.p`
  font-size: 12px;
  float: right;
  padding-top: 5px;
`;
const TextTruncateSize = styled(TextTruncate)`
  font-size: 12px;
`;

export default Popup;
