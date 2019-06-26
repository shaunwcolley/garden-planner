import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import '../css/Login.css';
import { setAuthHeader } from '../utils/authenticate.js';

class Login extends Component {
  constructor(){
    super()
    this.state = {
      email: "",
      pass: "",
      message: null,
    }
  }

  handleTextBoxChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLoginClick = () => {
    axios.post('http://localhost:8080/login', this.state)
    .then(response => {
      if (response.data.success){
        const token = response.data.token;
        const userId = response.data.userId;
        localStorage.setItem('jsonwebtoken', token);
        this.props.onSignIn(token, userId);
        setAuthHeader(token);
        this.props.history.push('/');
        return
      }
      if(!response.data.success) {
        this.setState({
          ...this.state,
          message: response.data.message,
        });
      };
    }).catch(error => this.setState({ ...this.state, message: `Error: ${error}.` }));
    this.setState({
      ...this.state,
      message: "..."
    })
  }

  render() {
    return(
      <div className="login-body">
        <input type='text' onChange={this.handleTextBoxChange} placeholder="email" name="email"/>
        <input type='password' onChange={this.handleTextBoxChange} placeholder="password" name="pass"/>
        <button className="login-btn" onClick={this.handleLoginClick}>Login</button>
        <h4>{this.state.message}</h4>
        <NavLink to='/register'>Not a member? Register now to save your garden plans.</NavLink>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignIn: (token, userId) => dispatch({ type: 'SIGN_IN', token, userId}),
  };
};

export default connect(null, mapDispatchToProps)(Login)
