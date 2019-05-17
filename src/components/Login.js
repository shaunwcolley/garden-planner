import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import '../css/Login.css'

class Login extends Component {
  render() {
    return(
      <div className="login-body">
        <input type='text' placeholder="username"/>
        <input type='password' placeholder="password" />
        <button className="login-btn">Login</button>
        <NavLink to='/register'>Not a member? Register now to save your garden plans.</NavLink>
      </div>
    )
  }
}

export default Login
