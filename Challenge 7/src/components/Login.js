import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from '../lib/axios';

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
      history.push('/books');
    });
  };

  ValidateForm() {
    const { email, password } = this.state;
    return email.length > 0 && password.length > 0;
  }

  render() {
    return (
      <div onSubmit={this.handleSubmit}>
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
      </div>
    );
  }
}

const Input = styled.input`
  border: 1px solid black;
  padding: 2px 10px;
  margin: 18px 4px 0 4px;
  color: black;
  font-size: 14px;
`;

const Button = styled.button`
  position: relative;
  margin: 15px 0 5px 0;
  left: 50%;
  transform: translateX(-50%);
  border: none;
  border-radius: 5px;
  padding: 10px;
  color: white;
  width: 85%;
  font-size: 14px;
  cursor: pointer;
  background-color: red;
`;

Login.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Login;
