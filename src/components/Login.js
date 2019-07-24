import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import '../css/Login.css';
import { setAuthHeader } from '../utils/authenticate.js';
import * as actionTypes from '../store/actions/actionTypes';

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

  handleLoginClick = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      message: "..."
    })
    axios.post('https://garden-planner-api.herokuapp.com/login', this.state)
    .then(response => {
      if (response.data.success){
        const token = response.data.token;
        const userId = response.data.userId;
        localStorage.setItem('jsonwebtoken', token);
        this.props.onSignIn(token, userId);
        setAuthHeader(token);
        return
      } else if(!response.data.success) {
        this.setState({
          ...this.state,
          message: response.data.message,
        });
      return
      };
    }).then(() => this.props.onLoginPop()).catch(error => this.setState({ ...this.state, message: `Error: ${error}.` }));
  }

  handleRegistrationLinkClick = () => {
    this.props.onLoginPop();
    this.props.onRegisterPop();
  }

  render() {
    return(
      <div className="login-body">
        <form className="login-form">
        <label>Email</label>
        <input autoComplete="username" type='text' onChange={this.handleTextBoxChange} placeholder="abc123@email.com" name="email"/>
        <label>Password</label>
        <input autoComplete="current-password" type='password' onChange={this.handleTextBoxChange} name="pass"/>
        <button className="login-btn" onClick={(e) => this.handleLoginClick(e)}>Login</button>
        </form>
        <h4>{this.state.message}</h4>
        <div className="registration-link" onClick={() => this.handleRegistrationLinkClick()}>
          <u>Not a member? Register now to save your garden plans.</u>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignIn: (token, userId) => dispatch({ type: actionTypes.SIGN_IN, token, userId }),
    onLoginPop: () => dispatch({ type: actionTypes.LOGIN_POPUP }),
    onRegisterPop: () => dispatch({ type: actionTypes.REGISTER_POPUP }),
  };
};

export default connect(null, mapDispatchToProps)(Login)
