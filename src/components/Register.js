import React, { Component } from 'react';
import '../css/Register.css'

class Register extends Component {
  constructor(){
    super()
    this.state = {
      firstName: '',
      lastName: '',
      zipcode: null,
      email: '',
      username: '',
      pass: ''
    }
  }

  handleTextBoxChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleRegisterClick = () => {
    console.log('click')
  }
  render() {
    return(
      <div className="register-body">
        <h4>Register:</h4>
        <input onChange={this.handleTextBoxChange} type='text' placeholder="firstName" name="firstName"/>
        <input onChange={this.handleTextBoxChange} type='text' placeholder="lastName" name="lastName"/>
        <input onChange={this.handleTextBoxChange} type='number' placeholder="zipcode" name="zipcode"/>
        <input onChange={this.handleTextBoxChange} type='text' placeholder="email" name="email"/>
        <input onChange={this.handleTextBoxChange} type='text' placeholder="username" name="username"/>
        <input onChange={this.handleTextBoxChange} type='password' placeholder="password" name="pass"/>
        <button className="register-btn" onClick={this.handleRegisterClick}>Register</button>
      </div>
    )
  }
}

export default Register
