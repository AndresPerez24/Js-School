import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from '../lib/axios';
import logo from '../img/logo.png';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const { history } = this.props;
    const body = {
      email,
      password,
    };
    axios.post('login', body).then((response) => {
      localStorage.setItem('token', response.data.token);
      history.push('/Books');
    });
  };

  ValidateForm() {
    const { email, password } = this.state;
    return email.length > 0 && password.length > 0;
  }

  render() {
    return (
      <LogIn onSubmit={this.handleSubmit}>
        <img src={logo} alt="logo" />
        <form>
          <Input onChange={this.handleChange} type="email" name="email" placeholder="email" />
          <Input
            onChange={this.handleChange}
            type="password"
            name="password"
            placeholder="password"
          />
          <Button>Sign In</Button>
        </form>
      </LogIn>
    );
  }
}

const LogIn = styled.div`
  max-width: 500px;
  margin: 70px auto 0;
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid black;
  padding: 4px 10px 4px 10px;
  width: 100%;
  max-width: 205px;
  margin: 18px 4px 0 4px;
  color: black;
  font-size: 14px;
  border-radius: 5px;
`;

const Button = styled.button`
  margin: 15px 0 5px 0;
  border: none;
  border-radius: 5px;
  padding: 10px;
  color: white;
  width: 85%;
  font-size: 14px;
  cursor: pointer;
  background-color: #6ec1e4;
`;

Login.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default Login;
