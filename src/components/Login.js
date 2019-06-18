import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import '../css/Login.css'

class Login extends Component {
  constructor(){
    super()
    this.state = {
      username: "",
      password: "",
    }
  }

  handleTextBoxChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLoginClick = () => {
    console.log(this.state)
  }

  render() {
    return(
      <div className="login-body">
        <input type='text' onChange={this.handleTextBoxChange} placeholder="username" name="username"/>
        <input type='password' onChange={this.handleTextBoxChange} placeholder="password" name="password"/>
        <button className="login-btn" onClick={this.handleLoginClick}>Login</button>
        <NavLink to='/register'>Not a member? Register now to save your garden plans.</NavLink>
      </div>
    )
  }
}

export default Login
