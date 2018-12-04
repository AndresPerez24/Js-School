import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import logo from '../img/logo.png';
import { Device } from '../styles/index';

function Header(props) {
  const { setSearch } = props;
  return (
    <HeaderContainer>
      <Logo>
        <img src={logo} alt="logo" />
      </Logo>
      <Search>
        <Title>Bookshelf</Title>
        <Input onChange={e => setSearch(e.target.value)} type="text" placeholder="Search" />
      </Search>
      <Login>
        <Name>Andres Perez</Name>
        <Circle>
          <img src="" alt="" />
        </Circle>
      </Login>
      <SearchMobile>
        <Title>Bookshelf</Title>
        <Input type="text" placeholder="Search" />
      </SearchMobile>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  color: white;
  font-size: 13px;
  height: 190px;
  position: relative;

  @media ${Device.mobileL} {
    height: 150px;
  }

  @media ${Device.laptop} {
    height: 80px;
    padding: 0 250px;
  }
`;

const Logo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 160px;
  height: 80px;
  background-color: white;
  display: flex;
  align-items: center;
  margin-top: 15px;
  padding: 0 20px;

  @media ${Device.mobileL} {
    width: 200px;
  }

  @media ${Device.tablet} {
    padding: 0 20px;
    margin: 0;
    width: 250px;
  }
`;

const Search = styled.div`
  display: none;

  @media ${Device.laptop} {
    display: flex;
    justify-content: space-between;
  }
`;
const SearchMobile = styled.div`
  padding-top: 70px;
  display: flex;
  flex-wrap: wrap;
  flex: 0 0 100%;
  justify-content: space-between;

  @media ${Device.laptop} {
    display: none;
  }

  @media ${Device.laptopM} {
    flex: 0 0 70%;
  }
`;

const Title = styled.h1`
  display: inline-block;
  font-size: 24px;
  margin-top: 30px;
  padding-left: 20px;
  color: black;
`;

const Input = styled.input`
  float: right;
  border: 1px solid #6ec1e4;
  border-radius: 17px;
  padding-bottom: 3px;
  padding-left: 10px;
  margin: 0 20px;
  width: 100%;
  max-width: 300px;
  height: 35px;

  @media ${Device.mobileL} {
    margin: 30px 20px 0;
    max-width: 260px;
  }

  @media ${Device.tablet} {
    max-width: 360px;
  }

  @media ${Device.laptop} {
    max-width: 280px;
  }

  ::-webkit-input-placeholder {
    color: black;
    font-family: 'Intro';
    font-size: 12px;
  }
`;

const Login = styled.div`
  position: absolute;
  top: 20px;
  right: 0;
  width: 180px;
  height: 40px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${Device.mobileM} {
    padding: 0 20px;
  }

  @media ${Device.mobileL} {
    width: 200px;
  }

  @media ${Device.tablet} {
    width: 250px;
    height: 50px;
    margin: auto;
  }

  @media ${Device.laptop} {
    width: 250px;
    border-left: 1px solid #979797;
  }
`;

const Name = styled.p`
  font-size: 14px;
  margin: auto 0;
  display: inline-block;
  margin-right: 20px;
  color: black;
`;

const Circle = styled.span`
  display: inline-block;
  width: 36px;
  height: 36px;
  border: 1px solid #6ec1e4;
  border-radius: 50%;
`;

Header.propTypes = {
  setSearch: PropTypes.func.isRequired,
};

export default Header;
