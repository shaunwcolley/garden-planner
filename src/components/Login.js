import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class Login extends Component {
  render() {
    return(
      <div>
        <input type='text' placeholder="username"/>
        <input type='password' placeholder="password" />
        <button>Login</button>
        <NavLink to='/register'>Not a member? Register now to save your garden plans.</NavLink>
      </div>
    )
  }
}

export default Login
